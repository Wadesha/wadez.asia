export type WaterResourceType = "river" | "lake" | "reservoir" | "hydrological_station" | "waterfall" | "spring";

export interface WaterResource {
  id: string;
  name: string;
  type: WaterResourceType;
  lng: number;
  lat: number;
  path?: [number, number][];
  lengthKm?: number;
  areaSqKm?: number;
  capacityM3?: number;
  averageFlow?: number;
  waterQuality: "I" | "II" | "III" | "IV" | "V" | "劣V";
  basin: string;
  description: string;
  waterLevel?: number;
  flowRate?: number;
}

export interface WaterBasin {
  id: string;
  name: string;
  center: [number, number];
  totalAreaSqKm: number;
  resources: WaterResource[];
  totalRiverLength: number;
  totalReservoirCapacity: number;
  dominantRiver: string;
  dataSource: "simulated" | "real";
}

export const WATER_TYPE_LABELS: Record<WaterResourceType, string> = {
  river: "河流",
  lake: "湖泊",
  reservoir: "水库",
  hydrological_station: "水文站",
  waterfall: "瀑布",
  spring: "泉眼",
};

export const WATER_TYPE_ICONS: Record<WaterResourceType, string> = {
  river: "🌊",
  lake: "🏞️",
  reservoir: "🏔️",
  hydrological_station: "📡",
  waterfall: "💦",
  spring: "💧",
};

export const WATER_TYPE_COLORS: Record<WaterResourceType, string> = {
  river: "#3b82f6",
  lake: "#06b6d4",
  reservoir: "#0891b2",
  hydrological_station: "#f59e0b",
  waterfall: "#0ea5e9",
  spring: "#22d3ee",
};

