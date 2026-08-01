"use client";

import React, { useMemo, useState } from "react";

/**
 * 分级气泡地图组件
 * 在省级行政区中心绘制气泡，大小=数值，颜色=档位
 */

export interface BubbleItem {
  id: string;
  name: string;
  /** 中心坐标 [lng, lat] */
  center: [number, number];
  /** 数值（决定气泡大小） */
  value: number;
  /** 类别（决定颜色，0-3档） */
  category?: number;
  /** 可选附加描述 */
  desc?: string;
}

export interface BubbleMapProps {
  items: BubbleItem[];
  title?: string;
  unit?: string;
  /** 数值格式化 */
  formatValue?: (v: number) => string;
  /** 气泡最小半径 */
  minRadius?: number;
  /** 气泡最大半径 */
  maxRadius?: number;
  /** 色阶（按category选择，默认灰阶4档） */
  colors?: string[];
  height?: number;
  /** 点击回调 */
  onItemClick?: (id: string) => void;
}

const DEFAULT_COLORS = ["#d1d5db", "#9ca3af", "#6b7280", "#1f2937"];

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

const BubbleMap: React.FC<BubbleMapProps> = ({
  items,
  title,
  unit = "",
  formatValue = (v) => v.toFixed(1),
  minRadius = 4,
  maxRadius = 28,
  colors = DEFAULT_COLORS,
  height = 560,
  onItemClick,
}) => {
  const [hoverId, setHoverId] = useState<string | null>(null);

  const W = 800;
  const H = height;
  const pad = 30;

  const bounds = useMemo(() => computeBounds(items.map((i) => i.center)), [items]);
  const maxValue = useMemo(() => Math.max(...items.map((i) => i.value), 1), [items]);
  const minValue = useMemo(() => Math.min(...items.map((i) => i.value), 0), [items]);

  const valueRange = maxValue - minValue || 1;

  const getRadius = (v: number) => {
    const t = (v - minValue) / valueRange;
    return minRadius + t * (maxRadius - minRadius);
  };

  const getColor = (cat: number = 0) => colors[Math.min(cat, colors.length - 1)];

  const hoverItem = items.find((i) => i.id === hoverId);

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
          {/* 网格 */}
          {[0.25, 0.5, 0.75].map((t) => (
            <g key={t} stroke="#e5e7eb" strokeWidth={0.5}>
              <line x1={t * W} y1={0} x2={t * W} y2={H} />
              <line x1={0} y1={t * H} x2={W} y2={t * H} />
            </g>
          ))}
          {items.map((it) => {
            const p = project(it.center[0], it.center[1], bounds, W, H, pad);
            const r = getRadius(it.value);
            const isHover = hoverId === it.id;
            return (
              <g key={it.id}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill={getColor(it.category)}
                  fillOpacity={isHover ? 0.95 : 0.7}
                  stroke="#fff"
                  strokeWidth={isHover ? 1.5 : 0.8}
                  onMouseEnter={() => setHoverId(it.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() => onItemClick?.(it.id)}
                  style={{ cursor: onItemClick ? "pointer" : "default", transition: "fill-opacity 0.15s" }}
                />
                {r > 10 && (
                  <text
                    x={p.x}
                    y={p.y}
                    textAnchor="middle"
                    fontSize={9}
                    fill="#1f2937"
                    pointerEvents="none"
                  >
                    {it.name.replace("省", "").replace("市", "").replace("自治区", "").replace("壮族", "").replace("回族", "").replace("维吾尔", "")}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        {hoverItem && (
          <div className="absolute pointer-events-none bg-white border border-gray-300 rounded shadow-lg px-2 py-1 text-xs z-10" style={{ left: 8, top: 8, whiteSpace: "nowrap" }}>
            <span className="font-semibold text-gray-800">{hoverItem.name}</span>
            <span className="ml-2 text-gray-600">{formatValue(hoverItem.value)}{unit}</span>
            {hoverItem.desc && <div className="text-[10px] text-gray-400 mt-0.5">{hoverItem.desc}</div>}
          </div>
        )}
      </div>
      {/* 图例 */}
      <div className="px-3 py-2 border-t border-gray-100 flex items-center gap-4">
        <span className="text-[10px] text-gray-400">大小={unit}</span>
        <div className="flex items-center gap-1">
          {[minRadius, (minRadius + maxRadius) / 2, maxRadius].map((r, i) => (
            <React.Fragment key={i}>
              <span className="inline-block rounded-full bg-gray-400" style={{ width: r * 2, height: r * 2 }} />
              <span className="text-[9px] text-gray-400">
                {i === 0 ? formatValue(minValue) : i === 1 ? formatValue((minValue + maxValue) / 2) : formatValue(maxValue)}
              </span>
            </React.Fragment>
          ))}
        </div>
        <div className="flex-1" />
        {colors.length > 1 && (
          <div className="flex items-center gap-2">
            {colors.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                <span className="text-[9px] text-gray-400">{i === 0 ? "低" : i === colors.length - 1 ? "高" : ""}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BubbleMap;
