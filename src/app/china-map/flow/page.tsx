"use client";

import React, { useState } from "react";
import FlowMap from "@/components/FlowMap";
import { FLOW_TYPES, getFlowsByType, type FlowItem } from "@/lib/china-flow-data";

export default function FlowPage() {
  const [type, setType] = useState<FlowItem["type"] | "all">("all");

  const flows = getFlowsByType(type);

  const typeLabels: Array<{ k: FlowItem["type"] | "all"; l: string }> = [
    { k: "all", l: "全部" },
    ...FLOW_TYPES.map((t) => ({ k: t.type, l: t.label })),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/china-map" className="text-xs text-gray-400 hover:text-gray-700">全国地图</a>
          <span className="text-gray-300">/</span>
          <h1 className="text-sm font-bold text-gray-900">流向地图</h1>
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">示例数据</span>
        </div>
        <div className="flex items-center gap-1">
          {typeLabels.map((b) => (
            <button
              key={b.k}
              onClick={() => setType(b.k)}
              className={[
                "px-2 py-1 text-[10px] rounded",
                type === b.k ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100 border border-gray-200",
              ].join(" ")}
            >
              {b.l}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3">
        <FlowMap
          flows={flows}
          title={`全国流向地图（${typeLabels.find((t) => t.k === type)?.l}）`}
          height={600}
          animated
        />

        {/* 流向统计 */}
        <div className="mt-3 grid grid-cols-4 gap-2">
          {FLOW_TYPES.map((t) => {
            const list = getFlowsByType(t.type);
            const total = list.reduce((s, f) => s + f.value, 0);
            return (
              <div key={t.type} className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                <div className="text-[10px] text-gray-400 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-sm" style={{ background: t.color }} />
                  {t.label}
                </div>
                <div className="text-sm font-semibold text-gray-800">{total.toLocaleString()}</div>
                <div className="text-[9px] text-gray-400">{list.length} 条流向</div>
              </div>
            );
          })}
        </div>

        {/* 流向列表 */}
        <div className="mt-3 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-3 py-1.5 border-b border-gray-100 text-xs font-semibold text-gray-700">
            流向详情
            <span className="ml-2 text-[10px] font-normal text-gray-400">示例数据</span>
          </div>
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full text-[11px]">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="text-left py-1 px-2 text-gray-500 font-medium">起点</th>
                  <th className="text-left py-1 px-2 text-gray-500 font-medium">终点</th>
                  <th className="text-left py-1 px-2 text-gray-500 font-medium">类型</th>
                  <th className="text-right py-1 px-2 text-gray-500 font-medium">流量</th>
                  <th className="text-left py-1 px-2 text-gray-500 font-medium">说明</th>
                </tr>
              </thead>
              <tbody>
                {flows.map((f, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-1 px-2 text-gray-700">{f.fromName}</td>
                    <td className="py-1 px-2 text-gray-700">{f.toName}</td>
                    <td className="py-1 px-2 text-gray-500">{FLOW_TYPES.find((t) => t.type === f.type)?.label}</td>
                    <td className="py-1 px-2 text-right text-gray-700 tabular-nums">{f.value.toLocaleString()}</td>
                    <td className="py-1 px-2 text-gray-400">{f.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
