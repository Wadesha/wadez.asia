/**
 * 自动等待API额度刷新并立即开始获取数据
 *
 * 策略：
 * 1. 每分钟检测一次高德API额度是否恢复
 * 2. 一旦恢复，立即按城市顺序获取数据
 * 3. 每个城市使用数字+关键词遍历
 * 4. 获取的数据保存到 src/lib/bus-data/[城市]/
 */

import * as fs from "fs";
import * as path from "path";

// 从 .env.local 加载环境变量
function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("❌ .env.local 不存在");
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnv();

const KEYS = (process.env.AMAP_WEB_SERVICE_KEYS || "")
  .split(",")
  .map((k) => k.trim())
  .filter((k) => k.length >= 32);

if (KEYS.length === 0) {
  console.error("❌ 没有配置有效的高德API Key");
  process.exit(1);
}

let currentKeyIdx = 0;

function getNextKey(): string {
  const key = KEYS[currentKeyIdx % KEYS.length];
  currentKeyIdx++;
  return key;
}

// 城市配置
const CITIES = [
  { name: "上海", code: "021" },
  { name: "广州", code: "020" },
  { name: "深圳", code: "0755" },
  { name: "杭州", code: "0571" },
  { name: "南京", code: "025" },
  { name: "武汉", code: "027" },
  { name: "成都", code: "028" },
  { name: "西安", code: "029" },
  { name: "天津", code: "022" },
  { name: "重庆", code: "023" },
  { name: "苏州", code: "0512" },
  { name: "济南", code: "0531" },
  { name: "青岛", code: "0532" },
  { name: "郑州", code: "0371" },
  { name: "长沙", code: "0731" },
];

// 线路关键词遍历
const KEYWORDS = [
  // 数字线路
  ...Array.from({ length: 1000 }, (_, i) => `${i + 1}路`),
  // 字母线路
  "A路", "B路", "C路", "D路", "E路", "F路", "G路", "H路", "K路", "M路", "N路", "P路", "Q路", "T路", "X路", "Y路", "Z路",
  // 常见前缀
  "夜1路", "夜2路", "夜3路", "夜4路", "夜5路",
  "专1路", "专2路", "专3路", "专4路", "专5路", "专6路", "专7路", "专8路",
  "快1路", "快2路", "快3路", "快4路", "快5路",
  "特1路", "特2路", "特3路", "特4路", "特5路", "特6路", "特7路", "特8路",
];

