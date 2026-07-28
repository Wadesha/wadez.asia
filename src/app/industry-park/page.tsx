"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getIndustryCities,
  INDUSTRY_TYPE_LABELS,
  INDUSTRY_TYPE_ICONS,
  INDUSTRY_TYPE_COLORS,
  LEVEL_LABELS,
  PHASE_LABELS,
  type IndustryPark,
  type IndustryType,
} from "@/lib/industry-park-data";

const IndustryParkMap = dynamic(() => import("@/components/IndustryParkMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

export default function IndustryParkPage() {
  const cities = getIndustryCities();
  const [cityId, setCityId] = useState(cities[0]?.id || "");
  const [selectedPark, setSelectedPark] = useState<IndustryPark | null>(null);
  const [filterType, setFilterType] = useState<IndustryType | "all">("all");

  const currentCity = useMemo(
    () => cities.find((c) => c.id === cityId),
    [cityId, cities]
  );

  const filteredParks = useMemo(() => {
    if (!currentCity) return [];
    if (filterType === "all") return currentCity.parks;
    return currentCity.parks.filter((p) => p.type === filterType);
  }, [currentCity, filterType]);

  const typeStats = useMemo(() => {
    if (!currentCity) return [];
    const stats: { type: IndustryType; count: number; output: number }[] = [];
    (Object.keys(INDUSTRY_TYPE_LABELS) as IndustryType[]).forEach((t) => {
      const parks = currentCity.parks.filter((p) => p.type === t);
      if (parks.length > 0) {
        stats.push({
          type: t,
          count: parks.length,
          output: parks.reduce((s, p) => s + p.annualOutput, 0),
        });
      }
    });
    return stats.sort((a, b) => b.output - a.output);
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
                  🏭 产业园区分布
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  经济发展的引擎 — 产业集聚与创新高地
                </p>
              </div>
            </div>
            <select
              value={cityId}
              onChange={(e) => {
                setCityId(e.target.value);
                setSelectedPark(null);
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

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              城市：<b className="text-gray-800">{currentCity.name}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              园区数：<b className="text-gray-800">{currentCity.totalParks}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              主导产业：<b className="text-blue-600">{currentCity.dominantIndustry}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              年总产值：<b className="text-green-600">
                {(currentCity.totalOutput / 100000000).toFixed(1)} 亿
              </b>
            </span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* 左侧 */}
          <div className="lg:col-span-1 space-y-3">
            {/* 产业类型 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                产业类型
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
                  全部产业 · {currentCity.totalParks}
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
                      {INDUSTRY_TYPE_ICONS[s.type]} {INDUSTRY_TYPE_LABELS[s.type]}
                    </span>
                    <span className="text-[10px] text-gray-400">{s.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 园区排行 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                🏆 产值排行
              </h3>
              <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
                {filteredParks
                  .sort((a, b) => b.annualOutput - a.annualOutput)
                  .map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPark(p)}
                      className={`w-full text-left p-2 rounded-lg transition ${
                        selectedPark?.id === p.id
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
                            {p.name}
                          </div>
                          <div className="text-[9px] text-gray-400 flex items-center gap-1 mt-0.5">
                            <span
                              className="px-1 rounded text-white"
                              style={{ backgroundColor: LEVEL_LABELS[p.level].color }}
                            >
                              {LEVEL_LABELS[p.level].label}
                            </span>
                            <span>·</span>
                            <span className="text-green-600">
                              {(p.annualOutput / 100000000).toFixed(1)}亿
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
              <IndustryParkMap
                parks={filteredParks}
                center={currentCity.center}
                zoom={11}
                height="h-[600px]"
                onParkClick={setSelectedPark}
                selectedId={selectedPark?.id}
              />
            </div>

            {/* 选中详情 */}
            {selectedPark && (
              <div className="bg-white border border-gray-300 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{
                        backgroundColor: INDUSTRY_TYPE_COLORS[selectedPark.type] + "15",
                        color: INDUSTRY_TYPE_COLORS[selectedPark.type],
                      }}
                    >
                      {INDUSTRY_TYPE_ICONS[selectedPark.type]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-gray-800">
                          {selectedPark.name}
                        </h3>
                        <span
                          className="px-1.5 py-0.5 text-[10px] font-bold text-white rounded"
                          style={{ backgroundColor: LEVEL_LABELS[selectedPark.level].color }}
                        >
                          {LEVEL_LABELS[selectedPark.level].label}
                        </span>
                        <span
                          className="px-1.5 py-0.5 text-[10px] font-medium rounded"
                          style={{
                            backgroundColor: PHASE_LABELS[selectedPark.developmentPhase].color + "20",
                            color: PHASE_LABELS[selectedPark.developmentPhase].color,
                          }}
                        >
                          {PHASE_LABELS[selectedPark.developmentPhase].label}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {INDUSTRY_TYPE_LABELS[selectedPark.type]} · {selectedPark.establishedYear}年成立
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPark(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">规划面积</div>
                    <div className="text-sm font-bold text-gray-800">
                      {selectedPark.areaSqKm} km²
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">入驻企业</div>
                    <div className="text-sm font-bold text-blue-600">
                      {selectedPark.enterpriseCount.toLocaleString()} 家
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">从业人数</div>
                    <div className="text-sm font-bold text-purple-600">
                      {(selectedPark.employees / 10000).toFixed(1)} 万
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">年产值</div>
                    <div className="text-sm font-bold text-green-600">
                      {(selectedPark.annualOutput / 100000000).toFixed(1)} 亿
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">GDP贡献</div>
                    <div className="text-sm font-bold text-amber-600">
                      {(selectedPark.gdp / 100000000).toFixed(1)} 亿
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">税收</div>
                    <div className="text-sm font-bold text-rose-600">
                      {(selectedPark.taxRevenue / 100000000).toFixed(1)} 亿
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-[10px] text-gray-500 mb-1.5">龙头企业</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPark.leadingEnterprises.map((e) => (
                      <span
                        key={e}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] rounded-md"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-gray-600 leading-relaxed">
                  {selectedPark.description}。入驻企业{selectedPark.enterpriseCount}家，
                  从业人员{(selectedPark.employees / 10000).toFixed(1)}万人，
                  年产值{(selectedPark.annualOutput / 100000000).toFixed(1)}亿元。
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          产业园区分布 — 经济发展的引擎，产业集聚与创新高地
        </div>
      </div>
    </div>
  );
}
