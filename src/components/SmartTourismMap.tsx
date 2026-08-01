"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import type { TourismRoute } from "@/lib/smart-tourism-data";
import SchematicMap, {
  type SchematicPoint,
  type SchematicPolyline,
  type SchematicMarker,
} from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface SmartTourismMapProps {
  route: TourismRoute | null;
  height?: string;
}

export default function SmartTourismMap({
  route,
  height = "h-[500px]",
}: SmartTourismMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "schematic") return;
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
          center: [116.397, 39.903],
          zoom: 12,
          mapStyle: "amap://styles/light",
          features: ["bg", "road", "building"],
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
      markersRef.current = [];
      polylineRef.current = null;
    };
  }, [mode]);

  useEffect(() => {
    if (mode === "schematic") return;
    const map = mapInstanceRef.current;
    const AMap = (window as any).AMap;
    if (!map || !AMap) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    if (polylineRef.current) {
      map.remove(polylineRef.current);
      polylineRef.current = null;
    }

    if (!route || !route.stops || route.stops.length === 0) return;

    const stops = route.stops;
    const lastIndex = stops.length - 1;

    const path = stops.map((s) => new AMap.LngLat(s.lng, s.lat));
    const polyline = new AMap.Polyline({
      path,
      strokeColor: "#3b82f6",
      strokeWeight: 4,
      strokeOpacity: 0.8,
      lineJoin: "round",
      lineCap: "round",
    });
    map.add(polyline);
    polylineRef.current = polyline;

    stops.forEach((stop, i) => {
      const isFirst = i === 0;
      const isLast = i === lastIndex;
      const color = isFirst ? "#10b981" : isLast ? "#ef4444" : "#3b82f6";
      const size = isFirst || isLast ? 42 : 36;
      const label = isFirst ? "起" : isLast ? "终" : String(i + 1);

      const marker = new AMap.Marker({
        position: new AMap.LngLat(stop.lng, stop.lat),
        offset: new AMap.Pixel(-size / 2, -size),
        content: `
          <div style="
            display:flex;flex-direction:column;align-items:center;
            cursor:pointer;transition:all 0.2s;
          ">
            <div style="
              width:${size}px;height:${size}px;border-radius:50%;
              background:${color};
              border:2px solid white;
              box-shadow:0 2px 12px rgba(0,0,0,0.3);
              display:flex;align-items:center;justify-content:center;
              color:white;font-weight:700;
              font-size:${size === 42 ? 14 : 12}px;line-height:1;
            ">${label}</div>
            <div style="
              margin-top:4px;
              background:white;
              border:1px solid ${color};
              color:${color};
              padding:2px 6px;
              border-radius:4px;
              font-size:10px;font-weight:600;
              white-space:nowrap;
              box-shadow:0 1px 4px rgba(0,0,0,0.15);
            ">${stop.name}</div>
          </div>
        `,
        zIndex: isFirst || isLast ? 200 : 100,
      });

      map.add(marker);
      markersRef.current.push(marker);
    });

    const bounds = new AMap.Bounds(
      new AMap.LngLat(
        Math.min(...stops.map((s) => s.lng)) - 0.01,
        Math.min(...stops.map((s) => s.lat)) - 0.01
      ),
      new AMap.LngLat(
        Math.max(...stops.map((s) => s.lng)) + 0.01,
        Math.max(...stops.map((s) => s.lat)) + 0.01
      )
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [route, mode]);

  const schematicData = useMemo(() => {
    if (!route || !route.stops || route.stops.length === 0) {
      return { points: [], polylines: [], markers: [] };
    }
    const stops = route.stops;

    const points: SchematicPoint[] = stops.map((s, i) => {
      const mod = i % 5;
      const catMap: Record<number, 0 | 1 | 2 | 3 | 4> = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 };
      const rMap: Record<number, number> = { 0: 6, 1: 5, 2: 4, 3: 2, 4: 2 };
      return {
        lng: s.lng,
        lat: s.lat,
        id: `pt-${i}`,
        label: s.name,
        category: catMap[mod],
        r: rMap[mod],
      };
    });

    const polylines: SchematicPolyline[] = [
      {
        id: "route-1",
        path: stops.map((s) => ({ lng: s.lng, lat: s.lat })),
        style: 1,
        shade: 700,
        width: 2,
        label: route.name,
      },
    ];

    const markers: SchematicMarker[] = stops.map((s, i) => ({
      lng: s.lng,
      lat: s.lat,
      label: s.name,
      kind: 3,
    }));

    return { points, polylines, markers };
  }, [route]);

  const legend = [
    { label: "5A景区", kind: "point" as const, category: 0 },
    { label: "4A景区", kind: "point" as const, category: 1 },
    { label: "推荐路线", kind: "line" as const, shade: 700 },
    { label: "吃住设施", kind: "point" as const, category: 3 },
  ];

  if (mode === "schematic") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white">
        {route && route.stops && route.stops.length > 0 ? (
          <SchematicMap
            height={500}
            points={schematicData.points}
            polylines={schematicData.polylines}
            markers={schematicData.markers}
            title={route.name}
            legend={legend}
            showCompass
          />
        ) : (
          <div className={`w-full ${height} flex items-center justify-center bg-gray-50`}>
            <div className="text-center text-gray-400">
              <p className="text-xs">请从左侧选择路线查看示意图</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (mode === "osm") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white">
        {route && route.stops && route.stops.length > 0 ? (
          <OsmMap
            height={500}
            points={schematicData.points}
            polylines={schematicData.polylines}
            markers={schematicData.markers}
            title={route.name}
            legend={legend}
          />
        ) : (
          <div className={`w-full ${height} flex items-center justify-center bg-gray-50`}>
            <div className="text-center text-gray-400">
              <p className="text-xs">请从左侧选择路线查看地图</p>
            </div>
          </div>
        )}
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
    <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white">
      {route && route.stops && route.stops.length > 0 ? (
        <div ref={mapRef} className={`w-full ${height}`} />
      ) : (
        <div className={`w-full ${height} flex items-center justify-center bg-gray-50`}>
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-xs">请从左侧选择路线查看地图</p>
          </div>
        </div>
      )}
    </div>
  );
}
