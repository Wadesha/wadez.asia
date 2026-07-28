"use client";

import { useState } from "react";
import Link from "next/link";

interface VersionEntry {
  version: string;
  date: string;
  status: "released" | "current" | "in-progress" | "planned";
  title: string;
  summary: string;
  changes: string[];
  subSites?: { name: string; href: string; status: "live" | "planned" }[];
}

const VERSIONS: VersionEntry[] = [
  {
    version: "v1.0.0",
    date: "2026-07-27",
    status: "released",
    title: "城际公交查询基础版",
    summary: "纯公交线路查询系统，54城市覆盖",
    changes: [
      "城际纯公交线路查询（2352条线路数据）",
      "城市选择器（54个主要城市）",
      "线路卡片展示（时长、距离、价格）",
      "热门线路推荐",
      "线路详情展开",
      "北京公交真实数据接入（1150条线路，58697站点）",
      "市内公交换乘算法（直达+一次换乘）",
      "跨城纯市内公交算法（Dijkstra + K-shortest paths）",
    ],
  },
  {
    version: "v1.1.0",
    date: "2026-07-27",
    status: "released",
    title: "版本历史 + 数据扩展",
    summary: "版本历史系统上线，15城市路径坐标数据下载",
    changes: [
      "版本历史页面",
      "首页版本历史入口",
      "15城市路径坐标数据下载（city-vein开源项目）",
      "CPTOND-2025数据源验证（350城市公交+46城市地铁）",
      "山东省大数据局15城市数据验证",
    ],
  },
  {
    version: "v1.2.0",
    date: "2026-07-27",
    status: "released",
    title: "GIS 空间分析工具箱（7/7 完成）",
    summary: "7个GIS空间分析工具全部上线，模拟数据驱动",
    changes: [
      "POI兴趣点 — 城市兴趣点分类探索",
      "区域开放性探索 — 开放/封闭空间形态 + 线性空间",
      "POI热力分布 — 密度=活力直观表达",
      "建筑形态图谱 — 高度与密度的城市性格",
      "街道网络句法 — 图论指标解码城市结构（介数/接近/集成度）",
      "可达性分析器 — 15分钟生活圈评估（等时圈）",
      "绿道慢行系统 — 线性空间连通质量（α/β/γ指数）",
      "GIS总览页 /gis 导航入口",
    ],
    subSites: [
      { name: "POI兴趣点", href: "/pois", status: "live" },
      { name: "区域探索", href: "/areas", status: "live" },
      { name: "POI热力", href: "/poi-heat", status: "live" },
      { name: "建筑形态", href: "/building-morphology", status: "live" },
      { name: "街道句法", href: "/street-syntax", status: "live" },
      { name: "可达性分析", href: "/accessibility", status: "live" },
      { name: "绿道慢行", href: "/greenway", status: "live" },
    ],
  },
  {
    version: "v1.3.0",
    date: "2026-07-27",
    status: "released",
    title: "城市规划工具箱（3/6 完成）",
    summary: "土地利用、开发强度、人口密度三大规划工具上线",
    changes: [
      "用地性质图谱 — 土地利用分类与结构分析",
      "开发强度分析 — 容积率/建筑密度/高度控制",
      "人口密度分布 — 人口热力与分布格局",
      "规划总览页 /planning 导航入口",
      "紧凑布局优化（v1.7.0/v1.7.1 系列迭代）",
    ],
    subSites: [
      { name: "用地性质", href: "/land-use", status: "live" },
      { name: "开发强度", href: "/development-intensity", status: "live" },
      { name: "人口密度", href: "/population-density", status: "live" },
      { name: "公服设施", href: "#", status: "planned" },
      { name: "城市天际线", href: "#", status: "planned" },
      { name: "交通承载力", href: "#", status: "planned" },
    ],
  },
  {
    version: "v1.4.0",
    date: "2026-07-28",
    status: "released",
    title: "多领域工具箱（6/9 完成）",
    summary: "商业选址、气象环境、文旅资源三大领域首批工具上线",
    changes: [
      "商铺选址评估 — 六维综合评分（人流/交通/竞争/租金/配套/发展）",
      "空气质量监测 — AQI六级分级 + 污染物详情 + 健康建议",
      "文旅资源地图 — 6类文旅资源（景区/文博/美食/住宿/购物/娱乐）",
      "导航「更多」下拉菜单（含商业/环境/文旅分类）",
      "首页产品化改版 — 深色科技风产品展示页",
    ],
    subSites: [
      { name: "商铺选址", href: "/business-siting", status: "live" },
      { name: "空气质量", href: "/air-quality", status: "live" },
      { name: "文旅资源", href: "/tourist-resource", status: "live" },
      { name: "商圈竞争力", href: "#", status: "planned" },
      { name: "气象数据中心", href: "#", status: "planned" },
      { name: "文旅数据分析", href: "#", status: "planned" },
    ],
  },
  {
    version: "v1.5.0",
    date: "2026-07-28",
    status: "released",
    title: "自然资源工具箱（3/5 完成）",
    summary: "矿产、土地、水资源三大自然资源工具上线",
    changes: [
      "矿产资源分布 — 8类矿产 + 4级规模 + 储量/产值/状态",
      "土地利用现状 — 用地斑块多边形渲染 + 分类统计",
      "水资源分布 — 河流路径/湖泊/水库/水系网络",
      "导航新增「自然资源」分类",
      "首页新增自然资源工具箱区块",
    ],
    subSites: [
      { name: "矿产资源", href: "/mineral-resource", status: "live" },
      { name: "土地利用", href: "/land-use-resource", status: "live" },
      { name: "水资源", href: "/water-resource", status: "live" },
      { name: "林业资源", href: "#", status: "planned" },
      { name: "海洋资源", href: "#", status: "planned" },
    ],
  },
  {
    version: "v1.6.0",
    date: "2026-07-28",
    status: "current",
    title: "产业经济工具箱（3/4 完成）",
    summary: "产业园区、经济数据、招商投资三大产业工具上线",
    changes: [
      "产业园区分布 — 8类产业 + 4级园区 + 产值/企业数/配套",
      "经济数据图谱 — 31省GDP/人口/财政/产业结构，9项指标气泡地图",
      "招商投资地图 — 6类招商载体 + 投资规模/政策红利/联系方式",
      "导航新增「产业经济」分类",
      "首页新增产业经济工具箱区块",
      "子网站总数达31个，已上线19个",
    ],
    subSites: [
      { name: "产业园区", href: "/industry-park", status: "live" },
      { name: "经济数据", href: "/economic-data", status: "live" },
      { name: "招商投资", href: "/investment", status: "live" },
      { name: "产业链图谱", href: "#", status: "planned" },
    ],
  },
  {
    version: "v1.7.0",
    date: "规划中",
    status: "planned",
    title: "高德 API 联网查询",
    summary: "从模拟数据走向真实数据，POI搜索/路径规划/地理编码",
    changes: [
      "POI关键词搜索（高德搜索POI API）",
      "周边搜索（以某点为中心搜索周边设施）",
      "地理编码/逆地理编码",
      "步行路径规划（真实步行路径与时间）",
      "公交路径规划 V2",
      "行政区域查询（真实行政区边界）",
      "天气查询",
    ],
  },
  {
    version: "v2.0.0",
    date: "规划中",
    status: "planned",
    title: "OSM 真实数据接入",
    summary: "OpenStreetMap建筑/路网/绿道真实几何数据",
    changes: [
      "OSM建筑轮廓数据接入（伪3D真实建筑）",
      "OSM路网数据接入（真实街道句法分析）",
      "OSM绿道数据接入（真实慢行网络）",
      "Geofabrik分省shp数据下载与解析",
      "Overpass API实时查询",
    ],
  },
  {
    version: "v2.5.0",
    date: "规划中",
    status: "planned",
    title: "政府开放数据接入",
    summary: "国土调查/人口普查/规划公示数据",
    changes: [
      "国土调查数据（土地利用真实斑块）",
      "人口普查数据（真实人口密度）",
      "规划公示数据（控规/总规）",
      "环境监测数据（真实AQI）",
      "经济统计数据（真实GDP/财政）",
    ],
  },
  {
    version: "v3.0.0",
    date: "规划中",
    status: "planned",
    title: "产品化升级",
    summary: "全国城市覆盖 + 多源融合 + 分析报告生成",
    changes: [
      "全国城市覆盖（从2个城市扩展到50+城市）",
      "多源数据融合（模拟+API+OSM+政府数据交叉验证）",
      "分析报告自动生成（PDF/Excel导出）",
      "自定义区域分析",
      "对比分析功能",
    ],
  },
  {
    version: "v4.0.0",
    date: "规划中",
    status: "planned",
    title: "平台化升级",
    summary: "用户系统 + 自定义分析 + 数据上传",
    changes: [
      "用户注册/登录系统",
      "个人中心（收藏/历史/项目）",
      "自定义数据上传（Shapefile/GeoJSON）",
      "团队协作功能",
      "API开放平台",
    ],
  },
];

