"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import { LAND_USE_LABELS, type LandUseParcel } from "@/lib/land-use-data";
import SchematicMap, { type SchematicPoint } from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface PopulationDensityMapProps {
  parcels: LandUseParcel[];
  center: [number, number];
  zoom?: number;
  height?: string;
  showLabels?: boolean;
  onParcelClick?: (parcel: LandUseParcel) => void;
}

function getDensityShade(density: number): 500 | 600 | 700 | 800 {
  if (density < 500) return 500;
  if (density < 1000) return 600;
  if (density < 1500) return 700;
  return 800;
}

function getDensityRadius(density: number): number {
  const t = Math.min(density / 2000, 1);
  return 2 + t * 6;
}

const DENSITY_LEGEND = [
  { label: "低密度 <500 人/ha", kind: "point" as const, shade: 500 },
  { label: "中密度 500-1000", kind: "point" as const, shade: 600 },
  { label: "中高密度 1000-1500", kind: "point" as const, shade: 700 },
  { label: "高密度 >1500", kind: "point" as const, shade: 800 },
];

export default function PopulationDensityMap({
  parcels,
  center,
  zoom = 14,
  height = "h-[500px]",
  showLabels = false,
  onParcelClick,
}: PopulationDensityMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const populatedParcels = useMemo(
    () => parcels.filter((p) => p.population != null),
    [parcels]
  );

  const schematicPoints = useMemo<SchematicPoint[]>(() => {
    return populatedParcels.map((p) => {
      const density = p.population! / p.areaHa;
      const centerLng = p.geometry.reduce((s, pt) => s + pt[0], 0) / p.geometry.length;
      const centerLat = p.geometry.reduce((s, pt) => s + pt[1], 0) / p.geometry.length;
      return {
        id: p.id,
        lng: centerLng,
        lat: centerLat,
        label: `${p.population!.toLocaleString()}人 · ${density.toFixed(0)}人/ha`,
        shade: getDensityShade(density),
        r: getDensityRadius(density),
        onClick: onParcelClick ? () => onParcelClick(p) : undefined,
      };
    });
  }, [populatedParcels, onParcelClick]);

  if (mode === "schematic") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200">
        <SchematicMap
          width={800}
          height={500}
          points={schematicPoints}
          legend={DENSITY_LEGEND}
          title="人口密度示意图"
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
          points={schematicPoints}
          legend={DENSITY_LEGEND}
          title="人口密度示意图"
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
          features: ["bg", "road"],
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
    if (!map || !populatedParcels.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    populatedParcels.forEach((parcel) => {
      const density = parcel.population! / parcel.areaHa;
      const maxDensity = 2000;
      const t = Math.min(density / maxDensity, 1);
      const r = Math.round(200 + 55 * t);
      const g = Math.round(220 - 180 * t);
      const b = Math.round(240 - 200 * t);
      const fillColor = `rgb(${r}, ${g}, ${b})`;

      const centerLng = parcel.geometry.reduce((s, pt) => s + pt[0], 0) / parcel.geometry.length;
      const centerLat = parcel.geometry.reduce((s, pt) => s + pt[1], 0) / parcel.geometry.length;
      const radius = 4 + t * 12;

      const circle = new AMap.Circle({
        center: new AMap.LngLat(centerLng, centerLat),
        radius,
        fillColor,
        fillOpacity: 0.75,
        strokeColor: "#ffffff",
        strokeWeight: 1,
        strokeOpacity: 0.9,
        cursor: "pointer",
        zIndex: 10,
      });

      circle.on("click", () => {
        onParcelClick?.(parcel);
      });

      map.add(circle);
      markersRef.current.push(circle);

      if (showLabels) {
        const marker = new AMap.Text({
          text: `${parcel.population!.toLocaleString()}人`,
          anchor: "center",
          position: new AMap.LngLat(centerLng, centerLat),
          style: {
            "font-size": "10px",
            "font-weight": "500",
            color: "#1f2937",
            "background-color": "rgba(255,255,255,0.9)",
            padding: "2px 6px",
            "border-radius": "4px",
            border: "none",
          },
        });
        map.add(marker);
        markersRef.current.push(marker);
      }
    });

    const allLngs = populatedParcels.flatMap((p) => p.geometry.map((g) => g[0]));
    const allLats = populatedParcels.flatMap((p) => p.geometry.map((g) => g[1]));
    const bounds = new AMap.Bounds(
      new AMap.LngLat(Math.min(...allLngs), Math.min(...allLats)),
      new AMap.LngLat(Math.max(...allLngs), Math.max(...allLats))
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [populatedParcels, showLabels, onParcelClick]);

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
    </div>
  );
}
