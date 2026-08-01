"use client";

import React, { useState } from "react";
import RegionRadar, { type RadarDimension, type RadarItem } from "@/components/RegionRadar";
import { PROVINCES, perCapitaGDP, populationDensity } from "@/lib/china-admin-data";

const DIMENSIONS: RadarDimension[] = [
  { key: "gdp", label: "GDP", max: 140000, unit: "亿" },
  { key: "population", label: "人口", max: 13000, unit: "万" },
  { key: "urbanization", label: "城镇化率", max: 100, unit: "%" },
  { key: "perCapita", label: "人均GDP", max: 30, unit: "万" },
  { key: "fiscal", label: "财政收入", max: 12000, unit: "亿" },
  { key: "retail", label: "社零消费", max: 50000, unit: "亿" },
  { key: "density", label: "人口密度", max: 5000, unit: "人/km²" },
  { key: "tertiary", label: "三产占比", max: 90, unit: "%" },
];

export default function RadarPage() {
  // 默认选4个代表省份
  const [selected, setSelected] = useState<string[]>(["11", "31", "44", "51"]);

  const toggleProvince = (code: string) => {
    setSelected((cur) => {
      if (cur.includes(code)) {
        if (cur.length <= 2) return cur; // 至少保留2个
        return cur.filter((c) => c !== code);
      }
      if (cur.length >= 4) return cur; // 最多4个
      return [...cur, code];
    });
  };

  const items: RadarItem[] = selected.map((code) => {
    const p = PROVINCES.find((x) => x.code === code)!;
    return {
      id: p.code,
      name: p.name,
      values: {
        gdp: p.gdp,
        population: p.population,
        urbanization: p.urbanizationRate,
        perCapita: perCapitaGDP(p),
        fiscal: p.fiscalRevenue,
        retail: p.retailSales,
        density: populationDensity(p),
        tertiary: p.tertiaryIndustry,
      },
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/china-map" className="text-xs text-gray-400 hover:text-gray-700">全国地图</a>
          <span className="text-gray-300">/</span>
          <h1 className="text-sm font-bold text-gray-900">雷达对比</h1>
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">示例数据</span>
        </div>
        <span className="text-[10px] text-gray-400">选择2-4个省份对比</span>
      </div>

      <div className="flex gap-3 p-3">
        {/* 左：省份选择 */}
        <div className="w-56 bg-white border border-gray-200 rounded-lg p-2">
          <div className="text-xs font-semibold text-gray-700 mb-2">选择省份 ({selected.length}/4)</div>
          <div className="space-y-0.5 max-h-[600px] overflow-y-auto">
            {PROVINCES.map((p) => (
              <div
                key={p.code}
                onClick={() => toggleProvince(p.code)}
                className={[
                  "flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-xs",
                  selected.includes(p.code) ? "bg-gray-200" : "hover:bg-gray-50",
                ].join(" ")}
              >
                <span className={[
                  "inline-block w-3 h-3 rounded-sm border",
                  selected.includes(p.code) ? "bg-gray-700 border-gray-700" : "border-gray-300",
                ].join(" ")} />
                <span className="text-gray-700">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 右：雷达图 */}
        <div className="flex-1">
          {items.length >= 2 ? (
            <RegionRadar
              dimensions={DIMENSIONS}
              items={items}
              title="多维度雷达对比"
              size={420}
            />
          ) : (
            <div className="border border-gray-200 rounded-lg bg-white p-8 text-center text-sm text-gray-400">
              请至少选择2个省份
            </div>
          )}

          {/* 综合评分 */}
          <div className="mt-3 bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-700 mb-2">综合评分（归一化加权）</div>
            <div className="space-y-1">
              {items.map((it) => {
                const scores = DIMENSIONS.map((d) => Math.min((it.values[d.key] || 0) / d.max, 1));
                const avg = scores.reduce((s, v) => s + v, 0) / scores.length;
                const pct = (avg * 100).toFixed(1);
                return (
                  <div key={it.id} className="flex items-center gap-2 text-xs">
                    <span className="w-16 text-gray-700">{it.name}</span>
                    <div className="flex-1 bg-gray-100 rounded-sm h-4 relative overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-gray-700" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-12 text-gray-600 text-right tabular-nums">{pct}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
