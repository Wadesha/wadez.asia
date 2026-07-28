export type LandUseType =
  | "residential"
  | "commercial"
  | "industrial"
  | "public-facility"
  | "green-space"
  | "road-square"
  | "water"
  | "mixed-use";

export interface LandUseParcel {
  id: string;
  name: string;
  type: LandUseType;
  geometry: [number, number][];
  areaHa: number;
  floorAreaRatio?: number;
  buildingDensity?: number;
  population?: number;
  description: string;
}

export interface LandUseArea {
  id: string;
  name: string;
  city: string;
  center: [number, number];
  totalAreaHa: number;
  parcels: LandUseParcel[];
  stats: Record<LandUseType, { area: number; count: number }>;
}

export const LAND_USE_LABELS: Record<LandUseType, string> = {
  residential: "居住用地",
  commercial: "商业用地",
  industrial: "工业用地",
  "public-facility": "公共设施",
  "green-space": "绿地",
  "road-square": "道路广场",
  water: "水域",
  "mixed-use": "混合用地",
};

export const LAND_USE_COLORS: Record<LandUseType, string> = {
  residential: "#fcd34d",
  commercial: "#f87171",
  industrial: "#94a3b8",
  "public-facility": "#60a5fa",
  "green-space": "#4ade80",
  "road-square": "#e5e7eb",
  water: "#7dd3fc",
  "mixed-use": "#c084fc",
};

function generateParcelGeometry(
  centerLng: number,
  centerLat: number,
  avgSize: number,
  seed: number
): [number, number][] {
  const points: [number, number][] = [];
  const sides = 4 + (seed % 3);
  const step = (2 * Math.PI) / sides;
  for (let i = 0; i < sides; i++) {
    const angle = i * step + (seed * 0.1);
    const r = avgSize * (0.6 + ((seed + i) % 5) * 0.15);
    const lng = centerLng + Math.cos(angle) * r * 0.001;
    const lat = centerLat + Math.sin(angle) * r * 0.001;
    points.push([lng, lat]);
  }
  return points;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateLandUseArea(
  id: string,
  name: string,
  city: string,
  center: [number, number],
  parcelCount: number = 40
): LandUseArea {
  const parcels: LandUseParcel[] = [];
  const typeWeights: Record<LandUseType, number> = {
    residential: 0.3,
    commercial: 0.12,
    industrial: 0.08,
    "public-facility": 0.15,
    "green-space": 0.15,
    "road-square": 0.1,
    water: 0.05,
    "mixed-use": 0.05,
  };

  const cumulativeWeights: [LandUseType, number][] = [] as any;
  let cum = 0;
  (Object.keys(typeWeights) as LandUseType[]).forEach((t) => {
    cum += typeWeights[t];
    cumulativeWeights.push([t, cum]);
  });

  const gridSize = Math.ceil(Math.sqrt(parcelCount * 1.5));
  const spacingLng = 0.008;
  const spacingLat = 0.006;

  for (let i = 0; i < parcelCount; i++) {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    const jitterLng = (seededRandom(i * 7 + 3) - 0.5) * spacingLng * 0.5;
    const jitterLat = (seededRandom(i * 11 + 5) - 0.5) * spacingLat * 0.5;
    const lng = center[0] + (col - gridSize / 2) * spacingLng + jitterLng;
    const lat = center[1] + (row - gridSize / 2) * spacingLat + jitterLat;

    const r = seededRandom(i * 13 + 1);
    let type: LandUseType = "residential";
    for (const [t, w] of cumulativeWeights) {
      if (r < w) {
        type = t;
        break;
      }
    }

    const sizeHa = 1 + seededRandom(i * 17 + 2) * 5;
    const geometry = generateParcelGeometry(lng, lat, Math.sqrt(sizeHa) * 0.5, i);

    const hasFar = type === "residential" || type === "commercial" || type === "mixed-use" || type === "industrial";
    const hasDensity = hasFar;

    parcels.push({
      id: `${id}-parcel-${i}`,
      name: `${name} ${LAND_USE_LABELS[type]} ${i + 1}`,
      type,
      geometry,
      areaHa: sizeHa,
      floorAreaRatio: hasFar ? +(1 + seededRandom(i * 19 + 4) * 4).toFixed(1) : undefined,
      buildingDensity: hasDensity ? +(20 + seededRandom(i * 23 + 6) * 40).toFixed(0) : undefined,
      population: type === "residential" ? Math.floor(sizeHa * 800 * (0.5 + seededRandom(i * 29 + 7))) : undefined,
      description: `位于${name}的${LAND_USE_LABELS[type]}地块`,
    });
  }

  const stats = {} as Record<LandUseType, { area: number; count: number }>;
  (Object.keys(LAND_USE_LABELS) as LandUseType[]).forEach((t) => {
    stats[t] = { area: 0, count: 0 };
  });
  let totalArea = 0;

  parcels.forEach((p) => {
    stats[p.type].area += p.areaHa;
    stats[p.type].count += 1;
    totalArea += p.areaHa;
  });

  return {
    id,
    name,
    city,
    center,
    totalAreaHa: Math.round(totalArea * 10) / 10,
    parcels,
    stats,
  };
}

const LAND_USE_AREAS: LandUseArea[] = [
  generateLandUseArea("cbd-core", "中央商务区核心区", "北京", [116.46, 39.915], 35),
  generateLandUseArea("tech-park", "科技园区", "北京", [116.32, 39.98], 30),
  generateLandUseArea("old-town", "历史城区", "北京", [116.4, 39.92], 45),
];

export function getLandUseAreas(): LandUseArea[] {
  return LAND_USE_AREAS;
}

export function getLandUseAreaById(id: string): LandUseArea | undefined {
  return LAND_USE_AREAS.find((a) => a.id === id);
}

export function getLandUseSummary(area: LandUseArea) {
  const entries = (Object.entries(area.stats) as [LandUseType, { area: number; count: number }][])
    .filter(([, s]) => s.count > 0)
    .sort((a, b) => b[1].area - a[1].area);

  const total = entries.reduce((sum, [, s]) => sum + s.area, 0);

  return entries.map(([type, stat]) => ({
    type,
    label: LAND_USE_LABELS[type],
    color: LAND_USE_COLORS[type],
    area: stat.area,
    count: stat.count,
    percent: total > 0 ? (stat.area / total) * 100 : 0,
  }));
}
