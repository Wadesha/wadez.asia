"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getPOIsByCity,
  getCities,
  getCityCenter,
  getCityStats,
  generateHeatGrid,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type POICategory,
  type POI,
  type HeatGridCell,
} from "@/lib/poi-heat-data";
import { useRealPOIs, type RealPOI } from "@/lib/use-real-pois";
import { DataSourceToggle, type DataSource } from "@/components/DataSourceToggle";
import SmartRecommend from "@/components/SmartRecommend";
import { calibrateData } from "@/lib/multi-source-calibration";
import CalibrationInfo from "@/components/CalibrationInfo";
import { recordLineage } from "@/lib/data-lineage";
import LineagePanel from "@/components/LineagePanel";

const POIHeatMap = dynamic(() => import("@/components/POIHeatMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

type HeatMode = "heatmap" | "grid" | "points";

const MODE_LABELS: Record<HeatMode, string> = {
  heatmap: "热力图",
  grid: "网格聚合",
  points: "POI点",
};

const GRID_SIZES = [
  { label: "200m", value: 0.2 },
  { label: "500m", value: 0.5 },
  { label: "1km", value: 1 },
];

export default function POIHeatPage() {
  const cities = getCities();
  const [city, setCity] = useState<string>(cities[0]);
  const [mode, setMode] = useState<HeatMode>("heatmap");
  const [opacity, setOpacity] = useState(0.75);
  const [gridSize, setGridSize] = useState(0.5);
  const [selectedCategories, setSelectedCategories] = useState<POICategory[]>([]);
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareCity, setCompareCity] = useState<string>(cities[1] || cities[0]);
  const [dataSource, setDataSource] = useState<DataSource>("simulated");
  const [searchKeyword, setSearchKeyword] = useState("");

  const realPOIs = useRealPOIs();

  const cityCenter = getCityCenter(city);
  const compareCenter = getCityCenter(compareCity);

  const allCategories = useMemo(
    () => Object.keys(CATEGORY_LABELS) as POICategory[],
    []
  );

  // 真实数据触发搜索
  const handleRealSearch = () => {
    if (!searchKeyword.trim()) return;
    const categoryTypes = selectedCategories.length === 1
      ? CATEGORY_LABELS[selectedCategories[0]]
      : undefined;
    realPOIs.search({
      keywords: searchKeyword,
      city,
      types: categoryTypes,
    });
  };

  // 数据源切换处理
  const handleDataSourceChange = (source: DataSource) => {
    setDataSource(source);
    if (source === "real" && searchKeyword.trim()) {
      handleRealSearch();
    }
  };

  // 模拟数据
  const simulatedPOIs = useMemo(() => {
    let pois = getPOIsByCity(city);
    if (selectedCategories.length > 0) {
      pois = pois.filter((p) => selectedCategories.includes(p.category));
    }
    return pois;
  }, [city, selectedCategories]);

  // 真实数据转换为 POI 格式
  const realPOIsAdapted = useMemo<POI[]>(() => {
    return realPOIs.pois.map((rp: RealPOI) => ({
      id: rp.id,
      name: rp.name,
      category: "public-service" as POICategory,
      subCategory: rp.type || "其他",
      lng: rp.lng,
      lat: rp.lat,
      city: rp.city || city,
      address: rp.address,
    }));
  }, [realPOIs.pois, city]);

  // 当前使用的POI数据（根据数据源切换）
  const filteredPOIs = dataSource === "real" && realPOIs.isRealData
    ? realPOIsAdapted
    : simulatedPOIs;

  const comparePOIs = useMemo(() => {
    let pois = getPOIsByCity(compareCity);
    if (selectedCategories.length > 0) {
      pois = pois.filter((p) => selectedCategories.includes(p.category));
    }
    return pois;
  }, [compareCity, selectedCategories]);

  const gridCells = useMemo<HeatGridCell[]>(() => {
    if (mode !== "grid") return [];
    return generateHeatGrid(filteredPOIs, cityCenter[0], cityCenter[1], gridSize, 40);
  }, [mode, filteredPOIs, cityCenter, gridSize]);

  const compareGridCells = useMemo<HeatGridCell[]>(() => {
    if (mode !== "grid") return [];
    return generateHeatGrid(comparePOIs, compareCenter[0], compareCenter[1], gridSize, 40);
  }, [mode, comparePOIs, compareCenter, gridSize]);

  const stats = useMemo(() => getCityStats(city), [city]);
  const compareStats = useMemo(() => getCityStats(compareCity), [compareCity]);

  const toggleCategory = (cat: POICategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const selectAll = () => {
    setSelectedCategories(allCategories);
  };

  const clearAll = () => {
    setSelectedCategories([]);
  };

  const totalCount = Object.values(stats).reduce((a, b) => a + b, 0);
  const compareTotalCount = Object.values(compareStats).reduce((a, b) => a + b, 0);

  // 多源数据校准：以各分类的POI数量为源，对比模式下加入对比城市
  const poiCalibration = useMemo(() => {
    const sources = allCategories.map((cat) => ({
      sourceId: `${city}-${cat}`,
      sourceName: `${CATEGORY_LABELS[cat]}（${city}）`,
      value: stats[cat],
      timestamp: Date.now(),
      weight: 1,
    }));
    if (compareMode) {
      allCategories.forEach((cat) => {
        sources.push({
          sourceId: `${compareCity}-${cat}`,
          sourceName: `${CATEGORY_LABELS[cat]}（${compareCity}）`,
          value: compareStats[cat],
          timestamp: Date.now(),
          weight: 0.8,
        });
      });
    }
    return calibrateData(sources, { method: "mean", outlierThreshold: 2 });
  }, [allCategories, stats, compareMode, compareStats, city, compareCity]);

  // 数据血缘记录
  const poiLineage = useMemo(() => {
    return recordLineage(`poi-heat-${city}`, dataSource === "real" ? "高德API" : "模拟数据", [
      { stepId: "fetch", stepName: dataSource === "real" ? "API请求" : "生成模拟数据", timestamp: Date.now() },
      { stepId: "filter", stepName: "分类过滤", timestamp: Date.now() },
      { stepId: "grid", stepName: "网格聚合", timestamp: Date.now() },
    ], { dependencies: [city, compareCity] });
  }, [city, compareCity, dataSource]);

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
                  城市 POI 热力分布
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  兴趣点密度 = 城市活力的直观表达
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`px-3 py-1.5 text-xs rounded-md transition ${
                  compareMode
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {compareMode ? "关闭对比" : "双城市对比"}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              总POI <b className="text-gray-800">{filteredPOIs.length.toLocaleString()}</b> 个
            </span>
            <span className="text-gray-200">|</span>
            <span>
              分类 <b className="text-gray-800">{allCategories.length}</b> 类
            </span>
            <span className="text-gray-200">|</span>
            <span>
              当前城市 <b className="text-gray-800">{city}</b>
            </span>
            {compareMode && (
              <>
                <span className="text-gray-200">|</span>
                <span>
                  对比 <b className="text-gray-800">{compareCity}</b>{" "}
                  {compareTotalCount.toLocaleString()} 个
                </span>
              </>
            )}
          </div>
        </div>

        {/* 数据源切换 + 真实数据搜索 */}
        <DataSourceToggle
          source={dataSource}
          onChange={handleDataSourceChange}
          simulatedCount={simulatedPOIs.length}
          realDataCount={realPOIs.pois.length}
          loading={realPOIs.loading}
          error={realPOIs.error}
        />
        {dataSource === "real" && (
          <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRealSearch();
                }}
                placeholder="输入关键词（如：北京大学、星巴克、医院）后回车搜索"
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <button
                onClick={handleRealSearch}
                disabled={!searchKeyword.trim() || realPOIs.loading}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition"
              >
                {realPOIs.loading ? "搜索中..." : "搜索真实POI"}
              </button>
            </div>
            {realPOIs.isRealData && (
              <div className="mt-2 text-[10px] text-green-600">
                ✓ 已获取 {realPOIs.pois.length} 条真实POI数据（来源：高德API）
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                城市选择
              </h3>
              <div className="space-y-1.5">
                <div>
                  <div className="text-[10px] text-gray-400 mb-1">主城市</div>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                {compareMode && (
                  <div>
                    <div className="text-[10px] text-gray-400 mb-1">对比城市</div>
                    <select
                      value={compareCity}
                      onChange={(e) => setCompareCity(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
                    >
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-semibold text-gray-800">
                  显示模式
                </h3>
              </div>
              <div className="flex gap-1 mb-3">
                {(Object.keys(MODE_LABELS) as HeatMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 px-2 py-1.5 text-[10px] rounded-md transition ${
                      mode === m
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {MODE_LABELS[m]}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-gray-400">透明度</span>
                    <span className="text-[10px] text-gray-600">
                      {Math.round(opacity * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={opacity}
                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
                  />
                </div>

                {mode === "grid" && (
                  <div>
                    <div className="text-[10px] text-gray-400 mb-1">网格大小</div>
                    <div className="flex gap-1">
                      {GRID_SIZES.map((g) => (
                        <button
                          key={g.value}
                          onClick={() => setGridSize(g.value)}
                          className={`flex-1 px-2 py-1 text-[10px] rounded-md transition ${
                            gridSize === g.value
                              ? "bg-gray-800 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-semibold text-gray-800">
                  POI 分类
                </h3>
                <div className="flex gap-1">
                  <button
                    onClick={selectAll}
                    className="text-[10px] text-gray-500 hover:text-gray-700"
                  >
                    全选
                  </button>
                  <span className="text-[10px] text-gray-300">|</span>
                  <button
                    onClick={clearAll}
                    className="text-[10px] text-gray-500 hover:text-gray-700"
                  >
                    清空
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                {allCategories.map((cat) => {
                  const isSelected =
                    selectedCategories.length === 0 ||
                    selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 transition text-left"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                        style={{
                          backgroundColor: isSelected
                            ? CATEGORY_COLORS[cat]
                            : "#e5e7eb",
                        }}
                      />
                      <span className="text-[11px] text-gray-700 flex-1">
                        {CATEGORY_LABELS[cat]}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {stats[cat]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                分类占比
              </h3>
              <div className="space-y-2">
                {allCategories.map((cat) => {
                  const pct = totalCount > 0 ? (stats[cat] / totalCount) * 100 : 0;
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] text-gray-600">
                          {CATEGORY_LABELS[cat]}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {pct.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: CATEGORY_COLORS[cat],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <CalibrationInfo result={poiCalibration} title="POI数量校准" unit="个" />
            <LineagePanel lineage={poiLineage} title="数据血缘" />
          </div>

          <div className="lg:col-span-3 space-y-3">
            {compareMode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white border border-gray-200 rounded-xl p-2">
                  <div className="px-1 pb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-800">
                      {city}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {filteredPOIs.length} 个 POI
                    </span>
                  </div>
                  <POIHeatMap
                    pois={filteredPOIs}
                    center={cityCenter}
                    zoom={12}
                    height="h-[500px]"
                    mode={mode}
                    opacity={opacity}
                    gridCells={gridCells}
                    onPOIClick={(p) => setSelectedPOI(p)}
                  />
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-2">
                  <div className="px-1 pb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-800">
                      {compareCity}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {comparePOIs.length} 个 POI
                    </span>
                  </div>
                  <POIHeatMap
                    pois={comparePOIs}
                    center={compareCenter}
                    zoom={12}
                    height="h-[500px]"
                    mode={mode}
                    opacity={opacity}
                    gridCells={compareGridCells}
                    onPOIClick={(p) => setSelectedPOI(p)}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-2">
                <POIHeatMap
                  pois={filteredPOIs}
                  center={cityCenter}
                  zoom={12}
                  height="h-[600px]"
                  mode={mode}
                  opacity={opacity}
                  gridCells={gridCells}
                  onPOIClick={(p) => setSelectedPOI(p)}
                />
              </div>
            )}

            {selectedPOI && (
              <div className="bg-white border border-gray-300 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: CATEGORY_COLORS[selectedPOI.category] }}
                    />
                    <h3 className="text-sm font-semibold text-gray-800">
                      {selectedPOI.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedPOI(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-gray-400">分类：</span>
                    <span className="text-gray-700">
                      {CATEGORY_LABELS[selectedPOI.category]}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">子类别：</span>
                    <span className="text-gray-700">{selectedPOI.subCategory}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">城市：</span>
                    <span className="text-gray-700">{selectedPOI.city}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">评分：</span>
                    <span className="text-gray-700">
                      ⭐ {selectedPOI.rating?.toFixed(1)}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">地址：</span>
                    <span className="text-gray-700">{selectedPOI.address}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">坐标：</span>
                    <span className="text-gray-500 font-mono text-[10px]">
                      {selectedPOI.lng}, {selectedPOI.lat}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {compareMode && (
              <div className="bg-white border border-gray-200 rounded-xl p-3">
                <h3 className="text-xs font-semibold text-gray-800 mb-3">
                  两城对比
                </h3>
                <div className="space-y-2">
                  {allCategories.map((cat) => {
                    const cityPct =
                      totalCount > 0 ? (stats[cat] / totalCount) * 100 : 0;
                    const compPct =
                      compareTotalCount > 0
                        ? (compareStats[cat] / compareTotalCount) * 100
                        : 0;
                    return (
                      <div key={cat}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] text-gray-700">
                            {CATEGORY_LABELS[cat]}
                          </span>
                          <div className="flex items-center gap-2 text-[10px]">
                            <span className="text-gray-500">
                              {city} {stats[cat]}
                            </span>
                            <span className="text-gray-300">vs</span>
                            <span className="text-gray-500">
                              {compareStats[cat]} {compareCity}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex-1 h-2 bg-gray-100 rounded-l-full overflow-hidden flex justify-end">
                            <div
                              className="h-full rounded-l-full"
                              style={{
                                width: `${cityPct}%`,
                                backgroundColor: CATEGORY_COLORS[cat],
                              }}
                            />
                          </div>
                          <div
                            className="w-1 h-3 bg-gray-400 rounded-full"
                          />
                          <div className="flex-1 h-2 bg-gray-100 rounded-r-full overflow-hidden">
                            <div
                              className="h-full rounded-r-full"
                              style={{
                                width: `${compPct}%`,
                                backgroundColor: CATEGORY_COLORS[cat],
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <SmartRecommend />
        <div className="mt-6 text-center text-[10px] text-gray-400">
          POI 热力分布 — 密度与活力的城市心跳
        </div>
      </div>
    </div>
  );
}