export const WATER_QUALITY_COLORS: Record<string, string> = {
  I: "#10b981",
  II: "#34d399",
  III: "#eab308",
  IV: "#f97316",
  V: "#ef4444",
  "劣V": "#7f1d1d",
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateRiverPath(
  startLng: number,
  startLat: number,
  lengthKm: number,
  seed: number
): [number, number][] {
  const path: [number, number][] = [];
  const segments = 8 + Math.floor(seededRandom(seed) * 6);
  let lng = startLng;
  let lat = startLat;
  let angle = seededRandom(seed + 1) * Math.PI * 0.5 - Math.PI * 0.25;

  for (let i = 0; i < segments; i++) {
    path.push([lng, lat]);
    const segLen = (lengthKm / segments / 111) * (0.7 + seededRandom(seed + i + 2) * 0.6);
    angle += (seededRandom(seed + i + 3) - 0.5) * 0.8;
    lng += Math.cos(angle) * segLen;
    lat += Math.sin(angle) * segLen * 0.7;
  }
  return path;
}

function generateBasin(id: string, name: string, center: [number, number], totalAreaSqKm: number): WaterBasin {
  const resources: WaterResource[] = [];
  const qualities: ("I" | "II" | "III" | "IV" | "V" | "劣V")[] = ["I", "II", "III", "IV", "V", "劣V"];

  // 3条主要河流
  for (let i = 0; i < 3; i++) {
    const lengthKm = 50 + seededRandom(i * 7 + 1) * 200;
    const startLng = center[0] + (seededRandom(i * 11 + 3) - 0.5) * 1.5;
    const startLat = center[1] + (seededRandom(i * 13 + 5) - 0.5) * 1;
    const path = generateRiverPath(startLng, startLat, lengthKm, i * 100);

    resources.push({
      id: `${id}-river-${i}`,
      name: `${name}支流${i + 1}`,
      type: "river",
      lng: path[Math.floor(path.length / 2)][0],
      lat: path[Math.floor(path.length / 2)][1],
      path,
      lengthKm: Math.round(lengthKm),
      averageFlow: Math.round(10 + seededRandom(i * 17 + 7) * 200),
      waterQuality: qualities[Math.floor(seededRandom(i * 19 + 9) * 4)],
      basin: name,
      description: `${name}主要支流，全长${Math.round(lengthKm)}公里`,
    });
  }

  // 2个湖泊
  for (let i = 0; i < 2; i++) {
    const area = 5 + seededRandom(i * 23 + 11) * 30;
    resources.push({
      id: `${id}-lake-${i}`,
      name: `${name}湖${i + 1}`,
      type: "lake",
      lng: center[0] + (seededRandom(i * 29 + 13) - 0.5) * 1.2,
      lat: center[1] + (seededRandom(i * 31 + 15) - 0.5) * 0.8,
      areaSqKm: Math.round(area * 10) / 10,
      averageFlow: 0,
      waterQuality: qualities[Math.floor(seededRandom(i * 37 + 17) * 3)],
      basin: name,
      description: `${name}流域天然湖泊，水域面积${Math.round(area)}平方公里`,
      waterLevel: 100 + seededRandom(i * 41 + 19) * 500,
    });
  }

  // 3个水库
  for (let i = 0; i < 3; i++) {
    const capacity = 1000 + seededRandom(i * 43 + 21) * 10000;
    resources.push({
      id: `${id}-reservoir-${i}`,
      name: `${name}水库${i + 1}`,
      type: "reservoir",
      lng: center[0] + (seededRandom(i * 47 + 23) - 0.5) * 1.3,
      lat: center[1] + (seededRandom(i * 53 + 25) - 0.5) * 0.9,
      capacityM3: Math.round(capacity * 10000),
      waterQuality: qualities[Math.floor(seededRandom(i * 59 + 27) * 3)],
      basin: name,
      description: `大型水利枢纽，总库容${Math.round(capacity)}万立方米`,
      waterLevel: 150 + seededRandom(i * 61 + 29) * 300,
    });
  }

  // 6个水文站
  for (let i = 0; i < 6; i++) {
    const flowRate = 5 + seededRandom(i * 67 + 31) * 80;
    resources.push({
      id: `${id}-station-${i}`,
      name: `水文站${i + 1}`,
      type: "hydrological_station",
      lng: center[0] + (seededRandom(i * 71 + 33) - 0.5) * 1.4,
      lat: center[1] + (seededRandom(i * 73 + 35) - 0.5) * 1,
      waterQuality: qualities[Math.floor(seededRandom(i * 79 + 37) * 5)],
      basin: name,
      description: `国家基本水文站，实时监测水位流量`,
      waterLevel: 80 + seededRandom(i * 83 + 39) * 200,
      flowRate: Math.round(flowRate),
    });
  }

  // 2个瀑布
  for (let i = 0; i < 2; i++) {
    resources.push({
      id: `${id}-waterfall-${i}`,
      name: `瀑布${i + 1}`,
      type: "waterfall",
      lng: center[0] + (seededRandom(i * 89 + 41) - 0.5) * 1.5,
      lat: center[1] + (seededRandom(i * 97 + 43) - 0.5) * 0.9,
      waterQuality: qualities[0],
      basin: name,
      description: `天然瀑布景观，落差${30 + Math.round(seededRandom(i * 101 + 45) * 80)}米`,
    });
  }

  // 2个泉眼
  for (let i = 0; i < 2; i++) {
    resources.push({
      id: `${id}-spring-${i}`,
      name: `泉${i + 1}`,
      type: "spring",
      lng: center[0] + (seededRandom(i * 103 + 47) - 0.5) * 1.6,
      lat: center[1] + (seededRandom(i * 107 + 49) - 0.5) * 0.8,
      waterQuality: qualities[0],
      basin: name,
      description: `天然矿泉，水质优良，流量${(0.5 + seededRandom(i * 109 + 51) * 5).toFixed(1)}m³/s`,
      flowRate: Math.round(500 + seededRandom(i * 113 + 53) * 5000),
    });
  }

  const totalRiverLength = resources
    .filter((r) => r.type === "river")
    .reduce((s, r) => s + (r.lengthKm || 0), 0);

  const totalReservoirCapacity = resources
    .filter((r) => r.type === "reservoir")
    .reduce((s, r) => s + (r.capacityM3 || 0), 0);

  return {
    id,
    name,
    center,
    totalAreaSqKm,
    resources,
    totalRiverLength: Math.round(totalRiverLength),
    totalReservoirCapacity: Math.round(totalReservoirCapacity / 10000000),
    dominantRiver: resources.find((r) => r.type === "river")?.name || "长江",
    dataSource: "simulated",
  };
}

const WATER_BASINS: WaterBasin[] = [
  generateBasin("yangtze", "长江流域", [104.0, 30.5], 1800000),
  generateBasin("yellow-river", "黄河流域", [103.8, 36.0], 752000),
];

export function getWaterBasins(): WaterBasin[] {
  return WATER_BASINS;
}

export function getWaterBasinById(id: string): WaterBasin | undefined {
  return WATER_BASINS.find((b) => b.id === id);
}
