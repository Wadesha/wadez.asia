"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getStreetNetworkAreas,
  getNetworkStats,
  METRIC_LABELS,
  METRIC_DESCRIPTIONS,
  ROAD_CLASS_LABELS,
  type NetworkMetric,
  type StreetEdge,
  type StreetNode,
} from "@/lib/street-network-data";

const StreetNetworkMap = dynamic(() => import("@/components/StreetNetworkMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

const PATTERN_LABELS: Record<string, string> = {
  grid: "方格路网",
  organic: "有机肌理",
  radial: "放射状",
  tree: "树形结构",
};

export default function StreetSyntaxPage() {
  const areas = getStreetNetworkAreas();
  const [areaId, setAreaId] = useState<string>(areas[0]?.id || "");
  const [metric, setMetric] = useState<NetworkMetric>("betweenness");
  const [showNodes, setShowNodes] = useState(false);
  const [selectedEdge, setSelectedEdge] = useState<StreetEdge | null>(null);
  const [selectedNode, setSelectedNode] = useState<StreetNode | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareAreaId, setCompareAreaId] = useState<string>(
    areas[1]?.id || ""
  );

  const currentArea = useMemo(
    () => areas.find((a) => a.id === areaId),
    [areaId, areas]
  );
  const compareArea = useMemo(
    () => areas.find((a) => a.id === compareAreaId),
    [compareAreaId, areas]
  );

  const stats = useMemo(
    () => (currentArea ? getNetworkStats(currentArea, metric) : null),
    [currentArea, metric]
  );
  const compareStats = useMemo(
    () => (compareArea ? getNetworkStats(compareArea, metric) : null),
    [compareArea, metric]
  );

  const allMetrics = useMemo(
    () => Object.keys(METRIC_LABELS) as NetworkMetric[],
    []
  );

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
                  街道网络句法
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  用图论指标解码城市的隐性逻辑
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
              路口 <b className="text-gray-800">{stats.nodeCount}</b> 个
            </span>
            <span className="text-gray-200">|</span>
            <span>
              路段 <b className="text-gray-800">{stats.edgeCount}</b> 条
            </span>
            <span className="text-gray-200">|</span>
            <span>
              路网总长 <b className="text-gray-800">{stats.totalLengthKm} km</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              网络密度 <b className="text-gray-800">{stats.density}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              平均度数 <b className="text-gray-800">{stats.avgDegree}</b>
            </span>
            {compareMode && compareArea && compareStats && (
              <>
                <span className="text-gray-200">|</span>
                <span>
                  对比：{compareArea.name} {compareStats.edgeCount} 条路
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
              <div className="mt-2 flex items-center gap-1.5">
                <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                  {PATTERN_LABELS[currentArea.pattern]}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                {currentArea.description}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                分析指标
              </h3>
              <div className="space-y-1">
                {allMetrics.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMetric(m)}
                    className={`w-full text-left px-2 py-1.5 rounded-md transition ${
                      metric === m
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="text-[11px] font-medium">
                      {METRIC_LABELS[m]}
                    </div>
                    <div
                      className={`text-[9px] mt-0.5 ${
                        metric === m ? "text-gray-300" : "text-gray-400"
                      }`}
                    >
                      {METRIC_DESCRIPTIONS[m]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-semibold text-gray-800">显示</h3>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showNodes}
                    onChange={(e) => setShowNodes(e.target.checked)}
                    className="w-3 h-3 accent-gray-800"
                  />
                  <span className="text-[10px] text-gray-600">路口节点</span>
                </label>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 mb-1">
                  指标色阶
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex-1 h-3 rounded bg-gradient-to-r from-gray-200 via-blue-400 via-purple-500 to-red-500"></div>
                </div>
                <div className="flex justify-between text-[9px] text-gray-400 mt-0.5">
                  <span>低</span>
                  <span>高</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                指标统计
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-gray-400">平均值</span>
                    <span className="text-gray-700 font-medium">
                      {stats.avgMetricValue}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-gray-400">最大值</span>
                    <span className="text-gray-700 font-medium">
                      {stats.maxMetricValue}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-gray-400">最小值</span>
                    <span className="text-gray-700 font-medium">
                      {stats.minMetricValue}
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-gray-400">路网密度</span>
                    <span className="text-gray-700 font-medium">
                      {stats.density} km/km²
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-gray-400">平均节点度</span>
                    <span className="text-gray-700 font-medium">
                      {stats.avgDegree}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                道路等级
              </h3>
              <div className="space-y-1.5">
                {Object.entries(ROAD_CLASS_LABELS).map(([key, label]) => (
                  <div
                    key={key}
                    className="flex items-center gap-2"
                  >
                    <div
                      className="h-0.5 rounded-full"
                      style={{
                        width: key === "highway" ? 20 :
                          key === "main" ? 16 :
                          key === "secondary" ? 12 :
                          key === "local" ? 8 : 4,
                        backgroundColor: "#6b7280",
                      }}
                    />
                    <span className="text-[10px] text-gray-600">{label}</span>
                  </div>
                ))}
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
                      {stats.edgeCount} 条路段
                    </span>
                  </div>
                  <StreetNetworkMap
                    edges={currentArea.edges}
                    nodes={currentArea.nodes}
                    center={currentArea.center}
                    zoom={15}
                    height="h-[500px]"
                    metric={metric}
                    showNodes={showNodes}
                    onEdgeClick={(e) => setSelectedEdge(e)}
                    onNodeClick={(n) => setSelectedNode(n)}
                  />
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-2">
                  <div className="px-1 pb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-800">
                      {compareArea.name}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {compareStats?.edgeCount} 条路段
                    </span>
                  </div>
                  <StreetNetworkMap
                    edges={compareArea.edges}
                    nodes={compareArea.nodes}
                    center={compareArea.center}
                    zoom={15}
                    height="h-[500px]"
                    metric={metric}
                    showNodes={showNodes}
                    onEdgeClick={(e) => setSelectedEdge(e)}
                    onNodeClick={(n) => setSelectedNode(n)}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-2">
                <StreetNetworkMap
                  edges={currentArea.edges}
                  nodes={currentArea.nodes}
                  center={currentArea.center}
                  zoom={15}
                  height="h-[600px]"
                  metric={metric}
                  showNodes={showNodes}
                  onEdgeClick={(e) => setSelectedEdge(e)}
                  onNodeClick={(n) => setSelectedNode(n)}
                />
              </div>
            )}

            {selectedEdge && (
              <div className="bg-white border border-gray-300 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-800">
                    路段详情
                  </h3>
                  <button
                    onClick={() => setSelectedEdge(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-gray-400">道路等级：</span>
                    <span className="text-gray-700">
                      {ROAD_CLASS_LABELS[selectedEdge.roadClass]}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">长度：</span>
                    <span className="text-gray-700">
                      {selectedEdge.lengthM} m
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">介数中心性：</span>
                    <span className="text-gray-700 font-medium">
                      {selectedEdge.betweenness}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">接近中心性：</span>
                    <span className="text-gray-700 font-medium">
                      {selectedEdge.closeness}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">直线度：</span>
                    <span className="text-gray-700 font-medium">
                      {selectedEdge.straightness}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">集成度：</span>
                    <span className="text-gray-700 font-medium">
                      {selectedEdge.integration}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selectedNode && !selectedEdge && (
              <div className="bg-white border border-gray-300 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-800">
                    路口节点
                  </h3>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-gray-400">节点度：</span>
                    <span className="text-gray-700 font-medium">
                      {selectedNode.degree}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">介数：</span>
                    <span className="text-gray-700 font-medium">
                      {selectedNode.betweenness}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">接近中心性：</span>
                    <span className="text-gray-700 font-medium">
                      {selectedNode.closeness}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">集成度：</span>
                    <span className="text-gray-700 font-medium">
                      {selectedNode.integration}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">坐标：</span>
                    <span className="text-gray-500 font-mono text-[10px]">
                      {selectedNode.lng}, {selectedNode.lat}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {compareMode && compareArea && compareStats && (
              <div className="bg-white border border-gray-200 rounded-xl p-3">
                <h3 className="text-xs font-semibold text-gray-800 mb-3">
                  指标对比 — {METRIC_LABELS[metric]}
                </h3>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[
                    { label: "平均值", a: stats.avgMetricValue, b: compareStats.avgMetricValue },
                    { label: "最大值", a: stats.maxMetricValue, b: compareStats.maxMetricValue },
                    { label: "路网总长", a: stats.totalLengthKm, b: compareStats.totalLengthKm, unit: "km" },
                    { label: "平均度数", a: stats.avgDegree, b: compareStats.avgDegree },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="text-[9px] text-gray-400 mb-1">{item.label}</div>
                      <div className="text-[10px] text-gray-500">
                        {item.a} ↔ {item.b}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 text-center">
                  {currentArea.name.slice(-3)} vs {compareArea.name.slice(-3)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          街道网络句法 — 用图论解码城市的隐性空间逻辑
        </div>
      </div>
    </div>
  );
}
