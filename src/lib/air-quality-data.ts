export type AQILevel = "good" | "moderate" | "unhealthy-sensitive" | "unhealthy" | "very-unhealthy" | "hazardous";

export interface AQIStation {
  id: string;
  name: string;
  lng: number;
  lat: number;
  aqi: number;
  level: AQILevel;
  pm25: number;
  pm10: number;
  so2: number;
  no2: number;
  co: number;
  o3: number;
  updateTime: string;
  trend: "up" | "down" | "stable";
}

export interface AQICity {
  id: string;
  name: string;
  center: [number, number];
  avgAQI: number;
  primaryPollutant: string;
  stations: AQIStation[];
  updateTime: string;
}

export const AQI_LEVELS: Record<AQILevel, { label: string; color: string; min: number; max: number }> = {
  good: { label: "优", color: "#00e400", min: 0, max: 50 },
  moderate: { label: "良", color: "#ffff00", min: 51, max: 100 },
  "unhealthy-sensitive": { label: "轻度污染", color: "#ff7e00", min: 101, max: 150 },
  unhealthy: { label: "中度污染", color: "#ff0000", min: 151, max: 200 },
  "very-unhealthy": { label: "重度污染", color: "#8f3f97", min: 201, max: 300 },
  hazardous: { label: "严重污染", color: "#7e0023", min: 301, max: 500 },
};

function aqiToLevel(aqi: number): AQILevel {
  if (aqi <= 50) return "good";
  if (aqi <= 100) return "moderate";
  if (aqi <= 150) return "unhealthy-sensitive";
  if (aqi <= 200) return "unhealthy";
  if (aqi <= 300) return "very-unhealthy";
  return "hazardous";
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateStation(
  id: string,
  name: string,
  centerLng: number,
  centerLat: number,
  idx: number,
  baseAqi: number
): AQIStation {
  const offsetLng = (seededRandom(idx * 7 + 1) - 0.5) * 0.25;
  const offsetLat = (seededRandom(idx * 11 + 3) - 0.5) * 0.2;
  const aqiVariation = (seededRandom(idx * 13 + 5) - 0.5) * 60;
  const aqi = Math.max(10, Math.min(400, Math.round(baseAqi + aqiVariation)));

  const pm25Ratio = 0.5 + seededRandom(idx * 17 + 7) * 0.3;
  const pm25 = Math.round(aqi * pm25Ratio * 0.75);
  const pm10 = Math.round(pm25 * (1.3 + seededRandom(idx * 19 + 9) * 0.8));
  const so2 = Math.round(5 + seededRandom(idx * 23 + 11) * 25);
  const no2 = Math.round(20 + seededRandom(idx * 29 + 13) * 60);
  const co = +(0.3 + seededRandom(idx * 31 + 15) * 1.5).toFixed(1);
  const o3 = Math.round(40 + seededRandom(idx * 37 + 17) * 100);

  const trends: ("up" | "down" | "stable")[] = ["up", "down", "stable"];
  const trend = trends[Math.floor(seededRandom(idx * 41 + 19) * 3)];

  return {
    id,
    name,
    lng: centerLng + offsetLng,
    lat: centerLat + offsetLat,
    aqi,
    level: aqiToLevel(aqi),
    pm25,
    pm10,
    so2,
    no2,
    co,
    o3,
    updateTime: "2026-07-28 14:00",
    trend,
  };
}

const STATION_NAMES = [
  "朝阳区农展馆",
  "海淀区万柳",
  "东城区东四",
  "西城区官园",
  "丰台区云岗",
  "石景山区古城",
  "通州区通州",
  "昌平区昌平镇",
  "大兴区黄村",
  "顺义区仁和",
  "房山区良乡",
  "门头沟区河滩",
];

function generateCityData(id: string, name: string, center: [number, number], baseAqi: number): AQICity {
  const stations = STATION_NAMES.map((s, i) =>
    generateStation(`${id}-${i}`, s, center[0], center[1], i, baseAqi)
  );

  const avgAQI = Math.round(stations.reduce((s, st) => s + st.aqi, 0) / stations.length);

  const pollutants = [
    { name: "PM2.5", value: stations.reduce((s, st) => s + st.pm25, 0) / stations.length },
    { name: "PM10", value: stations.reduce((s, st) => s + st.pm10, 0) / stations.length },
    { name: "NO2", value: stations.reduce((s, st) => s + st.no2, 0) / stations.length },
    { name: "O3", value: stations.reduce((s, st) => s + st.o3, 0) / stations.length },
  ];
  pollutants.sort((a, b) => b.value - a.value);

  return {
    id,
    name,
    center,
    avgAQI,
    primaryPollutant: pollutants[0]?.name || "PM2.5",
    stations,
    updateTime: "2026-07-28 14:00",
  };
}

const AQI_CITIES: AQICity[] = [
  generateCityData("beijing", "北京", [116.4, 39.9], 95),
  generateCityData("shanghai", "上海", [121.47, 31.23], 65),
  generateCityData("guangzhou", "广州", [113.26, 23.13], 55),
];

export function getAQICities(): AQICity[] {
  return AQI_CITIES;
}

export function getAQICityById(id: string): AQICity | undefined {
  return AQI_CITIES.find((c) => c.id === id);
}

export function getAQITrend(aqi: number, trend: "up" | "down" | "stable"): string {
  if (trend === "up") return `↑ ${Math.round(aqi * 0.05)}`;
  if (trend === "down") return `↓ ${Math.round(aqi * 0.05)}`;
  return "→ 持平";
}
