"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getBusinessClusters,
  getCities,
  CLUSTER_LEVEL_LABELS,
  CLUSTER_LEVEL_COLORS,
  BRAND_TIER_LABELS,
  type BusinessCluster,
  type ClusterLevel,
} from "@/lib/business-cluster-data";

const BusinessClusterMap = dynamic(
  () => import("@/components/BusinessClusterMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] flex items-center justify-center bg-gray-50 rounded-xl border border-gray-300">
        <span className="text-xs text-gray-400">地图加载中...</span>
      </div>
    ),
  }
);

export default function BusinessClusterPage() {
  const clusters = getBusinessClusters();
  const cities = getCities();
  const [city, setCity] = useState(cities[0] || "");
  const [level, setLevel] = useState<ClusterLevel | "all">("all");
  const [selectedCluster, setSelectedCluster] = useState<BusinessCluster | null>(null);

  const filteredClusters = useMemo(
    () =>
      clusters.filter(
        (c) => c.city === city && (level === "all" || c.level === level)
      ),
    [clusters, city, level]
  );

  const stats = useMemo(() => {
    const totalBrands = filteredClusters.reduce((s, c) => s + c.brandCount, 0);
    const totalStores = filteredClusters.reduce((s, c) => s + c.storeCount, 0);
    const avgCompetition = Math.round(
      filteredClusters.reduce((s, c) => s + c.competitionIndex, 0) / filteredClusters.length || 0
    );
    const avgAttractiveness = Math.round(
      filteredClusters.reduce((s, c) => s + c.attractiveness, 0) / filteredClusters.length || 0
    );
    return { totalBrands, totalStores, avgCompetition, avgAttractiveness };
  }, [filteredClusters]);

  const cityCenter = useMemo<[number, number]>(() => {
    const cityClusters = clusters.filter((c) => c.city === city);
    if (!cityClusters.length) return [116.46, 39.915];
    const avgLng = cityClusters.reduce((s, c) => s + c.center[0], 0) / cityClusters.length;
    const avgLat = cityClusters.reduce((s, c) => s + c.center[1], 0) / cityClusters.length;
    return [avgLng, avgLat];
  }, [clusters, city]);

  const handleClusterClick = useCallback(
    (cluster: BusinessCluster) => setSelectedCluster(cluster),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* 顶部栏 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Link
                href="/business-siting"
                className="text-xs text-gray-400 hover:text-gray-600 transition"
              >
                ← 商铺选址
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  🏢 商圈竞争力分析
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  商圈对比 · 品牌分布 · 客群画像 · 竞争强度评分
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setSelectedCluster(null);
                }}
                className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value as ClusterLevel | "all");
                  setSelectedCluster(null);
                }}
                className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
              >
                <option value="all">全部级别</option>
                <option value="core">核心商圈</option>
                <option value="sub">次级商圈</option>
                <option value="emerging">新兴商圈</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              商圈数：<b className="text-gray-800">{filteredClusters.length}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              品牌数：<b className="text-gray-800">{stats.totalBrands}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              门店数：<b className="text-gray-800">{stats.totalStores}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              平均竞争强度：<b className="text-orange-600">{stats.avgCompetition}</b>
            </span>
            <span className="text-gray-200">|</span>
            <span>
              平均吸引力：<b className="text-green-600">{stats.avgAttractiveness}</b>
            </span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* 左侧：商圈列表 */}
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                商圈列表
              </h3>
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
                {filteredClusters.map((cluster) => (
                  <button
                    key={cluster.id}
                    onClick={() => setSelectedCluster(cluster)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition ${
                      selectedCluster?.id === cluster.id
                        ? "bg-gray-100 border border-gray-300"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-medium text-gray-800">
                        {cluster.name}
                      </span>
                      <span
                        className="px-1.5 py-0.5 rounded text-[9px] font-medium text-white"
                        style={{ backgroundColor: CLUSTER_LEVEL_COLORS[cluster.level] }}
                      >
                        {CLUSTER_LEVEL_LABELS[cluster.level]}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500">
                      <span>品牌 {cluster.brandCount}</span>
                      <span>门店 {cluster.storeCount}</span>
                      <span>
                        竞争 <b className="text-gray-700">{cluster.competitionIndex}</b>
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：详情 */}
          <div className="lg:col-span-2">
            {/* 商圈分布地图 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3 mb-3">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-semibold text-gray-800">商圈分布地图</h3>
                <span className="text-[10px] text-gray-400">点击标记查看详情</span>
              </div>
              <BusinessClusterMap
                clusters={filteredClusters}
                center={cityCenter}
                onClusterClick={handleClusterClick}
                selectedId={selectedCluster?.id}
              />
            </div>
            {selectedCluster ? (
              <div className="space-y-3">
                {/* 基础信息 */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">
                        {selectedCluster.name}
                      </h2>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {selectedCluster.city} · {CLUSTER_LEVEL_LABELS[selectedCluster.level]}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {selectedCluster.competitionIndex}
                        </div>
                        <div className="text-[9px] text-gray-500">竞争强度</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedCluster.attractiveness}
                        </div>
                        <div className="text-[9px] text-gray-500">吸引力</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">商圈面积</div>
                      <div className="text-sm font-bold text-gray-800">
                        {selectedCluster.area}
                        <span className="text-[9px] text-gray-400 ml-1">万㎡</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">日均客流</div>
                      <div className="text-sm font-bold text-gray-800">
                        {(selectedCluster.dailyTraffic / 10000).toFixed(1)}
                        <span className="text-[9px] text-gray-400 ml-1">万人</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">平均租金</div>
                      <div className="text-sm font-bold text-gray-800">
                        ¥{selectedCluster.avgRent}
                        <span className="text-[9px] text-gray-400 ml-1">/㎡/月</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">月均营收</div>
                      <div className="text-sm font-bold text-gray-800">
                        {selectedCluster.monthlyRevenue}
                        <span className="text-[9px] text-gray-400 ml-1">万</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 品牌分布 */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-gray-800 mb-3">
                    品牌分布
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {selectedCluster.brands.map((brand, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 rounded-lg p-2 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-[11px] font-medium text-gray-800">
                            {brand.name}
                          </div>
                          <div className="text-[9px] text-gray-400">
                            {brand.category} · {brand.storeCount}店
                          </div>
                        </div>
                        <span
                          className={`text-[8px] px-1.5 py-0.5 rounded ${
                            brand.tier === "luxury"
                              ? "bg-purple-100 text-purple-700"
                              : brand.tier === "premium"
                              ? "bg-blue-100 text-blue-700"
                              : brand.tier === "mass"
                              ? "bg-gray-200 text-gray-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {BRAND_TIER_LABELS[brand.tier].slice(0, 2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 客群画像 */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-gray-800 mb-3">
                    客群画像
                  </h3>
                  <div className="space-y-2">
                    {selectedCluster.customerProfiles.map((profile, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-12 text-[10px] text-gray-600">
                          {profile.age}
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gray-800 rounded-full"
                              style={{ width: `${profile.percentage}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-[10px] text-gray-700 font-medium">
                          {profile.percentage}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 优劣势分析 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                    <h3 className="text-xs font-semibold text-green-800 mb-2">
                      ✓ 优势
                    </h3>
                    <ul className="space-y-1">
                      {selectedCluster.strengths.map((s, i) => (
                        <li key={i} className="text-[11px] text-green-700">
                          · {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                    <h3 className="text-xs font-semibold text-orange-800 mb-2">
                      ✗ 劣势
                    </h3>
                    <ul className="space-y-1">
                      {selectedCluster.weaknesses.map((w, i) => (
                        <li key={i} className="text-[11px] text-orange-700">
                          · {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8 flex items-center justify-center h-96">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">🏢</div>
                  <p className="text-xs">请从左侧选择商圈查看详情</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          商圈竞争力分析 — 多维度对比商圈，洞察竞争格局
        </div>
      </div>
    </div>
  );
}