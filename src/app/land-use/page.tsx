"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getLandUseAreas,
  getLandUseSummary,
  LAND_USE_LABELS,
  LAND_USE_COLORS,
  type LandUseParcel,
  type LandUseType,
} from "@/lib/land-use-data";

const LandUseMap = dynamic(() => import("@/components/LandUseMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

type ColorMode = "type" | "far" | "density";

const COLOR_MODES: { key: ColorMode; label: string }[] = [
  { key: "type", label: "按用地性质" },
  { key: "far", label: "按容积率" },
  { key: "density", label: "按建筑密度" },
];

export default function LandUsePage() {
  const areas = getLandUseAreas();
  const [areaId, setAreaId] = useState(areas[0]?.id || "");
  const [colorMode, setColorMode] = useState<ColorMode>("type");
  const [showLabels, setShowLabels] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<LandUseParcel | null>(null);
  const [activeFilter, setActiveFilter] = useState<LandUseType | "all">("all");

  const currentArea = useMemo(
    () => areas.find((a) => a.id === areaId),
    [areaId, areas]
  );

  const summary = useMemo(
    () => (currentArea ? getLandUseSummary(currentArea) : []),
    [currentArea]
  );

  const filteredParcels = useMemo(() => {
    if (!currentArea) return [];
    if (activeFilter === "all") return currentArea.parcels;
    return currentArea.parcels.filter((p) => p.type === activeFilter);
  }, [currentArea, activeFilter]);

  if (!currentArea) {
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
                  🏗️ 用地性质图谱
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  土地是城市的第一语言 — 用地结构决定城市功能
                </p>
              </div>
            </div>
            <select
              value={areaId}
              onChange={(e) => {
                setAreaId(e.target.value);
                setSelectedParcel(null);
              }}
              className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
            >
              {areas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              区域：<b className="text-gray-800">{currentArea.name}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              总用地 <b className="text-gray-800">{currentArea.totalAreaHa} 公顷</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              地块数 <b className="text-gray-800">{currentArea.parcels.length}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              用地类型 <b className="text-gray-800">{summary.length} 类</b>
            </span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* 左侧控制面板 */}
          <div className="lg:col-span-1 space-y-3">
            {/* 显示模式 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                显示模式
              </h3>
              <div className="space-y-1">
                {COLOR_MODES.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setColorMode(m.key)}
                    className={`w-full text-left px-2 py-1.5 text-[11px] rounded-md transition ${
                      colorMode === m.key
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-[11px] text-gray-600">显示面积标注</span>
                  <input
                    type="checkbox"
                    checked={showLabels}
                    onChange={(e) => setShowLabels(e.target.checked)}
                    className="w-3.5 h-3.5 accent-blue-500"
                  />
                </label>
              </div>
            </div>

            {/* 用地分类图例 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                用地类型
              </h3>
              <div className="space-y-1.5">
                {summary.map((item) => (
                  <button
                    key={item.type}
                    onClick={() => setActiveFilter(activeFilter === item.type ? "all" : item.type)}
                    className={`w-full text-left px-2 py-1.5 rounded-md transition ${
                      activeFilter === item.type
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-sm border border-white shadow-sm shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[11px] text-gray-700 flex-1 truncate">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {item.percent.toFixed(0)}%
                      </span>
                    </div>
                  </button>
                ))}
                {activeFilter !== "all" && (
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="w-full text-center py-1.5 text-[10px] text-blue-500 hover:text-blue-600"
                  >
                    清除筛选
                  </button>
                )}
              </div>
            </div>

            {/* 用地结构饼图（纯CSS） */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-3">
                用地结构
              </h3>
              <div className="flex items-center justify-center mb-3">
                <div
                  className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                  style={{
                    background: `conic-gradient(${summary
                      .map((item, i) => {
                        const start = summary
                          .slice(0, i)
                          .reduce((s, p) => s + p.percent, 0);
                        const end = start + item.percent;
                        return `${item.color} ${start}% ${end}%`;
                      })
                      .join(", ")})`,
                  }}
                />
              </div>
              <div className="text-center text-[10px] text-gray-500">
                总面积 {currentArea.totalAreaHa} 公顷
              </div>
            </div>

            {/* 统计卡片 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                开发指标
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-amber-50 rounded-lg p-2 text-center">
                  <div className="text-base font-bold text-amber-600">
                    {(currentArea.parcels.filter((p) => p.floorAreaRatio != null).reduce((s, p) => s + (p.floorAreaRatio || 0) * p.areaHa, 0) /
                      currentArea.parcels.filter((p) => p.floorAreaRatio != null).reduce((s, p) => s + p.areaHa, 0)).toFixed(2)}
                  </div>
                  <div className="text-[9px] text-amber-600/70 mt-0.5">
                    平均容积率
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-2 text-center">
                  <div className="text-base font-bold text-blue-600">
                    {(currentArea.parcels.filter((p) => p.buildingDensity != null).reduce((s, p) => s + (p.buildingDensity || 0) * p.areaHa, 0) /
                      currentArea.parcels.filter((p) => p.buildingDensity != null).reduce((s, p) => s + p.areaHa, 0)).toFixed(1)}%
                  </div>
                  <div className="text-[9px] text-blue-600/70 mt-0.5">
                    平均建筑密度
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧地图 + 详情 */}
          <div className="lg:col-span-3 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-2">
              <LandUseMap
                parcels={filteredParcels}
                center={currentArea.center}
                zoom={14}
                height="h-[600px]"
                colorMode={colorMode}
                showLabels={showLabels}
                onParcelClick={setSelectedParcel}
              />
            </div>

            {/* 选中地块详情 */}
            {selectedParcel && (
              <div className="bg-white border border-gray-300 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-sm border border-gray-200"
                      style={{ backgroundColor: LAND_USE_COLORS[selectedParcel.type] }}
                    />
                    <h3 className="text-sm font-semibold text-gray-800">
                      {selectedParcel.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedParcel(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                  <div>
                    <div className="text-gray-400 mb-0.5">用地性质</div>
                    <div className="font-medium text-gray-700">
                      {LAND_USE_LABELS[selectedParcel.type]}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-0.5">用地面积</div>
                    <div className="font-medium text-gray-700">
                      {selectedParcel.areaHa.toFixed(2)} 公顷
                    </div>
                  </div>
                  {selectedParcel.floorAreaRatio != null && (
                    <div>
                      <div className="text-gray-400 mb-0.5">容积率</div>
                      <div className="font-medium text-gray-700">
                        {selectedParcel.floorAreaRatio}
                      </div>
                    </div>
                  )}
                  {selectedParcel.buildingDensity != null && (
                    <div>
                      <div className="text-gray-400 mb-0.5">建筑密度</div>
                      <div className="font-medium text-gray-700">
                        {selectedParcel.buildingDensity}%
                      </div>
                    </div>
                  )}
                  {selectedParcel.population != null && (
                    <div>
                      <div className="text-gray-400 mb-0.5">居住人口</div>
                      <div className="font-medium text-gray-700">
                        {selectedParcel.population.toLocaleString()} 人
                      </div>
                    </div>
                  )}
                </div>
                {selectedParcel.description && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-[11px] text-gray-500">
                      {selectedParcel.description}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 用地类型统计 */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-gray-800 mb-3">
                各类用地统计
              </h3>
              <div className="space-y-2">
                {summary.map((item) => (
                  <div key={item.type} className="flex items-center gap-3">
                    <div className="w-24 flex items-center gap-1.5 shrink-0">
                      <div
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[10px] text-gray-600">{item.label}</span>
                    </div>
                    <div className="flex-1 h-5 bg-gray-50 rounded-full overflow-hidden relative">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.percent}%`,
                          backgroundColor: item.color,
                        }}
                      />
                      <span className="absolute inset-0 flex items-center px-2 text-[10px] font-medium text-gray-700">
                        {item.area.toFixed(1)} 公顷 · {item.count} 块
                      </span>
                    </div>
                    <div className="w-10 text-right text-[10px] text-gray-500 shrink-0">
                      {item.percent.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          用地性质图谱 — 土地利用结构决定城市功能布局
        </div>
      </div>
    </div>
  );
}
