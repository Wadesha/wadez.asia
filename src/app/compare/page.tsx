"use client";

import { useState } from "react";
import Link from "next/link";
import { useCrossSiteAnalysis, getAvailablePairs } from "@/lib/use-cross-site";

interface SubSiteMetric {
  id: string;
  name: string;
  category: string;
  metrics: { label: string; value: number; unit: string }[];
  scores: { label: string; score: number }[];
}

const AVAILABLE_SITES: SubSiteMetric[] = [
  {
    id: "poi-heat",
    name: "POI热力分布",
    category: "GIS",
    metrics: [
      { label: "POI总数", value: 5000, unit: "个" },
      { label: "类别数", value: 8, unit: "类" },
      { label: "覆盖城市", value: 3, unit: "个" },
    ],
    scores: [
      { label: "数据丰富度", score: 85 },
      { label: "可视化效果", score: 90 },
      { label: "交互性", score: 75 },
      { label: "实用性", score: 80 },
      { label: "数据真实性", score: 40 },
    ],
  },
  {
    id: "building-morphology",
    name: "建筑形态图谱",
    category: "GIS",
    metrics: [
      { label: "建筑数量", value: 460, unit: "栋" },
      { label: "高度区间", value: 300, unit: "m" },
      { label: "对比区域", value: 2, unit: "个" },
    ],
    scores: [
      { label: "数据丰富度", score: 70 },
      { label: "可视化效果", score: 88 },
      { label: "交互性", score: 72 },
      { label: "实用性", score: 75 },
      { label: "数据真实性", score: 35 },
    ],
  },
  {
    id: "street-syntax",
    name: "街道网络句法",
    category: "GIS",
    metrics: [
      { label: "路网节点", value: 120, unit: "个" },
      { label: "道路边数", value: 180, unit: "条" },
      { label: "图论指标", value: 5, unit: "种" },
    ],
    scores: [
      { label: "数据丰富度", score: 65 },
      { label: "可视化效果", score: 82 },
      { label: "交互性", score: 68 },
      { label: "实用性", score: 78 },
      { label: "数据真实性", score: 30 },
    ],
  },
  {
    id: "accessibility",
    name: "可达性分析器",
    category: "GIS",
    metrics: [
      { label: "设施类型", value: 8, unit: "种" },
      { label: "等时圈", value: 3, unit: "级" },
      { label: "覆盖区域", value: 2, unit: "个" },
    ],
    scores: [
      { label: "数据丰富度", score: 72 },
      { label: "可视化效果", score: 85 },
      { label: "交互性", score: 88 },
      { label: "实用性", score: 90 },
      { label: "数据真实性", score: 45 },
    ],
  },
  {
    id: "heat-island",
    name: "城市热岛效应",
    category: "气象环境",
    metrics: [
      { label: "监测区域", value: 12, unit: "个" },
      { label: "温度区间", value: 10, unit: "℃" },
      { label: "影响因子", value: 4, unit: "项" },
    ],
    scores: [
      { label: "数据丰富度", score: 68 },
      { label: "可视化效果", score: 87 },
      { label: "交互性", score: 70 },
      { label: "实用性", score: 75 },
      { label: "数据真实性", score: 40 },
    ],
  },
  {
    id: "traffic-capacity",
    name: "交通承载力",
    category: "城市规划",
    metrics: [
      { label: "道路段数", value: 45, unit: "条" },
      { label: "拥堵等级", value: 4, unit: "级" },
      { label: "指标维度", value: 6, unit: "项" },
    ],
    scores: [
      { label: "数据丰富度", score: 65 },
      { label: "可视化效果", score: 80 },
      { label: "交互性", score: 72 },
      { label: "实用性", score: 85 },
      { label: "数据真实性", score: 38 },
    ],
  },
  {
    id: "population-density",
    name: "人口密度分布",
    category: "城市规划",
    metrics: [
      { label: "分析区域", value: 6, unit: "个" },
      { label: "居住地块", value: 120, unit: "个" },
      { label: "人口总量", value: 85000, unit: "人" },
    ],
    scores: [
      { label: "数据丰富度", score: 78 },
      { label: "可视化效果", score: 84 },
      { label: "交互性", score: 75 },
      { label: "实用性", score: 88 },
      { label: "数据真实性", score: 42 },
    ],
  },
  {
    id: "greenway",
    name: "绿道慢行系统",
    category: "GIS",
    metrics: [
      { label: "绿道长度", value: 45, unit: "km" },
      { label: "节点数量", value: 32, unit: "个" },
      { label: "覆盖区域", value: 3, unit: "个" },
    ],
    scores: [
      { label: "数据丰富度", score: 62 },
      { label: "可视化效果", score: 86 },
      { label: "交互性", score: 70 },
      { label: "实用性", score: 76 },
      { label: "数据真实性", score: 36 },
    ],
  },
];

