"use client";

import { useRef, useState, useEffect } from "react";

interface BusLine {
  name: string;
  fromStation: string;
  toStation: string;
  distance: number;
  city: string;
}

interface LineMarqueeProps {
  lines: BusLine[];
  title?: string;
  speed?: "slow" | "normal" | "fast";
  theme?: "light" | "dark";
}

export default function LineMarquee({
  lines,
  title = "公交线路",
  speed = "normal",
  theme = "light",
}: LineMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const speedMap = {
    slow: 60,
    normal: 40,
    fast: 20,
  };

  const duration = Math.max(speedMap[speed], lines.length * 1.5);

  if (lines.length === 0) {
    return null;
  }

  const bgClass = theme === "dark"
    ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white"
    : "bg-white/95 backdrop-blur-md border border-gray-100 text-gray-900";

  const cardBgClass = theme === "dark"
    ? "bg-white/10 border-white/20"
    : "bg-white border-gray-100 shadow-sm";

  const labelClass = theme === "dark"
    ? "bg-blue-500/30 text-blue-200"
    : "bg-blue-100 text-blue-600";

  const subTextClass = theme === "dark" ? "text-gray-400" : "text-gray-400";

  return (
    <div
      className={`${bgClass} rounded-2xl p-4 overflow-hidden`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <span className="text-sm font-semibold">{title}</span>
        </div>
        <span className={`text-xs ${subTextClass}`}>
          共 {lines.length} 条
        </span>
      </div>

      <div className="overflow-hidden relative">
        <div
          ref={trackRef}
          className="flex gap-3 whitespace-nowrap"
          style={{
            animation: `marquee ${duration}s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {[...lines, ...lines].map((line, idx) => (
            <div
              key={`${line.name}-${idx}`}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl border ${cardBgClass} transition hover:scale-105 cursor-pointer min-w-[180px]`}
            >
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${labelClass}`}>
                  {line.city}
                </span>
                <span className="text-sm font-bold truncate max-w-[100px]">
                  {line.name}
                </span>
              </div>
              <div className={`text-xs mt-1.5 truncate ${subTextClass}`}>
                {line.fromStation || "起点"} → {line.toStation || "终点"}
                {line.distance > 0 && (
                  <>
                    <span className="mx-1.5">·</span>
                    <span>{line.distance}km</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          className={`absolute top-0 left-0 w-12 h-full pointer-events-none ${
            theme === "dark"
              ? "bg-gradient-to-r from-slate-900 to-transparent"
              : "bg-gradient-to-r from-white to-transparent"
          }`}
        />
        <div
          className={`absolute top-0 right-0 w-12 h-full pointer-events-none ${
            theme === "dark"
              ? "bg-gradient-to-l from-slate-800 to-transparent"
              : "bg-gradient-to-l from-white to-transparent"
          }`}
        />
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
