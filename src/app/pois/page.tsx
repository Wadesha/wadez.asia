"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  POIData,
  POICategory,
  CATEGORY_LABELS,
  CITIES,
  loadAllPOIs,
  filterPOIs,
} from "@/lib/poi-data";

export default function POIsPage() {
  const [pois, setPois] = useState<POIData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<POICategory | "all">("all");

  useEffect(() => {
    loadAllPOIs().then((data) => {
      setPois(data);
      setLoading(false);
    });
  }, []);

  const filteredPOIs = useMemo(() => {
    return filterPOIs(pois, {
      city: selectedCity,
      category: selectedCategory,
      keyword: searchTerm,
    });
  }, [pois, selectedCity, selectedCategory, searchTerm]);

  const stats = useMemo(() => {
    const byCategory: Record<string, number> = {};
    const byCity: Record<string, number> = {};
    for (const p of pois) {
      byCategory[p.categoryLabel] = (byCategory[p.categoryLabel] || 0) + 1;
      byCity[p.city] = (byCity[p.city] || 0) + 1;
    }
    return {
      total: pois.length,
      byCategory,
      byCity,
    };
  }, [pois]);

  const categories = Object.entries(CATEGORY_LABELS) as [POICategory, string][];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 py-4">
        <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-base font-semibold text-gray-900">POI 兴趣点</h1>
            <span className="text-[10px] text-gray-400">
              共 {stats.total} 条 · {CITIES.length} 个城市
            </span>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] text-gray-500">
            {CITIES.map((city) => (
              <span key={city} className="bg-gray-100 px-2 py-0.5 rounded">
                {city} {stats.byCity[city] || 0}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索POI名称、地址..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
              >
                <option value="all">全部城市</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
                  selectedCategory === "all"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                全部
              </button>
              {categories.map(([key, label]) => {
                const count = stats.byCategory[label] || 0;
                if (count === 0) return null;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
                      selectedCategory === key
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {label} {count}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            加载中...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {filteredPOIs.map((poi) => (
                <POICard key={poi.id} poi={poi} />
              ))}
            </div>

            {filteredPOIs.length === 0 && (
              <div className="text-center py-12 text-gray-400 text-sm">
                未找到匹配的POI
              </div>
            )}
          </>
        )}

        <div className="mt-6 pt-3 border-t border-gray-200 text-[10px] text-gray-400 text-center">
          数据来源：高德地图 API · 最后更新：2026-07-28 · 共 {stats.total} 条POI
        </div>

        <div className="mt-3 text-center">
          <Link href="/gis" className="text-gray-400 hover:text-gray-600 text-[10px]">
            返回GIS总览
          </Link>
        </div>
      </div>
    </div>
  );
}

function POICard({ poi }: { poi: POIData }) {
  return (
    <Link
      href={`/pois/${poi.id}`}
      className="bg-white border border-gray-200 rounded-lg p-2.5 block transition hover:border-gray-400"
    >
      <div className="flex items-start justify-between mb-1.5">
        <h3 className="text-sm font-medium text-gray-900 truncate flex-1 mr-2">
          {poi.name.replace(/\(.*?\)/g, "")}
        </h3>
        <span className="shrink-0 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px]">
          {poi.categoryLabel}
        </span>
      </div>
      {poi.address && (
        <p className="text-[11px] text-gray-500 line-clamp-2 mb-1.5">
          {poi.address}
        </p>
      )}
      <div className="flex items-center justify-between text-[10px] text-gray-400">
        <span>{poi.city}</span>
        <span>
          {poi.longitude.toFixed(3)}, {poi.latitude.toFixed(3)}
        </span>
      </div>
    </Link>
  );
}
