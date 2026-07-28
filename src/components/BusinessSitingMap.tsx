"use client";

import { useEffect, useRef } from "react";
import type { LocationScore } from "@/lib/business-siting-data";

interface BusinessSitingMapProps {
  locations: LocationScore[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onLocationClick?: (location: LocationScore) => void;
  selectedId?: string;
}

function scoreToColor(score: number): string {
  if (score >= 85) return "#10b981";
  if (score >= 70) return "#84cc16";
  if (score >= 55) return "#eab308";
  if (score >= 40) return "#f97316";
  return "#ef4444";
}

export default function BusinessSitingMap({
  locations,
  center,
  zoom = 13,
  height = "h-[500px]",
  onLocationClick,
  selectedId,
}: BusinessSitingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const AMap = (window as any).AMap;
    if (!AMap) return;

    const map = new AMap.Map(mapRef.current, {
      center,
      zoom,
      mapStyle: "amap://styles/light",
    });
    mapInstanceRef.current = map;

    return () => {
      map.destroy();
      mapInstanceRef.current = null;
    };
  }, [center, zoom]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !locations.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    locations.forEach((loc) => {
      const isSelected = selectedId === loc.id;
      const color = scoreToColor(loc.overallScore);
      const size = isSelected ? 40 : 28 + (loc.overallScore / 100) * 12;

      const marker = new AMap.Marker({
        position: new AMap.LngLat(loc.lng, loc.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="
            width:${size}px;height:${size}px;border-radius:50%;
            background:${color};
            border:${isSelected ? 3 : 2}px solid white;
            box-shadow:0 2px 8px rgba(0,0,0,0.2);
            display:flex;align-items:center;justify-content:center;
            color:white;font-weight:700;font-size:${isSelected ? 13 : 11}px;
            cursor:pointer;
            transition:all 0.2s;
          ">
            ${loc.overallScore}
          </div>
        `,
        zIndex: isSelected ? 200 : Math.round(loc.overallScore),
      });

      marker.on("click", () => onLocationClick?.(loc));
      marker.on("mouseover", () => {
        marker.setzIndex(150);
      });

      map.add(marker);
      markersRef.current.push(marker);
    });

    const bounds = new AMap.Bounds(
      new AMap.LngLat(
        Math.min(...locations.map((l) => l.lng)),
        Math.min(...locations.map((l) => l.lat))
      ),
      new AMap.LngLat(
        Math.max(...locations.map((l) => l.lng)),
        Math.max(...locations.map((l) => l.lat))
      )
    );
    map.setBounds(bounds, [50, 50, 50, 50], false);
  }, [locations, selectedId, onLocationClick]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200">
      <div ref={mapRef} className={`w-full ${height}`} />
      {/* 图例 */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-100">
        <div className="text-[10px] text-gray-500 mb-1.5">综合评分</div>
        <div className="flex items-center gap-1">
          {[
            { s: "≥85", c: "#10b981" },
            { s: "70-84", c: "#84cc16" },
            { s: "55-69", c: "#eab308" },
            { s: "40-54", c: "#f97316" },
            { s: "<40", c: "#ef4444" },
          ].map((item) => (
            <div key={item.s} className="flex flex-col items-center">
              <div
                className="w-3.5 h-3.5 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: item.c }}
              />
              <span className="text-[8px] text-gray-500 mt-0.5">{item.s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
