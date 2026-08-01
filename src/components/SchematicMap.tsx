"use client";

import React, { useMemo, useState } from "react";

// ==================== 类型定义 ====================
export type SchematicPoint = {
  lng: number;
  lat: number;
  id?: string | number;
  label?: string;
  /** 0-1 灰度透明度或具体灰色阶 100/200/300/400/500/600/700/800/900 */
  shade?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  /** 半径像素 */
  r?: number;
  /** 类别，用于区分颜色（0=黑 1=深灰 2=中灰 3=浅灰 4=更浅） */
  category?: 0 | 1 | 2 | 3 | 4;
  onClick?: () => void;
};

export type SchematicPolyline = {
  path: Array<{ lng: number; lat: number }>;
  id?: string | number;
  label?: string;
  /** 1=实线 2=虚线 3=点线 */
  style?: 1 | 2 | 3;
  shade?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  width?: number;
  onClick?: () => void;
};

export type SchematicPolygon = {
  path: Array<{ lng: number; lat: number }>;
  id?: string | number;
  label?: string;
  shade?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  strokeShade?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  /** 0-1 填充透明度 */
  opacity?: number;
  onClick?: () => void;
};

export type SchematicMarker = {
  lng: number;
  lat: number;
  label: string;
  /** 标记类型：0=起点 1=终点 2=换乘 3=普通 */
  kind?: 0 | 1 | 2 | 3;
};

export interface SchematicMapProps {
  width?: number;
  height?: number;
  /** 画布内边距（像素） */
  padding?: number;
  points?: SchematicPoint[];
  polylines?: SchematicPolyline[];
  polygons?: SchematicPolygon[];
  markers?: SchematicMarker[];
  title?: string;
  /** 显示边框 */
  bordered?: boolean;
  /** 显示方向指示（N） */
  showCompass?: boolean;
  className?: string;
  /** 比例尺（像素/度，不填则自动计算） */
  scale?: number;
  /** 手动指定范围（否则自动计算） */
  bounds?: { minLng: number; maxLng: number; minLat: number; maxLat: number };
  /** 显示图例 */
  legend?: Array<{ label: string; kind: "point" | "line" | "area"; shade?: number; category?: number }>;
}

// ==================== 工具函数 ====================
const SHADE_MAP: Record<number, string> = {
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280",
  600: "#4b5563",
  700: "#374151",
  800: "#1f2937",
  900: "#111827",
};

const CATEGORY_COLORS = ["#111827", "#374151", "#6b7280", "#9ca3af", "#d1d5db"];

function shadeHex(s?: number): string {
  if (s === undefined) return SHADE_MAP[700];
  return SHADE_MAP[s] || SHADE_MAP[700];
}

/** 投影：lng/lat → svg 像素坐标 */
function project(
  lng: number,
  lat: number,
  bounds: { minLng: number; maxLng: number; minLat: number; maxLat: number },
  width: number,
  height: number,
  padding: number
) {
  const w = width - padding * 2;
  const h = height - padding * 2;
  const lngRange = bounds.maxLng - bounds.minLng || 1;
  const latRange = bounds.maxLat - bounds.minLat || 1;
  // 保持长宽比
  const scale = Math.min(w / lngRange, h / latRange);
  const ox = padding + (w - lngRange * scale) / 2;
  const oy = padding + (h - latRange * scale) / 2;
  const x = ox + (lng - bounds.minLng) * scale;
  const y = oy + (bounds.maxLat - lat) * scale; // 纬度翻转
  return { x, y, scale };
}

function computeBounds(
  points: SchematicPoint[],
  polylines: SchematicPolyline[],
  polygons: SchematicPolygon[],
  markers: SchematicMarker[]
) {
  let minLng = Infinity,
    maxLng = -Infinity,
    minLat = Infinity,
    maxLat = -Infinity;
  const touch = (lng: number, lat: number) => {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  };
  points.forEach((p) => touch(p.lng, p.lat));
  markers.forEach((p) => touch(p.lng, p.lat));
  polylines.forEach((pl) => pl.path.forEach((p) => touch(p.lng, p.lat)));
  polygons.forEach((pg) => pg.path.forEach((p) => touch(p.lng, p.lat)));
  if (minLng === Infinity) {
    // 默认北京市中心附近
    minLng = 116.2;
    maxLng = 116.6;
    minLat = 39.7;
    maxLat = 40.1;
  } else {
    // 加一点边距避免贴边
    const lngPad = (maxLng - minLng) * 0.1 || 0.05;
    const latPad = (maxLat - minLat) * 0.1 || 0.05;
    minLng -= lngPad;
    maxLng += lngPad;
    minLat -= latPad;
    maxLat += latPad;
  }
  return { minLng, maxLng, minLat, maxLat };
}

