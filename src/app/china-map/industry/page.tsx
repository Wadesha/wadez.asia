"use client";

import React, { useMemo, useState } from "react";
import {
  INDUSTRY_CLUSTERS,
  INDUSTRY_TYPES,
  getIndustryCountByProvince,
  getIndustryCountByType,
  type IndustryType,
} from "@/lib/china-industry-data";
import { PROVINCES } from "@/lib/china-admin-data";
import BubbleMap from "@/components/BubbleMap";
import ChoroplethMap from "@/components/ChoroplethMap";

export default function IndustryPage() {
  const [view, setView] = useState<"bubble" | "choropleth" | "type">("bubble");
  const [filterType, setFilterType] = useState<IndustryType | "all">("all");

  const filteredClusters = useMemo(() => {
    if (filterType === "all") return INDUSTRY_CLUSTERS;
    return INDUSTRY_CLUSTERS.filter((c) => c.type === filterType);
  }, [filterType]);

  // 气泡图数据
  const bubbleItems = useMemo(() => {
    const typeMap = new Map(INDUSTRY_TYPES.map((t) => [t.type, t.shade]));
    const sortedByValue = [...filteredClusters].sort((a, b) => b.output - a.output);
    const categories = ["low", "mid", "high"];
    return sortedByValue.map((c, i) => {
      const idx = i / sortedByValue.length;
      const cat = idx < 0.33 ? 0 : idx < 0.66 ? 1 : 2;
      return {
        id: c.id,
        name: c.name,
        center: c.center,
        value: c.output,
        category: cat,
        desc: `${c.provinceName} | ${INDUSTRY_TYPES.find((t) => t.type === c.type)?.label} | ${c.level} | 产值${c.output}亿 | 企业${c.enterprises}家`,
      };
    });
  }, [filteredClusters]);

  // 色块图（按省份产值）
  const provinceMapData = useMemo(() => {
    const stats = getIndustryCountByProvince();
    const d: Record<string, number> = {};
    PROVINCES.forEach(p => {
      const shortName = p.name.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, "");
      const stat = stats.find((s) => s.provinceCode === p.code);
      d[shortName] = stat?.output || 0;
    });
    return d;
  }, []);

  // 按类型统计
  const typeStats = useMemo(() => getIndustryCountByType(), []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/china-map" className="text-xs text-gray-400 hover:text-gray-700">全国地图</a>
          <span className="text-gray-300">/</span>
          <h1 className="text-sm font-bold text-gray-900">行业分布专题</h1>
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">示例数据</span>
        </div>
        <div className="flex items-center gap-1">
          {[
            { k: "bubble", l: "园区气泡图" },
            { k: "choropleth", l: "省份产值图" },
            { k: "type", l: "行业类型对比" },
          ].map((b) => (
            <button
              key={b.k}
              onClick={() => setView(b.k as any)}
              className={[
                "px-2 py-1 text-[10px] rounded",
                view === b.k ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100 border border-gray-200",
              ].join(" ")}
            >
              {b.l}
            </button>
          ))}
        </div>
      </div>

      {/* 类型筛选 */}
      {view !== "type" && (
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[10px] text-gray-400 mr-1">产业类型：</span>
            <button
              onClick={() => setFilterType("all")}
              className={[
                "px-2 py-0.5 text-[10px] rounded",
                filterType === "all" ? "bg-gray-700 text-white" : "text-gray-500 hover:bg-gray-100 border border-gray-200",
              ].join(" ")}
            >
              全部
            </button>
            {INDUSTRY_TYPES.map((t) => (
              <button
                key={t.type}
                onClick={() => setFilterType(t.type)}
                className={[
                  "px-2 py-0.5 text-[10px] rounded",
                  filterType === t.type ? "bg-gray-700 text-white" : "text-gray-500 hover:bg-gray-100 border border-gray-200",
                ].join(" ")}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-3">
        {view === "bubble" ? (
          <BubbleMap
            items={bubbleItems}
            title={`产业园区分布（${filterType === "all" ? "全部" : INDUSTRY_TYPES.find((t) => t.type === filterType)?.label}）`}
            unit="亿"
            formatValue={(v) => v.toFixed(0) + "亿"}
            height={600}
          />
        ) : view === "choropleth" ? (
          <ChoroplethMap
            data={provinceMapData}
            bins={7}
            title="各省产业园区总产值（亿元）"
            unit="亿元"
            formatValue={(v) => v >= 10000 ? (v / 10000).toFixed(1) + "万亿" : v.toFixed(0)}
            height={560}
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {/* 类型对比柱图 */}
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs font-semibold text-gray-700 mb-2">各行业类型园区数量</div>
              <div className="space-y-1">
                {typeStats.map((s) => {
                  const max = Math.max(...typeStats.map((x) => x.count));
                  return (
                    <div key={s.type} className="flex items-center gap-2 text-[10px]">
                      <span className="w-16 text-gray-600">{INDUSTRY_TYPES.find((t) => t.type === s.type)?.label}</span>
                      <div className="flex-1 bg-gray-100 rounded-sm h-3 relative overflow-hidden">
                        <div className="absolute left-0 top-0 h-full bg-gray-700" style={{ width: `${(s.count / max) * 100}%` }} />
                      </div>
                      <span className="w-6 text-gray-500 text-right">{s.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* 产值对比 */}
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs font-semibold text-gray-700 mb-2">各行业总产值（亿元）</div>
              <div className="space-y-1">
                {typeStats.map((s) => {
                  const max = Math.max(...typeStats.map((x) => x.output));
                  return (
                    <div key={s.type} className="flex items-center gap-2 text-[10px]">
                      <span className="w-16 text-gray-600">{INDUSTRY_TYPES.find((t) => t.type === s.type)?.label}</span>
                      <div className="flex-1 bg-gray-100 rounded-sm h-3 relative overflow-hidden">
                        <div className="absolute left-0 top-0 h-full bg-gray-500" style={{ width: `${(s.output / max) * 100}%` }} />
                      </div>
                      <span className="w-12 text-gray-500 text-right">{s.output}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 产业园区列表 */}
        <div className="mt-3 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-3 py-1.5 border-b border-gray-100 text-xs font-semibold text-gray-700">
            产业园区详情
            <span className="ml-2 text-[10px] font-normal text-gray-400">示例数据</span>
          </div>
          <div className="max-h-72 overflow-y-auto">
            <table className="w-full text-[11px]">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="text-left py-1 px-2 text-gray-500 font-medium">园区</th>
                  <th className="text-left py-1 px-2 text-gray-500 font-medium">省份</th>
                  <th className="text-left py-1 px-2 text-gray-500 font-medium">类型</th>
                  <th className="text-left py-1 px-2 text-gray-500 font-medium">级别</th>
                  <th className="text-right py-1 px-2 text-gray-500 font-medium">企业数</th>
                  <th className="text-right py-1 px-2 text-gray-500 font-medium">产值(亿)</th>
                  <th className="text-right py-1 px-2 text-gray-500 font-medium">就业(万)</th>
                </tr>
              </thead>
              <tbody>
                {filteredClusters.map((c) => (
                  <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-1 px-2 text-gray-700">{c.name}</td>
                    <td className="py-1 px-2 text-gray-500">{c.provinceName}</td>
                    <td className="py-1 px-2 text-gray-500">{INDUSTRY_TYPES.find((t) => t.type === c.type)?.label}</td>
                    <td className="py-1 px-2 text-gray-500">{c.level}</td>
                    <td className="py-1 px-2 text-right text-gray-700 tabular-nums">{c.enterprises}</td>
                    <td className="py-1 px-2 text-right text-gray-700 tabular-nums">{c.output}</td>
                    <td className="py-1 px-2 text-right text-gray-700 tabular-nums">{c.employees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
