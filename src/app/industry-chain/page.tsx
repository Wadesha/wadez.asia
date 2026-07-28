"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  getChains,
  getCities,
  CHAIN_LEVEL_LABELS,
  CHAIN_LEVEL_COLORS,
  type IndustryChain,
  type ChainNode,
  type ChainLevel,
} from "@/lib/industry-chain-data";

export default function IndustryChainPage() {
  const chains = getChains();
  const cities = getCities();
  const [city, setCity] = useState(cities[0] || "");
  const [selectedChain, setSelectedChain] = useState<IndustryChain | null>(null);

  const filteredChains = useMemo(
    () => chains.filter((c) => c.city === city),
    [chains, city]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Link href="/industry-park" className="text-xs text-gray-400 hover:text-gray-600 transition">← 产业园区</Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">🔗 产业链图谱</h1>
                <p className="text-[10px] text-gray-500 mt-0.5">产业链上下游关系 · 节点企业 · 配套服务 · 产业集群</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select value={city} onChange={(e) => { setCity(e.target.value); setSelectedChain(null); }} className="px-2 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700">
                {cities.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>产业链：<b className="text-gray-800">{filteredChains.length}</b></span>
            <span className="ml-auto text-gray-400">v1.0.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-xs font-semibold text-gray-800 mb-2.5">产业链列表</h3>
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
                {filteredChains.map((chain) => (
                  <button key={chain.id} onClick={() => setSelectedChain(chain)} className={`w-full text-left px-3 py-2.5 rounded-lg transition ${selectedChain?.id === chain.id ? "bg-gray-100 border border-gray-300" : "hover:bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-medium text-gray-800">{chain.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500">
                      <span>产值{chain.总产值}亿</span>
                      <span>企业{chain.enterpriseCount}家</span>
                      <span className="text-green-600">评分{chain.clusterScore}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedChain ? (
              <div className="space-y-3">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">{selectedChain.name}</h2>
                      <p className="text-[10px] text-gray-500 mt-0.5">{selectedChain.city}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedChain.clusterScore}</div>
                      <div className="text-[9px] text-gray-500">集群评分</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">总产值</div>
                      <div className="text-sm font-bold text-gray-800">{selectedChain.总产值}<span className="text-[9px] ml-1">亿元</span></div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">企业数量</div>
                      <div className="text-sm font-bold text-gray-800">{selectedChain.enterpriseCount}<span className="text-[9px] ml-1">家</span></div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <div className="text-[9px] text-gray-400">节点数</div>
                      <div className="text-sm font-bold text-gray-800">{selectedChain.nodes.length}<span className="text-[9px] ml-1">个</span></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-gray-800 mb-3">产业链图谱</h3>
                  <div className="flex items-center justify-between gap-4">
                    {selectedChain.nodes.map((node, i) => (
                      <div key={node.id} className="flex-1">
                        <div className="rounded-xl p-4" style={{ backgroundColor: CHAIN_LEVEL_COLORS[node.level] + "20", borderLeft: `4px solid ${CHAIN_LEVEL_COLORS[node.level]}` }}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold" style={{ color: CHAIN_LEVEL_COLORS[node.level] }}>{CHAIN_LEVEL_LABELS[node.level]}</span>
                          </div>
                          <div className="text-[11px] font-bold text-gray-800 mb-2">{node.name}</div>
                          <div className="text-[9px] text-gray-500 mb-2">企业：{node.companies.length}家</div>
                          <div className="text-[9px] text-gray-500">产值：{node.output}亿</div>
                          <div className={`text-[9px] ${node.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                            增长：{node.growth > 0 ? "+" : ""}{node.growth}%
                          </div>
                        </div>
                        {i < selectedChain.nodes.length - 1 && (
                          <div className="flex justify-center my-2">
                            <span className="text-gray-400">→</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-gray-800 mb-3">节点企业</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedChain.nodes.map((node) => (
                      <div key={node.id}>
                        <div className="text-[10px] font-medium mb-1" style={{ color: CHAIN_LEVEL_COLORS[node.level] }}>{CHAIN_LEVEL_LABELS[node.level]}</div>
                        <div className="space-y-1">
                          {node.companies.map((company, i) => (
                            <div key={i} className="text-[10px] text-gray-600 bg-gray-50 rounded px-2 py-1">{company}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8 flex items-center justify-center h-96">
                <div className="text-center text-gray-400"><div className="text-4xl mb-2">🔗</div><p className="text-xs">请从左侧选择产业链查看详情</p></div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">产业链图谱 — 梳理产业脉络，优化资源配置</div>
      </div>
    </div>
  );
}