/**
 * 中国省级GeoJSON数据加载器
 * 使用阿里DataV公开GeoJSON API（精确拓扑关系，边界共享节点）
 * API文档：https://datav.aliyun.com/portal/school/atlas/area_selector
 */

export interface GeoJSONFeature {
  type: "Feature";
  properties: {
    adcode: number;
    name: string;
    center?: [number, number];
    centroid?: [number, number];
    childrenNum?: number;
    level?: string;
    subFeatureIndex?: number;
    acroutes?: number[];
    parent?: { adcode: number };
    polyNum?: number;
    polyOffset?: number;
    pointNum?: number;
    offset?: number;
    isAllParents?: boolean;
  };
  geometry: {
    type: "MultiPolygon" | "Polygon";
    coordinates: number[][][] | number[][][][];
  };
}

export interface GeoJSONCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

// 阿里DataV GeoJSON API（中国省级）
const CHINA_PROVINCE_GEOJSON_URL = "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json";

// 省级adcode映射
export const PROVINCE_ADCODES: Record<string, number> = {
  北京: 110000,
  天津: 120000,
  河北: 130000,
  山西: 140000,
  内蒙古: 150000,
  辽宁: 210000,
  吉林: 220000,
  黑龙江: 230000,
  上海: 310000,
  江苏: 320000,
  浙江: 330000,
  安徽: 340000,
  福建: 350000,
  江西: 360000,
  山东: 370000,
  河南: 410000,
  湖北: 420000,
  湖南: 430000,
  广东: 440000,
  广西: 450000,
  海南: 460000,
  重庆: 500000,
  四川: 510000,
  贵州: 520000,
  云南: 530000,
  西藏: 540000,
  陕西: 610000,
  甘肃: 620000,
  青海: 630000,
  宁夏: 640000,
  新疆: 650000,
  台湾: 710000,
  香港: 810000,
  澳门: 820000,
};

// 内存缓存
let cachedGeoJSON: GeoJSONCollection | null = null;
const LS_KEY = "china-province-geojson-v1";
const LS_TTL = 1000 * 60 * 60 * 24 * 7; // 7天

/**
 * 加载中国省级GeoJSON数据
 * 优先级：内存缓存 -> localStorage缓存 -> 网络请求
 * 网络失败时若localStorage有缓存则降级使用
 */
export async function loadChinaProvinceGeoJSON(): Promise<GeoJSONCollection> {
  if (cachedGeoJSON) return cachedGeoJSON;

  // 浏览器环境，尝试localStorage
  const inBrowser = typeof window !== "undefined";
  try {
    const res = await fetch(CHINA_PROVINCE_GEOJSON_URL);
    if (!res.ok) throw new Error(`GeoJSON API error: ${res.status}`);
    const data: GeoJSONCollection = await res.json();

    // 过滤只保留省级（adcode后4位为0000）
    data.features = data.features.filter(f => {
      const adcode = f.properties.adcode;
      return (
        // 省级：后4位为0000
        (adcode % 10000 === 0) ||
        // 港澳台
        [710000, 810000, 820000].includes(adcode)
      );
    });

    cachedGeoJSON = data;

    // 持久化到localStorage
    if (inBrowser && window.localStorage) {
      try {
        window.localStorage.setItem(LS_KEY, JSON.stringify({
          ts: Date.now(),
          data,
        }));
      } catch (e) { /* ignore quota errors */ }
    }

    return data;
  } catch (err) {
    console.warn("GeoJSON网络加载失败，尝试本地缓存:", err);
    // 失败降级：尝试localStorage缓存
    if (inBrowser && window.localStorage) {
      try {
        const raw = window.localStorage.getItem(LS_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          const age = Date.now() - (parsed.ts || 0);
          if (parsed.data && age < LS_TTL * 4) { // 最多接受28天的过期缓存
            cachedGeoJSON = parsed.data as GeoJSONCollection;
            console.log(`使用本地GeoJSON缓存（${Math.round(age/3600000)}小时前）`);
            return cachedGeoJSON;
          }
        }
      } catch (e2) {
        console.error("localStorage读取失败:", e2);
      }
    }
    throw err;
  }
}

/**
 * 根据adcode获取单个省的GeoJSON
 */
export async function getProvinceGeoJSON(adcode: number): Promise<GeoJSONFeature | null> {
  const collection = await loadChinaProvinceGeoJSON();
  return collection.features.find(f => f.properties.adcode === adcode) || null;
}

/**
 * 获取所有省级GeoJSON feature数组
 */
export async function getAllProvinceFeatures(): Promise<GeoJSONFeature[]> {
  const collection = await loadChinaProvinceGeoJSON();
  return collection.features;
}

/**
 * 提取GeoJSON坐标为平面多边形数组
 * （用于ChoroplethMap组件，需要投影转换）
 */
export function extractPolygonsFromGeometry(geometry: GeoJSONFeature["geometry"]): Array<Array<[number, number]>> {
  const polygons: Array<Array<[number, number]>> = [];

  if (geometry.type === "Polygon") {
    // 单个多边形
    const ring = geometry.coordinates[0] as Array<[number, number]>;
    if (ring && ring.length > 0) polygons.push(ring);
  } else if (geometry.type === "MultiPolygon") {
    // 多个多边形（如岛屿）
    for (const poly of geometry.coordinates) {
      const ring = poly[0] as Array<[number, number]>;
      if (ring && ring.length > 0) polygons.push(ring);
    }
  }

  return polygons;
}