"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getPredictions,
  getCities,
  LOCATION_TYPE_LABELS,
  LOCATION_TYPE_ICONS,
  type FlowPrediction,
  type LocationType,
} from "@/lib/passenger-flow-data";
import { forecastTrend } from "@/lib/trend-forecast";
import TrendForecastPanel from "@/components/TrendForecastPanel";

const PassengerFlowMap = dynamic(() => import("@/components/PassengerFlowMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-xl">
      <span className="text-xs text-gray-400">地图加载中...</span>
    </div>
  ),
});

export default function PassengerFlowPage() {
  const predictions = getPredictions();
  const cities = getCities();
  const [city, setCity] = useState(cities[0] || "");
  const [locationType, setLocationType] = useState<LocationType | "all">("all");
  const [selectedPrediction, setSelectedPrediction] = useState<FlowPrediction | null>(null);

  const filteredPredictions = useMemo(
    () =>
      predictions.filter(
        (p) => p.city === city && (locationType === "all" || p.locationType === locationType)
      ),
    [predictions, city, locationType]
  );

  const stats = useMemo(() => {
    const totalDaily = filteredPredictions.reduce((s, p) => s + p.dailyFlow, 0);
    const avgPeak = Math.round(
      filteredPredictions.reduce((s, p) => s + p.peakFlow, 0) / filteredPredictions.length || 0
    );
    const avgConfidence = Math.round(
      filteredPredictions.reduce((s, p) => s + p.confidence, 0) / filteredPredictions.length || 0
    );
    return { totalDaily, avgPeak, avgConfidence };
  }, [filteredPredictions]);

  const mapCenter = useMemo<[number, number]>(() => {
    const cityPreds = predictions.filter((p) => p.city === city);
    if (cityPreds.length === 0) return [116.46, 39.915];
    const avgLng = cityPreds.reduce((s, p) => s + p.lng, 0) / cityPreds.length;
    const avgLat = cityPreds.reduce((s, p) => s + p.lat, 0) / cityPreds.length;
    return [avgLng, avgLat];
  }, [predictions, city]);

  const flowForecast = useMemo(() => {
    const historical = [
      { year: 2021, value: Math.max(1000, stats.totalDaily * 0.75) },
      { year: 2022, value: Math.max(1000, stats.totalDaily * 0.82) },
      { year: 2023, value: Math.max(1000, stats.totalDaily * 0.9) },
      { year: 2024, value: Math.max(1000, stats.totalDaily * 0.96) },
      { year: 2025, value: stats.totalDaily },
    ];
    return forecastTrend(historical, 5);
  }, [stats.totalDaily]);

  const peakForecast = useMemo(() => {
    const historical = [
      { year: 2021, value: Math.max(100, stats.avgPeak * 0.78) },
      { year: 2022, value: Math.max(100, stats.avgPeak * 0.85) },
      { year: 2023, value: Math.max(100, stats.avgPeak * 0.92) },
      { year: 2024, value: Math.max(100, stats.avgPeak * 0.97) },
      { year: 2025, value: stats.avgPeak },
    ];
    return forecastTrend(historical, 5);
  }, [stats.avgPeak]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* 顶部栏 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Link
                href="/business-siting"
                className="text-xs text-gray-400 hover:text-gray-600 transition"
              >
                ← 商铺选址
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  👥 客流预测模拟器
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  基于位置的客流预测 · 时段分布 · 影响因素分析
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setSelectedPrediction(null);
                }}
                className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={locationType}
                onChange={(e) => {
                  setLocationType(e.target.value as LocationType | "all");
                  setSelectedPrediction(null);
                }}
                className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
              >
                <option value="all">全部类型</option>
                {(Object.keys(LOCATION_TYPE_LABELS) as LocationType[]).map((t) => (
                  <option key={t} value={t}>
                    {LOCATION_TYPE_ICONS[t]} {LOCATION_TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              监测点：<b className="text-gray-800">{filteredPredictions.length}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              日均客流：<b className="text-gray-800">{(stats.totalDaily / 10000).toFixed(1)}万</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              平均峰值：<b className="text-orange-600">{stats.avgPeak}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              预测准确率：<b className="text-green-600">{stats.avgConfidence}%</b>
            </span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* 左侧：监测点列表 */}
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                监测点列表
              </h3>
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
                {filteredPredictions.map((pred) => (
                  <button
                    key={pred.id}
                    onClick={() => setSelectedPrediction(pred)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition ${
                      selectedPrediction?.id === pred.id
                        ? "bg-gray-100 border border-gray-300"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-medium text-gray-800">
                        {LOCATION_TYPE_ICONS[pred.locationType]} {pred.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500">
                      <span>
                        日均 <b className="text-gray-700">{(pred.dailyFlow / 1000).toFixed(0)}k</b>
                      </span>
                      <span>
                        峰值 <b className="text-gray-700">{pred.peakHour}时</b>
                      </span>
                      <span>
                        准确率 <b className="text-green-600">{pred.confidence}%</b>
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <TrendForecastPanel result={flowForecast} title="日均客流趋势预测" />
            <TrendForecastPanel result={peakForecast} title="峰值客流趋势预测" />
          </div>

          {/* 右侧：地图 + 详情 */}
          <div className="lg:col-span-2 space-y-3">
            {/* 客流热力地图 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                客流热力分布
              </h3>
              <PassengerFlowMap
                predictions={filteredPredictions}
                center={mapCenter}
                height="h-[400px]"
                onPredictionClick={setSelectedPrediction}
                selectedId={selectedPrediction?.id}
              />
            </div>
            {selectedPrediction ? (
              <div className="space-y-3">
                {/* 基础信息 */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">
                        {selectedPrediction.name}
                      </h2>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {selectedPrediction.city} · {LOCATION_TYPE_LABELS[selectedPrediction.locationType]}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                          {(selectedPrediction.dailyFlow / 10000).toFixed(1)}万
                        </div>
                        <div className="text-[9px] text-gray-500">日均客流</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {selectedPrediction.peakHour}:00
                        </div>
                        <div className="text-[9px] text-gray-500">峰值时段</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">峰值客流</div>
                      <div className="text-sm font-bold text-gray-800">
                        {selectedPrediction.peakFlow}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">工作日均值</div>
                      <div className="text-sm font-bold text-gray-800">
                        {selectedPrediction.weekdayAvg}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">周末均值</div>
                      <div className="text-sm font-bold text-gray-800">
                        {selectedPrediction.weekendAvg}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">预测置信度</div>
                      <div className="text-sm font-bold text-green-600">
                        {selectedPrediction.confidence}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* 24小时分布 */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-gray-800 mb-3">
                    24小时客流分布
                  </h3>
                  <div className="space-y-1.5">
                    {selectedPrediction.hourlyFlow.map((h) => (
                      <div key={h.hour} className="flex items-center gap-2">
                        <div className="w-10 text-[10px] text-gray-600 font-mono">
                          {h.hour.toString().padStart(2, "0")}:00
                        </div>
                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden relative">
                          <div
                            className="absolute left-0 top-0 h-full bg-gray-800 rounded-full"
                            style={{ width: `${(h.weekday / selectedPrediction.peakFlow) * 100}%` }}
                          />
                          <div
                            className="absolute left-0 top-0 h-1.5 bg-orange-500 rounded-full"
                            style={{ width: `${(h.weekend / selectedPrediction.peakFlow) * 100}%` }}
                          />
                        </div>
                        <div className="w-16 text-[9px] text-gray-500 text-right">
                          <span className="text-gray-700">{h.weekday}</span>
                          <span className="mx-0.5">/</span>
                          <span className="text-orange-600">{h.weekend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-3 pt-2 border-t border-gray-100 text-[9px]">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-2 bg-gray-800 rounded-sm" />
                      <span className="text-gray-500">工作日</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-1 bg-orange-500 rounded-sm" />
                      <span className="text-gray-500">周末</span>
                    </div>
                  </div>
                </div>

                {/* 影响因素 */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-gray-800 mb-3">
                    影响因素分析
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedPrediction.factors.map((factor, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 rounded-lg p-2.5 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-[11px] font-medium text-gray-800">
                            {factor.name}
                          </div>
                          <div className="text-[9px] text-gray-400">
                            {factor.category}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-800">
                            {factor.impact}%
                          </div>
                          <div className="text-[8px] text-gray-400">影响度</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8 flex items-center justify-center h-96">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">👥</div>
                  <p className="text-xs">请从左侧选择监测点查看详情</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          客流预测模拟器 — 科学预测客流，优化资源配置
        </div>
      </div>
    </div>
  );
}