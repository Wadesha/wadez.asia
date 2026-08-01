"use client";

import React, { useMemo, useState, useEffect } from "react";
import type {
  SchematicPoint,
  SchematicPolyline,
  SchematicPolygon,
  SchematicMarker,
} from "./SchematicMap";

// ==================== 类型 ====================
export interface OsmMapProps {
  width?: number;
  height?: number;
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  points?: SchematicPoint[];
  polylines?: SchematicPolyline[];
  polygons?: SchematicPolygon[];
  markers?: SchematicMarker[];
  title?: string;
  legend?: Array<{ label: string; kind: "point" | "line" | "area"; shade?: number; category?: number }>;
  className?: string;
}

// ==================== 工具：经纬度 ↔ 瓦片/像素 ====================
// Web 墨卡托 EPSG:3857
function lngLatToTileXY(lng: number, lat: number, z: number) {
  const n = Math.pow(2, z);
  const x = ((lng + 180) / 360) * n;
  const latRad = (lat * Math.PI) / 180;
  const y = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;
  return { tileX: Math.floor(x), tileY: Math.floor(y), x: x - Math.floor(x), y: y - Math.floor(y) };
}

function lngLatToPixel(
  lng: number,
  lat: number,
  z: number,
  tilesRange: { minTx: number; minTy: number; wPx: number; hPx: number }
) {
  const { tileX, tileY, x, y } = lngLatToTileXY(lng, lat, z);
  const px = (tileX - tilesRange.minTx + x) * 256;
  const py = (tileY - tilesRange.minTy + y) * 256;
  return { x: px, y: py };
}

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
const shade = (s?: number) => (s === undefined ? SHADE_MAP[700] : SHADE_MAP[s] || SHADE_MAP[700]);

// 计算自动bounds+zoom
function computeView(
  pts: Array<{ lng: number; lat: number }>,
  width: number,
  height: number,
  manualCenter?: [number, number],
  manualZoom?: number
) {
  if (manualCenter && manualZoom) return { center: manualCenter, zoom: manualZoom };
  if (pts.length === 0) return { center: [116.4, 39.9] as [number, number], zoom: 11 };

  let minLng = Infinity,
    maxLng = -Infinity,
    minLat = Infinity,
    maxLat = -Infinity;
  pts.forEach((p) => {
    if (p.lng < minLng) minLng = p.lng;
    if (p.lng > maxLng) maxLng = p.lng;
    if (p.lat < minLat) minLat = p.lat;
    if (p.lat > maxLat) maxLat = p.lat;
  });
  if (!isFinite(minLng)) {
    minLng = 116.2;
    maxLng = 116.6;
    minLat = 39.7;
    maxLat = 40.1;
  }
  const lngRange = Math.max(0.01, maxLng - minLng);
  const latRange = Math.max(0.01, maxLat - minLat);
  const center: [number, number] = [(minLng + maxLng) / 2, (minLat + maxLat) / 2];

  // 选能容纳的最大zoom（0-18）
  let zoom = 18;
  for (let z = 18; z >= 0; z--) {
    const { tileX: tx1, tileY: ty1 } = lngLatToTileXY(minLng, maxLat, z);
    const { tileX: tx2, tileY: ty2 } = lngLatToTileXY(maxLng, minLat, z);
    const tilesW = tx2 - tx1 + 1;
    const tilesH = ty2 - ty1 + 1;
    if (tilesW * 256 <= width - 80 && tilesH * 256 <= height - 80) {
      zoom = z;
      break;
    }
  }
  return { center, zoom };
}

