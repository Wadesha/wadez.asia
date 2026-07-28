"use client";

import { useEffect, useRef } from "react";
import {
  MINERAL_TYPE_ICONS,
  MINERAL_TYPE_COLORS,
  SCALE_LABELS,
  type MineralResource,
} from "@/lib/mineral-resource-data";

interface MineralResourceMapProps {
  minerals: MineralResource[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onMineralClick?: (mineral: MineralResource) => void;
  selectedId?: string;
}

export default function MineralResourceMap({
  minerals,
  center,
  zoom = 7,
  height = "h-[500px]",
  onMineralClick,
  selectedId,
}: MineralResourceMapProps) {
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
    if (!map || !minerals.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    minerals.forEach((mineral) => {
      const isSelected = selectedId === mineral.id;
      const color = MINERAL_TYPE_COLORS[mineral.type];
      const sizeMap = { large: 44, medium: 34, small: 26 };
      const size = isSelected ? sizeMap[mineral.scale] + 10 : sizeMap[mineral.scale];

      const marker = new AMap.Marker({
        position: new AMap.LngLat(mineral.lng, mineral.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="
            width:${size}px;height:${size}px;
            background:${color};
            border-radius:${mineral.scale === "large" ? "10px" : mineral.scale === "medium" ? "8px" : "6px"};
            border:${isSelected ? 3 : 2}px solid white;
            box-shadow:0 3px 10px rgba(0,0,0,0.25);
            display:flex;align-items:center;justify-content:center;
            font-size:${isSelected ? 20 : 16}px;
            cursor:pointer;
            transition:all 0.2s;
            transform:rotate(${isSelected ? "5deg" : "0deg"});
          ">
            ${MINERAL_TYPE_ICONS[mineral.type]}
          </div>
        `,
        zIndex: isSelected ? 200 : 100,
      });

      marker.on("click", () => onMineralClick?.(mineral));
      map.add(marker);
      markersRef.current.push(marker);
    });

    const lngs = minerals.map((m) => m.lng);
    const lats = minerals.map((m) => m.lat);
    const bounds = new AMap.Bounds(
      new AMap.LngLat(Math.min(...lngs), Math.min(...lats)),
      new AMap.LngLat(Math.max(...lngs), Math.max(...lats))
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [minerals, selectedId, onMineralClick]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200">
      <div ref={mapRef} className={`w-full ${height}`} />
      {/* 图例 */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-100">
        <div className="text-[10px] text-gray-500 mb-1.5 font-medium">矿产类型</div>
        <div className="grid grid-cols-4 gap-x-2 gap-y-1">
          {(Object.entries(MINERAL_TYPE_ICONS) as [string, string][]).map(([key, icon]) => (
            <div key={key} className="flex items-center gap-1">
              <span className="text-[11px]">{icon}</span>
              <span className="text-[9px] text-gray-600">
                {{
                  coal: "煤炭",
                  iron: "铁矿",
                  copper: "铜矿",
                  gold: "金矿",
                  rare_earth: "稀土",
                  natural_gas: "天然气",
                  oil: "石油",
                  limestone: "石灰石",
                }[key as keyof typeof MINERAL_TYPE_COLORS]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-1.5 pt-1.5 border-t border-gray-100">
          <div className="text-[10px] text-gray-500 mb-1">规模</div>
          <div className="flex items-center gap-2">
            {(["large", "medium", "small"] as const).map((s) => (
              <div key={s} className="flex items-center gap-1">
                <div
                  className="bg-gray-500 border border-white"
                  style={{
                    width: s === "large" ? 12 : s === "medium" ? 9 : 6,
                    height: s === "large" ? 12 : s === "medium" ? 9 : 6,
                    borderRadius: 2,
                  }}
                />
                <span className="text-[9px] text-gray-600">{SCALE_LABELS[s]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
