"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import { POI, CATEGORY_ICONS } from "@/lib/types";

interface MapViewProps {
  pois: POI[];
  selectedPoi: POI | null;
  onSelectPoi: (poi: POI | null) => void;
  onMapClick: (lng: number, lat: number) => void;
  isAdding: boolean;
}

export default function MapView({
  pois,
  selectedPoi,
  onSelectPoi,
  onMapClick,
  isAdding,
}: MapViewProps) {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const [mapReady, setMapReady] = useState(false);

  // 初始化地图
  useEffect(() => {
    (window as any)._AMapSecurityConfig = {
      securityJsCode: process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE,
    };

    AMapLoader.load({
      key: process.env.NEXT_PUBLIC_AMAP_KEY!,
      version: "2.0",
      plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.Geolocation"],
    })
      .then((AMap) => {
        if (!mapContainerRef.current) return;

        const map = new AMap.Map(mapContainerRef.current, {
          zoom: 5,
          center: [104.065735, 30.659462], // 成都
          mapStyle: "amap://styles/light",
          viewMode: "2D",
        });

        map.addControl(new AMap.Scale());
        map.addControl(new AMap.ToolBar({ position: "RB" }));

        map.on("click", (e: any) => {
          if (isAdding) {
            onMapClick(e.lnglat.getLng(), e.lnglat.getLat());
          }
        });

        mapRef.current = map;
        setMapReady(true);
      })
      .catch((err) => {
        console.error("地图加载失败:", err);
      });

    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  // 更新点击事件监听
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const clickHandler = (e: any) => {
      if (isAdding) {
        onMapClick(e.lnglat.getLng(), e.lnglat.getLat());
      }
    };

    map.on("click", clickHandler);
    return () => map.off("click", clickHandler);
  }, [isAdding, onMapClick]);

  // 渲染 POI 标记
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    const map = mapRef.current;

    // 清除旧标记
    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;

    pois.forEach((poi) => {
      const isSelected = selectedPoi?.id === poi.id;
      const icon = CATEGORY_ICONS[poi.category] || "📍";

      const markerContent = document.createElement("div");
      markerContent.className = `poi-marker ${isSelected ? "poi-marker-selected" : ""}`;
      markerContent.innerHTML = `
        <div class="marker-pin">
          <span class="marker-icon">${icon}</span>
        </div>
        <div class="marker-label">${poi.name}</div>
      `;

      const marker = new AMap.Marker({
        position: [poi.longitude, poi.latitude],
        content: markerContent,
        offset: new AMap.Pixel(-20, -40),
        extData: poi,
      });

      marker.on("click", () => {
        onSelectPoi(poi);
        map.setCenter([poi.longitude, poi.latitude]);
      });

      map.add(marker);
      markersRef.current.push(marker);
    });
  }, [pois, selectedPoi, mapReady, onSelectPoi]);

  // 选中 POI 时定位
  useEffect(() => {
    if (!mapRef.current || !selectedPoi) return;
    mapRef.current.setZoomAndCenter(12, [
      selectedPoi.longitude,
      selectedPoi.latitude,
    ]);
  }, [selectedPoi]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full"
      style={{ cursor: isAdding ? "crosshair" : "default" }}
    />
  );
}
