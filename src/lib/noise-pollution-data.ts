export type NoiseLevel = "quiet" | "moderate" | "loud" | "very-loud" | "harmful";
export type NoiseSource = "traffic" | "construction" | "industry" | "entertainment" | "residential";

export interface NoiseMonitor {
  id: string;
  name: string;
  city: string;
  lng: number;
  lat: number;
  decibel: number;
  level: NoiseLevel;
  sources: NoiseSource[];
  peakHour: number;
  peakDecibel: number;
  affectedArea: number;
  affectedPopulation: number;
  trend: "rising" | "stable" | "falling";
}

export interface NoiseCity {
  id: string;
  name: string;
  center: [number, number];
  avgDecibel: number;
  monitors: NoiseMonitor[];
  hotspots: string[];
}

export const NOISE_LEVEL_LABELS: Record<NoiseLevel, string> = {
  quiet: "安静",
  moderate: "适中",
  loud: "较吵",
  "very-loud": "很吵",
  harmful: "有害",
};

export const NOISE_LEVEL_COLORS: Record<NoiseLevel, string> = {
  quiet: "#10b981",
  moderate: "#3b82f6",
  loud: "#f59e0b",
  "very-loud": "#ef4444",
  harmful: "#7c2d12",
};

export const NOISE_LEVEL_RANGES: Record<NoiseLevel, { min: number; max: number }> = {
  quiet: { min: 0, max: 45 },
  moderate: { min: 45, max: 60 },
  loud: { min: 60, max: 70 },
  "very-loud": { min: 70, max: 85 },
  harmful: { min: 85, max: 120 },
};

export const NOISE_SOURCE_LABELS: Record<NoiseSource, string> = {
  traffic: "交通噪声",
  construction: "施工噪声",
  industry: "工业噪声",
  entertainment: "娱乐噪声",
  residential: "生活噪声",
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function calculateNoiseLevel(decibel: number): NoiseLevel {
  if (decibel < 45) return "quiet";
  if (decibel < 60) return "moderate";
  if (decibel < 70) return "loud";
  if (decibel < 85) return "very-loud";
  return "harmful";
}

function generateMonitor(
  id: string,
  name: string,
  city: string,
  centerLng: number,
  centerLat: number,
  idx: number
): NoiseMonitor {
  const offsetLng = (seededRandom(idx * 7 + 1) - 0.5) * 0.1;
  const offsetLat = (seededRandom(idx * 11 + 3) - 0.5) * 0.08;

  const baseDecibel = 40 + seededRandom(idx * 13 + 5) * 50;
  const decibel = Math.round(baseDecibel);
  const level = calculateNoiseLevel(decibel);

  const allSources: NoiseSource[] = ["traffic", "construction", "industry", "entertainment", "residential"];
  const sourceCount = 1 + Math.floor(seededRandom(idx * 17 + 7) * 3);
  const sources = allSources.slice(0, sourceCount);

  const peakHour = Math.floor(seededRandom(idx * 19 + 9) * 24);
  const peakDecibel = Math.round(decibel + seededRandom(idx * 23 + 11) * 15);

  const affectedArea = Math.round(20 + seededRandom(idx * 29 + 13) * 100);
  const affectedPopulation = Math.round(affectedArea * 50 * (1 + seededRandom(idx * 31 + 15)));

  const trends: ("rising" | "stable" | "falling")[] = ["rising", "stable", "falling"];
  const trend = trends[Math.floor(seededRandom(idx * 37 + 17) * 3)];

  return {
    id,
    name,
    city,
    lng: centerLng + offsetLng,
    lat: centerLat + offsetLat,
    decibel,
    level,
    sources,
    peakHour,
    peakDecibel,
    affectedArea,
    affectedPopulation,
    trend,
  };
}

const BEIJING_MONITORS = [
  { name: "国贸CBD路口" },
  { name: "三里屯酒吧街" },
  { name: "北京站广场" },
  { name: "中关村大街" },
  { name: "回龙观社区" },
  { name: "奥林匹克公园" },
  { name: "望京SOHO" },
  { name: "西单商业街" },
];

const SHANGHAI_MONITORS = [
  { name: "南京路步行街" },
  { name: "陆家嘴地铁站" },
  { name: "外滩观景平台" },
  { name: "虹桥火车站" },
  { name: "人民广场" },
  { name: "静安寺商圈" },
  { name: "徐家汇天桥" },
  { name: "新天地酒吧区" },
];

const GUANGZHOU_MONITORS = [
  { name: "天河路CBD" },
  { name: "北京路步行街" },
  { name: "广州火车站" },
  { name: "珠江新城" },
  { name: "白云机场周边" },
  { name: "大学城生活区" },
  { name: "琶洲会展中心" },
  { name: "上下九步行街" },
];

function generateCityData(
  id: string,
  name: string,
  center: [number, number],
  monitorNames: Array<{ name: string }>
): NoiseCity {
  const monitors = monitorNames.map((m, i) =>
    generateMonitor(`${id}-mon-${i}`, m.name, name, center[0], center[1], i)
  );

  const avgDecibel = Math.round(monitors.reduce((s, m) => s + m.decibel, 0) / monitors.length);

  const hotspots = monitors
    .filter((m) => m.level === "very-loud" || m.level === "harmful")
    .map((m) => m.name);

  return {
    id,
    name,
    center,
    avgDecibel,
    monitors,
    hotspots,
  };
}

const NOISE_CITIES: NoiseCity[] = [
  generateCityData("beijing", "北京", [116.4, 39.9], BEIJING_MONITORS),
  generateCityData("shanghai", "上海", [121.47, 31.23], SHANGHAI_MONITORS),
  generateCityData("guangzhou", "广州", [113.26, 23.13], GUANGZHOU_MONITORS),
];

export function getNoiseCities(): NoiseCity[] {
  return NOISE_CITIES;
}

export function getNoiseCityById(id: string): NoiseCity | undefined {
  return NOISE_CITIES.find((c) => c.id === id);
}

export function getCities(): string[] {
  return NOISE_CITIES.map((c) => c.name);
}