interface BusLine {
  id: string;
  name: string;
  city: string;
  startStop: string;
  endStop: string;
  stops: { name: string; location: string; sequence: number }[];
  polyline: string;
  distance: number;
  fetchedAt: string;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 检测API额度是否恢复
async function checkApiAvailable(): Promise<boolean> {
  const key = KEYS[0];
  try {
    const url = `https://restapi.amap.com/v3/bus/linename?city=北京&keywords=1路&key=${key}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data.status === "1" || data.info !== "USER_DAILY_QUERY_OVER_LIMIT";
  } catch {
    return false;
  }
}

// 获取单条公交线路
async function fetchBusLine(city: string, keyword: string): Promise<BusLine[]> {
  const key = getNextKey();
  const url = `https://restapi.amap.com/v3/bus/linename?city=${encodeURIComponent(city)}&keywords=${encodeURIComponent(keyword)}&key=${key}`;

  try {
    const resp = await fetch(url);
    const data = await resp.json();

    if (data.status !== "1" || !data.buslines || data.buslines.length === 0) {
      return [];
    }

    return data.buslines.map((line: any) => ({
      id: line.id || `${city}-${keyword}-${Date.now()}`,
      name: line.name,
      city,
      startStop: line.start_stop || "",
      endStop: line.end_stop || "",
      stops: (line.stops || "").split(";").map((s: string, i: number) => {
        const parts = s.split(",");
        return {
          name: parts[0] || "",
          location: parts[1] || "",
          sequence: i + 1,
        };
      }),
      polyline: line.polyline || "",
      distance: parseFloat(line.distance) || 0,
      fetchedAt: new Date().toISOString(),
    }));
  } catch {
    return [];
  }
}

// 获取单个城市所有线路
async function fetchCity(city: string): Promise<BusLine[]> {
  const dataDir = path.join(process.cwd(), "src/lib/bus-data", city);
  const outputFile = path.join(dataDir, "lines.json");
  const progressFile = path.join(dataDir, "progress.json");

  // 断点续传
  let startIdx = 0;
  let existingLines: BusLine[] = [];
  if (fs.existsSync(progressFile)) {
    const progress = JSON.parse(fs.readFileSync(progressFile, "utf-8"));
    startIdx = progress.lastKeywordIdx || 0;
    if (fs.existsSync(outputFile)) {
      existingLines = JSON.parse(fs.readFileSync(outputFile, "utf-8"));
      console.log(`  📂 断点续传: 从第 ${startIdx} 个关键词继续，已有 ${existingLines.length} 条`);
    }
  }

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const allLines = [...existingLines];
  const seenNames = new Set(existingLines.map((l) => l.name));
  let foundCount = 0;
  let emptyCount = 0;

  for (let i = startIdx; i < KEYWORDS.length; i++) {
    const keyword = KEYWORDS[i];
    const lines = await fetchBusLine(city, keyword);

    if (lines.length > 0) {
      for (const line of lines) {
        if (!seenNames.has(line.name)) {
          seenNames.add(line.name);
          allLines.push(line);
          foundCount++;
        }
      }
      emptyCount = 0;
      console.log(`  ✅ [${i + 1}/${KEYWORDS.length}] ${keyword}: +${lines.length} (${allLines.length}总计)`);
    } else {
      emptyCount++;
      if (emptyCount % 50 === 0) {
        console.log(`  ⏭️ [${i + 1}/${KEYWORDS.length}] 连续 ${emptyCount} 个无结果`);
      }
    }

    // 保存进度（每50个关键词保存一次）
    if ((i + 1) % 50 === 0) {
      fs.writeFileSync(outputFile, JSON.stringify(allLines, null, 2));
      fs.writeFileSync(
        progressFile,
        JSON.stringify({ lastKeywordIdx: i + 1, totalFetched: allLines.length, lastUpdate: new Date().toISOString() })
      );
    }

    await delay(200); // 限速
  }

  // 最终保存
  fs.writeFileSync(outputFile, JSON.stringify(allLines, null, 2));
  fs.writeFileSync(
    progressFile,
    JSON.stringify({ lastKeywordIdx: KEYWORDS.length, totalFetched: allLines.length, lastUpdate: new Date().toISOString(), completed: true })
  );

  console.log(`  📊 ${city} 完成: ${allLines.length} 条线路 (新增 ${foundCount})`);
  return allLines;
}

async function main() {
  console.log("=== 自动等待额度刷新 + 数据获取 ===");
  console.log(`配置城市: ${CITIES.length} 个`);
  console.log(`API Keys: ${KEYS.length} 个`);
  console.log(`遍历关键词: ${KEYWORDS.length} 个/城市`);
  console.log();

  // 等待额度刷新
  console.log("⏳ 等待API额度刷新...");
  let waitCount = 0;
  while (true) {
    const available = await checkApiAvailable();
    if (available) {
      console.log(`✅ API额度已恢复! (等待了 ${waitCount} 分钟)`);
      break;
    }
    waitCount++;
    if (waitCount % 5 === 0) {
      console.log(`  ⏳ 已等待 ${waitCount} 分钟...`);
    }
    await delay(60000); // 每分钟检查一次
  }

  console.log();
  console.log("🚀 开始获取数据...");
  console.log();

  const logFile = path.join(process.cwd(), "logs", "auto-fetch.log");
  if (!fs.existsSync(path.dirname(logFile))) {
    fs.mkdirSync(path.dirname(logFile), { recursive: true });
  }

  const results: Record<string, number> = {};

  for (const city of CITIES) {
    console.log(`\n▶️  开始: ${city.name}`);
    const lines = await fetchCity(city.name);
    results[city.name] = lines.length;

    // 写日志
    fs.appendFileSync(
      logFile,
      `[${new Date().toISOString()}] ${city.name}: ${lines.length} 条\n`
    );
  }

  console.log("\n=== 获取完成 ===");
  for (const [city, count] of Object.entries(results)) {
    console.log(`  ${city}: ${count} 条`);
  }
  console.log(`\n日志: ${logFile}`);
}

main().catch(console.error);
