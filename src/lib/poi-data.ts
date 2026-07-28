export interface POIData {
  id: string;
  name: string;
  category: POICategory;
  categoryLabel: string;
  description: string;
  address: string;
  longitude: number;
  latitude: number;
  city: string;
  tel?: string;
  rating?: number;
}

export type POICategory =
  | "bus"
  | "metro"
  | "train"
  | "coach"
  | "airport"
  | "ferry"
  | "landmark"
  | "other";

export const CATEGORY_LABELS: Record<POICategory, string> = {
  bus: "公交站",
  metro: "地铁站",
  train: "火车站",
  coach: "客运站",
  airport: "机场",
  ferry: "码头",
  landmark: "地标",
  other: "其他",
};

export const CITIES = ["北京", "上海", "广州", "深圳", "杭州"];

const cityCache = new Map<string, POIData[]>();

export async function loadCityPOIs(city: string): Promise<POIData[]> {
  if (cityCache.has(city)) {
    return cityCache.get(city)!;
  }

  try {
    const res = await fetch(`/poi-data/${city}.json`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const data = await res.json() as POIData[];
    cityCache.set(city, data);
    return data;
  } catch {
    return [];
  }
}

export async function loadAllPOIs(): Promise<POIData[]> {
  const all: POIData[] = [];
  for (const city of CITIES) {
    const pois = await loadCityPOIs(city);
    all.push(...pois);
  }
  return all;
}

export async function loadPOISummary() {
  try {
    const res = await fetch("/poi-data/summary.json", {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export function filterPOIs(
  pois: POIData[],
  options: {
    city?: string;
    category?: POICategory | "all";
    keyword?: string;
  }
): POIData[] {
  let result = pois;

  if (options.city && options.city !== "all") {
    result = result.filter((p) => p.city === options.city);
  }

  if (options.category && options.category !== "all") {
    result = result.filter((p) => p.category === options.category);
  }

  if (options.keyword && options.keyword.trim()) {
    const kw = options.keyword.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(kw) ||
        p.address.toLowerCase().includes(kw) ||
        p.description.toLowerCase().includes(kw)
    );
  }

  return result;
}

export function findPOIById(pois: POIData[], id: string): POIData | undefined {
  return pois.find((p) => p.id === id);
}

export function groupByCity(pois: POIData[]): Record<string, POIData[]> {
  const result: Record<string, POIData[]> = {};
  for (const p of pois) {
    if (!result[p.city]) result[p.city] = [];
    result[p.city].push(p);
  }
  return result;
}

export function groupByCategory(pois: POIData[]): Record<string, POIData[]> {
  const result: Record<string, POIData[]> = {};
  for (const p of pois) {
    if (!result[p.categoryLabel]) result[p.categoryLabel] = [];
    result[p.categoryLabel].push(p);
  }
  return result;
}
