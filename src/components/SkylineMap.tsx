"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import {
  type BuildingHeight,
} from "@/lib/skyline-data";
import SchematicMap, { type SchematicPoint } from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

const HEIGHT_COLORS = [
  { max: 50, color: "#93c5fd", label: "低层 <50m" },
  { max: 100, color: "#60a5fa", label: "中层 50-100m" },
  { max: 200, color: "#3b82f6", label: "高层 100-200m" },
  { max: 1000, color: "#1e3a8a", label: "超高层 >200m" },
];

function getColorForHeight(height: number): string {
  return HEIGHT_COLORS.find((c) => height < c.max)?.color || "#1e3a8a";
}

interface SkylineMapProps {
  buildings: BuildingHeight[];
  center: { lng: number; lat: number };
  zoom?: number;
  height?: string;
  onBuildingClick?: (building: BuildingHeight) => void;
  selectedId?: string;
}

function getHeightShade(h: number): 300 | 500 | 700 | 900 {
  if (h < 50) return 300;
  if (h < 100) return 500;
  if (h < 200) return 700;
  return 900;
}

const HEIGHT_LEGEND = [
  { label: "低层 <50m", kind: "point" as const, shade: 300 },
  { label: "中层 50-100m", kind: "point" as const, shade: 500 },
  { label: "高层 100-200m", kind: "point" as const, shade: 700 },
  { label: "超高层 >200m", kind: "point" as const, shade: 900 },
];

export default function SkylineMap({
  buildings,
  center,
  zoom = 12,
  height = "h-[400px]",
  onBuildingClick,
  selectedId,
}: SkylineMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const schematicPoints = useMemo<SchematicPoint[]>(() => {
    return buildings.map((b) => ({
      id: b.id,
      lng: b.location.lng,
      lat: b.location.lat,
      label: `${b.name} · ${b.height}m${b.landmark ? " · 地标" : ""}`,
      shade: getHeightShade(b.height),
      r: b.landmark ? 9 : 3 + Math.min(b.height / 50, 5),
      onClick: onBuildingClick ? () => onBuildingClick(b) : undefined,
    }));
  }, [buildings, onBuildingClick]);

  if (mode === "schematic") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200">
        <div className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-300">
          <div className="text-[10px] text-gray-700 font-medium">示意图模式 · 高度散点</div>
          <div className="text-[9px] text-gray-500 mt-0.5">点大小 = 相对建筑高度</div>
        </div>
        <SchematicMap
          width={800}
          height={500}
          points={schematicPoints}
          legend={HEIGHT_LEGEND}
          title="建筑高度/天际线示意图"
          showCompass
        />
      </div>
    );
  }

  if (mode === "osm") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200">
        <div className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-300">
          <div className="text-[10px] text-gray-700 font-medium">OSM模式 · 天际线散点</div>
          <div className="text-[9px] text-gray-500 mt-0.5">点大小 = 相对建筑高度</div>
        </div>
        <OsmMap
          width={800}
          height={500}
          points={schematicPoints}
          legend={HEIGHT_LEGEND}
          title="建筑高度/天际线示意图"
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
          center: [center.lng, center.lat],
          zoom,
          mapStyle: "amap://styles/light",
          features: ["bg", "road", "building"],
          pitch: 45,
          viewMode: "3D",
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
    if (!map || !buildings.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    buildings.forEach((building) => {
      const isSelected = selectedId === building.id;
      const color = getColorForHeight(building.height);
      const size = isSelected ? 40 : 28;

      const marker = new AMap.Marker({
        position: new AMap.LngLat(building.location.lng, building.location.lat),
        offset: new AMap.Pixel(-size / 2, -size),
        content: `
          <div style="
            width:${size * 0.7}px;height:${size}px;
            background:linear-gradient(to top, ${color}, ${color}cc);
            border:${isSelected ? 2 : 1}px solid ${building.landmark ? "#000" : "white"};
            box-shadow:0 2px 6px rgba(0,0,0,0.3);
            cursor:pointer;
            display:flex;align-items:flex-end;justify-content:center;
            color:white;font-size:8px;font-weight:600;
            padding-bottom:2px;
            transition:all 0.2s;
            ${building.landmark ? "border-radius:2px 2px 0 0;" : ""}
          ">
            ${building.height}
          </div>
        `,
        zIndex: isSelected ? 200 : building.landmark ? 150 : 100,
      });

      marker.on("click", () => onBuildingClick?.(building));
      map.add(marker);
      markersRef.current.push(marker);
    });

    const bounds = new AMap.Bounds(
      new AMap.LngLat(
        Math.min(...buildings.map((b) => b.location.lng)) - 0.02,
        Math.min(...buildings.map((b) => b.location.lat)) - 0.02
      ),
      new AMap.LngLat(
        Math.max(...buildings.map((b) => b.location.lng)) + 0.02,
        Math.max(...buildings.map((b) => b.location.lat)) + 0.02
      )
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [buildings, selectedId, onBuildingClick]);

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
        <div className="text-[10px] text-gray-700 mb-1.5 font-medium">建筑高度色阶</div>
        <div className="space-y-1">
          {HEIGHT_COLORS.map((c) => (
            <div key={c.max} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: c.color }} />
              <span className="text-[9px] text-gray-700">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-300">
        <div className="text-[10px] text-gray-700 font-medium">3D视角 · 高度条形</div>
        <div className="text-[9px] text-gray-500 mt-0.5">数字 = 建筑高度(m)</div>
      </div>
    </div>
  );
}
