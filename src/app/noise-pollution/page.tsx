"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getNoiseCities,
  NOISE_LEVEL_LABELS,
  NOISE_LEVEL_COLORS,
  NOISE_LEVEL_RANGES,
  NOISE_SOURCE_LABELS,
  type NoiseMonitor,
  type NoiseLevel,
} from "@/lib/noise-pollution-data";
import { detectAnomalies } from "@/lib/anomaly-detector";
import AnomalyPanel from "@/components/AnomalyPanel";
import { calculateDataQuality } from "@/lib/data-quality";
import QualityBadge from "@/components/QualityBadge";
import { checkDataFreshness } from "@/lib/auto-update";
import DataUpdateBanner from "@/components/DataUpdateBanner";

const NoisePollutionMap = dynamic(() => import("@/components/NoisePollutionMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

export default function NoisePollutionPage() {
  const cities = getNoiseCities();
  const [cityId, setCityId] = useState(cities[0]?.id || "");
  const [levelFilter, setLevelFilter] = useState<NoiseLevel | "all">("all");
  const [selectedMonitor, setSelectedMonitor] = useState<NoiseMonitor | null>(null);

  const currentCity = useMemo(
    () => cities.find((c) => c.id === cityId),
    [cities, cityId]
  );

  const quality = useMemo(() => {
    if (!currentCity) return null;
    return calculateDataQuality({
      dataSource: "simulated",
      recordCount: currentCity.monitors.length,
    });
  }, [currentCity]);

  const freshness = useMemo(() => {
    if (!currentCity) return null;
    return checkDataFreshness(undefined, "simulated");
  }, [currentCity]);

  const filteredMonitors = useMemo(() => {
    if (!currentCity) return [];
    return currentCity.monitors.filter(
      (m) => levelFilter === "all" || m.level === levelFilter
    );
  }, [currentCity, levelFilter]);

  const stats = useMemo(() => {
    if (!currentCity) return { avgDb: 0, harmful: 0, affected: 0 };
    const avgDb = currentCity.avgDecibel;
    const harmful = currentCity.monitors.filter(
      (m) => m.level === "very-loud" || m.level === "harmful"
    ).length;
    const affected = currentCity.monitors.reduce((s, m) => s + m.affectedPopulation, 0);
    return { avgDb, harmful, affected };
  }, [currentCity]);

  const noiseAnomalies = useMemo(() => {
    if (!currentCity) return { anomalies: [], total: 0, criticalCount: 0, method: "std" as const };
    return detectAnomalies(
      currentCity.monitors.map((m) => ({ id: m.id, name: m.name, value: m.decibel })),
      { threshold: 1.5, method: "std", anomalyType: "noise" }
    );
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
                href="/air-quality"
                className="text-xs text-gray-400 hover:text-gray-600 transition"
              >
                ← 空气质量
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  🔊 噪声污染地图
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  噪声监测点 · 分贝分布 · 污染等级 · 影响范围
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={cityId}
                onChange={(e) => {
                  setCityId(e.target.value);
                  setSelectedMonitor(null);
                }}
                className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
              >
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value as NoiseLevel | "all")}
                className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
              >
                <option value="all">全部等级</option>
                {(Object.keys(NOISE_LEVEL_LABELS) as NoiseLevel[]).map((l) => (
                  <option key={l} value={l}>
                    {NOISE_LEVEL_LABELS[l]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {freshness && <DataUpdateBanner result={freshness} className="mb-2" />}
          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              监测点：<b className="text-gray-800">{filteredMonitors.length}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              平均分贝：<b className="text-gray-800">{stats.avgDb} dB</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              高噪点：<b className="text-red-600">{stats.harmful}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              影响人口：<b className="text-orange-600">{(stats.affected / 10000).toFixed(1)}万</b>
            </span>
            <span className="ml-auto flex items-center gap-2">
              {quality && <QualityBadge quality={quality} />}
              <span className="text-gray-400">v1.0.0</span>
            </span>
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
                {filteredMonitors.map((monitor) => (
                  <button
                    key={monitor.id}
                    onClick={() => setSelectedMonitor(monitor)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition ${
                      selectedMonitor?.id === monitor.id
                        ? "bg-gray-100 border border-gray-300"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-medium text-gray-800">
                        {monitor.name}
                      </span>
                      <span
                        className="px-1.5 py-0.5 rounded text-[9px] font-medium text-white"
                        style={{ backgroundColor: NOISE_LEVEL_COLORS[monitor.level] }}
                      >
                        {monitor.decibel} dB
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500">
                      <span>
                        峰值 <b className="text-gray-700">{monitor.peakDecibel} dB</b>
                      </span>
                      <span>
                        {monitor.trend === "rising" ? "↑" : monitor.trend === "falling" ? "↓" : "→"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <AnomalyPanel result={noiseAnomalies} title="噪声异常检测" unit="dB" />
          </div>

          {/* 右侧：地图 + 详情 */}
          <div className="lg:col-span-2 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-2">
              <NoisePollutionMap
                monitors={filteredMonitors}
                center={currentCity.center}
                zoom={11}
                height="h-[400px]"
                onMonitorClick={setSelectedMonitor}
                selectedId={selectedMonitor?.id}
              />
            </div>
            {selectedMonitor ? (
              <div className="space-y-3">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">
                        {selectedMonitor.name}
                      </h2>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {selectedMonitor.city} · {NOISE_LEVEL_LABELS[selectedMonitor.level]}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div
                          className="text-3xl font-bold"
                          style={{ color: NOISE_LEVEL_COLORS[selectedMonitor.level] }}
                        >
                          {selectedMonitor.decibel}
                        </div>
                        <div className="text-[9px] text-gray-500">dB</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">峰值分贝</div>
                      <div className="text-sm font-bold text-gray-800">
                        {selectedMonitor.peakDecibel}
                        <span className="text-[9px] ml-1">dB</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">峰值时段</div>
                      <div className="text-sm font-bold text-gray-800">
                        {selectedMonitor.peakHour}:00
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">影响面积</div>
                      <div className="text-sm font-bold text-gray-800">
                        {selectedMonitor.affectedArea}
                        <span className="text-[9px] ml-1">公顷</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">影响人口</div>
                      <div className="text-sm font-bold text-gray-800">
                        {(selectedMonitor.affectedPopulation / 1000).toFixed(0)}k
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-gray-800 mb-3">
                    噪声来源
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMonitor.sources.map((source, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-[11px]"
                      >
                        {NOISE_SOURCE_LABELS[source]}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-gray-800 mb-3">
                    噪声等级标准
                  </h3>
                  <div className="space-y-2">
                    {(Object.keys(NOISE_LEVEL_LABELS) as NoiseLevel[]).map((level) => (
                      <div
                        key={level}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          selectedMonitor.level === level ? "bg-gray-100" : ""
                        }`}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: NOISE_LEVEL_COLORS[level] }}
                        />
                        <span className="text-[11px] font-medium text-gray-800">
                          {NOISE_LEVEL_LABELS[level]}
                        </span>
                        <span className="text-[10px] text-gray-500 ml-auto">
                          {NOISE_LEVEL_RANGES[level].min}-{NOISE_LEVEL_RANGES[level].max} dB
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8 flex items-center justify-center h-96">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">🔊</div>
                  <p className="text-xs">请从左侧选择监测点查看详情</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          噪声污染地图 — 实时监测噪声，守护城市安宁
        </div>
      </div>
    </div>
  );
}