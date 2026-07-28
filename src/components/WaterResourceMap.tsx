"use client";

import { useEffect, useRef } from "react";
import {
  WATER_TYPE_COLORS,
  WATER_TYPE_ICONS,
  type WaterResource,
} from "@/lib/water-resource-data";

interface WaterResourceMapProps {
  resources: WaterResource[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onResourceClick?: (resource: WaterResource) => void;
  selectedId?: string;
}

export default function WaterResourceMap({
  resources,
  center,
  zoom = 8,
  height = "h-[500px]",
  onResourceClick,
  selectedId,
}: WaterResourceMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const overlaysRef = useRef<any[]>([]);

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
    if (!map || !resources.length) return;

    overlaysRef.current.forEach((o) => map.remove(o));
    overlaysRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    let allLngs: number[] = [];
    let allLats: number[] = [];

    resources.forEach((res) => {
      const isSelected = selectedId === res.id;

      if (res.type === "river" && res.path) {
        const line = new AMap.Polyline({
          path: res.path.map((p: [number, number]) => new AMap.LngLat(p[0], p[1])),
          strokeColor: WATER_TYPE_COLORS.river,
          strokeWeight: isSelected ? 6 : 3,
          strokeOpacity: 0.8,
          lineJoin: "round",
          cursor: "pointer",
          zIndex: isSelected ? 30 : 10,
        });
        line.on("click", () => onResourceClick?.(res));
        map.add(line);
        overlaysRef.current.push(line);
        res.path.forEach((p) => {
          allLngs.push(p[0]);
          allLats.push(p[1]);
        });
      } else if (res.type === "lake" || res.type === "reservoir") {
        const radius = res.type === "lake"
          ? Math.sqrt((res.areaSqKm || 10) / Math.PI) * 1000
          : Math.sqrt((res.capacityM3 || 10000000) / 10000000) * 2000;
        const circle = new AMap.Circle({
          center: new AMap.LngLat(res.lng, res.lat),
          radius,
          strokeColor: WATER_TYPE_COLORS[res.type],
          strokeWeight: isSelected ? 3 : 1,
          strokeOpacity: 0.8,
          fillColor: WATER_TYPE_COLORS[res.type],
          fillOpacity: 0.5,
          cursor: "pointer",
          zIndex: isSelected ? 25 : 5,
        });
        circle.on("click", () => onResourceClick?.(res));
        map.add(circle);
        overlaysRef.current.push(circle);
        allLngs.push(res.lng);
        allLats.push(res.lat);
      } else {
        const size = isSelected ? 36 : 26;
        const marker = new AMap.Marker({
          position: new AMap.LngLat(res.lng, res.lat),
          offset: new AMap.Pixel(-size / 2, -size / 2),
          content: `
            <div style="
              width:${size}px;height:${size}px;
              background:white;
              border:${isSelected ? 3 : 2}px solid ${WATER_TYPE_COLORS[res.type]};
              border-radius:50%;
              box-shadow:0 2px 8px rgba(0,0,0,0.2);
              display:flex;align-items:center;justify-content:center;
              font-size:${isSelected ? 16 : 13}px;
              cursor:pointer;
              transition:all 0.2s;
            ">
              ${WATER_TYPE_ICONS[res.type]}
            </div>
          `,
          zIndex: isSelected ? 50 : 20,
        });
        marker.on("click", () => onResourceClick?.(res));
        map.add(marker);
        overlaysRef.current.push(marker);
        allLngs.push(res.lng);
        allLats.push(res.lat);
      }
    });

    if (allLngs.length > 0) {
      const bounds = new AMap.Bounds(
        new AMap.LngLat(Math.min(...allLngs), Math.min(...allLats)),
        new AMap.LngLat(Math.max(...allLngs), Math.max(...allLats))
      );
      map.setBounds(bounds, [50, 50, 50, 50], false);
    }
  }, [resources, selectedId, onResourceClick]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200">
      <div ref={mapRef} className={`w-full ${height}`} />
      {/* 图例 */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-100">
        <div className="text-[10px] text-gray-500 mb-1.5 font-medium">资源类型</div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-1">
          {(Object.entries(WATER_TYPE_ICONS) as [string, string][]).map(([key, icon]) => (
            <div key={key} className="flex items-center gap-1">
              <span className="text-[11px]">{icon}</span>
              <span className="text-[9px] text-gray-600">
                {{
                  river: "河流",
                  lake: "湖泊",
                  reservoir: "水库",
                  hydrological_station: "水文站",
                  waterfall: "瀑布",
                  spring: "泉眼",
                }[key as keyof typeof WATER_TYPE_COLORS]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
