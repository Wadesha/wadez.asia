"use client";

import React, { useMemo, useState } from "react";
import {
  HSR_LINES,
  AIRPORTS,
  PORTS,
  TRANSPORT_TYPES,
  type TransportLine,
  type TransportNode,
} from "@/lib/china-transport-data";
import { PROVINCES } from "@/lib/china-admin-data";
import ChoroplethMap from "@/components/ChoroplethMap";

function computeBounds(paths: Array<Array<[number, number]>>) {
  let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
  paths.forEach((path) => {
    path.forEach(([lng, lat]) => {
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    });
  });
  if (minLng === Infinity) {
    minLng = 73; maxLng = 136; minLat = 18; maxLat = 54;
  }
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

export default function TransportPage() {
  const [layer, setLayer] = useState<"hsr" | "airport" | "port" | "all">("all");

  const showHsr = layer === "hsr" || layer === "all";
  const showAirport = layer === "airport" || layer === "all";
  const showPort = layer === "port" || layer === "all";

  // 高速公路密度色块图（基于省级示例数据）
  const expresswayRegions = useMemo(() => {
    return PROVINCES.map((p) => {
      // 简化示例：东部沿海密度高，西部密度低
      const baseDensity = Math.max(50, Math.min(5000, p.gdp / p.area / 10));
      return {
        id: p.code,
        name: p.name,
        path: p.boundary,
        value: Math.round(baseDensity),
      };
    });
  }, []);

  const W = 800, H = 560, pad = 30;
  const bounds = useMemo(() => {
    const allPaths: Array<[number, number]>[] = [PROVINCES.map((p) => p.center)];
    return computeBounds(allPaths);
  }, []);

  const colorByType: Record<string, string> = {
    hsr: "#1f2937",
    airport: "#374151",
    port: "#6b7280",
    hub: "#9ca3af",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/china-map" className="text-xs text-gray-400 hover:text-gray-700">全国地图</a>
          <span className="text-gray-300">/</span>
          <h1 className="text-sm font-bold text-gray-900">交通网络专题</h1>
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">示例数据</span>
        </div>
        <div className="flex items-center gap-1">
          {[
            { k: "all", l: "全部" },
            { k: "hsr", l: "高铁网络" },
            { k: "airport", l: "机场分布" },
            { k: "port", l: "港口分布" },
          ].map((b) => (
            <button
              key={b.k}
              onClick={() => setLayer(b.k as any)}
              className={[
                "px-2 py-1 text-[10px] rounded",
                layer === b.k ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100 border border-gray-200",
              ].join(" ")}
            >
              {b.l}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 p-3">
        {/* 左：交通网络图 */}
        <div className="flex-1">
          <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
            <div className="px-3 py-1.5 border-b border-gray-100 text-xs font-semibold text-gray-700">
              全国交通网络
              <span className="ml-2 text-[10px] font-normal text-gray-400">示例数据</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
              <rect x="0" y="0" width={W} height={H} fill="#fafafa" />

              {/* 省份轮廓底图 */}
              {PROVINCES.map((p) => {
                const pts = p.boundary.map(([lng, lat]) => {
                  const pt = project(lng, lat, bounds, W, H, pad);
                  return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
                });
                return (
                  <path
                    key={p.code}
                    d={`M ${pts.join(" L ")} Z`}
                    fill="#f3f4f6"
                    stroke="#e5e7eb"
                    strokeWidth={0.5}
                  />
                );
              })}

              {/* 高铁线 */}
              {showHsr && HSR_LINES.map((line) => (
                <g key={line.id}>
                  <path
                    d={line.path.map(([lng, lat], i) => {
                      const p = project(lng, lat, bounds, W, H, pad);
                      return `${i === 0 ? "M" : "L"} ${p.x},${p.y}`;
                    }).join(" ")}
                    fill="none"
                    stroke="#1f2937"
                    strokeWidth={1.5}
                    strokeOpacity={0.8}
                  />
                  {/* 站点 */}
                  {line.path.map(([lng, lat], i) => {
                    const p = project(lng, lat, bounds, W, H, pad);
                    return (
                      <g key={i}>
                        <circle cx={p.x} cy={p.y} r={3} fill="#1f2937" />
                        <text x={p.x} y={p.y - 5} textAnchor="middle" fontSize={8} fill="#374151">
                          {line.cities[i]}
                        </text>
                      </g>
                    );
                  })}
                </g>
              ))}

              {/* 机场 */}
              {showAirport && AIRPORTS.map((ap) => {
                const p = project(ap.center[0], ap.center[1], bounds, W, H, pad);
                const r = 3 + (ap.throughput / 10000) * 6;
                return (
                  <g key={ap.id}>
                    <circle cx={p.x} cy={p.y} r={r} fill="#374151" fillOpacity={0.75} stroke="#fff" strokeWidth={0.8} />
                    <title>{ap.name}: {ap.throughput}万人次</title>
                  </g>
                );
              })}

              {/* 港口 */}
              {showPort && PORTS.map((pt) => {
                const p = project(pt.center[0], pt.center[1], bounds, W, H, pad);
                const r = 3 + Math.min(8, pt.throughput / 500);
                return (
                  <g key={pt.id}>
                    <rect x={p.x - r} y={p.y - r} width={r * 2} height={r * 2} fill="#6b7280" fillOpacity={0.75} stroke="#fff" strokeWidth={0.8} />
                    <title>{pt.name}: {pt.throughput}万TEU/万吨</title>
                  </g>
                );
              })}
            </svg>
            {/* 图例 */}
            <div className="px-3 py-2 border-t border-gray-100 flex items-center gap-3 flex-wrap">
              {showHsr && (
                <span className="flex items-center gap-1">
                  <span className="inline-block w-4 h-0.5" style={{ background: colorByType.hsr }} />
                  <span className="text-[10px] text-gray-600">高铁干线</span>
                </span>
              )}
              {showAirport && (
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ background: colorByType.airport }} />
                  <span className="text-[10px] text-gray-600">机场（大小=客流量）</span>
                </span>
              )}
              {showPort && (
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2" style={{ background: colorByType.port }} />
                  <span className="text-[10px] text-gray-600">港口（大小=吞吐量）</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 右：交通线路列表 */}
        <div className="w-72 flex flex-col gap-2">
          {showHsr && (
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs font-semibold text-gray-700 mb-2">高铁干线</div>
              <div className="space-y-1 max-h-56 overflow-y-auto">
                {HSR_LINES.map((line) => (
                  <div key={line.id} className="border-b border-gray-100 pb-1">
                    <div className="text-[11px] text-gray-800 font-medium">{line.name}</div>
                    <div className="text-[9px] text-gray-400">{line.cities.join(" → ")}</div>
                    <div className="text-[9px] text-gray-400">{line.length}km | {line.speed}km/h</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showAirport && (
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs font-semibold text-gray-700 mb-2">机场 Top 10</div>
              <div className="space-y-0.5">
                {[...AIRPORTS].sort((a, b) => b.throughput - a.throughput).slice(0, 10).map((ap, i) => (
                  <div key={ap.id} className="flex items-center gap-2 text-[10px]">
                    <span className="w-3 text-gray-400">{i + 1}</span>
                    <span className="flex-1 text-gray-700 truncate">{ap.name}</span>
                    <span className="text-gray-500">{ap.throughput}万</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showPort && (
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs font-semibold text-gray-700 mb-2">港口 Top 10</div>
              <div className="space-y-0.5">
                {[...PORTS].sort((a, b) => b.throughput - a.throughput).slice(0, 10).map((pt, i) => (
                  <div key={pt.id} className="flex items-center gap-2 text-[10px]">
                    <span className="w-3 text-gray-400">{i + 1}</span>
                    <span className="flex-1 text-gray-700 truncate">{pt.name}</span>
                    <span className="text-gray-500">{pt.throughput}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
