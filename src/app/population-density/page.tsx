"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getLandUseAreas,
  type LandUseParcel,
} from "@/lib/land-use-data";

const LandUseMap = dynamic(() => import("@/components/LandUseMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

type PopMetric = "total" | "density" | "age";

const METRICS: { key: PopMetric; label: string; unit: string; desc: string }[] = [
  { key: "total", label: "总人口", unit: "人", desc: "各区块居住人口总量" },
  { key: "density", label: "人口密度", unit: "人/ha", desc: "每公顷用地居住人口" },
  { key: "age", label: "年龄结构", unit: "%", desc: "各年龄段人口占比" },
];

export default function PopulationDensityPage() {
  const areas = getLandUseAreas();
  const [areaId, setAreaId] = useState(areas[0]?.id || "");
  const [metric, setMetric] = useState<PopMetric>("density");
  const [selectedParcel, setSelectedParcel] = useState<LandUseParcel | null>(null);

  const currentArea = useMemo(
    () => areas.find((a) => a.id === areaId),
    [areaId, areas]
  );

  const residentialParcels = useMemo(() => {
    if (!currentArea) return [];
    return currentArea.parcels.filter((p) => p.type === "residential" || p.population);
  }, [currentArea]);

  const populatedParcels = useMemo(() => {
    if (!currentArea) return [];
    return currentArea.parcels
      .filter((p) => p.population != null)
      .map((p) => {
        const density = p.population! / p.areaHa;
        const maxDensity = 2000;
        const t = Math.min(density / maxDensity, 1);
        const r = Math.round(200 + 55 * t);
        const g = Math.round(220 - 180 * t);
        const b = Math.round(240 - 200 * t);
        return {
          ...p,
          floorAreaRatio: t * 5,
          buildingDensity: undefined,
          _color: `rgb(${r}, ${g}, ${b})`,
        };
      });
  }, [currentArea]);

  const totalPopulation = useMemo(
    () => residentialParcels.reduce((s, p) => s + (p.population || 0), 0),
    [residentialParcels]
  );

  const avgDensity = useMemo(() => {
    const totalResArea = residentialParcels.reduce((s, p) => s + p.areaHa, 0);
    return totalResArea > 0 ? totalPopulation / totalResArea : 0;
  }, [residentialParcels, totalPopulation]);

  if (!currentArea) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="text-gray-400">加载中...</span>
      </div>
    );
  }

  const currentMetric = METRICS.find((m) => m.key === metric)!;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* 顶部栏 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Link
                href="/gis"
                className="text-xs text-gray-400 hover:text-gray-600 transition"
              >
                ← GIS总览
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  👥 人口密度分布
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  人在哪里，城市就在哪里 — 人口空间分布格局分析
                </p>
              </div>
            </div>
            <select
              value={areaId}
              onChange={(e) => {
                setAreaId(e.target.value);
                setSelectedParcel(null);
              }}
              className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
            >
              {areas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              区域：<b className="text-gray-800">{currentArea.name}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              总人口：<b className="text-gray-800">{totalPopulation.toLocaleString()} 人</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              平均密度：<b className="text-gray-800">{avgDensity.toFixed(0)} 人/ha</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              居住地块：<b className="text-gray-800">{residentialParcels.length}</b>
            </span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* 左侧控制面板 */}
          <div className="lg:col-span-1 space-y-3">
            {/* 指标选择 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                分析指标
              </h3>
              <div className="space-y-1">
                {METRICS.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setMetric(m.key)}
                    className={`w-full text-left px-2 py-2 rounded-md transition ${
                      metric === m.key
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="text-[11px] font-medium">{m.label}</div>
                    <div className={`text-[9px] mt-0.5 ${metric === m.key ? "text-gray-400" : "text-gray-400"}`}>
                      {m.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 密度分级图例 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                人口密度分级
              </h3>
              <div className="space-y-1.5">
                {[
                  { label: "极低密度", range: "<200", color: "rgb(200, 220, 240)" },
                  { label: "低密度", range: "200-500", color: "rgb(180, 200, 230)" },
                  { label: "中密度", range: "500-1000", color: "rgb(220, 180, 180)" },
                  { label: "中高密度", range: "1000-1500", color: "rgb(240, 140, 130)" },
                  { label: "高密度", range: "1500-2000", color: "rgb(220, 80, 80)" },
                  { label: "极高密度", range: ">2000", color: "rgb(150, 30, 60)" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div
                      className="w-8 h-3 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[10px] text-gray-600 flex-1">{item.label}</span>
                    <span className="text-[9px] text-gray-400">{item.range}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 人口金字塔 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-3">
                年龄结构（模拟）
              </h3>
              <div className="space-y-1.5">
                {[
                  { age: "0-14岁", pct: 15, color: "bg-cyan-400" },
                  { age: "15-29岁", pct: 25, color: "bg-blue-400" },
                  { age: "30-44岁", pct: 28, color: "bg-purple-400" },
                  { age: "45-59岁", pct: 20, color: "bg-orange-400" },
                  { age: "60岁以上", pct: 12, color: "bg-gray-400" },
                ].map((item) => (
                  <div key={item.age} className="flex items-center gap-2">
                    <span className="text-[9px] text-gray-500 w-16 shrink-0">{item.age}</span>
                    <div className="flex-1 h-4 bg-gray-50 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${item.pct * 2}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-gray-600 w-8 text-right shrink-0">
                      {item.pct}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100">
                <div className="text-[10px] text-gray-500">
                  老龄化率：<span className="font-medium text-gray-700">12%</span>
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">
                  抚养比：<span className="font-medium text-gray-700">0.45</span>
                </div>
              </div>
            </div>

            {/* 核心数据卡片 */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white">
              <div className="text-[10px] text-blue-100 mb-1">区域总人口</div>
              <div className="text-3xl font-bold">{totalPopulation.toLocaleString()}</div>
              <div className="text-[10px] text-blue-100 mt-1">
                人 · 共 {residentialParcels.length} 个居住地块
              </div>
              <div className="mt-3 pt-3 border-t border-white/20 grid grid-cols-2 gap-2">
                <div>
                  <div className="text-[9px] text-blue-200">户均人口</div>
                  <div className="text-sm font-semibold">2.8 人/户</div>
                </div>
                <div>
                  <div className="text-[9px] text-blue-200">人均用地</div>
                  <div className="text-sm font-semibold">{(10000 / avgDensity).toFixed(0)} m²</div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧地图 + 详情 */}
          <div className="lg:col-span-3 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-2">
              <LandUseMap
                parcels={populatedParcels as any}
                center={currentArea.center}
                zoom={14}
                height="h-[600px]"
                colorMode="far"
                showLabels={false}
                onParcelClick={setSelectedParcel}
              />
            </div>

            {/* 选中地块详情 */}
            {selectedParcel && (
              <div className="bg-white border border-gray-300 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {selectedParcel.name}
                  </h3>
                  <button
                    onClick={() => setSelectedParcel(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                  <div>
                    <div className="text-gray-400 mb-0.5">用地面积</div>
                    <div className="font-medium text-gray-700">
                      {selectedParcel.areaHa.toFixed(2)} 公顷
                    </div>
                  </div>
                  {selectedParcel.population != null && (
                    <div>
                      <div className="text-gray-400 mb-0.5">居住人口</div>
                      <div className="font-bold text-blue-600">
                        {selectedParcel.population.toLocaleString()} 人
                      </div>
                    </div>
                  )}
                  {selectedParcel.population != null && (
                    <div>
                      <div className="text-gray-400 mb-0.5">人口密度</div>
                      <div className="font-bold text-purple-600">
                        {(selectedParcel.population / selectedParcel.areaHa).toFixed(0)} 人/ha
                      </div>
                    </div>
                  )}
                  {selectedParcel.floorAreaRatio != null && (
                    <div>
                      <div className="text-gray-400 mb-0.5">容积率</div>
                      <div className="font-medium text-gray-700">
                        {selectedParcel.floorAreaRatio.toFixed(1)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 人口分布排行 */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-gray-800 mb-3">
                人口分布 TOP 10
              </h3>
              <div className="space-y-1.5">
                {populatedParcels
                  .sort((a, b) => (b.population || 0) - (a.population || 0))
                  .slice(0, 10)
                  .map((p, i) => {
                    const maxPop = Math.max(...populatedParcels.map((pp) => pp.population || 0));
                    const pct = maxPop > 0 ? ((p.population || 0) / maxPop) * 100 : 0;
                    return (
                      <div key={p.id} className="flex items-center gap-3">
                        <div className="w-5 text-[10px] text-gray-400 font-bold">
                          {i + 1}
                        </div>
                        <div className="w-28 text-[10px] text-gray-600 truncate shrink-0">
                          {p.name.replace(currentArea.name + " ", "")}
                        </div>
                        <div className="flex-1 h-5 bg-gray-50 rounded-full overflow-hidden relative">
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                          <span className="absolute inset-0 flex items-center px-2 text-[10px] font-medium text-gray-700">
                            {(p.population || 0).toLocaleString()} 人
                          </span>
                        </div>
                        <div className="w-16 text-right text-[10px] text-gray-500 shrink-0">
                          {((p.population || 0) / p.areaHa).toFixed(0)} 人/ha
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          人口密度分布 — 人口空间格局决定城市服务设施布局
        </div>
      </div>
    </div>
  );
}
