"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import {
  LAND_USE_COLORS,
  LAND_USE_LABELS,
  type LandUsePatch,
  type LandUseType,
} from "@/lib/land-use-resource-data";
import SchematicMap, {
  type SchematicPolygon,
} from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

const LAND_USE_SHADE_MAP: Record<LandUseType, 100 | 200 | 300 | 400 | 500 | 600> = {
  cultivated: 300,
  forest: 300,
  grassland: 200,
  water: 200,
  urban: 600,
  rural: 400,
  industrial: 400,
  transport: 400,
  other: 400,
};

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
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const polygonsRef = useRef<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const { schematicPolygons, legendItems } = useMemo(() => {
    const polygons: SchematicPolygon[] = [];
    const presentTypes = new Set<LandUseType>();

    patches.forEach((patch) => {
      presentTypes.add(patch.type);
      polygons.push({
        id: patch.id,
        path: patch.path.map(([lng, lat]) => ({ lng, lat })),
        label: patch.name,
        shade: LAND_USE_SHADE_MAP[patch.type],
        opacity: 0.6,
        onClick: () => onPatchClick?.(patch),
      });
    });

    const legend = Array.from(presentTypes).map((type) => ({
      label: LAND_USE_LABELS[type],
      kind: "area" as const,
      shade: LAND_USE_SHADE_MAP[type],
    }));

    return { schematicPolygons: polygons, legendItems: legend };
  }, [patches, onPatchClick]);

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
  }, [patches, selectedId, onPatchClick, mode]);

  if (mode === "schematic") {
    return (
      <SchematicMap
        width={800}
        height={500}
        polygons={schematicPolygons}
        legend={legendItems}
      />
    );
  }

  if (mode === "osm") {
    return (
      <OsmMap
        width={800}
        height={500}
        polygons={schematicPolygons}
        legend={legendItems}
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
