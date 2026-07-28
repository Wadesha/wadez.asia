// 公交换乘线路缓存：查询过的线路存 localStorage，下次不请求 API
import { BusRoute } from "@/lib/types";

const CACHE_KEY = "wadez_bus_routes_cache";
const CACHE_VERSION = "1";
const MAX_ENTRIES = 200;

interface CacheEntry {
  key: string;
  routes: BusRoute[];
  timestamp: number;
}

interface CacheData {
  version: string;
  entries: CacheEntry[];
}

function loadCache(): CacheData {
  if (typeof window === "undefined") {
    return { version: CACHE_VERSION, entries: [] };
  }
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return { version: CACHE_VERSION, entries: [] };
    const data = JSON.parse(raw) as CacheData;
    if (data.version !== CACHE_VERSION) {
      return { version: CACHE_VERSION, entries: [] };
    }
    return data;
  } catch {
    return { version: CACHE_VERSION, entries: [] };
  }
}

function saveCache(data: CacheData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // localStorage 满了或不可用，忽略
  }
}

export function makeCacheKey(
  origin: { lng: number; lat: number },
  destination: { lng: number; lat: number }
): string {
  // 坐标精度到 5 位小数（约 1 米），避免微小差异导致缓存失效
  const o = `${origin.lng.toFixed(5)},${origin.lat.toFixed(5)}`;
  const d = `${destination.lng.toFixed(5)},${destination.lat.toFixed(5)}`;
  return `${o}->${d}`;
}

export function getCachedRoutes(
  origin: { lng: number; lat: number },
  destination: { lng: number; lat: number }
): BusRoute[] | null {
  const key = makeCacheKey(origin, destination);
  const cache = loadCache();
  const entry = cache.entries.find((e) => e.key === key);
  if (entry) {
    return entry.routes;
  }
  return null;
}

export function setCachedRoutes(
  origin: { lng: number; lat: number },
  destination: { lng: number; lat: number },
  routes: BusRoute[]
) {
  const key = makeCacheKey(origin, destination);
  const cache = loadCache();
  // 移除同 key 旧记录
  cache.entries = cache.entries.filter((e) => e.key !== key);
  // 加新记录到头部
  cache.entries.unshift({ key, routes, timestamp: Date.now() });
  // 限制条数
  if (cache.entries.length > MAX_ENTRIES) {
    cache.entries = cache.entries.slice(0, MAX_ENTRIES);
  }
  saveCache(cache);
}

export function getCacheStats(): { count: number; keys: string[] } {
  const cache = loadCache();
  return {
    count: cache.entries.length,
    keys: cache.entries.map((e) => e.key),
  };
}

export function clearCache() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CACHE_KEY);
}
