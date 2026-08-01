"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import { LAND_USE_COLORS, LAND_USE_LABELS, type LandUseParcel, type LandUseType } from "@/lib/land-use-data";
import SchematicMap, { type SchematicPolygon } from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface LandUseMapProps {
  parcels: LandUseParcel[];
  center: [number, number];
  zoom?: number;
  height?: string;
  colorMode?: "type" | "far" | "density";
  showLabels?: boolean;
  onParcelClick?: (parcel: LandUseParcel) => void;
}

const TYPE_SHADE: Record<LandUseType, 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900> = {
  residential: 300,
  commercial: 500,
  industrial: 700,
  "green-space": 200,
  "public-facility": 400,
  "road-square": 600,
  water: 200,
  "mixed-use": 400,
};

export default function LandUseMap({
  parcels,
  center,
  zoom = 14,
  height = "h-[500px]",
  colorMode = "type",
  showLabels = false,
  onParcelClick,
}: LandUseMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const parcelPolygonsRef = useRef<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const schematicPolygons = useMemo<SchematicPolygon[]>(() => {
    return parcels.map((p) => ({
      id: p.id,
      label: `${LAND_USE_LABELS[p.type]} · ${p.areaHa.toFixed(1)}ha`,
      path: p.geometry.map(([lng, lat]) => ({ lng, lat })),
      shade: TYPE_SHADE[p.type],
      opacity: 0.55,
      strokeShade: 500,
      onClick: onParcelClick ? () => onParcelClick(p) : undefined,
    }));
  }, [parcels, onParcelClick]);

  const legend = useMemo(() => {
    const types = new Set(parcels.map((p) => p.type));
    return Array.from(types).map((t) => ({
      label: LAND_USE_LABELS[t],
      kind: "area" as const,
      shade: TYPE_SHADE[t],
    }));
  }, [parcels]);

  if (mode === "schematic") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200">
        <SchematicMap
          width={800}
          height={500}
          polygons={schematicPolygons}
          legend={legend}
          title="用地性质示意图"
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
          title="用地性质示意图"
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
      let fillColor = LAND_USE_COLORS[parcel.type];
      let fillOpacity = 0.5;
      let strokeColor = "#fff";
      let strokeWeight = 1;

      if (colorMode === "far" && parcel.floorAreaRatio != null) {
        const far = parcel.floorAreaRatio;
        const t = Math.min(far / 5, 1);
        const r = Math.round(255 * t);
        const g = Math.round(100 + 100 * (1 - t));
        const b = Math.round(100 + 50 * (1 - t));
        fillColor = `rgb(${r}, ${g}, ${b})`;
        fillOpacity = 0.7;
      } else if (colorMode === "density" && parcel.buildingDensity != null) {
        const d = parcel.buildingDensity;
        const t = Math.min(d / 60, 1);
        const r = Math.round(100 + 100 * t);
        const g = Math.round(150 - 50 * t);
        const b = Math.round(200 - 100 * t);
        fillColor = `rgb(${r}, ${g}, ${b})`;
        fillOpacity = 0.7;
      }

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
        const marker = new AMap.Text({
          text: `${parcel.areaHa.toFixed(1)}ha`,
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
  }, [parcels, colorMode, showLabels, onParcelClick]);

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
