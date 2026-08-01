"use client";

import Link from "next/link";
import OnboardingGuide from "@/components/OnboardingGuide";

const GIS_TOOLS = [
  { href: "/pois", icon: "📍", title: "POI 兴趣点", desc: "城市兴趣点分类探索", color: "from-blue-500 to-cyan-400" },
  { href: "/areas", icon: "🏘️", title: "区域探索", desc: "开放/封闭空间形态", color: "from-emerald-500 to-teal-400" },
  { href: "/poi-heat", icon: "🔥", title: "POI 热力", desc: "密度=活力直观表达", color: "from-orange-500 to-red-400" },
  { href: "/building-morphology", icon: "🏙️", title: "建筑形态", desc: "高度与密度性格", color: "from-purple-500 to-pink-400" },
  { href: "/street-syntax", icon: "🕸️", title: "街道句法", desc: "图论解码城市结构", color: "from-indigo-500 to-blue-400" },
  { href: "/accessibility", icon: "🚶", title: "可达性分析", desc: "15分钟生活圈", color: "from-green-500 to-emerald-400" },
  { href: "/greenway", icon: "🌿", title: "绿道慢行", desc: "线性空间连通质量", color: "from-lime-500 to-green-400" },
];

const PLANNING_TOOLS = [
  { href: "/land-use", icon: "🏗️", title: "用地性质", desc: "土地利用分类", status: "已上线", color: "from-amber-500 to-orange-400" },
  { href: "/development-intensity", icon: "🏢", title: "开发强度", desc: "容积率密度分析", status: "已上线", color: "from-rose-500 to-pink-400" },
  { href: "/population-density", icon: "👥", title: "人口分布", desc: "人口热力格局", status: "已上线", color: "from-cyan-500 to-blue-400" },
  { href: "/public-service", icon: "🏥", title: "公服设施", desc: "教育医疗文体覆盖", status: "已上线", color: "from-teal-500 to-emerald-400" },
  { href: "/skyline", icon: "🌆", title: "城市天际线", desc: "高度控制形态", status: "已上线", color: "from-violet-500 to-purple-400" },
  { href: "/traffic-capacity", icon: "🚗", title: "交通承载", desc: "路网密度拥堵", status: "已上线", color: "from-slate-500 to-gray-400" },
];

const FEATURES = [
  {
    icon: "🗺️",
    title: "31+ 子网站矩阵",
    desc: "GIS分析 + 城市规划 + 商业选址 + 气象环境 + 文旅资源 + 自然资源 + 产业经济",
  },
  {
    icon: "📊",
    title: "多源数据融合",
    desc: "模拟数据 → 高德API → OSM → 政府开放数据，层层递进",
  },
  {
    icon: "🎨",
    title: "沉浸式可视化",
    desc: "热力图、伪3D、等时圈、网络分析，让空间数据一目了然",
  },
  {
    icon: "🔍",
    title: "交互式探索",
    desc: "点击、筛选、对比、联动，不是看报告而是亲自探索",
  },
];

const ROADMAP = [
  { version: "v1.0", title: "GIS工具箱", status: "已完成", desc: "7个GIS空间分析工具（模拟数据）" },
  { version: "v1.2", title: "城市规划工具箱", status: "已完成", desc: "6个城市规划分析工具（全部上线）" },
  { version: "v1.3", title: "多领域工具箱", status: "已完成", desc: "商业选址/气象环境/文旅资源/自然资源/产业经济（全部上线）" },
  { version: "v2.0", title: "功能补全迭代", status: "已完成", desc: "20个小版本：11个地图可视化+字段规范化+真实数据接入基础设施" },
  { version: "v2.1", title: "真实数据+产品化", status: "已完成", desc: "20个小版本：6个子网站真实数据接入+交互增强+导出/报告/对比仪表盘+缓存/导航" },
  { version: "v2.2", title: "跨站联动+智能分析", status: "已完成", desc: "20个小版本：全类别真实数据接入+跨站关联+异常检测/趋势预测+数据质量/帮助中心" },
  { version: "v2.3", title: "三模式地图引擎", status: "已完成", desc: "20个小版本：SVG示意图保底+OSM免费底图+高德底图，三模式可切换，零配置也能看" },
  { version: "v2.5", title: "OSM真实数据深化", status: "规划中", desc: "建筑/路网/绿道真实几何数据" },
  { version: "v3.0", title: "产品化", status: "规划中", desc: "全国城市+多源融合+分析报告" },
];

