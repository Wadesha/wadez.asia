"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import { LAND_USE_COLORS, LAND_USE_LABELS, type LandUseParcel } from "@/lib/land-use-data";
import SchematicMap, { type SchematicPolygon } from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface DevelopmentIntensityMapProps {
  parcels: LandUseParcel[];
  center: [number, number];
  zoom?: number;
  height?: string;
  metric?: "far" | "density" | "height";
  showLabels?: boolean;
  onParcelClick?: (parcel: LandUseParcel) => void;
}

function getFarShade(far: number): 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 {
  if (far < 2) return 300;
  if (far < 4) return 500;
  if (far < 6) return 700;
  return 900;
}

function getDensityShade(density: number): 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 {
  if (density < 20) return 300;
  if (density < 35) return 500;
  if (density < 50) return 700;
  return 900;
}

const FAR_LEGEND = [
  { label: "低强度 <2", kind: "area" as const, shade: 300 },
  { label: "中强度 2-4", kind: "area" as const, shade: 500 },
  { label: "高强度 4-6", kind: "area" as const, shade: 700 },
  { label: "极高强度 >6", kind: "area" as const, shade: 900 },
];

const DENSITY_LEGEND = [
  { label: "低密度 <20%", kind: "area" as const, shade: 300 },
  { label: "中密度 20-35%", kind: "area" as const, shade: 500 },
  { label: "高密度 35-50%", kind: "area" as const, shade: 700 },
  { label: "极高密度 >50%", kind: "area" as const, shade: 900 },
];

export default function DevelopmentIntensityMap({
  parcels,
  center,
  zoom = 14,
  height = "h-[500px]",
  metric = "far",
  showLabels = false,
  onParcelClick,
}: DevelopmentIntensityMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const parcelPolygonsRef = useRef<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const schematicPolygons = useMemo<SchematicPolygon[]>(() => {
    return parcels
      .filter((p) => {
        if (metric === "density") return p.buildingDensity != null;
        return p.floorAreaRatio != null;
      })
      .map((p) => {
        const value = metric === "density" ? p.buildingDensity! : p.floorAreaRatio!;
        const shade = metric === "density" ? getDensityShade(value) : getFarShade(value);
        const labelText =
          metric === "density"
            ? `建筑密度 ${value}%`
            : metric === "height"
            ? `估高 ${(value * 3.2).toFixed(0)}m`
            : `FAR ${value}`;
        return {
          id: p.id,
          label: `${LAND_USE_LABELS[p.type]} · ${labelText}`,
          path: p.geometry.map(([lng, lat]) => ({ lng, lat })),
          shade,
          opacity: 0.65,
          strokeShade: 500,
          onClick: onParcelClick ? () => onParcelClick(p) : undefined,
        };
      });
  }, [parcels, metric, onParcelClick]);

  const legend = metric === "density" ? DENSITY_LEGEND : FAR_LEGEND;
  const titleText =
    metric === "density"
      ? "建筑密度示意图"
      : metric === "height"
      ? "建筑高度示意图"
      : "容积率示意图";

  if (mode === "schematic") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200">
        <SchematicMap
          width={800}
          height={500}
          polygons={schematicPolygons}
          legend={legend}
          title={titleText}
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
          polygons={schematicPolygons}
          legend={legend}
          title={titleText}
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
    if (!map || !parcels.length) return;

    parcelPolygonsRef.current.forEach((p) => map.remove(p));
    parcelPolygonsRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    parcels.forEach((parcel) => {
      const value = metric === "density" ? parcel.buildingDensity : parcel.floorAreaRatio;
      if (value == null) return;

      let fillColor: string;
      const t = metric === "density" ? Math.min(value / 60, 1) : Math.min(value / 5, 1);
      if (metric === "density") {
        const r = Math.round(100 + 100 * t);
        const g = Math.round(150 - 50 * t);
        const b = Math.round(200 - 100 * t);
        fillColor = `rgb(${r}, ${g}, ${b})`;
      } else {
        const r = Math.round(255 * t);
        const g = Math.round(100 + 100 * (1 - t));
        const b = Math.round(100 + 50 * (1 - t));
        fillColor = `rgb(${r}, ${g}, ${b})`;
      }

      const fillOpacity = 0.7;
      const strokeColor = "#fff";
      const strokeWeight = 1;

      const path = parcel.geometry.map(([lng, lat]) => new AMap.LngLat(lng, lat));
      const polygon = new AMap.Polygon({
        path,
        fillColor,
        fillOpacity,
        strokeColor,
        strokeWeight,
        strokeOpacity: 0.8,
        cursor: "pointer",
        zIndex: 10,
      });

      polygon.on("click", () => {
        onParcelClick?.(parcel);
      });

      polygon.on("mouseover", () => {
        polygon.setOptions({
          strokeWeight: 2.5,
          strokeColor: "#3b82f6",
          zIndex: 20,
        });
      });

      polygon.on("mouseout", () => {
        polygon.setOptions({
          strokeWeight,
          strokeColor,
          zIndex: 10,
        });
      });

      map.add(polygon);
      parcelPolygonsRef.current.push(polygon);

      if (showLabels) {
        const centerLng = parcel.geometry.reduce((s, p) => s + p[0], 0) / parcel.geometry.length;
        const centerLat = parcel.geometry.reduce((s, p) => s + p[1], 0) / parcel.geometry.length;
        const labelValue = metric === "density" ? `${parcel.buildingDensity}%` : `${parcel.floorAreaRatio}`;
        const marker = new AMap.Text({
          text: labelValue,
          anchor: "center",
          position: new AMap.LngLat(centerLng, centerLat),
          style: {
            "font-size": "10px",
            "font-weight": "500",
            color: "#374151",
            "background-color": "rgba(255,255,255,0.85)",
            padding: "2px 6px",
            "border-radius": "4px",
            border: "none",
          },
        });
        map.add(marker);
        parcelPolygonsRef.current.push(marker);
      }
    });

    const bounds = new AMap.Bounds(
      new AMap.LngLat(
        Math.min(...parcels.map((p) => Math.min(...p.geometry.map((g) => g[0])))),
        Math.min(...parcels.map((p) => Math.min(...p.geometry.map((g) => g[1]))))
      ),
      new AMap.LngLat(
        Math.max(...parcels.map((p) => Math.max(...p.geometry.map((g) => g[0])))),
        Math.max(...parcels.map((p) => Math.max(...p.geometry.map((g) => g[1]))))
      )
    );
    map.setBounds(bounds, [40, 40, 40, 40], false);
  }, [parcels, metric, showLabels, onParcelClick]);

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
