export type LandUseType =
  | "cultivated"
  | "forest"
  | "grassland"
  | "water"
  | "urban"
  | "rural"
  | "industrial"
  | "transport"
  | "other";

export interface LandUsePatch {
  id: string;
  type: LandUseType;
  name: string;
  areaSqKm: number;
  path: [number, number][];
  centroid: [number, number];
  elevation: number;
  slope: number;
  soilQuality?: number;
  protectionLevel?: "national" | "provincial" | "municipal" | "none";
  description: string;
}

export interface LandUseRegion {
  id: string;
  name: string;
  level: "city" | "county";
  center: [number, number];
  totalAreaSqKm: number;
  patches: LandUsePatch[];
  areaByType: Record<LandUseType, number>;
  percentageByType: Record<LandUseType, number>;
}

export const LAND_USE_LABELS: Record<LandUseType, string> = {
  cultivated: "耕地",
  forest: "林地",
  grassland: "草地",
  water: "水域",
  urban: "城镇建设用地",
  rural: "农村居民点",
  industrial: "工矿用地",
  transport: "交通用地",
  other: "其他土地",
};

export const LAND_USE_COLORS: Record<LandUseType, string> = {
  cultivated: "#facc15",
  forest: "#22c55e",
  grassland: "#84cc16",
  water: "#3b82f6",
  urban: "#6b7280",
  rural: "#a1a1aa",
  industrial: "#7c3aed",
  transport: "#f97316",
  other: "#d4d4d8",
};

export const LAND_USE_ICONS: Record<LandUseType, string> = {
  cultivated: "🌾",
  forest: "🌲",
  grassland: "🌿",
  water: "💧",
  urban: "🏙️",
  rural: "🏘️",
  industrial: "🏭",
  transport: "🛣️",
  other: "🗺️",
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generatePolygon(
  centerLng: number,
  centerLat: number,
  idx: number,
  scale: number
): [number, number][] {
  const sides = 5 + Math.floor(seededRandom(idx * 3 + 1) * 4);
  const points: [number, number][] = [];
  const baseLngOffset = (seededRandom(idx * 5 + 3) - 0.5) * scale * 2;
  const baseLatOffset = (seededRandom(idx * 7 + 5) - 0.5) * scale * 1.5;

  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2 + seededRandom(idx * 11 + i + 7) * 0.5;
    const radius = scale * (0.5 + seededRandom(idx * 13 + i + 9) * 0.7);
    const lng = centerLng + baseLngOffset + Math.cos(angle) * radius * 0.8;
    const lat = centerLat + baseLatOffset + Math.sin(angle) * radius * 0.6;
    points.push([lng, lat]);
  }
  return points;
}

function polygonArea(path: [number, number][]): number {
  if (path.length < 3) return 0;
  let area = 0;
  for (let i = 0; i < path.length; i++) {
    const j = (i + 1) % path.length;
    area += path[i][0] * path[j][1];
    area -= path[j][0] * path[i][1];
  }
  return Math.abs(area / 2);
}

function polygonCentroid(path: [number, number][]): [number, number] {
  let lng = 0, lat = 0;
  path.forEach((p) => {
    lng += p[0];
    lat += p[1];
  });
  return [lng / path.length, lat / path.length];
}

function generateRegion(
  id: string,
  name: string,
  level: "city" | "county",
  center: [number, number],
  totalAreaSqKm: number,
  patchCount: number
): LandUseRegion {
  const types: LandUseType[] = [
    "cultivated",
    "forest",
    "grassland",
    "water",
    "urban",
    "rural",
    "industrial",
    "transport",
    "other",
  ];
  const weights = [0.25, 0.2, 0.15, 0.08, 0.1, 0.07, 0.04, 0.05, 0.06];

  const patches: LandUsePatch[] = [];
  const areaByType: Record<LandUseType, number> = {} as Record<LandUseType, number>;
  types.forEach((t) => (areaByType[t] = 0));

  for (let i = 0; i < patchCount; i++) {
    let typeIdx = 0;
    let r = seededRandom(i * 17 + 1);
    for (let j = 0; j < weights.length; j++) {
      r -= weights[j];
      if (r <= 0) {
        typeIdx = j;
        break;
      }
    }
    const type = types[typeIdx];
    const scale = 0.15 + seededRandom(i * 19 + 3) * 0.35;

    const path = generatePolygon(center[0], center[1], i, scale);
    const centroid = polygonCentroid(path);
    const rawArea = polygonArea(path);
    const areaSqKm = Math.max(0.5, +(rawArea * 1000).toFixed(1));

    const elevation = Math.round(20 + seededRandom(i * 23 + 5) * 800);
    const slope = +(seededRandom(i * 29 + 7) * 25).toFixed(1);

    const protSeed = seededRandom(i * 31 + 9);
    let protectionLevel: LandUsePatch["protectionLevel"] = "none";
    if (type === "forest" || type === "water") {
      if (protSeed < 0.1) protectionLevel = "national";
      else if (protSeed < 0.3) protectionLevel = "provincial";
      else if (protSeed < 0.5) protectionLevel = "municipal";
    }

    let soilQuality: number | undefined;
    if (type === "cultivated") {
      soilQuality = Math.round(40 + seededRandom(i * 37 + 11) * 55);
    }

    areaByType[type] += areaSqKm;

    patches.push({
      id: `${id}-patch-${i}`,
      type,
      name: `${LAND_USE_LABELS[type]}斑块${i + 1}`,
      areaSqKm,
      path,
      centroid,
      elevation,
      slope,
      soilQuality,
      protectionLevel,
      description: `${LAND_USE_LABELS[type]}用地，面积${areaSqKm}平方公里`,
    });
  }

  const percentageByType: Record<LandUseType, number> = {} as Record<LandUseType, number>;
  types.forEach((t) => {
    percentageByType[t] = +((areaByType[t] / totalAreaSqKm) * 100).toFixed(1);
  });

  return {
    id,
    name,
    level,
    center,
    totalAreaSqKm,
    patches,
    areaByType,
    percentageByType,
  };
}

const LAND_USE_REGIONS: LandUseRegion[] = [
  generateRegion("chengdu-plain", "成都平原", "city", [104.0, 30.67], 12390, 60),
  generateRegion("zhejiang-hilly", "浙中丘陵", "city", [120.0, 29.08], 8543, 50),
];

export function getLandUseRegions(): LandUseRegion[] {
  return LAND_USE_REGIONS;
}

export function getLandUseRegionById(id: string): LandUseRegion | undefined {
  return LAND_USE_REGIONS.find((r) => r.id === id);
}

export const PROTECTION_LABELS = {
  national: { label: "国家级", color: "#ef4444" },
  provincial: { label: "省级", color: "#f97316" },
  municipal: { label: "市级", color: "#eab308" },
  none: { label: "无", color: "#9ca3af" },
};
