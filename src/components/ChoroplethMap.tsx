"use client";

import React, { useEffect, useMemo, useState } from "react";
import { loadChinaProvinceGeoJSON, extractPolygonsFromGeometry, PROVINCE_ADCODES, type GeoJSONFeature } from "@/lib/china-geojson";

// GeoJSON全名 -> 简称 显式映射表（避免正则替换出错）
const GEOJSON_NAME_TO_SHORT: Record<string, string> = {
  "北京市": "北京",
  "天津市": "天津",
  "河北省": "河北",
  "山西省": "山西",
  "内蒙古自治区": "内蒙古",
  "辽宁省": "辽宁",
  "吉林省": "吉林",
  "黑龙江省": "黑龙江",
  "上海市": "上海",
  "江苏省": "江苏",
  "浙江省": "浙江",
  "安徽省": "安徽",
  "福建省": "福建",
  "江西省": "江西",
  "山东省": "山东",
  "河南省": "河南",
  "湖北省": "湖北",
  "湖南省": "湖南",
  "广东省": "广东",
  "广西壮族自治区": "广西",
  "海南省": "海南",
  "重庆市": "重庆",
  "四川省": "四川",
  "贵州省": "贵州",
  "云南省": "云南",
  "西藏自治区": "西藏",
  "陕西省": "陕西",
  "甘肃省": "甘肃",
  "青海省": "青海",
  "宁夏回族自治区": "宁夏",
  "新疆维吾尔自治区": "新疆",
  "台湾省": "台湾",
  "香港特别行政区": "香港",
  "澳门特别行政区": "澳门",
};

// ==================== 类型 ====================
export interface ChoroplethProps {
  /** 数值数据：省名或adcode -> value */
  data: Record<string, number>;
  /** 档位数（5/7/9） */
  bins?: number;
  /** 色阶（灰度数组，从浅到深） */
  colors?: string[];
  /** 自定义值域 [min, max] */
  domain?: [number, number];
  /** 分档方式：quantile(等频) | linear(等距) */
  binMode?: "quantile" | "linear";
  /** 标题 */
  title?: string;
  /** 数值格式化函数 */
  formatValue?: (v: number) => string;
  /** 单位 */
  unit?: string;
  /** 点击回调 */
  onRegionClick?: (name: string) => void;
  /** 高度 */
  height?: number;
}

// 灰度色阶（从浅到深）
const DEFAULT_COLORS_5 = ["#e5e7eb", "#9ca3af", "#6b7280", "#374151", "#1f2937"];
const DEFAULT_COLORS_7 = ["#f3f4f6", "#d1d5db", "#9ca3af", "#6b7280", "#4b5563", "#374151", "#1f2937"];
const DEFAULT_COLORS_9 = ["#f9fafb", "#e5e7eb", "#d1d5db", "#9ca3af", "#6b7280", "#4b5563", "#374151", "#1f2937", "#111827"];

// ==================== 投影 ====================
/** 计算GeoJSON边界 */
function computeBounds(features: GeoJSONFeature[]) {
  let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;

  features.forEach(f => {
    const polys = extractPolygonsFromGeometry(f.geometry);
    polys.forEach(poly => {
      poly.forEach(([lng, lat]) => {
        if (lng < minLng) minLng = lng;
        if (lng > maxLng) maxLng = lng;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
      });
    });
  });

  return { minLng, maxLng, minLat, maxLat };
}

/** Web墨卡托投影（简化版：直接线性映射）*/
function project(lng: number, lat: number, bounds: ReturnType<typeof computeBounds>, w: number, h: number, pad: number) {
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const lngRange = bounds.maxLng - bounds.minLng || 1;
  const latRange = bounds.maxLat - bounds.minLat || 1;

  // 保持纵横比
  const scale = Math.min(innerW / lngRange, innerH / latRange);
  const mapW = lngRange * scale;
  const mapH = latRange * scale;
  const ox = pad + (innerW - mapW) / 2;
  const oy = pad + (innerH - mapH) / 2;

  const x = ox + (lng - bounds.minLng) * scale;
  const y = oy + (bounds.maxLat - lat) * scale;
  return { x, y };
}

