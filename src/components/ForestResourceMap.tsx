"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import {
  FOREST_TYPE_COLORS,
  FOREST_TYPE_LABELS,
  type ForestArea,
  type ForestType,
} from "@/lib/forest-resource-data";
import SchematicMap, {
  type SchematicPoint,
  type SchematicPolygon,
} from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

const FOREST_TYPE_ORDER: ForestType[] = ["natural", "plantation", "protection", "economic"];
const SHADE_CYCLE: Array<300 | 400 | 500> = [300, 400, 500];

interface ForestResourceMapProps {
  forests: ForestArea[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onForestClick?: (forest: ForestArea) => void;
  selectedId?: string;
}

export default function ForestResourceMap({
  forests,
  center,
  zoom = 9,
  height = "h-[500px]",
  onForestClick,
  selectedId,
}: ForestResourceMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const circlesRef = useRef<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const { schematicPoints, schematicPolygons } = useMemo(() => {
    const points: SchematicPoint[] = [];
    const polygons: SchematicPolygon[] = [];

    forests.forEach((forest) => {
      const typeIdx = FOREST_TYPE_ORDER.indexOf(forest.type);
      const shade = SHADE_CYCLE[typeIdx % SHADE_CYCLE.length];

      const radiusDeg = Math.max(0.008, Math.min(0.03, (forest.area * 6) / 111000));
      const sides = 20;
      const path: Array<{ lng: number; lat: number }> = [];
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2;
        path.push({
          lng: forest.lng + Math.cos(angle) * radiusDeg,
          lat: forest.lat + Math.sin(angle) * radiusDeg * 0.8,
        });
      }
      polygons.push({
        id: forest.id,
        path,
        label: forest.name,
        shade,
        opacity: 0.65,
        onClick: () => onForestClick?.(forest),
      });

      if (forest.type === "protection" || forest.protectionLevel) {
        points.push({
          id: forest.id,
          lng: forest.lng,
          lat: forest.lat,
          label: forest.name,
          category: 2,
          r: 3,
          onClick: () => onForestClick?.(forest),
        });
      }
    });

    return { schematicPoints: points, schematicPolygons: polygons };
  }, [forests, onForestClick]);

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
          mapStyle: "amap://styles/whitesmoke",
          features: ["bg", "road", "building"],
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
    if (!map || !forests.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];
    circlesRef.current.forEach((c) => map.remove(c));
    circlesRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    forests.forEach((forest) => {
      const isSelected = selectedId === forest.id;
      const color = FOREST_TYPE_COLORS[forest.type];
      const size = isSelected ? 44 : 32;

      const radius = Math.max(800, Math.min(3000, forest.area * 6));
      const circle = new AMap.Circle({
        center: [forest.lng, forest.lat],
        radius,
        strokeColor: color,
        strokeWeight: isSelected ? 2 : 1,
        strokeOpacity: 0.6,
        fillColor: color,
        fillOpacity: isSelected ? 0.4 : 0.25,
        zIndex: isSelected ? 90 : 50,
      });
      map.add(circle);
      circlesRef.current.push(circle);

      const marker = new AMap.Marker({
        position: new AMap.LngLat(forest.lng, forest.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="
            width:${size}px;height:${size}px;border-radius:50%;
            background:${color};
            border:${isSelected ? 3 : 2}px solid white;
            box-shadow:0 2px 10px rgba(0,0,0,0.3);
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            color:white;font-weight:700;
            cursor:pointer;
            transition:all 0.2s;
          ">
            <span style="font-size:${isSelected ? 13 : 10}px;line-height:1;">${forest.coverage}%</span>
          </div>
        `,
        zIndex: isSelected ? 200 : 100,
      });

      marker.on("click", () => onForestClick?.(forest));
      map.add(marker);
      markersRef.current.push(marker);
    });

    const bounds = new AMap.Bounds(
      new AMap.LngLat(
        Math.min(...forests.map((f) => f.lng)) - 0.05,
        Math.min(...forests.map((f) => f.lat)) - 0.05
      ),
      new AMap.LngLat(
        Math.max(...forests.map((f) => f.lng)) + 0.05,
        Math.max(...forests.map((f) => f.lat)) + 0.05
      )
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [forests, selectedId, onForestClick, mode]);

  const legendItems: { type: ForestType; color: string; label: string }[] = [
    { type: "natural", color: FOREST_TYPE_COLORS.natural, label: FOREST_TYPE_LABELS.natural },
    { type: "plantation", color: FOREST_TYPE_COLORS.plantation, label: FOREST_TYPE_LABELS.plantation },
    { type: "protection", color: FOREST_TYPE_COLORS.protection, label: FOREST_TYPE_LABELS.protection },
    { type: "economic", color: FOREST_TYPE_COLORS.economic, label: FOREST_TYPE_LABELS.economic },
  ];

  if (mode === "schematic") {
    return (
      <SchematicMap
        width={800}
        height={500}
        points={schematicPoints}
        polygons={schematicPolygons}
        legend={[
          { label: "林地", kind: "area", shade: 300 },
          { label: "保护地", kind: "point", category: 2 },
        ]}
      />
    );
  }

  if (mode === "osm") {
    return (
      <OsmMap
        width={800}
        height={500}
        points={schematicPoints}
        polygons={schematicPolygons}
        legend={[
          { label: "林地", kind: "area", shade: 300 },
          { label: "保护地", kind: "point", category: 2 },
        ]}
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
    <div className="relative rounded-xl overflow-hidden border border-gray-300">
      <div ref={mapRef} className={`w-full ${height}`} />
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-300">
        <div className="text-[10px] text-gray-700 mb-1.5 font-medium">林地类型</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {legendItems.map((item) => (
            <div key={item.type} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[9px] text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-300">
        <div className="text-[10px] text-gray-700 font-medium">圆圈半径 = 林地面积</div>
        <div className="text-[9px] text-gray-500 mt-0.5">数字 = 森林覆盖率%</div>
      </div>
    </div>
  );
}
