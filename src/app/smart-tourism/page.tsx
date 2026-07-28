"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  getRoutes,
  getCities,
  TRANSPORT_MODE_LABELS,
  TRANSPORT_MODE_ICONS,
  DIFFICULTY_LABELS,
  type TourismRoute,
  type TransportMode,
} from "@/lib/smart-tourism-data";

export default function SmartTourismPage() {
  const routes = getRoutes();
  const cities = getCities();
  const [city, setCity] = useState(cities[0] || "");
  const [transportFilter, setTransportFilter] = useState<TransportMode | "all">("all");
  const [selectedRoute, setSelectedRoute] = useState<TourismRoute | null>(null);

  const filteredRoutes = useMemo(
    () => routes.filter((r) => r.city === city && (transportFilter === "all" || r.transport === transportFilter)),
    [routes, city, transportFilter]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Link href="/tourist-resource" className="text-xs text-gray-400 hover:text-gray-600 transition">
                ← 旅游资源
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">🗺️ 智慧旅游路线</h1>
                <p className="text-[10px] text-gray-500 mt-0.5">景点路线规划 · 时间预算 · 交通方式 · 游玩攻略</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select value={city} onChange={(e) => { setCity(e.target.value); setSelectedRoute(null); }} className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700">
                {cities.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
              <select value={transportFilter} onChange={(e) => setTransportFilter(e.target.value as TransportMode | "all")} className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700">
                <option value="all">全部交通</option>
                {(Object.keys(TRANSPORT_MODE_LABELS) as TransportMode[]).map((t) => (<option key={t} value={t}>{TRANSPORT_MODE_ICONS[t]} {TRANSPORT_MODE_LABELS[t]}</option>))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>路线数：<b className="text-gray-800">{filteredRoutes.length}</b></span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">推荐路线</h3>
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
                {filteredRoutes.map((route) => (
                  <button key={route.id} onClick={() => setSelectedRoute(route)} className={`w-full text-left px-3 py-2.5 rounded-lg transition ${selectedRoute?.id === route.id ? "bg-gray-100 border border-gray-300" : "hover:bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-medium text-gray-800">{route.name}</span>
                      <span className="text-[9px] text-gray-500">{TRANSPORT_MODE_ICONS[route.transport]}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500">
                      <span>{route.totalDuration}分钟</span>
                      <span>{route.totalDistance}km</span>
                      <span style={{ color: DIFFICULTY_LABELS[route.difficulty].color }}>{DIFFICULTY_LABELS[route.difficulty].label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedRoute ? (
              <div className="space-y-3">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">{selectedRoute.name}</h2>
                      <p className="text-[10px] text-gray-500 mt-0.5">{TRANSPORT_MODE_LABELS[selectedRoute.transport]} · {selectedRoute.stops.length}个景点</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-600">{selectedRoute.rating}</div>
                        <div className="text-[9px] text-gray-500">评分</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">总时长</div>
                      <div className="text-sm font-bold text-gray-800">{selectedRoute.totalDuration}分钟</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">总里程</div>
                      <div className="text-sm font-bold text-gray-800">{selectedRoute.totalDistance}km</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">预算费用</div>
                      <div className="text-sm font-bold text-gray-800">{selectedRoute.cost === 0 ? "免费" : `¥${selectedRoute.cost}`}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">最佳时间</div>
                      <div className="text-sm font-bold text-gray-800">{selectedRoute.bestTime}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-gray-800 mb-3">行程安排</h3>
                  <div className="space-y-3">
                    {selectedRoute.stops.map((stop, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[11px] font-medium text-gray-800">{stop.name}</span>
                            <span className="text-[10px] text-gray-500">{stop.duration}分钟</span>
                          </div>
                          <p className="text-[10px] text-gray-500">{stop.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                  <h3 className="text-xs font-semibold text-yellow-800 mb-2">💡 游玩提示</h3>
                  <ul className="space-y-1">
                    {selectedRoute.tips.map((tip, i) => (<li key={i} className="text-[11px] text-yellow-700">· {tip}</li>))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8 flex items-center justify-center h-96">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="text-xs">请从左侧选择路线查看详情</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          智慧旅游路线 — 科学规划行程，畅游城市美景
        </div>
      </div>
    </div>
  );
}