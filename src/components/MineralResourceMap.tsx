"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import {
  MINERAL_TYPE_ICONS,
  MINERAL_TYPE_COLORS,
  SCALE_LABELS,
  type MineralResource,
  type MineralType,
} from "@/lib/mineral-resource-data";
import SchematicMap, {
  type SchematicPoint,
  type SchematicMarker,
} from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

const MINERAL_CATEGORY_MAP: Record<MineralType, 0 | 1 | 2 | 3 | 4> = {
  iron: 0,
  copper: 0,
  gold: 0,
  limestone: 1,
  rare_earth: 1,
  coal: 2,
  oil: 2,
  natural_gas: 3,
};

const CATEGORY_LABEL_MAP: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "金属",
  1: "非金属",
  2: "能源",
  3: "水气",
  4: "其他",
};

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
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const { schematicPoints, schematicMarkers } = useMemo(() => {
    const points: SchematicPoint[] = [];
    const markers: SchematicMarker[] = [];

    if (minerals.length === 0) {
      return { schematicPoints: points, schematicMarkers: markers };
    }

    const reservesValues = minerals.map((m) => m.reserves);
    const minReserve = Math.min(...reservesValues);
    const maxReserve = Math.max(...reservesValues);
    const reserveRange = maxReserve - minReserve || 1;

    minerals.forEach((mineral) => {
      const category = MINERAL_CATEGORY_MAP[mineral.type] ?? 4;
      const normalizedReserve = (mineral.reserves - minReserve) / reserveRange;
      const r = 2 + normalizedReserve * 4;

      points.push({
        id: mineral.id,
        lng: mineral.lng,
        lat: mineral.lat,
        label: mineral.name,
        category,
        r,
        onClick: () => onMineralClick?.(mineral),
      });

      if (mineral.scale === "large") {
        markers.push({
          lng: mineral.lng,
          lat: mineral.lat,
          label: mineral.name,
          kind: 3,
        });
      }
    });

    return { schematicPoints: points, schematicMarkers: markers };
  }, [minerals, onMineralClick]);

  useEffect(() => {
    if (mode === "schematic") return;
    if (!mapRef.current || mapInstanceRef.current) return;
    if (!isAMapConfigured()) {
      setMapError("高德地图 API Key 未配置");
      return;
    }

    let cancelled = false;
    loadAMap()
      .then((AMap) => {
        if (cancelled || !mapRef.current || mapInstanceRef.current) return;
        const map = new AMap.Map(mapRef.current, {
          center,
          zoom,
          mapStyle: "amap://styles/light",
        });
        mapInstanceRef.current = map;
      })
      .catch((err) => {
        if (!cancelled) setMapError(err.message);
      });

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, mode]);

  useEffect(() => {
    if (mode === "schematic") return;
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
  }, [minerals, selectedId, onMineralClick, mode]);

  if (mode === "schematic") {
    const legend: Array<{ label: string; kind: "point"; category: 0 | 1 | 2 | 3 | 4 }> = [];
    const usedCategories = new Set(schematicPoints.map((p) => p.category ?? 4));
    (Array.from(usedCategories) as Array<0 | 1 | 2 | 3 | 4>).forEach((cat) => {
      legend.push({ label: CATEGORY_LABEL_MAP[cat], kind: "point", category: cat });
    });

    return (
      <SchematicMap
        width={800}
        height={500}
        points={schematicPoints}
        markers={schematicMarkers}
        legend={legend.length > 0 ? legend : undefined}
      />
    );
  }

  if (mode === "osm") {
    const legend: Array<{ label: string; kind: "point"; category: 0 | 1 | 2 | 3 | 4 }> = [];
    const usedCategories = new Set(schematicPoints.map((p) => p.category ?? 4));
    (Array.from(usedCategories) as Array<0 | 1 | 2 | 3 | 4>).forEach((cat) => {
      legend.push({ label: CATEGORY_LABEL_MAP[cat], kind: "point", category: cat });
    });

    return (
      <OsmMap
        width={800}
        height={500}
        points={schematicPoints}
        markers={schematicMarkers}
        legend={legend.length > 0 ? legend : undefined}
      />
    );
  }

  if (mapError) {
    return (
      <div className={`w-full ${height} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <span className="text-gray-400 text-xs">{mapError}</span>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200">
      <div ref={mapRef} className={`w-full ${height}`} />
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
