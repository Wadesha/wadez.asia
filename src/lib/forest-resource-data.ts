export type ForestType = "natural" | "plantation" | "protection" | "economic";

export interface ForestArea {
  id: string;
  name: string;
  type: ForestType;
  city: string;
  lng: number;
  lat: number;
  area: number;
  coverage: number;
  stock: number;
  protectionLevel?: "national" | "provincial" | "municipal";
}

export interface ForestCity {
  id: string;
  name: string;
  center: [number, number];
  totalArea: number;
  avgCoverage: number;
  totalStock: number;
  protectedAreas: number;
  forests: ForestArea[];
}

export const FOREST_TYPE_LABELS: Record<ForestType, string> = {
  natural: "天然林",
  plantation: "人工林",
  protection: "防护林",
  economic: "经济林",
};

export const FOREST_TYPE_COLORS: Record<ForestType, string> = {
  natural: "#059669",
  plantation: "#10b981",
  protection: "#047857",
  economic: "#34d399",
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateForest(
  id: string,
  name: string,
  type: ForestType,
  city: string,
  centerLng: number,
  centerLat: number,
  idx: number
): ForestArea {
  const offsetLng = (seededRandom(idx * 7 + 1) - 0.5) * 0.15;
  const offsetLat = (seededRandom(idx * 11 + 3) - 0.5) * 0.12;

  const area = Math.round(50 + seededRandom(idx * 13 + 5) * 500);
  const coverage = Math.round(60 + seededRandom(idx * 17 + 7) * 35);
  const stock = Math.round(area * coverage * 0.8);

  const levels: ("national" | "provincial" | "municipal")[] = ["national", "provincial", "municipal"];
  const protectionLevel = type === "protection" ? levels[Math.floor(seededRandom(idx * 19 + 9) * 3)] : undefined;

  return {
    id,
    name,
    type,
    city,
    lng: centerLng + offsetLng,
    lat: centerLat + offsetLat,
    area,
    coverage,
    stock,
    protectionLevel,
  };
}

const BEIJING_FORESTS: ForestArea[] = [
  generateForest("bj-f-1", "百花山林区", "natural", "北京", 115.9, 39.7, 1),
  generateForest("bj-f-2", "松山自然保护区", "protection", "北京", 115.8, 40.5, 2),
  generateForest("bj-f-3", "八达岭林场", "plantation", "北京", 116.0, 40.3, 3),
  generateForest("bj-f-4", "西山国家森林公园", "protection", "北京", 116.1, 39.95, 4),
  generateForest("bj-f-5", "平谷桃园", "economic", "北京", 117.1, 40.15, 5),
];

const CHENGDU_FORESTS: ForestArea[] = [
  generateForest("cd-f-1", "青城山林区", "natural", "成都", 103.5, 30.9, 6),
  generateForest("cd-f-2", "都江堰保护区", "protection", "成都", 103.5, 31.0, 7),
  generateForest("cd-f-3", "龙泉山城市森林公园", "protection", "成都", 104.1, 30.5, 8),
  generateForest("cd-f-4", "金堂经济林", "economic", "成都", 104.4, 30.9, 9),
];

function generateCityData(
  id: string,
  name: string,
  center: [number, number],
  forests: ForestArea[]
): ForestCity {
  const totalArea = forests.reduce((s, f) => s + f.area, 0);
  const avgCoverage = Math.round(forests.reduce((s, f) => s + f.coverage, 0) / forests.length);
  const totalStock = forests.reduce((s, f) => s + f.stock, 0);
  const protectedAreas = forests.filter((f) => f.protectionLevel).length;

  return {
    id,
    name,
    center,
    totalArea,
    avgCoverage,
    totalStock,
    protectedAreas,
    forests,
  };
}

const FOREST_CITIES: ForestCity[] = [
  generateCityData("beijing", "北京", [116.4, 40.0], BEIJING_FORESTS),
  generateCityData("chengdu", "成都", [104.07, 30.65], CHENGDU_FORESTS),
];

export function getForestCities(): ForestCity[] {
  return FOREST_CITIES;
}

export function getForestCityById(id: string): ForestCity | undefined {
  return FOREST_CITIES.find((c) => c.id === id);
}

export function getCities(): string[] {
  return FOREST_CITIES.map((c) => c.name);
}