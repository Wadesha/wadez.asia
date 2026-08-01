"use client";

import React, { useMemo, useState } from "react";
import { PROVINCES, perCapitaGDP } from "@/lib/china-admin-data";
import ChoroplethMap from "@/components/ChoroplethMap";

export default function EconomyPage() {
  const [view, setView] = useState<"total" | "perCapita" | "structure">("total");

  // 构造地图数据：省名简称 -> 数值
  const mapData = useMemo(() => {
    const d: Record<string, number> = {};
    PROVINCES.forEach(p => {
      const shortName = p.name.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, "");
      if (view === "perCapita") {
        d[shortName] = perCapitaGDP(p);
      } else {
        d[shortName] = p.gdp;
      }
    });
    return d;
  }, [view]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/china-map" className="text-xs text-gray-400 hover:text-gray-700">全国地图</a>
          <span className="text-gray-300">/</span>
          <h1 className="text-sm font-bold text-gray-900">经济对比专题</h1>
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">示例数据</span>
        </div>
        <div className="flex items-center gap-1">
          {[
            { k: "total", l: "GDP总量" },
            { k: "perCapita", l: "人均GDP" },
            { k: "structure", l: "产业结构" },
          ].map((b) => (
            <button key={b.k} onClick={() => setView(b.k as any)}
              className={`px-2 py-1 text-[10px] rounded ${view === b.k ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>
              {b.l}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3">
        {view !== "structure" ? (
          <ChoroplethMap
            data={mapData}
            bins={7}
            title={view === "total" ? "GDP总量（亿元）" : "人均GDP（万元）"}
            unit={view === "total" ? "亿元" : "万元"}
            formatValue={(v) => v >= 10000 ? (v / 10000).toFixed(1) + "万" : v.toFixed(1)}
            height={560}
          />
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-700 mb-2">各省产业结构（一二三产占比%）</div>
            <div className="space-y-0.5">
              {PROVINCES.sort((a, b) => b.tertiaryIndustry - a.tertiaryIndustry).map((p) => (
                <div key={p.code} className="flex items-center gap-2 text-[10px]">
                  <span className="w-16 text-gray-600 truncate">{p.name.replace("省","").replace("市","").replace("自治区","").replace("壮族","").replace("回族","").replace("维吾尔","")}</span>
                  <div className="flex-1 flex h-3 rounded overflow-hidden">
                    <div className="bg-gray-300" style={{ width: `${p.primaryIndustry}%` }} title={`一产 ${p.primaryIndustry}%`} />
                    <div className="bg-gray-600" style={{ width: `${p.secondaryIndustry}%` }} title={`二产 ${p.secondaryIndustry}%`} />
                    <div className="bg-gray-900" style={{ width: `${p.tertiaryIndustry}%` }} title={`三产 ${p.tertiaryIndustry}%`} />
                  </div>
                  <span className="w-8 text-gray-400">{p.gdp}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-2 text-[9px] text-gray-400">
              <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 bg-gray-300 rounded-sm" />第一产业</span>
              <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 bg-gray-600 rounded-sm" />第二产业</span>
              <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 bg-gray-900 rounded-sm" />第三产业</span>
            </div>
          </div>
        )}

        {/* GDP增速散点 */}
        {view === "total" && (
          <div className="mt-3 bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-700 mb-2">GDP总量 vs 人均GDP 散点图</div>
            <div className="relative h-48 border-l border-b border-gray-200">
              {(() => {
                const maxGdp = Math.max(...PROVINCES.map((p) => p.gdp));
                const maxPc = Math.max(...PROVINCES.map((p) => perCapitaGDP(p)));
                return PROVINCES.map((p) => {
                  const x = (p.gdp / maxGdp) * 100;
                  const y = 100 - (perCapitaGDP(p) / maxPc) * 100;
                  return (
                    <div
                      key={p.code}
                      className="absolute w-1.5 h-1.5 bg-gray-700 rounded-full"
                      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
                      title={`${p.name}: GDP ${p.gdp}亿, 人均 ${perCapitaGDP(p)}万`}
                    />
                  );
                });
              })()}
            </div>
            <div className="flex justify-between text-[9px] text-gray-400 mt-1">
              <span>GDP总量 →</span>
              <span>↑ 人均GDP</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
