"use client";

import Link from "next/link";

const GIS_TOOLS = [
  {
    href: "/pois",
    icon: "📍",
    title: "POI 兴趣点",
    slogan: "城市兴趣点分类探索",
    desc: "按类别浏览城市兴趣点，支持自定义添加与管理",
    tags: ["分类探索", "自定义POI", "图片上传"],
    color: "from-blue-500 to-cyan-400",
  },
  {
    href: "/areas",
    icon: "🏘️",
    title: "区域开放性探索",
    slogan: "开放 vs 封闭空间形态",
    desc: "面状区域与线性空间的开放性/封闭性分析，含出入口标记",
    tags: ["多边形区域", "线性空间", "出入口分析"],
    color: "from-emerald-500 to-teal-400",
  },
  {
    href: "/poi-heat",
    icon: "🔥",
    title: "POI 热力分布",
    slogan: "密度 = 活力的直观表达",
    desc: "8大类POI热力图可视化，支持多城市对比与网格聚合",
    tags: ["热力图", "网格聚合", "双城市对比"],
    color: "from-orange-500 to-red-400",
  },
  {
    href: "/building-morphology",
    icon: "🏙️",
    title: "建筑形态图谱",
    slogan: "高度与密度的城市性格",
    desc: "伪3D建筑可视化，按高度/功能/年代配色，区域对比分析",
    tags: ["伪3D", "建筑密度", "容积率"],
    color: "from-purple-500 to-pink-400",
  },
  {
    href: "/street-syntax",
    icon: "🕸️",
    title: "街道网络句法",
    slogan: "图论指标解码城市结构",
    desc: "中介度、接近度、整合度等空间句法指标，多种路网形态对比",
    tags: ["空间句法", "图论", "路网形态"],
    color: "from-indigo-500 to-blue-400",
  },
  {
    href: "/accessibility",
    icon: "🚶",
    title: "可达性分析器",
    slogan: "15分钟生活圈评估",
    desc: "步行等时圈可视化，8类设施覆盖度评分，点击任意位置分析",
    tags: ["等时圈", "15分钟圈", "覆盖度"],
    color: "from-green-500 to-emerald-400",
  },
  {
    href: "/greenway",
    icon: "🌿",
    title: "绿道慢行系统",
    slogan: "线性空间的连通质量",
    desc: "绿道网络连通度分析，断点识别，α/β/γ 网络结构指数",
    tags: ["绿道网络", "连通度", "断点分析"],
    color: "from-lime-500 to-green-400",
  },
];

export default function GISExplorerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
            <span className="text-xs text-gray-400">GIS 空间分析工具箱</span>
            <span className="text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
              v1.0 · 7 个工具
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            城市空间探索
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            从兴趣点热力到街道句法，从建筑形态到慢行网络 —
            用 GIS 的视角重新理解城市
          </p>
        </div>

        {/* 工具卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {GIS_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* 背景渐变光晕 */}
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
              />

              <div className="relative">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  {tool.slogan}
                </p>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  {tool.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 右下角箭头 */}
              <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-white/15 group-hover:text-white group-hover:translate-x-1 transition-all">
                →
              </div>
            </Link>
          ))}
        </div>

        {/* 底部说明 */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 rounded-xl border border-white/10">
            <div className="text-center">
              <div className="text-lg font-bold text-white">7</div>
              <div className="text-[10px] text-gray-500">分析工具</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-lg font-bold text-white">v1.0</div>
              <div className="text-[10px] text-gray-500">模拟数据版</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-lg font-bold text-white">5000+</div>
              <div className="text-[10px] text-gray-500">模拟POI</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-lg font-bold text-white">460+</div>
              <div className="text-[10px] text-gray-500">模拟建筑</div>
            </div>
          </div>
          <p className="text-[11px] text-gray-600 mt-4">
            当前版本使用模拟数据演示，后续将逐步接入高德 API、OSM 真实数据与政府开放数据
          </p>
        </div>
      </div>
    </div>
  );
}
