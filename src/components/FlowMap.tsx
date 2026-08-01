"use client";

import React, { useMemo, useState } from "react";
import { FLOWS, FLOW_TYPES, getFlowsByType, type FlowItem } from "@/lib/china-flow-data";

/**
 * 流向地图组件
 * 在省份间绘制弧线，粗细=流量大小，颜色=类型
 */

export interface FlowMapProps {
  flows: FlowItem[];
  title?: string;
  height?: number;
  /** 显示动画粒子 */
  animated?: boolean;
}

function computeBounds(centers: Array<[number, number]>) {
  if (centers.length === 0) {
    return { minLng: 73, maxLng: 136, minLat: 18, maxLat: 54 };
  }
  let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
  centers.forEach(([lng, lat]) => {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  });
  const lngPad = (maxLng - minLng) * 0.08;
  const latPad = (maxLat - minLat) * 0.08;
  return { minLng: minLng - lngPad, maxLng: maxLng + lngPad, minLat: minLat - latPad, maxLat: maxLat + latPad };
}

function project(lng: number, lat: number, bounds: any, w: number, h: number, pad: number) {
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const lngRange = bounds.maxLng - bounds.minLng || 1;
  const latRange = bounds.maxLat - bounds.minLat || 1;
  return {
    x: pad + (lng - bounds.minLng) / lngRange * innerW,
    y: pad + (bounds.maxLat - lat) / latRange * innerH,
  };
}

/** 计算贝塞尔弧线控制点（让弧线弯曲） */
function arcPath(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  // 控制点偏移量（让弧线弯曲）
  const offset = dist * 0.2;
  const midX = (p1.x + p2.x) / 2;
  const midY = (p1.y + p2.y) / 2;
  // 法向量
  const nx = -dy / dist;
  const ny = dx / dist;
  return {
    cx: midX + nx * offset,
    cy: midY + ny * offset,
  };
}

const FlowMap: React.FC<FlowMapProps> = ({ flows, title, height = 560, animated = true }) => {
  const [hoverId, setHoverId] = useState<number | null>(null);

  const W = 800;
  const H = height;
  const pad = 30;

  const bounds = useMemo(() => {
    const centers: Array<[number, number]> = [];
    flows.forEach((f) => {
      centers.push(f.fromCenter);
      centers.push(f.toCenter);
    });
    return computeBounds(centers);
  }, [flows]);

  const maxValue = useMemo(() => Math.max(...flows.map((f) => f.value), 1), [flows]);
  const minValue = useMemo(() => Math.min(...flows.map((f) => f.value), 0), [flows]);
  const valueRange = maxValue - minValue || 1;

  const getStrokeWidth = (v: number) => 0.5 + ((v - minValue) / valueRange) * 4;

  const colorMap = useMemo(() => {
    const m: Record<string, string> = {};
    FLOW_TYPES.forEach((t) => (m[t.type] = t.color));
    return m;
  }, []);

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      {title ? (
        <div className="px-3 py-1.5 border-b border-gray-100 text-xs font-semibold text-gray-700">
          {title}
          <span className="ml-2 text-[10px] font-normal text-gray-400">示例数据</span>
        </div>
      ) : null}
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
          <rect x="0" y="0" width={W} height={H} fill="#fafafa" />

          {flows.map((f, i) => {
            const p1 = project(f.fromCenter[0], f.fromCenter[1], bounds, W, H, pad);
            const p2 = project(f.toCenter[0], f.toCenter[1], bounds, W, H, pad);
            const ctrl = arcPath(p1, p2);
            const sw = getStrokeWidth(f.value);
            const color = colorMap[f.type] || "#6b7280";
            const isHover = hoverId === i;
            return (
              <g key={i}>
                {/* 弧线 */}
                <path
                  d={`M ${p1.x},${p1.y} Q ${ctrl.cx},${ctrl.cy} ${p2.x},${p2.y}`}
                  stroke={color}
                  strokeWidth={isHover ? sw * 1.8 : sw}
                  strokeOpacity={isHover ? 0.95 : 0.55}
                  fill="none"
                  strokeLinecap="round"
                  onMouseEnter={() => setHoverId(i)}
                  onMouseLeave={() => setHoverId(null)}
                  style={{ cursor: "pointer", transition: "stroke-opacity 0.15s, stroke-width 0.15s" }}
                />
                {/* 动画粒子 */}
                {animated && (
                  <circle r={2} fill={color}>
                    <animateMotion
                      dur={`${3 + (1 - (f.value - minValue) / valueRange) * 2}s`}
                      repeatCount="indefinite"
                      path={`M ${p1.x},${p1.y} Q ${ctrl.cx},${ctrl.cy} ${p2.x},${p2.y}`}
                    />
                  </circle>
                )}
                {/* 起点 */}
                <circle cx={p1.x} cy={p1.y} r={3} fill={color} fillOpacity={0.9} />
                {/* 终点（箭头） */}
                <circle cx={p2.x} cy={p2.y} r={3} fill="none" stroke={color} strokeWidth={1.2} />
              </g>
            );
          })}
        </svg>

        {hoverId !== null && flows[hoverId] && (
          <div className="absolute pointer-events-none bg-white border border-gray-300 rounded shadow-lg px-2 py-1 text-xs z-10" style={{ left: 8, top: 8, whiteSpace: "nowrap" }}>
            <span className="font-semibold text-gray-800">{flows[hoverId].fromName}</span>
            <span className="mx-1 text-gray-400">→</span>
            <span className="font-semibold text-gray-800">{flows[hoverId].toName}</span>
            <span className="ml-2 text-gray-600">{flows[hoverId].value}</span>
            {flows[hoverId].desc && <div className="text-[10px] text-gray-400 mt-0.5">{flows[hoverId].desc}</div>}
          </div>
        )}
      </div>
      {/* 图例 */}
      <div className="px-3 py-2 border-t border-gray-100 flex items-center gap-3 flex-wrap">
        {FLOW_TYPES.map((t) => (
          <span key={t.type} className="flex items-center gap-1">
            <span className="inline-block w-4 h-0.5" style={{ background: t.color }} />
            <span className="text-[10px] text-gray-600">{t.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FlowMap;
