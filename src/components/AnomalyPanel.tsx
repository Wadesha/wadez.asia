"use client";

import { useState } from "react";
import type { AnomalyResult } from "@/lib/anomaly-detector";

interface AnomalyPanelProps {
  result: AnomalyResult;
  title?: string;
  unit?: string;
}

const severityLabels: Record<string, string> = {
  low: "轻度",
  medium: "中度",
  high: "重度",
  critical: "严重",
};

const severityClasses: Record<string, string> = {
  low: "text-gray-500",
  medium: "text-orange-600",
  high: "text-red-600",
  critical: "text-red-700 font-bold",
};

const severityDot: Record<string, string> = {
  low: "bg-gray-300",
  medium: "bg-orange-400",
  high: "bg-red-500",
  critical: "bg-red-700",
};

export default function AnomalyPanel({ result, title = "异常检测", unit = "" }: AnomalyPanelProps) {
  const [expanded, setExpanded] = useState(true);

  if (result.total === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-gray-800">{title}</h3>
          <span className="text-[10px] text-gray-400">无异常</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-gray-800">{title}</h3>
          {result.criticalCount > 0 && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-red-100 text-red-700 border border-red-200">
              {result.criticalCount} 严重
            </span>
          )}
          {result.total > 0 && result.criticalCount === 0 && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-orange-100 text-orange-700 border border-orange-200">
              {result.total} 异常
            </span>
          )}
        </div>
        <span className="text-[10px] text-gray-400">
          {expanded ? "收起" : "展开"}
        </span>
      </button>

      {expanded && (
        <div className="px-3 pb-3">
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {result.anomalies.map((item) => (
              <div
                key={item.id}
                className="border border-gray-100 rounded-lg p-2.5 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${severityDot[item.severity]}`} />
                    <span className="text-[11px] font-medium text-gray-800">
                      {item.name}
                    </span>
                  </div>
                  <span className={`text-[10px] ${severityClasses[item.severity]}`}>
                    {severityLabels[item.severity]}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-[11px] text-red-600 font-bold">
                    {item.value}
                    {unit && <span className="text-[9px] font-normal ml-0.5">{unit}</span>}
                  </span>
                  <span className="text-[9px] text-gray-400">
                    预期 {item.expectedRange[0]} - {item.expectedRange[1]}
                    {unit}
                  </span>
                  <span className="text-[9px] text-gray-400 ml-auto">
                    偏差 {item.deviation}
                  </span>
                </div>

                <p className="text-[10px] text-gray-600 leading-relaxed">
                  {item.suggestion}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[9px] text-gray-400">
            <span>
              检测方法：{result.method === "std" ? "标准差法" : "四分位距法"}
            </span>
            <span>
              共 {result.total} 项异常
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
