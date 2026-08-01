"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import {
  INVESTMENT_TYPE_ICONS,
  INVESTMENT_TYPE_COLORS,
  STATUS_LABELS,
  type InvestmentProject,
} from "@/lib/investment-data";
import SchematicMap from "./SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

interface InvestmentMapProps {
  projects: InvestmentProject[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onProjectClick?: (project: InvestmentProject) => void;
  selectedId?: string;
}

function buildKeyZonePolygon(
  projects: InvestmentProject[],
  center: [number, number]
): Array<{ lng: number; lat: number }> {
  if (projects.length === 0) {
    const r = 0.08;
    const sides = 6;
    const path: Array<{ lng: number; lat: number }> = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2;
      path.push({
        lng: center[0] + Math.cos(angle) * r,
        lat: center[1] + Math.sin(angle) * r,
      });
    }
    return path;
  }
  let minLng = Infinity,
    maxLng = -Infinity,
    minLat = Infinity,
    maxLat = -Infinity;
  projects.forEach((p) => {
    if (p.lng < minLng) minLng = p.lng;
    if (p.lng > maxLng) maxLng = p.lng;
    if (p.lat < minLat) minLat = p.lat;
    if (p.lat > maxLat) maxLat = p.lat;
  });
  const lngPad = (maxLng - minLng) * 0.2 || 0.05;
  const latPad = (maxLat - minLat) * 0.2 || 0.05;
  minLng -= lngPad;
  maxLng += lngPad;
  minLat -= latPad;
  maxLat += latPad;
  return [
    { lng: minLng, lat: minLat },
    { lng: maxLng, lat: minLat },
    { lng: maxLng, lat: maxLat },
    { lng: minLng, lat: maxLat },
  ];
}

export default function InvestmentMap({
  projects,
  center,
  zoom = 11,
  height = "h-[500px]",
  onProjectClick,
  selectedId,
}: InvestmentMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const altContent = useMemo(() => {
    if (mode !== "schematic" && mode !== "osm") return null;

    const maxInvest = projects.length > 0 ? Math.max(...projects.map((p) => p.totalInvestment)) : 1;

    const points = projects.map((p) => {
      const ratio = p.totalInvestment / maxInvest;
      const r = 3 + ratio * 5;
      const shadeIdx = Math.min(4, Math.floor(ratio * 5));
      const shades: Array<400 | 500 | 600 | 700 | 800> = [400, 500, 600, 700, 800];
      return {
        id: p.id,
        lng: p.lng,
        lat: p.lat,
        r,
        shade: shades[shadeIdx],
        label: `${p.name} (${p.totalInvestment}亿)`,
        onClick: () => onProjectClick?.(p),
      };
    });

    const polygons = [
      {
        id: "key-zone",
        path: buildKeyZonePolygon(projects, center),
        label: "重点招商区域",
        shade: 400 as const,
        opacity: 0.4,
      },
    ];

    const legend = [
      { label: "大项目(>=30亿)", kind: "point" as const, shade: 800 },
      { label: "中项目(10-30亿)", kind: "point" as const, shade: 600 },
      { label: "小项目(<10亿)", kind: "point" as const, shade: 400 },
      { label: "招商区", kind: "area" as const, shade: 400 },
    ];

    const title = "招商项目示意图";

    if (mode === "osm") {
      return (
        <div className={`w-full ${height}`}>
          <OsmMap
            height={500}
            polygons={polygons}
            points={points}
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
          legend={legend}
          title={title}
          showCompass
          className="w-full"
        />
      </div>
    );
  }, [mode, projects, center, onProjectClick, height]);

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
    if (!map || !projects.length) return;

    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    const AMap = (window as any).AMap;
    if (!AMap) return;

    const maxInvest = Math.max(...projects.map((p) => p.totalInvestment));

    projects.forEach((project) => {
      const isSelected = selectedId === project.id;
      const color = INVESTMENT_TYPE_COLORS[project.type];
      const ratio = project.totalInvestment / maxInvest;
      const baseSize = 28 + ratio * 30;
      const size = isSelected ? baseSize + 12 : baseSize;

      const statusBadge = STATUS_LABELS[project.status];

      const marker = new AMap.Marker({
        position: new AMap.LngLat(project.lng, project.lat),
        offset: new AMap.Pixel(-size / 2, -size / 2),
        content: `
          <div style="position:relative;cursor:pointer;">
            <div style="
              width:${size}px;height:${size}px;
              background:${color};
              border-radius:${isSelected ? "14px" : "10px"};
              border:${isSelected ? 3 : 2}px solid white;
              box-shadow:0 3px 12px rgba(0,0,0,0.25);
              display:flex;align-items:center;justify-content:center;
              font-size:${isSelected ? 22 : 16}px;
              transition:all 0.2s;
            ">
              ${INVESTMENT_TYPE_ICONS[project.type]}
            </div>
            <div style="
              position:absolute;
              top:-4px;right:-4px;
              background:${statusBadge.color};
              color:white;
              font-size:9px;
              font-weight:bold;
              padding:1px 5px;
              border-radius:6px;
              border:1.5px solid white;
              white-space:nowrap;
            ">
              ${statusBadge.label}
            </div>
            <div style="
              position:absolute;
              bottom:-5px;left:50%;
              transform:translateX(-50%);
              background:white;
              color:${color};
              font-size:9px;
              font-weight:bold;
              padding:1px 4px;
              border-radius:4px;
              border:1px solid ${color}30;
              white-space:nowrap;
            ">
              ${project.totalInvestment}亿
            </div>
          </div>
        `,
        zIndex: isSelected ? 200 : Math.round(ratio * 100),
      });

      marker.on("click", () => onProjectClick?.(project));
      map.add(marker);
      markersRef.current.push(marker);
    });

    const lngs = projects.map((p) => p.lng);
    const lats = projects.map((p) => p.lat);
    const bounds = new AMap.Bounds(
      new AMap.LngLat(Math.min(...lngs), Math.min(...lats)),
      new AMap.LngLat(Math.max(...lngs), Math.max(...lats))
    );
    map.setBounds(bounds, [60, 60, 60, 60], false);
  }, [projects, selectedId, onProjectClick]);

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
        <div className="text-[10px] text-gray-500 mb-1.5 font-medium">项目类型</div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-1">
          {(Object.entries(INVESTMENT_TYPE_ICONS) as [string, string][]).map(([key, icon]) => (
            <div key={key} className="flex items-center gap-1">
              <span className="text-[11px]">{icon}</span>
              <span className="text-[9px] text-gray-600">
                {{
                  industrial_park: "产业园",
                  business_building: "商务楼",
                  key_project: "重点项",
                  incubator: "孵化器",
                  logistics_park: "物流园",
                  research_institute: "科研所",
                }[key as keyof typeof INVESTMENT_TYPE_COLORS]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
