"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import type { SimulatedCrossCityRoute } from "@/lib/national-cities";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import SchematicMap, {
  type SchematicPolyline,
  type SchematicMarker,
} from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface RouteMapProps {
  route: SimulatedCrossCityRoute;
  fromCity: string;
  toCity: string;
}

const CITY_CENTERS: Record<string, [number, number]> = {
  "北京": [116.4074, 39.9042],
  "天津": [117.2009, 39.0842],
  "廊坊": [116.7052, 39.5258],
  "保定": [115.4833, 38.8611],
  "石家庄": [114.5025, 38.0423],
  "太原": [112.5492, 37.8573],
  "上海": [121.4737, 31.2304],
  "南京": [118.7969, 32.0603],
  "苏州": [120.6196, 31.3251],
  "杭州": [120.1551, 30.2741],
  "济南": [117.1272, 36.6512],
  "青岛": [120.3317, 36.0671],
  "合肥": [117.2272, 31.8206],
  "南昌": [115.8594, 28.6821],
  "广州": [113.2644, 23.1291],
  "深圳": [114.0579, 22.5431],
  "厦门": [118.0894, 24.4798],
  "南宁": [108.3129, 22.8170],
  "武汉": [114.3055, 30.5928],
  "长沙": [112.9388, 28.2280],
  "郑州": [113.6240, 34.7466],
  "成都": [104.0668, 30.5728],
  "重庆": [106.5516, 29.5630],
  "昆明": [102.7122, 24.8877],
  "贵阳": [106.6302, 26.6474],
  "西安": [108.9480, 34.2631],
  "兰州": [103.8343, 36.0611],
  "乌鲁木齐": [87.6168, 43.8256],
  "沈阳": [123.4328, 41.8047],
  "长春": [125.3235, 43.8268],
  "哈尔滨": [126.6425, 45.8038],
  "大连": [121.6147, 38.9140],
};

function deterministicHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getDeterministicOffset(base: number, seed: string, range: number): number {
  const hash = deterministicHash(seed);
  return base + ((hash / 0x7fffffff) - 0.5) * range;
}

