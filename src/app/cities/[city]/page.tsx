"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  NATIONAL_CITIES,
  getCityByName,
  getAdjacentCities,
  generateCrossCityRoute,
  type SimulatedCrossCityRoute,
} from "@/lib/national-cities";

export default function CityDetailPage() {
  const params = useParams();
  const cityPinyin = params.city as string;
  const cityInfo = NATIONAL_CITIES.find((c) => c.pinyin === cityPinyin);

  const [selectedDest, setSelectedDest] = useState<string>("");
  const [routes, setRoutes] = useState<SimulatedCrossCityRoute[]>([]);

  const adjacentCities = useMemo(() => {
    if (!cityInfo) return [];
    return getAdjacentCities(cityInfo.name);
  }, [cityInfo]);

  const handleSearch = (destCity: string) => {
    setSelectedDest(destCity);
    if (cityInfo) {
      const result = generateCrossCityRoute(cityInfo.name, destCity);
      setRoutes(result);
    }
  };

  if (!cityInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">城市不存在</p>
          <Link href="/cities" className="text-gray-700 hover:underline">返回城市列表</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/cities" className="text-gray-500 hover:text-gray-700 text-sm">
            ← 返回城市列表
          </Link>
        </div>

        <header className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{cityInfo.name}</h1>
              <p className="text-gray-500">
                {cityInfo.province} · {cityInfo.region} · 市政府站点：{cityInfo.governmentStation}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`px-3 py-1 rounded text-xs font-medium ${
                cityInfo.dataSource === "official" ? "bg-gray-800 text-white" :
                cityInfo.dataSource === "cityvein" ? "bg-gray-600 text-white" :
                "bg-gray-300 text-gray-700"
              }`}>
                {cityInfo.dataSource === "official" ? "官方数据" :
                 cityInfo.dataSource === "cityvein" ? "开源数据" : "模拟数据"}
              </span>
              <span className="text-gray-500 text-sm">{cityInfo.lineCount}条线路</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-xl font-bold text-gray-900">{cityInfo.lineCount}</div>
            <div className="text-gray-500 text-xs mt-1">公交线路</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-xl font-bold text-gray-900">{adjacentCities.length}</div>
            <div className="text-gray-500 text-xs mt-1">相邻城市</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-xl font-bold text-gray-900">{cityInfo.realDataAvailable ? "是" : "否"}</div>
            <div className="text-gray-500 text-xs mt-1">真实数据</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-xl font-bold text-gray-900">{cityInfo.governmentStation}</div>
            <div className="text-gray-500 text-xs mt-1">市政府站点</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">跨城公交换乘方案</h2>
          <p className="text-gray-500 text-sm mb-4">选择目的地城市，查看跨城纯市内公交换乘方案</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {adjacentCities.map((dest) => (
              <button
                key={dest.name}
                onClick={() => handleSearch(dest.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${
                  selectedDest === dest.name
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                }`}
              >
                {dest.name}
                {!dest.realDataAvailable && (
                  <span className="ml-1 text-xs opacity-60">（模拟）</span>
                )}
              </button>
            ))}
          </div>

          {adjacentCities.length === 0 && (
            <div className="text-gray-400 text-sm py-4">
              该城市暂无配置相邻城市，后续将补充
            </div>
          )}

          {routes.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">
                  {cityInfo.name} → {selectedDest} 共 {routes.length} 个方案
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>真实数据占比</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-800"
                      style={{ width: `${Math.round(routes[0].realDataRatio * 100)}%` }}
                    ></div>
                  </div>
                  <span>{Math.round(routes[0].realDataRatio * 100)}%</span>
                </div>
              </div>

              {routes.map((route, idx) => (
                <RouteCard key={route.id} route={route} index={idx} />
              ))}
            </div>
          )}

          {selectedDest && routes.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p>暂无从 {cityInfo.name} 到 {selectedDest} 的跨城方案</p>
              <p className="text-sm mt-2">后续将补充该路线的接驳数据</p>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">数据说明</h3>
          <div className="text-sm text-gray-500 space-y-2">
            <p>该城市的公交数据来源：{
              cityInfo.dataSource === "official" ? "政府官方数据（完整真实）" :
              cityInfo.dataSource === "cityvein" ? "city-vein开源项目（路径坐标真实，站点名称待补全）" :
              "模拟数据（后续获取真实数据后更新）"
            }</p>
            <p>跨城换乘方案中标注"模拟数据"的路段，将在获取真实数据后自动替换</p>
            <p>数据更新策略：分阶段获取真实数据，逐步替换模拟片段，直到全程为真实数据</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RouteCard({ route, index }: { route: SimulatedCrossCityRoute; index: number }) {
  return (
    <div className="border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <div className="font-medium text-gray-900">方案 {index + 1}</div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>{route.totalBusSegments}段公交</span>
          <span>{route.totalWalkSegments}次步行</span>
          <span>{route.totalStations}站</span>
          <span>{route.transfers}次换乘</span>
          {route.isFullySimulated && (
            <span className="px-2 py-0.5 bg-gray-200 rounded text-gray-600">全程模拟</span>
          )}
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-600 bg-gray-50 rounded p-3">
        {route.summary}
      </div>

      <div className="space-y-3">
        {route.segments.map((seg, segIdx) => (
          <div key={segIdx} className="flex items-start gap-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
              seg.type === "bus" ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-700"
            }`}>
              {segIdx + 1}
            </div>
            <div className="flex-1">
              {seg.type === "bus" ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{seg.line}</span>
                    {seg.isSimulated && (
                      <span className="px-1.5 py-0.5 bg-gray-200 rounded text-xs text-gray-600">模拟</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {seg.from} → {seg.to}（{seg.stationCount}站）
                  </div>
                  {seg.note && (
                    <div className="text-xs text-gray-400 mt-0.5">{seg.note}</div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">步行接驳</span>
                    {seg.isSimulated && (
                      <span className="px-1.5 py-0.5 bg-gray-200 rounded text-xs text-gray-600">模拟</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {seg.from} → {seg.to}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    约{(seg.distanceMeters! / 1000).toFixed(1)}公里，预计{seg.estimatedMinutes}分钟
                    {seg.note && ` · ${seg.note}`}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
