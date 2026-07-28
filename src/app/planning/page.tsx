"use client";

import Link from "next/link";

const PLANNING_TOOLS = [
  {
    href: "/land-use",
    icon: "🏗️",
    title: "用地性质图谱",
    slogan: "土地是城市的第一语言",
    desc: "8大类用地分类可视化，用地结构饼图，容积率/建筑密度分析",
    tags: ["用地分类", "用地结构", "开发强度"],
    color: "from-amber-500 to-orange-400",
    status: "已上线",
  },
  {
    href: "/development-intensity",
    icon: "🏢",
    title: "开发强度分析",
    slogan: "容积率=城市密度的基因",
    desc: "容积率、建筑密度、建筑高度三维评估，强度分布直方图",
    tags: ["容积率", "建筑密度", "高度控制"],
    color: "from-rose-500 to-pink-400",
    status: "已上线",
  },
  {
    href: "/population-density",
    icon: "👥",
    title: "人口密度分布",
    slogan: "人在哪里，城市就在哪里",
    desc: "人口密度热力图，年龄结构金字塔，人口分布排行",
    tags: ["人口热力", "年龄结构", "分布格局"],
    color: "from-cyan-500 to-blue-400",
    status: "已上线",
  },
  {
    href: "#",
    icon: "🏥",
    title: "公共服务设施",
    slogan: "15分钟生活圈的质量",
    desc: "教育、医疗、文体、养老设施覆盖率与可达性分析",
    tags: ["公服设施", "覆盖率", "服务半径"],
    color: "from-teal-500 to-emerald-400",
    status: "即将上线",
  },
  {
    href: "#",
    icon: "🌆",
    title: "城市天际线",
    slogan: "高度控制塑造城市轮廓",
    desc: "天际线剖面分析，视线通廊，高度控制分区",
    tags: ["天际线", "高度控制", "视线通廊"],
    color: "from-violet-500 to-purple-400",
    status: "即将上线",
  },
  {
    href: "#",
    icon: "🚗",
    title: "交通承载力",
    slogan: "路网能否支撑城市生长",
    desc: "路网密度分析，拥堵热力，停车供需评估",
    tags: ["路网密度", "拥堵分析", "停车供需"],
    color: "from-slate-500 to-gray-400",
    status: "即将上线",
  },
];

export default function PlanningExplorerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* 顶部返回 */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
          >
            ← 返回首页
          </Link>
        </div>

        {/* 标题区 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 mb-4">
            <span className="text-xs text-amber-400">URBAN PLANNING TOOLKIT</span>
            <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full">
              v1.2 · 3/6 已上线
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            城市规划工具箱
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            从用地性质到开发强度，从人口分布到交通承载 —
            面向规划师、研究者和学生的专业分析工具集
          </p>
        </div>

        {/* 工具卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PLANNING_TOOLS.map((tool) => {
            const isSoon = tool.status === "即将上线";
            return (
              <div
                key={tool.title}
                className={`relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 overflow-hidden ${
                  isSoon ? "opacity-70" : "hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                }`}
              >
                {/* 背景渐变光晕 */}
                <div
                  className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${tool.color} opacity-0 ${
                    isSoon ? "" : "group-hover:opacity-20"
                  } blur-2xl transition-opacity duration-500`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{tool.icon}</div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        tool.status === "已上线"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {tool.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-amber-400/80 mb-3">
                    {tool.slogan}
                  </p>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    {tool.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {!isSoon ? (
                    <Link
                      href={tool.href}
                      className="inline-flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 transition"
                    >
                      立即体验 →
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-500">
                      敬请期待...
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 数据统计 */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 rounded-xl border border-white/10">
            <div className="text-center">
              <div className="text-lg font-bold text-white">6</div>
              <div className="text-[10px] text-gray-500">规划工具</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">3</div>
              <div className="text-[10px] text-gray-500">已上线</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-lg font-bold text-amber-400">3</div>
              <div className="text-[10px] text-gray-500">开发中</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-lg font-bold text-white">8</div>
              <div className="text-[10px] text-gray-500">用地类型</div>
            </div>
          </div>
          <p className="text-[11px] text-gray-600 mt-4">
            当前版本使用模拟数据演示，后续将逐步接入国土调查数据、规划公示数据与普查数据
          </p>
        </div>

        {/* 返回 GIS 工具箱 */}
        <div className="mt-12 text-center">
          <Link
            href="/gis"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition"
          >
            ← 查看 GIS 空间分析工具箱
          </Link>
        </div>
      </div>
    </div>
  );
}
