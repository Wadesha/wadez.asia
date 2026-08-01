"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import { ECON_METRICS, type RegionEconData, type EconMetricKey } from "@/lib/economic-data";
import SchematicMap from "./SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface EconDataMapProps {
  regions: RegionEconData[];
  center: [number, number];
  zoom?: number;
  height?: string;
  metric: EconMetricKey;
  onRegionClick?: (region: RegionEconData) => void;
  selectedId?: string;
}

function getValueColor(value: number, max: number, min: number): string {
  const ratio = max === min ? 0.5 : (value - min) / (max - min);
  const colors = [
    "#f0f9ff", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9",
    "#0284c7", "#0369a1", "#075985", "#0c4a6e",
  ];
  const idx = Math.min(colors.length - 1, Math.floor(ratio * colors.length));
  return colors[idx];
}

function buildOctagon(
  lng: number,
  lat: number,
  size: number
): Array<{ lng: number; lat: number }> {
  const r = size;
  const path: Array<{ lng: number; lat: number }> = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    path.push({
      lng: lng + Math.cos(angle) * r,
      lat: lat + Math.sin(angle) * r,
    });
  }
  return path;
}

export default function EconDataMap({
  regions,
  center,
  zoom = 4,
  height = "h-[500px]",
  metric,
  onRegionClick,
  selectedId,
}: EconDataMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const altContent = useMemo(() => {
    if (mode !== "schematic" && mode !== "osm") return null;

    const values = regions.map((r) => r[metric] as number);
    const max = values.length > 0 ? Math.max(...values) : 1;
    const min = values.length > 0 ? Math.min(...values) : 0;

    const SHADES: Array<300 | 400 | 500 | 600 | 700 | 800 | 900> = [300, 400, 500, 600, 700, 800, 900];

    const polygons = regions.map((region) => {
      const value = region[metric] as number;
      const ratio = max === min ? 0.5 : (value - min) / (max - min);
      const shadeIdx = Math.min(SHADES.length - 1, Math.floor(ratio * SHADES.length));
      const areaScale = region.level === "province" ? 1.8 : 0.8;
      const size = 0.5 + ratio * 1.2;
      return {
        id: region.id,
        path: buildOctagon(region.lng, region.lat, size * areaScale),
        label: `${region.name} (${value}${ECON_METRICS[metric].unit})`,
        shade: SHADES[shadeIdx],
        opacity: 0.6,
        onClick: () => onRegionClick?.(region),
      };
    });

    const legend = [
      { label: "极高(前25%)", kind: "area" as const, shade: 900 },
      { label: "高(25-50%)", kind: "area" as const, shade: 700 },
      { label: "中(50-75%)", kind: "area" as const, shade: 500 },
      { label: "低(后25%)", kind: "area" as const, shade: 300 },
    ];

    const title = `${ECON_METRICS[metric].label}分布示意图`;

    if (mode === "osm") {
      return (
        <div className={`w-full ${height}`}>
          <OsmMap
            height={500}
            polygons={polygons}
            legend={legend}
            title={title}
          />
        </div>
      );
    }

    return (
      <div className={`w-full ${height}`}>
        <SchematicMap
          width={800}
          height={500}
          polygons={polygons}
          legend={legend}
          title={title}
          showCompass
          className="w-full"
        />
      </div>
    );
  }, [mode, regions, metric, onRegionClick, height]);

  if (altContent) return altContent;

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
    if (!map || !regions.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    const values = regions.map((r) => r[metric] as number);
    const max = Math.max(...values);
    const min = Math.min(...values);

    regions.forEach((region) => {
      const isSelected = selectedId === region.id;
      const value = region[metric] as number;
      const color = getValueColor(value, max, min);
      const ratio = max === min ? 0.5 : (value - min) / (max - min);
      const size = 20 + ratio * 60;

      const marker = new AMap.Marker({
        position: new AMap.LngLat(region.lng, region.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="
            width:${size}px;height:${size}px;
            background:${color};
            border:${isSelected ? 3 : 2}px solid white;
            border-radius:50%;
            box-shadow:0 2px 10px rgba(0,0,0,0.2);
            display:flex;align-items:center;justify-content:center;
            color:white;
            font-weight:700;
            font-size:${size > 40 ? 11 : 9}px;
            cursor:pointer;
            transition:all 0.2s;
            opacity:${isSelected ? 1 : 0.85};
          ">
            ${region.name}
          </div>
        `,
        zIndex: isSelected ? 200 : Math.round(ratio * 100),
      });

      marker.on("click", () => onRegionClick?.(region));
      map.add(marker);
      markersRef.current.push(marker);
    });

    const lngs = regions.map((r) => r.lng);
    const lats = regions.map((r) => r.lat);
    const bounds = new AMap.Bounds(
      new AMap.LngLat(Math.min(...lngs), Math.min(...lats)),
      new AMap.LngLat(Math.max(...lngs), Math.max(...lats))
    );
    map.setBounds(bounds, [80, 40, 40, 40], false);
  }, [regions, metric, selectedId, onRegionClick]);

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
      {/* 图例 */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-100">
        <div className="text-[10px] text-gray-500 mb-1.5 font-medium">
          {ECON_METRICS[metric].label}
        </div>
        <div className="flex items-center gap-0.5">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const values = regions.map((r) => r[metric] as number);
            const max = Math.max(...values);
            const min = Math.min(...values);
            const v = min + (max - min) * (i / 6);
            return (
              <div
                key={i}
                className="w-6 h-3"
                style={{ backgroundColor: getValueColor(v, max, min) }}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-[8px] text-gray-400 mt-0.5">
          <span>低</span>
          <span>高</span>
        </div>
      </div>
    </div>
  );
}
