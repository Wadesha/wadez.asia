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
import { useRealPOIs } from "@/lib/use-real-pois";
import SchematicMap from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

export default function POIsPage() {
  const { mode: mapMode } = useMapMode();
  const [pois, setPois] = useState<POIData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<POICategory | "all">("all");
  const [useReal, setUseReal] = useState(false);

  const realPOIs = useRealPOIs();

  const categoryOrder: POICategory[] = [
    "bus", "metro", "train", "coach", "airport", "ferry", "landmark", "other",
  ];

  useEffect(() => {
    loadAllPOIs().then((data) => {
      setPois(data);
      setLoading(false);
    });
  }, []);

  // 真实数据模式切换
  const handleRealSearch = () => {
    if (!searchTerm.trim()) return;
    realPOIs.search({
      keywords: searchTerm,
      city: selectedCity === "all" ? undefined : selectedCity,
      types: selectedCategory === "all" ? undefined : CATEGORY_LABELS[selectedCategory as POICategory],
    });
  };

  const toggleDataSource = () => {
    if (useReal) {
      // 切回模拟数据
      setUseReal(false);
    } else {
      setUseReal(true);
      // 切换到真实数据时自动触发一次搜索
      if (searchTerm.trim()) {
        handleRealSearch();
      }
    }
  };

  const filteredPOIs = useMemo(() => {
    return filterPOIs(pois, {
      city: selectedCity,
      category: selectedCategory,
      keyword: searchTerm,
    });
  }, [pois, selectedCity, selectedCategory, searchTerm]);

  const schematicPoints = useMemo(() => {
    return filteredPOIs.slice(0, 500).map((p, i) => {
      const catIdx = categoryOrder.indexOf(p.category);
      return {
        id: p.id || i,
        lng: p.longitude,
        lat: p.latitude,
        r: 2 + Math.min(5, catIdx % 6),
        category: ((catIdx % 5) as 0 | 1 | 2 | 3 | 4),
        label: p.name,
      };
    });
  }, [filteredPOIs]);

  const schematicLegend = useMemo(() => {
    const usedCategories = new Set(filteredPOIs.map((p) => p.category));
    return categoryOrder
      .filter((c) => usedCategories.has(c))
      .slice(0, 5)
      .map((c, i) => ({
        label: CATEGORY_LABELS[c],
        kind: "point" as const,
        category: (i as 0 | 1 | 2 | 3 | 4),
      }));
  }, [filteredPOIs]);

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
          {/* 数据源切换 */}
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500">数据源:</span>
              <button
                onClick={() => setUseReal(false)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition ${
                  !useReal ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                模拟数据
              </button>
              <button
                onClick={() => setUseReal(true)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition ${
                  useReal ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                真实数据 (高德API)
              </button>
            </div>
            {useReal && (
              <span className={`text-[10px] px-2 py-0.5 rounded ${
                realPOIs.isRealData
                  ? "bg-green-50 text-green-600 border border-green-200"
                  : realPOIs.error
                  ? "bg-amber-50 text-amber-600 border border-amber-200"
                  : "bg-gray-50 text-gray-500 border border-gray-200"
              }`}>
                {realPOIs.loading
                  ? "查询中..."
                  : realPOIs.isRealData
                  ? `✓ 真实数据 ${realPOIs.pois.length} 条`
                  : realPOIs.error
                  ? `⚠ 降级: ${realPOIs.error}`
                  : "等待搜索"}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && useReal) handleRealSearch();
                  }}
                  placeholder={useReal ? "输入关键词（如：北京大学、星巴克）后回车搜索" : "搜索POI名称、地址..."}
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
              {useReal && (
                <button
                  onClick={handleRealSearch}
                  disabled={!searchTerm.trim() || realPOIs.loading}
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition"
                >
                  {realPOIs.loading ? "搜索中..." : "搜索"}
                </button>
              )}
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

        {mapMode === "schematic" && !loading && (
          <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
            <SchematicMap
              height={350}
              points={schematicPoints}
              legend={schematicLegend}
              title="POI 分布示意图"
              showCompass
            />
          </div>
        )}
        {mapMode === "osm" && !loading && (
          <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
            <OsmMap
              height={500}
              points={schematicPoints}
              legend={schematicLegend}
              title="POI 分布示意图"
            />
          </div>
        )}

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
