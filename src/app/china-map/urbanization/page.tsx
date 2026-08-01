"use client";

import React, { useMemo } from "react";
import { PROVINCES } from "@/lib/china-admin-data";
import ChoroplethMap from "@/components/ChoroplethMap";

export default function UrbanizationPage() {
  // 构造地图数据：省名简称 -> 城镇化率
  const mapData = useMemo(() => {
    const d: Record<string, number> = {};
    PROVINCES.forEach(p => {
      const shortName = p.name.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, "");
      d[shortName] = p.urbanizationRate;
    });
    return d;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-3">
        <a href="/china-map" className="text-xs text-gray-400 hover:text-gray-700">全国地图</a>
        <span className="text-gray-300">/</span>
        <h1 className="text-sm font-bold text-gray-900">城镇化与发展水平</h1>
        <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">示例数据</span>
      </div>

      <div className="p-3">
        <ChoroplethMap
          data={mapData}
          bins={7}
          title="城镇化率（%）"
          unit="%"
          formatValue={(v) => v.toFixed(1)}
          height={560}
        />

        {/* 发展阶段分类 */}
        <div className="mt-3 bg-white border border-gray-200 rounded-lg p-3">
          <div className="text-xs font-semibold text-gray-700 mb-2">发展阶段分类</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { label: "初期 (<30%)", range: [0, 30], shade: 300 },
              { label: "加速 (30-50%)", range: [30, 50], shade: 500 },
              { label: "中期 (50-70%)", range: [50, 70], shade: 700 },
              { label: "后期 (>70%)", range: [70, 100], shade: 900 },
            ].map((stage) => {
              const provinces = PROVINCES.filter((p) => p.urbanizationRate >= stage.range[0] && p.urbanizationRate < stage.range[1]);
              const shadeHex: Record<number, string> = { 300: "#d1d5db", 500: "#6b7280", 700: "#374151", 900: "#111827" };
              return (
                <div key={stage.label} className="border border-gray-200 rounded-lg p-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="inline-block w-3 h-3 rounded-sm" style={{ background: shadeHex[stage.shade] }} />
                    <span className="text-[10px] font-semibold text-gray-700">{stage.label}</span>
                  </div>
                  <div className="text-[9px] text-gray-400">{provinces.length}个省份</div>
                  <div className="text-[9px] text-gray-500 mt-0.5">
                    {provinces.slice(0, 4).map((p) => p.shortName).join(" ")}
                    {provinces.length > 4 ? "..." : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
