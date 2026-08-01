"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import {
  HERITAGE_LEVEL_COLORS,
  HERITAGE_LEVEL_LABELS,
  HERITAGE_CATEGORY_LABELS,
  type IntangibleHeritage,
  type HeritageLevel,
} from "@/lib/intangible-heritage-data";
import SchematicMap, {
  type SchematicPoint,
} from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface IntangibleHeritageMapProps {
  heritages: IntangibleHeritage[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onHeritageClick?: (heritage: IntangibleHeritage) => void;
  selectedId?: string;
}

export default function IntangibleHeritageMap({
  heritages,
  center,
  zoom = 11,
  height = "h-[500px]",
  onHeritageClick,
  selectedId,
}: IntangibleHeritageMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

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
    if (!map || !heritages.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    heritages.forEach((heritage) => {
      const isSelected = selectedId === heritage.id;
      const color = HERITAGE_LEVEL_COLORS[heritage.level];
      const size = isSelected ? 44 : 34;
      const label = HERITAGE_CATEGORY_LABELS[heritage.category];
      const char = label ? label.charAt(0) : "·";

      const marker = new AMap.Marker({
        position: new AMap.LngLat(heritage.lng, heritage.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="
            width:${size}px;height:${size}px;border-radius:50%;
            background:${color};
            border:${isSelected ? 3 : 2}px solid white;
            box-shadow:0 2px 10px rgba(0,0,0,0.3);
            display:flex;align-items:center;justify-content:center;
            color:white;font-weight:700;
            cursor:pointer;
            transition:all 0.2s;
          ">
            <span style="font-size:${isSelected ? 16 : 13}px;line-height:1;">${char}</span>
          </div>
        `,
        zIndex: isSelected ? 200 : 100,
      });

      marker.on("click", () => onHeritageClick?.(heritage));
      map.add(marker);
      markersRef.current.push(marker);
    });

    const bounds = new AMap.Bounds(
      new AMap.LngLat(
        Math.min(...heritages.map((h) => h.lng)) - 0.05,
        Math.min(...heritages.map((h) => h.lat)) - 0.05
      ),
      new AMap.LngLat(
        Math.max(...heritages.map((h) => h.lng)) + 0.05,
        Math.max(...heritages.map((h) => h.lat)) + 0.05
      )
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [heritages, selectedId, onHeritageClick, mode]);

  const legendItems: { level: HeritageLevel; color: string; label: string }[] = [
    { level: "national", color: HERITAGE_LEVEL_COLORS.national, label: HERITAGE_LEVEL_LABELS.national },
    { level: "provincial", color: HERITAGE_LEVEL_COLORS.provincial, label: HERITAGE_LEVEL_LABELS.provincial },
    { level: "municipal", color: HERITAGE_LEVEL_COLORS.municipal, label: HERITAGE_LEVEL_LABELS.municipal },
    { level: "county", color: HERITAGE_LEVEL_COLORS.county, label: HERITAGE_LEVEL_LABELS.county },
  ];

  const schematicPoints: SchematicPoint[] = useMemo(() => {
    const shadeMap: Record<HeritageLevel, 800 | 600 | 400 | 300> = {
      national: 800,
      provincial: 600,
      municipal: 400,
      county: 300,
    };
    const rMap: Record<HeritageLevel, number> = {
      national: 6,
      provincial: 5,
      municipal: 4,
      county: 3,
    };
    return heritages.map((h) => ({
      lng: h.lng,
      lat: h.lat,
      id: h.id,
      label: h.name,
      shade: shadeMap[h.level],
      r: rMap[h.level],
      onClick: () => onHeritageClick?.(h),
    }));
  }, [heritages, onHeritageClick]);

  const schematicLegend = [
    { label: "国家级", kind: "point" as const, shade: 800 },
    { label: "省级", kind: "point" as const, shade: 600 },
    { label: "市级", kind: "point" as const, shade: 400 },
    { label: "区县级", kind: "point" as const, shade: 300 },
  ];

  if (mode === "schematic") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white">
        <SchematicMap
          height={500}
          points={schematicPoints}
          title="非物质文化遗产分布"
          legend={schematicLegend}
          showCompass
        />
      </div>
    );
  }

  if (mode === "osm") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white">
        <OsmMap
          height={500}
          points={schematicPoints}
          title="非物质文化遗产分布"
          legend={schematicLegend}
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
    <div className="relative rounded-xl overflow-hidden border border-gray-300">
      <div ref={mapRef} className={`w-full ${height}`} />
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-300">
        <div className="text-[10px] text-gray-700 mb-1.5 font-medium">非遗级别</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {legendItems.map((item) => (
            <div key={item.level} className="flex items-center gap-1.5">
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
        <div className="text-[10px] text-gray-700 font-medium">圆点 = 非遗项目</div>
        <div className="text-[9px] text-gray-500 mt-0.5">字母 = 类别首字</div>
      </div>
    </div>
  );
}
