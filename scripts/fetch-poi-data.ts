import * as fs from "fs";
import * as path from "path";

function loadEnvFile() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf-8");
  const lines = content.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, "");
    if (key && val && process.env[key] === undefined) {
      process.env[key] = val;
    }
  }
}

loadEnvFile();

const AMAP_KEYS = (process.env.AMAP_WEB_SERVICE_KEYS || "").split(",").map(k => k.trim()).filter(Boolean);
const TENCENT_KEYS = (process.env.TENCENT_MAP_KEYS || "").split(",").map(k => k.trim()).filter(Boolean);

let amapKeyIndex = 0;
function getNextAmapKey(): string | null {
  if (AMAP_KEYS.length === 0) return null;
  const key = AMAP_KEYS[amapKeyIndex % AMAP_KEYS.length];
  amapKeyIndex++;
  return key;
}

const POI_CATEGORIES = [
  { type: "150700", name: "交通设施服务-公交车站", label: "公交站" },
  { type: "150500", name: "交通设施服务-地铁站", label: "地铁站" },
  { type: "150200", name: "交通设施服务-火车站", label: "火车站" },
  { type: "150600", name: "交通设施服务-长途汽车站", label: "客运站" },
  { type: "150100", name: "交通设施服务-机场", label: "机场" },
  { type: "151100", name: "交通设施服务-轮渡", label: "码头" },
  { type: "190000", name: "地名地址信息", label: "地标" },
  { type: "140000", name: "交通设施服务", label: "交通" },
];

const CITIES = ["北京", "上海", "广州", "深圳", "杭州"];

interface POIRecord {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  address: string;
  longitude: number;
  latitude: number;
  city: string;
  tel?: string;
  rating?: number;
}

async function fetchPOIs(city: string, categoryType: string, categoryLabel: string, page = 1): Promise<POIRecord[]> {
  const key = getNextAmapKey();
  if (!key) return [];

  const url = `https://restapi.amap.com/v3/place/text?keywords=&city=${encodeURIComponent(city)}&types=${categoryType}&offset=50&page=${page}&key=${key}&extensions=base&output=json`;

  try {
    const res = await fetch(url);
    const data = await res.json() as any;

    if (data.status !== "1") {
      console.warn(`[${city}-${categoryLabel}] API错误: ${data.info}`);
      if (data.infocode === "10044" || data.infocode === "10015") {
        console.warn(`Key可能超限，尝试下一个Key...`);
        return fetchPOIs(city, categoryType, categoryLabel, page);
      }
      return [];
    }

    const pois = data.pois || [];
    return pois.map((p: any) => {
      const [lng, lat] = (p.location || "0,0").split(",").map(Number);
      return {
        id: p.id || `poi-${city}-${categoryType}-${Math.random().toString(36).slice(2, 10)}`,
        name: p.name || "未知",
        category: mapCategory(categoryType),
        categoryLabel: categoryLabel,
        description: p.type || "",
        address: p.address || "",
        longitude: lng,
        latitude: lat,
        city: city,
        tel: p.tel || undefined,
        rating: p.rating ? parseFloat(p.rating) : undefined,
      };
    });
  } catch (err) {
    console.error(`[${city}-${categoryLabel}] 请求失败:`, (err as Error).message);
    return [];
  }
}

function mapCategory(amapType: string): string {
  const mapping: Record<string, string> = {
    "150700": "bus",
    "150500": "metro",
    "150200": "train",
    "150600": "coach",
    "150100": "airport",
    "151100": "ferry",
    "190000": "landmark",
    "140000": "other",
  };
  return mapping[amapType] || "other";
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log("开始获取POI数据...");
  console.log(`可用高德Key: ${AMAP_KEYS.length}个`);
  console.log(`目标城市: ${CITIES.join(", ")}`);
  console.log(`类别数: ${POI_CATEGORIES.length}`);

  const allPOIs: POIRecord[] = [];
  const outputDir = path.join(process.cwd(), "public", "poi-data");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const city of CITIES) {
    console.log(`\n===== 城市: ${city} =====`);
    const cityPOIs: POIRecord[] = [];

    for (const cat of POI_CATEGORIES) {
      console.log(`  获取 ${cat.label} (${cat.type})...`);

      for (let page = 1; page <= 3; page++) {
        const pois = await fetchPOIs(city, cat.type, cat.label, page);
        if (pois.length === 0) break;
        cityPOIs.push(...pois);
        console.log(`    第${page}页: ${pois.length}条`);
        await sleep(200);
      }

      await sleep(300);
    }

    console.log(`  ${city} 共获取 ${cityPOIs.length} 条POI`);

    const cityFile = path.join(outputDir, `${city}.json`);
    fs.writeFileSync(cityFile, JSON.stringify(cityPOIs, null, 2), "utf-8");
    console.log(`  已保存到: ${cityFile}`);

    allPOIs.push(...cityPOIs);
  }

  const summary = {
    total: allPOIs.length,
    cities: CITIES,
    categories: [...new Set(allPOIs.map(p => p.categoryLabel))],
    byCity: CITIES.map(city => ({
      city,
      count: allPOIs.filter(p => p.city === city).length,
    })),
    byCategory: POI_CATEGORIES.map(cat => ({
      category: cat.label,
      count: allPOIs.filter(p => p.categoryLabel === cat.label).length,
    })),
    lastUpdate: new Date().toISOString(),
  };

  const summaryFile = path.join(outputDir, "summary.json");
  fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2), "utf-8");

  console.log("\n===== 汇总 =====");
  console.log(`总计: ${allPOIs.length} 条POI`);
  console.log(`城市数: ${CITIES.length}`);
  console.log(`摘要已保存: ${summaryFile}`);
}

main().catch(console.error);
