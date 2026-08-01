"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import {
  INDUSTRY_TYPE_COLORS,
  INDUSTRY_TYPE_ICONS,
  LEVEL_LABELS,
  type IndustryPark,
  type IndustryType,
} from "@/lib/industry-park-data";
import SchematicMap from "./SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface IndustryParkMapProps {
  parks: IndustryPark[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onParkClick?: (park: IndustryPark) => void;
  selectedId?: string;
}

const TYPE_TO_CATEGORY: Record<IndustryType, 0 | 1 | 2 | 3 | 4> = {
  high_tech: 0,
  manufacturing: 1,
  biomedicine: 2,
  new_energy: 3,
  finance: 4,
  cultural_creative: 0,
  logistics: 1,
  automotive: 2,
};

const TYPE_TO_RADIUS: Record<IndustryType, number> = {
  high_tech: 4,
  manufacturing: 3,
  biomedicine: 3,
  new_energy: 3,
  finance: 2,
  cultural_creative: 2,
  logistics: 2,
  automotive: 4,
};

function buildParkPolygon(
  lng: number,
  lat: number,
  areaSqKm: number,
  sides: number = 8
): Array<{ lng: number; lat: number }> {
  const r = Math.sqrt(areaSqKm / Math.PI) * 0.01;
  const path: Array<{ lng: number; lat: number }> = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2;
    path.push({
      lng: lng + Math.cos(angle) * r,
      lat: lat + Math.sin(angle) * r,
    });
  }
  return path;
}

export default function IndustryParkMap({
  parks,
  center,
  zoom = 11,
  height = "h-[500px]",
  onParkClick,
  selectedId,
}: IndustryParkMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const overlaysRef = useRef<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const altContent = useMemo(() => {
    if (mode !== "schematic" && mode !== "osm") return null;

    const SHADES: Array<400 | 500 | 600 | 700 | 800> = [400, 500, 600, 700, 800];

    const polygons = parks.map((park, i) => ({
      id: park.id,
      path: buildParkPolygon(park.lng, park.lat, park.areaSqKm),
      label: park.name,
      shade: SHADES[i % SHADES.length],
      opacity: 0.5,
      onClick: () => onParkClick?.(park),
    }));

    const points = parks.flatMap((park) => {
      const count = Math.min(5, Math.max(2, Math.floor(park.enterpriseCount / 50)));
      const arr: Array<{ lng: number; lat: number; id: string; category: 0 | 1 | 2 | 3 | 4; r: number; label: string }> = [];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const dist = Math.sqrt(park.areaSqKm / Math.PI) * 0.005;
        arr.push({
          id: `${park.id}-ent-${i}`,
          lng: park.lng + Math.cos(angle) * dist,
          lat: park.lat + Math.sin(angle) * dist,
          category: TYPE_TO_CATEGORY[park.type],
          r: TYPE_TO_RADIUS[park.type],
          label: `企业${i + 1}`,
        });
      }
      return arr;
    });

    const markers = parks.flatMap((park) =>
      park.leadingEnterprises.slice(0, 1).map((name, i) => ({
        id: `${park.id}-lead-${i}`,
        lng: park.lng + (i - 0.5) * 0.005,
        lat: park.lat + 0.008,
        label: name,
        kind: 3 as const,
      }))
    );

    const legend = [
      { label: "产业园", kind: "area" as const, shade: 500 },
      { label: "电子/高新", kind: "point" as const, category: 0 },
      { label: "制造/物流", kind: "point" as const, category: 1 },
      { label: "医药/汽车", kind: "point" as const, category: 2 },
      { label: "服务/配套", kind: "point" as const, category: 3 },
    ];

    const title = "产业园区示意图";

    if (mode === "osm") {
      return (
        <div className={`w-full ${height}`}>
          <OsmMap
            height={500}
            polygons={polygons}
            points={points}
            markers={markers}
            legend={legend}
            title={title}
          />
        </div>
      );
    }

    return (
      <div className={`w-full ${height}`}>
        <SchematicMap
          width={800}
          height={500}
          polygons={polygons}
          points={points}
          markers={markers}
          legend={legend}
          title={title}
          showCompass
          className="w-full"
        />
      </div>
    );
  }, [mode, parks, onParkClick, height]);

  if (altContent) return altContent;

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
    if (!map || !parks.length) return;

    overlaysRef.current.forEach((o) => map.remove(o));
    overlaysRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    parks.forEach((park) => {
      const isSelected = selectedId === park.id;
      const color = INDUSTRY_TYPE_COLORS[park.type];
      const radius = Math.sqrt(park.areaSqKm) * 800;

      // 范围圈
      const circle = new AMap.Circle({
        center: new AMap.LngLat(park.lng, park.lat),
        radius,
        strokeColor: color,
        strokeWeight: isSelected ? 3 : 2,
        strokeOpacity: 0.7,
        strokeStyle: park.level === "national" ? "solid" : park.level === "provincial" ? "dashed" : "dotted",
        fillColor: color,
        fillOpacity: isSelected ? 0.2 : 0.1,
        cursor: "pointer",
        zIndex: isSelected ? 15 : 5,
      });
      circle.on("click", () => onParkClick?.(park));
      map.add(circle);
      overlaysRef.current.push(circle);

      // 中心标记
      const size = isSelected ? 44 : 34;
      const levelBadge = LEVEL_LABELS[park.level].label.charAt(0);
      const marker = new AMap.Marker({
        position: new AMap.LngLat(park.lng, park.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="
            width:${size}px;height:${size}px;
            background:${color};
            border:3px solid white;
            border-radius:50%;
            box-shadow:0 3px 12px rgba(0,0,0,0.25);
            display:flex;align-items:center;justify-content:center;
            font-size:${isSelected ? 18 : 14}px;
            cursor:pointer;
            position:relative;
            transition:all 0.2s;
          ">
            ${INDUSTRY_TYPE_ICONS[park.type]}
            <div style="
              position:absolute;
              top:-4px;right:-4px;
              background:${LEVEL_LABELS[park.level].color};
              color:white;
              font-size:9px;
              font-weight:bold;
              padding:1px 4px;
              border-radius:6px;
              border:1.5px solid white;
            ">
              ${levelBadge}
            </div>
          </div>
        `,
        zIndex: isSelected ? 25 : 15,
      });
      marker.on("click", () => onParkClick?.(park));
      map.add(marker);
      overlaysRef.current.push(marker);
    });

    const lngs = parks.map((p) => p.lng);
    const lats = parks.map((p) => p.lat);
    const bounds = new AMap.Bounds(
      new AMap.LngLat(Math.min(...lngs), Math.min(...lats)),
      new AMap.LngLat(Math.max(...lngs), Math.max(...lats))
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [parks, selectedId, onParkClick]);

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
      {/* 图例 */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-100">
        <div className="text-[10px] text-gray-500 mb-1.5 font-medium">产业类型</div>
        <div className="grid grid-cols-4 gap-x-2 gap-y-1">
          {(Object.entries(INDUSTRY_TYPE_ICONS) as [string, string][]).map(([key, icon]) => (
            <div key={key} className="flex items-center gap-1">
              <span className="text-[11px]">{icon}</span>
              <span className="text-[9px] text-gray-600">
                {{
                  high_tech: "高新",
                  manufacturing: "制造",
                  biomedicine: "医药",
                  new_energy: "能源",
                  finance: "金融",
                  cultural_creative: "文创",
                  logistics: "物流",
                  automotive: "汽车",
                }[key as keyof typeof INDUSTRY_TYPE_COLORS]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
