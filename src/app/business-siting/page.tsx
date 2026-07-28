"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getBusinessSitingAreas,
  BUSINESS_TYPE_LABELS,
  BUSINESS_TYPE_ICONS,
  DIMENSION_META,
  type LocationScore,
  type BusinessType,
} from "@/lib/business-siting-data";

const BusinessSitingMap = dynamic(() => import("@/components/BusinessSitingMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

export default function BusinessSitingPage() {
  const areas = getBusinessSitingAreas();
  const [areaId, setAreaId] = useState(areas[0]?.id || "");
  const [selectedLocation, setSelectedLocation] = useState<LocationScore | null>(null);

  const currentArea = useMemo(
    () => areas.find((a) => a.id === areaId),
    [areaId, areas]
  );

  if (!currentArea) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="text-gray-400">加载中...</span>
      </div>
    );
  }

  const bt = currentArea.businessType;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* 顶部栏 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Link
                href="/planning"
                className="text-xs text-gray-400 hover:text-gray-600 transition"
              >
                ← 规划总览
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  📍 商铺选址评估
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  好位置 = 成功的一半 — 多维度综合选址评估
                </p>
              </div>
            </div>
            <select
              value={areaId}
              onChange={(e) => {
                setAreaId(e.target.value);
                setSelectedLocation(null);
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
              业态：<b className="text-gray-800">{BUSINESS_TYPE_ICONS[bt]} {BUSINESS_TYPE_LABELS[bt]}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              选址点：<b className="text-gray-800">{currentArea.locations.length}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              平均分：<b className="text-gray-800">{currentArea.avgScore}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              最高分：<b className="text-green-600">{currentArea.bestLocation?.overallScore}</b>
            </span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* 左侧 */}
          <div className="lg:col-span-1 space-y-3">
            {/* 最佳选址 */}
            {currentArea.bestLocation && (
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🏆</span>
                  <span className="text-xs font-medium text-green-100">最佳选址</span>
                </div>
                <div className="text-3xl font-bold mb-1">
                  {currentArea.bestLocation.overallScore}
                  <span className="text-sm font-normal text-green-100 ml-1">分</span>
                </div>
                <div className="text-xs text-green-100 mb-3">
                  {currentArea.bestLocation.name}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="bg-white/10 rounded-lg p-2">
                    <div className="text-green-100">预估日客流</div>
                    <div className="font-bold text-sm">
                      {currentArea.bestLocation.estimatedDailyCustomers}人
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2">
                    <div className="text-green-100">月营收预估</div>
                    <div className="font-bold text-sm">
                      {(currentArea.bestLocation.estimatedMonthlyRevenue / 10000).toFixed(1)}万
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6维雷达数据 */}
            {selectedLocation && (
              <div className="bg-white border border-gray-200 rounded-xl p-3">
                <h3 className="text-xs font-semibold text-gray-800 mb-3">
                  六维评估
                </h3>
                <div className="space-y-2.5">
                  {(Object.entries(DIMENSION_META) as [keyof typeof DIMENSION_META, typeof DIMENSION_META[keyof typeof DIMENSION_META]][]).map(
                    ([key, meta]) => {
                      const value = selectedLocation.dimensions[key];
                      const isNegative = key === "competition" || key === "rent";
                      const displayValue = isNegative ? 100 - value : value;
                      return (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[11px] text-gray-600">
                              {meta.label}
                            </span>
                            <span className="text-[11px] font-medium" style={{ color: meta.color }}>
                              {value}
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${displayValue}%`,
                                backgroundColor: meta.color,
                              }}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* 选址排行 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                选址排行
              </h3>
              <div className="space-y-1 max-h-[400px] overflow-y-auto">
                {currentArea.locations.map((loc, i) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`w-full text-left px-2 py-2 rounded-lg transition ${
                      selectedLocation?.id === loc.id
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] w-5 text-gray-400 font-bold">
                        {i + 1}
                      </span>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                        style={{
                          backgroundColor:
                            loc.overallScore >= 85
                              ? "#10b981"
                              : loc.overallScore >= 70
                              ? "#84cc16"
                              : loc.overallScore >= 55
                              ? "#eab308"
                              : loc.overallScore >= 40
                              ? "#f97316"
                              : "#ef4444",
                        }}
                      >
                        {loc.overallScore}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-gray-700 truncate">
                          {loc.name.replace(currentArea.name, "")}
                        </div>
                        <div className="text-[9px] text-gray-400">
                          租金 ¥{loc.rentPerSqm}/㎡ · {loc.nearbyCompetitors}个竞品
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧地图 + 详情 */}
          <div className="lg:col-span-3 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-2">
              <BusinessSitingMap
                locations={currentArea.locations}
                center={currentArea.center}
                zoom={13}
                height="h-[600px]"
                onLocationClick={setSelectedLocation}
                selectedId={selectedLocation?.id}
              />
            </div>

            {/* 选中详情 */}
            {selectedLocation && (
              <div className="bg-white border border-gray-300 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
                      style={{
                        backgroundColor:
                          selectedLocation.overallScore >= 85
                            ? "#10b981"
                            : selectedLocation.overallScore >= 70
                            ? "#84cc16"
                            : selectedLocation.overallScore >= 55
                            ? "#eab308"
                            : selectedLocation.overallScore >= 40
                            ? "#f97316"
                            : "#ef4444",
                      }}
                    >
                      {selectedLocation.overallScore}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        {selectedLocation.name}
                      </h3>
                      <p className="text-[10px] text-gray-500">
                        综合评分 · {BUSINESS_TYPE_LABELS[selectedLocation.businessType]}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-[10px] text-gray-400 mb-1">日客流预估</div>
                    <div className="text-lg font-bold text-gray-800">
                      {selectedLocation.estimatedDailyCustomers}
                      <span className="text-[10px] text-gray-400 ml-1">人/天</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-[10px] text-gray-400 mb-1">月营收预估</div>
                    <div className="text-lg font-bold text-green-600">
                      ¥{(selectedLocation.estimatedMonthlyRevenue / 10000).toFixed(1)}
                      <span className="text-[10px] text-gray-400 ml-1">万</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-[10px] text-gray-400 mb-1">租金成本</div>
                    <div className="text-lg font-bold text-orange-600">
                      ¥{selectedLocation.rentPerSqm}
                      <span className="text-[10px] text-gray-400 ml-1">/㎡/月</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-[10px] text-gray-400 mb-1">周边竞品</div>
                    <div className="text-lg font-bold text-red-500">
                      {selectedLocation.nearbyCompetitors}
                      <span className="text-[10px] text-gray-400 ml-1">家</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-[11px] text-gray-500">
                    💡 <b>选址建议：</b>
                    {selectedLocation.overallScore >= 80
                      ? "优质选址，建议优先考虑。人流量大、可达性好、竞争适中，具备良好盈利潜力。"
                      : selectedLocation.overallScore >= 60
                      ? "中等选址，可作为备选。需关注竞品情况和租金谈判空间。"
                      : "选址风险较高，建议谨慎。竞争激烈或客流量不足，需重新评估商业模式。"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          商铺选址评估 — 六维模型综合打分，让选址决策更科学
        </div>
      </div>
    </div>
  );
}
