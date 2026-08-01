"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import {
  HEAT_LEVEL_COLORS,
  HEAT_LEVEL_LABELS,
  type HeatZone,
  type HeatLevel,
} from "@/lib/heat-island-data";
import SchematicMap from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface HeatIslandMapProps {
  zones: HeatZone[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onZoneClick?: (zone: HeatZone) => void;
  selectedId?: string;
}

export default function HeatIslandMap({
  zones,
  center,
  zoom = 11,
  height = "h-[500px]",
  onZoneClick,
  selectedId,
}: HeatIslandMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const heatmapLayerRef = useRef<any>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  const schematicProps = useMemo(() => {
    type ShadeType = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    const tempToShade = (temp: number): ShadeType => {
      if (temp < 20) return 300;
      if (temp < 25) return 500;
      if (temp < 30) return 700;
      return 900;
    };

    const points = zones.map((zone) => ({
      lng: zone.lng,
      lat: zone.lat,
      id: zone.id,
      shade: tempToShade(zone.temperature),
      r: 4,
      onClick: () => onZoneClick?.(zone),
    }));

    const legend = [
      { label: "凉爽", kind: "point" as const, shade: 300 },
      { label: "常温", kind: "point" as const, shade: 500 },
      { label: "偏热", kind: "point" as const, shade: 700 },
      { label: "高温", kind: "point" as const, shade: 900 },
    ];

    return { points, legend };
  }, [zones, onZoneClick]);

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
          mapStyle: "amap://styles/dark",
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
    if (!map || !zones.length) return;

    // Clear old markers
    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    // Add heatmap layer
    if (heatmapLayerRef.current) {
      heatmapLayerRef.current.setMap(null);
      heatmapLayerRef.current = null;
    }

    if (AMap.HeatMap) {
      const heatmapData = zones.map((z) => ({
        lng: z.lng,
        lat: z.lat,
        count: z.temperature,
      }));

      const heatmap = new AMap.HeatMap(map, {
        radius: 50,
        opacity: [0, 0.8],
        gradient: {
          0.3: "#3b82f6",
          0.5: "#10b981",
          0.7: "#f59e0b",
          0.85: "#ef4444",
          1.0: "#7c2d12",
        },
      });

      heatmap.setDataSet({
        data: heatmapData,
        max: 38,
      });
      heatmapLayerRef.current = heatmap;
    }

    // Add markers
    zones.forEach((zone) => {
      const isSelected = selectedId === zone.id;
      const color = HEAT_LEVEL_COLORS[zone.level];
      const size = isSelected ? 48 : 36;

      const marker = new AMap.Marker({
        position: new AMap.LngLat(zone.lng, zone.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="
            width:${size}px;height:${size}px;border-radius:50%;
            background:${color};
            border:${isSelected ? 3 : 2}px solid white;
            box-shadow:0 2px 12px rgba(0,0,0,0.35);
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            color:white;font-weight:700;
            cursor:pointer;
            transition:all 0.2s;
          ">
            <span style="font-size:${isSelected ? 14 : 11}px;line-height:1;">${zone.temperature}°</span>
            <span style="font-size:8px;opacity:0.8;line-height:1;margin-top:2px;">${zone.heatIslandIntensity}K</span>
          </div>
        `,
        zIndex: isSelected ? 200 : 100,
      });

      marker.on("click", () => onZoneClick?.(zone));
      map.add(marker);
      markersRef.current.push(marker);
    });

    // Fit bounds
    const bounds = new AMap.Bounds(
      new AMap.LngLat(
        Math.min(...zones.map((z) => z.lng)) - 0.02,
        Math.min(...zones.map((z) => z.lat)) - 0.02
      ),
      new AMap.LngLat(
        Math.max(...zones.map((z) => z.lng)) + 0.02,
        Math.max(...zones.map((z) => z.lat)) + 0.02
      )
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [zones, selectedId, onZoneClick]);

  const legendItems: { level: HeatLevel; color: string; label: string }[] = [
    { level: "low", color: HEAT_LEVEL_COLORS.low, label: HEAT_LEVEL_LABELS.low },
    { level: "medium", color: HEAT_LEVEL_COLORS.medium, label: HEAT_LEVEL_LABELS.medium },
    { level: "high", color: HEAT_LEVEL_COLORS.high, label: HEAT_LEVEL_LABELS.high },
    { level: "extreme", color: HEAT_LEVEL_COLORS.extreme, label: HEAT_LEVEL_LABELS.extreme },
  ];

  if (mode === "schematic") {
    return (
      <div className={`w-full ${height}`}>
        <SchematicMap
          height={500}
          points={schematicProps.points}
          legend={schematicProps.legend}
          title="热岛效应示意图"
          showCompass
        />
      </div>
    );
  }

  if (mode === "osm") {
    return (
      <div className={`w-full ${height}`}>
        <OsmMap
          width={800}
          height={500}
          points={schematicProps.points}
          legend={schematicProps.legend}
          title="热岛效应示意图"
        />
      </div>
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
    <div className="relative rounded-xl overflow-hidden border border-gray-700">
      <div ref={mapRef} className={`w-full ${height}`} />
      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-slate-900/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-700">
        <div className="text-[10px] text-gray-400 mb-1.5 font-medium">热岛强度等级</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {legendItems.map((item) => (
            <div key={item.level} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[9px] text-gray-300">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Temperature scale */}
      <div className="absolute top-3 right-3 bg-slate-900/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-700">
        <div className="text-[10px] text-gray-400 mb-1 font-medium">温度色阶</div>
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-blue-400">26°C</span>
          <div className="w-20 h-2 rounded-full" style={{ background: "linear-gradient(to right, #3b82f6, #10b981, #f59e0b, #ef4444, #7c2d12)" }} />
          <span className="text-[9px] text-red-400">38°C+</span>
        </div>
      </div>
    </div>
  );
}
