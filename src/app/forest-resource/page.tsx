"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  getForestCities,
  FOREST_TYPE_LABELS,
  FOREST_TYPE_COLORS,
  type ForestArea,
  type ForestType,
} from "@/lib/forest-resource-data";

export default function ForestResourcePage() {
  const cities = getForestCities();
  const [cityId, setCityId] = useState(cities[0]?.id || "");
  const [typeFilter, setTypeFilter] = useState<ForestType | "all">("all");
  const [selectedForest, setSelectedForest] = useState<ForestArea | null>(null);

  const currentCity = useMemo(() => cities.find((c) => c.id === cityId), [cities, cityId]);

  const filteredForests = useMemo(() => {
    if (!currentCity) return [];
    return currentCity.forests.filter((f) => typeFilter === "all" || f.type === typeFilter);
  }, [currentCity, typeFilter]);

  if (!currentCity) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><span className="text-gray-400">加载中...</span></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Link href="/water-resource" className="text-xs text-gray-400 hover:text-gray-600 transition">← 水资源</Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">🌲 林业资源分布</h1>
                <p className="text-[10px] text-gray-500 mt-0.5">森林覆盖率 · 林地类型 · 蓄积量 · 保护区分布</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select value={cityId} onChange={(e) => { setCityId(e.target.value); setSelectedForest(null); }} className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700">
                {cities.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as ForestType | "all")} className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700">
                <option value="all">全部类型</option>
                {(Object.keys(FOREST_TYPE_LABELS) as ForestType[]).map((t) => (<option key={t} value={t}>{FOREST_TYPE_LABELS[t]}</option>))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>林地面积：<b className="text-gray-800">{(currentCity.totalArea / 10000).toFixed(1)}万公顷</b></span>
            <span className="text-gray-200">|</span>
            <span>平均覆盖率：<b className="text-green-600">{currentCity.avgCoverage}%</b></span>
            <span className="text-gray-200">|</span>
            <span>蓄积量：<b className="text-gray-800">{(currentCity.totalStock / 10000).toFixed(1)}万m³</b></span>
            <span className="text-gray-200">|</span>
            <span>保护区：<b className="text-blue-600">{currentCity.protectedAreas}</b></span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">林地区域</h3>
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
                {filteredForests.map((forest) => (
                  <button key={forest.id} onClick={() => setSelectedForest(forest)} className={`w-full text-left px-3 py-2.5 rounded-lg transition ${selectedForest?.id === forest.id ? "bg-gray-100 border border-gray-300" : "hover:bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-medium text-gray-800">{forest.name}</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] text-white" style={{ backgroundColor: FOREST_TYPE_COLORS[forest.type] }}>{FOREST_TYPE_LABELS[forest.type]}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500">
                      <span>{forest.area}公顷</span>
                      <span>覆盖率{forest.coverage}%</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedForest ? (
              <div className="space-y-3">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">{selectedForest.name}</h2>
                      <p className="text-[10px] text-gray-500 mt-0.5">{FOREST_TYPE_LABELS[selectedForest.type]}{selectedForest.protectionLevel ? ` · ${selectedForest.protectionLevel === "national" ? "国家级" : selectedForest.protectionLevel === "provincial" ? "省级" : "市级"}保护区` : ""}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">林地面积</div>
                      <div className="text-sm font-bold text-gray-800">{selectedForest.area}<span className="text-[9px] ml-1">公顷</span></div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">森林覆盖率</div>
                      <div className="text-sm font-bold text-green-600">{selectedForest.coverage}%</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">蓄积量</div>
                      <div className="text-sm font-bold text-gray-800">{selectedForest.stock}<span className="text-[9px] ml-1">m³</span></div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">单位蓄积</div>
                      <div className="text-sm font-bold text-gray-800">{Math.round(selectedForest.stock / selectedForest.area)}<span className="text-[9px] ml-1">m³/公顷</span></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8 flex items-center justify-center h-96">
                <div className="text-center text-gray-400"><div className="text-4xl mb-2">🌲</div><p className="text-xs">请从左侧选择林地区域查看详情</p></div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">林业资源分布 — 守护绿水青山，建设生态文明</div>
      </div>
    </div>
  );
}