export type POICategory =
  | "food"
  | "shopping"
  | "entertainment"
  | "education"
  | "healthcare"
  | "transport"
  | "public-service"
  | "residential";

export interface POI {
  id: string;
  name: string;
  category: POICategory;
  subCategory: string;
  lng: number;
  lat: number;
  city: string;
  address?: string;
  rating?: number;
}

export interface HeatGridCell {
  id: string;
  lng: number;
  lat: number;
  size: number;
  totalCount: number;
  counts: Record<POICategory, number>;
}

const CATEGORY_LABELS: Record<POICategory, string> = {
  food: "餐饮美食",
  shopping: "购物消费",
  entertainment: "休闲娱乐",
  education: "文化教育",
  healthcare: "医疗健康",
  transport: "交通出行",
  "public-service": "公共服务",
  residential: "居住小区",
};

const CATEGORY_COLORS: Record<POICategory, string> = {
  food: "#ef4444",
  shopping: "#f59e0b",
  entertainment: "#8b5cf6",
  education: "#3b82f6",
  healthcare: "#10b981",
  transport: "#06b6d4",
  "public-service": "#6b7280",
  residential: "#84cc16",
};

const SUB_CATEGORIES: Record<POICategory, string[]> = {
  food: ["中式餐厅", "西式快餐", "咖啡馆", "火锅店", "烧烤店", "日料店", "奶茶店", "面馆"],
  shopping: ["购物中心", "超市", "便利店", "服装店", "数码店", "书店", "家居店", "美妆店"],
  entertainment: ["电影院", "KTV", "健身房", "游戏厅", "酒吧", "网吧", "桌游吧", "剧本杀"],
  education: ["小学", "中学", "大学", "幼儿园", "培训机构", "图书馆", "博物馆", "美术馆"],
  healthcare: ["综合医院", "社区诊所", "药店", "牙科诊所", "中医馆", "体检中心", "宠物医院", "眼科医院"],
  transport: ["地铁站", "公交站", "火车站", "机场", "停车场", "共享单车点", "出租车站", "汽车站"],
  "public-service": ["政府办公", "派出所", "社区中心", "邮局", "银行", "消防站", "公园", "体育馆"],
  residential: ["住宅小区", "公寓", "别墅", "保障房", "老小区", "新小区", "学区房", "江景房"],
};

interface CityConfig {
  name: string;
  center: [number, number];
  cores: Array<{
    name: string;
    center: [number, number];
    radius: number;
    intensity: number;
  }>;
  count: number;
}

