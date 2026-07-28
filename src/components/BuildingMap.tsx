"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Building, BuildingFunction } from "@/lib/building-morphology-data";
import { FUNCTION_COLORS, getHeightColor } from "@/lib/building-morphology-data";

export type ColorMode = "height" | "function" | "era";
export type ViewMode = "top" | "perspective";

interface BuildingMapProps {
  buildings: Building[];
  center: [number, number];
  zoom?: number;
  height?: string;
  colorMode: ColorMode;
  viewMode: ViewMode;
  onBuildingClick?: (building: Building) => void;
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

export default function BuildingMap({
  buildings,
  center,
  zoom = 16,
  height = "h-96",
  colorMode,
  viewMode,
  onBuildingClick,
}: BuildingMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const polygonsRef = useRef<any[]>([]);

  useEffect(() => {
    let mounted = true;

    loadAMapScript()
      .then((AMap) => {
        if (!mounted || !mapContainerRef.current) return;

        const map = new AMap.Map(mapContainerRef.current, {
          zoom,
          center,
          mapStyle: "amap://styles/whitesmoke",
          viewMode: viewMode === "perspective" ? "3D" : "2D",
          pitch: viewMode === "perspective" ? 45 : 0,
          rotation: viewMode === "perspective" ? -30 : 0,
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

  useEffect(() => {
    if (mapRef.current) {
      if (viewMode === "perspective") {
        mapRef.current.setPitch(45);
        mapRef.current.setRotation(-30);
      } else {
        mapRef.current.setPitch(0);
        mapRef.current.setRotation(0);
      }
    }
  }, [viewMode]);

  const getBuildingColor = useCallback(
    (building: Building, maxHeight: number): string => {
      if (colorMode === "height") {
        return getHeightColor(building.heightM, maxHeight);
      } else if (colorMode === "function") {
        return FUNCTION_COLORS[building.function as BuildingFunction] || "#9ca3af";
      } else {
        const eraColors: Record<string, string> = {
          "pre-1949": "#d97706",
          "1950s-1970s": "#65a30d",
          "1980s-1990s": "#0891b2",
          "2000s": "#2563eb",
          "2010s+": "#7c3aed",
          unknown: "#6b7280",
        };
        return eraColors[building.era] || "#6b7280";
      }
    },
    [colorMode]
  );

  const clearBuildings = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    polygonsRef.current.forEach((p) => map.remove(p));
    polygonsRef.current = [];
  }, []);

  const drawBuildings = useCallback(() => {
    const map = mapRef.current;
    const AMap = (window as any).AMap;
    if (!map || !AMap || buildings.length === 0) return;

    clearBuildings();

    const maxHeight = Math.max(...buildings.map((b) => b.heightM), 10);

    const sortedBuildings = [...buildings].sort(
      (a, b) => a.heightM - b.heightM
    );

    sortedBuildings.forEach((building) => {
      const fillColor = getBuildingColor(building, maxHeight);

      const polygon = new AMap.Polygon({
        path: building.boundary,
        strokeColor: "rgba(255,255,255,0.5)",
        strokeWeight: 0.5,
        strokeOpacity: 0.5,
        fillColor,
        fillOpacity: 0.85,
        zIndex: Math.floor(building.heightM),
        cursor: "pointer",
        extData: building,
      });

      polygon.on("click", () => {
        if (onBuildingClick) {
          onBuildingClick(building);
        }
      });

      polygon.setMap(map);
      polygonsRef.current.push(polygon);
    });
  }, [buildings, getBuildingColor, clearBuildings, onBuildingClick]);

  useEffect(() => {
    if (mapReady) {
      drawBuildings();
    }
  }, [mapReady, drawBuildings]);

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
        className={`w-full ${height} rounded-lg bg-gray-100`}
      ></div>
    </div>
  );
}
