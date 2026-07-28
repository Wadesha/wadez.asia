"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getEconDatasets,
  ECON_METRICS,
  type RegionEconData,
  type EconMetricKey,
} from "@/lib/economic-data";

const EconDataMap = dynamic(() => import("@/components/EconDataMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

function formatValue(value: number, metric: EconMetricKey): string {
  const info = ECON_METRICS[metric];
  if (info.format === "亿") return (value / 1).toLocaleString() + "亿";
  if (info.format === "万") return (value / 10000).toFixed(1) + "万";
  if (info.format === "%") return value + "%";
  return value.toLocaleString();
}

export default function EconomicDataPage() {
  const datasets = getEconDatasets();
  const [datasetId, setDatasetId] = useState(datasets[0]?.id || "");
  const [metric, setMetric] = useState<EconMetricKey>("gdp");
  const [selectedRegion, setSelectedRegion] = useState<RegionEconData | null>(null);

  const currentDataset = useMemo(
    () => datasets.find((d) => d.id === datasetId),
    [datasetId, datasets]
  );

  const sortedRegions = useMemo(() => {
    if (!currentDataset) return [];
    return [...currentDataset.regions].sort((a, b) => (b[metric] as number) - (a[metric] as number));
  }, [currentDataset, metric]);

  if (!currentDataset) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="text-gray-400">加载中...</span>
      </div>
    );
  }

  const metricInfo = ECON_METRICS[metric];

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
                  📊 经济数据图谱
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  数字看中国 — 省域经济全景数据可视化
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={datasetId}
                onChange={(e) => {
                  setDatasetId(e.target.value);
                  setSelectedRegion(null);
                }}
                className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
              >
                {datasets.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} · {d.year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              总GDP：<b className="text-blue-600">{(currentDataset.totalGdp / 10000).toFixed(0)} 万亿</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              总人口：<b className="text-amber-600">{currentDataset.totalPopulation.toLocaleString()} 万</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              平均增速：<b className="text-green-600">{currentDataset.avgGrowth}%</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              省级单位：<b className="text-gray-800">{currentDataset.regions.length}</b>
            </span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* 左侧 */}
          <div className="lg:col-span-1 space-y-3">
            {/* 指标选择 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                显示指标
              </h3>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(ECON_METRICS) as EconMetricKey[]).map((key) => {
                  const info = ECON_METRICS[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setMetric(key)}
                      className={`px-2 py-1.5 text-[10px] rounded-md text-left transition ${
                        metric === key
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {info.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TOP排行 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                🏆 {metricInfo.label}排行
              </h3>
              <div className="space-y-1.5 max-h-[420px] overflow-y-auto">
                {sortedRegions.map((r, i) => {
                  const value = r[metric] as number;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRegion(r)}
                      className={`w-full text-left p-2 rounded-lg transition ${
                        selectedRegion?.id === r.id
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0 ${
                            i < 3
                              ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-medium text-gray-700 flex justify-between">
                            <span>{r.name}</span>
                            <span style={{ color: metricInfo.color }}>
                              {formatValue(value, metric)}
                            </span>
                          </div>
                          <div className="text-[9px] text-gray-400 mt-0.5">
                            GDP {(r.gdp / 10000).toFixed(1)}万亿 · 增速 {r.gdpGrowth}%
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 右侧地图 + 详情 */}
          <div className="lg:col-span-3 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-2">
              <EconDataMap
                regions={currentDataset.regions}
                center={[104.0, 35.0]}
                zoom={4}
                height="h-[600px]"
                metric={metric}
                onRegionClick={setSelectedRegion}
                selectedId={selectedRegion?.id}
              />
            </div>

            {/* 选中详情 */}
            {selectedRegion && (
              <div className="bg-white border border-gray-300 rounded-xl p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {selectedRegion.name}
                      </h3>
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded">
                        全国第{selectedRegion.ranking}名
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {currentDataset.year}年经济数据 · 面积{selectedRegion.areaSqKm.toLocaleString()}km²
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedRegion(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-[10px] text-blue-400 mb-1">GDP总量</div>
                    <div className="text-lg font-bold text-blue-600">
                      {selectedRegion.gdp.toLocaleString()}
                      <span className="text-[10px] text-blue-400 ml-1">亿</span>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-[10px] text-green-400 mb-1">GDP增速</div>
                    <div className="text-lg font-bold text-green-600">
                      {selectedRegion.gdpGrowth}%
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="text-[10px] text-purple-400 mb-1">人均GDP</div>
                    <div className="text-lg font-bold text-purple-600">
                      {(selectedRegion.perCapitaGdp / 10000).toFixed(1)}
                      <span className="text-[10px] text-purple-400 ml-1">万</span>
                    </div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3">
                    <div className="text-[10px] text-amber-400 mb-1">常住人口</div>
                    <div className="text-lg font-bold text-amber-600">
                      {selectedRegion.population.toLocaleString()}
                      <span className="text-[10px] text-amber-400 ml-1">万</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">财政收入</div>
                    <div className="text-sm font-bold text-rose-600">
                      {selectedRegion.fiscalRevenue.toLocaleString()}亿
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">固定资产投资</div>
                    <div className="text-sm font-bold text-cyan-600">
                      {selectedRegion.fixedAssetInvestment.toLocaleString()}亿
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">社零总额</div>
                    <div className="text-sm font-bold text-pink-600">
                      {selectedRegion.totalRetail.toLocaleString()}亿
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">进出口总额</div>
                    <div className="text-sm font-bold text-lime-600">
                      {selectedRegion.foreignTrade.toLocaleString()}亿
                    </div>
                  </div>
                </div>

                {/* 产业结构 */}
                <div className="mb-4">
                  <div className="text-[11px] font-medium text-gray-700 mb-1.5">
                    产业结构（三产占比）
                  </div>
                  <div className="flex h-6 rounded-lg overflow-hidden">
                    <div
                      className="flex items-center justify-center text-[10px] text-white"
                      style={{
                        width: `${selectedRegion.industryStructure.primary}%`,
                        backgroundColor: "#84cc16",
                      }}
                    >
                      {selectedRegion.industryStructure.primary > 5 ? `一产 ${selectedRegion.industryStructure.primary}%` : ""}
                    </div>
                    <div
                      className="flex items-center justify-center text-[10px] text-white"
                      style={{
                        width: `${selectedRegion.industryStructure.secondary}%`,
                        backgroundColor: "#3b82f6",
                      }}
                    >
                      {selectedRegion.industryStructure.secondary > 10 ? `二产 ${selectedRegion.industryStructure.secondary}%` : ""}
                    </div>
                    <div
                      className="flex items-center justify-center text-[10px] text-white"
                      style={{
                        width: `${selectedRegion.industryStructure.tertiary}%`,
                        backgroundColor: "#8b5cf6",
                      }}
                    >
                      {selectedRegion.industryStructure.tertiary > 10 ? `三产 ${selectedRegion.industryStructure.tertiary}%` : ""}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">城镇化率</div>
                    <div className="text-sm font-bold text-indigo-600">
                      {selectedRegion.urbanizationRate}%
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">面积</div>
                    <div className="text-sm font-bold text-gray-700">
                      {selectedRegion.areaSqKm.toLocaleString()} km²
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          经济数据图谱 — 数字看中国，省域经济全景数据可视化
        </div>
      </div>
    </div>
  );
}
