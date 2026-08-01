"use client";

import React from "react";
import { MapMode, useMapMode } from "@/context/MapModeContext";

const LABELS: Record<MapMode, string> = {
  schematic: "示意图",
  osm: "OSM免费底图",
  amap: "高德底图",
};

const SHORT: Record<MapMode, string> = {
  schematic: "示意",
  osm: "OSM",
  amap: "高德",
};

export interface MapModeSwitcherProps {
  compact?: boolean;
  showReason?: boolean;
  className?: string;
}

const MapModeSwitcher: React.FC<MapModeSwitcherProps> = ({
  compact = false,
  showReason = false,
  className = "",
}) => {
  const { mode, setMode, availableModes } = useMapMode();

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="inline-flex rounded-md border border-gray-200 bg-white overflow-hidden">
        {availableModes.map(({ mode: m, available, reason }) => {
          const active = m === mode;
          return (
            <button
              key={m}
              type="button"
              disabled={!available}
              title={showReason && !available && reason ? reason : `${LABELS[m]}${!available && reason ? "（" + reason + "）" : ""}`}
              onClick={() => available && setMode(m)}
              className={[
                "px-2 py-1 text-[10px] transition-colors",
                active
                  ? "bg-gray-800 text-white"
                  : available
                  ? "text-gray-600 hover:bg-gray-100"
                  : "text-gray-300 cursor-not-allowed",
              ].join(" ")}
            >
              {compact ? SHORT[m] : LABELS[m]}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MapModeSwitcher;
