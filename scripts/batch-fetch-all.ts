/**
 * 批量调度所有城市的公交数据获取
 *
 * 顺序执行多个城市的线路获取（避免 Key 冲突和并发限流）
 *
 * 使用:
 *   npx tsx scripts/batch-fetch-all.ts 一线
 *   npx tsx scripts/batch-fetch-all.ts 全部
 *   npx tsx scripts/batch-fetch-all.ts 北京,上海,广州
 */

import { spawn } from "child_process";
import * as fs from "fs";
import * as path from "path";

// 城市分组
const CITY_GROUPS: Record<string, string[]> = {
  一线: ["北京", "上海", "广州", "深圳", "杭州"],
  新一线: ["南京", "武汉", "成都", "西安", "天津", "重庆"],
  全部: [
    "北京", "上海", "广州", "深圳", "杭州",
    "南京", "武汉", "成都", "西安", "天津", "重庆",
    "苏州", "郑州", "长沙", "青岛", "沈阳", "宁波",
    "佛山", "合肥", "大连", "厦门", "福州", "无锡",
    "济南", "哈尔滨", "石家庄", "贵阳", "南宁",
    "太原", "昆明", "南昌", "长春", "兰州",
    "常州", "南通", "徐州", "温州", "金华", "绍兴",
    "嘉兴", "台州", "珠海", "惠州", "中山",
  ],
};

interface CityStatus {
  city: string;
  totalLines: number;
  lastUpdate: string;
}

function readCityStatus(city: string): CityStatus | null {
  const metaFile = path.join(
    process.cwd(),
    "src/lib/bus-data",
    city,
    "metadata.json"
  );
  if (!fs.existsSync(metaFile)) return null;
  try {
    return JSON.parse(fs.readFileSync(metaFile, "utf-8"));
  } catch {
    return null;
  }
}

function runCity(city: string, start: number, end: number): Promise<number> {
  return new Promise((resolve) => {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`▶️  开始拉取: ${city} (${start}-${end})`);
    console.log(`${"=".repeat(60)}\n`);

    const child = spawn(
      "npx",
      ["tsx", "scripts/fetch-bus-data.ts", city, String(start), String(end)],
      {
        cwd: process.cwd(),
        stdio: "inherit",
        env: process.env,
      }
    );

    child.on("close", (code) => {
      if (code === 0) {
        const status = readCityStatus(city);
        const total = status?.totalLines || 0;
        console.log(`\n✅ ${city} 完成，累计 ${total} 条线路`);
      } else {
        console.warn(`\n❌ ${city} 异常退出 (code=${code})`);
      }
      resolve(code || 0);
    });
  });
}

async function main() {
  const arg = process.argv[2] || "一线";
  let cities: string[] = [];

  if (CITY_GROUPS[arg]) {
    cities = CITY_GROUPS[arg];
  } else {
    // 自定义城市列表（逗号分隔）
    cities = arg.split(",").map((c) => c.trim());
  }

  console.log(`\n=== 批量数据获取 ===`);
  console.log(`目标: ${arg}`);
  console.log(`城市列表 (${cities.length}个): ${cities.join(", ")}`);
  console.log(`开始时间: ${new Date().toISOString()}\n`);

  const startTime = Date.now();
  const results: { city: string; code: number; lines: number }[] = [];

  for (const city of cities) {
    const code = await runCity(city, 1, 999);
    const status = readCityStatus(city);
    results.push({ city, code, lines: status?.totalLines || 0 });
  }

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);

  console.log(`\n\n${"=".repeat(60)}`);
  console.log(`=== 批量执行完成 ===`);
  console.log(`${"=".repeat(60)}`);
  console.log(`总耗时: ${elapsed} 分钟`);
  console.log(`\n结果汇总:`);
  console.log(
    "城市".padEnd(8) +
      "退出码".padEnd(8) +
      "线路数".padEnd(10) +
      "状态"
  );
  console.log("-".repeat(40));
  let totalLines = 0;
  for (const r of results) {
    const icon = r.code === 0 ? "✅" : "❌";
    console.log(
      r.city.padEnd(8) +
        String(r.code).padEnd(8) +
        String(r.lines).padEnd(10) +
        icon
    );
    totalLines += r.lines;
  }
  console.log("-".repeat(40));
  console.log(`总计: ${totalLines} 条线路`);
  console.log(`\n结束时间: ${new Date().toISOString()}`);
}

main().catch((err) => {
  console.error("批量执行错误:", err);
  process.exit(1);
});
