/**
 * 增量更新脚本
 *
 * 功能:
 * - 只查询上次获取时间之后的线路变更
 * - 对比已有数据，更新字段
 * - 适用于每日定时任务
 *
 * 使用:
 *   npx tsx scripts/incremental-update.ts 北京
 *   npx tsx scripts/incremental-update.ts all
 */

import { spawn } from "child_process";
import * as fs from "fs";
import * as path from "path";

const CITIES = [
  "北京", "上海", "广州", "深圳", "杭州",
  "南京", "武汉", "成都", "西安", "天津", "重庆",
];

const DATA_DIR = path.join(process.cwd(), "src/lib/bus-data");

function shouldUpdate(city: string): boolean {
  const metaFile = path.join(DATA_DIR, city, "metadata.json");
  if (!fs.existsSync(metaFile)) return true;

  try {
    const meta = JSON.parse(fs.readFileSync(metaFile, "utf-8"));
    const lastUpdate = new Date(meta.lastUpdate);
    const daysSinceUpdate = (Date.now() - lastUpdate.getTime()) / 1000 / 3600 / 24;
    return daysSinceUpdate >= 1; // 超过 1 天就更新
  } catch {
    return true;
  }
}

function runCity(city: string): Promise<number> {
  return new Promise((resolve) => {
    console.log(`\n▶️  增量更新: ${city}`);
    const child = spawn(
      "npx",
      ["tsx", "--env-file=.env.local", "scripts/fetch-bus-data.ts", city, "1", "999"],
      {
        cwd: process.cwd(),
        stdio: "inherit",
        env: process.env,
      }
    );
    child.on("close", (code) => resolve(code || 0));
  });
}

async function main() {
  const arg = process.argv[2] || "all";

  console.log("=== 增量更新 ===");
  console.log(`开始时间: ${new Date().toISOString()}`);

  let cities: string[];
  if (arg === "all") {
    cities = CITIES.filter((c) => shouldUpdate(c));
    console.log(`需更新的城市: ${cities.join(", ") || "无（都在 24 小时内）"}`);
  } else {
    cities = [arg];
  }

  if (cities.length === 0) {
    console.log("所有城市数据均在 24 小时内更新过，跳过。");
    process.exit(0);
  }

  const startTime = Date.now();
  for (const city of cities) {
    const code = await runCity(city);
    if (code !== 0) {
      console.warn(`❌ ${city} 失败 (code=${code})`);
    }
    // 城市间延迟
    await new Promise((r) => setTimeout(r, 5000));
  }

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  console.log(`\n=== 完成，耗时 ${elapsed} 分钟 ===`);
}

main().catch((err) => {
  console.error("增量更新错误:", err);
  process.exit(1);
});
