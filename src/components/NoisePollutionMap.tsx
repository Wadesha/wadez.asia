"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import {
  NOISE_LEVEL_COLORS,
  NOISE_LEVEL_LABELS,
  NOISE_LEVEL_RANGES,
  type NoiseMonitor,
  type NoiseLevel,
} from "@/lib/noise-pollution-data";
import SchematicMap from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface NoisePollutionMapProps {
  monitors: NoiseMonitor[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onMonitorClick?: (monitor: NoiseMonitor) => void;
  selectedId?: string;
}

export default function NoisePollutionMap({
  monitors,
  center,
  zoom = 11,
  height = "h-[500px]",
  onMonitorClick,
  selectedId,
}: NoisePollutionMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const heatmapLayerRef = useRef<any>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  const schematicProps = useMemo(() => {
    type ShadeType = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    const dbToShade = (db: number): ShadeType => {
      if (db < 50) return 300;
      if (db < 60) return 500;
      if (db < 70) return 700;
      return 900;
    };

    const points = monitors.map((monitor) => ({
      lng: monitor.lng,
      lat: monitor.lat,
      id: monitor.id,
      shade: dbToShade(monitor.decibel),
      r: 4,
      onClick: () => onMonitorClick?.(monitor),
    }));

    const legend = [
      { label: "安静", kind: "point" as const, shade: 300 },
      { label: "较静", kind: "point" as const, shade: 500 },
      { label: "较吵", kind: "point" as const, shade: 700 },
      { label: "嘈杂", kind: "point" as const, shade: 900 },
    ];

    return { points, legend };
  }, [monitors, onMonitorClick]);

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
    if (!map || !monitors.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    if (heatmapLayerRef.current) {
      heatmapLayerRef.current.setMap(null);
      heatmapLayerRef.current = null;
    }

    if (AMap.HeatMap) {
      const heatmapData = monitors.map((m) => ({
        lng: m.lng,
        lat: m.lat,
        count: m.decibel,
      }));

      const heatmap = new AMap.HeatMap(map, {
        radius: 60,
        opacity: [0, 0.75],
        gradient: {
          0.2: "#10b981",
          0.4: "#3b82f6",
          0.6: "#f59e0b",
          0.8: "#ef4444",
          1.0: "#7c2d12",
        },
      });

      heatmap.setDataSet({
        data: heatmapData,
        max: 95,
      });
      heatmapLayerRef.current = heatmap;
    }

    monitors.forEach((monitor) => {
      const isSelected = selectedId === monitor.id;
      const color = NOISE_LEVEL_COLORS[monitor.level];
      const size = isSelected ? 46 : 34;

      const marker = new AMap.Marker({
        position: new AMap.LngLat(monitor.lng, monitor.lat),
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
            <span style="font-size:${isSelected ? 13 : 10}px;line-height:1;">${monitor.decibel}</span>
            <span style="font-size:7px;opacity:0.85;line-height:1;margin-top:1px;">dB</span>
          </div>
        `,
        zIndex: isSelected ? 200 : 100,
      });

      marker.on("click", () => onMonitorClick?.(monitor));
      map.add(marker);
      markersRef.current.push(marker);
    });

    const bounds = new AMap.Bounds(
      new AMap.LngLat(
        Math.min(...monitors.map((m) => m.lng)) - 0.02,
        Math.min(...monitors.map((m) => m.lat)) - 0.02
      ),
      new AMap.LngLat(
        Math.max(...monitors.map((m) => m.lng)) + 0.02,
        Math.max(...monitors.map((m) => m.lat)) + 0.02
      )
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [monitors, selectedId, onMonitorClick]);

  const legendItems: { level: NoiseLevel; color: string; label: string }[] = [
    { level: "quiet", color: NOISE_LEVEL_COLORS.quiet, label: NOISE_LEVEL_LABELS.quiet },
    { level: "moderate", color: NOISE_LEVEL_COLORS.moderate, label: NOISE_LEVEL_LABELS.moderate },
    { level: "loud", color: NOISE_LEVEL_COLORS.loud, label: NOISE_LEVEL_LABELS.loud },
    { level: "very-loud", color: NOISE_LEVEL_COLORS["very-loud"], label: NOISE_LEVEL_LABELS["very-loud"] },
    { level: "harmful", color: NOISE_LEVEL_COLORS.harmful, label: NOISE_LEVEL_LABELS.harmful },
  ];

  if (mode === "schematic") {
    return (
      <div className={`w-full ${height}`}>
        <SchematicMap
          height={500}
          points={schematicProps.points}
          legend={schematicProps.legend}
          title="噪声污染示意图"
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
          title="噪声污染示意图"
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
      <div className="absolute bottom-3 left-3 bg-slate-900/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-700">
        <div className="text-[10px] text-gray-400 mb-1.5 font-medium">噪声等级</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {legendItems.map((item) => (
            <div key={item.level} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[9px] text-gray-300">
                {item.label} {NOISE_LEVEL_RANGES[item.level].min}+
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-3 right-3 bg-slate-900/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-700">
        <div className="text-[10px] text-gray-400 mb-1 font-medium">分贝色阶</div>
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-green-400">40dB</span>
          <div className="w-20 h-2 rounded-full" style={{ background: "linear-gradient(to right, #10b981, #3b82f6, #f59e0b, #ef4444, #7c2d12)" }} />
          <span className="text-[9px] text-red-400">95+dB</span>
        </div>
      </div>
    </div>
  );
}