const BUSINESS_TOOLS = [
  { href: "/business-siting", icon: "📍", title: "商铺选址评估", desc: "六维综合评分找好铺", status: "已上线", color: "from-rose-500 to-pink-400" },
  { href: "/business-cluster", icon: "🏪", title: "商圈竞争力", desc: "知己知彼百战不殆", status: "已上线", color: "from-orange-500 to-red-400" },
  { href: "/passenger-flow", icon: "👥", title: "客流预测", desc: "人潮在哪里机会在哪", status: "已上线", color: "from-amber-500 to-orange-400" },
];

const ENV_TOOLS = [
  { href: "/air-quality", icon: "🌬️", title: "空气质量监测", desc: "实时空气品质分布", status: "已上线", color: "from-cyan-500 to-blue-400" },
  { href: "/heat-island", icon: "🌡️", title: "城市热岛效应", desc: "混凝土森林温度密码", status: "已上线", color: "from-sky-500 to-cyan-400" },
  { href: "/noise-pollution", icon: "🌊", title: "噪声污染地图", desc: "看不见的城市健康杀手", status: "已上线", color: "from-blue-500 to-indigo-400" },
];

const TOURISM_TOOLS = [
  { href: "/tourist-resource", icon: "🗺️", title: "文旅资源地图", desc: "景点美食文化一网打尽", status: "已上线", color: "from-amber-500 to-yellow-400" },
  { href: "/intangible-heritage", icon: "📊", title: "非遗文化分布", desc: "传承在空间中的活态文化", status: "已上线", color: "from-orange-500 to-amber-400" },
  { href: "/smart-tourism", icon: "🎫", title: "智慧旅游路线", desc: "最优路线玩透一座城", status: "已上线", color: "from-yellow-500 to-lime-400" },
];

const NATURAL_RESOURCE_TOOLS = [
  { href: "/mineral-resource", icon: "⛏️", title: "矿产资源分布", desc: "矿山储量类型全景", status: "已上线", color: "from-stone-500 to-amber-600" },
  { href: "/land-use-resource", icon: "🗺️", title: "土地利用现状", desc: "用地斑块分类统计", status: "已上线", color: "from-lime-600 to-green-500" },
  { href: "/water-resource", icon: "💧", title: "水资源分布", desc: "河流湖泊水库水系", status: "已上线", color: "from-blue-500 to-cyan-400" },
  { href: "/forest-resource", icon: "🌳", title: "林业资源", desc: "森林覆盖率林地", status: "已上线", color: "from-green-600 to-emerald-500" },
  { href: "/marine-resource", icon: "🌊", title: "海洋资源", desc: "海岸线海岛滩涂", status: "已上线", color: "from-cyan-600 to-blue-500" },
];

