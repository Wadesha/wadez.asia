"use client";

import React, { useMemo } from "react";

/**
 * 区域雷达对比图组件
 * 选择2-4个省份，多维度雷达对比
 */

export interface RadarDimension {
  key: string;
  label: string;
  /** 数值归一化最大值 */
  max: number;
  unit?: string;
}

export interface RadarItem {
  id: string;
  name: string;
  /** 各维度数值（与 dimensions 对应） */
  values: Record<string, number>;
}

export interface RegionRadarProps {
  dimensions: RadarDimension[];
  items: RadarItem[];
  title?: string;
  size?: number;
}

const PALETTE = ["#1f2937", "#6b7280", "#9ca3af", "#d1d5db"];

const RegionRadar: React.FC<RegionRadarProps> = ({ dimensions, items, title, size = 360 }) => {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 50;
  const n = dimensions.length;

  // 各维度角度
  const angles = useMemo(() => {
    return dimensions.map((_, i) => (Math.PI * 2 * i) / n - Math.PI / 2);
  }, [n]);

  // 网格圈
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  // 计算点坐标
  const getPoint = (angle: number, ratio: number) => ({
    x: cx + Math.cos(angle) * radius * ratio,
    y: cy + Math.sin(angle) * radius * ratio,
  });

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      {title ? (
        <div className="px-3 py-1.5 border-b border-gray-100 text-xs font-semibold text-gray-700">
          {title}
          <span className="ml-2 text-[10px] font-normal text-gray-400">示例数据</span>
        </div>
      ) : null}
      <div className="p-3 flex flex-wrap items-start gap-3">
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
          {/* 网格圈 */}
          {gridLevels.map((g) => (
            <polygon
              key={g}
              points={angles.map((a) => {
                const p = getPoint(a, g);
                return `${p.x},${p.y}`;
              }).join(" ")}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={0.5}
            />
          ))}
          {/* 轴 */}
          {angles.map((a, i) => {
            const p = getPoint(a, 1);
            return (
              <g key={i}>
                <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e5e7eb" strokeWidth={0.5} />
                <text
                  x={cx + Math.cos(a) * (radius + 18)}
                  y={cy + Math.sin(a) * (radius + 18)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={10}
                  fill="#374151"
                >
                  {dimensions[i].label}
                </text>
              </g>
            );
          })}
          {/* 数据多边形 */}
          {items.map((item, idx) => {
            const color = PALETTE[idx % PALETTE.length];
            const pts = dimensions.map((d, i) => {
              const v = item.values[d.key] || 0;
              const ratio = Math.min(v / d.max, 1);
              const p = getPoint(angles[i], ratio);
              return `${p.x},${p.y}`;
            });
            return (
              <g key={item.id}>
                <polygon
                  points={pts.join(" ")}
                  fill={color}
                  fillOpacity={0.15}
                  stroke={color}
                  strokeWidth={1.5}
                />
                {dimensions.map((d, i) => {
                  const v = item.values[d.key] || 0;
                  const ratio = Math.min(v / d.max, 1);
                  const p = getPoint(angles[i], ratio);
                  return <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={color} />;
                })}
              </g>
            );
          })}
        </svg>
        {/* 数值表 */}
        <div className="flex-1 min-w-[200px]">
          <div className="text-[10px] text-gray-400 mb-1">维度数值对比</div>
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-1 text-gray-500 font-medium">维度</th>
                {items.map((it, i) => (
                  <th key={it.id} className="text-right py-1 px-1 text-gray-700 font-medium">
                    <span className="inline-block w-2 h-2 rounded-sm mr-1" style={{ background: PALETTE[i % PALETTE.length] }} />
                    {it.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dimensions.map((d) => (
                <tr key={d.key} className="border-b border-gray-100">
                  <td className="py-0.5 text-gray-600">{d.label}{d.unit ? `(${d.unit})` : ""}</td>
                  {items.map((it) => (
                    <td key={it.id} className="text-right py-0.5 px-1 text-gray-700 tabular-nums">
                      {(it.values[d.key] || 0).toFixed(1)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegionRadar;
