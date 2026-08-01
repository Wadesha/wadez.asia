"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getMarineCities,
  MARINE_TYPE_LABELS,
  MARINE_TYPE_ICONS,
  type MarineResource,
  type MarineResourceType,
} from "@/lib/marine-resource-data";

const MarineResourceMap = dynamic(() => import("@/components/MarineResourceMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

export default function MarineResourcePage() {
  const cities = getMarineCities();
  const [cityId, setCityId] = useState(cities[0]?.id || "");
  const [typeFilter, setTypeFilter] = useState<MarineResourceType | "all">("all");
  const [selectedResource, setSelectedResource] = useState<MarineResource | null>(null);

  const currentCity = useMemo(() => cities.find((c) => c.id === cityId), [cities, cityId]);

  const filteredResources = useMemo(() => {
    if (!currentCity) return [];
    return currentCity.resources.filter((r) => typeFilter === "all" || r.type === typeFilter);
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
                <h1 className="text-lg font-bold text-gray-900">🌊 海洋资源分布</h1>
                <p className="text-[10px] text-gray-500 mt-0.5">海岸线长度 · 海岛数量 · 滩涂面积 · 渔业资源</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                <span className="text-[10px] text-gray-500">模拟数据</span>
              </div>
              <select value={cityId} onChange={(e) => { setCityId(e.target.value); setSelectedResource(null); }} className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700">
                {cities.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as MarineResourceType | "all")} className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700">
                <option value="all">全部类型</option>
                {(Object.keys(MARINE_TYPE_LABELS) as MarineResourceType[]).map((t) => (<option key={t} value={t}>{MARINE_TYPE_ICONS[t]} {MARINE_TYPE_LABELS[t]}</option>))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>海岸线：<b className="text-gray-800">{currentCity.coastlineLength}km</b></span>
            <span className="text-gray-200">|</span>
            <span>海岛：<b className="text-blue-600">{currentCity.islandCount}个</b></span>
            <span className="text-gray-200">|</span>
            <span>滩涂：<b className="text-gray-800">{currentCity.wetlandArea}公顷</b></span>
            <span className="text-gray-200">|</span>
            <span>渔产量：<b className="text-green-600">{currentCity.fisheryOutput}万吨</b></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">海洋资源</h3>
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
                {filteredResources.map((resource) => (
                  <button key={resource.id} onClick={() => setSelectedResource(resource)} className={`w-full text-left px-3 py-2.5 rounded-lg transition ${selectedResource?.id === resource.id ? "bg-gray-100 border border-gray-300" : "hover:bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-medium text-gray-800">{resource.name}</span>
                      <span className="text-[9px]">{MARINE_TYPE_ICONS[resource.type]}</span>
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {resource.length && <span>长度{resource.length}km</span>}
                      {resource.count && <span>数量{resource.count}</span>}
                      {resource.area && <span>面积{resource.area}公顷</span>}
                      {resource.output && <span>产量{resource.output}万吨</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-2">
              <MarineResourceMap
                resources={filteredResources}
                center={currentCity.center}
                zoom={9}
                height="h-[400px]"
                onResourceClick={setSelectedResource}
                selectedId={selectedResource?.id}
              />
            </div>
            {selectedResource ? (
              <div className="space-y-3">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">{selectedResource.name}</h2>
                      <p className="text-[10px] text-gray-500 mt-0.5">{MARINE_TYPE_LABELS[selectedResource.type]}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedResource.length && (
                      <div className="bg-gray-50 rounded-lg p-2.5">
                        <div className="text-[9px] text-gray-400">海岸线长度</div>
                        <div className="text-sm font-bold text-gray-800">{selectedResource.length}<span className="text-[9px] ml-1">km</span></div>
                      </div>
                    )}
                    {selectedResource.count && (
                      <div className="bg-gray-50 rounded-lg p-2.5">
                        <div className="text-[9px] text-gray-400">数量</div>
                        <div className="text-sm font-bold text-gray-800">{selectedResource.count}<span className="text-[9px] ml-1">{selectedResource.type === "island" ? "个" : "座"}</span></div>
                      </div>
                    )}
                    {selectedResource.area && (
                      <div className="bg-gray-50 rounded-lg p-2.5">
                        <div className="text-[9px] text-gray-400">面积</div>
                        <div className="text-sm font-bold text-gray-800">{selectedResource.area}<span className="text-[9px] ml-1">公顷</span></div>
                      </div>
                    )}
                    {selectedResource.output && (
                      <div className="bg-gray-50 rounded-lg p-2.5">
                        <div className="text-[9px] text-gray-400">年产量</div>
                        <div className="text-sm font-bold text-gray-800">{selectedResource.output}<span className="text-[9px] ml-1">万吨</span></div>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-[11px] text-gray-700">{selectedResource.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8 flex items-center justify-center h-96">
                <div className="text-center text-gray-400"><div className="text-4xl mb-2">🌊</div><p className="text-xs">请从左侧选择资源查看详情</p></div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">海洋资源分布 — 经略海洋，向海图强</div>
      </div>
    </div>
  );
}