const CITY_CONFIGS: CityConfig[] = [
  {
    name: "北京",
    center: [116.4074, 39.9042],
    cores: [
      { name: "国贸CBD", center: [116.46, 39.91], radius: 0.04, intensity: 1.8 },
      { name: "王府井", center: [116.41, 39.915], radius: 0.025, intensity: 1.5 },
      { name: "中关村", center: [116.31, 39.98], radius: 0.03, intensity: 1.4 },
      { name: "西单", center: [116.37, 39.91], radius: 0.02, intensity: 1.3 },
      { name: "三里屯", center: [116.45, 39.93], radius: 0.02, intensity: 1.6 },
    ],
    count: 2500,
  },
  {
    name: "上海",
    center: [121.4737, 31.2304],
    cores: [
      { name: "陆家嘴", center: [121.505, 31.235], radius: 0.035, intensity: 1.8 },
      { name: "南京路", center: [121.475, 31.235], radius: 0.025, intensity: 1.6 },
      { name: "徐家汇", center: [121.435, 31.195], radius: 0.03, intensity: 1.4 },
      { name: "静安寺", center: [121.45, 31.225], radius: 0.02, intensity: 1.5 },
      { name: "新天地", center: [121.47, 31.22], radius: 0.015, intensity: 1.7 },
    ],
    count: 2500,
  },
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function gaussianRandom(rand: () => number): number {
  const u1 = rand();
  const u2 = rand();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function generateCityPOIs(config: CityConfig, seedBase: number): POI[] {
  const pois: POI[] = [];
  const rand = seededRandom(seedBase);

  const categoryWeights: Record<POICategory, number> = {
    food: 0.22,
    shopping: 0.18,
    entertainment: 0.12,
    education: 0.1,
    healthcare: 0.08,
    transport: 0.12,
    "public-service": 0.08,
    residential: 0.1,
  };

  for (let i = 0; i < config.count; i++) {
    const r = rand();
    let category: POICategory = "food";
    let cumWeight = 0;
    for (const [cat, weight] of Object.entries(categoryWeights)) {
      cumWeight += weight;
      if (r <= cumWeight) {
        category = cat as POICategory;
        break;
      }
    }

    const subCats = SUB_CATEGORIES[category];
    const subCategory = subCats[Math.floor(rand() * subCats.length)];

    let lng = config.center[0];
    let lat = config.center[1];

    const coreIndex = Math.floor(rand() * config.cores.length);
    const core = config.cores[coreIndex];
    const spread = core.radius * (0.5 + Math.abs(gaussianRandom(rand)) * 0.5);

    const angle = rand() * Math.PI * 2;
    const dist = spread * Math.sqrt(rand());
    lng = core.center[0] + Math.cos(angle) * dist;
    lat = core.center[1] + Math.sin(angle) * dist;

    lng += (rand() - 0.5) * 0.08;
    lat += (rand() - 0.5) * 0.06;

    const id = `${config.name}-${category}-${i}`;
    const name = `${subCategory}（${config.name}${(i % 500) + 1}号店）`;

    pois.push({
      id,
      name,
      category,
      subCategory,
      lng: Math.round(lng * 100000) / 100000,
      lat: Math.round(lat * 100000) / 100000,
      city: config.name,
      address: `${config.name}市${core.name}附近`,
      rating: Math.round((3.5 + rand() * 1.5) * 10) / 10,
    });
  }

  return pois;
}

let allPOIs: POI[] | null = null;

function getAllPOIs(): POI[] {
  if (!allPOIs) {
    allPOIs = [];
    CITY_CONFIGS.forEach((config, idx) => {
      const cityPOIs = generateCityPOIs(config, idx * 10000 + 42);
      allPOIs!.push(...cityPOIs);
    });
  }
  return allPOIs;
}

function getPOIsByCity(city: string): POI[] {
  return getAllPOIs().filter((p) => p.city === city);
}

function getPOIsByCategory(city: string, categories: POICategory[]): POI[] {
  let pois = getPOIsByCity(city);
  if (categories.length > 0) {
    pois = pois.filter((p) => categories.includes(p.category));
  }
  return pois;
}

function getCities(): string[] {
  return CITY_CONFIGS.map((c) => c.name);
}

function getCityCenter(city: string): [number, number] {
  const config = CITY_CONFIGS.find((c) => c.name === city);
  return config ? config.center : [116.4074, 39.9042];
}

function generateHeatGrid(
  pois: POI[],
  centerLng: number,
  centerLat: number,
  gridSizeKm: number = 0.5,
  gridCount: number = 40
): HeatGridCell[] {
  const cells: HeatGridCell[] = [];
  const degreesPerKm = 0.009;
  const cellSize = gridSizeKm * degreesPerKm;
  const halfSize = (gridCount * cellSize) / 2;

  const minLng = centerLng - halfSize;
  const minLat = centerLat - halfSize;

  const grid: Record<string, HeatGridCell> = {};

  for (let i = 0; i < gridCount; i++) {
    for (let j = 0; j < gridCount; j++) {
      const cellLng = minLng + i * cellSize + cellSize / 2;
      const cellLat = minLat + j * cellSize + cellSize / 2;
      const id = `${i}-${j}`;
      grid[id] = {
        id,
        lng: cellLng,
        lat: cellLat,
        size: cellSize,
        totalCount: 0,
        counts: {
          food: 0,
          shopping: 0,
          entertainment: 0,
          education: 0,
          healthcare: 0,
          transport: 0,
          "public-service": 0,
          residential: 0,
        },
      };
    }
  }

  pois.forEach((poi) => {
    const i = Math.floor((poi.lng - minLng) / cellSize);
    const j = Math.floor((poi.lat - minLat) / cellSize);
    if (i >= 0 && i < gridCount && j >= 0 && j < gridCount) {
      const cell = grid[`${i}-${j}`];
      cell.totalCount++;
      cell.counts[poi.category]++;
    }
  });

  return Object.values(grid);
}

function getCityStats(city: string): Record<POICategory, number> {
  const pois = getPOIsByCity(city);
  const stats: Record<POICategory, number> = {
    food: 0,
    shopping: 0,
    entertainment: 0,
    education: 0,
    healthcare: 0,
    transport: 0,
    "public-service": 0,
    residential: 0,
  };
  pois.forEach((p) => {
    stats[p.category]++;
  });
  return stats;
}

export {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  SUB_CATEGORIES,
  CITY_CONFIGS,
  getAllPOIs,
  getPOIsByCity,
  getPOIsByCategory,
  getCities,
  getCityCenter,
  generateHeatGrid,
  getCityStats,
};
