"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getMineralRegions,
  MINERAL_TYPE_LABELS,
  MINERAL_TYPE_ICONS,
  MINERAL_TYPE_COLORS,
  SCALE_LABELS,
  STATUS_LABELS,
  type MineralResource,
  type MineralType,
} from "@/lib/mineral-resource-data";

const MineralResourceMap = dynamic(() => import("@/components/MineralResourceMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

export default function MineralResourcePage() {
  const regions = getMineralRegions();
  const [regionId, setRegionId] = useState(regions[0]?.id || "");
  const [selectedMineral, setSelectedMineral] = useState<MineralResource | null>(null);
  const [filterType, setFilterType] = useState<MineralType | "all">("all");

  const currentRegion = useMemo(
    () => regions.find((r) => r.id === regionId),
    [regionId, regions]
  );

  const filteredMinerals = useMemo(() => {
    if (!currentRegion) return [];
    if (filterType === "all") return currentRegion.minerals;
    return currentRegion.minerals.filter((m) => m.type === filterType);
  }, [currentRegion, filterType]);

  const typeStats = useMemo(() => {
    if (!currentRegion) return [];
    const stats: { type: MineralType; count: number; reserves: number }[] = [];
    (Object.keys(MINERAL_TYPE_LABELS) as MineralType[]).forEach((t) => {
      const minerals = currentRegion.minerals.filter((m) => m.type === t);
      if (minerals.length > 0) {
        stats.push({
          type: t,
          count: minerals.length,
          reserves: minerals.reduce((s, m) => s + m.reserves, 0),
        });
      }
    });
    return stats.sort((a, b) => b.count - a.count);
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
                  ⛏️ 矿产资源分布
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  地下宝藏的数字地图 — 矿产储量与开发态势
                </p>
              </div>
            </div>
            <select
              value={regionId}
              onChange={(e) => {
                setRegionId(e.target.value);
                setSelectedMineral(null);
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
              矿点数：<b className="text-gray-800">{currentRegion.mineCount}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              优势矿种：<b className="text-amber-600">{currentRegion.dominantMineral}</b>
            </span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* 左侧 */}
          <div className="lg:col-span-1 space-y-3">
            {/* 矿种统计 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                矿种分布
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
                  全部矿种 · {currentRegion.mineCount}
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
                      {MINERAL_TYPE_ICONS[s.type]} {MINERAL_TYPE_LABELS[s.type]}
                    </span>
                    <span className="text-[10px] text-gray-400">{s.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 储量排行 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                🏆 储量排行
              </h3>
              <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
                {filteredMinerals
                  .sort((a, b) => b.reserves - a.reserves)
                  .map((m, i) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMineral(m)}
                      className={`w-full text-left p-2 rounded-lg transition ${
                        selectedMineral?.id === m.id
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] w-5 h-5 rounded-md flex items-center justify-center font-bold shrink-0 ${
                            i < 3
                              ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-medium text-gray-700 truncate">
                            {m.name}
                          </div>
                          <div className="text-[9px] text-gray-400 flex items-center gap-1 mt-0.5">
                            <span style={{ color: MINERAL_TYPE_COLORS[m.type] }}>
                              {MINERAL_TYPE_LABELS[m.type]}
                            </span>
                            <span>·</span>
                            <span>
                              {m.reserves.toLocaleString()}
                              {m.reservesUnit}
                            </span>
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
              <MineralResourceMap
                minerals={filteredMinerals}
                center={currentRegion.center}
                zoom={7}
                height="h-[600px]"
                onMineralClick={setSelectedMineral}
                selectedId={selectedMineral?.id}
              />
            </div>

            {/* 选中详情 */}
            {selectedMineral && (
              <div className="bg-white border border-gray-300 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{
                        backgroundColor: MINERAL_TYPE_COLORS[selectedMineral.type] + "20",
                        color: MINERAL_TYPE_COLORS[selectedMineral.type],
                      }}
                    >
                      {MINERAL_TYPE_ICONS[selectedMineral.type]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-gray-800">
                          {selectedMineral.name}
                        </h3>
                        <span
                          className="px-1.5 py-0.5 text-[10px] font-bold rounded"
                          style={{
                            backgroundColor: STATUS_LABELS[selectedMineral.developmentStatus].color + "20",
                            color: STATUS_LABELS[selectedMineral.developmentStatus].color,
                          }}
                        >
                          {STATUS_LABELS[selectedMineral.developmentStatus].label}
                        </span>
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded">
                          {SCALE_LABELS[selectedMineral.scale]}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1">
                        {MINERAL_TYPE_LABELS[selectedMineral.type]} · {selectedMineral.company}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMineral(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">保有储量</div>
                    <div className="text-sm font-bold text-gray-800">
                      {selectedMineral.reserves.toLocaleString()}
                      <span className="text-[10px] text-gray-400 ml-1">
                        {selectedMineral.reservesUnit}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">年产量</div>
                    <div className="text-sm font-bold text-blue-600">
                      {selectedMineral.annualOutput.toLocaleString()}
                      <span className="text-[10px] text-gray-400 ml-1">
                        {selectedMineral.reservesUnit}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">品位</div>
                    <div className="text-sm font-bold text-amber-600">
                      {selectedMineral.grade}%
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">发现年份</div>
                    <div className="text-sm font-bold text-gray-700">
                      {selectedMineral.discoverYear}年
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-600 leading-relaxed">
                  {selectedMineral.description}，由{selectedMineral.company}开发运营。
                  目前处于{STATUS_LABELS[selectedMineral.developmentStatus].label}状态，
                  年产能{selectedMineral.annualOutput.toLocaleString()}
                  {selectedMineral.reservesUnit}。
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          矿产资源分布 — 地下宝藏的数字地图，赋能资源管理与产业规划
        </div>
      </div>
    </div>
  );
}
