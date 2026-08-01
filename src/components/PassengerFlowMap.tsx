"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import {
  LOCATION_TYPE_LABELS,
  LOCATION_TYPE_ICONS,
  type FlowPrediction,
  type LocationType,
} from "@/lib/passenger-flow-data";
import SchematicMap, {
  type SchematicPoint,
  type SchematicPolyline,
} from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface PassengerFlowMapProps {
  predictions: FlowPrediction[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onPredictionClick?: (prediction: FlowPrediction) => void;
  selectedId?: string;
}

export default function PassengerFlowMap({
  predictions,
  center,
  zoom = 12,
  height = "h-[500px]",
  onPredictionClick,
  selectedId,
}: PassengerFlowMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const heatmapLayerRef = useRef<any>(null);
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
          center,
          zoom,
          mapStyle: "amap://styles/dark",
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
    };
  }, [center, zoom, mode]);

  useEffect(() => {
    if (mode === "schematic") return;
    const map = mapInstanceRef.current;
    if (!map || !predictions.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    if (heatmapLayerRef.current) {
      heatmapLayerRef.current.setMap(null);
      heatmapLayerRef.current = null;
    }

    if (AMap.HeatMap) {
      const heatmapData = predictions.map((p) => ({
        lng: p.lng,
        lat: p.lat,
        count: p.dailyFlow,
      }));

      const maxFlow = Math.max(...predictions.map((p) => p.dailyFlow));

      const heatmap = new AMap.HeatMap(map, {
        radius: 50,
        opacity: [0, 0.8],
        gradient: {
          0.3: "#3b82f6",
          0.5: "#10b981",
          0.7: "#f59e0b",
          0.85: "#ef4444",
          1.0: "#7c2d12",
        },
      });

      heatmap.setDataSet({
        data: heatmapData,
        max: maxFlow,
      });
      heatmapLayerRef.current = heatmap;
    }

    predictions.forEach((pred) => {
      const isSelected = selectedId === pred.id;
      const icon = LOCATION_TYPE_ICONS[pred.locationType];
      const size = isSelected ? 46 : 36;
      const bg = isSelected ? "#2563eb" : "#1e293b";

      const marker = new AMap.Marker({
        position: new AMap.LngLat(pred.lng, pred.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="
            width:${size}px;height:${size}px;border-radius:50%;
            background:${bg};
            border:${isSelected ? 3 : 2}px solid white;
            box-shadow:0 2px 12px rgba(0,0,0,0.35);
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            color:white;font-weight:700;
            cursor:pointer;
            transition:all 0.2s;
          ">
            <span style="font-size:${isSelected ? 14 : 11}px;line-height:1;">${icon}</span>
            <span style="font-size:${isSelected ? 9 : 8}px;opacity:0.9;line-height:1;margin-top:1px;">${(pred.dailyFlow / 1000).toFixed(0)}k</span>
          </div>
        `,
        zIndex: isSelected ? 200 : 100,
      });

      marker.on("click", () => onPredictionClick?.(pred));
      map.add(marker);
      markersRef.current.push(marker);
    });

    const bounds = new AMap.Bounds(
      new AMap.LngLat(
        Math.min(...predictions.map((p) => p.lng)) - 0.02,
        Math.min(...predictions.map((p) => p.lat)) - 0.02
      ),
      new AMap.LngLat(
        Math.max(...predictions.map((p) => p.lng)) + 0.02,
        Math.max(...predictions.map((p) => p.lat)) + 0.02
      )
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [predictions, selectedId, onPredictionClick, mode]);

  const legendItems: { type: LocationType; icon: string; label: string }[] = (
    Object.keys(LOCATION_TYPE_LABELS) as LocationType[]
  ).map((t) => ({
    type: t,
    icon: LOCATION_TYPE_ICONS[t],
    label: LOCATION_TYPE_LABELS[t],
  }));

  const schematicData = useMemo(() => {
    if (predictions.length === 0) {
      return { points: [] as SchematicPoint[], polylines: [] as SchematicPolyline[] };
    }
    const flows = predictions.map((p) => p.dailyFlow);
    const maxF = Math.max(...flows);
    const minF = Math.min(...flows);
    const range = maxF - minF || 1;

    const points: SchematicPoint[] = predictions.map((p) => {
      const norm = (p.dailyFlow - minF) / range;
      let shade: 500 | 600 | 700 | 800;
      let r: number;
      if (norm >= 0.75) {
        shade = 800;
        r = 5;
      } else if (norm >= 0.5) {
        shade = 700;
        r = 4;
      } else if (norm >= 0.25) {
        shade = 600;
        r = 3;
      } else {
        shade = 500;
        r = 2;
      }
      return {
        lng: p.lng,
        lat: p.lat,
        id: p.id,
        label: `${p.name} ${(p.dailyFlow / 1000).toFixed(0)}k`,
        shade,
        r,
        onClick: () => onPredictionClick?.(p),
      };
    });

    const sorted = [...predictions].sort((a, b) => b.dailyFlow - a.dailyFlow);
    const topCount = Math.min(5, sorted.length);
    const polylines: SchematicPolyline[] = [];
    for (let i = 0; i < topCount - 1; i++) {
      polylines.push({
        id: `corridor-${i}`,
        path: [
          { lng: sorted[i].lng, lat: sorted[i].lat },
          { lng: sorted[i + 1].lng, lat: sorted[i + 1].lat },
        ],
        style: 2,
        shade: 600,
        width: 2,
        label: `客流走廊 ${i + 1}`,
      });
    }

    return { points, polylines };
  }, [predictions, onPredictionClick]);

  const schematicLegend = [
    { label: "高客流", kind: "point" as const, shade: 800 },
    { label: "中客流", kind: "point" as const, shade: 600 },
    { label: "低客流", kind: "point" as const, shade: 500 },
  ];

  if (mode === "schematic") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white">
        <SchematicMap
          height={500}
          points={schematicData.points}
          polylines={schematicData.polylines}
          title="客流分布示意图"
          legend={schematicLegend}
          showCompass
        />
      </div>
    );
  }

  if (mode === "osm") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white">
        <OsmMap
          height={500}
          points={schematicData.points}
          polylines={schematicData.polylines}
          title="客流分布示意图"
          legend={schematicLegend}
        />
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
    <div className="relative rounded-xl overflow-hidden border border-gray-700">
      <div ref={mapRef} className={`w-full ${height}`} />
      <div className="absolute bottom-3 left-3 bg-slate-900/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-700">
        <div className="text-[10px] text-gray-400 mb-1.5 font-medium">点位类型</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {legendItems.map((item) => (
            <div key={item.type} className="flex items-center gap-1.5">
              <span className="text-[11px] leading-none">{item.icon}</span>
              <span className="text-[9px] text-gray-300">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-3 right-3 bg-slate-900/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-700">
        <div className="text-[10px] text-gray-400 mb-1 font-medium">客流强度</div>
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-blue-400">低</span>
          <div className="w-20 h-2 rounded-full" style={{ background: "linear-gradient(to right, #3b82f6, #10b981, #f59e0b, #ef4444, #7c2d12)" }} />
          <span className="text-[9px] text-red-400">高</span>
        </div>
      </div>
    </div>
  );
}
