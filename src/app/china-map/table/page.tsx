"use client";

import React, { useMemo, useState } from "react";
import { PROVINCES, CITIES, COUNTIES, perCapitaGDP, populationDensity } from "@/lib/china-admin-data";
import AdminTable, { type Column } from "@/components/AdminTable";

interface AdminRow {
  id: string;
  code: string;
  name: string;
  level: "省级" | "地级" | "县级";
  province: string;
  gdp: number;
  population: number;
  area: number;
  urbanization: number;
  perCapita: number;
  density: number;
}

export default function TablePage() {
  const [level, setLevel] = useState<"省级" | "地级" | "县级">("省级");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const rows: AdminRow[] = useMemo(() => {
    if (level === "省级") {
      return PROVINCES.map((p) => ({
        id: p.code, code: p.code, name: p.name, level: "省级" as const, province: p.name,
        gdp: p.gdp, population: p.population, area: p.area, urbanization: p.urbanizationRate,
        perCapita: perCapitaGDP(p), density: populationDensity(p),
      }));
    }
    if (level === "地级") {
      return CITIES.map((c) => ({
        id: c.code, code: c.code, name: c.name, level: "地级" as const, province: c.provinceName,
        gdp: c.gdp, population: c.population, area: c.area, urbanization: c.urbanizationRate,
        perCapita: c.population > 0 ? +(c.gdp / c.population * 10).toFixed(2) : 0,
        density: c.area > 0 ? Math.round(c.population * 10000 / (c.area * 10000)) : 0,
      }));
    }
    return COUNTIES.map((c) => ({
      id: c.code, code: c.code, name: c.name, level: "县级" as const, province: c.provinceName,
      gdp: c.gdp, population: c.population, area: 0, urbanization: 0,
      perCapita: c.population > 0 ? +(c.gdp / c.population * 10).toFixed(2) : 0,
      density: 0,
    }));
  }, [level]);

  const columns: Column<AdminRow>[] = [
    { key: "code", label: "代码", width: "60px", sortable: true },
    { key: "name", label: "名称", width: "100px", sortable: true },
    { key: "province", label: "所属省份", width: "100px", sortable: true },
    { key: "gdp", label: "GDP(亿)", format: (v) => v.toFixed(0), sortable: true },
    { key: "population", label: "人口(万)", format: (v) => v.toFixed(0), sortable: true },
    { key: "area", label: "面积(万km²)", format: (v) => v.toFixed(2), sortable: true },
    { key: "urbanization", label: "城镇化率(%)", format: (v) => v.toFixed(1), sortable: true },
    { key: "perCapita", label: "人均GDP(万)", format: (v) => v.toFixed(2), sortable: true },
    { key: "density", label: "人口密度(人/km²)", format: (v) => v.toFixed(0), sortable: true },
  ];

  // 统计
  const stats = useMemo(() => {
    const totalGdp = rows.reduce((s, r) => s + r.gdp, 0);
    const totalPop = rows.reduce((s, r) => s + r.population, 0);
    const avgPerCapita = totalPop > 0 ? +(totalGdp / totalPop * 10).toFixed(2) : 0;
    const maxGdp = Math.max(...rows.map((r) => r.gdp));
    const minGdp = Math.min(...rows.map((r) => r.gdp));
    return { totalGdp, totalPop, avgPerCapita, maxGdp, minGdp, count: rows.length };
  }, [rows]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/china-map" className="text-xs text-gray-400 hover:text-gray-700">全国地图</a>
          <span className="text-gray-300">/</span>
          <h1 className="text-sm font-bold text-gray-900">数据表格</h1>
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">示例数据</span>
        </div>
        <div className="flex items-center gap-1">
          {(["省级", "地级", "县级"] as const).map((l) => (
            <button
              key={l}
              onClick={() => { setLevel(l); setSelectedId(null); }}
              className={[
                "px-2 py-1 text-[10px] rounded",
                level === l ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100 border border-gray-200",
              ].join(" ")}
            >
              {l} ({l === "省级" ? PROVINCES.length : l === "地级" ? CITIES.length : COUNTIES.length})
            </button>
          ))}
        </div>
      </div>

      {/* 统计摘要 */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="grid grid-cols-5 gap-2">
          {[
            { label: "总数", value: `${stats.count} 条` },
            { label: "总GDP", value: `${stats.totalGdp.toLocaleString()} 亿` },
            { label: "总人口", value: `${stats.totalPop.toLocaleString()} 万` },
            { label: "人均GDP", value: `${stats.avgPerCapita} 万` },
            { label: "GDP区间", value: `${stats.minGdp.toFixed(0)} - ${stats.maxGdp.toFixed(0)} 亿` },
          ].map((s) => (
            <div key={s.label} className="border border-gray-200 rounded px-2 py-1">
              <div className="text-[10px] text-gray-400">{s.label}</div>
              <div className="text-xs font-semibold text-gray-800">{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3">
        <AdminTable
          data={rows}
          columns={columns}
          title={`${level}行政区数据`}
          selectedId={selectedId}
          onRowClick={(row) => setSelectedId(row.id)}
          pageSize={50}
        />
      </div>
    </div>
  );
}
