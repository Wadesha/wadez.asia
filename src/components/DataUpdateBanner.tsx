"use client";

import { useState } from "react";
import { type FreshnessResult } from "@/lib/auto-update";

interface DataUpdateBannerProps {
  result: FreshnessResult;
  className?: string;
}

export default function DataUpdateBanner({
  result,
  className = "",
}: DataUpdateBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || result.status === "fresh") {
    return null;
  }

  const isExpired = result.status === "expired";

  return (
    <div
      className={`w-full ${
        isExpired
          ? "bg-gray-100 border-gray-300"
          : "bg-gray-50 border-gray-200"
      } border rounded-lg px-3 py-2 flex items-center justify-between ${className}`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isExpired ? "bg-gray-600" : "bg-gray-400"
          }`}
        />
        <span
          className={`text-[11px] ${
            isExpired
              ? "text-gray-700 font-medium"
              : "text-gray-500"
          }`}
        >
          {result.message}
        </span>
        {result.status === "expiring-soon" && (
          <span className="text-[10px] text-gray-400">
            (已更新 {Math.round(result.hoursElapsed)} 小时前)
          </span>
        )}
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-gray-400 hover:text-gray-600 text-xs leading-none px-1"
        aria-label="关闭"
      >
        x
      </button>
    </div>
  );
}
