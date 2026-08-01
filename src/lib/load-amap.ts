/**
 * 高德地图 JS API 统一加载工具
 *
 * 解决问题：
 * - 当 NEXT_PUBLIC_AMAP_KEY 未配置时，避免请求 key=undefined 导致加载失败
 * - 提供统一的错误信息和降级 UI 支持
 * - 避免多个组件重复加载脚本
 */

const AMAP_KEY = process.env.NEXT_PUBLIC_AMAP_KEY || "";
const AMAP_SECURITY_CODE = process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE || "";

let loadPromise: Promise<any> | null = null;

/**
 * 检查高德 API Key 是否已配置
 */
export function isAMapConfigured(): boolean {
  return !!AMAP_KEY;
}

/**
 * 加载高德地图 JS API
 *
 * 用法：
 * ```ts
 * import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
 *
 * useEffect(() => {
 *   if (!isAMapConfigured()) {
 *     setError("高德地图 API Key 未配置，地图无法显示");
 *     return;
 *   }
 *   loadAMap()
 *     .then((AMap) => { /* 初始化地图 *\/ })
 *     .catch((err) => { setError(err.message); });
 * }, []);
 * ```
 *
 * @param plugins 需要加载的插件列表，如 ["AMap.HeatMap", "AMap.Geocoder"]
 * @returns Promise<AMap>
 */
export function loadAMap(plugins?: string[]): Promise<any> {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    // 已加载
    if ((window as any).AMap) {
      resolve((window as any).AMap);
      return;
    }

    // Key 未配置
    if (!AMAP_KEY) {
      reject(new Error("高德地图 API Key 未配置"));
      loadPromise = null;
      return;
    }

    // 设置安全密钥
    if (AMAP_SECURITY_CODE) {
      (window as any)._AMapSecurityConfig = {
        securityJsCode: AMAP_SECURITY_CODE,
      };
    }

    const pluginParam = plugins && plugins.length > 0 ? `&plugin=${plugins.join(",")}` : "";
    const script = document.createElement("script");
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${AMAP_KEY}&securityCode=${AMAP_SECURITY_CODE}${pluginParam}`;
    script.async = true;
    script.onload = () => {
      const AMap = (window as any).AMap;
      if (AMap) {
        resolve(AMap);
      } else {
        reject(new Error("高德地图脚本加载成功但 AMap 对象不可用"));
        loadPromise = null;
      }
    };
    script.onerror = () => {
      reject(new Error("高德地图脚本加载失败，请检查网络连接或 API Key 配置"));
      loadPromise = null;
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}
