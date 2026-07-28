/**
 * 数据状态查看脚本
 *
 * 显示所有城市的获取进度、统计信息
 *
 * 使用:
 *   npx tsx scripts/data-status.ts            # 全部城市
 *   npx tsx scripts/data-status.ts 北京        # 单个城市
 */

import * as fs from "fs";
import * as path from "path";

const DATA_DIR = path.join(process.cwd(), "src/lib/bus-data");

const ALL_CITIES = [
  "北京", "上海", "广州", "深圳", "杭州",
  "南京", "武汉", "成都", "西安", "天津", "重庆",
  "苏州", "郑州", "长沙", "青岛", "沈阳", "宁波",
  "佛山", "合肥", "大连", "厦门", "福州", "无锡",
  "济南", "哈尔滨", "石家庄", "贵阳", "南宁",
  "太原", "昆明", "南昌", "长春", "兰州",
  "常州", "南通", "徐州", "温州", "金华", "绍兴",
  "嘉兴", "台州", "珠海", "惠州", "中山",
];

function readCity(city: string) {
  const dir = path.join(DATA_DIR, city);
  if (!fs.existsSync(dir)) {
    return { city, totalLines: 0, status: "not-started" as const };
  }
  const metaFile = path.join(dir, "metadata.json");
  if (!fs.existsSync(metaFile)) {
    return { city, totalLines: 0, status: "not-started" as const };
  }
  try {
    const meta = JSON.parse(fs.readFileSync(metaFile, "utf-8"));
    return {
      city,
      totalLines: meta.totalLines || 0,
      totalStops: meta.totalStops,
      lastUpdate: meta.lastUpdate,
      status: "completed" as const,
    };
  } catch {
    return { city, totalLines: 0, status: "failed" as const };
  }
}

function main() {
  const arg = process.argv[2];

  console.log("\n=== Wadez.asia 数据状态 ===\n");

  if (arg) {
    // 单个城市
    const c = readCity(arg);
    console.log(JSON.stringify(c, null, 2));
    return;
  }

  // 全部
  const stats = ALL_CITIES.map(readCity);
  const completed = stats.filter((s) => s.status === "completed");
  const totalLines = stats.reduce((sum, s) => sum + s.totalLines, 0);
  const totalStops = stats.reduce((sum, s) => sum + ((s as any).totalStops || 0), 0);

  console.log(`总城市: ${ALL_CITIES.length}`);
  console.log(`已完成: ${completed.length}`);
  console.log(`总线路: ${totalLines.toLocaleString()}`);
  console.log(`总站点: ${totalStops.toLocaleString()}`);
  console.log("");
  console.log(
    "城市".padEnd(8) +
      "状态".padEnd(10) +
      "线路".padEnd(8) +
      "站点".padEnd(8) +
      "最后更新"
  );
  console.log("-".repeat(60));

  for (const s of stats) {
    const line = (s as any).totalStops
      ? ((s as any).totalStops).toLocaleString()
      : "-";
    const update = s.lastUpdate
      ? new Date(s.lastUpdate).toLocaleString("zh-CN", {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";
    console.log(
      s.city.padEnd(8) +
        s.status.padEnd(10) +
        s.totalLines.toString().padEnd(8) +
        line.padEnd(8) +
        update
    );
  }

  // 显示 worker 状态
  const stateFile = path.join(DATA_DIR, "_worker-state.json");
  if (fs.existsSync(stateFile)) {
    console.log("\n=== Worker 状态 ===");
    const states = JSON.parse(fs.readFileSync(stateFile, "utf-8"));
    for (const s of states) {
      if (s.status !== "idle") {
        console.log(
          `${s.city}: ${s.status} (更新于 ${new Date(s.lastUpdate).toLocaleString("zh-CN")})`
        );
      }
    }
  }
}

main();
