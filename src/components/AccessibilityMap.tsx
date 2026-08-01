"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import type { Facility, FacilityType, IsochroneRing } from "@/lib/accessibility-data";
import { FACILITY_COLORS, FACILITY_ICONS } from "@/lib/accessibility-data";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import SchematicMap, {
  type SchematicPolygon,
  type SchematicPoint,
  type SchematicMarker,
} from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

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

const ISOCHRONE_COLORS = [
  { fill: "rgba(16, 185, 129, 0.15)", stroke: "#10b981" },
  { fill: "rgba(59, 130, 246, 0.12)", stroke: "#3b82f6" },
  { fill: "rgba(245, 158, 11, 0.1)", stroke: "#f59e0b" },
  { fill: "rgba(239, 68, 68, 0.08)", stroke: "#ef4444" },
];

function generateCirclePath(
  centerLng: number,
  centerLat: number,
  radiusDeg: number,
  segments = 36
): Array<{ lng: number; lat: number }> {
  const path: Array<{ lng: number; lat: number }> = [];
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const lng = centerLng + Math.cos(angle) * radiusDeg;
    const lat = centerLat + Math.sin(angle) * radiusDeg;
    path.push({ lng, lat });
  }
  return path;
}

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
  const { mode: mapMode } = useMapMode();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const isochronePolygonsRef = useRef<any[]>([]);
  const facilityMarkersRef = useRef<any[]>([]);
  const centerMarkerRef = useRef<any>(null);

  const [centerLng, centerLat] = center;

  const schematicMarkers = useMemo<SchematicMarker[]>(() => {
    return [
      {
        lng: centerLng,
        lat: centerLat,
        label: "起点",
        kind: 0,
      },
    ];
  }, [centerLng, centerLat]);

  const schematicPoints = useMemo<SchematicPoint[]>(() => {
    const filtered =
      activeTypes.length > 0
        ? facilities.filter((f) => activeTypes.includes(f.type))
        : facilities;
    return filtered.slice(0, 200).map((f, i) => ({
      id: f.id || i,
      lng: f.lng,
      lat: f.lat,
      category: 2,
      label: f.name,
      onClick: onFacilityClick ? () => onFacilityClick(f) : undefined,
    }));
  }, [facilities, activeTypes, onFacilityClick]);

  const schematicPolygons = useMemo<SchematicPolygon[]>(() => {
    if (!showIsochrones) return [];
    if (isochrones.length > 0) {
      const shades: Array<300 | 500 | 700 | 900> = [900, 700, 500, 300];
      const opacities = [0.35, 0.28, 0.2, 0.12];
      return isochrones.slice(0, 3).map((ring, i) => ({
        id: `iso-${i}`,
        path: ring.path.map(([lng, lat]) => ({ lng, lat })),
        shade: shades[i] ?? 500,
        opacity: opacities[i] ?? 0.2,
        label: `${ring.timeMin}分钟圈`,
      }));
    }
    const radii = [0.01, 0.02, 0.035];
    const shades: Array<300 | 500 | 700 | 900> = [900, 700, 500];
    const opacities = [0.35, 0.28, 0.2];
    const times = [5, 10, 15];
    return radii.map((r, i) => ({
      id: `iso-${i}`,
      path: generateCirclePath(centerLng, centerLat, r),
      shade: shades[i],
      opacity: opacities[i],
      label: `${times[i]}分钟圈`,
    }));
  }, [showIsochrones, isochrones, centerLng, centerLat]);

  const schematicLegend = [
    { label: "15分钟圈", kind: "area" as const, shade: 500 },
    { label: "10分钟圈", kind: "area" as const, shade: 700 },
    { label: "5分钟圈", kind: "area" as const, shade: 900 },
  ];

  if (mapMode === "schematic") {
    return (
      <SchematicMap
        height={500}
        markers={schematicMarkers}
        points={schematicPoints}
        polygons={schematicPolygons}
        legend={schematicLegend}
        title="可达性分析示意图"
        showCompass
      />
    );
  }
  if (mapMode === "osm") {
    return (
      <OsmMap
        height={500}
        center={center}
        zoom={zoom}
        markers={schematicMarkers}
        points={schematicPoints}
        polygons={schematicPolygons}
        legend={schematicLegend}
        title="可达性分析示意图"
      />
    );
  }

  useEffect(() => {
    let mounted = true;

    if (!isAMapConfigured()) {
      setMapError("高德地图 API Key 未配置，地图无法显示");
      return;
    }

    loadAMap()
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
