"use client";

import { useEffect, useRef } from "react";
import { ECON_METRICS, type RegionEconData, type EconMetricKey } from "@/lib/economic-data";

interface EconDataMapProps {
  regions: RegionEconData[];
  center: [number, number];
  zoom?: number;
  height?: string;
  metric: EconMetricKey;
  onRegionClick?: (region: RegionEconData) => void;
  selectedId?: string;
}

function getValueColor(value: number, max: number, min: number): string {
  const ratio = max === min ? 0.5 : (value - min) / (max - min);
  const colors = [
    "#f0f9ff", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9",
    "#0284c7", "#0369a1", "#075985", "#0c4a6e",
  ];
  const idx = Math.min(colors.length - 1, Math.floor(ratio * colors.length));
  return colors[idx];
}

export default function EconDataMap({
  regions,
  center,
  zoom = 4,
  height = "h-[500px]",
  metric,
  onRegionClick,
  selectedId,
}: EconDataMapProps) {
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
    if (!map || !regions.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    const values = regions.map((r) => r[metric] as number);
    const max = Math.max(...values);
    const min = Math.min(...values);

    regions.forEach((region) => {
      const isSelected = selectedId === region.id;
      const value = region[metric] as number;
      const color = getValueColor(value, max, min);
      const ratio = max === min ? 0.5 : (value - min) / (max - min);
      const size = 20 + ratio * 60;

      const marker = new AMap.Marker({
        position: new AMap.LngLat(region.lng, region.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="
            width:${size}px;height:${size}px;
            background:${color};
            border:${isSelected ? 3 : 2}px solid white;
            border-radius:50%;
            box-shadow:0 2px 10px rgba(0,0,0,0.2);
            display:flex;align-items:center;justify-content:center;
            color:white;
            font-weight:700;
            font-size:${size > 40 ? 11 : 9}px;
            cursor:pointer;
            transition:all 0.2s;
            opacity:${isSelected ? 1 : 0.85};
          ">
            ${region.name}
          </div>
        `,
        zIndex: isSelected ? 200 : Math.round(ratio * 100),
      });

      marker.on("click", () => onRegionClick?.(region));
      map.add(marker);
      markersRef.current.push(marker);
    });

    const lngs = regions.map((r) => r.lng);
    const lats = regions.map((r) => r.lat);
    const bounds = new AMap.Bounds(
      new AMap.LngLat(Math.min(...lngs), Math.min(...lats)),
      new AMap.LngLat(Math.max(...lngs), Math.max(...lats))
    );
    map.setBounds(bounds, [80, 40, 40, 40], false);
  }, [regions, metric, selectedId, onRegionClick]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200">
      <div ref={mapRef} className={`w-full ${height}`} />
      {/* 图例 */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-100">
        <div className="text-[10px] text-gray-500 mb-1.5 font-medium">
          {ECON_METRICS[metric].label}
        </div>
        <div className="flex items-center gap-0.5">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const values = regions.map((r) => r[metric] as number);
            const max = Math.max(...values);
            const min = Math.min(...values);
            const v = min + (max - min) * (i / 6);
            return (
              <div
                key={i}
                className="w-6 h-3"
                style={{ backgroundColor: getValueColor(v, max, min) }}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-[8px] text-gray-400 mt-0.5">
          <span>低</span>
          <span>高</span>
        </div>
      </div>
    </div>
  );
}
