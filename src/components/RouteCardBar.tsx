"use client";

import { useState } from "react";
import { CITIES, ALL_ROUTES, SEGMENT_ICONS, TransitRoute } from "@/lib/route-data";

interface RouteCardBarProps {
  onRouteSelect: (route: TransitRoute) => void;
  selectedRoute: TransitRoute | null;
}

export default function RouteCardBar({ onRouteSelect, selectedRoute }: RouteCardBarProps) {
  const [fromCity, setFromCity] = useState("北京");
  const [toCity, setToCity] = useState("上海");
  const [activeTab, setActiveTab] = useState<"bus" | "intercity">("bus");

  const filteredRoutes = ALL_ROUTES.filter(
    (r) => r.fromCity === fromCity && r.toCity === toCity
  );

  const busRoutes = filteredRoutes.filter((r) =>
    r.segments.some((s) => s.type === "bus")
  );

  const intercityRoutes = filteredRoutes.filter((r) =>
    r.segments.some((s) => s.type === "train")
  );

  const displayRoutes = activeTab === "bus" ? busRoutes : intercityRoutes;

  const swapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1">
            <label className="block text-xs text-gray-400 mb-1">出发城市</label>
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={swapCities}
            className="mt-5 w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 16l-4-4 4-4M17 8l4 4-4 4M3 12h18" />
            </svg>
          </button>

          <div className="flex-1">
            <label className="block text-xs text-gray-400 mb-1">到达城市</label>
            <select
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setActiveTab("bus")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "bus"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🚌 市内公交
          </button>
          <button
            onClick={() => setActiveTab("intercity")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "intercity"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🚐 城际公交
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {displayRoutes.length > 0 ? (
            displayRoutes.map((route) => (
              <div
                key={route.id}
                onClick={() => onRouteSelect(route)}
                className={`flex-shrink-0 w-48 p-3 rounded-xl border-2 cursor-pointer transition ${
                  selectedRoute?.id === route.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-100 bg-white hover:border-blue-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{SEGMENT_ICONS[route.segments[0].type]}</span>
                  <span className="text-xs font-semibold text-gray-800 truncate">
                    {route.segments[0].name}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  {route.segments[0].from} → {route.segments[route.segments.length - 1].to}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-600">{route.totalPrice}</span>
                  <span className="text-xs text-gray-400">{route.totalDuration}</span>
                </div>
                <div className="flex gap-1 mt-2">
                  {route.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-50 text-green-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex-shrink-0 w-48 p-4 rounded-xl border border-dashed border-gray-200 text-center">
              <p className="text-xs text-gray-400">暂无{activeTab === "bus" ? "市内公交" : "城际公交"}线路</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}