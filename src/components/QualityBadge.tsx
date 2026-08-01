"use client";

import { useState } from "react";
import { type DataQualityScores } from "@/lib/data-quality";

interface QualityBadgeProps {
  quality: DataQualityScores;
  className?: string;
}

function getQualityLevel(total: number) {
  if (total >= 85) {
    return {
      label: "优秀",
      bg: "bg-gray-800",
      text: "text-white",
      hoverBg: "hover:bg-gray-700",
    };
  }
  if (total >= 70) {
    return {
      label: "良好",
      bg: "bg-gray-500",
      text: "text-white",
      hoverBg: "hover:bg-gray-600",
    };
  }
  if (total >= 50) {
    return {
      label: "一般",
      bg: "bg-gray-300",
      text: "text-gray-800",
      hoverBg: "hover:bg-gray-400",
    };
  }
  return {
    label: "较差",
    bg: "bg-gray-100",
    text: "text-gray-500",
    hoverBg: "hover:bg-gray-200",
  };
}

export default function QualityBadge({ quality, className = "" }: QualityBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const level = getQualityLevel(quality.total);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border border-gray-200 transition cursor-default ${level.bg} ${level.text} ${level.hoverBg}`}
      >
        数据质量: {level.label} ({quality.total})
      </span>

      {showTooltip && (
        <div className="absolute z-50 mt-1 right-0 w-44 bg-white border border-gray-200 rounded-lg shadow-lg p-2.5">
          <div className="text-[10px] font-medium text-gray-700 mb-1.5">
            数据质量评分
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-500">完整性</span>
              <span className="font-medium text-gray-800">
                {quality.completeness}
              </span>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-500 rounded-full"
                style={{ width: `${quality.completeness}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-500">准确性</span>
              <span className="font-medium text-gray-800">
                {quality.accuracy}
              </span>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-500 rounded-full"
                style={{ width: `${quality.accuracy}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-500">时效性</span>
              <span className="font-medium text-gray-800">
                {quality.timeliness}
              </span>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-500 rounded-full"
                style={{ width: `${quality.timeliness}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-500">一致性</span>
              <span className="font-medium text-gray-800">
                {quality.consistency}
              </span>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-500 rounded-full"
                style={{ width: `${quality.consistency}%` }}
              />
            </div>
          </div>
          <div className="mt-1.5 pt-1 border-t border-gray-100 flex justify-between text-[10px] font-medium">
            <span className="text-gray-600">总分</span>
            <span className="text-gray-900">{quality.total}</span>
          </div>
        </div>
      )}
    </div>
  );
}
