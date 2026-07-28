"use client";

import { useEffect, useRef } from "react";
import {
  INDUSTRY_TYPE_COLORS,
  INDUSTRY_TYPE_ICONS,
  LEVEL_LABELS,
  type IndustryPark,
} from "@/lib/industry-park-data";

interface IndustryParkMapProps {
  parks: IndustryPark[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onParkClick?: (park: IndustryPark) => void;
  selectedId?: string;
}

export default function IndustryParkMap({
  parks,
  center,
  zoom = 11,
  height = "h-[500px]",
  onParkClick,
  selectedId,
}: IndustryParkMapProps) {
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
    if (!map || !parks.length) return;

    overlaysRef.current.forEach((o) => map.remove(o));
    overlaysRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    parks.forEach((park) => {
      const isSelected = selectedId === park.id;
      const color = INDUSTRY_TYPE_COLORS[park.type];
      const radius = Math.sqrt(park.areaSqKm) * 800;

      // 范围圈
      const circle = new AMap.Circle({
        center: new AMap.LngLat(park.lng, park.lat),
        radius,
        strokeColor: color,
        strokeWeight: isSelected ? 3 : 2,
        strokeOpacity: 0.7,
        strokeStyle: park.level === "national" ? "solid" : park.level === "provincial" ? "dashed" : "dotted",
        fillColor: color,
        fillOpacity: isSelected ? 0.2 : 0.1,
        cursor: "pointer",
        zIndex: isSelected ? 15 : 5,
      });
      circle.on("click", () => onParkClick?.(park));
      map.add(circle);
      overlaysRef.current.push(circle);

      // 中心标记
      const size = isSelected ? 44 : 34;
      const levelBadge = LEVEL_LABELS[park.level].label.charAt(0);
      const marker = new AMap.Marker({
        position: new AMap.LngLat(park.lng, park.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="
            width:${size}px;height:${size}px;
            background:${color};
            border:3px solid white;
            border-radius:50%;
            box-shadow:0 3px 12px rgba(0,0,0,0.25);
            display:flex;align-items:center;justify-content:center;
            font-size:${isSelected ? 18 : 14}px;
            cursor:pointer;
            position:relative;
            transition:all 0.2s;
          ">
            ${INDUSTRY_TYPE_ICONS[park.type]}
            <div style="
              position:absolute;
              top:-4px;right:-4px;
              background:${LEVEL_LABELS[park.level].color};
              color:white;
              font-size:9px;
              font-weight:bold;
              padding:1px 4px;
              border-radius:6px;
              border:1.5px solid white;
            ">
              ${levelBadge}
            </div>
          </div>
        `,
        zIndex: isSelected ? 25 : 15,
      });
      marker.on("click", () => onParkClick?.(park));
      map.add(marker);
      overlaysRef.current.push(marker);
    });

    const lngs = parks.map((p) => p.lng);
    const lats = parks.map((p) => p.lat);
    const bounds = new AMap.Bounds(
      new AMap.LngLat(Math.min(...lngs), Math.min(...lats)),
      new AMap.LngLat(Math.max(...lngs), Math.max(...lats))
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [parks, selectedId, onParkClick]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200">
      <div ref={mapRef} className={`w-full ${height}`} />
      {/* 图例 */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-100">
        <div className="text-[10px] text-gray-500 mb-1.5 font-medium">产业类型</div>
        <div className="grid grid-cols-4 gap-x-2 gap-y-1">
          {(Object.entries(INDUSTRY_TYPE_ICONS) as [string, string][]).map(([key, icon]) => (
            <div key={key} className="flex items-center gap-1">
              <span className="text-[11px]">{icon}</span>
              <span className="text-[9px] text-gray-600">
                {{
                  high_tech: "高新",
                  manufacturing: "制造",
                  biomedicine: "医药",
                  new_energy: "能源",
                  finance: "金融",
                  cultural_creative: "文创",
                  logistics: "物流",
                  automotive: "汽车",
                }[key as keyof typeof INDUSTRY_TYPE_COLORS]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
