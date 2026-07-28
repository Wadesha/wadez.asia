"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Facility, FacilityType, IsochroneRing } from "@/lib/accessibility-data";
import { FACILITY_COLORS, FACILITY_ICONS } from "@/lib/accessibility-data";

interface AccessibilityMapProps {
  facilities: Facility[];
  center: [number, number];
  isochrones: IsochroneRing[];
  zoom?: number;
  height?: string;
  activeTypes: FacilityType[];
  showIsochrones: boolean;
  showFacilities: boolean;
  onMapClick?: (lng: number, lat: number) => void;
  onFacilityClick?: (facility: Facility) => void;
}

function loadAMapScript(): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any).AMap) {
      resolve((window as any).AMap);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${process.env.NEXT_PUBLIC_AMAP_KEY}&securityCode=${process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE}`;
    script.async = true;
    script.onload = () => {
      const AMap = (window as any).AMap;
      if (AMap) {
        resolve(AMap);
      } else {
        reject(new Error("AMap not loaded"));
      }
    };
    script.onerror = () => {
      reject(new Error("Failed to load AMap script"));
    };
    document.head.appendChild(script);
  });
}

const ISOCHRONE_COLORS = [
  { fill: "rgba(16, 185, 129, 0.15)", stroke: "#10b981" },
  { fill: "rgba(59, 130, 246, 0.12)", stroke: "#3b82f6" },
  { fill: "rgba(245, 158, 11, 0.1)", stroke: "#f59e0b" },
  { fill: "rgba(239, 68, 68, 0.08)", stroke: "#ef4444" },
];

export default function AccessibilityMap({
  facilities,
  center,
  isochrones,
  zoom = 13,
  height = "h-96",
  activeTypes,
  showIsochrones,
  showFacilities,
  onMapClick,
  onFacilityClick,
}: AccessibilityMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const isochronePolygonsRef = useRef<any[]>([]);
  const facilityMarkersRef = useRef<any[]>([]);
  const centerMarkerRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    loadAMapScript()
      .then((AMap) => {
        if (!mounted || !mapContainerRef.current) return;

        const map = new AMap.Map(mapContainerRef.current, {
          zoom,
          center,
          mapStyle: "amap://styles/whitesmoke",
          viewMode: "2D",
        });

        map.on("click", (e: any) => {
          if (onMapClick && e.lnglat) {
            onMapClick(e.lnglat.lng, e.lnglat.lat);
          }
        });

        mapRef.current = map;
        setMapReady(true);
      })
      .catch((err) => {
        if (mounted) {
          setMapError(err.message);
        }
      });

    return () => {
      mounted = false;
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setZoomAndCenter(zoom, center);
    }
  }, [center, zoom]);

  const clearAll = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    isochronePolygonsRef.current.forEach((p) => map.remove(p));
    isochronePolygonsRef.current = [];
    facilityMarkersRef.current.forEach((m) => map.remove(m));
    facilityMarkersRef.current = [];
    if (centerMarkerRef.current) {
      map.remove(centerMarkerRef.current);
      centerMarkerRef.current = null;
    }
  }, []);

  const drawIsochrones = useCallback(() => {
    const map = mapRef.current;
    const AMap = (window as any).AMap;
    if (!map || !AMap || !showIsochrones || isochrones.length === 0) return;

    isochrones.forEach((ring, idx) => {
      const colors = ISOCHRONE_COLORS[Math.min(idx, ISOCHRONE_COLORS.length - 1)];

      const polygon = new AMap.Polygon({
        path: ring.path,
        strokeColor: colors.stroke,
        strokeWeight: 1.5,
        strokeOpacity: 0.6,
        strokeStyle: "dashed",
        strokeDasharray: [6, 4],
        fillColor: colors.stroke,
        fillOpacity: idx === 0 ? 0.15 : idx === 1 ? 0.1 : idx === 2 ? 0.06 : 0.04,
        zIndex: 10 - idx,
      });

      polygon.setMap(map);
      isochronePolygonsRef.current.push(polygon);
    });

    const centerMarker = new AMap.Marker({
      position: center,
      content: `
        <div style="
          width:16px;
          height:16px;
          border-radius:50%;
          background:#1f2937;
          border:3px solid #fff;
          box-shadow:0 2px 6px rgba(0,0,0,0.3);
          cursor:move;
        "></div>
      `,
      offset: new AMap.Pixel(-8, -8),
      title: "起点（拖动或点击地图修改）",
      zIndex: 100,
    });

    centerMarker.setMap(map);
    centerMarkerRef.current = centerMarker;
  }, [isochrones, showIsochrones, center]);

  const drawFacilities = useCallback(() => {
    const map = mapRef.current;
    const AMap = (window as any).AMap;
    if (!map || !AMap || !showFacilities || facilities.length === 0) return;

    const filteredFacilities =
      activeTypes.length > 0
        ? facilities.filter((f) => activeTypes.includes(f.type))
        : facilities;

    const showCount = Math.min(filteredFacilities.length, 200);
    const step = Math.max(1, Math.floor(filteredFacilities.length / showCount));

    for (let i = 0; i < filteredFacilities.length; i += step) {
      const facility = filteredFacilities[i];
      const color = FACILITY_COLORS[facility.type];

      const marker = new AMap.Marker({
        position: [facility.lng, facility.lat],
        content: `
          <div style="
            width:20px;
            height:20px;
            border-radius:50%;
            background:${color};
            border:2px solid #fff;
            box-shadow:0 1px 3px rgba(0,0,0,0.2);
            cursor:pointer;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:10px;
          ">${FACILITY_ICONS[facility.type]}</div>
        `,
        offset: new AMap.Pixel(-10, -10),
        title: facility.name,
        zIndex: 50,
        extData: facility,
      });

      marker.on("click", () => {
        if (onFacilityClick) {
          onFacilityClick(facility);
        }
      });

      marker.setMap(map);
      facilityMarkersRef.current.push(marker);
    }
  }, [facilities, activeTypes, showFacilities, onFacilityClick]);

  useEffect(() => {
    if (mapReady) {
      clearAll();
      drawIsochrones();
      drawFacilities();
    }
  }, [mapReady, drawIsochrones, drawFacilities, clearAll]);

  if (mapError) {
    return (
      <div
        className={`w-full ${height} bg-gray-100 rounded-lg flex items-center justify-center`}
      >
        <span className="text-gray-400 text-xs">地图加载失败</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={mapContainerRef}
        className={`w-full ${height} rounded-lg bg-gray-100 cursor-crosshair`}
      ></div>
    </div>
  );
}
