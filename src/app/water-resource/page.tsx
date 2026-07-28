"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getWaterBasins,
  WATER_TYPE_LABELS,
  WATER_TYPE_ICONS,
  WATER_TYPE_COLORS,
  WATER_QUALITY_COLORS,
  type WaterResource,
  type WaterResourceType,
} from "@/lib/water-resource-data";

const WaterResourceMap = dynamic(() => import("@/components/WaterResourceMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

export default function WaterResourcePage() {
  const basins = getWaterBasins();
  const [basinId, setBasinId] = useState(basins[0]?.id || "");
  const [selectedResource, setSelectedResource] = useState<WaterResource | null>(null);
  const [filterType, setFilterType] = useState<WaterResourceType | "all">("all");

  const currentBasin = useMemo(
    () => basins.find((b) => b.id === basinId),
    [basinId, basins]
  );

  const filteredResources = useMemo(() => {
    if (!currentBasin) return [];
    if (filterType === "all") return currentBasin.resources;
    return currentBasin.resources.filter((r) => r.type === filterType);
  }, [currentBasin, filterType]);

  const typeStats = useMemo(() => {
    if (!currentBasin) return [];
    const stats: { type: WaterResourceType; count: number }[] = [];
    (Object.keys(WATER_TYPE_LABELS) as WaterResourceType[]).forEach((t) => {
      const count = currentBasin.resources.filter((r) => r.type === t).length;
      if (count > 0) stats.push({ type: t, count });
    });
    return stats;
  }, [currentBasin]);

  if (!currentBasin) {
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
                  💧 水资源分布
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  江河湖库泉瀑 — 水资源全景图谱
                </p>
              </div>
            </div>
            <select
              value={basinId}
              onChange={(e) => {
                setBasinId(e.target.value);
                setSelectedResource(null);
              }}
              className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
            >
              {basins.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              流域：<b className="text-gray-800">{currentBasin.name}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              流域面积：<b className="text-gray-800">{currentBasin.totalAreaSqKm.toLocaleString()} km²</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              河流总长：<b className="text-blue-600">{currentBasin.totalRiverLength} km</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              总库容：<b className="text-cyan-600">{currentBasin.totalReservoirCapacity} 亿m³</b>
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
                  全部 · {currentBasin.resources.length}
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
                      {WATER_TYPE_ICONS[s.type]} {WATER_TYPE_LABELS[s.type]}
                    </span>
                    <span className="text-[10px] text-gray-400">{s.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 水质分类 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                水质等级
              </h3>
              <div className="space-y-1.5">
                {Object.entries(WATER_QUALITY_COLORS).map(([level, color]) => {
                  const count = currentBasin.resources.filter(
                    (r) => r.waterQuality === level
                  ).length;
                  if (count === 0) return null;
                  return (
                    <div key={level} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[11px] text-gray-700">{level}类</span>
                      </div>
                      <span className="text-[10px] text-gray-400">{count}处</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 资源列表 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                资源列表
              </h3>
              <div className="space-y-1.5 max-h-[320px] overflow-y-auto">
                {filteredResources.map((r) => (
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
                        className="text-lg shrink-0"
                        style={{ fontSize: 18 }}
                      >
                        {WATER_TYPE_ICONS[r.type]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-medium text-gray-700 truncate">
                          {r.name}
                        </div>
                        <div className="text-[9px] text-gray-400 flex items-center gap-1 mt-0.5">
                          <span
                            className="px-1 rounded"
                            style={{
                              backgroundColor: WATER_QUALITY_COLORS[r.waterQuality] + "30",
                              color: WATER_QUALITY_COLORS[r.waterQuality],
                            }}
                          >
                            {r.waterQuality}类
                          </span>
                          {r.lengthKm && <span>· {r.lengthKm}km</span>}
                          {r.areaSqKm && <span>· {r.areaSqKm}km²</span>}
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
              <WaterResourceMap
                resources={filteredResources}
                center={currentBasin.center}
                zoom={8}
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
                        backgroundColor: WATER_TYPE_COLORS[selectedResource.type] + "15",
                        color: WATER_TYPE_COLORS[selectedResource.type],
                      }}
                    >
                      {WATER_TYPE_ICONS[selectedResource.type]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-gray-800">
                          {selectedResource.name}
                        </h3>
                        <span
                          className="px-1.5 py-0.5 text-[10px] font-bold rounded"
                          style={{
                            backgroundColor:
                              WATER_QUALITY_COLORS[selectedResource.waterQuality] + "20",
                            color: WATER_QUALITY_COLORS[selectedResource.waterQuality],
                          }}
                        >
                          {selectedResource.waterQuality}类水质
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {WATER_TYPE_LABELS[selectedResource.type]} · {currentBasin.name}
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {selectedResource.lengthKm && (
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400 mb-0.5">长度</div>
                      <div className="text-sm font-bold text-blue-600">
                        {selectedResource.lengthKm} km
                      </div>
                    </div>
                  )}
                  {selectedResource.areaSqKm && (
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400 mb-0.5">水域面积</div>
                      <div className="text-sm font-bold text-cyan-600">
                        {selectedResource.areaSqKm} km²
                      </div>
                    </div>
                  )}
                  {selectedResource.capacityM3 && (
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400 mb-0.5">总库容</div>
                      <div className="text-sm font-bold text-teal-600">
                        {(selectedResource.capacityM3 / 10000).toFixed(0)} 万m³
                      </div>
                    </div>
                  )}
                  {selectedResource.waterLevel !== undefined && (
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400 mb-0.5">水位</div>
                      <div className="text-sm font-bold text-sky-600">
                        {selectedResource.waterLevel} m
                      </div>
                    </div>
                  )}
                  {selectedResource.flowRate !== undefined && (
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400 mb-0.5">流量</div>
                      <div className="text-sm font-bold text-blue-500">
                        {selectedResource.flowRate} m³/s
                      </div>
                    </div>
                  )}
                  {selectedResource.averageFlow !== undefined && selectedResource.averageFlow > 0 && (
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400 mb-0.5">年均流量</div>
                      <div className="text-sm font-bold text-sky-500">
                        {selectedResource.averageFlow} m³/s
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-gray-600 mt-3 leading-relaxed">
                  {selectedResource.description}。水质达到{selectedResource.waterQuality}类标准。
                  位于{currentBasin.name}范围内。
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          水资源分布 — 江河湖库泉瀑，水资源全景图谱
        </div>
      </div>
    </div>
  );
}
