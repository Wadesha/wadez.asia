export type HeatLevel = "low" | "medium" | "high" | "extreme";
export type ZoneType = "commercial" | "residential" | "industrial" | "park" | "water";

export interface HeatZone {
  id: string;
  name: string;
  type: ZoneType;
  city: string;
  lng: number;
  lat: number;
  temperature: number;
  heatIslandIntensity: number;
  level: HeatLevel;
  area: number;
  factors: {
    greenCoverRate: number;
    buildingDensity: number;
    trafficDensity: number;
    waterProximity: number;
  };
  mitigationScore: number;
}

export interface HeatIslandCity {
  id: string;
  name: string;
  center: [number, number];
  avgTemperature: number;
  avgHeatIslandIntensity: number;
  zones: HeatZone[];
  mitigationStrategies: string[];
  dataSource: "simulated" | "real";
}

export const HEAT_LEVEL_LABELS: Record<HeatLevel, string> = {
  low: "低温区",
  medium: "中温区",
  high: "高温区",
  extreme: "极高温区",
};

export const HEAT_LEVEL_COLORS: Record<HeatLevel, string> = {
  low: "#3b82f6",
  medium: "#f59e0b",
  high: "#ef4444",
  extreme: "#7c2d12",
};

export const ZONE_TYPE_LABELS: Record<ZoneType, string> = {
  commercial: "商业区",
  residential: "居住区",
  industrial: "工业区",
  park: "公园绿地",
  water: "水域周边",
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function calculateHeatLevel(intensity: number): HeatLevel {
  if (intensity < 1.5) return "low";
  if (intensity < 3.0) return "medium";
  if (intensity < 5.0) return "high";
  return "extreme";
}

function generateHeatZone(
  id: string,
  name: string,
  type: ZoneType,
  city: string,
  centerLng: number,
  centerLat: number,
  idx: number
): HeatZone {
  const offsetLng = (seededRandom(idx * 7 + 1) - 0.5) * 0.08;
  const offsetLat = (seededRandom(idx * 11 + 3) - 0.5) * 0.06;

  let baseTemp = 28 + seededRandom(idx * 13 + 5) * 6;
  if (type === "park" || type === "water") baseTemp -= 3;
  if (type === "commercial" || type === "industrial") baseTemp += 2;

  const temperature = Math.round(baseTemp * 10) / 10;

  let baseIntensity = 2.0;
  if (type === "commercial") baseIntensity = 4.5;
  if (type === "industrial") baseIntensity = 5.0;
  if (type === "residential") baseIntensity = 3.0;
  if (type === "park") baseIntensity = 0.5;
  if (type === "water") baseIntensity = 0.3;

  const heatIslandIntensity = Math.round((baseIntensity + seededRandom(idx * 17 + 7) * 2) * 10) / 10;
  const level = calculateHeatLevel(heatIslandIntensity);

  const greenCoverRate = type === "park" ? 80 : type === "water" ? 0 : Math.round(10 + seededRandom(idx * 23 + 11) * 30);
  const buildingDensity = type === "park" || type === "water" ? 5 : Math.round(30 + seededRandom(idx * 29 + 13) * 50);
  const trafficDensity = type === "commercial" || type === "industrial" ? Math.round(50 + seededRandom(idx * 31 + 15) * 40) : Math.round(10 + seededRandom(idx * 37 + 17) * 30);
  const waterProximity = type === "water" ? 100 : Math.round(seededRandom(idx * 41 + 19) * 30);

  const mitigationScore = Math.round(
    (greenCoverRate * 0.4 + (100 - buildingDensity) * 0.3 + (100 - trafficDensity) * 0.2 + waterProximity * 0.1) / 1.5
  );

  const area = Math.round(50 + seededRandom(idx * 43 + 21) * 200);

  return {
    id,
    name,
    type,
    city,
    lng: centerLng + offsetLng,
    lat: centerLat + offsetLat,
    temperature,
    heatIslandIntensity,
    level,
    area,
    factors: {
      greenCoverRate,
      buildingDensity,
      trafficDensity,
      waterProximity,
    },
    mitigationScore,
  };
}

function generateCityData(
  id: string,
  name: string,
  center: [number, number],
  zonesData: Array<{ name: string; type: ZoneType }>
): HeatIslandCity {
  const zones = zonesData.map((z, i) =>
    generateHeatZone(`${id}-zone-${i}`, z.name, z.type, name, center[0], center[1], i)
  );

  const avgTemperature = Math.round((zones.reduce((s, z) => s + z.temperature, 0) / zones.length) * 10) / 10;
  const avgHeatIslandIntensity = Math.round((zones.reduce((s, z) => s + z.heatIslandIntensity, 0) / zones.length) * 10) / 10;

  const strategies = [
    "增加城市绿地面积，建设口袋公园",
    "推广绿色屋顶和垂直绿化",
    "优化城市通风廊道布局",
    "使用高反射率建筑材料",
    "增加水体和湿地面积",
    "限制高密度建筑群建设",
  ];

  return {
    id,
    name,
    center,
    avgTemperature,
    avgHeatIslandIntensity,
    zones,
    mitigationStrategies: strategies.slice(0, 3 + Math.floor(seededRandom(zones.length) * 2)),
    dataSource: "simulated",
  };
}

const BEIJING_ZONES = [
  { name: "CBD国贸区域", type: "commercial" as ZoneType },
  { name: "中关村软件园", type: "commercial" as ZoneType },
  { name: "亦庄开发区", type: "industrial" as ZoneType },
  { name: "天通苑居住区", type: "residential" as ZoneType },
  { name: "奥林匹克公园", type: "park" as ZoneType },
  { name: "颐和园", type: "park" as ZoneType },
  { name: "昆玉河沿线", type: "water" as ZoneType },
  { name: "回龙观社区", type: "residential" as ZoneType },
];

const SHANGHAI_ZONES = [
  { name: "陆家嘴金融区", type: "commercial" as ZoneType },
  { name: "南京路商圈", type: "commercial" as ZoneType },
  { name: "浦东张江", type: "industrial" as ZoneType },
  { name: "黄浦江滨江", type: "water" as ZoneType },
  { name: "世纪公园", type: "park" as ZoneType },
  { name: "虹桥商务区", type: "commercial" as ZoneType },
  { name: "古北新区", type: "residential" as ZoneType },
  { name: "苏州河沿岸", type: "water" as ZoneType },
];

const GUANGZHOU_ZONES = [
  { name: "天河CBD", type: "commercial" as ZoneType },
  { name: "珠江新城", type: "commercial" as ZoneType },
  { name: "琶洲互联网集聚区", type: "commercial" as ZoneType },
  { name: "白云新城", type: "residential" as ZoneType },
  { name: "珠江沿岸", type: "water" as ZoneType },
  { name: "白云山风景区", type: "park" as ZoneType },
  { name: "黄埔工业区", type: "industrial" as ZoneType },
  { name: "大学城", type: "residential" as ZoneType },
];

const HEAT_ISLAND_CITIES: HeatIslandCity[] = [
  generateCityData("beijing", "北京", [116.4, 39.9], BEIJING_ZONES),
  generateCityData("shanghai", "上海", [121.47, 31.23], SHANGHAI_ZONES),
  generateCityData("guangzhou", "广州", [113.26, 23.13], GUANGZHOU_ZONES),
];

export function getHeatIslandCities(): HeatIslandCity[] {
  return HEAT_ISLAND_CITIES;
}

export function getHeatIslandCityById(id: string): HeatIslandCity | undefined {
  return HEAT_ISLAND_CITIES.find((c) => c.id === id);
}

export function getCities(): string[] {
  return HEAT_ISLAND_CITIES.map((c) => c.name);
}