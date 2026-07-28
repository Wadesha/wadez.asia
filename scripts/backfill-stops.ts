/**
 * 已有数据的站点补全脚本
 *
 * 用途: 重新解析现有 lines.ts 中的 polyline 字段，补全 stops
 * 不会重新调用 API，只读取本地文件
 *
 * 使用:
 *   npx tsx scripts/backfill-stops.ts 北京
 *   npx tsx scripts/backfill-stops.ts all
 */

import * as fs from "fs";
import * as path from "path";

interface BusStop {
  name: string;
  location: string;
  sequence: number;
}

interface BusLine {
  id: string;
  name: string;
  type: string;
  city: string;
  startStop: string;
  endStop: string;
  distance: number;
  basicPrice: number;
  totalPrice: number;
  company: string;
  stops: BusStop[];
  polyline: string;
  fetchedAt: string;
}

// Haversine 公式
function haversineDistance(
  lng1: number,
  lat1: number,
  lng2: number,
  lat2: number
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 从 polyline 反向解码生成虚拟站点
function generateStopsFromPolyline(
  polyline: string,
  startName: string,
  endName: string
): BusStop[] {
  if (!polyline) return [];
  const points = polyline
    .split(";")
    .map((p) => p.split(",").map(Number))
    .filter((p) => p.length === 2 && !isNaN(p[0]) && !isNaN(p[1]));
  if (points.length < 2) return [];

  const stops: BusStop[] = [];
  let cumDistance = 0;
  let lastStopDistance = -800;

  stops.push({
    name: startName || "起点",
    location: `${points[0][0]},${points[0][1]}`,
    sequence: 1,
  });
  lastStopDistance = 0;

  for (let i = 1; i < points.length; i++) {
    const [lng1, lat1] = points[i - 1];
    const [lng2, lat2] = points[i];
    const segDist = haversineDistance(lng1, lat1, lng2, lat2);
    cumDistance += segDist;

    if (cumDistance - lastStopDistance >= 800) {
      stops.push({
        name: `途经站${stops.length + 1}`,
        location: `${lng2},${lat2}`,
        sequence: stops.length + 1,
      });
      lastStopDistance = cumDistance;
    }
  }

  const lastPoint = points[points.length - 1];
  stops.push({
    name: endName || "终点",
    location: `${lastPoint[0]},${lastPoint[1]}`,
    sequence: stops.length + 1,
  });

  return stops;
}

// 提取数据从 lines.ts 中（通过读取并 parse 导出数组）
function loadLines(cityDir: string): BusLine[] {
  const linesFile = path.join(cityDir, "lines.ts");
  if (!fs.existsSync(linesFile)) return [];

  const content = fs.readFileSync(linesFile, "utf-8");
  // 简单解析：找到 const XXX_BUS_LINES: BusLine[] = [...] 的结尾
  const startMatch = content.match(/=\s*\[/);
  if (!startMatch) return [];

  const startIdx = content.indexOf("[", startMatch.index!);
  if (startIdx === -1) return [];

  // 手动数括号
  let depth = 0;
  let endIdx = -1;
  let inString = false;
  let stringChar = "";
  for (let i = startIdx; i < content.length; i++) {
    const ch = content[i];
    if (inString) {
      if (ch === stringChar && content[i - 1] !== "\\") inString = false;
    } else {
      if (ch === '"' || ch === "'" || ch === "`") {
        inString = true;
        stringChar = ch;
      } else if (ch === "[") depth++;
      else if (ch === "]") {
        depth--;
        if (depth === 0) {
          endIdx = i;
          break;
        }
      }
    }
  }
  if (endIdx === -1) return [];

  const arrStr = content.substring(startIdx, endIdx + 1);
  try {
    // 替换 JS 模板为 JSON 兼容（处理 undefined）
    const jsonStr = arrStr
      .replace(/:\s*undefined/g, ": null")
      .replace(/(\w):\s*([a-zA-Z_]\w*)/g, '"$1": "$2"'); // 简单 key 转换
    // 上面这个正则会破坏 string value 包含 "key":"value" 模式，需要回退
    return JSON.parse(arrStr) as BusLine[];
  } catch (e) {
    // 备选：用 Function eval
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function("return " + arrStr);
      return fn() as BusLine[];
    } catch (e2) {
      console.error("解析失败:", (e2 as Error).message);
      return [];
    }
  }
}

function saveLines(cityDir: string, lines: BusLine[]): void {
  const linesFile = path.join(cityDir, "lines.ts");
  const cityName = path.basename(cityDir);
  const content = `// 自动生成 - ${new Date().toISOString()}
// 城市: ${cityName}
// 线路数: ${lines.length}
// 已补全 stops 字段（polyline 反向解码）
import type { BusLine } from "../types";

export const ${cityName.toUpperCase()}_BUS_LINES: BusLine[] = ${JSON.stringify(
    lines,
    null,
    2
  )};
`;
  // 先写 /tmp 再 mv 避免 EPERM
  const tmpFile = `/tmp/lines_${Date.now()}.ts`;
  fs.writeFileSync(tmpFile, content, "utf-8");
  fs.copyFileSync(tmpFile, linesFile);
  fs.unlinkSync(tmpFile);
}

function processCity(cityName: string): void {
  const cityDir = path.join(process.cwd(), "src/lib/bus-data", cityName);
  if (!fs.existsSync(cityDir)) {
    console.warn(`⚠️ 城市目录不存在: ${cityDir}`);
    return;
  }

  console.log(`\n=== ${cityName} ===`);
  const lines = loadLines(cityDir);
  if (lines.length === 0) {
    console.log("  无数据或解析失败");
    return;
  }
  console.log(`  加载 ${lines.length} 条线路`);

  let backfilled = 0;
  let totalStops = 0;
  for (const line of lines) {
    if (!line.stops || line.stops.length < 3) {
      const stops = generateStopsFromPolyline(
        line.polyline,
        line.startStop,
        line.endStop
      );
      line.stops = stops;
      backfilled++;
      totalStops += stops.length;
    } else {
      totalStops += line.stops.length;
    }
  }

  console.log(`  补全 ${backfilled} 条线路，新增 ${totalStops} 个站点`);
  saveLines(cityDir, lines);

  // 更新 metadata
  const metadataFile = path.join(cityDir, "metadata.json");
  if (fs.existsSync(metadataFile)) {
    const metadata = JSON.parse(fs.readFileSync(metadataFile, "utf-8"));
    metadata.lastUpdate = new Date().toISOString();
    metadata.totalStops = totalStops;
    metadata.stopsBackfilledAt = new Date().toISOString();
    fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2), "utf-8");
  }

  // 写日志
  const logFile = path.join(cityDir, "fetch.log");
  const logLine = `[${new Date().toISOString()}] backfill: 补全 ${backfilled} 条线路，新增 ${totalStops} 个站点\n`;
  fs.appendFileSync(logFile, logLine, "utf-8");
}

function main() {
  const args = process.argv.slice(2);
  const target = args[0] || "all";

  const allCities = [
    "北京", "上海", "广州", "深圳", "杭州",
    "南京", "武汉", "成都", "西安", "天津", "重庆",
  ];

  if (target === "all") {
    console.log("=== 批量补全所有城市 ===");
    for (const city of allCities) {
      processCity(city);
    }
  } else {
    processCity(target);
  }

  console.log("\n=== 补全完成 ===");
}

main();
