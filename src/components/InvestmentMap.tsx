"use client";

import { useEffect, useRef } from "react";
import {
  INVESTMENT_TYPE_ICONS,
  INVESTMENT_TYPE_COLORS,
  STATUS_LABELS,
  type InvestmentProject,
} from "@/lib/investment-data";

interface InvestmentMapProps {
  projects: InvestmentProject[];
  center: [number, number];
  zoom?: number;
  height?: string;
  onProjectClick?: (project: InvestmentProject) => void;
  selectedId?: string;
}

export default function InvestmentMap({
  projects,
  center,
  zoom = 11,
  height = "h-[500px]",
  onProjectClick,
  selectedId,
}: InvestmentMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const AMap = (window as any).AMap;
    if (!AMap) return;

    const map = new AMap.Map(mapRef.current, {
      center,
      zoom,
      mapStyle: "amap://styles/light",
    });
    mapInstanceRef.current = map;

    return () => {
      map.destroy();
      mapInstanceRef.current = null;
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
