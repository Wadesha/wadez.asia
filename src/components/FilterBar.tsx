"use client";

import { POICategory, CATEGORY_LABELS, CATEGORY_ICONS } from "@/lib/types";

interface FilterBarProps {
  activeCategory: POICategory | "all";
  onCategoryChange: (cat: POICategory | "all") => void;
  isAdding: boolean;
  onToggleAdd: () => void;
  isLoggedIn: boolean;
  poiCount: number;
}

export default function FilterBar({
  activeCategory,
  onCategoryChange,
  isAdding,
  onToggleAdd,
  isLoggedIn,
  poiCount,
}: FilterBarProps) {
  const categories: (POICategory | "all")[] = [
    "all",
    "warehouse",
    "distribution",
    "station",
    "port",
    "airport",
    "railway",
    "highway",
  ];

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 max-w-[90vw] overflow-x-auto">
        {/* 分类筛选 */}
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat === "all" ? `全部 (${poiCount})` : `${CATEGORY_ICONS[cat]} ${CATEGORY_LABELS[cat]}`}
          </button>
        ))}

        {/* 添加按钮 */}
        {isLoggedIn && (
          <button
            onClick={onToggleAdd}
            className={`shrink-0 ml-2 px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              isAdding
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {isAdding ? "取消" : "+ 添加"}
          </button>
        )}
      </div>
    </div>
  );
}
