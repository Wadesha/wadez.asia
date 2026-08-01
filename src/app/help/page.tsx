"use client";

import { useState } from "react";
import Link from "next/link";

type Category = "all" | "features" | "data" | "shortcuts";

interface FaqItem {
  category: Exclude<Category, "all">;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    category: "features",
    question: "Wadez.asia 是什么？",
    answer:
      "Wadez.asia 是一套面向城市研究者、规划师、学生和爱好者的空间分析与可视化工具箱，覆盖 GIS 分析、城市规划、商业选址、气象环境、文旅资源、自然资源、产业经济七大领域。",
  },
  {
    category: "features",
    question: "需要注册或付费吗？",
    answer: "全部工具免费开放，无需注册即可使用核心功能。",
  },
  {
    category: "features",
    question: "支持哪些城市？",
    answer:
      "目前支持北京、上海、广州、深圳、杭州、成都、武汉、南京、天津、西安、重庆、长沙、苏州、青岛、济南等 15+ 城市，后续会持续扩展。",
  },
  {
    category: "features",
    question: "如何在不同工具之间切换？",
    answer:
      "顶部导航栏提供 GIS 探索、城市规划、更多（商业/环境/文旅/自然资源/产业经济）五个下拉菜单，也可通过首页工具卡片直接进入。",
  },
  {
    category: "data",
    question: "当前使用的是什么数据？",
    answer:
      "目前主要使用模拟数据进行功能演示，部分工具已接入高德 API 真实数据。v2.5 起将逐步接入 OSM 开源几何数据，v3.0 接入政府开放统计数据。",
  },
  {
    category: "data",
    question: "如何切换数据源？",
    answer:
      "在支持真实数据的工具页面右上角，点击「数据源切换」按钮即可在模拟数据与真实数据之间切换。",
  },
  {
    category: "data",
    question: "数据更新频率如何？",
    answer: "模拟数据实时生成；高德 API 数据按需拉取；OSM 与政府开放数据将按季度更新。",
  },
  {
    category: "shortcuts",
    question: "有哪些全局快捷键？",
    answer:
      "按 / 聚焦搜索，按 ? 显示快捷键帮助面板，按 Esc 关闭弹窗。在 GIS 工具页按 G 可快速跳转。",
  },
  {
    category: "shortcuts",
    question: "快捷键在输入框中会触发吗？",
    answer: "不会。当焦点位于输入框、文本域或可编辑区域时，快捷键会自动屏蔽，避免干扰正常输入。",
  },
];

const SHORTCUTS = [
  { key: "/", action: "聚焦搜索", scope: "全局" },
  { key: "?", action: "显示/隐藏快捷键帮助", scope: "全局" },
  { key: "Esc", action: "关闭弹窗或面板", scope: "全局" },
  { key: "G", action: "跳转至 GIS 工具箱", scope: "全局" },
  { key: "H", action: "返回首页", scope: "全局" },
];

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "features", label: "功能" },
  { key: "data", label: "数据" },
  { key: "shortcuts", label: "快捷键" },
];

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs =
    activeCategory === "all"
      ? FAQS
      : FAQS.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-gray-950/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-white">
            Wadez<span className="text-gray-500">.asia</span>
          </Link>
          <span className="text-xs text-gray-500">帮助中心</span>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6 max-w-3xl mx-auto">
        {/* 标题 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">帮助中心</h1>
          <p className="text-sm text-gray-400">
            常见问题、数据来源与快捷键说明
          </p>
        </div>

        {/* 分类导航 */}
        <div className="flex gap-2 mb-6 overflow-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setOpenIndex(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                activeCategory === cat.key
                  ? "bg-white text-gray-900"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ 列表 */}
        <div className="space-y-2 mb-12">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/[0.03] border border-white/5 rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/[0.03] transition"
              >
                <span className="text-sm font-medium text-gray-200 pr-4">
                  {faq.question}
                </span>
                <span
                  className={`text-xs text-gray-500 transition-transform shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-3 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
          {filteredFaqs.length === 0 && (
            <p className="text-sm text-gray-500 py-8 text-center">
              该分类下暂无内容
            </p>
          )}
        </div>

        {/* 快捷键速查表 */}
        <div className="mb-12">
          <h2 className="text-base font-semibold mb-4">快捷键速查</h2>
          <div className="bg-white/[0.03] border border-white/5 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-4 py-2.5 text-[10px] font-medium text-gray-500 uppercase tracking-wider w-24">
                    快捷键
                  </th>
                  <th className="px-4 py-2.5 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    功能
                  </th>
                  <th className="px-4 py-2.5 text-[10px] font-medium text-gray-500 uppercase tracking-wider w-16 text-right">
                    范围
                  </th>
                </tr>
              </thead>
              <tbody>
                {SHORTCUTS.map((s, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="px-4 py-2.5">
                      <kbd className="inline-block min-w-[1.5rem] px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-[11px] font-mono text-gray-300 text-center">
                        {s.key}
                      </kbd>
                    </td>
                    <td className="px-4 py-2.5 text-sm text-gray-300">
                      {s.action}
                    </td>
                    <td className="px-4 py-2.5 text-right text-xs text-gray-500">
                      {s.scope}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 数据来源说明 */}
        <div>
          <h2 className="text-base font-semibold mb-4">数据来源</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                layer: "L1",
                name: "模拟数据",
                desc: "参数化生成，快速演示",
                color: "bg-gray-500",
              },
              {
                layer: "L2",
                name: "高德 API",
                desc: "POI / 路径 / 地理编码",
                color: "bg-gray-400",
              },
              {
                layer: "L3",
                name: "OSM 开源",
                desc: "建筑 / 路网 / 绿道几何",
                color: "bg-gray-400",
              },
              {
                layer: "L4",
                name: "政府开放",
                desc: "普查 / 规划 / 统计数据",
                color: "bg-gray-300",
              },
            ].map((d) => (
              <div
                key={d.layer}
                className="bg-white/[0.03] border border-white/5 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono text-gray-500">
                    {d.layer}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                </div>
                <div className="text-sm font-medium mb-1">{d.name}</div>
                <div className="text-xs text-gray-500">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-gray-300 transition"
          >
            返回首页
          </Link>
          <span className="text-[10px] text-gray-600">v2.2.20</span>
        </div>
      </footer>
    </div>
  );
}
