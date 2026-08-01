"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import {
  TOURIST_TYPE_ICONS,
  TOURIST_TYPE_COLORS,
  type TouristResource,
  type TouristType,
} from "@/lib/tourist-resource-data";
import SchematicMap, {
  type SchematicPoint,
  type SchematicPolygon,
} from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface TouristResourceMapProps {
  resources: TouristResource[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onResourceClick?: (resource: TouristResource) => void;
  selectedId?: string;
}

export default function TouristResourceMap({
  resources,
  center,
  zoom = 11,
  height = "h-[500px]",
  onResourceClick,
  selectedId,
}: TouristResourceMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
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
          mapStyle: "amap://styles/light",
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
    if (!map || !resources.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    resources.forEach((res) => {
      const isSelected = selectedId === res.id;
      const color = TOURIST_TYPE_COLORS[res.type];
      const size = isSelected ? 46 : 38;
      const hasBadge = res.level !== "none";

      const marker = new AMap.Marker({
        position: new AMap.LngLat(res.lng, res.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="position:relative;cursor:pointer;">
            <div style="
              width:${size}px;height:${size}px;
              background:${color};
              border-radius:12px;
              border:${isSelected ? 3 : 2}px solid white;
              box-shadow:0 3px 10px rgba(0,0,0,0.2);
              display:flex;align-items:center;justify-content:center;
              font-size:${isSelected ? 22 : 18}px;
              transition:all 0.2s;
            ">
              ${TOURIST_TYPE_ICONS[res.type]}
            </div>
            ${hasBadge ? `
              <div style="
                position:absolute;
                top:-4px;right:-4px;
                background:#fbbf24;
                color:#78350f;
                font-size:9px;
                font-weight:bold;
                padding:1px 4px;
                border-radius:6px;
                border:1.5px solid white;
              ">
                ${res.level}
              </div>
            ` : ""}
          </div>
        `,
        zIndex: isSelected ? 200 : 100,
      });

      marker.on("click", () => onResourceClick?.(res));
      map.add(marker);
      markersRef.current.push(marker);
    });

    const bounds = new AMap.Bounds(
      new AMap.LngLat(
        Math.min(...resources.map((r) => r.lng)),
        Math.min(...resources.map((r) => r.lat))
      ),
      new AMap.LngLat(
        Math.max(...resources.map((r) => r.lng)),
        Math.max(...resources.map((r) => r.lat))
      )
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [resources, selectedId, onResourceClick, mode]);

  const typeCategoryMap: Record<TouristType, 0 | 1 | 2 | 3 | 4> = {
    scenic: 0,
    nature: 0,
    historical: 1,
    cultural: 1,
    food: 2,
    entertainment: 4,
  };

  const typeShadeMap: Record<TouristType, 500 | 700 | undefined> = {
    scenic: 500,
    nature: 500,
    historical: 700,
    cultural: 700,
    food: undefined,
    entertainment: undefined,
  };

  const schematicData = useMemo(() => {
    const points: SchematicPoint[] = resources.map((r) => {
      const category = typeCategoryMap[r.type];
      const baseShade = typeShadeMap[r.type];
      return {
        lng: r.lng,
        lat: r.lat,
        id: r.id,
        label: r.name,
        category,
        shade: baseShade ?? undefined,
        r: r.level === "5A" ? 6 : r.level === "4A" ? 5 : r.level === "3A" ? 4 : 3,
        onClick: () => onResourceClick?.(r),
      };
    });

    const polygons: SchematicPolygon[] = resources
      .filter((r) => r.level !== "none")
      .map((r, idx) => {
        const delta = r.level === "5A" ? 0.012 : r.level === "4A" ? 0.009 : 0.006;
        return {
          id: `pg-${r.id}`,
          label: `${r.name}（${r.level}）`,
          shade: 300,
          opacity: 0.35,
          path: [
            { lng: r.lng - delta, lat: r.lat + delta * 0.6 },
            { lng: r.lng + delta * 0.4, lat: r.lat + delta },
            { lng: r.lng + delta, lat: r.lat + delta * 0.2 },
            { lng: r.lng + delta * 0.6, lat: r.lat - delta * 0.8 },
            { lng: r.lng - delta * 0.5, lat: r.lat - delta },
            { lng: r.lng - delta, lat: r.lat - delta * 0.3 },
          ],
        };
      });

    return { points, polygons };
  }, [resources, onResourceClick]);

  const schematicLegend = [
    { label: "自然景观", kind: "point" as const, category: 0, shade: 500 },
    { label: "人文景观", kind: "point" as const, category: 1, shade: 700 },
    { label: "餐饮住宿", kind: "point" as const, category: 2 },
    { label: "交通设施", kind: "point" as const, category: 3 },
    { label: "娱乐休闲", kind: "point" as const, category: 4 },
  ];

  if (mode === "schematic") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white">
        <SchematicMap
          height={500}
          points={schematicData.points}
          polygons={schematicData.polygons}
          title="旅游资源分布"
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
          polygons={schematicData.polygons}
          title="旅游资源分布"
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
    <div className="relative rounded-xl overflow-hidden border border-gray-200">
      <div ref={mapRef} className={`w-full ${height}`} />
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-100">
        <div className="text-[10px] text-gray-500 mb-1.5 font-medium">资源类型</div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-1">
          {(Object.entries(TOURIST_TYPE_ICONS) as [string, string][]).map(([key, icon]) => (
            <div key={key} className="flex items-center gap-1">
              <span className="text-[11px]">{icon}</span>
              <span className="text-[9px] text-gray-600">
                {{
                  scenic: "自然风光",
                  historical: "历史古迹",
                  cultural: "文化艺术",
                  nature: "自然生态",
                  food: "美食街区",
                  entertainment: "娱乐休闲",
                }[key as keyof typeof TOURIST_TYPE_COLORS]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
