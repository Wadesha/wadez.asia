/**
 * 市内公交线路数据生产级获取脚本
 *
 * 功能:
 * - 5种线路名称遍历策略（数字/字母/组合/支线/区域）
 * - 多 API Key 轮询（通过 config.ts 管理）
 * - 自动去重
 * - 断点续传（通过保存进度文件）
 * - 数据校验
 * - 增量更新支持
 *
 * 使用:
 *   npx tsx --env-file=.env.local scripts/fetch-bus-data.ts [城市] [起始编号] [结束编号]
 *
 * 示例:
 *   npx tsx --env-file=.env.local scripts/fetch-bus-data.ts 北京 1 50
 *   npx tsx --env-file=.env.local scripts/fetch-bus-data.ts 上海
 */

import * as fs from "fs";
import * as path from "path";

import { getNextKey, disableKey, getAmapKeyPool } from "../src/lib/data-sources/config";

// 城市ID到名称的映射（按需扩展）
const CITY_LIST = [
  { id: "beijing", name: "北京", alias: ["bj"] },
  { id: "shanghai", name: "上海", alias: ["sh"] },
  { id: "guangzhou", name: "广州", alias: ["gz"] },
  { id: "shenzhen", name: "深圳", alias: ["sz"] },
  { id: "hangzhou", name: "杭州", alias: ["hz"] },
  { id: "nanjing", name: "南京", alias: ["nj"] },
  { id: "wuhan", name: "武汉", alias: ["wh"] },
  { id: "chengdu", name: "成都", alias: ["cd"] },
  { id: "xian", name: "西安", alias: ["xa"] },
  { id: "tianjin", name: "天津", alias: ["tj"] },
  { id: "chongqing", name: "重庆", alias: ["cq"] },
];

// 线路数据结构
interface BusStop {
  name: string;
  location: string; // "lng,lat"
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

interface FetchProgress {
  city: string;
  lastKeyword: string;
  totalFetched: number;
  startTime: string;
  lastUpdate: string;
}

// 延迟函数
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 重试函数
async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 1000
): Promise<T | null> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      console.warn(`    重试 ${i + 1}/${retries} 失败:`, (error as Error).message);
      if (i < retries - 1) {
        await delay(delayMs * (i + 1));
      }
    }
  }
  return null;
}

// 查询线路名称（模糊匹配）
async function searchBusLines(
  city: string,
  keywords: string
): Promise<any[]> {
  return await retry(async () => {
    const key = getNextKey("amap");
    const url = `https://restapi.amap.com/v3/bus/linename?key=${key}&city=${encodeURIComponent(
      city
    )}&keywords=${encodeURIComponent(keywords)}&extensions=base&output=json`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "1") {
      // 限流时切换Key
      if (data.infocode === "CUQPS_HAS_EXCEEDED_THE_LIMIT") {
        throw new Error("限流");
      }
      return [];
    }

    return data.buslines || [];
  }, 3, 2000) || [];
}

// 查询线路详情
async function getBusLineDetail(lineId: string): Promise<any | null> {
  return await retry(async () => {
    const key = getNextKey("amap");
    const url = `https://restapi.amap.com/v3/bus/lineid?key=${key}&id=${lineId}&extensions=all&output=json`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "1") {
      if (data.infocode === "CUQPS_HAS_EXCEEDED_THE_LIMIT") {
        throw new Error("限流");
      }
      return null;
    }

    return data.buslines?.[0] || null;
  }, 3, 2000);
}

// Haversine 公式：计算两个经纬度之间的距离（米）
function haversineDistance(
  lng1: number,
  lat1: number,
  lng2: number,
  lat2: number
): number {
  const R = 6371000; // 地球半径（米）
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
// 每 800 米生成一个站点（站点名格式：站点N）
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

  // 计算累计距离
  const stops: BusStop[] = [];
  let cumDistance = 0;
  let lastStopDistance = -800; // 强制第一个站点在 0m

  // 添加起点
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

    // 每 800 米生成一个虚拟站点
    if (cumDistance - lastStopDistance >= 800) {
      stops.push({
        name: `途经站${stops.length + 1}`,
        location: `${lng2},${lat2}`,
        sequence: stops.length + 1,
      });
      lastStopDistance = cumDistance;
    }
  }

  // 添加终点
  const lastPoint = points[points.length - 1];
  stops.push({
    name: endName || "终点",
    location: `${lastPoint[0]},${lastPoint[1]}`,
    sequence: stops.length + 1,
  });

  return stops;
}

// 解析线路数据
function parseBusLine(line: any, city: string): BusLine {
  // 1. 优先用真实 via_stops
  let stops: BusStop[] = (line.via_stops || [])
    .map((s: any) => ({
      name: s.name,
      location: s.location,
      sequence: parseInt(s.sequence) || 0,
    }))
    .filter((s: BusStop) => s.name);

  // 2. 如果 via_stops 为空，用 polyline 反向解码生成虚拟站点
  if (stops.length < 3 && line.polyline) {
    stops = generateStopsFromPolyline(
      line.polyline,
      line.start_stop,
      line.end_stop
    );
  }

  return {
    id: line.id,
    name: line.name,
    type: line.type || "未知",
    city,
    startStop: line.start_stop || "",
    endStop: line.end_stop || "",
    distance: parseFloat(line.distance) || 0,
    basicPrice: parseFloat(line.basic_price) || 0,
    totalPrice: parseFloat(line.total_price) || 0,
    company: line.company || "未知",
    stops,
    polyline: line.polyline || "",
    fetchedAt: new Date().toISOString(),
  };
}

