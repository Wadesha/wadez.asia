"use client";

import React, { useMemo, useState } from "react";
import { PROVINCES, METRICS, getMetricValue, type MetricKey } from "@/lib/china-admin-data";
import ChoroplethMap from "@/components/ChoroplethMap";

export default function ChinaMapPage() {
  const [metric, setMetric] = useState<MetricKey>("gdp");
  const [bins, setBins] = useState(7);

  const metricInfo = METRICS.find((m) => m.key === metric)!;

  // 构造地图数据：省名简称 -> 数值
  const mapData = useMemo(() => {
    const d: Record<string, number> = {};
    PROVINCES.forEach(p => {
      const shortName = p.name.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, "");
      let v = getMetricValue(p, metric);
      if (metric === "gdp") v = p.gdp;
      d[shortName] = v;
    });
    return d;
  }, [metric]);

  // 排名数据
  const ranked = useMemo(() => {
    return [...PROVINCES]
      .map(p => {
        let v = getMetricValue(p, metric);
        if (metric === "gdp") v = p.gdp;
        return { code: p.code, name: p.name, shortName: p.shortName, value: v };
      })
      .sort((a, b) => b.value - a.value);
  }, [metric]);

  const totalValue = ranked.reduce((s, r) => s + r.value, 0);
  const maxValue = Math.max(...ranked.map(r => r.value));
  const avgValue = totalValue / ranked.length;

  const formatNum = (v: number) => {
    if (v >= 10000) return (v / 10000).toFixed(1) + "万";
    return v.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部 */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <h1 className="text-base font-bold text-gray-900">全国行政区划数据可视化</h1>
      </div>

      {/* 指标选择 */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-1 flex-wrap">
        {METRICS.map(m => (
          <button
            key={m.key}
            onClick={() => setMetric(m.key)}
            className={[
              "px-2.5 py-1 text-xs rounded transition-colors",
              metric === m.key ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100 border border-gray-200",
            ].join(" ")}
          >
            {m.label}
          </button>
        ))}
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <span className="text-[10px] text-gray-400">档位</span>
        {[5, 7, 9].map(b => (
          <button
            key={b}
            onClick={() => setBins(b)}
            className={[
              "px-2 py-1 text-[10px] rounded",
              bins === b ? "bg-gray-700 text-white" : "text-gray-500 hover:bg-gray-100 border border-gray-200",
            ].join(" ")}
          >
            {b}
          </button>
        ))}
      </div>

      {/* 主体 */}
      <div className="p-3">
        <div className="flex gap-3 overflow-x-auto">
          {/* 左：地图 */}
          <div className="w-[1000px] flex-shrink-0">
            <ChoroplethMap
              data={mapData}
              bins={bins}
              title={`${metricInfo.label}（${metricInfo.unit}）`}
              unit={metricInfo.unit}
              formatValue={formatNum}
              height={560}
            />
          </div>

          {/* 右：排名 */}
          <div className="w-72 flex flex-col gap-2">
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs font-semibold text-gray-700 mb-2">省份排名</div>
              <div className="space-y-0.5 max-h-[450px] overflow-y-auto">
                {ranked.map((r, i) => (
                  <div key={r.code} className="flex items-center gap-2 px-2 py-0.5 rounded hover:bg-gray-50 text-xs">
                    <span className="w-5 text-[10px] text-gray-400 text-right">{i + 1}</span>
                    <span className="flex-1 text-gray-700">{r.name}</span>
                    <span className="text-gray-500 tabular-nums">{formatNum(r.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 统计摘要 */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "全国总量", value: formatNum(totalValue) + metricInfo.unit },
                { label: "全国均值", value: formatNum(avgValue) + metricInfo.unit },
                { label: "最高值", value: formatNum(maxValue) + metricInfo.unit },
                { label: "最低值", value: formatNum(ranked[ranked.length - 1].value) + metricInfo.unit },
              ].map(s => (
                <div key={s.label} className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                  <div className="text-[10px] text-gray-400">{s.label}</div>
                  <div className="text-sm font-semibold text-gray-800">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}