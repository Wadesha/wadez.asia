"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  getHeritages,
  getCities,
  HERITAGE_LEVEL_LABELS,
  HERITAGE_LEVEL_COLORS,
  HERITAGE_CATEGORY_LABELS,
  type IntangibleHeritage,
  type HeritageLevel,
  type HeritageCategory,
} from "@/lib/intangible-heritage-data";

export default function IntangibleHeritagePage() {
  const heritages = getHeritages();
  const cities = getCities();
  const [city, setCity] = useState(cities[0] || "");
  const [levelFilter, setLevelFilter] = useState<HeritageLevel | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<HeritageCategory | "all">("all");
  const [selectedHeritage, setSelectedHeritage] = useState<IntangibleHeritage | null>(null);

  const filteredHeritages = useMemo(
    () =>
      heritages.filter(
        (h) =>
          h.city === city &&
          (levelFilter === "all" || h.level === levelFilter) &&
          (categoryFilter === "all" || h.category === categoryFilter)
      ),
    [heritages, city, levelFilter, categoryFilter]
  );

  const stats = useMemo(() => {
    const nationalCount = filteredHeritages.filter((h) => h.level === "national").length;
    const inheritorCount = filteredHeritages.reduce((s, h) => s + h.inheritors.length, 0);
    const atRiskCount = filteredHeritages.filter((h) => h.status !== "active").length;
    return { nationalCount, inheritorCount, atRiskCount };
  }, [filteredHeritages]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* 顶部栏 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Link
                href="/tourist-resource"
                className="text-xs text-gray-400 hover:text-gray-600 transition"
              >
                ← 旅游资源
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  🏺 非遗文化分布
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  非遗项目列表 · 级别分类 · 地域分布 · 传承人信息
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setSelectedHeritage(null);
                }}
                className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>项目数：<b className="text-gray-800">{filteredHeritages.length}</b></span>
            <span className="text-gray-200">|</span>
            <span>国家级：<b className="text-red-600">{stats.nationalCount}</b></span>
            <span className="text-gray-200">|</span>
            <span>传承人：<b className="text-gray-800">{stats.inheritorCount}</b></span>
            <span className="text-gray-200">|</span>
            <span>濒危：<b className="text-orange-600">{stats.atRiskCount}</b></span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* 左侧筛选和列表 */}
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2">筛选</h3>
              <div className="space-y-2">
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value as HeritageLevel | "all")}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md"
                >
                  <option value="all">全部级别</option>
                  {(Object.keys(HERITAGE_LEVEL_LABELS) as HeritageLevel[]).map((l) => (
                    <option key={l} value={l}>{HERITAGE_LEVEL_LABELS[l]}</option>
                  ))}
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as HeritageCategory | "all")}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md"
                >
                  <option value="all">全部类别</option>
                  {(Object.keys(HERITAGE_CATEGORY_LABELS) as HeritageCategory[]).map((c) => (
                    <option key={c} value={c}>{HERITAGE_CATEGORY_LABELS[c]}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">非遗项目</h3>
              <div className="space-y-1.5 max-h-[450px] overflow-y-auto">
                {filteredHeritages.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setSelectedHeritage(h)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition ${
                      selectedHeritage?.id === h.id ? "bg-gray-100 border border-gray-300" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-medium text-gray-800">{h.name}</span>
                      <span
                        className="px-1.5 py-0.5 rounded text-[9px] font-medium text-white"
                        style={{ backgroundColor: HERITAGE_LEVEL_COLORS[h.level] }}
                      >
                        {HERITAGE_LEVEL_LABELS[h.level]}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {HERITAGE_CATEGORY_LABELS[h.category]} · {h.inheritors.length}位传承人
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧详情 */}
          <div className="lg:col-span-2">
            {selectedHeritage ? (
              <div className="space-y-3">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">{selectedHeritage.name}</h2>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {HERITAGE_LEVEL_LABELS[selectedHeritage.level]} · {HERITAGE_CATEGORY_LABELS[selectedHeritage.category]}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{selectedHeritage.declarationYear}</div>
                      <div className="text-[9px] text-gray-500">入选年份</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">所在地区</div>
                      <div className="text-sm font-bold text-gray-800">{selectedHeritage.region}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">保护单位</div>
                      <div className="text-sm font-bold text-gray-800 truncate">{selectedHeritage.protectionUnit}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">传承人</div>
                      <div className="text-sm font-bold text-gray-800">{selectedHeritage.inheritors.length}位</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-gray-800 mb-3">传承人信息</h3>
                  <div className="space-y-2">
                    {selectedHeritage.inheritors.map((inheritor, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg p-2.5">
                        <div>
                          <div className="text-[11px] font-medium text-gray-800">{inheritor.name}</div>
                          <div className="text-[9px] text-gray-400">{inheritor.gender} · {inheritor.age}岁 · 从业{inheritor.years}年</div>
                        </div>
                        <span
                          className="px-2 py-1 rounded text-[9px] text-white"
                          style={{ backgroundColor: HERITAGE_LEVEL_COLORS[inheritor.level] }}
                        >
                          {HERITAGE_LEVEL_LABELS[inheritor.level]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-[11px] text-gray-700">{selectedHeritage.description}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8 flex items-center justify-center h-96">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">🏺</div>
                  <p className="text-xs">请从左侧选择非遗项目查看详情</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          非遗文化分布 — 传承文化根脉，守护民族记忆
        </div>
      </div>
    </div>
  );
}