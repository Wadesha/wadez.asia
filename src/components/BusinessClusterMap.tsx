"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import {
  CLUSTER_LEVEL_COLORS,
  CLUSTER_LEVEL_LABELS,
  type BusinessCluster,
  type ClusterLevel,
} from "@/lib/business-cluster-data";
import SchematicMap from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface BusinessClusterMapProps {
  clusters: BusinessCluster[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onClusterClick?: (cluster: BusinessCluster) => void;
  selectedId?: string;
}

export default function BusinessClusterMap({
  clusters,
  center,
  zoom = 11,
  height = "h-[500px]",
  onClusterClick,
  selectedId,
}: BusinessClusterMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const circlesRef = useRef<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const schematicProps = useMemo(() => {
    type ShadeType = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    const densityToShade = (density: number): ShadeType => {
      if (density < 25) return 200;
      if (density < 50) return 400;
      if (density < 75) return 600;
      return 800;
    };

    const points: Array<{ lng: number; lat: number; id?: string | number; category?: 0 | 1 | 2 | 3 | 4; shade?: ShadeType; r?: number; onClick?: () => void }> = [];
    const polygons: Array<{ path: Array<{ lng: number; lat: number }>; id?: string | number; label?: string; shade?: ShadeType; strokeShade?: ShadeType; opacity?: number; onClick?: () => void }> = [];

    clusters.forEach((cluster, clusterIdx) => {
      const clusterRadiusDeg = Math.max(0.008, Math.min(0.03, cluster.area * 0.0003));

      const polyPath: Array<{ lng: number; lat: number }> = [];
      const sides = 24;
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2;
        polyPath.push({
          lng: cluster.center[0] + Math.cos(angle) * clusterRadiusDeg,
          lat: cluster.center[1] + Math.sin(angle) * clusterRadiusDeg * 0.8,
        });
      }
      polygons.push({
        path: polyPath,
        id: cluster.id,
        label: cluster.name,
        shade: 400,
        strokeShade: 600,
        opacity: 0.4,
        onClick: () => onClusterClick?.(cluster),
      });

      const storeCount = Math.min(cluster.storeCount, 20);
      const densityMetric = Math.min(100, (cluster.storeCount / Math.max(1, cluster.area)) * 2);
      for (let i = 0; i < storeCount; i++) {
        const storeAngle = (i / storeCount) * Math.PI * 2 + clusterIdx * 0.3;
        const storeDist = clusterRadiusDeg * (0.2 + ((i * 7) % 10) / 15);
        points.push({
          lng: cluster.center[0] + Math.cos(storeAngle) * storeDist,
          lat: cluster.center[1] + Math.sin(storeAngle) * storeDist * 0.8,
          id: `${cluster.id}-store-${i}`,
          category: 1,
          shade: densityToShade(densityMetric),
          r: 3,
        });
      }
    });

    const legend = [
      { label: "门店", kind: "point" as const, category: 1 },
      { label: "商圈", kind: "area" as const, shade: 400 },
    ];

    return { points, polygons, legend };
  }, [clusters, onClusterClick]);

  useEffect(() => {
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
    };
  }, [center, zoom]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !clusters.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];
    circlesRef.current.forEach((c) => map.remove(c));
    circlesRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    clusters.forEach((cluster) => {
      const isSelected = selectedId === cluster.id;
      const color = CLUSTER_LEVEL_COLORS[cluster.level];
      const size = isSelected ? 46 : 36;

      // Coverage circle - radius based on area
      const radius = Math.max(800, Math.min(3000, cluster.area * 15));
      const circle = new AMap.Circle({
        center: cluster.center,
        radius,
        strokeColor: color,
        strokeWeight: isSelected ? 2 : 1,
        strokeOpacity: 0.6,
        fillColor: color,
        fillOpacity: isSelected ? 0.4 : 0.25,
        zIndex: isSelected ? 90 : 50,
      });
      map.add(circle);
      circlesRef.current.push(circle);

      const marker = new AMap.Marker({
        position: new AMap.LngLat(cluster.center[0], cluster.center[1]),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="
            width:${size}px;height:${size}px;border-radius:50%;
            background:${color};
            border:${isSelected ? 3 : 2}px solid white;
            box-shadow:0 2px 10px rgba(0,0,0,0.3);
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            color:white;font-weight:700;
            cursor:pointer;
            transition:all 0.2s;
            padding:2px;
            box-sizing:border-box;
          ">
            <span style="font-size:${isSelected ? 9 : 7}px;line-height:1.1;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;">${cluster.name}</span>
            <span style="font-size:${isSelected ? 12 : 10}px;line-height:1;margin-top:1px;">${cluster.storeCount}店</span>
          </div>
        `,
        zIndex: isSelected ? 200 : 100,
      });

      marker.on("click", () => onClusterClick?.(cluster));
      map.add(marker);
      markersRef.current.push(marker);
    });

    const bounds = new AMap.Bounds(
      new AMap.LngLat(
        Math.min(...clusters.map((c) => c.center[0])) - 0.05,
        Math.min(...clusters.map((c) => c.center[1])) - 0.05
      ),
      new AMap.LngLat(
        Math.max(...clusters.map((c) => c.center[0])) + 0.05,
        Math.max(...clusters.map((c) => c.center[1])) + 0.05
      )
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [clusters, selectedId, onClusterClick]);

  const legendItems: { level: ClusterLevel; color: string; label: string }[] = [
    { level: "core", color: CLUSTER_LEVEL_COLORS.core, label: CLUSTER_LEVEL_LABELS.core },
    { level: "sub", color: CLUSTER_LEVEL_COLORS.sub, label: CLUSTER_LEVEL_LABELS.sub },
    { level: "emerging", color: CLUSTER_LEVEL_COLORS.emerging, label: CLUSTER_LEVEL_LABELS.emerging },
  ];

  if (mode === "schematic") {
    return (
      <div className={`w-full ${height}`}>
        <SchematicMap
          height={500}
          points={schematicProps.points}
          polygons={schematicProps.polygons}
          legend={schematicProps.legend}
          title="商业集群示意图"
          showCompass
        />
      </div>
    );
  }

  if (mode === "osm") {
    return (
      <div className={`w-full ${height}`}>
        <OsmMap
          width={800}
          height={500}
          points={schematicProps.points}
          polygons={schematicProps.polygons}
          legend={schematicProps.legend}
          title="商业集群示意图"
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
    <div className="relative rounded-xl overflow-hidden border border-gray-300">
      <div ref={mapRef} className={`w-full ${height}`} />
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-300">
        <div className="text-[10px] text-gray-700 mb-1.5 font-medium">商圈级别</div>
        <div className="grid grid-cols-1 gap-y-1">
          {legendItems.map((item) => (
            <div key={item.level} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[9px] text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-300">
        <div className="text-[10px] text-gray-700 font-medium">圆圈半径 = 商圈面积</div>
        <div className="text-[9px] text-gray-500 mt-0.5">数字 = 门店数量</div>
      </div>
    </div>
  );
}