const INDUSTRY_ECON_TOOLS = [
  { href: "/industry-park", icon: "🏭", title: "产业园区分布", desc: "园区级别产业定位", status: "已上线", color: "from-indigo-500 to-purple-500" },
  { href: "/economic-data", icon: "📊", title: "经济数据图谱", desc: "省域GDP人口财政", status: "已上线", color: "from-blue-600 to-indigo-500" },
  { href: "/investment", icon: "💰", title: "招商投资地图", desc: "重点项目优惠政策", status: "已上线", color: "from-rose-500 to-orange-500" },
  { href: "/industry-chain", icon: "📈", title: "产业图谱", desc: "产业链上下游关系", status: "已上线", color: "from-violet-500 to-purple-600" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-sm font-bold">
              W
            </div>
            <div>
              <div className="text-sm font-bold">Wadez<span className="text-blue-400">.asia</span></div>
              <div className="text-[9px] text-gray-500 -mt-0.5">城市空间探索平台</div>
            </div>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <a href="#gis" className="text-gray-400 hover:text-white transition hidden md:block">GIS工具</a>
            <a href="#planning" className="text-gray-400 hover:text-white transition hidden md:block">城市规划</a>
            <a href="#roadmap" className="text-gray-400 hover:text-white transition hidden md:block">路线图</a>
            <Link
              href="/gis"
              className="px-4 py-1.5 bg-white/10 hover:bg-white/15 rounded-lg text-sm font-medium transition"
            >
              开始探索 →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* 背景光晕 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 left-10 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-400">v2.3 完成 三模式地图引擎 SVG示意图+OSM免费底图+高德底图</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            用 GIS 的视角
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              重新理解城市
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            从 POI 热力到街道句法，从建筑形态到慢行网络 —
            一套面向城市研究者、规划师、学生和爱好者的
            空间分析与可视化工具箱
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/gis"
              className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 rounded-xl font-medium text-white shadow-lg shadow-blue-500/25 transition"
            >
              立即体验 →
            </Link>
            <a
              href="#features"
              className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium text-gray-300 transition"
            >
              了解更多
            </a>
          </div>

          {/* 数据统计 */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { num: "31", label: "子网站" },
              { num: "11", label: "地图可视化" },
              { num: "5000+", label: "模拟POI" },
              { num: "460+", label: "模拟建筑" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.num}
                </div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* 数据源说明 */}
          <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[11px] text-amber-300/90">当前数据状态：模拟数据演示 · v2.5起接入OSM真实数据 · v3.0接入政府开放数据</span>
          </div>
        </div>
      </section>

      {/* 核心亮点 */}
      <section id="features" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs text-blue-400 mb-2">CORE FEATURES</div>
            <h2 className="text-3xl font-bold mb-3">为什么选择 Wadez</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              不是简单的地图展示，而是一套完整的城市空间分析方法论
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/10 transition group"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIS 工具箱 */}
      <section id="gis" className="py-20 px-6 border-t border-white/5 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs text-cyan-400 mb-2">GIS TOOLKIT</div>
              <h2 className="text-3xl font-bold mb-2">GIS 空间分析工具箱</h2>
              <p className="text-gray-400 text-sm">7 个已上线的空间分析工具，全部支持模拟数据演示</p>
            </div>
            <Link
              href="/gis"
              className="text-sm text-blue-400 hover:text-blue-300 transition hidden md:block"
            >
              查看全部 →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {GIS_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative bg-white/[0.03] border border-white/5 rounded-xl p-5 hover:bg-white/[0.06] hover:border-white/10 transition overflow-hidden"
              >
                <div
                  className={`absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity`}
                />
                <div className="text-2xl mb-3">{tool.icon}</div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-blue-400 transition">
                  {tool.title}
                </h3>
                <p className="text-xs text-gray-500">{tool.desc}</p>
                <div className="mt-4 text-[10px] text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  已上线
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 全国地图数据可视化 */}
      <section id="china-map" className="py-20 px-6 border-t border-white/5 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs text-amber-400 mb-2">CHINA ADMIN MAP</div>
              <h2 className="text-3xl font-bold mb-2">全国行政区划数据可视化</h2>
              <p className="text-gray-400 text-sm">34省 / 150+地级市 / 200+县区，10+ 专题子站，零依赖 SVG 地图</p>
            </div>
            <Link
              href="/china-map"
              className="text-sm text-amber-400 hover:text-amber-300 transition hidden md:block"
            >
              进入全国地图 →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {[
              { href: "/china-map", label: "省级色块图", desc: "34省多维指标" },
              { href: "/china-map/timeline", label: "时间序列动画", desc: "2010-2024逐年变化" },
              { href: "/china-map/flow", label: "流向地图", desc: "人口/贸易/物流" },
              { href: "/china-map/radar", label: "雷达对比", desc: "多省多维对比" },
              { href: "/china-map/table", label: "数据表格", desc: "省/市/县三级" },
              { href: "/china-map/population", label: "人口分布", desc: "密度/总量/气泡" },
              { href: "/china-map/economy", label: "经济对比", desc: "GDP/人均/产业" },
              { href: "/china-map/industry", label: "行业分布", desc: "33+产业园区" },
              { href: "/china-map/transport", label: "交通网络", desc: "高铁/机场/港口" },
              { href: "/china-map/urbanization", label: "城镇化", desc: "城镇化率对比" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white/[0.03] border border-white/5 rounded-xl p-4 hover:bg-white/[0.06] hover:border-white/10 transition"
              >
                <h3 className="font-semibold text-sm mb-1 group-hover:text-amber-400 transition">{tool.label}</h3>
                <p className="text-[10px] text-gray-500">{tool.desc}</p>
              </Link>
            ))}
          </div>

          <Link
            href="/china-map"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-full text-sm transition"
          >
            进入全国地图 →
          </Link>
        </div>
      </section>

      {/* 城市规划工具箱 */}
      <section id="planning" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs text-amber-400 mb-2">URBAN PLANNING</div>
              <h2 className="text-3xl font-bold mb-2">城市规划工具箱</h2>
              <p className="text-gray-400 text-sm">6 个规划专业分析工具，全部上线</p>
            </div>
            <span className="text-xs px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
              6/6 已上线
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PLANNING_TOOLS.map((tool) => {
              const isLive = tool.status === "已上线";
              if (!isLive) {
                return (
                  <div
                    key={tool.title}
                    className="relative bg-white/[0.02] border border-white/5 rounded-xl p-5 opacity-70"
                  >
                    <div className="absolute top-4 right-4 text-[10px] px-2 py-0.5 bg-white/5 text-gray-400 rounded-full">
                      {tool.status}
                    </div>
                    <div className="text-2xl mb-3 grayscale">{tool.icon}</div>
                    <h3 className="font-semibold text-sm mb-1">{tool.title}</h3>
                    <p className="text-xs text-gray-500">{tool.desc}</p>
                  </div>
                );
              }
              return (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="relative bg-white/[0.02] border border-white/5 rounded-xl p-5 transition group overflow-hidden hover:bg-white/[0.06] hover:border-white/10"
                >
                  <div
                    className={`absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity`}
                  />
                  <div className="absolute top-4 right-4 text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                    {tool.status}
                  </div>
                  <div className="text-2xl mb-3">{tool.icon}</div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-amber-400 transition">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-gray-500">{tool.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 商业选址工具箱 */}
      <section className="py-20 px-6 border-t border-white/5 bg-gradient-to-b from-transparent via-rose-500/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs text-rose-400 mb-2">BUSINESS SITING</div>
              <h2 className="text-3xl font-bold mb-2">商业选址工具箱</h2>
              <p className="text-gray-400 text-sm">数据驱动的选址决策，让每一分投入都有回报</p>
            </div>
            <span className="text-xs px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
              3/3 已上线
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUSINESS_TOOLS.map((tool) => {
              const isLive = tool.status === "已上线";
              if (!isLive) {
                return (
                  <div
                    key={tool.title}
                    className="relative bg-white/[0.02] border border-white/5 rounded-xl p-5 opacity-70"
                  >
                    <div className="absolute top-4 right-4 text-[10px] px-2 py-0.5 bg-white/5 text-gray-400 rounded-full">
                      {tool.status}
                    </div>
                    <div className="text-2xl mb-3 grayscale">{tool.icon}</div>
                    <h3 className="font-semibold text-sm mb-1">{tool.title}</h3>
                    <p className="text-xs text-gray-500">{tool.desc}</p>
                  </div>
                );
              }
              return (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="relative bg-white/[0.02] border border-white/5 rounded-xl p-5 transition group overflow-hidden hover:bg-white/[0.06] hover:border-white/10"
                >
                  <div
                    className={`absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity`}
                  />
                  <div className="absolute top-4 right-4 text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                    {tool.status}
                  </div>
                  <div className="text-2xl mb-3">{tool.icon}</div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-rose-400 transition">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-gray-500">{tool.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 气象环境工具箱 */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs text-cyan-400 mb-2">ENVIRONMENT</div>
              <h2 className="text-3xl font-bold mb-2">气象环境工具箱</h2>
              <p className="text-gray-400 text-sm">空气、热岛、噪声，环境数据全维度可视化</p>
            </div>
            <span className="text-xs px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
              3/3 已上线
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENV_TOOLS.map((tool) => {
              const isLive = tool.status === "已上线";
              if (!isLive) {
                return (
                  <div
                    key={tool.title}
                    className="relative bg-white/[0.02] border border-white/5 rounded-xl p-5 opacity-70"
                  >
                    <div className="absolute top-4 right-4 text-[10px] px-2 py-0.5 bg-white/5 text-gray-400 rounded-full">
                      {tool.status}
                    </div>
                    <div className="text-2xl mb-3 grayscale">{tool.icon}</div>
                    <h3 className="font-semibold text-sm mb-1">{tool.title}</h3>
                    <p className="text-xs text-gray-500">{tool.desc}</p>
                  </div>
                );
              }
              return (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="relative bg-white/[0.02] border border-white/5 rounded-xl p-5 transition group overflow-hidden hover:bg-white/[0.06] hover:border-white/10"
                >
                  <div
                    className={`absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity`}
                  />
                  <div className="absolute top-4 right-4 text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                    {tool.status}
                  </div>
                  <div className="text-2xl mb-3">{tool.icon}</div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-cyan-400 transition">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-gray-500">{tool.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 文旅资源工具箱 */}
      <section className="py-20 px-6 border-t border-white/5 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs text-amber-400 mb-2">TOURISM</div>
              <h2 className="text-3xl font-bold mb-2">文旅资源工具箱</h2>
              <p className="text-gray-400 text-sm">发现城市之美，景点、非遗、智慧旅游一网打尽</p>
            </div>
            <span className="text-xs px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
              3/3 已上线
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOURISM_TOOLS.map((tool) => {
              const isLive = tool.status === "已上线";
              if (!isLive) {
                return (
                  <div
                    key={tool.title}
                    className="relative bg-white/[0.02] border border-white/5 rounded-xl p-5 opacity-70"
                  >
                    <div className="absolute top-4 right-4 text-[10px] px-2 py-0.5 bg-white/5 text-gray-400 rounded-full">
                      {tool.status}
                    </div>
                    <div className="text-2xl mb-3 grayscale">{tool.icon}</div>
                    <h3 className="font-semibold text-sm mb-1">{tool.title}</h3>
                    <p className="text-xs text-gray-500">{tool.desc}</p>
                  </div>
                );
              }
              return (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="relative bg-white/[0.02] border border-white/5 rounded-xl p-5 transition group overflow-hidden hover:bg-white/[0.06] hover:border-white/10"
                >
                  <div
                    className={`absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity`}
                  />
                  <div className="absolute top-4 right-4 text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                    {tool.status}
                  </div>
                  <div className="text-2xl mb-3">{tool.icon}</div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-amber-400 transition">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-gray-500">{tool.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 自然资源工具箱 */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs text-emerald-400 mb-2">NATURAL RESOURCES</div>
              <h2 className="text-3xl font-bold mb-2">自然资源工具箱</h2>
              <p className="text-gray-400 text-sm">矿产、土地、水、林、海，自然资源全景数据</p>
            </div>
            <span className="text-xs px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
              5/5 已上线
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {NATURAL_RESOURCE_TOOLS.map((tool) => {
              const isLive = tool.status === "已上线";
              if (!isLive) {
                return (
                  <div
                    key={tool.title}
                    className="relative bg-white/[0.02] border border-white/5 rounded-xl p-5 opacity-70"
                  >
                    <div className="absolute top-4 right-4 text-[10px] px-2 py-0.5 bg-white/5 text-gray-400 rounded-full">
                      {tool.status}
                    </div>
                    <div className="text-2xl mb-3 grayscale">{tool.icon}</div>
                    <h3 className="font-semibold text-sm mb-1">{tool.title}</h3>
                    <p className="text-xs text-gray-500">{tool.desc}</p>
                  </div>
                );
              }
              return (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="relative bg-white/[0.02] border border-white/5 rounded-xl p-5 transition group overflow-hidden hover:bg-white/[0.06] hover:border-white/10"
                >
                  <div
                    className={`absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity`}
                  />
                  <div className="absolute top-4 right-4 text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                    {tool.status}
                  </div>
                  <div className="text-2xl mb-3">{tool.icon}</div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-emerald-400 transition">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-gray-500">{tool.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 产业经济工具箱 */}
      <section className="py-20 px-6 border-t border-white/5 bg-gradient-to-b from-transparent via-indigo-500/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs text-indigo-400 mb-2">INDUSTRY & ECONOMY</div>
              <h2 className="text-3xl font-bold mb-2">产业经济工具箱</h2>
              <p className="text-gray-400 text-sm">园区、经济、招商、产业链，产业发展数据洞察</p>
            </div>
            <span className="text-xs px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
              4/4 已上线
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INDUSTRY_ECON_TOOLS.map((tool) => {
              const isLive = tool.status === "已上线";
              if (!isLive) {
                return (
                  <div
                    key={tool.title}
                    className="relative bg-white/[0.02] border border-white/5 rounded-xl p-5 opacity-70"
                  >
                    <div className="absolute top-4 right-4 text-[10px] px-2 py-0.5 bg-white/5 text-gray-400 rounded-full">
                      {tool.status}
                    </div>
                    <div className="text-2xl mb-3 grayscale">{tool.icon}</div>
                    <h3 className="font-semibold text-sm mb-1">{tool.title}</h3>
                    <p className="text-xs text-gray-500">{tool.desc}</p>
                  </div>
                );
              }
              return (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="relative bg-white/[0.02] border border-white/5 rounded-xl p-5 transition group overflow-hidden hover:bg-white/[0.06] hover:border-white/10"
                >
                  <div
                    className={`absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity`}
                  />
                  <div className="absolute top-4 right-4 text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                    {tool.status}
                  </div>
                  <div className="text-2xl mb-3">{tool.icon}</div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-indigo-400 transition">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-gray-500">{tool.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 数据来源说明 */}
      <section className="py-20 px-6 border-t border-white/5 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs text-purple-400 mb-2">DATA STRATEGY</div>
          <h2 className="text-3xl font-bold mb-6">四层数据战略，层层递进</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { layer: "L1", name: "模拟数据", desc: "参数化生成，快速演示", color: "bg-gray-500" },
              { layer: "L2", name: "高德 API", desc: "POI/路径/地理编码", color: "bg-blue-500" },
              { layer: "L3", name: "OSM 开源", desc: "建筑/路网/绿道几何", color: "bg-emerald-500" },
              { layer: "L4", name: "政府开放", desc: "普查/规划/统计数据", color: "bg-amber-500" },
            ].map((d) => (
              <div key={d.layer} className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
                <div className={`inline-block px-2 py-0.5 ${d.color}/20 text-xs font-mono rounded mb-3`}>
                  <span className={`${d.color.replace("bg-", "text-")}`}>{d.layer}</span>
                </div>
                <div className="font-semibold text-sm mb-1">{d.name}</div>
                <div className="text-xs text-gray-500">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 路线图 */}
      <section id="roadmap" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs text-teal-400 mb-2">ROADMAP</div>
            <h2 className="text-3xl font-bold mb-3">产品路线图</h2>
            <p className="text-gray-400 text-sm">从工具箱到平台，持续进化</p>
          </div>

          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />

            <div className="space-y-6">
              {ROADMAP.map((item, i) => (
                <div key={item.version} className="relative pl-12">
                  {/* 节点 */}
                  <div
                    className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      item.status === "已完成"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : item.status === "进行中"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-white/5 text-gray-400 border border-white/10"
                    }`}
                  >
                    {item.status === "已完成" ? "✓" : i + 1}
                  </div>

                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm font-bold text-blue-400">{item.version}</span>
                      <span className="font-semibold">{item.title}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          item.status === "已完成"
                            ? "bg-green-500/10 text-green-400"
                            : item.status === "进行中"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-white/5 text-gray-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-12">
            <h2 className="text-3xl font-bold mb-3">开始探索你的城市</h2>
            <p className="text-gray-400 text-sm mb-8">
              全部工具免费开放，无需注册即可使用
            </p>
            <Link
              href="/gis"
              className="inline-block px-8 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 rounded-xl font-medium text-white shadow-lg shadow-blue-500/25 transition"
            >
              进入 GIS 工具箱 →
            </Link>
          </div>
        </div>
      </section>

      <OnboardingGuide />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xs font-bold">
              W
            </div>
            <span className="text-sm text-gray-500">Wadez.asia · 城市空间探索平台</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <Link href="/gis" className="hover:text-gray-300 transition">工具箱</Link>
            <a href="#roadmap" className="hover:text-gray-300 transition">路线图</a>
            <Link href="/versions" className="hover:text-gray-300 transition">版本历史</Link>
            <span className="text-gray-600">v2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
