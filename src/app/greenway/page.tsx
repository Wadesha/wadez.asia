"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getGreenways,
  getStatusStats,
  GREENWAY_TYPE_LABELS,
  GREENWAY_TYPE_COLORS,
  STATUS_LABELS,
  STATUS_COLORS,
  type GreenwayType,
  type GreenwaySegment,
  type GreenwayNode,
} from "@/lib/greenway-data";
import { useRealAround, GREEN_TYPE_CODES } from "@/lib/use-real-around";
import { DataSourceToggle, type DataSource } from "@/components/DataSourceToggle";
import type { GreenwayColorMode } from "@/components/GreenwayMap";

const GreenwayMap = dynamic(() => import("@/components/GreenwayMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

const COLOR_MODES: { key: GreenwayColorMode; label: string }[] = [
  { key: "type", label: "按类型" },
  { key: "status", label: "按连通状态" },
  { key: "connectivity", label: "连通/断点" },
];

export default function GreenwayPage() {
  const greenways = getGreenways();
  const [greenwayId, setGreenwayId] = useState<string>(greenways[0]?.id || "");
  const [colorMode, setColorMode] = useState<GreenwayColorMode>("type");
  const [showBreakpoints, setShowBreakpoints] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState<GreenwaySegment | null>(null);
  const [selectedNode, setSelectedNode] = useState<GreenwayNode | null>(null);
  const [dataSource, setDataSource] = useState<DataSource>("simulated");
  const [locationInput, setLocationInput] = useState("116.397428,39.90923");
  const realGreens = useRealAround();

  const handleRealGreenSearch = () => {
    if (!locationInput.trim()) return;
    realGreens.search({
      location: locationInput.trim(),
      types: GREEN_TYPE_CODES,
      radius: 5000,
    });
  };

  const currentGreenway = useMemo(
    () => greenways.find((g) => g.id === greenwayId),
    [greenwayId, greenways]
  );

  const statusStats = useMemo(
    () => (currentGreenway ? getStatusStats(currentGreenway) : null),
    [currentGreenway]
  );

  if (!currentGreenway || !statusStats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="text-gray-400">加载中...</span>
      </div>
    );
  }

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
                  绿道与慢行系统
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  线性空间的连续性 = 城市慢行体验的质量
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={greenwayId}
                onChange={(e) => {
                  setGreenwayId(e.target.value);
                  setSelectedSegment(null);
                  setSelectedNode(null);
                }}
                className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
              >
                {greenways.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              类型：<b className="text-gray-800">{GREENWAY_TYPE_LABELS[currentGreenway.type]}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              总长 <b className="text-gray-800">{currentGreenway.totalLengthKm} km</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              连通度 <b className="text-gray-800">{currentGreenway.connectivityScore}%</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              α指数 <b className="text-gray-800">{currentGreenway.alphaIndex}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              β指数 <b className="text-gray-800">{currentGreenway.betaIndex}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              γ指数 <b className="text-gray-800">{currentGreenway.gammaIndex}</b>
            </span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <DataSourceToggle
          source={dataSource}
          onChange={setDataSource}
          simulatedCount={greenways.length}
          realDataCount={realGreens.pois.length}
          loading={realGreens.loading}
          error={realGreens.error}
          apiName="高德周边搜索API"
        />

        {dataSource === "real" ? (
          <RealGreenPanel
            realGreens={realGreens}
            locationInput={locationInput}
            setLocationInput={setLocationInput}
            onSearch={handleRealGreenSearch}
          />
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                连通度评分
              </h3>
              <div className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-400 to-green-500 text-center">
                <div className="text-3xl font-bold text-white">
                  {currentGreenway.connectivityScore}
                </div>
                <div className="text-xs text-white/80 mt-0.5">
                  综合连通得分
                </div>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                {currentGreenway.description}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                显示模式
              </h3>
              <div className="space-y-1">
                {COLOR_MODES.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setColorMode(m.key)}
                    className={`w-full text-left px-2 py-1.5 text-[11px] rounded-md transition ${
                      colorMode === m.key
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-[11px] text-gray-600">显示断点</span>
                  <input
                    type="checkbox"
                    checked={showBreakpoints}
                    onChange={(e) => setShowBreakpoints(e.target.checked)}
                    className="w-3.5 h-3.5 accent-red-500"
                  />
                </label>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                连通状态
              </h3>
              <div className="space-y-2">
                {(["connected", "partial", "broken"] as const).map((status) => {
                  const count = statusStats[status];
                  const total = currentGreenway.segments.length;
                  const pct = total > 0 ? (count / total) * 100 : 0;
                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: STATUS_COLORS[status] }}
                          />
                          <span className="text-[10px] text-gray-600">
                            {STATUS_LABELS[status]}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400">
                          {count} 段 ({pct.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: STATUS_COLORS[status],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                网络结构指数
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-gray-500">α 指数</span>
                    <span className="text-gray-700 font-medium">
                      {currentGreenway.alphaIndex}
                    </span>
                  </div>
                  <p className="text-[9px] text-gray-400">
                    环度：网络中环路数量与最大可能环路数之比
                  </p>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-gray-500">β 指数</span>
                    <span className="text-gray-700 font-medium">
                      {currentGreenway.betaIndex}
                    </span>
                  </div>
                  <p className="text-[9px] text-gray-400">
                    连接度：平均每个节点连接的路段数
                  </p>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-gray-500">γ 指数</span>
                    <span className="text-gray-700 font-medium">
                      {currentGreenway.gammaIndex}
                    </span>
                  </div>
                  <p className="text-[9px] text-gray-400">
                    连通度：实际连接数与最大可能连接数之比
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                绿道类型图例
              </h3>
              <div className="space-y-1.5">
                {(Object.entries(GREENWAY_TYPE_LABELS) as [GreenwayType, string][]).map(
                  ([type, label]) => (
                    <div key={type} className="flex items-center gap-2">
                      <div
                        className="h-1 rounded-full w-6"
                        style={{ backgroundColor: GREENWAY_TYPE_COLORS[type] }}
                      />
                      <span className="text-[10px] text-gray-600">{label}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-2">
              <GreenwayMap
                segments={currentGreenway.segments}
                nodes={currentGreenway.nodes}
                center={currentGreenway.type === "park-ring" || currentGreenway.type === "road-greenbelt"
                  ? currentGreenway.nodes[Math.floor(currentGreenway.nodes.length / 2)]
                    ? [
                        currentGreenway.nodes[Math.floor(currentGreenway.nodes.length / 2)].lng,
                        currentGreenway.nodes[Math.floor(currentGreenway.nodes.length / 2)].lat,
                      ]
                    : [0, 0]
                  : [
                      currentGreenway.segments[0]?.geometry[0]?.[0] || 0,
                      currentGreenway.segments[0]?.geometry[0]?.[1] || 0,
                    ]}
                zoom={14}
                height="h-[600px]"
                colorMode={colorMode}
                showBreakpoints={showBreakpoints}
                onSegmentClick={(s) => {
                  setSelectedSegment(s);
                  setSelectedNode(null);
                }}
                onNodeClick={(n) => {
                  setSelectedNode(n);
                  setSelectedSegment(null);
                }}
              />
            </div>

            {selectedSegment && (
              <div className="bg-white border border-gray-300 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {selectedSegment.name}
                  </h3>
                  <button
                    onClick={() => setSelectedSegment(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-gray-400">类型：</span>
                    <span className="text-gray-700">
                      {GREENWAY_TYPE_LABELS[selectedSegment.type as GreenwayType]}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">长度：</span>
                    <span className="text-gray-700">
                      {selectedSegment.lengthM} m
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">宽度：</span>
                    <span className="text-gray-700">
                      {selectedSegment.widthM} m
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">路面：</span>
                    <span className="text-gray-700">{selectedSegment.surface}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">连通状态：</span>
                    <span
                      className="font-medium"
                      style={{ color: STATUS_COLORS[selectedSegment.status] }}
                    >
                      {STATUS_LABELS[selectedSegment.status]}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selectedNode && (
              <div className="bg-white border border-gray-300 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {selectedNode.isBreakpoint ? "⚠️ 断点节点" : "连接节点"}
                  </h3>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-2 text-[11px]">
                  {selectedNode.breakReason && (
                    <div>
                      <span className="text-gray-400">断点原因：</span>
                      <span className="text-red-600">{selectedNode.breakReason}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-400">坐标：</span>
                    <span className="text-gray-500 font-mono text-[10px]">
                      {selectedNode.lng}, {selectedNode.lat}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-3">
                基本信息
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "总长度", value: `${currentGreenway.totalLengthKm} km` },
                  { label: "路段数", value: currentGreenway.segments.length },
                  { label: "节点数", value: currentGreenway.nodes.length },
                  { label: "覆盖率", value: `${currentGreenway.coveragePercent}%` },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-gray-800">{item.value}</div>
                    <div className="text-[9px] text-gray-500 mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}

        <div className="mt-6 text-center text-[10px] text-gray-400">
          绿道与慢行系统 — 线性空间的连通质量决定慢行体验
        </div>
      </div>
    </div>
  );
}

function RealGreenPanel({
  realGreens,
  locationInput,
  setLocationInput,
  onSearch,
}: {
  realGreens: ReturnType<typeof useRealAround>;
  locationInput: string;
  setLocationInput: (v: string) => void;
  onSearch: () => void;
}) {
  const { pois, loading, error, isRealData } = realGreens;

  return (
    <div className="space-y-3">
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-400 whitespace-nowrap">坐标 (lng,lat)</span>
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch();
            }}
            placeholder="如：116.397428,39.90923"
            className="flex-1 min-w-[200px] px-2.5 py-1 text-xs bg-gray-50 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300 font-mono"
          />
          <button
            onClick={onSearch}
            disabled={loading || !locationInput.trim()}
            className="px-3 py-1 text-xs bg-gray-900 text-white rounded-md hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? "搜索中..." : "搜索周边绿地"}
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-1.5 leading-relaxed">
          搜索半径 5km，类型：公园广场（高德 typecode 110101）。输入经纬度坐标后回车或点击按钮搜索。
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="text-gray-400">状态：</span>
          {loading && (
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
              查询中...
            </span>
          )}
          {error && (
            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">
              ⚠ {error}
            </span>
          )}
          {isRealData && !loading && !error && (
            <span className="px-2 py-0.5 rounded bg-green-50 text-green-600 border border-green-200">
              ✓ 真实数据 {pois.length} 条
            </span>
          )}
          {!loading && !error && !isRealData && (
            <span className="text-gray-400">尚未查询</span>
          )}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
        <p className="text-[11px] text-amber-700 leading-relaxed">
          ⓘ 说明：此处返回的是真实<b>公园/广场点状 POI</b>（高德数据）。真实<b>绿道路径线</b>（如滨河绿道、慢行道线型）需接入 OpenStreetMap 数据，当前未集成。
        </p>
      </div>

      {pois.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-semibold text-gray-800">
              周边绿地 POI
            </h3>
            <span className="text-[10px] text-gray-400">{pois.length} 条</span>
          </div>
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
            {pois.map((poi) => (
              <div
                key={poi.id}
                className="border border-gray-100 rounded-lg p-2 hover:bg-gray-50 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-900 truncate">
                      {poi.name}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-0.5 truncate">
                      {poi.type || "公园广场"}
                    </div>
                    {poi.address && (
                      <div className="text-[10px] text-gray-400 mt-0.5 truncate">
                        📍 {poi.address}
                      </div>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] text-gray-400">距离</div>
                    <div className="text-xs text-gray-700 font-medium">
                      {poi.distance >= 1000
                        ? `${(poi.distance / 1000).toFixed(1)} km`
                        : `${poi.distance} m`}
                    </div>
                  </div>
                </div>
                <div className="text-[9px] text-gray-400 font-mono mt-1">
                  {poi.lng.toFixed(6)}, {poi.lat.toFixed(6)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
