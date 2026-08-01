"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import type { LocationScore } from "@/lib/business-siting-data";
import SchematicMap from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface BusinessSitingMapProps {
  locations: LocationScore[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onLocationClick?: (location: LocationScore) => void;
  selectedId?: string;
}

function scoreToColor(score: number): string {
  if (score >= 85) return "#10b981";
  if (score >= 70) return "#84cc16";
  if (score >= 55) return "#eab308";
  if (score >= 40) return "#f97316";
  return "#ef4444";
}

export default function BusinessSitingMap({
  locations,
  center,
  zoom = 13,
  height = "h-[500px]",
  onLocationClick,
  selectedId,
}: BusinessSitingMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const schematicProps = useMemo(() => {
    const points: Array<{ lng: number; lat: number; id?: string | number; category?: 0 | 1 | 2 | 3 | 4; r?: number; onClick?: () => void }> = [];
    const bestLocation = locations.length > 0 ? locations.reduce((best, loc) => loc.overallScore > best.overallScore ? loc : best, locations[0]) : null;

    locations.forEach((loc) => {
      points.push({
        lng: loc.lng,
        lat: loc.lat,
        id: loc.id,
        category: 0,
        r: 6,
        onClick: () => onLocationClick?.(loc),
      });

      for (let i = 0; i < Math.min(loc.nearbyCompetitors, 3); i++) {
        const angle = (i / Math.max(1, loc.nearbyCompetitors)) * Math.PI * 2;
        const dist = 0.003 + (i % 2) * 0.002;
        points.push({
          lng: loc.lng + Math.cos(angle) * dist,
          lat: loc.lat + Math.sin(angle) * dist,
          id: `${loc.id}-comp-${i}`,
          category: 2,
          r: 3,
        });
      }

      for (let i = 0; i < Math.min(loc.nearbySupporters, 4); i++) {
        const angle = ((i + 0.5) / Math.max(1, loc.nearbySupporters)) * Math.PI * 2;
        const dist = 0.004 + (i % 3) * 0.0015;
        points.push({
          lng: loc.lng + Math.cos(angle) * dist,
          lat: loc.lat + Math.sin(angle) * dist,
          id: `${loc.id}-supp-${i}`,
          category: 3,
          r: 2,
        });
      }
    });

    const markers = bestLocation ? [{
      lng: bestLocation.lng,
      lat: bestLocation.lat,
      label: "最优候选",
      kind: 3 as const,
    }] : [];

    const legend = [
      { label: "候选址", kind: "point" as const, category: 0 },
      { label: "竞品", kind: "point" as const, category: 2 },
      { label: "配套", kind: "point" as const, category: 3 },
    ];

    return { points, markers, legend, bestLocation };
  }, [locations, onLocationClick]);

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
    if (!map || !locations.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    locations.forEach((loc) => {
      const isSelected = selectedId === loc.id;
      const color = scoreToColor(loc.overallScore);
      const size = isSelected ? 40 : 28 + (loc.overallScore / 100) * 12;

      const marker = new AMap.Marker({
        position: new AMap.LngLat(loc.lng, loc.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="
            width:${size}px;height:${size}px;border-radius:50%;
            background:${color};
            border:${isSelected ? 3 : 2}px solid white;
            box-shadow:0 2px 8px rgba(0,0,0,0.2);
            display:flex;align-items:center;justify-content:center;
            color:white;font-weight:700;font-size:${isSelected ? 13 : 11}px;
            cursor:pointer;
            transition:all 0.2s;
          ">
            ${loc.overallScore}
          </div>
        `,
        zIndex: isSelected ? 200 : Math.round(loc.overallScore),
      });

      marker.on("click", () => onLocationClick?.(loc));
      marker.on("mouseover", () => {
        marker.setzIndex(150);
      });

      map.add(marker);
      markersRef.current.push(marker);
    });

    const bounds = new AMap.Bounds(
      new AMap.LngLat(
        Math.min(...locations.map((l) => l.lng)),
        Math.min(...locations.map((l) => l.lat))
      ),
      new AMap.LngLat(
        Math.max(...locations.map((l) => l.lng)),
        Math.max(...locations.map((l) => l.lat))
      )
    );
    map.setBounds(bounds, [50, 50, 50, 50], false);
  }, [locations, selectedId, onLocationClick]);

  if (mode === "schematic") {
    return (
      <div className={`w-full ${height}`}>
        <SchematicMap
          height={500}
          points={schematicProps.points}
          markers={schematicProps.markers}
          legend={schematicProps.legend}
          title="商业选址示意图"
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
          markers={schematicProps.markers}
          legend={schematicProps.legend}
          title="商业选址示意图"
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
    <div className="relative rounded-xl overflow-hidden border border-gray-200">
      <div ref={mapRef} className={`w-full ${height}`} />
      {/* 图例 */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-100">
        <div className="text-[10px] text-gray-500 mb-1.5">综合评分</div>
        <div className="flex items-center gap-1">
          {[
            { s: "≥85", c: "#10b981" },
            { s: "70-84", c: "#84cc16" },
            { s: "55-69", c: "#eab308" },
            { s: "40-54", c: "#f97316" },
            { s: "<40", c: "#ef4444" },
          ].map((item) => (
            <div key={item.s} className="flex flex-col items-center">
              <div
                className="w-3.5 h-3.5 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: item.c }}
              />
              <span className="text-[8px] text-gray-500 mt-0.5">{item.s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
