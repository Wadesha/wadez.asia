"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getLandUseRegions,
  LAND_USE_LABELS,
  LAND_USE_COLORS,
  LAND_USE_ICONS,
  PROTECTION_LABELS,
  type LandUsePatch,
  type LandUseType,
} from "@/lib/land-use-resource-data";

const LandUseMap = dynamic(() => import("@/components/LandUseResourceMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

export default function LandUseResourcePage() {
  const regions = getLandUseRegions();
  const [regionId, setRegionId] = useState(regions[0]?.id || "");
  const [selectedPatch, setSelectedPatch] = useState<LandUsePatch | null>(null);
  const [filterType, setFilterType] = useState<LandUseType | "all">("all");

  const currentRegion = useMemo(
    () => regions.find((r) => r.id === regionId),
    [regionId, regions]
  );

  const filteredPatches = useMemo(() => {
    if (!currentRegion) return [];
    if (filterType === "all") return currentRegion.patches;
    return currentRegion.patches.filter((p) => p.type === filterType);
  }, [currentRegion, filterType]);

  const typeStats = useMemo(() => {
    if (!currentRegion) return [];
    const stats: { type: LandUseType; area: number; percentage: number }[] = [];
    (Object.keys(LAND_USE_LABELS) as LandUseType[]).forEach((t) => {
      const area = currentRegion.areaByType[t];
      if (area > 0) {
        stats.push({
          type: t,
          area: +area.toFixed(1),
          percentage: currentRegion.percentageByType[t],
        });
      }
    });
    return stats.sort((a, b) => b.area - a.area);
  }, [currentRegion]);

  if (!currentRegion) {
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
                  🌍 土地利用现状
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  山川田林湖草沙 — 国土空间利用全景图
                </p>
              </div>
            </div>
            <select
              value={regionId}
              onChange={(e) => {
                setRegionId(e.target.value);
                setSelectedPatch(null);
              }}
              className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
            >
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              区域：<b className="text-gray-800">{currentRegion.name}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              总面积：<b className="text-gray-800">{currentRegion.totalAreaSqKm.toLocaleString()} km²</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              斑块数：<b className="text-gray-800">{currentRegion.patches.length}</b>
            </span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* 左侧 */}
          <div className="lg:col-span-1 space-y-3">
            {/* 用地结构饼图（条形） */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-3">
                用地结构
              </h3>
              <div className="space-y-2">
                {typeStats.map((s) => (
                  <button
                    key={s.type}
                    onClick={() =>
                      setFilterType(filterType === s.type ? "all" : s.type)
                    }
                    className={`w-full text-left transition ${
                      filterType === s.type ? "opacity-100" : "hover:opacity-90"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[11px] text-gray-700 flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-sm"
                          style={{ backgroundColor: LAND_USE_COLORS[s.type] }}
                        />
                        {LAND_USE_ICONS[s.type]} {LAND_USE_LABELS[s.type]}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {s.percentage}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${s.percentage}%`,
                          backgroundColor: LAND_USE_COLORS[s.type],
                        }}
                      />
                    </div>
                    <div className="text-[9px] text-gray-400 text-right mt-0.5">
                      {s.area.toLocaleString()} km²
                    </div>
                  </button>
                ))}
              </div>
              {filterType !== "all" && (
                <button
                  onClick={() => setFilterType("all")}
                  className="w-full mt-2 text-[10px] text-blue-600 hover:text-blue-700"
                >
                  显示全部
                </button>
              )}
            </div>

            {/* 斑块列表 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                斑块列表（按面积）
              </h3>
              <div className="space-y-1.5 max-h-[380px] overflow-y-auto">
                {filteredPatches
                  .sort((a, b) => b.areaSqKm - a.areaSqKm)
                  .slice(0, 30)
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPatch(p)}
                      className={`w-full text-left p-2 rounded-lg transition ${
                        selectedPatch?.id === p.id
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-sm shrink-0"
                          style={{ backgroundColor: LAND_USE_COLORS[p.type] }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-medium text-gray-700 truncate">
                            {p.name}
                          </div>
                          <div className="text-[9px] text-gray-400">
                            {p.areaSqKm} km² · 海拔{p.elevation}m
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
              <LandUseMap
                patches={filteredPatches}
                center={currentRegion.center}
                zoom={9}
                height="h-[600px]"
                onPatchClick={setSelectedPatch}
                selectedId={selectedPatch?.id}
              />
            </div>

            {/* 选中详情 */}
            {selectedPatch && (
              <div className="bg-white border border-gray-300 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{
                        backgroundColor: LAND_USE_COLORS[selectedPatch.type] + "30",
                        color: LAND_USE_COLORS[selectedPatch.type],
                      }}
                    >
                      {LAND_USE_ICONS[selectedPatch.type]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-gray-800">
                          {selectedPatch.name}
                        </h3>
                        {selectedPatch.protectionLevel &&
                          selectedPatch.protectionLevel !== "none" && (
                            <span
                              className="px-1.5 py-0.5 text-[10px] font-bold rounded"
                              style={{
                                backgroundColor:
                                  PROTECTION_LABELS[selectedPatch.protectionLevel].color +
                                  "20",
                                color:
                                  PROTECTION_LABELS[selectedPatch.protectionLevel].color,
                              }}
                            >
                              {PROTECTION_LABELS[selectedPatch.protectionLevel].label}保护
                            </span>
                          )}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {LAND_USE_LABELS[selectedPatch.type]} · {selectedPatch.areaSqKm} km²
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPatch(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">面积</div>
                    <div className="text-sm font-bold text-gray-800">
                      {selectedPatch.areaSqKm} km²
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">海拔</div>
                    <div className="text-sm font-bold text-blue-600">
                      {selectedPatch.elevation} m
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">坡度</div>
                    <div className="text-sm font-bold text-amber-600">
                      {selectedPatch.slope}°
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">土壤质量</div>
                    <div className="text-sm font-bold text-green-600">
                      {selectedPatch.soilQuality ? `${selectedPatch.soilQuality}分` : "—"}
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-600 mt-3 leading-relaxed">
                  {selectedPatch.description}。
                  {selectedPatch.protectionLevel &&
                    selectedPatch.protectionLevel !== "none" &&
                    ` 属于${PROTECTION_LABELS[selectedPatch.protectionLevel].label}级保护区。`}
                  海拔{selectedPatch.elevation}米，坡度{selectedPatch.slope}度。
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          土地利用现状 — 山川田林湖草沙，国土空间利用全景图
        </div>
      </div>
    </div>
  );
}
