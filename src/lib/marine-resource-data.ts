export type MarineResourceType = "coastline" | "island" | "wetland" | "fishery" | "port";

export interface MarineResource {
  id: string;
  name: string;
  type: MarineResourceType;
  city: string;
  lng: number;
  lat: number;
  area?: number;
  length?: number;
  count?: number;
  output?: number;
  description: string;
}

export interface MarineCity {
  id: string;
  name: string;
  center: [number, number];
  coastlineLength: number;
  islandCount: number;
  wetlandArea: number;
  fisheryOutput: number;
  portCount: number;
  resources: MarineResource[];
}

export const MARINE_TYPE_LABELS: Record<MarineResourceType, string> = {
  coastline: "海岸线",
  island: "海岛",
  wetland: "滩涂湿地",
  fishery: "渔业资源",
  port: "港口码头",
};

export const MARINE_TYPE_ICONS: Record<MarineResourceType, string> = {
  coastline: "🏖️",
  island: "🏝️",
  wetland: "🌊",
  fishery: "🐟",
  port: "⚓",
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateMarineResources(cityId: string, city: string, centerLng: number, centerLat: number): MarineResource[] {
  const resources: MarineResource[] = [];

  // 海岸线
  resources.push({
    id: `${cityId}-coast-1`,
    name: `${city}海岸线`,
    type: "coastline",
    city,
    lng: centerLng - 0.05,
    lat: centerLat - 0.02,
    length: Math.round(200 + seededRandom(cityId.length * 7) * 800),
    description: `${city}主要海岸线，滩涂资源丰富`,
  });

  // 海岛
  const islandCount = 3 + Math.floor(seededRandom(cityId.length * 11) * 20);
  resources.push({
    id: `${cityId}-island-1`,
    name: `${city}海岛群`,
    type: "island",
    city,
    lng: centerLng + 0.05,
    lat: centerLat + 0.03,
    count: islandCount,
    area: Math.round(islandCount * 5 + seededRandom(cityId.length * 13) * 50),
    description: `共${islandCount}个海岛，多个已开发旅游`,
  });

  // 滩涂湿地
  resources.push({
    id: `${cityId}-wetland-1`,
    name: `${city}沿海湿地`,
    type: "wetland",
    city,
    lng: centerLng,
    lat: centerLat - 0.05,
    area: Math.round(50 + seededRandom(cityId.length * 17) * 300),
    description: "重要湿地生态系统，候鸟栖息地",
  });

  // 渔业
  resources.push({
    id: `${cityId}-fishery-1`,
    name: `${city}渔场`,
    type: "fishery",
    city,
    lng: centerLng + 0.1,
    lat: centerLat - 0.03,
    output: Math.round(10 + seededRandom(cityId.length * 19) * 100),
    description: "传统渔场，年产海产品丰富",
  });

  // 港口
  resources.push({
    id: `${cityId}-port-1`,
    name: `${city}港`,
    type: "port",
    city,
    lng: centerLng - 0.08,
    lat: centerLat + 0.02,
    count: 1,
    description: "重要港口，年吞吐量过亿",
  });

  return resources;
}

function generateMarineCity(
  id: string,
  name: string,
  center: [number, number]
): MarineCity {
  const resources = generateMarineResources(id, name, center[0], center[1]);

  const coastlineLength = resources.find((r) => r.type === "coastline")?.length || 0;
  const islandCount = resources.find((r) => r.type === "island")?.count || 0;
  const wetlandArea = resources.find((r) => r.type === "wetland")?.area || 0;
  const fisheryOutput = resources.find((r) => r.type === "fishery")?.output || 0;
  const portCount = resources.filter((r) => r.type === "port").length;

  return {
    id,
    name,
    center,
    coastlineLength,
    islandCount,
    wetlandArea,
    fisheryOutput,
    portCount,
    resources,
  };
}

const MARINE_CITIES: MarineCity[] = [
  generateMarineCity("qingdao", "青岛", [120.38, 36.07]),
  generateMarineCity("shanghai", "上海", [121.47, 31.23]),
  generateMarineCity("guangzhou", "广州", [113.26, 23.13]),
];

export function getMarineCities(): MarineCity[] {
  return MARINE_CITIES;
}

export function getMarineCityById(id: string): MarineCity | undefined {
  return MARINE_CITIES.find((c) => c.id === id);
}

export function getCities(): string[] {
  return MARINE_CITIES.map((c) => c.name);
}