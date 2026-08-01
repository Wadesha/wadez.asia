"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import {
  MARINE_TYPE_LABELS,
  MARINE_TYPE_ICONS,
  type MarineResource,
  type MarineResourceType,
} from "@/lib/marine-resource-data";
import SchematicMap, {
  type SchematicPoint,
  type SchematicPolyline,
  type SchematicPolygon,
} from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

const TYPE_COLORS: Record<MarineResourceType, string> = {
  coastline: "#0891b2",
  island: "#0d9488",
  wetland: "#0284c7",
  fishery: "#16a34a",
  port: "#ea580c",
};

interface MarineResourceMapProps {
  resources: MarineResource[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onResourceClick?: (resource: MarineResource) => void;
  selectedId?: string;
}

export default function MarineResourceMap({
  resources,
  center,
  zoom = 9,
  height = "h-[500px]",
  onResourceClick,
  selectedId,
}: MarineResourceMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const circlesRef = useRef<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const { schematicPoints, schematicPolylines, schematicPolygons } = useMemo(() => {
    const points: SchematicPoint[] = [];
    const polylines: SchematicPolyline[] = [];
    const polygons: SchematicPolygon[] = [];

    resources.forEach((resource) => {
      const value = resource.area || resource.length || resource.count || 10;
      const radiusDeg = Math.max(0.01, Math.min(0.05, (value * 8) / 111000));

      if (resource.type === "coastline") {
        const sides = 16;
        const path: Array<{ lng: number; lat: number }> = [];
        for (let i = 0; i <= sides; i++) {
          const t = i / sides;
          path.push({
            lng: resource.lng + (t - 0.5) * radiusDeg * 3,
            lat: resource.lat + Math.sin(t * Math.PI * 2) * radiusDeg * 0.5,
          });
        }
        polylines.push({
          id: resource.id,
          path,
          label: resource.name,
          shade: 500,
          width: 1.5,
        });
      } else if (resource.type === "port") {
        points.push({
          id: resource.id,
          lng: resource.lng,
          lat: resource.lat,
          label: resource.name,
          category: 1,
          r: 4,
          onClick: () => onResourceClick?.(resource),
        });
      } else {
        const sides = 24;
        const path: Array<{ lng: number; lat: number }> = [];
        for (let i = 0; i < sides; i++) {
          const angle = (i / sides) * Math.PI * 2;
          const r = radiusDeg * (0.8 + ((i * 37) % 10) / 30);
          path.push({
            lng: resource.lng + Math.cos(angle) * r,
            lat: resource.lat + Math.sin(angle) * r * 0.75,
          });
        }
        polygons.push({
          id: resource.id,
          path,
          label: resource.name,
          shade: 200,
          opacity: 0.6,
          onClick: () => onResourceClick?.(resource),
        });
      }
    });

    return { schematicPoints: points, schematicPolylines: polylines, schematicPolygons: polygons };
  }, [resources, onResourceClick]);

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
          mapStyle: "amap://styles/normal",
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
    if (!map || !resources.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];
    circlesRef.current.forEach((c) => map.remove(c));
    circlesRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    resources.forEach((resource) => {
      const isSelected = selectedId === resource.id;
      const color = TYPE_COLORS[resource.type];
      const size = isSelected ? 46 : 36;

      const value = resource.area || resource.length || resource.count || 10;
      const radius = Math.max(1000, Math.min(5000, value * 8));
      const circle = new AMap.Circle({
        center: [resource.lng, resource.lat],
        radius,
        strokeColor: color,
        strokeWeight: isSelected ? 2 : 1,
        strokeOpacity: 0.5,
        strokeStyle: "dashed",
        fillColor: color,
        fillOpacity: isSelected ? 0.3 : 0.18,
        zIndex: isSelected ? 90 : 50,
      });
      map.add(circle);
      circlesRef.current.push(circle);

      const marker = new AMap.Marker({
        position: new AMap.LngLat(resource.lng, resource.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="
            width:${size}px;height:${size}px;border-radius:50%;
            background:${color};
            border:${isSelected ? 3 : 2}px solid white;
            box-shadow:0 2px 10px rgba(0,0,0,0.3);
            display:flex;align-items:center;justify-content:center;
            color:white;font-weight:700;font-size:${isSelected ? 18 : 14}px;
            cursor:pointer;
            transition:all 0.2s;
          ">
            ${MARINE_TYPE_ICONS[resource.type]}
          </div>
        `,
        zIndex: isSelected ? 200 : 100,
      });

      marker.on("click", () => onResourceClick?.(resource));
      map.add(marker);
      markersRef.current.push(marker);
    });

    const bounds = new AMap.Bounds(
      new AMap.LngLat(
        Math.min(...resources.map((r) => r.lng)) - 0.05,
        Math.min(...resources.map((r) => r.lat)) - 0.05
      ),
      new AMap.LngLat(
        Math.max(...resources.map((r) => r.lng)) + 0.05,
        Math.max(...resources.map((r) => r.lat)) + 0.05
      )
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [resources, selectedId, onResourceClick, mode]);

  const legendItems: { type: MarineResourceType; color: string; label: string }[] = [
    { type: "coastline", color: TYPE_COLORS.coastline, label: MARINE_TYPE_LABELS.coastline },
    { type: "island", color: TYPE_COLORS.island, label: MARINE_TYPE_LABELS.island },
    { type: "wetland", color: TYPE_COLORS.wetland, label: MARINE_TYPE_LABELS.wetland },
    { type: "fishery", color: TYPE_COLORS.fishery, label: MARINE_TYPE_LABELS.fishery },
    { type: "port", color: TYPE_COLORS.port, label: MARINE_TYPE_LABELS.port },
  ];

  if (mode === "schematic") {
    return (
      <SchematicMap
        width={800}
        height={500}
        points={schematicPoints}
        polylines={schematicPolylines}
        polygons={schematicPolygons}
        legend={[
          { label: "海域", kind: "area", shade: 200 },
          { label: "岸线", kind: "line", shade: 500 },
          { label: "港口公园", kind: "point", category: 1 },
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
        polylines={schematicPolylines}
        polygons={schematicPolygons}
        legend={[
          { label: "海域", kind: "area", shade: 200 },
          { label: "岸线", kind: "line", shade: 500 },
          { label: "港口公园", kind: "point", category: 1 },
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
        <div className="text-[10px] text-gray-700 mb-1.5 font-medium">资源类型</div>
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
        <div className="text-[10px] text-gray-700 font-medium">虚线圈 = 资源范围</div>
        <div className="text-[9px] text-gray-500 mt-0.5">点击图标查看详情</div>
      </div>
    </div>
  );
}