// ==================== 分档 ====================
function quantileThresholds(values: number[], bins: number): number[] {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const ths: number[] = [];
  for (let i = 1; i < bins; i++) {
    const pos = (n - 1) * (i / bins);
    const lo = Math.floor(pos);
    const hi = Math.ceil(pos);
    const frac = pos - lo;
    const v = sorted[lo] + (sorted[hi] - sorted[lo]) * frac;
    ths.push(v);
  }
  // 去重
  const unique: number[] = [];
  ths.forEach(t => {
    if (unique.length === 0 || t - unique[unique.length - 1] > 1e-9) unique.push(t);
  });
  while (unique.length < bins - 1) {
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const range = max - min || 1;
    let i = 1;
    while (unique.length < bins - 1 && i < bins) {
      const v = min + (range * i) / bins;
      if (!unique.some(u => Math.abs(u - v) < 1e-6)) unique.push(v);
      unique.sort((a, b) => a - b);
      i++;
    }
  }
  return unique.slice(0, bins - 1);
}

function linearThresholds(min: number, max: number, bins: number): number[] {
  const range = max - min || 1;
  const ths: number[] = [];
  for (let i = 1; i < bins; i++) {
    ths.push(min + (range * i) / bins);
  }
  return ths;
}

// ==================== 组件 ====================
const ChoroplethMap: React.FC<ChoroplethProps> = ({
  data,
  bins = 7,
  colors,
  domain,
  binMode = "quantile",
  title,
  formatValue = (v) => v.toFixed(1),
  unit = "",
  onRegionClick,
  height = 560,
}) => {
  const [hoverName, setHoverName] = useState<string | null>(null);
  const [features, setFeatures] = useState<GeoJSONFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const W = 900;
  const H = height;
  const pad = 10;

  // 加载GeoJSON
  useEffect(() => {
    loadChinaProvinceGeoJSON()
      .then(geojson => {
        setFeatures(geojson.features);
        setLoading(false);
      })
      .catch(err => {
        console.error("GeoJSON load error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const colorScale = useMemo(() => {
    if (colors) return colors;
    if (bins <= 5) return DEFAULT_COLORS_5;
    if (bins <= 7) return DEFAULT_COLORS_7;
    return DEFAULT_COLORS_9;
  }, [colors, bins]);

  const bounds = useMemo(() => {
    if (features.length === 0) return { minLng: 73, maxLng: 136, minLat: 18, maxLat: 54 };
    return computeBounds(features);
  }, [features]);

  const { thresholds, globalMin, globalMax } = useMemo(() => {
    const vals = Object.values(data);
    if (vals.length === 0) return { thresholds: [], globalMin: 0, globalMax: 100 };
    const dataMin = Math.min(...vals);
    const dataMax = Math.max(...vals);
    const min = domain?.[0] ?? dataMin;
    const max = domain?.[1] ?? dataMax;
    const ths = binMode === "quantile" ? quantileThresholds(vals, bins) : linearThresholds(min, max, bins);
    return { thresholds: ths, globalMin: min, globalMax: max };
  }, [data, bins, domain, binMode]);

  const getColor = (val: number) => {
    let idx = 0;
    for (let i = 0; i < thresholds.length; i++) {
      if (val >= thresholds[i]) idx = i + 1;
    }
    return colorScale[Math.min(idx, colorScale.length - 1)];
  };

  const getProvinceValue = (name: string, adcode?: number): { value: number | undefined; key: string } => {
    // 1) 全名精确匹配
    if (data[name] !== undefined) return { value: data[name], key: name };

    // 2) 显式映射表转简称匹配（最可靠）
    const short = GEOJSON_NAME_TO_SHORT[name];
    if (short && data[short] !== undefined) return { value: data[short], key: short };

    // 3) adcode -> 简称匹配
    if (adcode) {
      for (const [shortName, code] of Object.entries(PROVINCE_ADCODES)) {
        if (code === adcode && data[shortName] !== undefined) {
          return { value: data[shortName], key: shortName };
        }
      }
    }

    // 4) 兜底正则去后缀
    const regName = name.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, "");
    if (data[regName] !== undefined) return { value: data[regName], key: regName };

    return { value: undefined, key: name };
  };

  if (loading) {
    return (
      <div className="border border-gray-200 rounded-lg bg-white p-8 text-center text-gray-500">
        加载地图数据...
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-200 rounded-lg bg-red-50 p-8 text-center text-red-600">
        地图数据加载失败: {error}
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      {title ? (
        <div className="px-3 py-1.5 border-b border-gray-100 text-xs font-semibold text-gray-700">
          {title}
        </div>
      ) : null}

      <div className="flex">
        <div className="flex-1 relative" style={{ overflowX: "auto" }}>
          <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ display: "block" }}>
            <rect x={0} y={0} width={W} height={H} fill="#fafafa" />

            {features.map(f => {
              const name = f.properties.name;
              const adcode = f.properties.adcode;
              const { value } = getProvinceValue(name, adcode);
              if (value === undefined) return null;

              const polys = extractPolygonsFromGeometry(f.geometry);
              const isHover = hoverName === name;
              const fill = getColor(value);

              return polys.map((poly, pi) => {
                const pts = poly.map(([lng, lat]) => {
                  const p = project(lng, lat, bounds, W, H, pad);
                  return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
                });
                const d = `M ${pts.join(" L ")} Z`;

                return (
                  <path
                    key={`${f.properties.adcode}-${pi}`}
                    d={d}
                    fill={fill}
                    fillOpacity={isHover ? 0.95 : 0.82}
                    stroke="#fff"
                    strokeWidth={isHover ? 1.5 : 0.8}
                    strokeLinejoin="round"
                    onMouseEnter={() => setHoverName(name)}
                    onMouseLeave={() => setHoverName(null)}
                    onClick={() => onRegionClick?.(name)}
                    style={{ cursor: onRegionClick ? "pointer" : "default", transition: "fill-opacity 0.15s" }}
                  />
                );
              });
            })}
          </svg>

          {hoverName ? (
            <div
              className="absolute pointer-events-none bg-white border border-gray-300 rounded shadow-lg px-2.5 py-1.5 text-xs z-10"
              style={{ left: "50%", top: 10, transform: "translateX(-50%)" }}
            >
              <span className="font-semibold text-gray-800">{hoverName}</span>
              {(() => {
                const { value: hv } = getProvinceValue(hoverName);
                if (hv !== undefined) {
                  return (
                    <>
                      <span className="mx-1.5 text-gray-300">|</span>
                      <span className="text-gray-600 tabular-nums">{formatValue(hv)}{unit}</span>
                    </>
                  );
                }
                return null;
              })()}
            </div>
          ) : null}

          {/* 未匹配省份提示（调试用，避免34省缺几个完全看不到） */}
          {(() => {
            const unmatched = features
              .map(f => {
                const { value, key } = getProvinceValue(f.properties.name, f.properties.adcode);
                return value === undefined ? { name: f.properties.name, adcode: f.properties.adcode, key } : null;
              })
              .filter(Boolean) as Array<{ name: string; adcode: number; key: string }>;
            if (unmatched.length === 0 || unmatched.length === features.length) return null;
            return (
              <div className="absolute left-2 bottom-2 bg-yellow-50 border border-yellow-300 rounded px-2 py-1 text-[10px] text-yellow-800 max-w-[280px] z-10">
                ⚠ {unmatched.length}个省未匹配数据: {unmatched.map(u => u.name).join(", ")}
              </div>
            );
          })()}
        </div>

        {/* 图例 */}
        <div className="w-32 border-l border-gray-100 p-3 flex flex-col gap-1">
          <div className="text-[10px] font-semibold text-gray-500 mb-1">
            {unit || "值"}
          </div>
          {colorScale.map((c, i) => {
            const lower = i === 0 ? globalMin : thresholds[i - 1];
            const upper = i === colorScale.length - 1 ? globalMax : thresholds[i];
            return (
              <div key={i} className="flex items-center gap-1.5">
                <span
                  className="inline-block w-3 h-3 rounded-sm flex-shrink-0 border border-gray-200"
                  style={{ background: c }}
                />
                <div className="text-[9px] text-gray-600 leading-tight tabular-nums">
                  {formatValue(lower)} - {formatValue(upper)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChoroplethMap;