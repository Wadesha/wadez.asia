"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import {
  type RoadSegment,
  congestionColors,
} from "@/lib/traffic-capacity-data";
import SchematicMap, { type SchematicPolyline } from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface TrafficCapacityMapProps {
  roads: RoadSegment[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onRoadClick?: (road: RoadSegment) => void;
  selectedId?: string;
}

const CONGESTION_STYLE: Record<
  RoadSegment["congestionLevel"],
  { width: 1 | 2 | 3 | 4; shade: 400 | 600 | 800 | 900 }
> = {
  free: { width: 1, shade: 400 },
  slow: { width: 2, shade: 600 },
  congested: { width: 3, shade: 800 },
  blocked: { width: 4, shade: 900 },
};

const CONGESTION_LEGEND = [
  { label: "畅通", kind: "line" as const, shade: 400 },
  { label: "缓行", kind: "line" as const, shade: 600 },
  { label: "拥堵", kind: "line" as const, shade: 800 },
  { label: "严重拥堵", kind: "line" as const, shade: 900 },
];

export default function TrafficCapacityMap({
  roads,
  center,
  zoom = 12,
  height = "h-[500px]",
  onRoadClick,
  selectedId,
}: TrafficCapacityMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const polylinesRef = useRef<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const schematicPolylines = useMemo<SchematicPolyline[]>(() => {
    return roads.map((r) => {
      const style = CONGESTION_STYLE[r.congestionLevel];
      return {
        id: r.id,
        label: `${r.name} · ${r.length}km · 速度${r.speed}km/h`,
        path: [r.start, r.end],
        width: style.width,
        shade: style.shade,
        style: 1,
      };
    });
  }, [roads]);

  if (mode === "schematic") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200">
        <SchematicMap
          width={800}
          height={500}
          polylines={schematicPolylines}
          legend={CONGESTION_LEGEND}
          title="交通承载力示意图"
          showCompass
        />
      </div>
    );
  }

  if (mode === "osm") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200">
        <OsmMap
          width={800}
          height={500}
          polylines={schematicPolylines}
          legend={CONGESTION_LEGEND}
          title="交通承载力示意图"
        />
      </div>
    );
  }

  useEffect(() => {
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
  }, [center, zoom]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !roads.length) return;

    // Clear old polylines
    polylinesRef.current.forEach((p) => map.remove(p));
    polylinesRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    // Add polylines for each road
    roads.forEach((road) => {
      const isSelected = selectedId === road.id;
      const color = congestionColors[road.congestionLevel];
      const strokeWeight = isSelected ? 8 : 5;

      const path = [
        new AMap.LngLat(road.start.lng, road.start.lat),
        new AMap.LngLat(road.end.lng, road.end.lat),
      ];

      const polyline = new AMap.Polyline({
        path,
        strokeColor: color,
        strokeWeight,
        strokeOpacity: 0.9,
        lineJoin: "round",
        lineCap: "round",
        cursor: "pointer",
        zIndex: isSelected ? 200 : 100,
      });

      polyline.on("click", () => onRoadClick?.(road));
      map.add(polyline);
      polylinesRef.current.push(polyline);
    });

    // Fit bounds to show all roads
    const allPoints = roads.flatMap((r) => [
      [r.start.lng, r.start.lat],
      [r.end.lng, r.end.lat],
    ]);
    const lngs = allPoints.map((p) => p[0]);
    const lats = allPoints.map((p) => p[1]);
    const bounds = new AMap.Bounds(
      new AMap.LngLat(Math.min(...lngs) - 0.005, Math.min(...lats) - 0.005),
      new AMap.LngLat(Math.max(...lngs) + 0.005, Math.max(...lats) + 0.005)
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [roads, selectedId, onRoadClick]);

  const legendItems: {
    level: RoadSegment["congestionLevel"];
    color: string;
    label: string;
  }[] = [
    { level: "free", color: congestionColors.free, label: "畅通" },
    { level: "slow", color: congestionColors.slow, label: "缓行" },
    { level: "congested", color: congestionColors.congested, label: "拥堵" },
    { level: "blocked", color: congestionColors.blocked, label: "严重拥堵" },
  ];

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
      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-200">
        <div className="text-[10px] text-gray-500 mb-1.5 font-medium">
          拥堵等级
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {legendItems.map((item) => (
            <div key={item.level} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[9px] text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
