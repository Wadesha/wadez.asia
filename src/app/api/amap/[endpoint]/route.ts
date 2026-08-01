import { NextRequest, NextResponse } from "next/server";

/**
 * 高德地图 API 代理路由
 * 统一代理高德 Web Service API，避免在前端暴露 key
 *
 * 用法：
 *   GET /api/amap/poi?keywords=北京大学&city=北京
 *   GET /api/amap/district?keywords=北京&subdistrict=0
 *   GET /api/amap/route?origin=116.481028,39.989643&destination=116.434446,39.90816&mode=walking
 */

// 多 Key 轮询（服务端环境变量，不暴露给前端）
const AMAP_KEYS = (process.env.AMAP_WEB_SERVICE_KEYS || "")
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);

let keyIndex = 0;

function getNextKey(): string | null {
  if (AMAP_KEYS.length === 0) return null;
  const key = AMAP_KEYS[keyIndex % AMAP_KEYS.length];
  keyIndex++;
  return key;
}

// 各端点对应的 path 段
const ENDPOINT_PATHS: Record<string, string> = {
  poi: "/v3/place/text",            // POI 搜索
  around: "/v3/place/around",       // 周边搜索
  district: "/v3/config/district",   // 行政区域
  route: "/v3/direction/transit/integrated", // 公交换乘
  walking: "/v3/direction/walking", // 步行路径
  driving: "/v3/direction/driving", // 驾车路径
  geocode: "/v3/geocode/regeo",     // 逆地理编码
};

const REQUIRED_PARAMS: Record<string, string[]> = {
  poi: ["keywords"],
  around: ["location"],
  district: ["keywords"],
  route: ["origin", "destination"],
  walking: ["origin", "destination"],
  driving: ["origin", "destination"],
  geocode: ["location"],
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ endpoint: string }> }
) {
  const { endpoint } = await params;

  // 1. 校验端点
  const apiPath = ENDPOINT_PATHS[endpoint];
  if (!apiPath) {
    return NextResponse.json(
      { ok: false, error: `不支持的端点: ${endpoint}`, available: Object.keys(ENDPOINT_PATHS) },
      { status: 400 }
    );
  }

  // 2. 校验必要参数
  const required = REQUIRED_PARAMS[endpoint] || [];
  const searchParams = request.nextUrl.searchParams;
  for (const param of required) {
    if (!searchParams.get(param)) {
      return NextResponse.json(
        { ok: false, error: `缺少必要参数: ${param}` },
        { status: 400 }
      );
    }
  }

  // 3. 获取 Key（未配置则降级）
  const key = getNextKey();
  if (!key) {
    return NextResponse.json(
      {
        ok: false,
        error: "服务端未配置 AMAP_WEB_SERVICE_KEYS",
        degraded: true,
        message: "当前为降级模式，请使用模拟数据。配置 .env.local 中的 AMAP_WEB_SERVICE_KEYS 后可接入真实数据。",
      },
      { status: 503 }
    );
  }

  // 4. 构造请求 URL
  const finalParams = new URLSearchParams(searchParams);
  finalParams.set("key", key);
  finalParams.set("output", "json");
  if (!finalParams.has("extensions")) {
    finalParams.set("extensions", "base");
  }

  const amapUrl = `https://restapi.amap.com${apiPath}?${finalParams.toString()}`;

  try {
    const response = await fetch(amapUrl, {
      headers: { "Accept": "application/json" },
      // Next.js fetch 缓存策略：默认不缓存实时查询
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: `高德API请求失败: ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();

    // 高德返回的 status="1" 表示成功
    if (data.status !== "1") {
      return NextResponse.json(
        { ok: false, error: data.info || "高德API返回错误", code: data.infocode },
        { status: 200 }
      );
    }

    return NextResponse.json({
      ok: true,
      source: "amap",
      endpoint,
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: `请求异常: ${err?.message || "未知错误"}` },
      { status: 500 }
    );
  }
}
