"use client";

import { useState } from "react";
import type { CalibrationResult } from "@/lib/multi-source-calibration";
import { formatConfidence } from "@/lib/multi-source-calibration";

interface CalibrationInfoProps {
  result: CalibrationResult;
  title?: string;
  unit?: string;
}

const methodLabels: Record<string, string> = {
  mean: "算术均值",
  weighted: "加权均值",
  median: "中位数",
};

export default function CalibrationInfo({
  result,
  title = "多源数据校准",
  unit = "",
}: CalibrationInfoProps) {
  const [expanded, setExpanded] = useState(false);

  if (result.sources.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-gray-800">{title}</h3>
          <span className="text-[10px] text-gray-400">无数据源</span>
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
          <span className="text-[10px] text-gray-500">
            {result.calibratedValue}
            {unit && <span className="ml-0.5">{unit}</span>}
          </span>
          <span
            className={`px-1.5 py-0.5 rounded text-[9px] font-medium border ${
              result.confidence >= 0.75
                ? "bg-gray-100 text-gray-700 border-gray-200"
                : result.confidence >= 0.5
                ? "bg-gray-50 text-gray-600 border-gray-200"
                : "bg-gray-50 text-gray-400 border-gray-100"
            }`}
          >
            {formatConfidence(result.confidence)}
          </span>
        </div>
        <span className="text-[10px] text-gray-400">
          {expanded ? "收起" : "展开"}
        </span>
      </button>

      {expanded && (
        <div className="px-3 pb-3">
          <div className="flex items-center gap-3 mb-2 text-[10px] text-gray-500">
            <span>
              方法: {methodLabels[result.method] || result.method}
            </span>
            <span>标准差: {result.stdDev}</span>
            <span>置信度: {Math.round(result.confidence * 100)}%</span>
          </div>

          <div className="space-y-1.5 max-h-[260px] overflow-y-auto">
            {result.sources.map((s) => (
              <div
                key={s.sourceId}
                className={`border rounded-lg p-2 text-[11px] ${
                  s.isOutlier
                    ? "border-gray-200 bg-gray-50/50"
                    : "border-gray-100 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">
                    {s.sourceName}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800">
                      {s.value}
                      {unit && <span className="text-[9px] ml-0.5">{unit}</span>}
                    </span>
                    {s.isOutlier && (
                      <span className="px-1 py-0.5 rounded text-[9px] bg-gray-100 text-gray-500 border border-gray-200">
                        异常
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-gray-400">
                  <span>偏差 {s.deviation > 0 ? "+" : ""}{s.deviation}</span>
                  <span>权重 {s.weight}</span>
                </div>
              </div>
            ))}
          </div>

          {result.outlierCount > 0 && (
            <div className="mt-2 text-[10px] text-gray-400">
              已排除 {result.outlierCount} 个异常源
            </div>
          )}

          <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
            <span>有效源 {result.sources.length - result.outlierCount} / {result.sources.length}</span>
            <span>校准值 {result.calibratedValue}{unit}</span>
          </div>
        </div>
      )}
    </div>
  );
}
