"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getBuildingAreas,
  getAreaStats,
  FUNCTION_LABELS,
  FUNCTION_COLORS,
  ERA_LABELS,
  type Building,
  type BuildingFunction,
} from "@/lib/building-morphology-data";
import type { ColorMode, ViewMode } from "@/components/BuildingMap";
import {
  useRealAround,
  BUILDING_TYPE_CODES,
} from "@/lib/use-real-around";
import { DataSourceToggle, type DataSource } from "@/components/DataSourceToggle";

const BuildingMap = dynamic(() => import("@/components/BuildingMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

const COLOR_MODE_LABELS: Record<ColorMode, string> = {
  height: "按高度",
  function: "按功能",
  era: "按年代",
};

const VIEW_MODE_LABELS: Record<ViewMode, string> = {
  top: "俯视",
  perspective: "斜视3D",
};

export default function BuildingMorphologyPage() {
  const areas = getBuildingAreas();
  const [areaId, setAreaId] = useState<string>(areas[0]?.id || "");
  const [colorMode, setColorMode] = useState<ColorMode>("height");
  const [viewMode, setViewMode] = useState<ViewMode>("perspective");
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareAreaId, setCompareAreaId] = useState<string>(
    areas[1]?.id || ""
  );
  const [dataSource, setDataSource] = useState<DataSource>("simulated");
  const [locationInput, setLocationInput] = useState<string>("");
  const realBuildings = useRealAround();

  const currentArea = useMemo(
    () => areas.find((a) => a.id === areaId),
    [areaId, areas]
  );
  const compareArea = useMemo(
    () => areas.find((a) => a.id === compareAreaId),
    [compareAreaId, areas]
  );

  const stats = useMemo(
    () => (currentArea ? getAreaStats(currentArea) : null),
    [currentArea]
  );
  const compareStats = useMemo(
    () => (compareArea ? getAreaStats(compareArea) : null),
    [compareArea]
  );

  const allFunctions = useMemo(
    () => Object.keys(FUNCTION_LABELS) as BuildingFunction[],
    []
  );

  // 真实数据：以当前区域中心作为默认搜索坐标 "lng,lat"
  const cityCenter = currentArea
    ? `${currentArea.center[0]},${currentArea.center[1]}`
    : "";

  const handleSearchRealBuildings = () => {
    const loc = locationInput.trim() || cityCenter;
    if (!loc) return;
    realBuildings.search({
      location: loc,
      types: BUILDING_TYPE_CODES,
      radius: 3000,
    });
  };

  if (!currentArea || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="text-gray-400">加载中...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <DataSourceToggle
          source={dataSource}
          onChange={setDataSource}
          realDataCount={realBuildings.pois.length}
          simulatedCount={stats.totalCount}
          loading={realBuildings.loading}
          error={realBuildings.error}
          apiName="高德API"
        />

        {dataSource === "real" ? (
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                周边建筑搜索
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder={`坐标 (lng,lat)，默认当前区域中心：${cityCenter}`}
                  className="flex-1 px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
                />
                <button
                  onClick={handleSearchRealBuildings}
                  disabled={realBuildings.loading}
                  className="px-3 py-1.5 text-xs rounded-md bg-gray-900 text-white hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {realBuildings.loading ? "搜索中..." : "搜索周边建筑"}
                </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                以当前区域（{currentArea.name}）中心为基点，搜索半径 3km 内的商务住宅类 POI。
              </p>

              <div className="flex items-center gap-2 mt-2.5">
                {realBuildings.loading && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
                    查询中...
                  </span>
                )}
                {!realBuildings.loading && realBuildings.error && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">
                    ⚠ {realBuildings.error}
                  </span>
                )}
                {!realBuildings.loading &&
                  !realBuildings.error &&
                  realBuildings.isRealData && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-green-50 text-green-600 border border-green-200">
                      ✓ 共 {realBuildings.pois.length} 条真实建筑 POI
                    </span>
                  )}
                {!realBuildings.loading &&
                  !realBuildings.error &&
                  !realBuildings.isRealData && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-gray-50 text-gray-500 border border-gray-200">
                      尚未查询，点击按钮获取真实数据
                    </span>
                  )}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                真实建筑 POI 列表
              </h3>
              {realBuildings.pois.length === 0 ? (
                <div className="text-[11px] text-gray-400 py-6 text-center">
                  暂无数据，请点击“搜索周边建筑”。
                </div>
              ) : (
                <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
                  {realBuildings.pois.map((poi) => (
                    <div
                      key={poi.id}
                      className="border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-medium text-gray-800 truncate">
                          {poi.name}
                        </span>
                        <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">
                          {(poi.distance / 1000).toFixed(2)} km
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                          {poi.type || "未分类"}
                        </span>
                        <span className="truncate">
                          {poi.address || "无地址信息"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
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
                  城市建筑形态图谱
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  高度与密度塑造的城市天际线性格
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
                {compareMode ? "关闭对比" : "双区域对比"}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              建筑 <b className="text-gray-800">{stats.totalCount}</b> 栋
            </span>
            <span className="text-gray-200">|</span>
            <span>
              平均高度 <b className="text-gray-800">{stats.avgHeight} m</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              最高 <b className="text-gray-800">{stats.maxHeight} m</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              容积率 <b className="text-gray-800">{stats.floorAreaRatio}</b>
            </span>
            {compareMode && compareArea && compareStats && (
              <>
                <span className="text-gray-200">|</span>
                <span>
                  对比：{compareArea.name} {compareStats.totalCount} 栋
                </span>
              </>
            )}
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                区域选择
              </h3>
              <div className="space-y-1.5">
                <div>
                  <div className="text-[10px] text-gray-400 mb-1">主区域</div>
                  <select
                    value={areaId}
                    onChange={(e) => setAreaId(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
                  >
                    {areas.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
                {compareMode && (
                  <div>
                    <div className="text-[10px] text-gray-400 mb-1">对比区域</div>
                    <select
                      value={compareAreaId}
                      onChange={(e) => setCompareAreaId(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
                    >
                      {areas.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                {currentArea.description}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                视图控制
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-[10px] text-gray-400 mb-1">视角</div>
                  <div className="flex gap-1">
                    {(Object.keys(VIEW_MODE_LABELS) as ViewMode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setViewMode(m)}
                        className={`flex-1 px-2 py-1.5 text-[10px] rounded-md transition ${
                          viewMode === m
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {VIEW_MODE_LABELS[m]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-gray-400 mb-1">配色</div>
                  <div className="flex gap-1">
                    {(Object.keys(COLOR_MODE_LABELS) as ColorMode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setColorMode(m)}
                        className={`flex-1 px-2 py-1.5 text-[10px] rounded-md transition ${
                          colorMode === m
                            ? "bg-gray-800 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {COLOR_MODE_LABELS[m]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                核心指标
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-[9px] text-gray-400">建筑数量</div>
                  <div className="text-base font-bold text-gray-800">
                    {stats.totalCount}
                    <span className="text-[9px] font-normal text-gray-500 ml-1">
                      栋
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-[9px] text-gray-400">平均高度</div>
                  <div className="text-base font-bold text-gray-800">
                    {stats.avgHeight}
                    <span className="text-[9px] font-normal text-gray-500 ml-1">
                      m
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-[9px] text-gray-400">最高建筑</div>
                  <div className="text-base font-bold text-gray-800">
                    {stats.maxHeight}
                    <span className="text-[9px] font-normal text-gray-500 ml-1">
                      m
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-[9px] text-gray-400">容积率</div>
                  <div className="text-base font-bold text-gray-800">
                    {stats.floorAreaRatio}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                高度分布
              </h3>
              <div className="space-y-2">
                {[
                  { label: "低层 (≤12m)", key: "low", color: "#34d399" },
                  { label: "多层 (12-50m)", key: "mid", color: "#fbbf24" },
                  { label: "高层 (50-150m)", key: "high", color: "#f97316" },
                  { label: "超高层 (>150m)", key: "super", color: "#ef4444" },
                ].map((item) => {
                  const count =
                    stats.heightDistribution[
                      item.key as keyof typeof stats.heightDistribution
                    ];
                  const pct = stats.totalCount
                    ? (count / stats.totalCount) * 100
                    : 0;
                  return (
                    <div key={item.key}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] text-gray-600">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {count} 栋 ({pct.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                功能构成
              </h3>
              <div className="space-y-1.5">
                {allFunctions.map((func) => {
                  const count = stats.functionDistribution[func];
                  if (count === 0) return null;
                  const pct = stats.totalCount
                    ? (count / stats.totalCount) * 100
                    : 0;
                  return (
                    <div key={func} className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                        style={{ backgroundColor: FUNCTION_COLORS[func] }}
                      />
                      <span className="text-[10px] text-gray-600 flex-1">
                        {FUNCTION_LABELS[func]}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {pct.toFixed(1)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            {compareMode && compareArea ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white border border-gray-200 rounded-xl p-2">
                  <div className="px-1 pb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-800">
                      {currentArea.name}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {stats.totalCount} 栋
                    </span>
                  </div>
                  <BuildingMap
                    buildings={currentArea.buildings}
                    center={currentArea.center}
                    zoom={16}
                    height="h-[500px]"
                    colorMode={colorMode}
                    viewMode={viewMode}
                    onBuildingClick={(b) => setSelectedBuilding(b)}
                  />
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-2">
                  <div className="px-1 pb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-800">
                      {compareArea.name}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {compareStats?.totalCount} 栋
                    </span>
                  </div>
                  <BuildingMap
                    buildings={compareArea.buildings}
                    center={compareArea.center}
                    zoom={16}
                    height="h-[500px]"
                    colorMode={colorMode}
                    viewMode={viewMode}
                    onBuildingClick={(b) => setSelectedBuilding(b)}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-2">
                <BuildingMap
                  buildings={currentArea.buildings}
                  center={currentArea.center}
                  zoom={16}
                  height="h-[600px]"
                  colorMode={colorMode}
                  viewMode={viewMode}
                  onBuildingClick={(b) => setSelectedBuilding(b)}
                />
              </div>
            )}

            {selectedBuilding && (
              <div className="bg-white border border-gray-300 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {selectedBuilding.name || "建筑详情"}
                  </h3>
                  <button
                    onClick={() => setSelectedBuilding(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-gray-400">高度：</span>
                    <span className="text-gray-700 font-medium">
                      {selectedBuilding.heightM} 米
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">层数：</span>
                    <span className="text-gray-700 font-medium">
                      {selectedBuilding.floors} 层
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">功能：</span>
                    <span className="text-gray-700">
                      {FUNCTION_LABELS[selectedBuilding.function as BuildingFunction]}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">年代：</span>
                    <span className="text-gray-700">
                      {ERA_LABELS[selectedBuilding.era]}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">底面积：</span>
                    <span className="text-gray-700">
                      {selectedBuilding.footprintM2.toLocaleString()} m²
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">建筑面积：</span>
                    <span className="text-gray-700">
                      {(
                        selectedBuilding.footprintM2 * selectedBuilding.floors
                      ).toLocaleString()}{" "}
                      m²
                    </span>
                  </div>
                </div>
              </div>
            )}

            {compareMode && compareArea && compareStats && (
              <div className="bg-white border border-gray-200 rounded-xl p-3">
                <h3 className="text-xs font-semibold text-gray-800 mb-3">
                  指标对比
                </h3>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[
                    { label: "建筑数量", a: stats.totalCount, b: compareStats.totalCount, unit: "栋" },
                    { label: "平均高度", a: stats.avgHeight, b: compareStats.avgHeight, unit: "m" },
                    { label: "最高建筑", a: stats.maxHeight, b: compareStats.maxHeight, unit: "m" },
                    { label: "容积率", a: stats.floorAreaRatio, b: compareStats.floorAreaRatio, unit: "" },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="text-[9px] text-gray-400 mb-1">{item.label}</div>
                      <div className="text-[10px] text-gray-500">
                        {item.a}{item.unit} ↔ {item.b}{item.unit}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {allFunctions.map((func) => {
                    const aCount = stats.functionDistribution[func];
                    const bCount = compareStats.functionDistribution[func];
                    if (aCount === 0 && bCount === 0) return null;
                    const aPct = stats.totalCount
                      ? (aCount / stats.totalCount) * 100
                      : 0;
                    const bPct = compareStats.totalCount
                      ? (bCount / compareStats.totalCount) * 100
                      : 0;
                    return (
                      <div key={func}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <div
                              className="w-2 h-2 rounded-sm"
                              style={{ backgroundColor: FUNCTION_COLORS[func] }}
                            />
                            <span className="text-[10px] text-gray-600">
                              {FUNCTION_LABELS[func]}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px]">
                            <span className="text-gray-500">
                              {currentArea.name.slice(-3)} {aPct.toFixed(1)}%
                            </span>
                            <span className="text-gray-300">vs</span>
                            <span className="text-gray-500">
                              {bPct.toFixed(1)}% {compareArea.name.slice(-3)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex-1 h-2 bg-gray-100 rounded-l-full overflow-hidden flex justify-end">
                            <div
                              className="h-full rounded-l-full"
                              style={{
                                width: `${aPct}%`,
                                backgroundColor: FUNCTION_COLORS[func],
                              }}
                            />
                          </div>
                          <div className="w-1 h-3 bg-gray-400 rounded-full" />
                          <div className="flex-1 h-2 bg-gray-100 rounded-r-full overflow-hidden">
                            <div
                              className="h-full rounded-r-full"
                              style={{
                                width: `${bPct}%`,
                                backgroundColor: FUNCTION_COLORS[func],
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

        <div className="mt-6 text-center text-[10px] text-gray-400">
          建筑形态图谱 — 从三维视角解读城市的物质形态
        </div>
          </>
        )}
      </div>
    </div>
  );
}