// ==================== 组件 ====================
const OsmMap: React.FC<OsmMapProps> = ({
  width = 800,
  height = 500,
  center: centerProp,
  zoom: zoomProp,
  points = [],
  polylines = [],
  polygons = [],
  markers = [],
  title,
  legend,
  className = "",
}) => {
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());
  useEffect(() => {
    setImgErrors(new Set());
  }, []);

  // 收集所有有坐标的元素（经纬度列表）
  const allLngLat = useMemo(() => {
    const arr: Array<{ lng: number; lat: number }> = [];
    points.forEach((p) => arr.push(p));
    markers.forEach((p) => arr.push(p));
    polylines.forEach((pl) => pl.path.forEach((p) => arr.push(p)));
    polygons.forEach((pg) => pg.path.forEach((p) => arr.push(p)));
    return arr;
  }, [points, markers, polylines, polygons]);

  const { center, zoom } = useMemo(
    () => computeView(allLngLat, width, height, centerProp, zoomProp),
    [allLngLat, width, height, centerProp, zoomProp]
  );

  // 计算需要的瓦片范围（居中+覆盖width/height）
  const { tilesRange, svgW, svgH } = useMemo(() => {
    const c = lngLatToTileXY(center[0], center[1], zoom);
    const tilesAcross = Math.ceil(width / 256) + 2;
    const tilesDown = Math.ceil(height / 256) + 2;
    const minTx = c.tileX - Math.floor(tilesAcross / 2);
    const minTy = c.tileY - Math.floor(tilesDown / 2);
    const maxTx = minTx + tilesAcross - 1;
    const maxTy = minTy + tilesDown - 1;
    return {
      tilesRange: { minTx, minTy, maxTx, maxTy, wPx: tilesAcross * 256, hPx: tilesDown * 256 },
      svgW: tilesAcross * 256,
      svgH: tilesDown * 256,
    };
  }, [center, zoom, width, height]);

  // 经纬度 → SVG像素（基于tilesRange）
  const pxy = (lng: number, lat: number) =>
    lngLatToPixel(lng, lat, zoom, {
      minTx: tilesRange.minTx,
      minTy: tilesRange.minTy,
      wPx: tilesRange.wPx,
      hPx: tilesRange.hPx,
    });

  // 生成瓦片URL列表
  const tileUrls: Array<{ url: string; left: number; top: number; key: string }> = [];
  for (let tx = tilesRange.minTx; tx <= tilesRange.maxTx; tx++) {
    for (let ty = tilesRange.minTy; ty <= tilesRange.maxTy; ty++) {
      const s = ["a", "b", "c"][(tx + ty) % 3];
      const key = `${zoom}_${tx}_${ty}`;
      const url = `https://${s}.tile.openstreetmap.org/${zoom}/${tx}/${ty}.png`;
      tileUrls.push({
        url,
        key,
        left: (tx - tilesRange.minTx) * 256,
        top: (ty - tilesRange.minTy) * 256,
      });
    }
  }

  const OSM_FAILED = imgErrors.size > Math.ceil(tileUrls.length * 0.4);

  return (
    <div className={`inline-block border border-gray-200 rounded-lg bg-white overflow-hidden ${className}`}>
      {title ? (
        <div className="px-3 py-1.5 border-b border-gray-100 text-xs font-semibold text-gray-700">
          {title}
          <span className="ml-2 text-[10px] font-normal text-gray-400">
            OSM 免费底图 {OSM_FAILED ? "（瓦片加载失败，已降级显示）" : ""}
          </span>
        </div>
      ) : null}
      <div style={{ width: "100%", height, position: "relative", overflow: "hidden" }}>
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height={height}
          style={{
            display: "block",
            background: OSM_FAILED ? "#fafafa" : "#f3f4f6",
            filter: "grayscale(100%) contrast(0.95) brightness(1.02)",
          }}
        >
          {/* 瓦片底图 */}
          {tileUrls.map((t) => (
            <image
              key={t.key}
              href={t.url}
              x={t.left}
              y={t.top}
              width={256}
              height={256}
              preserveAspectRatio="none"
              onError={() =>
                setImgErrors((prev) => {
                  if (prev.has(t.key)) return prev;
                  const next = new Set(prev);
                  next.add(t.key);
                  return next;
                })
              }
            />
          ))}

          {/* 半透明遮罩：统一降低色彩（灰度化后再加一层轻灰） */}
          <rect x={0} y={0} width={svgW} height={svgH} fill="#ffffff" fillOpacity={0.05} />

          {/* 面 */}
          {polygons.map((pg, i) => {
            const pts = pg.path.map((p) => pxy(p.lng, p.lat));
            const d =
              pts.map((p, idx) => `${idx === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") + " Z";
            const opacity = pg.opacity ?? 0.45;
            return (
              <path
                key={`pg-${pg.id ?? i}`}
                d={d}
                fill={shade(pg.shade ?? 300)}
                fillOpacity={opacity}
                stroke={shade(pg.strokeShade ?? 600)}
                strokeWidth={1.2}
              >
                {pg.label ? <title>{pg.label}</title> : null}
              </path>
            );
          })}

          {/* 线 */}
          {polylines.map((pl, i) => {
            const pts = pl.path.map((p) => pxy(p.lng, p.lat));
            if (pts.length < 2) return null;
            const d = pts.map((p, idx) => `${idx === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
            const dash =
              pl.style === 2 ? `${Math.max(3, (pl.width ?? 1) * 4)} ${Math.max(2, (pl.width ?? 1) * 2)}` : pl.style === 3 ? "2 4" : undefined;
            return (
              <path
                key={`pl-${pl.id ?? i}`}
                d={d}
                fill="none"
                stroke={shade(pl.shade ?? 700)}
                strokeWidth={pl.width ?? 2}
                strokeDasharray={dash}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {pl.label ? <title>{pl.label}</title> : null}
              </path>
            );
          })}

          {/* 点 */}
          {points.map((pt, i) => {
            const { x, y } = pxy(pt.lng, pt.lat);
            const r = pt.r ?? Math.max(2, Math.min(8, 3 + (pt.category ?? 1) * 0.8));
            const fill = pt.category !== undefined ? CATEGORY_COLORS[pt.category] : shade(pt.shade ?? 700);
            return (
              <g key={`pt-${pt.id ?? i}`}>
                <circle cx={x} cy={y} r={r + 1.5} fill="#ffffff" fillOpacity={0.75} />
                <circle cx={x} cy={y} r={r} fill={fill} fillOpacity={0.88}>
                  {pt.label ? <title>{pt.label}</title> : null}
                </circle>
              </g>
            );
          })}

          {/* 标记 S/E/T */}
          {markers.map((m, i) => {
            const { x, y } = pxy(m.lng, m.lat);
            const bg = [SHADE_MAP[900], SHADE_MAP[700], SHADE_MAP[500], SHADE_MAP[400]][m.kind ?? 3];
            const tx = m.kind === 0 ? "S" : m.kind === 1 ? "E" : m.kind === 2 ? "T" : "";
            return (
              <g key={`mk-${i}`} transform={`translate(${x},${y})`}>
                <rect x={-8} y={-12} width={16} height={16} fill={bg} opacity={0.9} rx={1} stroke="#fff" strokeWidth={0.8} />
                <polygon points="-3,4 3,4 0,9" fill={bg} opacity={0.9} />
                {tx ? (
                  <text x={0} y={-1} textAnchor="middle" fontSize={9} fill="#fff" fontWeight={700}>
                    {tx}
                  </text>
                ) : null}
                {m.label ? (
                  <text x={0} y={-16} textAnchor="middle" fontSize={9} fill={SHADE_MAP[800]}>
                    {m.label}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>

        {/* zoom/center 小标注 */}
        <div className="absolute bottom-1.5 left-2 text-[9px] text-gray-500 bg-white/70 px-1 rounded">
          z{zoom} {center[0].toFixed(2)},{center[1].toFixed(2)}
        </div>
        <div className="absolute bottom-1.5 right-2 text-[9px] text-gray-500 bg-white/70 px-1 rounded">
          © OpenStreetMap
        </div>
      </div>

      {/* legend */}
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
                        : shade(l.shade ?? 700),
                  }}
                />
              ) : l.kind === "line" ? (
                <span className="inline-block" style={{ width: 18, height: 2, background: shade(l.shade ?? 600) }} />
              ) : (
                <span
                  className="inline-block border"
                  style={{
                    width: 10,
                    height: 10,
                    background: shade(l.shade ?? 300),
                    borderColor: shade(500),
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

export default OsmMap;
