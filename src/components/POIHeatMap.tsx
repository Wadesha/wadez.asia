"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import type { POI, POICategory, HeatGridCell } from "@/lib/poi-heat-data";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/poi-heat-data";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import SchematicMap from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

export type HeatMapMode = "heatmap" | "grid" | "points";

interface POIHeatMapProps {
  pois: POI[];
  center: [number, number];
  zoom?: number;
  height?: string;
  mode: HeatMapMode;
  opacity: number;
  gridCells?: HeatGridCell[];
  onPOIClick?: (poi: POI) => void;
}

function getHeatColor(value: number, max: number): string {
  const ratio = Math.min(value / max, 1);
  if (ratio < 0.2) return "#fef3c7";
  if (ratio < 0.4) return "#fde68a";
  if (ratio < 0.6) return "#fbbf24";
  if (ratio < 0.8) return "#f97316";
  return "#ef4444";
}

export default function POIHeatMap({
  pois,
  center,
  zoom = 12,
  height = "h-96",
  mode,
  opacity,
  gridCells = [],
  onPOIClick,
}: POIHeatMapProps) {
  const { mode: mapMode } = useMapMode();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const heatmapRef = useRef<any>(null);
  const gridPolygonsRef = useRef<any[]>([]);
  const markersRef = useRef<any[]>([]);

  const categoryOrder: POICategory[] = [
    "food", "shopping", "entertainment", "education",
    "healthcare", "transport", "public-service", "residential",
  ];

  const schematicPoints = useMemo(() => {
    return pois.map((p, i) => {
      const catIdx = categoryOrder.indexOf(p.category);
      return {
        id: p.id || i,
        lng: p.lng,
        lat: p.lat,
        r: 2 + Math.min(5, catIdx % 6),
        category: ((catIdx % 5) as 0 | 1 | 2 | 3 | 4),
        label: p.name,
        onClick: onPOIClick ? () => onPOIClick(p) : undefined,
      };
    });
  }, [pois, onPOIClick]);

  const schematicLegend = useMemo(() => {
    const usedCategories = new Set(pois.map((p) => p.category));
    return categoryOrder
      .filter((c) => usedCategories.has(c))
      .slice(0, 5)
      .map((c, i) => ({
        label: CATEGORY_LABELS[c],
        kind: "point" as const,
        category: (i as 0 | 1 | 2 | 3 | 4),
      }));
  }, [pois]);

  if (mapMode === "schematic") {
    return (
      <SchematicMap
        height={500}
        points={schematicPoints}
        legend={schematicLegend}
        title="POI 分布示意图"
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
        points={schematicPoints}
        legend={schematicLegend}
        title="POI 分布示意图"
      />
    );
  }

  useEffect(() => {
    let mounted = true;

    if (!isAMapConfigured()) {
      setMapError("高德地图 API Key 未配置，地图无法显示");
      return;
    }

    loadAMap(["AMap.HeatMap"])
      .then((AMap) => {
        if (!mounted || !mapContainerRef.current) return;

        const map = new AMap.Map(mapContainerRef.current, {
          zoom,
          center,
          mapStyle: "amap://styles/whitesmoke",
          viewMode: "2D",
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

  const clearAllOverlays = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    if (heatmapRef.current) {
      heatmapRef.current.setDataSet({ data: [], max: 100 });
      heatmapRef.current.hide();
    }

    gridPolygonsRef.current.forEach((p) => map.remove(p));
    gridPolygonsRef.current = [];

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];
  }, []);

  const drawHeatmap = useCallback(
    (AMap: any, map: any) => {
      clearAllOverlays();

      if (!heatmapRef.current) {
        heatmapRef.current = new AMap.HeatMap(map, {
          radius: 25,
          opacity: [0, opacity],
          gradient: {
            0.2: "#fef3c7",
            0.4: "#fde68a",
            0.6: "#fbbf24",
            0.8: "#f97316",
            1.0: "#ef4444",
          },
        });
      }

      const heatData = pois.map((p) => ({
        lng: p.lng,
        lat: p.lat,
        count: 1,
      }));

      const max = Math.max(10, Math.ceil(pois.length / 50));

      heatmapRef.current.setDataSet({
        data: heatData,
        max,
      });
      heatmapRef.current.setOptions({
        opacity: [0, opacity],
      });
      heatmapRef.current.show();
    },
    [pois, opacity, clearAllOverlays]
  );

  const drawGrid = useCallback(
    (AMap: any, map: any) => {
      clearAllOverlays();

      if (gridCells.length === 0) return;

      const maxCount = Math.max(...gridCells.map((c) => c.totalCount), 1);

      gridCells.forEach((cell) => {
        if (cell.totalCount === 0) return;

        const halfSize = cell.size / 2;
        const path = [
          [cell.lng - halfSize, cell.lat - halfSize],
          [cell.lng + halfSize, cell.lat - halfSize],
          [cell.lng + halfSize, cell.lat + halfSize],
          [cell.lng - halfSize, cell.lat + halfSize],
        ];

        const color = getHeatColor(cell.totalCount, maxCount);
        const fillOpacity = (0.2 + (cell.totalCount / maxCount) * 0.6) * opacity;

        const polygon = new AMap.Polygon({
          path,
          strokeColor: "#fff",
          strokeWeight: 0.5,
          strokeOpacity: 0.3,
          fillColor: color,
          fillOpacity,
          zIndex: 10,
          cursor: "pointer",
          extData: cell,
        });

        polygon.on("click", () => {
          if (onPOIClick) {
          }
        });

        polygon.setMap(map);
        gridPolygonsRef.current.push(polygon);
      });
    },
    [gridCells, opacity, clearAllOverlays, onPOIClick]
  );

  const drawPoints = useCallback(
    (AMap: any, map: any) => {
      clearAllOverlays();

      const showCount = Math.min(pois.length, 500);
      const step = Math.max(1, Math.floor(pois.length / showCount));

      for (let i = 0; i < pois.length; i += step) {
        const poi = pois[i];
        const color = CATEGORY_COLORS[poi.category];

        const marker = new AMap.Marker({
          position: [poi.lng, poi.lat],
          content: `
            <div style="
              width:6px;
              height:6px;
              border-radius:50%;
              background:${color};
              border:1px solid rgba(255,255,255,0.8);
              box-shadow:0 0 2px rgba(0,0,0,0.2);
              cursor:pointer;
            "></div>
          `,
          offset: new AMap.Pixel(-3, -3),
          title: poi.name,
          zIndex: 20,
          extData: poi,
        });

        marker.on("click", () => {
          if (onPOIClick) {
            onPOIClick(poi);
          }
        });

        marker.setMap(map);
        markersRef.current.push(marker);
      }
    },
    [pois, clearAllOverlays, onPOIClick]
  );

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;

    const AMap = (window as any).AMap;
    if (!AMap) return;

    if (mode === "heatmap") {
      drawHeatmap(AMap, mapRef.current);
    } else if (mode === "grid") {
      drawGrid(AMap, mapRef.current);
    } else {
      drawPoints(AMap, mapRef.current);
    }
  }, [mode, pois, gridCells, opacity, mapReady, drawHeatmap, drawGrid, drawPoints]);

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
