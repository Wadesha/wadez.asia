"use client";

import { useEffect, useRef } from "react";
import {
  LAND_USE_COLORS,
  type LandUsePatch,
} from "@/lib/land-use-resource-data";

interface LandUseMapProps {
  patches: LandUsePatch[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onPatchClick?: (patch: LandUsePatch) => void;
  selectedId?: string;
}

export default function LandUseMap({
  patches,
  center,
  zoom = 9,
  height = "h-[500px]",
  onPatchClick,
  selectedId,
}: LandUseMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const polygonsRef = useRef<any[]>([]);

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
    if (!map || !patches.length) return;

    polygonsRef.current.forEach((p) => map.remove(p));
    polygonsRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    patches.forEach((patch) => {
      const isSelected = selectedId === patch.id;
      const color = LAND_USE_COLORS[patch.type];

      const polygon = new AMap.Polygon({
        path: patch.path.map((p: [number, number]) => new AMap.LngLat(p[0], p[1])),
        strokeColor: isSelected ? "#1e40af" : "#ffffff",
        strokeWeight: isSelected ? 3 : 1,
        strokeOpacity: 0.8,
        fillColor: color,
        fillOpacity: isSelected ? 0.75 : 0.55,
        cursor: "pointer",
        zIndex: isSelected ? 50 : 10,
      });

      polygon.on("click", () => onPatchClick?.(patch));
      map.add(polygon);
      polygonsRef.current.push(polygon);
    });

    const lngs = patches.flatMap((p) => p.path.map((pt) => pt[0]));
    const lats = patches.flatMap((p) => p.path.map((pt) => pt[1]));
    const bounds = new AMap.Bounds(
      new AMap.LngLat(Math.min(...lngs), Math.min(...lats)),
      new AMap.LngLat(Math.max(...lngs), Math.max(...lats))
    );
    map.setBounds(bounds, [40, 40, 40, 40], false);
  }, [patches, selectedId, onPatchClick]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200">
      <div ref={mapRef} className={`w-full ${height}`} />
      {/* 图例 */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-100">
        <div className="text-[10px] text-gray-500 mb-1.5 font-medium">用地类型</div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-1">
          {(Object.entries(LAND_USE_COLORS) as [string, string][]).map(([key, color]) => (
            <div key={key} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-sm border border-white"
                style={{ backgroundColor: color }}
              />
              <span className="text-[9px] text-gray-600">
                {{
                  cultivated: "耕地",
                  forest: "林地",
                  grassland: "草地",
                  water: "水域",
                  urban: "城镇",
                  rural: "农村",
                  industrial: "工矿",
                  transport: "交通",
                  other: "其他",
                }[key as keyof typeof LAND_USE_COLORS]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