export default function RouteMap({ route, fromCity, toCity }: RouteMapProps) {
  const { mode: mapMode } = useMapMode();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const polylinesRef = useRef<any[]>([]);

  const routePoints = useMemo(() => {
    const pts: [number, number][] = [];
    let currentLng = CITY_CENTERS[fromCity]?.[0] || 116.4074;
    let currentLat = CITY_CENTERS[fromCity]?.[1] || 39.9042;
    pts.push([currentLng, currentLat]);
    route.segments.forEach((seg, idx) => {
      if (seg.type === "bus") {
        const cityCenter = CITY_CENTERS[seg.city || fromCity];
        if (cityCenter) {
          currentLng = getDeterministicOffset(cityCenter[0], `${seg.line}-${idx}-lng`, 0.5);
          currentLat = getDeterministicOffset(cityCenter[1], `${seg.line}-${idx}-lat`, 0.5);
        } else {
          currentLng = getDeterministicOffset(currentLng, `${seg.line}-${idx}-lng`, 1);
          currentLat = getDeterministicOffset(currentLat, `${seg.line}-${idx}-lat`, 1);
        }
      } else {
        const toCityCenter = CITY_CENTERS[seg.toCity || toCity];
        if (toCityCenter) {
          currentLng = (currentLng + toCityCenter[0]) / 2;
          currentLat = (currentLat + toCityCenter[1]) / 2;
        }
      }
      pts.push([currentLng, currentLat]);
    });
    const toCenter = CITY_CENTERS[toCity];
    if (toCenter) {
      pts.push([toCenter[0], toCenter[1]]);
    }
    return pts;
  }, [route, fromCity, toCity]);

  const schematicMarkers = useMemo<SchematicMarker[]>(() => {
    const result: SchematicMarker[] = [];
    const startPos = routePoints[0];
    result.push({
      lng: startPos[0],
      lat: startPos[1],
      label: fromCity,
      kind: 0,
    });
    route.segments.forEach((seg, idx) => {
      if (seg.type === "walk" && idx > 0) {
        const pointIdx = idx + 1;
        if (routePoints[pointIdx]) {
          result.push({
            lng: routePoints[pointIdx][0],
            lat: routePoints[pointIdx][1],
            label: `${seg.from}↔${seg.to}`,
            kind: 2,
          });
        }
      }
    });
    const endPos = routePoints[routePoints.length - 1];
    result.push({
      lng: endPos[0],
      lat: endPos[1],
      label: toCity,
      kind: 1,
    });
    return result;
  }, [route, routePoints, fromCity, toCity]);

  const schematicPolylines = useMemo<SchematicPolyline[]>(() => {
    const result: SchematicPolyline[] = [];
    let startIdx = 0;
    route.segments.forEach((seg, idx) => {
      const endIdx = idx + 2;
      if (endIdx <= routePoints.length) {
        const segPts = routePoints.slice(startIdx, endIdx);
        result.push({
          id: `seg-${idx}`,
          path: segPts.map(([lng, lat]) => ({ lng, lat })),
          style: seg.type === "walk" ? 2 : 1,
          shade: seg.type === "walk" ? 400 : 700,
          width: seg.type === "walk" ? 1.5 : 2.5,
          label: seg.type === "bus" ? seg.line : "步行",
        });
        startIdx = endIdx - 1;
      }
    });
    return result;
  }, [route, routePoints]);

  const schematicLegend = [
    { label: "公交", kind: "line" as const, shade: 700 },
    { label: "步行", kind: "line" as const, shade: 400 },
  ];

  if (mapMode === "schematic") {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-2">
        <SchematicMap
          height={224}
          polylines={schematicPolylines}
          markers={schematicMarkers}
          legend={schematicLegend}
          title={`${fromCity} → ${toCity} 路线示意图`}
          showCompass
        />
      </div>
    );
  }
  if (mapMode === "osm") {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-2">
        <OsmMap
          height={500}
          polylines={schematicPolylines}
          markers={schematicMarkers}
          legend={schematicLegend}
          title={`${fromCity} → ${toCity} 路线示意图`}
        />
      </div>
    );
  }

  const drawRoute = useCallback((AMap: any, currentMap: any) => {
    if (!currentMap || !route) return;

    markersRef.current.forEach((m) => currentMap.remove(m));
    markersRef.current = [];
    polylinesRef.current.forEach((p) => currentMap.remove(p));
    polylinesRef.current = [];

    const segments = route.segments;
    const points: [number, number][] = [];
    let currentLng = CITY_CENTERS[fromCity]?.[0] || 116.4074;
    let currentLat = CITY_CENTERS[fromCity]?.[1] || 39.9042;

    points.push([currentLng, currentLat]);

    segments.forEach((seg, idx) => {
      if (seg.type === "bus") {
        const cityCenter = CITY_CENTERS[seg.city || fromCity];
        if (cityCenter) {
          currentLng = getDeterministicOffset(cityCenter[0], `${seg.line}-${idx}-lng`, 0.5);
          currentLat = getDeterministicOffset(cityCenter[1], `${seg.line}-${idx}-lat`, 0.5);
        } else {
          currentLng = getDeterministicOffset(currentLng, `${seg.line}-${idx}-lng`, 1);
          currentLat = getDeterministicOffset(currentLat, `${seg.line}-${idx}-lat`, 1);
        }
      } else {
        const toCityCenter = CITY_CENTERS[seg.toCity || toCity];
        if (toCityCenter) {
          currentLng = (currentLng + toCityCenter[0]) / 2;
          currentLat = (currentLat + toCityCenter[1]) / 2;
        }
      }
      points.push([currentLng, currentLat]);
    });

    const toCenter = CITY_CENTERS[toCity];
    if (toCenter) {
      points.push([toCenter[0], toCenter[1]]);
    }

    const startPos = CITY_CENTERS[fromCity] || points[0];
    const startMarker = new AMap.Marker({
      position: startPos,
      content: `<div style="width:14px;height:14px;border-radius:50%;background:#1f2937;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>`,
      offset: new AMap.Pixel(-7, -7),
      title: `${fromCity}市政府`,
    });
    currentMap.add(startMarker);
    markersRef.current.push(startMarker);

    const endPos = CITY_CENTERS[toCity] || points[points.length - 1];
    const endMarker = new AMap.Marker({
      position: endPos,
      content: `<div style="width:14px;height:14px;border-radius:50%;background:#1f2937;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>`,
      offset: new AMap.Pixel(-7, -7),
      title: `${toCity}市政府`,
    });
    currentMap.add(endMarker);
    markersRef.current.push(endMarker);

    segments.forEach((seg, idx) => {
      if (seg.type === "walk" && idx > 0) {
        const pointIdx = idx + 1;
        if (points[pointIdx]) {
          const transferMarker = new AMap.Marker({
            position: points[pointIdx],
            content: `<div style="width:10px;height:10px;border-radius:50%;background:#6b7280;border:2px solid #fff;box-shadow:0 1px 2px rgba(0,0,0,0.2);"></div>`,
            offset: new AMap.Pixel(-5, -5),
            title: `${seg.from} ↔ ${seg.to}`,
          });
          currentMap.add(transferMarker);
          markersRef.current.push(transferMarker);
        }
      }
    });

    let startIdx = 0;
    segments.forEach((seg, idx) => {
      const endIdx = idx + 2;
      if (endIdx <= points.length) {
        const segPoints = points.slice(startIdx, endIdx);
        const polyline = new AMap.Polyline({
          path: segPoints,
          strokeColor: seg.isSimulated ? "#9ca3af" : "#1f2937",
          strokeWeight: 4,
          strokeStyle: seg.type === "walk" ? "dashed" : "solid",
          strokeDasharray: seg.type === "walk" ? [10, 5] : [],
        });
        currentMap.add(polyline);
        polylinesRef.current.push(polyline);
        startIdx = endIdx - 1;
      }
    });

    if (points.length >= 2) {
      const minLng = points.reduce((min, p) => Math.min(min, p[0]), Infinity);
      const minLat = points.reduce((min, p) => Math.min(min, p[1]), Infinity);
      const maxLng = points.reduce((max, p) => Math.max(max, p[0]), -Infinity);
      const maxLat = points.reduce((max, p) => Math.max(max, p[1]), -Infinity);
      
      const centerLng = (minLng + maxLng) / 2;
      const centerLat = (minLat + maxLat) / 2;
      
      const lngDiff = maxLng - minLng;
      const latDiff = maxLat - minLat;
      const maxDiff = Math.max(lngDiff, latDiff);
      
      let zoom = 10;
      if (maxDiff > 5) zoom = 6;
      else if (maxDiff > 3) zoom = 8;
      else if (maxDiff > 1) zoom = 9;
      else if (maxDiff > 0.5) zoom = 11;
      else zoom = 13;
      
      currentMap.setZoomAndCenter(zoom, [centerLng, centerLat]);
    }
  }, [route, fromCity, toCity]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!isAMapConfigured()) {
      setMapError("高德地图 API Key 未配置，地图无法显示");
      return;
    }

    const initMap = async () => {
      try {
        const AMap = await loadAMap(["AMap.Geocoder"]);

        const fromCenter = CITY_CENTERS[fromCity] || [116.4074, 39.9042];
        const toCenter = CITY_CENTERS[toCity] || [117.2009, 39.0842];

        const centerLng = (fromCenter[0] + toCenter[0]) / 2;
        const centerLat = (fromCenter[1] + toCenter[1]) / 2;

        const newMap = new AMap.Map(mapContainerRef.current, {
          zoom: 10,
          center: [centerLng, centerLat],
        });

        mapRef.current = newMap;
        setMapReady(true);
        setMapError(null);

        drawRoute(AMap, newMap);
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
  }, [fromCity, toCity, drawRoute]);

  useEffect(() => {
    if (mapReady && mapRef.current) {
      const AMap = (window as any).AMap;
      if (AMap) {
        drawRoute(AMap, mapRef.current);
      }
    }
  }, [route, mapReady, drawRoute]);

  if (mapError) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-2">
        <div className="w-full h-56 bg-gray-50 rounded-lg flex items-center justify-center">
          <span className="text-gray-500 text-xs">{mapError}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2 relative">
      <div ref={mapContainerRef} className="w-full h-56 rounded-lg bg-gray-100"></div>
      {/* 图例浮层 - 右上角 */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded px-2 py-1 flex items-center gap-2 text-[10px] text-gray-600 border border-gray-200">
        <div className="flex items-center gap-0.5">
          <div className="w-2.5 h-0.5 bg-gray-800"></div>
          <span>真实</span>
        </div>
        <div className="flex items-center gap-0.5">
          <div className="w-2.5 h-0.5 bg-gray-400"></div>
          <span>模拟</span>
        </div>
        <div className="flex items-center gap-0.5">
          <div className="w-2.5 h-0.5" style={{ background: 'repeating-linear-gradient(to right, #6b7280 0, #6b7280 2px, transparent 2px, transparent 4px)' }}></div>
          <span>步行</span>
        </div>
      </div>
    </div>
  );
}
