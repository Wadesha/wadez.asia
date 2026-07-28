"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getInvestmentCities,
  INVESTMENT_TYPE_LABELS,
  INVESTMENT_TYPE_ICONS,
  INVESTMENT_TYPE_COLORS,
  STATUS_LABELS,
  type InvestmentProject,
  type InvestmentType,
} from "@/lib/investment-data";

const InvestmentMap = dynamic(() => import("@/components/InvestmentMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

export default function InvestmentPage() {
  const cities = getInvestmentCities();
  const [cityId, setCityId] = useState(cities[0]?.id || "");
  const [selectedType, setSelectedType] = useState<InvestmentType | "all">("all");
  const [selectedProject, setSelectedProject] = useState<InvestmentProject | null>(null);

  const currentCity = useMemo(
    () => cities.find((c) => c.id === cityId),
    [cityId, cities]
  );

  const filteredProjects = useMemo(() => {
    if (!currentCity) return [];
    if (selectedType === "all") return currentCity.projects;
    return currentCity.projects.filter((p) => p.type === selectedType);
  }, [currentCity, selectedType]);

  const sortedProjects = useMemo(
    () => [...filteredProjects].sort((a, b) => b.totalInvestment - a.totalInvestment),
    [filteredProjects]
  );

  const stats = useMemo(() => {
    if (!currentCity) return null;
    const all = currentCity.projects;
    return {
      total: all.length,
      totalInvest: all.reduce((s, p) => s + p.totalInvestment, 0).toFixed(1),
      operation: all.filter((p) => p.status === "operation").length,
      construction: all.filter((p) => p.status === "under_construction").length,
      avgInvest: (all.reduce((s, p) => s + p.totalInvestment, 0) / all.length).toFixed(1),
      totalJobs: all.reduce((s, p) => s + p.expectedJobs, 0).toLocaleString(),
    };
  }, [currentCity]);

  if (!currentCity || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="text-gray-400">加载中...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* 顶部栏 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Link
                href="/gis"
                className="text-xs text-gray-400 hover:text-gray-600 transition"
              >
                ← GIS总览
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  💰 招商投资地图
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  投资优选 — 重点项目、产业载体、优惠政策一站式全景
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={cityId}
                onChange={(e) => {
                  setCityId(e.target.value);
                  setSelectedProject(null);
                }}
                className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
              >
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 概览数据 */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 pt-3 border-t border-gray-100">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{stats.total}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">项目总数</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-rose-600">{stats.totalInvest}亿</div>
              <div className="text-[10px] text-gray-400 mt-0.5">总投资额</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{stats.operation}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">运营中</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-amber-600">{stats.construction}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">建设中</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{stats.avgInvest}亿</div>
              <div className="text-[10px] text-gray-400 mt-0.5">平均投资</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-indigo-600">{stats.totalJobs}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">就业岗位</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* 左侧列表 */}
          <div className="lg:col-span-1 space-y-3">
            {/* 类型筛选 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                项目类型
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedType("all")}
                  className={`w-full px-2 py-1.5 text-[10px] rounded-md text-left transition flex items-center gap-1.5 ${
                    selectedType === "all"
                      ? "bg-gray-800 text-white font-medium"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  🏗️ 全部类型
                  <span className="ml-auto opacity-70">{currentCity.projects.length}</span>
                </button>
                {(Object.keys(INVESTMENT_TYPE_LABELS) as InvestmentType[]).map((type) => {
                  const count = currentCity.projects.filter((p) => p.type === type).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`w-full px-2 py-1.5 text-[10px] rounded-md text-left transition flex items-center gap-1.5 ${
                        selectedType === type
                          ? "text-white font-medium"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                      style={
                        selectedType === type
                          ? { backgroundColor: INVESTMENT_TYPE_COLORS[type] }
                          : {}
                      }
                    >
                      {INVESTMENT_TYPE_ICONS[type]} {INVESTMENT_TYPE_LABELS[type]}
                      <span className="ml-auto opacity-70">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 项目列表 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">
                📋 招商项目 ({filteredProjects.length})
              </h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {sortedProjects.map((p) => {
                  const statusInfo = STATUS_LABELS[p.status];
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProject(p)}
                      className={`w-full text-left p-2.5 rounded-lg transition border ${
                        selectedProject?.id === p.id
                          ? "border-blue-300 bg-blue-50"
                          : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                          style={{ backgroundColor: INVESTMENT_TYPE_COLORS[p.type] + "20" }}
                        >
                          {INVESTMENT_TYPE_ICONS[p.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-medium text-gray-800 truncate">
                              {p.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span
                              className="px-1 text-[9px] rounded"
                              style={{
                                backgroundColor: statusInfo.color + "15",
                                color: statusInfo.color,
                              }}
                            >
                              {statusInfo.label}
                            </span>
                            <span className="text-[9px] text-gray-400">{p.industry}</span>
                          </div>
                          <div className="text-[10px] text-rose-600 font-bold mt-1">
                            {p.totalInvestment}亿元
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 右侧地图+详情 */}
          <div className="lg:col-span-3 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-2">
              <InvestmentMap
                projects={filteredProjects}
                center={currentCity.center}
                zoom={11}
                height="h-[560px]"
                onProjectClick={setSelectedProject}
                selectedId={selectedProject?.id}
              />
            </div>

            {/* 详情 */}
            {selectedProject && (
              <div className="bg-white border border-gray-300 rounded-xl p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                        style={{ backgroundColor: INVESTMENT_TYPE_COLORS[selectedProject.type] + "20" }}
                      >
                        {INVESTMENT_TYPE_ICONS[selectedProject.type]}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-gray-800">
                          {selectedProject.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className="px-1.5 py-0.5 text-[10px] rounded-full text-white"
                            style={{ backgroundColor: STATUS_LABELS[selectedProject.status].color }}
                          >
                            {STATUS_LABELS[selectedProject.status].label}
                          </span>
                          <span className="text-[10px] text-gray-500">
                            {INVESTMENT_TYPE_LABELS[selectedProject.type]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  <div className="bg-rose-50 rounded-lg p-3">
                    <div className="text-[10px] text-rose-400 mb-1">总投资</div>
                    <div className="text-lg font-bold text-rose-600">
                      {selectedProject.totalInvestment}
                      <span className="text-[10px] text-rose-400 ml-1">亿元</span>
                    </div>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <div className="text-[10px] text-emerald-400 mb-1">预计产值</div>
                    <div className="text-lg font-bold text-emerald-600">
                      {selectedProject.expectedOutput}
                      <span className="text-[10px] text-emerald-400 ml-1">亿元</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-[10px] text-blue-400 mb-1">用地面积</div>
                    <div className="text-lg font-bold text-blue-600">
                      {(selectedProject.areaSqM / 10000).toFixed(1)}
                      <span className="text-[10px] text-blue-400 ml-1">万㎡</span>
                    </div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3">
                    <div className="text-[10px] text-amber-400 mb-1">就业岗位</div>
                    <div className="text-lg font-bold text-amber-600">
                      {selectedProject.expectedJobs.toLocaleString()}
                      <span className="text-[10px] text-amber-400 ml-1">个</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400">所属产业</span>
                      <span className="text-gray-700 font-medium">{selectedProject.industry}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400">开发主体</span>
                      <span className="text-gray-700 font-medium">{selectedProject.developer}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400">开工时间</span>
                      <span className="text-gray-700 font-medium">{selectedProject.startYear}年</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400">预计竣工</span>
                      <span className="text-gray-700 font-medium">{selectedProject.completeYear}年</span>
                    </div>
                  </div>
                </div>

                {/* 政策红利 */}
                <div className="mb-4">
                  <div className="text-[11px] font-medium text-gray-700 mb-2">
                    🎁 政策红利
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.policyBenefits.map((policy) => (
                      <span
                        key={policy}
                        className="px-2 py-1 bg-green-50 text-green-700 text-[10px] rounded-full font-medium"
                      >
                        ✓ {policy}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 项目简介 */}
                <div className="mb-4">
                  <div className="text-[11px] font-medium text-gray-700 mb-1.5">
                    📝 项目简介
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {selectedProject.description}，占地{(selectedProject.areaSqM / 10000).toFixed(1)}万㎡，
                    总投资{selectedProject.totalInvestment}亿元，预计年产值{selectedProject.expectedOutput}亿元，
                    创造就业岗位{selectedProject.expectedJobs.toLocaleString()}个。
                    项目聚焦{selectedProject.industry}领域，享受多项政策红利，投资潜力巨大。
                  </p>
                </div>

                {/* 联系方式 */}
                {selectedProject.contactPerson && selectedProject.contactPhone && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-gray-400 mb-0.5">招商联系人</div>
                      <div className="text-sm font-bold text-gray-700">
                        {selectedProject.contactPerson} · {selectedProject.contactPhone}
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white text-[11px] font-medium rounded-lg hover:bg-blue-700 transition">
                      立即咨询
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 主导产业 */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                🏭 {currentCity.name}主导产业
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentCity.keyIndustries.map((ind, i) => (
                  <div
                    key={ind}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-medium rounded-full"
                  >
                    {i + 1}. {ind}
                  </div>
                ))}
              </div>
            </div>

            {/* 政策文件 */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                📜 重点政策文件
              </h3>
              <div className="space-y-2">
                {currentCity.policies.map((policy, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                  >
                    <span className="text-lg">📄</span>
                    <div className="flex-1">
                      <div className="text-xs text-gray-700 font-medium">{policy}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        {currentCity.name}市人民政府发布
                      </div>
                    </div>
                    <span className="text-[10px] text-blue-600">查看 →</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          招商投资地图 — 投资优选，重点项目产业载体优惠政策一站式全景
        </div>
      </div>
    </div>
  );
}
