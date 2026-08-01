"use client";

import { useState, useEffect } from "react";

/**
 * 统一数据源切换面板
 * 用于所有子网站顶部显示当前数据状态并切换模拟/真实数据
 */

export type DataSource = "simulated" | "real";

interface DataSourceToggleProps {
  source: DataSource;
  onChange: (source: DataSource) => void;
  realDataCount?: number;
  simulatedCount?: number;
  loading?: boolean;
  error?: string | null;
  apiName?: string;       // 如 "高德API"
  lastUpdate?: string;
  compact?: boolean;
}

export function DataSourceToggle({
  source,
  onChange,
  realDataCount,
  simulatedCount,
  loading,
  error,
  apiName = "高德API",
  lastUpdate,
  compact = false,
}: DataSourceToggleProps) {
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);

  // 检查API是否已配置（通过尝试调用一次健康检查）
  useEffect(() => {
    fetch("/api/amap/poi?keywords=test&city=北京")
      .then((res) => res.json())
      .then((json) => {
        // 如果返回 degraded: true，说明Key未配置
        setApiAvailable(!json.degraded);
      })
      .catch(() => setApiAvailable(false));
  }, []);

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 text-[10px]">
        <button
          onClick={() => onChange("simulated")}
          className={`px-2 py-0.5 rounded font-medium transition ${
            source === "simulated"
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          模拟
        </button>
        <button
          onClick={() => apiAvailable && onChange("real")}
          disabled={!apiAvailable}
          className={`px-2 py-0.5 rounded font-medium transition ${
            source === "real"
              ? "bg-blue-600 text-white"
              : apiAvailable
              ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
              : "bg-gray-50 text-gray-300 cursor-not-allowed"
          }`}
          title={apiAvailable === false ? "服务端未配置API Key" : undefined}
        >
          真实
        </button>
        {source === "real" && loading && <span className="text-gray-400">...</span>}
        {source === "real" && error && (
          <span className="text-amber-600">⚠</span>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500">数据源:</span>
          <button
            onClick={() => onChange("simulated")}
            className={`px-2.5 py-0.5 rounded text-[10px] font-medium transition ${
              source === "simulated"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            模拟数据
          </button>
          <button
            onClick={() => apiAvailable && onChange("real")}
            disabled={!apiAvailable}
            className={`px-2.5 py-0.5 rounded text-[10px] font-medium transition ${
              source === "real"
                ? "bg-blue-600 text-white"
                : apiAvailable
                ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                : "bg-gray-50 text-gray-300 cursor-not-allowed"
            }`}
            title={apiAvailable === false ? "服务端未配置API Key" : undefined}
          >
            真实数据 ({apiName})
          </button>
        </div>
        <div className="flex items-center gap-2">
          {apiAvailable === null && (
            <span className="text-[10px] text-gray-400">检查API状态...</span>
          )}
          {apiAvailable === false && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">
              API未配置
            </span>
          )}
          {source === "real" && loading && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
              查询中...
            </span>
          )}
          {source === "real" && !loading && !error && realDataCount !== undefined && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-green-50 text-green-600 border border-green-200">
              ✓ 真实数据 {realDataCount} 条
            </span>
          )}
          {source === "real" && error && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">
              ⚠ 降级: {error}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between text-[10px] text-gray-500">
        <div className="flex items-center gap-3">
          {simulatedCount !== undefined && (
            <span>模拟数据: {simulatedCount} 条</span>
          )}
          {realDataCount !== undefined && source === "real" && (
            <span>真实数据: {realDataCount} 条</span>
          )}
          {lastUpdate && <span>更新时间: {lastUpdate}</span>}
        </div>
        <span className="text-gray-400">
          {source === "simulated"
            ? "当前为模拟数据，仅供演示"
            : "数据来源: " + apiName}
        </span>
      </div>
    </div>
  );
}

/**
 * 数据源徽章（只读，用于详情页或卡片）
 */
export function DataSourceBadge({
  source,
  size = "sm",
}: {
  source: DataSource;
  size?: "xs" | "sm";
}) {
  const sizeClass = size === "xs" ? "text-[9px] px-1.5 py-0.5" : "text-[10px] px-2 py-0.5";
  if (source === "real") {
    return (
      <span className={`${sizeClass} rounded bg-green-50 text-green-600 border border-green-200`}>
        真实数据
      </span>
    );
  }
  return (
    <span className={`${sizeClass} rounded bg-gray-100 text-gray-500 border border-gray-200`}>
      模拟数据
    </span>
  );
}