type TabMode = "overview" | "correlation";

function CorrelationAnalysis({ siteIds }: { siteIds: string[] }) {
  const pairs = getAvailablePairs().filter(
    (p) => siteIds.includes(p.siteA) && siteIds.includes(p.siteB)
  );

  if (pairs.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
        <p className="text-sm text-gray-400">
          当前选中的子网站之间暂无预定义关联分析
        </p>
        <p className="text-[10px] text-gray-400 mt-2">
          尝试选择关联度更高的组合，如：人口密度 + 可达性、POI热力 + 交通承载力
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {pairs.map((pair) => (
        <CorrelationCard
          key={`${pair.siteA}-${pair.siteB}`}
          siteA={pair.siteA}
          siteB={pair.siteB}
        />
      ))}
    </div>
  );
}

function CorrelationCard({ siteA, siteB }: { siteA: string; siteB: string }) {
  const analysis = useCrossSiteAnalysis(siteA, siteB);

  if (!analysis) return null;

  const { pair, correlation, regressionSlope, regressionIntercept, rSquared, sampleSize, scatterData, interpretation } = analysis;

  // 构建简单散点表格：按 x 排序，每行显示 x, y, 预测值, 残差
  const tableData = scatterData
    .map((p) => {
      const predicted = regressionSlope * p.x + regressionIntercept;
      const residual = p.y - predicted;
      return { ...p, predicted: Math.round(predicted * 10) / 10, residual: Math.round(residual * 10) / 10 };
    })
    .sort((a, b) => a.x - b.x);

  const siteAName = AVAILABLE_SITES.find((s) => s.id === pair.siteA)?.name || pair.siteA;
  const siteBName = AVAILABLE_SITES.find((s) => s.id === pair.siteB)?.name || pair.siteB;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-semibold text-gray-800">
            {siteAName} vs {siteBName}
          </h3>
          <p className="text-[10px] text-gray-500 mt-0.5">{pair.description}</p>
        </div>
        <span
          className={`text-[10px] px-2 py-0.5 rounded border ${
            Math.abs(correlation) >= 0.5
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-gray-50 text-gray-600 border-gray-200"
          }`}
        >
          {interpretation}
        </span>
      </div>

      {/* 关联指标 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
          <div className="text-[9px] text-gray-400">皮尔逊相关系数</div>
          <div className="text-sm font-bold text-gray-800 mt-0.5">{correlation}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
          <div className="text-[9px] text-gray-400">回归斜率</div>
          <div className="text-sm font-bold text-gray-800 mt-0.5">{regressionSlope}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
          <div className="text-[9px] text-gray-400">R² 决定系数</div>
          <div className="text-sm font-bold text-gray-800 mt-0.5">{rSquared}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
          <div className="text-[9px] text-gray-400">样本量</div>
          <div className="text-sm font-bold text-gray-800 mt-0.5">{sampleSize}</div>
        </div>
      </div>

      {/* 回归方程 */}
      <div className="text-[10px] text-gray-500 mb-3 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
        回归方程：{pair.labelB} = {regressionSlope} x {pair.labelA} + {regressionIntercept}
      </div>

      {/* 散点数据表格 */}
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-1.5 px-2 text-gray-400 font-medium">区域</th>
              <th className="text-right py-1.5 px-2 text-gray-400 font-medium">{pair.labelA}</th>
              <th className="text-right py-1.5 px-2 text-gray-400 font-medium">{pair.labelB}</th>
              <th className="text-right py-1.5 px-2 text-gray-400 font-medium">预测值</th>
              <th className="text-right py-1.5 px-2 text-gray-400 font-medium">残差</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-1.5 px-2 text-gray-600">{row.label}</td>
                <td className="py-1.5 px-2 text-right text-gray-700 font-mono">{row.x}</td>
                <td className="py-1.5 px-2 text-right text-gray-700 font-mono">{row.y}</td>
                <td className="py-1.5 px-2 text-right text-gray-500 font-mono">{row.predicted.toFixed(1)}</td>
                <td className="py-1.5 px-2 text-right">
                  <span
                    className={`font-mono ${
                      Math.abs(row.residual) > 10
                        ? "text-gray-800 font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {row.residual > 0 ? "+" : ""}
                    {row.residual.toFixed(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 简单位置条 */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="text-[9px] text-gray-400 mb-2">数据分布概览</div>
        <div className="flex items-end gap-1 h-16">
          {scatterData.map((p, idx) => {
            const maxX = Math.max(...scatterData.map((d) => d.x));
            const minX = Math.min(...scatterData.map((d) => d.x));
            const maxY = Math.max(...scatterData.map((d) => d.y));
            const rangeX = maxX - minX || 1;
            const left = ((p.x - minX) / rangeX) * 100;
            const height = maxY > 0 ? (p.y / maxY) * 100 : 0;
            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center justify-end group relative"
              >
                <div
                  className="w-full bg-gray-300 rounded-sm hover:bg-gray-800 transition-colors"
                  style={{ height: `${Math.max(height, 8)}%` }}
                />
                <span className="text-[8px] text-gray-400 mt-0.5 truncate w-full text-center">
                  {p.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["poi-heat", "accessibility"]);
  const [activeTab, setActiveTab] = useState<TabMode>("overview");

  const toggleSite = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((s) => s !== id);
      }
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  };

  const selectedSites = AVAILABLE_SITES.filter((s) => selectedIds.includes(s.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* 头部 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition">
                返回首页
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">跨子网站对比仪表盘</h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  选择2-4个子网站并排对比关键指标和综合评分
                </p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-1 bg-gray-100 text-gray-600 rounded border border-gray-200">
              v2.2.7
            </span>
          </div>
        </div>

        {/* 选择面板 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
          <h3 className="text-xs font-semibold text-gray-800 mb-3">
            选择对比对象（已选 {selectedIds.length}/4）
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {AVAILABLE_SITES.map((site) => {
              const isSelected = selectedIds.includes(site.id);
              return (
                <button
                  key={site.id}
                  onClick={() => toggleSite(site.id)}
                  className={`p-2 rounded-lg text-left transition border ${
                    isSelected
                      ? "bg-gray-900 border-gray-900 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="text-[11px] font-semibold">{site.name}</div>
                  <div className={`text-[9px] mt-0.5 ${isSelected ? "text-gray-400" : "text-gray-400"}`}>
                    {site.category}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 标签切换 */}
        {selectedSites.length >= 2 && (
          <div className="flex items-center gap-1 mb-3">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3 py-1.5 text-xs rounded-md transition border ${
                activeTab === "overview"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              综合对比
            </button>
            <button
              onClick={() => setActiveTab("correlation")}
              className={`px-3 py-1.5 text-xs rounded-md transition border ${
                activeTab === "correlation"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              关联分析
            </button>
          </div>
        )}

        {selectedSites.length < 2 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-sm text-gray-400">请至少选择2个子网站进行对比</p>
          </div>
        ) : activeTab === "overview" ? (
          <>
            {/* 雷达图对比 */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-3">综合评分雷达图</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 text-gray-500 font-medium">评估维度</th>
                      {selectedSites.map((site) => (
                        <th key={site.id} className="text-center py-2 px-2 text-gray-700 font-semibold">
                          {site.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSites[0].scores.map((score, idx) => (
                      <tr key={score.label} className="border-b border-gray-100">
                        <td className="py-2 px-2 text-gray-600">{score.label}</td>
                        {selectedSites.map((site) => {
                          const val = site.scores[idx]?.score || 0;
                          const maxVal = Math.max(...selectedSites.map((s) => s.scores[idx]?.score || 0));
                          const isMax = val === maxVal;
                          return (
                            <td key={site.id} className="py-2 px-2">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${isMax ? "bg-gray-800" : "bg-gray-400"}`}
                                    style={{ width: `${val}%` }}
                                  />
                                </div>
                                <span className={`text-[10px] ${isMax ? "text-gray-900 font-bold" : "text-gray-500"}`}>
                                  {val}
                                </span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="py-2 px-2 font-semibold text-gray-700">综合得分</td>
                      {selectedSites.map((site) => {
                        const avg = Math.round(site.scores.reduce((a, s) => a + s.score, 0) / site.scores.length);
                        const maxAvg = Math.max(...selectedSites.map((s) =>
                          Math.round(s.scores.reduce((a, sc) => a + sc.score, 0) / s.scores.length)
                        ));
                        return (
                          <td key={site.id} className="text-center py-2 px-2">
                            <span className={`text-base font-bold ${avg === maxAvg ? "text-gray-900" : "text-gray-700"}`}>
                              {avg}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 关键指标对比 */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-gray-800 mb-3">关键指标对比</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {selectedSites.map((site) => (
                  <div key={site.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-800">{site.name}</h4>
                      <span className="text-[9px] text-gray-400">{site.category}</span>
                    </div>
                    <div className="space-y-1.5">
                      {site.metrics.map((m) => (
                        <div key={m.label} className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500">{m.label}</span>
                          <span className="text-[11px] font-semibold text-gray-800">
                            {m.value.toLocaleString()} {m.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/${site.id}`}
                      className="block mt-2 pt-2 border-t border-gray-200 text-[10px] text-gray-600 hover:text-gray-900"
                    >
                      访问详情
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <CorrelationAnalysis siteIds={selectedIds} />
        )}
      </div>
    </div>
  );
}
