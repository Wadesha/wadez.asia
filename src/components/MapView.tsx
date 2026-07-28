"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import { POI, CATEGORY_ICONS, BusRoute } from "@/lib/types";
import { getCachedRoutes, setCachedRoutes } from "@/lib/route-cache";

interface MapViewProps {
  pois: POI[];
  selectedPoi: POI | null;
  onSelectPoi: (poi: POI | null) => void;
  onMapClick: (lng: number, lat: number) => void;
  isAdding: boolean;
  // 市内公交查询
  cityName: string;
  cityCenter: [number, number];
  origin: { lng: number; lat: number } | null;
  destination: { lng: number; lat: number } | null;
  onRouteResult: (routes: BusRoute[], fromCache: boolean) => void;
  selectedRoute: BusRoute | null;
  // 城际线路绘制（起点终点城市坐标）
  intercityPath?: [number, number][] | null;
}

export default function MapView({
  pois,
  selectedPoi,
  onSelectPoi,
  onMapClick,
  isAdding,
  cityName,
  cityCenter,
  origin,
  destination,
  onRouteResult,
  selectedRoute,
  intercityPath,
}: MapViewProps) {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const routePolylinesRef = useRef<any[]>([]);
  const routeMarkersRef = useRef<any[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const transferRef = useRef<any>(null);

  // 初始化地图
  useEffect(() => {
    (window as any)._AMapSecurityConfig = {
      securityJsCode: process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE,
    };

    AMapLoader.load({
      key: process.env.NEXT_PUBLIC_AMAP_KEY!,
      version: "2.0",
      plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.Geolocation", "AMap.Transfer", "AMap.Geocoder"],
    })
      .then((AMap) => {
        if (!mapContainerRef.current) return;

        const map = new AMap.Map(mapContainerRef.current, {
          zoom: 12,
          center: cityCenter,
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
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 城市切换时移动地图中心
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    mapRef.current.setCity(cityName);
  }, [cityName, mapReady]);

  // 点击事件
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

  // 绘制 POI 标记
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    const map = mapRef.current;
    const AMap = (window as any).AMap;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

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

  // 城际线路绘制（直线/路径）
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    const map = mapRef.current;
    const AMap = (window as any).AMap;

    // 清除旧城际线路
    routePolylinesRef.current.forEach((p) => map.remove(p));
    routePolylinesRef.current = [];
    routeMarkersRef.current.forEach((m) => map.remove(m));
    routeMarkersRef.current = [];

    if (!intercityPath || intercityPath.length < 2) return;

    const polyline = new AMap.Polyline({
      path: intercityPath,
      strokeColor: "#3b82f6",
      strokeWeight: 5,
      strokeOpacity: 0.85,
      strokeStyle: "solid",
      lineJoin: "round",
    });
    map.add(polyline);
    routePolylinesRef.current.push(polyline);

    // 起终点标记
    const start = intercityPath[0];
    const end = intercityPath[intercityPath.length - 1];
    const originMarker = new AMap.Marker({
      position: start,
      icon: new AMap.Icon({
        size: new AMap.Size(36, 36),
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2322c55e'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
      }),
      offset: new AMap.Pixel(-18, -18),
    });
    const destMarker = new AMap.Marker({
      position: end,
      icon: new AMap.Icon({
        size: new AMap.Size(36, 36),
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
      }),
      offset: new AMap.Pixel(-18, -18),
    });
    map.add([originMarker, destMarker]);
    routeMarkersRef.current = [originMarker, destMarker];
    map.setFitView([polyline, originMarker, destMarker]);
  }, [intercityPath, mapReady]);

  // 市内公交换乘查询（带缓存）
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    const map = mapRef.current;
    const AMap = (window as any).AMap;

    // 城际模式时跳过市内查询
    if (intercityPath) {
      return;
    }

    // 清除旧线路
    routePolylinesRef.current.forEach((p) => map.remove(p));
    routePolylinesRef.current = [];
    routeMarkersRef.current.forEach((m) => map.remove(m));
    routeMarkersRef.current = [];

    if (!origin || !destination) {
      console.log("[Transfer] origin or destination is null, origin:", origin, "destination:", destination);
      onRouteResult([], false);
      return;
    }

    // 1. 先查缓存
    const cached = getCachedRoutes(origin, destination);
    if (cached) {
      console.log("[Transfer] cache hit, routes:", cached.length);
      onRouteResult(cached, true);
      drawSelectedRoute(cached);
      return;
    }

    console.log("[Transfer] cache miss, querying API. origin:", origin, "destination:", destination, "city:", cityName);
    console.log("[Transfer] AMap.TransferPolicy:", AMap.TransferPolicy);
    console.log("[Transfer] AMap.TransferPolicy.LEAST_TIME:", AMap.TransferPolicy?.LEAST_TIME);

    // 2. 缓存未命中，请求高德 API
    // 高德 2.0：构造时不传 origin/destination，在 search() 里传坐标
    try {
      const transfer = new AMap.Transfer({
        map: map,
        city: cityName,
      });
      transferRef.current = transfer;
      console.log("[Transfer] created, calling search...");

      transfer.search(
        new AMap.LngLat(origin.lng, origin.lat),
        new AMap.LngLat(destination.lng, destination.lat),
        (status: string, result: any) => {
          console.log("[Transfer] callback fired! status:", status, "result:", result ? JSON.stringify(result).substring(0, 200) : "no result");
      if (status === "complete" && result) {
        const routes = result.routes || [];
        console.log("[Transfer] routes count:", routes.length, "first route:", routes[0]);
        const busRoutes: BusRoute[] = routes.map((route: any, index: number) => {
          const legs = (route.transits || []).map((transit: any) => {
            const stops = (transit.segments || [])
              .map((seg: any) => seg.steps)
              .flat()
              .map((step: any) => ({
                name: step.station?.name || "",
                lng: step.station?.location?.lng || step.path?.[0]?.lng || 0,
                lat: step.station?.location?.lat || step.path?.[0]?.lat || 0,
              }));

            const mode = transit.mode;
            return {
              type: mode === "SUBWAY" || mode === "METRO" ? "metro" as const : mode === "WALK" ? "walk" as const : "bus" as const,
              lineName: transit.line?.name || transit.name || "步行",
              lineColor: transit.line?.color || "#3b82f6",
              stops,
              distance: transit.distance || 0,
              duration: transit.duration || 0,
              price: transit.cost || 0,
            };
          });

          return {
            id: `route-${index}`,
            legs,
            totalDistance: route.distance || 0,
            totalDuration: route.duration || 0,
            totalPrice: route.cost || 0,
            walkDistance: route.walkDistance || 0,
            transferCount: route.transferCount || 0,
            summary: route.summary || "",
          };
        });

        // 写入缓存
        if (busRoutes.length > 0) {
          setCachedRoutes(origin, destination, busRoutes);
        }
        onRouteResult(busRoutes, false);
        drawSelectedRoute(busRoutes);
      } else {
        onRouteResult([], false);
      }
    });
    } catch (e) {
      console.error("[Transfer] error:", e);
      onRouteResult([], false);
    }

    // 绘制选中路线到地图上
    function drawSelectedRoute(busRoutes: BusRoute[]) {
      if (!selectedRoute) {
        // 没有选中路线时，默认画第一条
        if (busRoutes.length > 0) {
          drawRoute(busRoutes[0]);
        }
        return;
      }
      const target = busRoutes.find((r) => r.id === selectedRoute.id) || busRoutes[0];
      if (target) drawRoute(target);
    }

    function drawRoute(route: BusRoute) {
      if (!origin || !destination) return;
      // 清除旧绘制
      routePolylinesRef.current.forEach((p) => map.remove(p));
      routePolylinesRef.current = [];
      routeMarkersRef.current.forEach((m) => map.remove(m));
      routeMarkersRef.current = [];

      // 绘制每段线路
      route.legs.forEach((leg) => {
        if (leg.type === "walk" || leg.stops.length === 0) return;
        const path = leg.stops.map((s) => [s.lng, s.lat]);
        if (path.length >= 2) {
          const polyline = new AMap.Polyline({
            path,
            strokeColor: leg.lineColor || (leg.type === "metro" ? "#ef4444" : "#3b82f6"),
            strokeWeight: 5,
            strokeOpacity: 0.85,
            strokeStyle: "solid",
            lineJoin: "round",
          });
          map.add(polyline);
          routePolylinesRef.current.push(polyline);
        }
      });

      // 起终点标记
      const originMarker = new AMap.Marker({
        position: [origin.lng, origin.lat],
        icon: new AMap.Icon({
          size: new AMap.Size(36, 36),
          image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2322c55e'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
        }),
        offset: new AMap.Pixel(-18, -18),
      });
      const destMarker = new AMap.Marker({
        position: [destination.lng, destination.lat],
        icon: new AMap.Icon({
          size: new AMap.Size(36, 36),
          image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
        }),
        offset: new AMap.Pixel(-18, -18),
      });
      map.add([originMarker, destMarker]);
      routeMarkersRef.current = [originMarker, destMarker];

      // 适配视野
      const all = [...routePolylinesRef.current, originMarker, destMarker];
      if (all.length > 0) {
        map.setFitView(all);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination, mapReady, intercityPath]);

  // 选中路线变化时重新绘制（仅当已有路线数据）
  useEffect(() => {
    if (!mapRef.current || !mapReady || !origin || !destination || !selectedRoute) return;
    // 这里依赖外部传入的 selectedRoute，由父组件保证有数据时重绘
    // 实际重绘逻辑在上面的 effect 里通过闭包处理
  }, [selectedRoute, mapReady, origin, destination]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full"
      style={{ cursor: isAdding ? "crosshair" : "default" }}
    />
  );
}
