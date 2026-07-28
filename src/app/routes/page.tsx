"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  NATIONAL_CITIES,
  generateCrossCityRoute,
  CITY_CONNECTIONS,
  type SimulatedCrossCityRoute,
  type CityConfig,
} from "@/lib/national-cities";

interface RouteCardData {
  fromCity: CityConfig;
  toCity: CityConfig;
  hasDirectConnection: boolean;
  routes: SimulatedCrossCityRoute[];
  realDataRatio: number;
  isFullySimulated: boolean;
}

export default function RoutesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("全部");

  const regions = ["全部", "华北", "华东", "华南", "华中", "西南", "西北", "东北"];

  const routeCards = useMemo(() => {
    const cards: RouteCardData[] = [];

    for (const conn of CITY_CONNECTIONS) {
      const fromCity = NATIONAL_CITIES.find((c) => c.name === conn.fromCity);
      const toCity = NATIONAL_CITIES.find((c) => c.name === conn.toCity);
      if (!fromCity || !toCity) continue;

      const routes = generateCrossCityRoute(fromCity.name, toCity.name);
      const realDataRatio = routes.length > 0 ? routes[0].realDataRatio : 0;
      const isFullySimulated = routes.length > 0 ? routes[0].isFullySimulated : true;

      cards.push({
        fromCity,
        toCity,
        hasDirectConnection: true,
        routes,
        realDataRatio,
        isFullySimulated,
      });
    }

    const hotPairs = [
      ["北京", "上海"],
      ["北京", "广州"],
      ["上海", "广州"],
      ["上海", "深圳"],
      ["广州", "深圳"],
      ["北京", "武汉"],
      ["上海", "武汉"],
      ["成都", "重庆"],
      ["北京", "西安"],
      ["杭州", "南京"],
    ];

    for (const [from, to] of hotPairs) {
      const fromCity = NATIONAL_CITIES.find((c) => c.name === from);
      const toCity = NATIONAL_CITIES.find((c) => c.name === to);
      if (!fromCity || !toCity) continue;

      const existing = cards.find(
        (c) =>
          (c.fromCity.name === from && c.toCity.name === to) ||
          (c.fromCity.name === to && c.toCity.name === from)
      );
      if (existing) continue;

      const routes = generateCrossCityRoute(from, to);
      const realDataRatio = routes.length > 0 ? routes[0].realDataRatio : 0;
      const isFullySimulated = routes.length > 0 ? routes[0].isFullySimulated : true;

      cards.push({
        fromCity,
        toCity,
        hasDirectConnection: false,
        routes,
        realDataRatio,
        isFullySimulated,
      });
    }

    return cards;
  }, []);

  const filteredRoutes = useMemo(() => {
    let result = routeCards;
    if (selectedRegion !== "全部") {
      result = result.filter(
        (c) => c.fromCity.region === selectedRegion || c.toCity.region === selectedRegion
      );
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.fromCity.name.includes(searchTerm) ||
          c.toCity.name.includes(searchTerm) ||
          c.fromCity.pinyin.includes(term) ||
          c.toCity.pinyin.includes(term)
      );
    }
    return result;
  }, [routeCards, searchTerm, selectedRegion]);

  const stats = useMemo(() => {
    const total = routeCards.length;
    const withRealData = routeCards.filter((r) => !r.isFullySimulated).length;
    const fullySimulated = routeCards.filter((r) => r.isFullySimulated).length;
    const avgRatio =
      routeCards.reduce((s, r) => s + r.realDataRatio, 0) / Math.max(routeCards.length, 1);
    return { total, withRealData, fullySimulated, avgRatio };
  }, [routeCards]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 py-3">
        {/* 合并标题+统计+搜索 */}
        <header className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-base font-bold text-gray-900">跨城纯市内公交路线</h1>
            <div className="flex items-center gap-2 text-[10px] text-gray-500">
              <span><span className="font-bold text-gray-900">{stats.total}</span>路线</span>
              <span className="text-gray-300">|</span>
              <span><span className="font-bold text-gray-900">{stats.withRealData}</span>含真实</span>
              <span className="text-gray-300">|</span>
              <span><span className="font-bold text-gray-900">{Math.round(stats.avgRatio * 100)}%</span>真实占比</span>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索城市..."
              className="flex-1 px-2 py-1 border border-gray-200 rounded text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <div className="flex flex-wrap gap-1">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-1.5 py-1 rounded text-[10px] font-medium transition ${
                    selectedRegion === region
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {filteredRoutes.map((route) => (
            <RouteCard key={`${route.fromCity.name}-${route.toCity.name}`} route={route} />
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">未找到匹配的跨城路线</p>
          </div>
        )}

        {/* 数据说明 - 单行 */}
        <div className="mt-3 text-[10px] text-gray-400 text-center">
          真实数据：北京+15城市开源项目 · 模拟数据后续自动替换
        </div>
      </div>
    </div>
  );
}

function RouteCard({ route }: { route: RouteCardData }) {
  const [fromCity, toCity] = [route.fromCity, route.toCity];
  const routeCount = route.routes.length;

  const cardBgClass = route.isFullySimulated ? "bg-gray-50" : "bg-white";
  const cardBorderClass = route.isFullySimulated ? "border-gray-200" : "border-gray-300";

  return (
    <Link
      href={`/routes/${fromCity.pinyin}-${toCity.pinyin}`}
      className={`${cardBgClass} border ${cardBorderClass} rounded-lg p-2.5 block transition hover:border-gray-400 hover:shadow-sm`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className={`text-base font-bold ${fromCity.realDataAvailable ? "text-gray-900" : "text-gray-500"}`}>
            {fromCity.name}
          </span>
          <span className={`text-[10px] px-1 py-0.5 rounded ${fromCity.realDataAvailable ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-700"}`}>
            {fromCity.realDataAvailable ? "真" : "模"}
          </span>
          <span className="text-gray-400 text-xs">→</span>
          <span className={`text-base font-bold ${toCity.realDataAvailable ? "text-gray-900" : "text-gray-500"}`}>
            {toCity.name}
          </span>
          <span className={`text-[10px] px-1 py-0.5 rounded ${toCity.realDataAvailable ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-700"}`}>
            {toCity.realDataAvailable ? "真" : "模"}
          </span>
        </div>
        <span className={`text-[10px] ${route.isFullySimulated ? "text-gray-400" : "text-gray-600"}`}>
          {routeCount}方案
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${route.realDataRatio >= 1 ? "bg-gray-800" : route.realDataRatio > 0 ? "bg-gray-500" : "bg-gray-300"}`}
            style={{ width: `${route.realDataRatio * 100}%` }}
          ></div>
        </div>
        <span className="text-[10px] text-gray-500 w-6 text-right">{Math.round(route.realDataRatio * 100)}%</span>
      </div>

      <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1.5">
        <span>{fromCity.lineCount}→{toCity.lineCount}线</span>
        <span>{route.hasDirectConnection ? "直达" : "中转"}</span>
      </div>
    </Link>
  );
}
