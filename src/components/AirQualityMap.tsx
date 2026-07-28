"use client";

import { useEffect, useRef } from "react";
import { AQI_LEVELS, type AQIStation } from "@/lib/air-quality-data";

interface AirQualityMapProps {
  stations: AQIStation[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onStationClick?: (station: AQIStation) => void;
  selectedId?: string;
}

export default function AirQualityMap({
  stations,
  center,
  zoom = 10,
  height = "h-[500px]",
  onStationClick,
  selectedId,
}: AirQualityMapProps) {
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
      features: ["bg", "road", "building"],
    });
    mapInstanceRef.current = map;

    return () => {
      map.destroy();
      mapInstanceRef.current = null;
    };
  }, [center, zoom]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !stations.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    stations.forEach((station) => {
      const isSelected = selectedId === station.id;
      const level = AQI_LEVELS[station.level];
      const size = isSelected ? 44 : 34;

      const marker = new AMap.Marker({
        position: new AMap.LngLat(station.lng, station.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="
            width:${size}px;height:${size}px;border-radius:50%;
            background:${level.color};
            border:${isSelected ? 3 : 2}px solid white;
            box-shadow:0 2px 10px rgba(0,0,0,0.25);
            display:flex;align-items:center;justify-content:center;
            color:${station.level === "good" || station.level === "moderate" ? "#333" : "white"};
            font-weight:700;font-size:${isSelected ? 13 : 11}px;
            cursor:pointer;
            transition:all 0.2s;
          ">
            ${station.aqi}
          </div>
        `,
        zIndex: isSelected ? 200 : 100,
      });

      marker.on("click", () => onStationClick?.(station));
      map.add(marker);
      markersRef.current.push(marker);
    });

    const bounds = new AMap.Bounds(
      new AMap.LngLat(
        Math.min(...stations.map((s) => s.lng)),
        Math.min(...stations.map((s) => s.lat))
      ),
      new AMap.LngLat(
        Math.max(...stations.map((s) => s.lng)),
        Math.max(...stations.map((s) => s.lat))
      )
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [stations, selectedId, onStationClick]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200">
      <div ref={mapRef} className={`w-full ${height}`} />
      {/* 图例 */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-100">
        <div className="text-[10px] text-gray-500 mb-1.5 font-medium">AQI 等级</div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-1">
          {(Object.entries(AQI_LEVELS) as [string, typeof AQI_LEVELS[keyof typeof AQI_LEVELS]][]).map(
            ([key, level]) => (
              <div key={key} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: level.color }}
                />
                <span className="text-[9px] text-gray-600">{level.label}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
