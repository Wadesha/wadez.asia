"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getTouristCities,
  TOURIST_TYPE_LABELS,
  TOURIST_TYPE_ICONS,
  TOURIST_TYPE_COLORS,
  CROWD_LABELS,
  type TouristResource,
  type TouristType,
} from "@/lib/tourist-resource-data";

const TouristResourceMap = dynamic(() => import("@/components/TouristResourceMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

export default function TouristResourcePage() {
  const cities = getTouristCities();
  const [cityId, setCityId] = useState(cities[0]?.id || "");
  const [selectedResource, setSelectedResource] = useState<TouristResource | null>(null);
  const [filterType, setFilterType] = useState<TouristType | "all">("all");

  const currentCity = useMemo(
    () => cities.find((c) => c.id === cityId),
    [cityId, cities]
  );

  const filteredResources = useMemo(() => {
    if (!currentCity) return [];
    if (filterType === "all") return currentCity.resources;
    return currentCity.resources.filter((r) => r.type === filterType);
  }, [currentCity, filterType]);

  const typeStats = useMemo(() => {
    if (!currentCity) return [];
    const stats: { type: TouristType; count: number }[] = [];
    (Object.keys(TOURIST_TYPE_LABELS) as TouristType[]).forEach((t) => {
      const count = currentCity.resources.filter((r) => r.type === t).length;
      if (count > 0) stats.push({ type: t, count });
    });
    return stats;
  }, [currentCity]);

  if (!currentCity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="text-gray-400">加载中...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* 顶部栏 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Link
                href="/gis"
                className="text-xs text-gray-400 hover:text-gray-600 transition"
              >
                ← GIS总览
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  🗺️ 文旅资源地图
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  发现城市之美 — 景点、美食、文化、娱乐一网打尽
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={cityId}
                onChange={(e) => {
                  setCityId(e.target.value);
                  setSelectedResource(null);
                }}
                className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
              >
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              城市：<b className="text-gray-800">{currentCity.name}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              景点数：<b className="text-gray-800">{currentCity.totalResources}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              平均分：<b className="text-yellow-600">⭐ {currentCity.avgRating}</b>
            </span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* 左侧 */}
          <div className="lg:col-span-1 space-y-3">
            {/* 类型筛选 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                资源类型
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setFilterType("all")}
                  className={`w-full text-left px-2 py-1.5 rounded-md text-[11px] transition ${
                    filterType === "all"
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  全部 · {currentCity.totalResources}
                </button>
                {typeStats.map((s) => (
                  <button
                    key={s.type}
                    onClick={() => setFilterType(s.type)}
                    className={`w-full text-left px-2 py-1.5 rounded-md text-[11px] transition flex items-center justify-between ${
                      filterType === s.type
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>
                      {TOURIST_TYPE_ICONS[s.type]} {TOURIST_TYPE_LABELS[s.type]}
                    </span>
                    <span className="text-[10px] text-gray-400">{s.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* TOP排行 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                🏆 人气TOP
              </h3>
              <div className="space-y-1.5 max-h-[380px] overflow-y-auto">
                {filteredResources
                  .sort((a, b) => b.popularity - a.popularity)
                  .map((r, i) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedResource(r)}
                      className={`w-full text-left p-2 rounded-lg transition ${
                        selectedResource?.id === r.id
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0 ${
                            i < 3
                              ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-medium text-gray-700 truncate">
                            {r.name}
                          </div>
                          <div className="text-[9px] text-gray-400 flex items-center gap-1 mt-0.5">
                            <span style={{ color: TOURIST_TYPE_COLORS[r.type] }}>
                              {TOURIST_TYPE_ICONS[r.type]} {TOURIST_TYPE_LABELS[r.type]}
                            </span>
                            <span>·</span>
                            <span className="text-yellow-600">⭐ {r.rating}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* 右侧地图 + 详情 */}
          <div className="lg:col-span-3 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-2">
              <TouristResourceMap
                resources={filteredResources}
                center={currentCity.center}
                zoom={11}
                height="h-[600px]"
                onResourceClick={setSelectedResource}
                selectedId={selectedResource?.id}
              />
            </div>

            {/* 选中详情 */}
            {selectedResource && (
              <div className="bg-white border border-gray-300 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{
                        backgroundColor: TOURIST_TYPE_COLORS[selectedResource.type] + "20",
                        color: TOURIST_TYPE_COLORS[selectedResource.type],
                      }}
                    >
                      {TOURIST_TYPE_ICONS[selectedResource.type]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-gray-800">
                          {selectedResource.name}
                        </h3>
                        {selectedResource.level !== "none" && (
                          <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded">
                            {selectedResource.level}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                        <span className="text-yellow-600 font-medium">
                          ⭐ {selectedResource.rating}
                        </span>
                        <span>·</span>
                        <span>{selectedResource.reviewCount.toLocaleString()} 条点评</span>
                        <span>·</span>
                        <span style={{ color: TOURIST_TYPE_COLORS[selectedResource.type] }}>
                          {TOURIST_TYPE_LABELS[selectedResource.type]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-[11px] text-gray-600 mb-3 leading-relaxed">
                  {selectedResource.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">门票</div>
                    <div className="text-sm font-bold text-red-500">
                      {selectedResource.ticketPrice === 0
                        ? "免费"
                        : `¥${selectedResource.ticketPrice}`}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">开放时间</div>
                    <div className="text-[11px] font-medium text-gray-700">
                      {selectedResource.openTime}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">建议游玩</div>
                    <div className="text-[11px] font-medium text-gray-700">
                      {selectedResource.duration}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">拥挤度</div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: CROWD_LABELS[selectedResource.crowdLevel].color }}
                    >
                      {CROWD_LABELS[selectedResource.crowdLevel].label}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selectedResource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          文旅资源地图 — 探索城市魅力，规划完美旅程
        </div>
      </div>
    </div>
  );
}
