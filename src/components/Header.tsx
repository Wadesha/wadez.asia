"use client";

import { useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface HeaderProps {
  user: { email: string } | null;
}

const GIS_TOOLS = [
  { href: "/pois", label: "📍 POI兴趣点", desc: "城市兴趣点分类探索" },
  { href: "/areas", label: "🏘️ 区域探索", desc: "开放/封闭空间形态" },
  { href: "/poi-heat", label: "🔥 POI热力分布", desc: "密度=活力直观表达" },
  { href: "/building-morphology", label: "🏙️ 建筑形态图谱", desc: "高度与密度的城市性格" },
  { href: "/street-syntax", label: "🕸️ 街道网络句法", desc: "图论解码城市结构" },
  { href: "/accessibility", label: "🚶 可达性分析", desc: "15分钟生活圈评估" },
  { href: "/greenway", label: "🌿 绿道慢行系统", desc: "线性空间连通质量" },
];

const PLANNING_TOOLS = [
  { href: "/land-use", label: "🏗️ 用地性质图谱", desc: "土地利用分类与结构" },
  { href: "/development-intensity", label: "🏢 开发强度分析", desc: "容积率密度高度" },
  { href: "/population-density", label: "👥 人口密度分布", desc: "人口热力与格局" },
  { href: "/public-service", label: "🏥 公共服务设施", desc: "教育医疗文体覆盖" },
  { href: "/skyline", label: "🌆 城市天际线", desc: "高度控制形态" },
  { href: "/traffic-capacity", label: "🚗 交通承载力", desc: "路网密度拥堵" },
];

const BUSINESS_TOOLS = [
  { href: "/business-siting", label: "📍 商铺选址评估", desc: "六维综合评分找好铺" },
  { href: "/business-cluster", label: "🏪 商圈竞争力分析", desc: "知己知彼百战不殆" },
  { href: "/passenger-flow", label: "👥 客流预测模拟器", desc: "人潮在哪里机会在哪" },
];

const ENV_TOOLS = [
  { href: "/air-quality", label: "🌬️ 空气质量监测", desc: "实时空气品质分布" },
  { href: "/heat-island", label: "🌡️ 城市热岛效应", desc: "温度分布热岛强度" },
  { href: "/noise-pollution", label: "🔊 噪声污染地图", desc: "分贝分布污染等级" },
];

const TOURISM_TOOLS = [
  { href: "/tourist-resource", label: "🗺️ 文旅资源地图", desc: "景点美食文化一网打尽" },
  { href: "/intangible-heritage", label: "🎭 非遗文化分布", desc: "非遗项目传承人" },
  { href: "/smart-tourism", label: "🧭 智慧旅游路线", desc: "最优路线时间预算" },
];

const NATURAL_RESOURCE_TOOLS = [
  { href: "/mineral-resource", label: "⛏️ 矿产资源分布", desc: "矿山储量类型全景" },
  { href: "/land-use-resource", label: "🗺️ 土地利用现状", desc: "用地斑块分类统计" },
  { href: "/water-resource", label: "💧 水资源分布", desc: "河流湖泊水库水系" },
  { href: "/forest-resource", label: "🌳 林业资源", desc: "森林覆盖率林地" },
  { href: "/marine-resource", label: "🌊 海洋资源", desc: "海岸线海岛滩涂" },
];

const INDUSTRY_ECON_TOOLS = [
  { href: "/industry-park", label: "🏭 产业园区分布", desc: "园区级别产业定位" },
  { href: "/economic-data", label: "📊 经济数据图谱", desc: "省域GDP人口财政" },
  { href: "/investment", label: "💰 招商投资地图", desc: "重点项目优惠政策" },
  { href: "/industry-chain", label: "📈 产业链图谱", desc: "产业链上下游关系" },
];

export default function Header({ user }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [gisMenuOpen, setGisMenuOpen] = useState(false);
  const [planningMenuOpen, setPlanningMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const router = useRouter();
  const supabaseConfigured = isSupabaseConfigured();
  const supabase = supabaseConfigured ? createClient() : null;

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
      <div className="flex items-center justify-between p-4">
        {/* Logo + 导航 */}
        <div className="pointer-events-auto flex items-center gap-2">
          <a href="/" className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-4 py-2.5 hover:bg-white transition">
            <h1 className="text-lg font-bold text-gray-900">
              Wadez<span className="text-blue-600">.asia</span>
            </h1>
            <p className="text-[10px] text-gray-400 -mt-0.5">公共交通地图</p>
          </a>
          <a
            href="/routes"
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-white hover:text-blue-600 transition hidden sm:block"
          >
            🚄 城际线路
          </a>

          {/* GIS 探索下拉菜单 */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setGisMenuOpen(!gisMenuOpen)}
              onBlur={() => setTimeout(() => setGisMenuOpen(false), 150)}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-white hover:text-blue-600 transition flex items-center gap-1"
            >
              🗺️ GIS探索
              <svg
                className={`w-3 h-3 transition-transform ${gisMenuOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {gisMenuOpen && (
              <div className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50">
                <a
                  href="/gis"
                  className="block px-3 py-2 hover:bg-gray-50 transition border-b border-gray-100 mb-1 pb-2"
                >
                  <div className="text-xs font-semibold text-blue-600">
                    🔍 GIS 工具总览
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    全部 7 个空间分析工具
                  </div>
                </a>
                {GIS_TOOLS.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="block px-3 py-2 hover:bg-gray-50 transition"
                  >
                    <div className="text-xs font-medium text-gray-800">
                      {tool.label}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      {tool.desc}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* 城市规划下拉菜单 */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setPlanningMenuOpen(!planningMenuOpen)}
              onBlur={() => setTimeout(() => setPlanningMenuOpen(false), 150)}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-white hover:text-blue-600 transition flex items-center gap-1"
            >
              🏗️ 城市规划
              <svg
                className={`w-3 h-3 transition-transform ${planningMenuOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {planningMenuOpen && (
              <div className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50">
                <a
                  href="/planning"
                  className="block px-3 py-2 hover:bg-gray-50 transition border-b border-gray-100 mb-1 pb-2"
                >
                  <div className="text-xs font-semibold text-amber-600">
                    📐 规划工具总览
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    全部 6 个规划分析工具
                  </div>
                </a>
                {PLANNING_TOOLS.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="block px-3 py-2 hover:bg-gray-50 transition"
                  >
                    <div className="text-xs font-medium text-gray-800">
                      {tool.label}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      {tool.desc}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* 更多下拉菜单 */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              onBlur={() => setTimeout(() => setMoreMenuOpen(false), 150)}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-white hover:text-blue-600 transition flex items-center gap-1"
            >
              ⚡ 更多
              <svg
                className={`w-3 h-3 transition-transform ${moreMenuOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {moreMenuOpen && (
              <div className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50">
                {/* 商业选址 */}
                <div className="px-3 py-1.5 text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                  🏪 商业选址
                </div>
                {BUSINESS_TOOLS.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="block px-3 py-2 hover:bg-gray-50 transition"
                  >
                    <div className="text-xs font-medium text-gray-800">
                      {tool.label}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      {tool.desc}
                    </div>
                  </a>
                ))}
                <div className="border-t border-gray-100 my-1" />
                {/* 气象环境 */}
                <div className="px-3 py-1.5 text-[10px] font-bold text-cyan-600 uppercase tracking-wider">
                  🌤️ 气象环境
                </div>
                {ENV_TOOLS.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="block px-3 py-2 hover:bg-gray-50 transition"
                  >
                    <div className="text-xs font-medium text-gray-800">
                      {tool.label}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      {tool.desc}
                    </div>
                  </a>
                ))}
                <div className="border-t border-gray-100 my-1" />
                {/* 文旅资源 */}
                <div className="px-3 py-1.5 text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                  🎫 文旅资源
                </div>
                {TOURISM_TOOLS.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="block px-3 py-2 hover:bg-gray-50 transition"
                  >
                    <div className="text-xs font-medium text-gray-800">
                      {tool.label}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      {tool.desc}
                    </div>
                  </a>
                ))}
                <div className="border-t border-gray-100 my-1" />
                {/* 自然资源 */}
                <div className="px-3 py-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                  🌿 自然资源
                </div>
                {NATURAL_RESOURCE_TOOLS.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="block px-3 py-2 hover:bg-gray-50 transition"
                  >
                    <div className="text-xs font-medium text-gray-800">
                      {tool.label}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      {tool.desc}
                    </div>
                  </a>
                ))}
                <div className="border-t border-gray-100 my-1" />
                {/* 产业经济 */}
                <div className="px-3 py-1.5 text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                  📈 产业经济
                </div>
                {INDUSTRY_ECON_TOOLS.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="block px-3 py-2 hover:bg-gray-50 transition"
                  >
                    <div className="text-xs font-medium text-gray-800">
                      {tool.label}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      {tool.desc}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 用户操作 */}
        <div className="pointer-events-auto">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 hover:bg-white transition"
              >
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {user.email[0].toUpperCase()}
                </div>
                <span className="text-sm text-gray-700 hidden sm:block">
                  {user.email}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    退出登录
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
