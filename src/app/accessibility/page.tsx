"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getAccessibilityAreas,
  calculateIsochrones,
  calculateAccessibilityScore,
  getFacilityCountByType,
  FACILITY_LABELS,
  FACILITY_COLORS,
  FACILITY_ICONS,
  type FacilityType,
  type Facility,
} from "@/lib/accessibility-data";

const AccessibilityMap = dynamic(() => import("@/components/AccessibilityMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

export default function AccessibilityPage() {
  const areas = getAccessibilityAreas();
  const [areaId, setAreaId] = useState<string>(areas[0]?.id || "");
  const [activeTypes, setActiveTypes] = useState<FacilityType[]>([]);
  const [showIsochrones, setShowIsochrones] = useState(true);
  const [showFacilities, setShowFacilities] = useState(true);
  const [origin, setOrigin] = useState<[number, number] | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const currentArea = useMemo(
    () => areas.find((a) => a.id === areaId),
    [areaId, areas]
  );

  const originPoint = origin || currentArea?.center || [0, 0];

  const isochrones = useMemo(() => {
    if (!currentArea) return [];
    return calculateIsochrones(
      originPoint[0],
      originPoint[1],
      currentArea.facilities,
      activeTypes
    );
  }, [currentArea, originPoint, activeTypes]);

  const score = useMemo(() => {
    if (!currentArea) return null;
    return calculateAccessibilityScore(
      originPoint[0],
      originPoint[1],
      currentArea.facilities,
      activeTypes
    );
  }, [currentArea, originPoint, activeTypes]);

  const facilityCounts = useMemo(() => {
    if (!currentArea) return {} as Record<FacilityType, number>;
    return getFacilityCountByType(currentArea.facilities, activeTypes);
  }, [currentArea, activeTypes]);

  const allTypes = useMemo(
    () => Object.keys(FACILITY_LABELS) as FacilityType[],
    []
  );

  const totalFacilities = Object.values(facilityCounts).reduce((a, b) => a + b, 0);

  const toggleType = (type: FacilityType) => {
    setActiveTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleMapClick = useCallback((lng: number, lat: number) => {
    setOrigin([lng, lat]);
    setSelectedFacility(null);
  }, []);

  if (!currentArea || !score) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="text-gray-400">加载中...</span>
      </div>
    );
  }

  const gradeColors: Record<string, string> = {
    "A+": "from-emerald-500 to-emerald-600",
    "A": "from-green-500 to-green-600",
    "B+": "from-blue-500 to-blue-600",
    "B": "from-cyan-500 to-cyan-600",
    "C": "from-amber-500 to-amber-600",
    "D": "from-red-500 to-red-600",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
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
                  城市可达性分析器
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  量化评估 15 分钟生活圈质量
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={areaId}
                onChange={(e) => {
                  setAreaId(e.target.value);
                  setOrigin(null);
                  setSelectedFacility(null);
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
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              设施总数 <b className="text-gray-800">{totalFacilities}</b> 个
            </span>
            <span className="text-gray-200">|</span>
            <span>
              分类 <b className="text-gray-800">{allTypes.length}</b> 类
            </span>
            <span className="text-gray-200">|</span>
            <span>
              综合评分 <b className="text-gray-800">{score.totalScore}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              等级 <b className="text-gray-800">{score.grade}（{score.gradeLabel}）</b>
            </span>
            <span className="ml-auto text-xs text-gray-400">
              💡 点击地图可移动起点
            </span>
            <span className="text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-gray-800">
                  综合评分
                </h3>
                <span className="text-[10px] text-gray-400">{score.gradeLabel}</span>
              </div>
              <div
                className={`w-full py-3 rounded-lg bg-gradient-to-r ${gradeColors[score.grade] || "from-gray-500 to-gray-600"} text-center`}
              >
                <div className="text-3xl font-bold text-white">{score.grade}</div>
                <div className="text-xs text-white/80 mt-0.5">
                  {score.totalScore} 分
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-semibold text-gray-800">
                  设施类型
                </h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveTypes(allTypes)}
                    className="text-[10px] text-gray-500 hover:text-gray-700"
                  >
                    全选
                  </button>
                  <span className="text-[10px] text-gray-300">|</span>
                  <button
                    onClick={() => setActiveTypes([])}
                    className="text-[10px] text-gray-500 hover:text-gray-700"
                  >
                    清空
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                {allTypes.map((type) => {
                  const isActive =
                    activeTypes.length === 0 || activeTypes.includes(type);
                  return (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 transition text-left"
                    >
                      <span className="text-base">{FACILITY_ICONS[type]}</span>
                      <span className="text-[11px] text-gray-700 flex-1">
                        {FACILITY_LABELS[type]}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {facilityCounts[type] || 0}
                      </span>
                      <div
                        className="w-2 h-2 rounded-sm"
                        style={{
                          backgroundColor: isActive
                            ? FACILITY_COLORS[type]
                            : "#e5e7eb",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                显示控制
              </h3>
              <div className="space-y-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-[11px] text-gray-600">等时圈</span>
                  <input
                    type="checkbox"
                    checked={showIsochrones}
                    onChange={(e) => setShowIsochrones(e.target.checked)}
                    className="w-3.5 h-3.5 accent-gray-800"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-[11px] text-gray-600">设施点</span>
                  <input
                    type="checkbox"
                    checked={showFacilities}
                    onChange={(e) => setShowFacilities(e.target.checked)}
                    className="w-3.5 h-3.5 accent-gray-800"
                  />
                </label>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                等时圈图例
              </h3>
              <div className="space-y-1.5">
                {isochrones.slice(0, 4).map((ring, idx) => (
                  <div key={ring.timeMin} className="flex items-center gap-2">
                    <div
                      className="w-4 h-0.5 rounded-full"
                      style={{
                        backgroundColor: [
                          "#10b981",
                          "#3b82f6",
                          "#f59e0b",
                          "#ef4444",
                        ][idx],
                      }}
                    />
                    <span className="text-[10px] text-gray-600">
                      {ring.timeMin} 分钟
                    </span>
                    <span className="text-[10px] text-gray-400 ml-auto">
                      {ring.facilityCount} 个设施
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                分项评分
              </h3>
              <div className="space-y-2">
                {allTypes.map((type) => {
                  const s = score.scores[type];
                  const maxScore = Math.max(
                    ...Object.values(score.scores),
                    1
                  );
                  const pct = (s / maxScore) * 100;
                  return (
                    <div key={type}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] text-gray-600">
                          {FACILITY_ICONS[type]} {FACILITY_LABELS[type]}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">
                          {s}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: FACILITY_COLORS[type],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-2">
              <AccessibilityMap
                facilities={currentArea.facilities}
                center={originPoint}
                isochrones={isochrones}
                zoom={13}
                height="h-[600px]"
                activeTypes={activeTypes}
                showIsochrones={showIsochrones}
                showFacilities={showFacilities}
                onMapClick={handleMapClick}
                onFacilityClick={(f) => setSelectedFacility(f)}
              />
            </div>

            {selectedFacility && (
              <div className="bg-white border border-gray-300 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{FACILITY_ICONS[selectedFacility.type]}</span>
                    <h3 className="text-sm font-semibold text-gray-800">
                      {selectedFacility.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedFacility(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-gray-400">类型：</span>
                    <span className="text-gray-700">
                      {FACILITY_LABELS[selectedFacility.type]}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">评分：</span>
                    <span className="text-gray-700">
                      ⭐ {selectedFacility.rating?.toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">规模：</span>
                    <span className="text-gray-700">
                      {selectedFacility.size?.toLocaleString()} m²
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">容量：</span>
                    <span className="text-gray-700">
                      {selectedFacility.capacity?.toLocaleString()} 人
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">坐标：</span>
                    <span className="text-gray-500 font-mono text-[10px]">
                      {selectedFacility.lng}, {selectedFacility.lat}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-3">
                15 分钟生活圈统计
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {isochrones.slice(0, 4).map((ring, idx) => (
                  <div
                    key={ring.timeMin}
                    className="bg-gray-50 rounded-lg p-2.5 text-center"
                  >
                    <div
                      className="text-lg font-bold"
                      style={{
                        color: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"][idx],
                      }}
                    >
                      {ring.facilityCount}
                    </div>
                    <div className="text-[9px] text-gray-500 mt-0.5">
                      {ring.timeMin} 分钟可达
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-2">
                基于步行速度 4.5 km/h 估算
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          城市可达性分析器 — 量化你的 15 分钟生活圈
        </div>
      </div>
    </div>
  );
}
