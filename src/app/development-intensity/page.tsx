"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getLandUseAreas,
  LAND_USE_LABELS,
  type LandUseParcel,
} from "@/lib/land-use-data";

const LandUseMap = dynamic(() => import("@/components/LandUseMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

type IntensityMetric = "far" | "density" | "height";

const METRICS: { key: IntensityMetric; label: string; unit: string; desc: string }[] = [
  { key: "far", label: "容积率", unit: "FAR", desc: "总建筑面积 / 用地面积" },
  { key: "density", label: "建筑密度", unit: "%", desc: "建筑基底面积 / 用地面积" },
  { key: "height", label: "建筑高度", unit: "m", desc: "估算平均建筑高度" },
];

export default function DevelopmentIntensityPage() {
  const areas = getLandUseAreas();
  const [areaId, setAreaId] = useState(areas[0]?.id || "");
  const [metric, setMetric] = useState<IntensityMetric>("far");
  const [selectedParcel, setSelectedParcel] = useState<LandUseParcel | null>(null);

  const currentArea = useMemo(
    () => areas.find((a) => a.id === areaId),
    [areaId, areas]
  );

  const buildableParcels = useMemo(() => {
    if (!currentArea) return [];
    return currentArea.parcels.filter(
      (p) => p.floorAreaRatio != null && p.buildingDensity != null
    );
  }, [currentArea]);

  const stats = useMemo(() => {
    if (buildableParcels.length === 0) return { avgFar: 0, avgDensity: 0, avgHeight: 0, maxFar: 0, maxDensity: 0, maxHeight: 0 };
    const totalArea = buildableParcels.reduce((s, p) => s + p.areaHa, 0);
    const avgFar = buildableParcels.reduce((s, p) => s + (p.floorAreaRatio || 0) * p.areaHa, 0) / totalArea;
    const avgDensity = buildableParcels.reduce((s, p) => s + (p.buildingDensity || 0) * p.areaHa, 0) / totalArea;
    const avgHeight = avgFar * 3.2;
    const maxFar = Math.max(...buildableParcels.map((p) => p.floorAreaRatio || 0));
    const maxDensity = Math.max(...buildableParcels.map((p) => p.buildingDensity || 0));
    const maxHeight = maxFar * 3.5;
    return {
      avgFar: +avgFar.toFixed(2),
      avgDensity: +avgDensity.toFixed(1),
      avgHeight: +avgHeight.toFixed(0),
      maxFar: +maxFar.toFixed(1),
      maxDensity: +maxDensity.toFixed(0),
      maxHeight: +maxHeight.toFixed(0),
    };
  }, [buildableParcels]);

  const heightParcels = useMemo(() => {
    return buildableParcels.map((p) => ({
      ...p,
      floorAreaRatio: p.floorAreaRatio ? p.floorAreaRatio * 3.2 : undefined,
    }));
  }, [buildableParcels]);

  const displayParcels = metric === "height" ? heightParcels : buildableParcels;

  if (!currentArea) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="text-gray-400">加载中...</span>
      </div>
    );
  }

  const currentMetric = METRICS.find((m) => m.key === metric)!;

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
                  🏢 开发强度分析
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  容积率 = 城市密度的基因 — 三维视角看土地利用效率
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
              平均容积率：<b className="text-gray-800">{stats.avgFar}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              平均建筑密度：<b className="text-gray-800">{stats.avgDensity}%</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              估算平均高度：<b className="text-gray-800">{stats.avgHeight} m</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              开发地块：<b className="text-gray-800">{buildableParcels.length}</b>
            </span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* 左侧控制面板 */}
          <div className="lg:col-span-1 space-y-3">
            {/* 指标选择 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                分析指标
              </h3>
              <div className="space-y-1">
                {METRICS.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setMetric(m.key)}
                    className={`w-full text-left px-2 py-2 rounded-md transition ${
                      metric === m.key
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="text-[11px] font-medium">{m.label}</div>
                    <div className={`text-[9px] mt-0.5 ${metric === m.key ? "text-gray-400" : "text-gray-400"}`}>
                      {m.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 强度分级图例 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                强度分级
              </h3>
              <div className="space-y-1.5">
                {[
                  { label: "低强度", range: "0-2", color: "rgb(200, 220, 240)" },
                  { label: "中低强度", range: "2-4", color: "rgb(255, 180, 150)" },
                  { label: "中高强度", range: "4-6", color: "rgb(255, 120, 100)" },
                  { label: "高强度", range: "6-8", color: "rgb(220, 60, 60)" },
                  { label: "极高强度", range: "8+", color: "rgb(150, 20, 50)" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div
                      className="w-8 h-3 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[10px] text-gray-600">{item.label}</span>
                    <span className="text-[9px] text-gray-400 ml-auto">{item.range}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 核心指标卡片 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-3">
                核心指标
              </h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-3">
                  <div className="text-[10px] text-orange-500 mb-1">平均容积率</div>
                  <div className="text-2xl font-bold text-orange-600">{stats.avgFar}</div>
                  <div className="text-[9px] text-orange-400 mt-0.5">
                    最高 {stats.maxFar} FAR
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3">
                  <div className="text-[10px] text-blue-500 mb-1">平均建筑密度</div>
                  <div className="text-2xl font-bold text-blue-600">{stats.avgDensity}%</div>
                  <div className="text-[9px] text-blue-400 mt-0.5">
                    最高 {stats.maxDensity}%
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
                  <div className="text-[10px] text-purple-500 mb-1">估算平均高度</div>
                  <div className="text-2xl font-bold text-purple-600">{stats.avgHeight}m</div>
                  <div className="text-[9px] text-purple-400 mt-0.5">
                    最高约 {stats.maxHeight}m
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧地图 + 详情 */}
          <div className="lg:col-span-3 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-2">
              <LandUseMap
                parcels={displayParcels}
                center={currentArea.center}
                zoom={14}
                height="h-[600px]"
                colorMode={metric === "height" ? "far" : metric}
                showLabels={false}
                onParcelClick={setSelectedParcel}
              />
            </div>

            {/* 选中地块详情 */}
            {selectedParcel && (
              <div className="bg-white border border-gray-300 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {selectedParcel.name}
                  </h3>
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
                      <div className="font-bold text-orange-600">
                        {metric === "height"
                          ? `${(selectedParcel.floorAreaRatio * 3.2).toFixed(0)} m`
                          : selectedParcel.floorAreaRatio}
                      </div>
                    </div>
                  )}
                  {selectedParcel.buildingDensity != null && (
                    <div>
                      <div className="text-gray-400 mb-0.5">建筑密度</div>
                      <div className="font-bold text-blue-600">
                        {selectedParcel.buildingDensity}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 强度分布直方图 */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-gray-800 mb-3">
                {currentMetric.label}分布
              </h3>
              <div className="flex items-end gap-1 h-32 px-2">
                {Array.from({ length: 10 }).map((_, i) => {
                  const min = i * (stats.maxFar / 10);
                  const max = (i + 1) * (stats.maxFar / 10);
                  const count = buildableParcels.filter(
                    (p) => {
                      const v = metric === "height"
                        ? (p.floorAreaRatio || 0) * 3.2
                        : metric === "far"
                        ? p.floorAreaRatio || 0
                        : p.buildingDensity || 0;
                      return v >= min && v < max;
                    }
                  ).length;
                  const maxCount = Math.max(
                    ...Array.from({ length: 10 }).map((_, j) => {
                      const mn = j * (stats.maxFar / 10);
                      const mx = (j + 1) * (stats.maxFar / 10);
                      return buildableParcels.filter((p) => {
                        const v = metric === "height"
                          ? (p.floorAreaRatio || 0) * 3.2
                          : metric === "far"
                          ? p.floorAreaRatio || 0
                          : p.buildingDensity || 0;
                        return v >= mn && v < mx;
                      }).length;
                    })
                  );
                  const heightPct = maxCount > 0 ? (count / maxCount) * 100 : 0;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="text-[9px] text-gray-400 mb-1">{count || ""}</div>
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-orange-400 to-amber-300 transition-all duration-500"
                        style={{ height: `${Math.max(heightPct, 2)}%` }}
                      />
                      <div className="text-[8px] text-gray-400 mt-1">
                        {min.toFixed(1)}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center text-[10px] text-gray-400 mt-2">
                {currentMetric.label}（{currentMetric.unit}）
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          开发强度分析 — 容积率、建筑密度、建筑高度三维评估
        </div>
      </div>
    </div>
  );
}
