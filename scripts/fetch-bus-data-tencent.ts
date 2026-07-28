/**
 * 腾讯地图公交数据获取脚本（换乘方案提取策略）
 *
 * 策略:
 * 1. 用 POI 搜索获取城市主要公交站坐标（搜索"公交站"关键词）
 * 2. 用换乘接口（transit）在站点间规划路线
 * 3. 从换乘方案中提取线路名、距离、时长、站点信息
 *
 * 使用:
 *   npx tsx --env-file=.env.local scripts/fetch-bus-data-tencent.ts 北京 50
 */

import * as fs from "fs";
import * as path from "path";

import {
  getNextKey,
  disableKey,
  getTencentKeyPool,
} from "../src/lib/data-sources/config";

const TENCENT_BASE = "https://apis.map.qq.com";

// 城市中心坐标
const CITY_CENTERS: Record<string, { lng: number; lat: number; name: string }> = {
  北京: { name: "北京", lng: 116.397428, lat: 39.90923 },
  上海: { name: "上海", lng: 121.473701, lat: 31.230416 },
  广州: { name: "广州", lng: 113.264434, lat: 23.129162 },
  深圳: { name: "深圳", lng: 114.057868, lat: 22.543099 },
  杭州: { name: "杭州", lng: 120.15507, lat: 30.274085 },
  南京: { name: "南京", lng: 118.796877, lat: 32.060255 },
  武汉: { name: "武汉", lng: 114.305539, lat: 30.592935 },
  成都: { name: "成都", lng: 104.066801, lat: 30.572961 },
  西安: { name: "西安", lng: 108.93977, lat: 34.341574 },
  天津: { name: "天津", lng: 117.190182, lat: 39.125596 },
  重庆: { name: "重庆", lng: 106.551556, lat: 29.563009 },
};

interface BusStation {
  id: string;
  title: string;
  address: string;
  location: { lat: number; lng: number };
  distance: number; // 距离市中心距离（米）
}

interface BusLine {
  name: string;
  city: string;
  distance: number; // km
  duration: number; // min
  fromStation: string;
  toStation: string;
  viaStations: string[];
  fetchedAt: string;
  source: "tencent";
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * POI 搜索：获取城市公交站列表
 * 
 * 使用 boundary=region(城市名) 参数限制搜索范围
 */
async function searchBusStations(
  city: string,
  center: { lng: number; lat: number },
  page: number = 1
): Promise<BusStation[]> {
  const key = getNextKey("tencent");
  if (!key) {
    console.warn("  ⚠️ 没有可用的腾讯 Key");
    return [];
  }

  // 正确格式：boundary=region(城市名)，关键词用中文"公交"
  const url = `${TENCENT_BASE}/ws/place/v1/search?keyword=%E5%85%AC%E4%BA%A4&boundary=region(${encodeURIComponent(city)})&page_size=20&page_index=${page}&key=${key}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const data = await res.json();

    if (data.status !== 0) {
      const msg = data.message || "";
      if (msg.includes("key") || msg.includes("配额") || msg.includes("limit")) {
        console.warn(`  ⚠️ Key 失效: ${msg}`);
        disableKey("tencent", key);
      }
      console.warn(`  ⚠️ API 错误: status=${data.status}, message=${msg}`);
      return [];
    }

    return (data.data || []).map((d: any) => ({
      id: d.id,
      title: d.title,
      address: d.address,
      location: d.location,
      distance: d._distance || 0,
    }));
  } catch (err) {
    console.warn(`  ⚠️ POI 搜索失败: ${(err as Error).message}`);
    return [];
  }
}

/**
 * 公交换乘查询
 * 
 * 从换乘方案中提取线路信息
 */
async function queryTransit(
  city: string,
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
): Promise<BusLine[]> {
  const key = getNextKey("tencent");
  if (!key) return [];

  // 注意：腾讯坐标格式是 lat,lng（与高德相反）
  const url = `${TENCENT_BASE}/ws/direction/v1/transit/?from=${from.lat},${from.lng}&to=${to.lat},${to.lng}&city=${encodeURIComponent(city)}&key=${key}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    const data = await res.json();

    if (data.status !== 0) {
      const msg = data.message || "";
      if (msg.includes("key") || msg.includes("limit")) {
        disableKey("tencent", key);
      }
      return [];
    }

    const lines: BusLine[] = [];
    const routes = data.result?.routes || [];

    for (const route of routes) {
      const steps = route.steps || [];
      const busSteps = steps.filter((s: any) => s.mode === "TRANSIT" && s.lines);

      for (const step of busSteps) {
        for (const line of step.lines || []) {
          const lineName = line.title || "";
          if (!lineName) continue;

          // 提取线路信息
          const distance = (line.distance || route.distance || 0) / 1000; // m → km
          const duration = (line.duration || route.duration || 0) / 60; // s → min

          // 提取站点
          const viaStations: string[] = [];
          if (line.via_stops) {
            viaStations.push(...line.via_stops.map((s: any) => s.title || s));
          }

          lines.push({
            name: lineName,
            city,
            distance: parseFloat(distance.toFixed(2)),
            duration: parseFloat(duration.toFixed(1)),
            fromStation: line.departure_stop?.title || step.origin?.title || "",
            toStation: line.arrival_stop?.title || step.destination?.title || "",
            viaStations,
            fetchedAt: new Date().toISOString(),
            source: "tencent",
          });
        }
      }
    }

    return lines;
  } catch (err) {
    console.warn(`  ⚠️ 换乘查询失败: ${(err as Error).message}`);
    return [];
  }
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  const cityName = args[0] || "北京";
  const maxStations = parseInt(args[1] || "50"); // 最多搜索多少个公交站

