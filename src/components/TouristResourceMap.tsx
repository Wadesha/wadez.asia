"use client";

import { useEffect, useRef } from "react";
import {
  TOURIST_TYPE_ICONS,
  TOURIST_TYPE_COLORS,
  type TouristResource,
} from "@/lib/tourist-resource-data";

interface TouristResourceMapProps {
  resources: TouristResource[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onResourceClick?: (resource: TouristResource) => void;
  selectedId?: string;
}

export default function TouristResourceMap({
  resources,
  center,
  zoom = 11,
  height = "h-[500px]",
  onResourceClick,
  selectedId,
}: TouristResourceMapProps) {
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
    if (!map || !resources.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    resources.forEach((res) => {
      const isSelected = selectedId === res.id;
      const color = TOURIST_TYPE_COLORS[res.type];
      const size = isSelected ? 46 : 38;
      const hasBadge = res.level !== "none";

      const marker = new AMap.Marker({
        position: new AMap.LngLat(res.lng, res.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="position:relative;cursor:pointer;">
            <div style="
              width:${size}px;height:${size}px;
              background:${color};
              border-radius:12px;
              border:${isSelected ? 3 : 2}px solid white;
              box-shadow:0 3px 10px rgba(0,0,0,0.2);
              display:flex;align-items:center;justify-content:center;
              font-size:${isSelected ? 22 : 18}px;
              transition:all 0.2s;
            ">
              ${TOURIST_TYPE_ICONS[res.type]}
            </div>
            ${hasBadge ? `
              <div style="
                position:absolute;
                top:-4px;right:-4px;
                background:#fbbf24;
                color:#78350f;
                font-size:9px;
                font-weight:bold;
                padding:1px 4px;
                border-radius:6px;
                border:1.5px solid white;
              ">
                ${res.level}
              </div>
            ` : ""}
          </div>
        `,
        zIndex: isSelected ? 200 : 100,
      });

      marker.on("click", () => onResourceClick?.(res));
      map.add(marker);
      markersRef.current.push(marker);
    });

    const bounds = new AMap.Bounds(
      new AMap.LngLat(
        Math.min(...resources.map((r) => r.lng)),
        Math.min(...resources.map((r) => r.lat))
      ),
      new AMap.LngLat(
        Math.max(...resources.map((r) => r.lng)),
        Math.max(...resources.map((r) => r.lat))
      )
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [resources, selectedId, onResourceClick]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200">
      <div ref={mapRef} className={`w-full ${height}`} />
      {/* 图例 */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-100">
        <div className="text-[10px] text-gray-500 mb-1.5 font-medium">资源类型</div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-1">
          {(Object.entries(TOURIST_TYPE_ICONS) as [string, string][]).map(([key, icon]) => (
            <div key={key} className="flex items-center gap-1">
              <span className="text-[11px]">{icon}</span>
              <span className="text-[9px] text-gray-600">
                {{
                  scenic: "自然风光",
                  historical: "历史古迹",
                  cultural: "文化艺术",
                  nature: "自然生态",
                  food: "美食街区",
                  entertainment: "娱乐休闲",
                }[key as keyof typeof TOURIST_TYPE_COLORS]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