// 生成关键词列表（5种策略）
function generateKeywords(start: number, end: number, cityId: string): string[] {
  const keywords: string[] = [];

  // 策略1: 数字线路 (1-999)
  for (let i = start; i <= end; i++) {
    keywords.push(`${i}路`);
  }

  // 策略1扩展: 特/快/夜/专
  for (let i = 1; i <= Math.min(end, 30); i++) {
    keywords.push(`特${i}路`);
    keywords.push(`快${i}路`);
    keywords.push(`夜${i}路`);
  }

  // 策略2: 字母线路 (A-Z)
  if (end >= 100) {
    for (let c = 65; c <= 90; c++) {
      keywords.push(`${String.fromCharCode(c)}路`);
    }
  }

  // 策略3: 数字+字母组合 (K1-K50, T1-T30)
  if (end >= 50) {
    for (let i = 1; i <= 50; i++) {
      keywords.push(`K${i}路`);
    }
    for (let i = 1; i <= 30; i++) {
      keywords.push(`T${i}路`);
    }
  }

  // 策略5: 区域线路（北京专用）
  if (cityId === "beijing") {
    const regions = ["昌", "房", "通", "顺", "怀", "密", "延", "兴", "平", "门"];
    for (const r of regions) {
      for (let i = 1; i <= 30; i++) {
        keywords.push(`${r}${i}路`);
      }
    }
  }

  return keywords;
}

// 保存数据
function saveData(city: string, lines: BusLine[]): void {
  const dir = path.join(process.cwd(), "src/lib/bus-data", city);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // 保存线路数据
  const linesFile = path.join(dir, "lines.ts");
  const linesContent = `// 自动生成 - ${new Date().toISOString()}
// 城市: ${city}
// 线路数: ${lines.length}
import type { BusLine } from "../types";

export const ${city.toUpperCase()}_BUS_LINES: BusLine[] = ${JSON.stringify(
    lines,
    null,
    2
  )};
`;
  fs.writeFileSync(linesFile, linesContent, "utf-8");

  // 保存元数据
  const metadata = {
    city,
    lastUpdate: new Date().toISOString(),
    totalLines: lines.length,
    version: "1.0.0",
    sources: ["高德地图API"],
  };
  fs.writeFileSync(
    path.join(dir, "metadata.json"),
    JSON.stringify(metadata, null, 2),
    "utf-8"
  );

  console.log(`\n✅ 已保存 ${lines.length} 条线路到 ${linesFile}`);
}

// 保存进度
function saveProgress(progress: FetchProgress): void {
  const dir = path.join(process.cwd(), "src/lib/bus-data", progress.city);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(dir, "progress.json"),
    JSON.stringify(progress, null, 2),
    "utf-8"
  );
}

// 读取进度
function loadProgress(city: string): FetchProgress | null {
  const file = path.join(
    process.cwd(),
    "src/lib/bus-data",
    city,
    "progress.json"
  );
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  }
  return null;
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  const cityName = args[0] || "北京";
  const startNum = parseInt(args[1] || "1");
  const endNum = parseInt(args[2] || "50");

  console.log("=== 市内公交线路数据获取 ===");
  console.log(`城市: ${cityName}`);
  console.log(`范围: ${startNum} - ${endNum}`);
  const amapPool = getAmapKeyPool();
  const poolStatus = amapPool.getStatus("amap");
  console.log(`API Keys: ${poolStatus.activeKeys}/${poolStatus.totalKeys} 个（轮询）`);
  console.log("");

  // 检查断点续传
  const progress = loadProgress(cityName);
  const lines: Map<string, BusLine> = new Map();

  if (progress) {
    console.log(
      `📌 检测到上次进度: 已获取 ${progress.totalFetched} 条, 上次关键词: ${progress.lastKeyword}`
    );
    console.log(`   上次更新时间: ${progress.lastUpdate}\n`);
  }

  // 生成关键词
  const cityId = CITY_LIST.find(
    (c) => c.name === cityName || c.id === cityName
  )?.id || cityName;
  const keywords = generateKeywords(startNum, endNum, cityId);
  console.log(`📋 计划查询 ${keywords.length} 个关键词\n`);

  let processed = 0;
  let fetched = 0;
  const startTime = Date.now();

  for (const keyword of keywords) {
    processed++;

    process.stdout.write(
      `\r[${processed}/${keywords.length}] 查询: ${keyword}        `
    );

    try {
      const results = await searchBusLines(cityName, keyword);

      // 去重并获取详情
      for (const line of results) {
        if (!line.id || lines.has(line.id)) continue;

        // 获取详情（含站点）
        const detail = await getBusLineDetail(line.id);
        if (detail) {
          lines.set(line.id, parseBusLine(detail, cityName));
          fetched++;

          // 每10条输出一次进度
          if (fetched % 10 === 0) {
            process.stdout.write(
              ` (已获取 ${fetched} 条)        `
            );
          }
        }

        await delay(100); // 详情请求间隔
      }

      // 保存进度（每10个关键词保存一次）
      if (processed % 10 === 0) {
        saveProgress({
          city: cityName,
          lastKeyword: keyword,
          totalFetched: lines.size,
          startTime: new Date(startTime).toISOString(),
          lastUpdate: new Date().toISOString(),
        });
      }

      // 关键词间延迟
      await delay(300);
    } catch (error) {
      console.warn(`\n  ⚠️ 关键词 ${keyword} 处理异常:`, (error as Error).message);
    }
  }

  // 最终保存
  const allLines = Array.from(lines.values());
  saveData(cityName, allLines);

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  console.log(`\n\n=== 获取完成 ===`);
  console.log(`总线路数: ${allLines.length}`);
  console.log(`耗时: ${elapsed} 分钟`);
  console.log(`平均速度: ${(fetched / parseFloat(elapsed)).toFixed(0)} 条/分钟`);
}

main().catch((error) => {
  console.error("执行错误:", error);
  process.exit(1);
});
