"use client";

import React, { useMemo } from "react";
import { PROVINCES, REGIONS, getRegion, getMetricValue } from "@/lib/china-admin-data";
import ChoroplethMap from "@/components/ChoroplethMap";

export default function RegionalPage() {
  // 构造地图数据：省名简称 -> GDP
  const mapData = useMemo(() => {
    const d: Record<string, number> = {};
    PROVINCES.forEach(p => {
      const shortName = p.name.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, "");
      d[shortName] = p.gdp;
    });
    return d;
  }, []);

  // 区域统计
  const regionStats = useMemo(() => {
    return Object.entries(REGIONS).map(([key, region]) => {
      const provinces = PROVINCES.filter((p) => region.provinces.includes(p.code));
      const totalGdp = provinces.reduce((s, p) => s + p.gdp, 0);
      const totalPop = provinces.reduce((s, p) => s + p.population, 0);
      const avgUrban = provinces.reduce((s, p) => s + p.urbanizationRate, 0) / provinces.length;
      const nationalTotal = PROVINCES.reduce((s, p) => s + p.gdp, 0);
      return {
        name: region.name,
        provinceCount: provinces.length,
        totalGdp,
        totalPop,
        avgUrban,
        share: (totalGdp / nationalTotal * 100).toFixed(1),
      };
    }).sort((a, b) => b.totalGdp - a.totalGdp);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-3">
        <a href="/china-map" className="text-xs text-gray-400 hover:text-gray-700">全国地图</a>
        <span className="text-gray-300">/</span>
        <h1 className="text-sm font-bold text-gray-900">区域差异分析</h1>
        <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">示例数据</span>
      </div>

      <div className="p-3">
        <ChoroplethMap
          data={mapData}
          bins={7}
          title="全国GDP分布（区域差异可视化）"
          unit="亿元"
          formatValue={(v) => v >= 10000 ? (v / 10000).toFixed(1) + "万" : v.toFixed(0)}
          height={560}
        />

        {/* 区域对比 */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-700 mb-2">七大区域GDP对比</div>
            <div className="space-y-1.5">
              {regionStats.map((r) => (
                <div key={r.name} className="flex items-center gap-2 text-[10px]">
                  <span className="w-16 text-gray-600">{r.name.replace("地区","")}</span>
                  <div className="flex-1 bg-gray-100 rounded-sm h-4 relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-full bg-gray-700" style={{ width: `${r.share}%` }} />
                  </div>
                  <span className="w-12 text-gray-500 text-right">{r.share}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-700 mb-2">区域指标对比</div>
            <table className="w-full text-[10px]">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100">
                  <th className="text-left py-1">区域</th>
                  <th className="text-right">GDP(亿)</th>
                  <th className="text-right">人口(万)</th>
                  <th className="text-right">城镇化%</th>
                </tr>
              </thead>
              <tbody>
                {regionStats.map((r) => (
                  <tr key={r.name} className="border-b border-gray-50">
                    <td className="py-0.5 text-gray-700">{r.name.replace("地区","")}</td>
                    <td className="text-right text-gray-600">{r.totalGdp.toLocaleString()}</td>
                    <td className="text-right text-gray-600">{r.totalPop.toLocaleString()}</td>
                    <td className="text-right text-gray-600">{r.avgUrban.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 南北差异 */}
        <div className="mt-3 bg-white border border-gray-200 rounded-lg p-3">
          <div className="text-xs font-semibold text-gray-700 mb-2">南北差异对比（秦岭-淮河分界线）</div>
          {(() => {
            const south = PROVINCES.filter((p) => p.center[1] < 33.5);
            const north = PROVINCES.filter((p) => p.center[1] >= 33.5);
            const southGdp = south.reduce((s, p) => s + p.gdp, 0);
            const northGdp = north.reduce((s, p) => s + p.gdp, 0);
            const southPop = south.reduce((s, p) => s + p.population, 0);
            const northPop = north.reduce((s, p) => s + p.population, 0);
            const total = southGdp + northGdp;
            return (
              <div className="flex gap-4 text-[10px]">
                <div className="flex-1">
                  <div className="text-gray-500 mb-1">北方（{north.length}省）</div>
                  <div className="flex h-4 rounded overflow-hidden">
                    <div className="bg-gray-800" style={{ width: `${(northGdp / total) * 100}%` }} />
                  </div>
                  <div className="mt-1 text-gray-600">GDP {northGdp.toLocaleString()}亿 ({((northGdp / total) * 100).toFixed(1)}%) | 人口 {northPop.toLocaleString()}万</div>
                </div>
                <div className="flex-1">
                  <div className="text-gray-500 mb-1">南方（{south.length}省）</div>
                  <div className="flex h-4 rounded overflow-hidden">
                    <div className="bg-gray-500" style={{ width: `${(southGdp / total) * 100}%` }} />
                  </div>
                  <div className="mt-1 text-gray-600">GDP {southGdp.toLocaleString()}亿 ({((southGdp / total) * 100).toFixed(1)}%) | 人口 {southPop.toLocaleString()}万</div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