const STATUS_CONFIG = {
  released: { label: "已发布", color: "bg-green-100 text-green-700", dot: "bg-green-500" },
  current: { label: "当前版本", color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  "in-progress": { label: "进行中", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  planned: { label: "规划中", color: "bg-gray-100 text-gray-500", dot: "bg-gray-400" },
};

export default function VersionHistory() {
  const [expandedVersion, setExpandedVersion] = useState<string | null>("v1.6.0");

  const stats = {
    total: VERSIONS.length,
    released: VERSIONS.filter((v) => v.status === "released" || v.status === "current").length,
    subSitesLive: VERSIONS.reduce(
      (sum, v) => sum + (v.subSites?.filter((s) => s.status === "live").length || 0),
      0
    ),
    subSitesPlanned: VERSIONS.reduce(
      (sum, v) => sum + (v.subSites?.filter((s) => s.status === "planned").length || 0),
      0
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">版本历史</h1>
          <p className="text-sm text-gray-500">记录平台的每一次迭代进化</p>
        </div>

        {/* 统计概览 */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">版本节点</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-green-600">{stats.released}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">已发布</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-blue-600">{stats.subSitesLive}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">已上线工具</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-gray-400">{stats.subSitesPlanned}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">规划中工具</div>
          </div>
        </div>

        {/* 版本时间线 */}
        <div className="relative">
          {/* 竖线 */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-3">
            {VERSIONS.map((v) => {
              const config = STATUS_CONFIG[v.status];
              const isExpanded = expandedVersion === v.version;

              return (
                <div key={v.version} className="relative pl-10">
                  {/* 节点 */}
                  <div
                    className={`absolute left-2.5 top-4 w-3 h-3 rounded-full ${config.dot} border-2 border-white shadow`}
                  />

                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
                    <button
                      onClick={() => setExpandedVersion(isExpanded ? null : v.version)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${config.color}`}>
                          {config.label}
                        </span>
                        <span className="font-mono text-sm font-bold text-gray-900 shrink-0">
                          {v.version}
                        </span>
                        <span className="text-xs text-gray-700 truncate">{v.title}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-gray-400 hidden sm:block">{v.date}</span>
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-gray-50">
                        <p className="text-xs text-gray-500 mt-3 mb-3">{v.summary}</p>

                        <h4 className="text-[11px] font-semibold text-gray-700 mb-2">主要变更</h4>
                        <ul className="space-y-1.5 mb-4">
                          {v.changes.map((change, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                              <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0" />
                              {change}
                            </li>
                          ))}
                        </ul>

                        {v.subSites && v.subSites.length > 0 && (
                          <>
                            <h4 className="text-[11px] font-semibold text-gray-700 mb-2">
                              子网站 ({v.subSites.filter((s) => s.status === "live").length}/{v.subSites.length} 已上线)
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {v.subSites.map((site) =>
                                site.status === "live" ? (
                                  <Link
                                    key={site.name}
                                    href={site.href}
                                    className="px-2 py-1 bg-green-50 text-green-700 text-[10px] rounded-md font-medium hover:bg-green-100 transition"
                                  >
                                    ✅ {site.name}
                                  </Link>
                                ) : (
                                  <span
                                    key={site.name}
                                    className="px-2 py-1 bg-gray-50 text-gray-400 text-[10px] rounded-md"
                                  >
                                    ⏳ {site.name}
                                  </span>
                                )
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部 */}
        <div className="mt-8 flex items-center justify-between text-[10px] text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition">
            ← 返回首页
          </Link>
          <span>
            当前版本: {VERSIONS.find((v) => v.status === "current")?.version}
          </span>
        </div>
      </div>
    </div>
  );
}