// ==================== 组件 ====================
const SchematicMap: React.FC<SchematicMapProps> = ({
  width = 800,
  height = 500,
  padding = 24,
  points = [],
  polylines = [],
  polygons = [],
  markers = [],
  title,
  bordered = true,
  showCompass = false,
  className = "",
  bounds: manualBounds,
  legend,
}) => {
  const [hoverId, setHoverId] = useState<string | number | null>(null);

  const bounds = useMemo(
    () => manualBounds || computeBounds(points, polylines, polygons, markers),
    [manualBounds, points, polylines, polygons, markers]
  );

  const w = width;
  const h = height;

  // 预先取统一的 scale 保证所有元素同比例
  const proj = (lng: number, lat: number) => project(lng, lat, bounds, w, h, padding);
  const baseProj = proj(bounds.minLng, bounds.maxLat);
  const scale = baseProj.scale;

  const pToXY = (lng: number, lat: number) => {
    const { x, y } = proj(lng, lat);
    return { x, y };
  };

  return (
    <div className={`inline-block ${bordered ? "border border-gray-200 rounded-lg bg-white" : "bg-white"} ${className}`}>
      {title ? (
        <div className="px-3 py-1.5 border-b border-gray-100 text-xs font-semibold text-gray-700">
          {title}
          <span className="ml-2 text-[10px] font-normal text-gray-400">示意图模式</span>
        </div>
      ) : null}
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        height={height}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block" }}
      >
        {/* 背景网格 */}
        <defs>
          <pattern id="schematic-grid" width={Math.max(20, scale * 0.05)} height={Math.max(20, scale * 0.05)} patternUnits="userSpaceOnUse">
            <path
              d={`M ${Math.max(20, scale * 0.05)} 0 L 0 0 0 ${Math.max(20, scale * 0.05)}`}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width={w} height={h} fill="url(#schematic-grid)" />

        {/* 面 */}
        {polygons.map((pg, i) => {
          const pts = pg.path.map((p) => pToXY(p.lng, p.lat));
          const d = pts.map((p, idx) => `${idx === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") + " Z";
          const opacity = pg.opacity ?? 0.35;
          const hovered = hoverId === (pg.id ?? i);
          return (
            <path
              key={`pg-${pg.id ?? i}`}
              d={d}
              fill={shadeHex(pg.shade ?? 300)}
              fillOpacity={hovered ? Math.min(1, opacity + 0.3) : opacity}
              stroke={shadeHex(pg.strokeShade ?? 500)}
              strokeWidth={hovered ? 1.5 : 1}
              onClick={() => pg.onClick?.()}
              onMouseEnter={() => setHoverId(pg.id ?? i)}
              onMouseLeave={() => setHoverId(null)}
              style={{ cursor: pg.onClick ? "pointer" : "default" }}
            >
              {pg.label ? <title>{pg.label}</title> : null}
            </path>
          );
        })}

        {/* 线 */}
        {polylines.map((pl, i) => {
          const pts = pl.path.map((p) => pToXY(p.lng, p.lat));
          if (pts.length < 2) return null;
          const d = pts.map((p, idx) => `${idx === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
          const dash =
            pl.style === 2
              ? `${Math.max(3, (pl.width ?? 1) * 4)} ${Math.max(2, (pl.width ?? 1) * 2)}`
              : pl.style === 3
              ? "2 4"
              : undefined;
          const hovered = hoverId === (pl.id ?? i);
          const baseWidth = pl.width ?? 1.5;
          return (
            <path
              key={`pl-${pl.id ?? i}`}
              d={d}
              fill="none"
              stroke={shadeHex(pl.shade ?? 600)}
              strokeWidth={hovered ? baseWidth + 0.8 : baseWidth}
              strokeDasharray={dash}
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={() => pl.onClick?.()}
              onMouseEnter={() => setHoverId(pl.id ?? i)}
              onMouseLeave={() => setHoverId(null)}
              style={{ cursor: pl.onClick ? "pointer" : "default" }}
            >
              {pl.label ? <title>{pl.label}</title> : null}
            </path>
          );
        })}

        {/* 点 */}
        {points.map((pt, i) => {
          const { x, y } = pToXY(pt.lng, pt.lat);
          const r = pt.r ?? Math.max(2, Math.min(8, 3 + (pt.category ?? 1) * 0.8));
          const fill = pt.category !== undefined ? CATEGORY_COLORS[pt.category] : shadeHex(pt.shade ?? 700);
          const hovered = hoverId === (pt.id ?? i);
          return (
            <circle
              key={`pt-${pt.id ?? i}`}
              cx={x}
              cy={y}
              r={hovered ? r + 1 : r}
              fill={fill}
              fillOpacity={0.85}
              stroke="#fff"
              strokeWidth={0.5}
              onClick={() => pt.onClick?.()}
              onMouseEnter={() => setHoverId(pt.id ?? i)}
              onMouseLeave={() => setHoverId(null)}
              style={{ cursor: pt.onClick ? "pointer" : "default" }}
            >
              {pt.label ? <title>{pt.label}</title> : null}
            </circle>
          );
        })}

        {/* 标记（起点/终点/换乘） */}
        {markers.map((m, i) => {
          const { x, y } = pToXY(m.lng, m.lat);
          // 0=起点黑 1=终点深灰 2=换乘中灰 3=普通浅灰
          const bg = [SHADE_MAP[900], SHADE_MAP[700], SHADE_MAP[500], SHADE_MAP[400]][m.kind ?? 3];
          const tx = m.kind === 0 ? "S" : m.kind === 1 ? "E" : m.kind === 2 ? "T" : "";
          return (
            <g key={`mk-${i}`} transform={`translate(${x},${y})`}>
              <rect x={-7} y={-10} width={14} height={14} fill={bg} opacity={0.9} rx={1} />
              <polygon points="-3,4 3,4 0,8" fill={bg} opacity={0.9} />
              {tx ? (
                <text x={0} y={0} textAnchor="middle" fontSize={9} fill="#fff" fontWeight={700} dy={-1}>
                  {tx}
                </text>
              ) : null}
              {m.label ? (
                <text x={0} y={-14} textAnchor="middle" fontSize={9} fill={SHADE_MAP[800]}>
                  {m.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {/* 指北针 */}
        {showCompass ? (
          <g transform={`translate(${w - padding - 16}, ${padding + 16})`}>
            <circle r={12} fill="#fff" stroke={SHADE_MAP[400]} />
            <polygon points="0,-8 -4,3 0,0 4,3" fill={SHADE_MAP[800]} />
            <polygon points="0,8 -4,-3 0,0 4,-3" fill={SHADE_MAP[400]} />
            <text y={-10} textAnchor="middle" fontSize={8} fill={SHADE_MAP[900]} fontWeight={700}>
              N
            </text>
          </g>
        ) : null}

        {/* 比例尺 */}
        <g transform={`translate(${padding + 8}, ${h - padding - 8})`}>
          {(() => {
            // 自动选一个"好看"的比例尺：100m/200m/500m/1km/2km/5km
            const pxPerKm = scale * (180 / 20000); // 粗略估算
            const candidates = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50];
            let best = { km: 1, px: 40 };
            for (const km of candidates) {
              const px = km * pxPerKm * 1000;
              if (px > 20 && px < 120) {
                best = { km, px };
                break;
              }
            }
            const label = best.km >= 1 ? `${best.km}km` : `${best.km * 1000}m`;
            return (
              <>
                <line x1={0} y1={0} x2={best.px} y2={0} stroke={SHADE_MAP[800]} strokeWidth={2} />
                <line x1={0} y1={-3} x2={0} y2={3} stroke={SHADE_MAP[800]} strokeWidth={2} />
                <line x1={best.px} y1={-3} x2={best.px} y2={3} stroke={SHADE_MAP[800]} strokeWidth={2} />
                <text x={best.px / 2} y={11} textAnchor="middle" fontSize={9} fill={SHADE_MAP[700]}>
                  {label}
                </text>
              </>
            );
          })()}
        </g>
      </svg>

      {/* 图例 */}
      {legend && legend.length > 0 ? (
        <div className="border-t border-gray-100 px-3 py-1.5 flex flex-wrap gap-3 text-[10px] text-gray-500">
          {legend.map((l, i) => (
            <div key={i} className="flex items-center gap-1.5">
              {l.kind === "point" ? (
                <span
                  className="inline-block rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    background:
                      l.category !== undefined
                        ? CATEGORY_COLORS[Math.min(4, l.category)]
                        : shadeHex(l.shade ?? 700),
                  }}
                />
              ) : l.kind === "line" ? (
                <span
                  className="inline-block"
                  style={{ width: 18, height: 2, background: shadeHex(l.shade ?? 600) }}
                />
              ) : (
                <span
                  className="inline-block border"
                  style={{
                    width: 10,
                    height: 10,
                    background: shadeHex(l.shade ?? 300),
                    borderColor: shadeHex(500),
                  }}
                />
              )}
              <span>{l.label}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SchematicMap;
