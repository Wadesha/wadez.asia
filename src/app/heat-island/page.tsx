"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  getHeatIslandCities,
  getCities,
  HEAT_LEVEL_LABELS,
  HEAT_LEVEL_COLORS,
  ZONE_TYPE_LABELS,
  type HeatZone,
  type HeatLevel,
  type ZoneType,
} from "@/lib/heat-island-data";

export default function HeatIslandPage() {
  const cities = getHeatIslandCities();
  const cityNames = getCities();
  const [cityId, setCityId] = useState(cities[0]?.id || "");
  const [levelFilter, setLevelFilter] = useState<HeatLevel | "all">("all");
  const [typeFilter, setTypeFilter] = useState<ZoneType | "all">("all");
  const [selectedZone, setSelectedZone] = useState<HeatZone | null>(null);

  const currentCity = useMemo(
    () => cities.find((c) => c.id === cityId),
    [cities, cityId]
  );

  const filteredZones = useMemo(() => {
    if (!currentCity) return [];
    return currentCity.zones.filter(
      (z) => (levelFilter === "all" || z.level === levelFilter) && (typeFilter === "all" || z.type === typeFilter)
    );
  }, [currentCity, levelFilter, typeFilter]);

  const stats = useMemo(() => {
    if (!currentCity) return { avgTemp: 0, avgIntensity: 0, highCount: 0, lowCount: 0 };
    const avgTemp = currentCity.avgTemperature;
    const avgIntensity = currentCity.avgHeatIslandIntensity;
    const highCount = currentCity.zones.filter((z) => z.level === "high" || z.level === "extreme").length;
    const lowCount = currentCity.zones.filter((z) => z.level === "low").length;
    return { avgTemp, avgIntensity, highCount, lowCount };
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
                  🌡️ 城市热岛效应
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  温度分布 · 热岛强度 · 影响因素 · 缓解建议
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={cityId}
                onChange={(e) => {
                  setCityId(e.target.value);
                  setSelectedZone(null);
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
              平均温度：<b className="text-gray-800">{stats.avgTemp}°C</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              平均热岛强度：<b className="text-orange-600">{stats.avgIntensity}°C</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              高温区：<b className="text-red-600">{stats.highCount}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              低温区：<b className="text-blue-600">{stats.lowCount}</b>
            </span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* 左侧：筛选和列表 */}
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2">筛选</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] text-gray-500 mb-1 block">热岛强度</label>
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value as HeatLevel | "all")}
                    className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md text-gray-700"
                  >
                    <option value="all">全部强度</option>
                    {(Object.keys(HEAT_LEVEL_LABELS) as HeatLevel[]).map((l) => (
                      <option key={l} value={l}>
                        {HEAT_LEVEL_LABELS[l]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 mb-1 block">区域类型</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as ZoneType | "all")}
                    className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md text-gray-700"
                  >
                    <option value="all">全部类型</option>
                    {(Object.keys(ZONE_TYPE_LABELS) as ZoneType[]).map((t) => (
                      <option key={t} value={t}>
                        {ZONE_TYPE_LABELS[t]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                监测区域
              </h3>
              <div className="space-y-1.5 max-h-[450px] overflow-y-auto">
                {filteredZones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition ${
                      selectedZone?.id === zone.id
                        ? "bg-gray-100 border border-gray-300"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-medium text-gray-800">
                        {zone.name}
                      </span>
                      <span
                        className="px-1.5 py-0.5 rounded text-[9px] font-medium text-white"
                        style={{ backgroundColor: HEAT_LEVEL_COLORS[zone.level] }}
                      >
                        {HEAT_LEVEL_LABELS[zone.level]}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500">
                      <span>
                        温度 <b className="text-gray-700">{zone.temperature}°C</b>
                      </span>
                      <span>
                        强度 <b className="text-orange-600">{zone.heatIslandIntensity}°C</b>
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：详情 */}
          <div className="lg:col-span-2">
            {selectedZone ? (
              <div className="space-y-3">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">
                        {selectedZone.name}
                      </h2>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {ZONE_TYPE_LABELS[selectedZone.type]} · {HEAT_LEVEL_LABELS[selectedZone.level]}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                          {selectedZone.temperature}
                        </div>
                        <div className="text-[9px] text-gray-500">温度 °C</div>
                      </div>
                      <div className="text-center">
                        <div
                          className="text-2xl font-bold"
                          style={{ color: HEAT_LEVEL_COLORS[selectedZone.level] }}
                        >
                          {selectedZone.heatIslandIntensity}
                        </div>
                        <div className="text-[9px] text-gray-500">热岛强度 °C</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">区域面积</div>
                      <div className="text-sm font-bold text-gray-800">
                        {selectedZone.area}
                        <span className="text-[9px] ml-1">公顷</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">绿化率</div>
                      <div className="text-sm font-bold text-green-600">
                        {selectedZone.factors.greenCoverRate}%
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">建筑密度</div>
                      <div className="text-sm font-bold text-gray-800">
                        {selectedZone.factors.buildingDensity}%
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">缓解评分</div>
                      <div className="text-sm font-bold text-blue-600">
                        {selectedZone.mitigationScore}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-gray-800 mb-3">
                    影响因素
                  </h3>
                  <div className="space-y-2.5">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-gray-600">绿化覆盖率</span>
                        <span className="text-[11px] font-medium text-green-600">
                          {selectedZone.factors.greenCoverRate}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${selectedZone.factors.greenCoverRate}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-gray-600">建筑密度</span>
                        <span className="text-[11px] font-medium text-red-600">
                          {selectedZone.factors.buildingDensity}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${selectedZone.factors.buildingDensity}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-gray-600">交通密度</span>
                        <span className="text-[11px] font-medium text-orange-600">
                          {selectedZone.factors.trafficDensity}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: `${selectedZone.factors.trafficDensity}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-gray-600">水体邻近度</span>
                        <span className="text-[11px] font-medium text-blue-600">
                          {selectedZone.factors.waterProximity}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${selectedZone.factors.waterProximity}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <h3 className="text-xs font-semibold text-blue-800 mb-2">
                    💡 缓解建议
                  </h3>
                  <ul className="space-y-1">
                    {currentCity.mitigationStrategies.map((s, i) => (
                      <li key={i} className="text-[11px] text-blue-700">
                        · {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8 flex items-center justify-center h-96">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">🌡️</div>
                  <p className="text-xs">请从左侧选择区域查看详情</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          城市热岛效应监测 — 科学评估热岛强度，制定缓解策略
        </div>
      </div>
    </div>
  );
}