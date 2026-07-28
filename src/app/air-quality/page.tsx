"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getAQICities,
  AQI_LEVELS,
  getAQITrend,
  type AQIStation,
  type AQILevel,
} from "@/lib/air-quality-data";

const AirQualityMap = dynamic(() => import("@/components/AirQualityMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

const POLLUTANTS = [
  { key: "pm25", label: "PM2.5", unit: "μg/m³", color: "#ef4444" },
  { key: "pm10", label: "PM10", unit: "μg/m³", color: "#f97316" },
  { key: "so2", label: "SO₂", unit: "μg/m³", color: "#eab308" },
  { key: "no2", label: "NO₂", unit: "μg/m³", color: "#8b5cf6" },
  { key: "co", label: "CO", unit: "mg/m³", color: "#6b7280" },
  { key: "o3", label: "O₃", unit: "μg/m³", color: "#06b6d4" },
];

export default function AirQualityPage() {
  const cities = getAQICities();
  const [cityId, setCityId] = useState(cities[0]?.id || "");
  const [selectedStation, setSelectedStation] = useState<AQIStation | null>(null);

  const currentCity = useMemo(
    () => cities.find((c) => c.id === cityId),
    [cityId, cities]
  );

  if (!currentCity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="text-gray-400">加载中...</span>
      </div>
    );
  }

  const avgLevel = Object.entries(AQI_LEVELS).find(
    ([, l]) => currentCity.avgAQI >= l.min && currentCity.avgAQI <= l.max
  )?.[1];

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
                  🌬️ 空气质量监测
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  呼吸的每一口空气都重要 — 实时空气质量分布
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={cityId}
                onChange={(e) => {
                  setCityId(e.target.value);
                  setSelectedStation(null);
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
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              城市：<b className="text-gray-800">{currentCity.name}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              监测点：<b className="text-gray-800">{currentCity.stations.length}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              首要污染物：<b className="text-orange-600">{currentCity.primaryPollutant}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              更新时间：<b className="text-gray-800">{currentCity.updateTime}</b>
            </span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* 左侧 */}
          <div className="lg:col-span-1 space-y-3">
            {/* 城市AQI大卡片 */}
            <div
              className="rounded-xl p-5 text-white"
              style={{ backgroundColor: avgLevel?.color || "#00e400" }}
            >
              <div className="text-xs opacity-80 mb-1">{currentCity.name}</div>
              <div className="text-5xl font-bold mb-1">{currentCity.avgAQI}</div>
              <div className="text-lg font-semibold mb-3">{avgLevel?.label}</div>
              <div className="text-[11px] opacity-80">
                首要污染物：{currentCity.primaryPollutant}
              </div>
              <div className="text-[10px] opacity-70 mt-1">
                更新于 {currentCity.updateTime}
              </div>
            </div>

            {/* 六项污染物 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-3">
                六项污染物
              </h3>
              <div className="space-y-2">
                {POLLUTANTS.map((p) => {
                  const station = selectedStation || currentCity.stations[0];
                  const value = station?.[p.key as keyof AQIStation] as number;
                  return (
                    <div key={p.key}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[11px] text-gray-600">{p.label}</span>
                        <span className="text-[11px] font-medium" style={{ color: p.color }}>
                          {value} {p.unit}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min((value / 200) * 100, 100)}%`,
                            backgroundColor: p.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 监测站列表 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                监测站点
              </h3>
              <div className="space-y-1 max-h-[350px] overflow-y-auto">
                {currentCity.stations
                  .sort((a, b) => a.aqi - b.aqi)
                  .map((s) => {
                    const level = AQI_LEVELS[s.level];
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelectedStation(s)}
                        className={`w-full text-left px-2 py-2 rounded-lg transition ${
                          selectedStation?.id === s.id
                            ? "bg-blue-50 border border-blue-200"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                            style={{ backgroundColor: level.color }}
                          >
                            {s.aqi}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] text-gray-700 truncate">
                              {s.name}
                            </div>
                            <div className="text-[9px] text-gray-400">
                              {level.label} · {getAQITrend(s.aqi, s.trend)}
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
              <AirQualityMap
                stations={currentCity.stations}
                center={currentCity.center}
                zoom={10}
                height="h-[600px]"
                onStationClick={setSelectedStation}
                selectedId={selectedStation?.id}
              />
            </div>

            {/* 选中站点详情 */}
            {selectedStation && (
              <div className="bg-white border border-gray-300 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold"
                      style={{ backgroundColor: AQI_LEVELS[selectedStation.level].color }}
                    >
                      {selectedStation.aqi}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        {selectedStation.name}
                      </h3>
                      <p className="text-[10px] text-gray-500">
                        {AQI_LEVELS[selectedStation.level].label} · {getAQITrend(selectedStation.aqi, selectedStation.trend)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStation(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {POLLUTANTS.map((p) => {
                    const value = selectedStation[p.key as keyof AQIStation] as number;
                    return (
                      <div key={p.key} className="bg-gray-50 rounded-lg p-2 text-center">
                        <div className="text-[9px] text-gray-400 mb-0.5">{p.label}</div>
                        <div className="text-sm font-bold" style={{ color: p.color }}>
                          {value}
                        </div>
                        <div className="text-[8px] text-gray-400">{p.unit}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 健康建议 */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-gray-800 mb-3">
                💡 健康建议（{avgLevel?.label}）
              </h3>
              <div className="text-[11px] text-gray-600 leading-relaxed space-y-1.5">
                {currentCity.avgAQI <= 50 && (
                  <>
                    <p>✅ 空气质量令人满意，基本无空气污染</p>
                    <p>🏃 各类人群可正常活动，建议户外活动</p>
                  </>
                )}
                {currentCity.avgAQI > 50 && currentCity.avgAQI <= 100 && (
                  <>
                    <p>✅ 空气质量可接受，某些污染物可能对极少数敏感人群有较弱影响</p>
                    <p>🏃 正常人群可正常户外活动，敏感人群适当减少户外剧烈运动</p>
                  </>
                )}
                {currentCity.avgAQI > 100 && currentCity.avgAQI <= 150 && (
                  <>
                    <p>⚠️ 敏感人群症状有轻度加剧，健康人群出现刺激症状</p>
                    <p>😷 儿童、老年人及心脏病、呼吸系统疾病患者减少长时间、高强度户外锻炼</p>
                    <p>👥 一般人群适量减少户外运动</p>
                  </>
                )}
                {currentCity.avgAQI > 150 && currentCity.avgAQI <= 200 && (
                  <>
                    <p>⚠️ 进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响</p>
                    <p>😷 儿童、老年人及心脏病、肺病患者应停留在室内，停止户外运动</p>
                    <p>👥 一般人群减少户外运动</p>
                  </>
                )}
                {currentCity.avgAQI > 200 && (
                  <>
                    <p>🚨 健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病</p>
                    <p>🏠 老年人和病人应当留在室内，避免体力消耗，一般人群应避免户外活动</p>
                    <p>😷 外出请佩戴N95级防护口罩</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          空气质量监测 — 实时空气品质，守护每一次呼吸
        </div>
      </div>
    </div>
  );
}
