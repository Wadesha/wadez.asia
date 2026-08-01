/**
 * API 请求缓存 (v2.1.17)
 * localStorage + TTL，避免重复请求
 */

const CACHE_PREFIX = "wadez_api_cache_";
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24小时

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

/**
 * 获取缓存
 */
export function getCached<T>(key: string): T | null {
  try {
    const fullKey = CACHE_PREFIX + key;
    const raw = localStorage.getItem(fullKey);
    if (!raw) return null;

    const entry: CacheEntry<T> = JSON.parse(raw);
    const now = Date.now();

    if (now - entry.timestamp > entry.ttl) {
      // 过期
      localStorage.removeItem(fullKey);
      return null;
    }

    return entry.data;
  } catch {
    return null;
  }
}

/**
 * 写入缓存
 */
export function setCached<T>(key: string, data: T, ttl: number = DEFAULT_TTL): void {
  try {
    const fullKey = CACHE_PREFIX + key;
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    localStorage.setItem(fullKey, JSON.stringify(entry));
  } catch {
    // localStorage 满了或不可用，忽略
  }
}

/**
 * 带缓存的 fetch
 */
export async function cachedFetch(
  url: string,
  options?: { ttl?: number; forceRefresh?: boolean }
): Promise<any> {
  const ttl = options?.ttl ?? DEFAULT_TTL;
  const forceRefresh = options?.forceRefresh ?? false;

  if (!forceRefresh) {
    const cached = getCached(url);
    if (cached) {
      return { ...cached, _fromCache: true };
    }
  }

  const res = await fetch(url);
  const data = await res.json();

  if (data.ok !== false) {
    setCached(url, data, ttl);
  }

  return { ...data, _fromCache: false };
}

/**
 * 清除所有API缓存
 */
export function clearAllCache(): void {
  try {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(CACHE_PREFIX));
    for (const key of keys) {
      localStorage.removeItem(key);
    }
  } catch {
    // 忽略
  }
}

/**
 * 获取缓存统计
 */
export function getCacheStats(): { count: number; sizeKB: number } {
  try {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(CACHE_PREFIX));
    let size = 0;
    for (const key of keys) {
      size += (localStorage.getItem(key) || "").length;
    }
    return {
      count: keys.length,
      sizeKB: Math.round(size / 1024),
    };
  } catch {
    return { count: 0, sizeKB: 0 };
  }
}
