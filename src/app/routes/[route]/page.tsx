"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  NATIONAL_CITIES,
  generateCrossCityRoute,
  CITY_CONNECTIONS,
} from "@/lib/national-cities";

const RouteMap = dynamic(() => import("@/components/RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="bg-white border border-gray-200 rounded-lg p-2">
      <div className="w-full h-56 bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400 text-xs">地图加载中...</span>
      </div>
    </div>
  ),
});

export default function RouteDetailPage() {
  const params = useParams();
  const routeSlug = params.route as string;
  const [fromPinyin, toPinyin] = routeSlug.split("-");

  const fromCity = NATIONAL_CITIES.find((c) => c.pinyin === fromPinyin);
  const toCity = NATIONAL_CITIES.find((c) => c.pinyin === toPinyin);

  const routes = useMemo(() => {
    if (!fromCity || !toCity) return [];
    return generateCrossCityRoute(fromCity.name, toCity.name);
  }, [fromCity, toCity]);

  const connection = useMemo(() => {
    if (!fromCity || !toCity) return null;
    return CITY_CONNECTIONS.find(
      (c) =>
        (c.fromCity === fromCity.name && c.toCity === toCity.name) ||
        (c.fromCity === toCity.name && c.toCity === fromCity.name)
    );
  }, [fromCity, toCity]);

  if (!fromCity || !toCity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-3">路线不存在</p>
          <Link href="/routes" className="text-gray-700 hover:underline text-sm">返回路线列表</Link>
        </div>
      </div>
    );
  }

  const realRatio = routes.length > 0 ? routes[0].realDataRatio : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-3 py-3">
        {/* 合并头部+统计条 */}
        <header className="bg-white border border-gray-200 rounded-lg p-3 mb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Link href="/routes" className="text-gray-400 hover:text-gray-600 text-xs mr-1">
                ←
              </Link>
              <span className={`text-lg font-bold ${fromCity.realDataAvailable ? "text-gray-900" : "text-gray-500"}`}>
                {fromCity.name}
              </span>
              <span className={`text-[10px] px-1 py-0.5 rounded ${fromCity.realDataAvailable ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-700"}`}>
                {fromCity.realDataAvailable ? "真" : "模"}
              </span>
              <span className="text-gray-400 text-xs">→</span>
              <span className={`text-lg font-bold ${toCity.realDataAvailable ? "text-gray-900" : "text-gray-500"}`}>
                {toCity.name}
              </span>
              <span className={`text-[10px] px-1 py-0.5 rounded ${toCity.realDataAvailable ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-700"}`}>
                {toCity.realDataAvailable ? "真" : "模"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${realRatio >= 1 ? "bg-gray-800" : realRatio > 0 ? "bg-gray-500" : "bg-gray-300"}`}
                    style={{ width: `${realRatio * 100}%` }}
                  ></div>
                </div>
                <span className="text-gray-700 font-medium">{Math.round(realRatio * 100)}%</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">{routes.length}方案</span>
            </div>
          </div>
          {/* 统计条内联 */}
          <div className="flex items-center gap-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>公交<span className="font-bold text-gray-900 ml-0.5">{routes.length > 0 ? routes[0].totalBusSegments : "-"}</span>段</span>
            <span>步行<span className="font-bold text-gray-900 ml-0.5">{routes.length > 0 ? routes[0].totalWalkSegments : "-"}</span>次</span>
            <span><span className="font-bold text-gray-900">{routes.length > 0 ? routes[0].totalStations : "-"}</span>站</span>
            <span>换乘<span className="font-bold text-gray-900 ml-0.5">{routes.length > 0 ? routes[0].transfers : "-"}</span>次</span>
            <span className="text-gray-300">|</span>
            <span>{fromCity.region}→{toCity.region}</span>
            {connection && (
              <span>接驳{connection.estimatedMinutes}分钟</span>
            )}
          </div>
        </header>

        {/* 地图 */}
        {routes.length > 0 && (
          <RouteMap route={routes[0]} fromCity={fromCity.name} toCity={toCity.name} />
        )}

        {/* 方案列表 */}
        <div className="space-y-2 mt-2">
          {routes.map((route, idx) => (
            <RouteDetailCard key={route.id} route={route} index={idx} />
          ))}
        </div>

        {routes.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-sm">暂无从 {fromCity.name} 到 {toCity.name} 的跨城方案</p>
          </div>
        )}

        {/* 数据说明 - 单行 */}
        <div className="mt-3 text-[10px] text-gray-400 text-center">
          真实数据：北京+15城市开源项目 · 模拟数据后续自动替换
        </div>
      </div>
    </div>
  );
}

function RouteDetailCard({ route, index }: {
  route: import("@/lib/national-cities").SimulatedCrossCityRoute;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 bg-gray-800 text-white rounded-full flex items-center justify-center text-[10px] font-medium">
            {index + 1}
          </span>
          <span className="font-bold text-gray-900 text-xs">方案{index + 1}</span>
          {route.isFullySimulated && (
            <span className="px-1 py-0.5 bg-gray-200 rounded text-[10px] text-gray-600">全程模拟</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500">
          <span>{route.totalBusSegments}段</span>
          <span>{route.totalStations}站</span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-gray-600 ml-1"
          >
            {expanded ? "收起" : "详情"}
          </button>
        </div>
      </div>

      {/* 段路线 - 紧凑横向 */}
      <div className="flex flex-wrap items-center gap-1 mt-1.5">
        {route.segments.map((seg, segIdx) => (
          <div key={segIdx} className="flex items-center gap-1">
            <div className={`px-1.5 py-0.5 rounded border text-[10px] ${
              seg.type === "bus"
                ? seg.isSimulated
                  ? "bg-gray-50 border-gray-200 text-gray-600"
                  : "bg-white border-gray-400 text-gray-900"
                : "bg-gray-100 border-gray-200 text-gray-500"
            }`}>
              {seg.type === "bus" ? (
                <span>
                  <span className="font-medium">{seg.line}</span>
                  <span className="text-gray-400 mx-0.5">·</span>
                  <span>{seg.stationCount}站</span>
                </span>
              ) : (
                <span>步行{seg.estimatedMinutes}分</span>
              )}
            </div>
            {segIdx < route.segments.length - 1 && (
              <span className="text-gray-300 text-[10px]">→</span>
            )}
          </div>
        ))}
      </div>

      {/* 可展开详情 */}
      {expanded && (
        <div className="mt-2 pt-2 border-t border-gray-100 space-y-0.5">
          {route.segments.map((seg, segIdx) => (
            <div key={segIdx} className="flex items-start gap-1.5 text-[10px]">
              <span className="text-gray-400 w-3">{segIdx + 1}.</span>
              {seg.type === "bus" ? (
                <div className="flex-1">
                  <span className="font-medium text-gray-800">{seg.line}</span>
                  <span className="text-gray-500 mx-1">·</span>
                  <span className="text-gray-600">{seg.from}→{seg.to}</span>
                  {seg.isSimulated && <span className="ml-1 text-gray-400">[模拟]</span>}
                </div>
              ) : (
                <div className="flex-1">
                  <span className="text-gray-700">步行</span>
                  <span className="text-gray-500 mx-1">·</span>
                  <span className="text-gray-600">{seg.from}→{seg.to}</span>
                  <span className="text-gray-400 mx-1">·</span>
                  <span className="text-gray-500">{(seg.distanceMeters! / 1000).toFixed(1)}km</span>
                  {seg.isSimulated && <span className="ml-1 text-gray-400">[模拟]</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
