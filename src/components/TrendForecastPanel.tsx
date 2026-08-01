"use client";

import { useState } from "react";
import type { ForecastResult } from "@/lib/trend-forecast";

interface TrendForecastPanelProps {
  result: ForecastResult;
  title?: string;
  unit?: string;
}

export default function TrendForecastPanel({
  result,
  title = "趋势预测",
  unit = "",
}: TrendForecastPanelProps) {
  const [expanded, setExpanded] = useState(true);
  const [years, setYears] = useState(result.yearsAhead);

  const trendDirection =
    result.slope > 0 ? "上升" : result.slope < 0 ? "下降" : "持平";
  const trendColor =
    result.slope > 0 ? "text-red-600" : result.slope < 0 ? "text-green-600" : "text-gray-500";

  if (result.historical.length < 2) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-gray-800">{title}</h3>
          <span className="text-[10px] text-gray-400">数据不足</span>
        </div>
      </div>
    );
  }

  const allYears = [
    ...result.historical.map((h) => ({ year: h.year, value: h.value, type: "history" as const })),
    ...result.forecast.map((f) => ({
      year: f.year,
      value: f.value,
      lower: f.lowerBound,
      upper: f.upperBound,
      type: "forecast" as const,
    })),
  ];

  const maxValue = Math.max(
    ...allYears.map((d) => ("upper" in d ? d.upper : d.value)),
    ...allYears.map((d) => d.value)
  );
  const minValue = Math.min(
    ...allYears.map((d) => ("lower" in d ? d.lower : d.value)),
    ...allYears.map((d) => d.value)
  );
  const valueRange = maxValue - minValue || 1;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-gray-800">{title}</h3>
          <span className={`text-[10px] font-medium ${trendColor}`}>
            {trendDirection}
          </span>
        </div>
        <span className="text-[10px] text-gray-400">
          {expanded ? "收起" : "展开"}
        </span>
      </button>

      {expanded && (
        <div className="px-3 pb-3">
          {/* 模型指标 */}
          <div className="flex items-center gap-4 mb-3 text-[10px] text-gray-500">
            <span>
              斜率 <b className="text-gray-700">{result.slope}</b>
            </span>
            <span>
              R² <b className="text-gray-700">{result.rSquared}</b>
            </span>
            <span className="ml-auto">
              预测年数
              <select
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="ml-1 px-1 py-0.5 text-[10px] bg-gray-50 border border-gray-200 rounded text-gray-700"
              >
                {[3, 5, 10].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </span>
          </div>

          {/* 迷你条形图 */}
          <div className="mb-3">
            <div className="flex items-end gap-1 h-20">
              {allYears.map((d) => {
                const h = ((d.value - minValue) / valueRange) * 100;
                const isForecast = d.type === "forecast";
                return (
                  <div key={d.year} className="flex-1 flex flex-col items-center gap-0.5">
                    <div className="w-full flex flex-col items-center">
                      <div
                        className={`w-full ${isForecast ? "bg-gray-400" : "bg-gray-700"} rounded-t-sm`}
                        style={{ height: `${Math.max(h, 4)}%` }}
                      />
                    </div>
                    <span className="text-[8px] text-gray-400">{d.year.toString().slice(-2)}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-3 mt-1 text-[9px] text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-700 rounded-sm" />
                <span>历史</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-sm" />
                <span>预测</span>
              </div>
            </div>
          </div>

          {/* 预测表格 */}
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="bg-gray-50 text-gray-600">
                  <th className="text-left px-2 py-1.5 font-medium">年份</th>
                  <th className="text-right px-2 py-1.5 font-medium">预测值</th>
                  <th className="text-right px-2 py-1.5 font-medium">下限</th>
                  <th className="text-right px-2 py-1.5 font-medium">上限</th>
                </tr>
              </thead>
              <tbody>
                {result.forecast
                  .filter((_, i) => i < years)
                  .map((f, idx) => (
                    <tr
                      key={f.year}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-2 py-1.5 text-gray-700">{f.year}</td>
                      <td className="px-2 py-1.5 text-right font-medium text-gray-900">
                        {f.value}
                        {unit && <span className="text-gray-400 ml-0.5">{unit}</span>}
                      </td>
                      <td className="px-2 py-1.5 text-right text-gray-500">
                        {f.lowerBound}
                      </td>
                      <td className="px-2 py-1.5 text-right text-gray-500">
                        {f.upperBound}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <p className="mt-2 text-[9px] text-gray-400 leading-relaxed">
            基于线性回归模型的简易预测，置信区间随预测年限扩大。实际值受多种外部因素影响，仅供参考。
          </p>
        </div>
      )}
    </div>
  );
}