  console.log("=== 腾讯地图公交数据获取（换乘方案策略） ===");
  console.log(`城市: ${cityName}`);
  console.log(`最大站点数: ${maxStations}`);

  const poolStatus = getTencentKeyPool().getStatus("tencent");
  console.log(`腾讯 Key 池: ${poolStatus.activeKeys}/${poolStatus.totalKeys} 可用`);

  if (poolStatus.activeKeys === 0) {
    console.error("❌ 没有可用的腾讯 Key");
    process.exit(1);
  }
  console.log("");

  const center = CITY_CENTERS[cityName];
  if (!center) {
    console.error(`❌ 暂不支持城市: ${cityName}`);
    process.exit(1);
  }

  // 1. 搜索公交站
  console.log("📍 搜索公交站...");
  const allStations: BusStation[] = [];
  for (let page = 1; page <= Math.ceil(maxStations / 20); page++) {
    process.stdout.write(`\r  第 ${page} 页...`);
    const stations = await searchBusStations(cityName, center, page);
    if (stations.length === 0) break;
    allStations.push(...stations);
    if (allStations.length >= maxStations) break;
    await delay(200);
  }
  console.log(`\n  ✓ 找到 ${Math.min(allStations.length, maxStations)} 个公交站`);

  // 截断
  const stations = allStations.slice(0, maxStations);

  // 2. 站点间换乘查询，提取线路
  console.log("\n🚌 站点间换乘查询...");
  const lineMap = new Map<string, BusLine>();
  let queryCount = 0;

  // 策略：城市中心站 ↔ 周边站，提取线路
  // 选择距离市中心最近的几个站作为起点
  const nearStations = [...stations].sort((a, b) => a.distance - b.distance).slice(0, 10);

  for (const startStation of nearStations) {
    // 用换乘查询，提取经过的线路
    for (const endStation of stations.slice(0, 50)) {
      if (startStation.id === endStation.id) continue;

      queryCount++;
      process.stdout.write(`\r  [${queryCount}] ${startStation.title} → ${endStation.title}...`);

      const lines = await queryTransit(
        cityName,
        startStation.location,
        endStation.location
      );

      for (const line of lines) {
        if (!lineMap.has(line.name)) {
          lineMap.set(line.name, line);
        }
      }

      await delay(300); // 控制频率
    }
  }

  console.log(`\n  ✓ 提取到 ${lineMap.size} 条线路`);

  // 3. 保存
  const results = Array.from(lineMap.values());
  const dir = path.join(process.cwd(), "src/lib/bus-data-tencent", cityName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const dataFile = path.join(dir, "results.json");
  fs.writeFileSync(dataFile, JSON.stringify(results, null, 2), "utf-8");

  console.log(`\n=== 获取完成 ===`);
  console.log(`总线路数: ${results.length}`);
  console.log(`数据文件: ${dataFile}`);

  // 4. 输出样例
  if (results.length > 0) {
    console.log("\n样例线路:");
    results.slice(0, 3).forEach((l) => {
      console.log(`  - ${l.name}: ${l.fromStation} → ${l.toStation}, ${l.distance}km, ${l.duration}min`);
    });
  }
}

main().catch((err) => {
  console.error("执行错误:", err);
  process.exit(1);
});