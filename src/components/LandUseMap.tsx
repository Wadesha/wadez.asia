"use client";

import { useEffect, useRef } from "react";
import { LAND_USE_COLORS, type LandUseParcel, type LandUseType } from "@/lib/land-use-data";

interface LandUseMapProps {
  parcels: LandUseParcel[];
  center: [number, number];
  zoom?: number;
  height?: string;
  colorMode?: "type" | "far" | "density";
  showLabels?: boolean;
  onParcelClick?: (parcel: LandUseParcel) => void;
}

export default function LandUseMap({
  parcels,
  center,
  zoom = 14,
  height = "h-[500px]",
  colorMode = "type",
  showLabels = false,
  onParcelClick,
}: LandUseMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const parcelPolygonsRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const AMap = (window as any).AMap;
    if (!AMap) return;

    const map = new AMap.Map(mapRef.current, {
      center,
      zoom,
      mapStyle: "amap://styles/light",
      features: ["bg", "road"],
    });
    mapInstanceRef.current = map;

    return () => {
      map.destroy();
      mapInstanceRef.current = null;
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

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200">
      <div ref={mapRef} className={`w-full ${height}`} />
    </div>
  );
}
