"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Area, AreaEntrance } from "@/lib/area-data";

interface AreaMapProps {
  area: Area;
  height?: string;
  showLegend?: boolean;
  onEntranceClick?: (entrance: AreaEntrance) => void;
}

function loadAMapScript(): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any).AMap) {
      resolve((window as any).AMap);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${process.env.NEXT_PUBLIC_AMAP_KEY}&securityCode=${process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE}&plugin=AMap.PolygonEditor`;
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

export default function AreaMap({
  area,
  height = "h-72",
  showLegend = true,
  onEntranceClick,
}: AreaMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const polygonRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const drawArea = useCallback(
    (AMap: any, currentMap: any) => {
      if (!currentMap || !area) return;

      if (polygonRef.current) {
        currentMap.remove(polygonRef.current);
        polygonRef.current = null;
      }
      markersRef.current.forEach((m) => currentMap.remove(m));
      markersRef.current = [];

      const isOpen = area.category === "open";
      const isLinear = area.shape === "linear";

      const strokeColor = isLinear
        ? "#4b5563"
        : isOpen
        ? "#6b7280"
        : "#1f2937";
      const strokeWeight = isLinear ? 1.5 : 2;
      const strokeStyle = isLinear ? "dotted" : isOpen ? "dashed" : "solid";
      const strokeDasharray = isLinear
        ? [2, 3]
        : isOpen
        ? [8, 4]
        : [];
      const fillColor = isLinear
        ? "#d1d5db"
        : isOpen
        ? "#e5e7eb"
        : "#d1d5db";
      const fillOpacity = isLinear ? 0.25 : 0.35;

      const polygon = new AMap.Polygon({
        path: area.boundary,
        strokeColor,
        strokeWeight,
        strokeStyle,
        strokeDasharray,
        fillColor,
        fillOpacity,
        cursor: "pointer",
      });
      currentMap.add(polygon);
      polygonRef.current = polygon;

      if (isLinear && area.startPoint && area.endPoint && area.boundary.length >= 2) {
        const startCoord = area.boundary[0];
        const endCoord = area.boundary[1];

        const startMarker = new AMap.Marker({
          position: startCoord,
          content: `
            <div style="
              width:12px;
              height:12px;
              border-radius:2px;
              background:#374151;
              border:2px solid #fff;
              box-shadow:0 1px 3px rgba(0,0,0,0.3);
              transform:rotate(45deg);
            "></div>
          `,
          offset: new AMap.Pixel(-6, -6),
          title: `起点：${area.startPoint}`,
        });
        currentMap.add(startMarker);
        markersRef.current.push(startMarker);

        const endMarker = new AMap.Marker({
          position: endCoord,
          content: `
            <div style="
              width:12px;
              height:12px;
              border-radius:2px;
              background:#6b7280;
              border:2px solid #fff;
              box-shadow:0 1px 3px rgba(0,0,0,0.3);
              transform:rotate(45deg);
            "></div>
          `,
          offset: new AMap.Pixel(-6, -6),
          title: `终点：${area.endPoint}`,
        });
        currentMap.add(endMarker);
        markersRef.current.push(endMarker);
      }

      area.entrances.forEach((entrance) => {
        const isMain = entrance.type === "main";
        const isOpenStatus = entrance.isOpen;

        const marker = new AMap.Marker({
          position: [entrance.lng, entrance.lat],
          content: `
            <div style="
              width:${isMain ? 12 : 8}px;
              height:${isMain ? 12 : 8}px;
              border-radius:50%;
              background:${isOpenStatus ? (isLinear ? "#4b5563" : "#1f2937") : "#9ca3af"};
              border:2px solid #fff;
              box-shadow:0 1px 3px rgba(0,0,0,0.3);
              cursor:pointer;
            "></div>
          `,
          offset: new AMap.Pixel(isMain ? -6 : -4, isMain ? -6 : -4),
          title: `${entrance.name}${entrance.openingHours ? " · " + entrance.openingHours : ""}`,
        });

        marker.on("click", () => {
          if (onEntranceClick) {
            onEntranceClick(entrance);
          }
        });

        currentMap.add(marker);
        markersRef.current.push(marker);
      });

      const center = area.center;
      const bounds = polygon.getBounds();
      if (bounds) {
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        const lngDiff = ne.lng - sw.lng;
        const latDiff = ne.lat - sw.lat;
        const maxDiff = Math.max(lngDiff, latDiff);

        let zoom = 14;
        if (maxDiff > 0.2) zoom = 10;
        else if (maxDiff > 0.1) zoom = 11;
        else if (maxDiff > 0.05) zoom = 12;
        else if (maxDiff > 0.02) zoom = 13;
        else if (maxDiff > 0.01) zoom = 14;
        else zoom = 15;

        currentMap.setZoomAndCenter(zoom, [
          (sw.lng + ne.lng) / 2,
          (sw.lat + ne.lat) / 2,
        ]);
      } else {
        currentMap.setZoomAndCenter(14, center);
      }
    },
    [area, onEntranceClick]
  );

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initMap = async () => {
      try {
        const AMap = await loadAMapScript();

        const newMap = new AMap.Map(mapContainerRef.current, {
          zoom: 14,
          center: area.center,
        });

        mapRef.current = newMap;
        setMapReady(true);
        setMapError(null);

        drawArea(AMap, newMap);
      } catch (e: any) {
        console.error("地图加载失败:", e);
        setMapError("地图加载失败，请稍后重试");
      }
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, [area.center, drawArea]);

  useEffect(() => {
    if (mapReady && mapRef.current) {
      const AMap = (window as any).AMap;
      if (AMap) {
        drawArea(AMap, mapRef.current);
      }
    }
  }, [area, mapReady, drawArea]);

  if (mapError) {
    return (
      <div className={`w-full ${height} bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200`}>
        <span className="text-gray-500 text-xs">{mapError}</span>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div
        ref={mapContainerRef}
        className={`w-full ${height} rounded-lg bg-gray-100`}
      ></div>

      {showLegend && (
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded px-2 py-1.5 text-[10px] text-gray-600 border border-gray-200 space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2 border border-gray-800 bg-gray-300/50 rounded-sm"></div>
            <span>封闭面状</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-2 border border-dashed border-gray-500 bg-gray-200/50 rounded-sm"
            ></div>
            <span>开放面状</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-1 border border-dotted border-gray-500 bg-gray-200/30 rounded-sm"
            ></div>
            <span>线性开放</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gray-800 border border-white"></div>
            <span>主出入口</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 border border-white"></div>
            <span>次出入口</span>
          </div>
        </div>
      )}
    </div>
  );
}
