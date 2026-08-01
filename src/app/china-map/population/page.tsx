"use client";

import React, { useMemo, useState } from "react";
import { PROVINCES, populationDensity } from "@/lib/china-admin-data";
import ChoroplethMap from "@/components/ChoroplethMap";

export default function PopulationPage() {
  const [view, setView] = useState<"density" | "total" | "bubble">("density");

  // 构造地图数据：省名简称 -> 数值
  const mapData = useMemo(() => {
    const d: Record<string, number> = {};
    PROVINCES.forEach(p => {
      const shortName = p.name.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, "");
      if (view === "density") {
        d[shortName] = populationDensity(p);
      } else {
        d[shortName] = p.population;
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
          <h1 className="text-sm font-bold text-gray-900">人口分布专题</h1>
        </div>
        <div className="flex items-center gap-1">
          {[
            { k: "density", l: "人口密度" },
            { k: "total", l: "人口总量" },
          ].map((b) => (
            <button
              key={b.k}
              onClick={() => setView(b.k as any)}
              className={`px-2 py-1 text-[10px] rounded ${view === b.k ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100 border border-gray-200"}`}
            >
              {b.l}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3">
        <ChoroplethMap
          data={mapData}
          bins={7}
          title={view === "density" ? "人口密度（人/km²）" : "常住人口（万人）"}
          unit={view === "density" ? "人/km²" : "万人"}
          formatValue={(v) => v >= 10000 ? (v / 10000).toFixed(1) + "万" : v.toFixed(0)}
          height={560}
        />

        {/* 人口排名 */}
        <div className="mt-3 bg-white border border-gray-200 rounded-lg p-3">
          <div className="text-xs font-semibold text-gray-700 mb-2">人口排名（示例数据）</div>
          <div className="space-y-0.5 max-h-48 overflow-y-auto">
            {[...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 15).map((p, i) => (
              <div key={p.code} className="flex items-center gap-2 text-[10px]">
                <span className="w-5 text-gray-400">{i + 1}</span>
                <span className="w-16 text-gray-600 truncate">{p.shortName}</span>
                <span className="flex-1 text-gray-500 tabular-nums">{p.population}万</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
