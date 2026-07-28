"use client";

import { useState, useEffect, useMemo } from "react";
import { findCrossCityPlansAsync, getAvailableCities, type CrossCityPlan } from "@/lib/cross-city-bus";

interface BusLine {
  name: string;
  city: string;
  fromStation: string;
  toStation: string;
  stations: {
    up: string[];
    down: string[];
  };
  source: string;
  lastUpdate: string;
  quality: string;
}

interface CityMetadata {
  city: string;
  source: string;
  sourceUrl: string;
  lastUpdate: string;
  totalLines: number;
  totalStations: number;
  quality: string;
  format: string;
}

interface TransferPlan {
  id: string;
  lines: string[];
  transfers: number;
  stations: number;
  segments: {
    line: string;
    from: string;
    to: string;
    stationCount: number;
  }[];
}

export default function LinesPage() {
  const [lines, setLines] = useState<BusLine[]>([]);
  const [metadata, setMetadata] = useState<CityMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLine, setSelectedLine] = useState<BusLine | null>(null);
  const [activeTab, setActiveTab] = useState<"list" | "detail" | "transfer" | "crosscity">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"name" | "stations">("name");

  const [transferFrom, setTransferFrom] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [transferPlans, setTransferPlans] = useState<TransferPlan[]>([]);
  const [transferLoading, setTransferLoading] = useState(false);

  // 跨城公交
  const [crossFromCity, setCrossFromCity] = useState("北京");
  const [crossToCity, setCrossToCity] = useState("天津");
  const [crossPlans, setCrossPlans] = useState<CrossCityPlan[]>([]);
  const [crossLoading, setCrossLoading] = useState(false);
  const availableCities = getAvailableCities();

  // 全国城市数据统计
  const [nationalStats, setNationalStats] = useState<{ totalCities: number; totalLines: number; cities: Record<string, { lines: number; points: number }> } | null>(null);
  useEffect(() => {
    fetch("/bus-data-cityvein/summary.json")
      .then((r) => r.json())
      .then(setNationalStats)
      .catch(() => {});
  }, []);

  const handleCrossCitySearch = async () => {
    if (crossFromCity === crossToCity) return;
    setCrossLoading(true);
    try {
      const plans = await findCrossCityPlansAsync(crossFromCity, crossToCity, 5);
      setCrossPlans(plans);
    } catch (err) {
      console.error("跨城查询失败:", err);
    }
    setCrossLoading(false);
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [linesRes, metaRes] = await Promise.all([
          fetch("/bus-data-official/beijing/lines.json"),
          fetch("/bus-data-official/beijing/metadata.json"),
        ]);

        if (linesRes.ok && metaRes.ok) {
          const linesData = await linesRes.json();
          const metaData = await metaRes.json();
          setLines(linesData);
          setMetadata(metaData);
        }
      } catch (err) {
        console.error("加载数据失败:", err);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredLines = useMemo(() => {
    let result = [...lines];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (line) =>
          line.name.toLowerCase().includes(term) ||
          line.fromStation.toLowerCase().includes(term) ||
          line.toStation.toLowerCase().includes(term)
      );
    }

    switch (sortBy) {
      case "name":
        result.sort((a, b) => {
          const numA = parseInt(a.name.replace("路", "")) || 9999;
          const numB = parseInt(b.name.replace("路", "")) || 9999;
          return numA - numB;
        });
        break;
      case "stations":
        result.sort((a, b) => b.stations.up.length - a.stations.up.length);
        break;
    }

    return result;
  }, [lines, searchTerm, sortBy]);

  const linesPerPage = 20;
  const totalPages = Math.ceil(filteredLines.length / linesPerPage);
  const paginatedLines = filteredLines.slice(
    (currentPage - 1) * linesPerPage,
    currentPage * linesPerPage
  );

  const stats = useMemo(() => {
    const avgStations = Math.round(
      filteredLines.reduce((sum, line) => sum + line.stations.up.length, 0) /
        filteredLines.length
    );
    return { avgStations };
  }, [filteredLines]);

  const stationLineMap = useMemo(() => {
    const map = new Map<string, string[]>();
    lines.forEach((line) => {
      line.stations.up.forEach((station) => {
        if (!map.has(station)) map.set(station, []);
        if (!map.get(station)!.includes(line.name)) {
          map.get(station)!.push(line.name);
        }
      });
      line.stations.down.forEach((station) => {
        if (!map.has(station)) map.set(station, []);
        if (!map.get(station)!.includes(line.name)) {
          map.get(station)!.push(line.name);
        }
      });
    });
    return map;
  }, [lines]);

  const findTransferPlans = useMemo(() => {
    return (fromStation: string, toStation: string): TransferPlan[] => {
      if (!fromStation || !toStation || fromStation === toStation) return [];

      const plans: TransferPlan[] = [];

      const fromLines = stationLineMap.get(fromStation) || [];
      const toLines = stationLineMap.get(toStation) || [];

      const directLines = fromLines.filter((l) => toLines.includes(l));
      directLines.forEach((line) => {
        const lineData = lines.find((l) => l.name === line);
        if (!lineData) return;
        const upIdx = lineData.stations.up.indexOf(fromStation);
        const upToIdx = lineData.stations.up.indexOf(toStation);
        const downIdx = lineData.stations.down.indexOf(fromStation);
        const downToIdx = lineData.stations.down.indexOf(toStation);

        let stationCount = 0;
        if (upIdx >= 0 && upToIdx > upIdx) stationCount = upToIdx - upIdx + 1;
        else if (downIdx >= 0 && downToIdx > downIdx) stationCount = downToIdx - downIdx + 1;
        else stationCount = 10;

        plans.push({
          id: `direct-${line}`,
          lines: [line],
          transfers: 0,
          stations: stationCount,
          segments: [{ line, from: fromStation, to: toStation, stationCount }],
        });
      });

      fromLines.forEach((line1) => {
        toLines.forEach((line2) => {
          if (line1 === line2) return;

          const line1Data = lines.find((l) => l.name === line1);
          const line2Data = lines.find((l) => l.name === line2);
          if (!line1Data || !line2Data) return;

          const line1Stations = new Set([
            ...line1Data.stations.up,
            ...line1Data.stations.down,
          ]);
          const line2Stations = new Set([
            ...line2Data.stations.up,
            ...line2Data.stations.down,
          ]);

          const commonStations = [...line1Stations].filter((s) =>
            line2Stations.has(s)
          );

          commonStations.forEach((transferStation) => {
            if (transferStation === fromStation || transferStation === toStation) return;

            let seg1Count = 0;
            let seg2Count = 0;

            const l1upFrom = line1Data.stations.up.indexOf(fromStation);
            const l1upTrans = line1Data.stations.up.indexOf(transferStation);
            const l1downFrom = line1Data.stations.down.indexOf(fromStation);
            const l1downTrans = line1Data.stations.down.indexOf(transferStation);

            if (l1upFrom >= 0 && l1upTrans > l1upFrom) seg1Count = l1upTrans - l1upFrom + 1;
            else if (l1downFrom >= 0 && l1downTrans > l1downFrom) seg1Count = l1downTrans - l1downFrom + 1;
            else seg1Count = 5;

            const l2upTrans = line2Data.stations.up.indexOf(transferStation);
            const l2upTo = line2Data.stations.up.indexOf(toStation);
            const l2downTrans = line2Data.stations.down.indexOf(transferStation);
            const l2downTo = line2Data.stations.down.indexOf(toStation);

            if (l2upTrans >= 0 && l2upTo > l2upTrans) seg2Count = l2upTo - l2upTrans + 1;
            else if (l2downTrans >= 0 && l2downTo > l2downTrans) seg2Count = l2downTo - l2downTrans + 1;
            else seg2Count = 5;

            plans.push({
              id: `1trans-${line1}-${transferStation}-${line2}`,
              lines: [line1, line2],
              transfers: 1,
              stations: seg1Count + seg2Count,
              segments: [
                { line: line1, from: fromStation, to: transferStation, stationCount: seg1Count },
                { line: line2, from: transferStation, to: toStation, stationCount: seg2Count },
              ],
            });
          });
        });
      });

      return plans
        .sort((a, b) => a.transfers - b.transfers || a.stations - b.stations)
        .slice(0, 10);
    };
  }, [lines, stationLineMap]);

  const handleTransferSearch = () => {
    if (!transferFrom.trim() || !transferTo.trim()) return;
    setTransferLoading(true);
    setTimeout(() => {
      const plans = findTransferPlans(transferFrom.trim(), transferTo.trim());
      setTransferPlans(plans);
      setTransferLoading(false);
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">加载数据中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">公交线路查询</h1>
              <p className="text-gray-500">
                {metadata?.city}官方数据 · {metadata?.totalLines || 0}条线路 · {metadata?.totalStations || 0}个站点
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-600 text-sm font-medium">官方数据</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">{metadata?.totalLines || 0}</div>
            <div className="text-gray-500 text-sm">北京公交线路（官方数据）</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">{metadata?.totalStations || 0}</div>
            <div className="text-gray-500 text-sm">北京站点记录数</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">{nationalStats?.totalLines || 0}</div>
            <div className="text-gray-500 text-sm">全国{nationalStats?.totalCities || 0}城市线路总数</div>
          </div>
        </div>

        {nationalStats && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">全国公交线路数据覆盖</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Object.entries(nationalStats.cities).map(([city, info]) => (
                <div key={city} className="border border-gray-200 rounded-lg p-3">
                  <div className="font-medium text-gray-900">{city}</div>
                  <div className="text-sm text-gray-500">{info.lines}条线路</div>
                  <div className="text-xs text-gray-400">{(info.points / 1000).toFixed(0)}K坐标点</div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
              数据来源：city-vein开源项目（GitHub antct/city-vein）+ 北京市交通委员会官方数据
            </div>
          </div>
        )}

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => { setActiveTab("list"); setSelectedLine(null); }}
            className={`px-5 py-2.5 rounded-lg font-medium transition ${
              activeTab === "list" ? "bg-gray-800 text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            线路列表
          </button>
          <button
            onClick={() => { setActiveTab("transfer"); setSelectedLine(null); }}
            className={`px-5 py-2.5 rounded-lg font-medium transition ${
              activeTab === "transfer" ? "bg-gray-800 text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            市内换乘
          </button>
          <button
            onClick={() => { setActiveTab("crosscity"); setSelectedLine(null); }}
            className={`px-5 py-2.5 rounded-lg font-medium transition ${
              activeTab === "crosscity" ? "bg-gray-800 text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            跨城公交
          </button>
          {selectedLine && (
            <button
              onClick={() => setActiveTab("detail")}
              className={`px-5 py-2.5 rounded-lg font-medium transition ${
                activeTab === "detail" ? "bg-gray-800 text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {selectedLine.name}详情
            </button>
          )}
        </div>

        {activeTab === "list" && (
          <>
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    placeholder="搜索线路名称、起点或终点..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSortBy("name"); setCurrentPage(1); }}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                      sortBy === "name" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    按名称排序
                  </button>
                  <button
                    onClick={() => { setSortBy("stations"); setCurrentPage(1); }}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                      sortBy === "stations" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    按站点数排序
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
                {paginatedLines.map((line) => (
                  <div
                    key={line.name}
                    onClick={() => { setSelectedLine(line); setActiveTab("detail"); }}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer transition hover:bg-gray-100 hover:border-gray-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-gray-900">{line.name}</span>
                      <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 text-xs">{line.stations.up.length}站</span>
                    </div>
                    <div className="text-gray-500 text-sm mb-2">起: {line.fromStation || "未知"}</div>
                    <div className="text-gray-500 text-sm">终: {line.toStation || "未知"}</div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 text-sm">
                      显示 {(currentPage - 1) * linesPerPage + 1} - {Math.min(currentPage * linesPerPage, filteredLines.length)} 条，共 {filteredLines.length} 条
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 rounded text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                      >
                        上一页
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let page = i + 1;
                        if (currentPage > 3 && currentPage < totalPages - 1) {
                          page = i === 0 ? 1 : i === 4 ? totalPages : currentPage - 2 + i;
                        } else if (currentPage >= totalPages - 1) {
                          page = totalPages - 4 + i;
                        }
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1.5 rounded text-sm font-medium transition ${
                              currentPage === page ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 rounded text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                      >
                        下一页
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "transfer" && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">市内公交换乘</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">起点站</label>
                <input
                  type="text"
                  value={transferFrom}
                  onChange={(e) => setTransferFrom(e.target.value)}
                  placeholder="输入起点站点名称"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onKeyDown={(e) => e.key === "Enter" && handleTransferSearch()}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">终点站</label>
                <input
                  type="text"
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                  placeholder="输入终点站点名称"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onKeyDown={(e) => e.key === "Enter" && handleTransferSearch()}
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleTransferSearch}
                  disabled={!transferFrom.trim() || !transferTo.trim() || transferLoading}
                  className="w-full px-6 py-2.5 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {transferLoading ? "计算中..." : "查询"}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-3">换乘算法说明</h3>
              <div className="text-sm text-gray-500 space-y-2">
                <p>1. 直达方案：查找同时经过起点和终点的公交线路</p>
                <p>2. 一次换乘：查找经过起点的线路和经过终点的线路的公共站点作为换乘点</p>
                <p>3. 排序规则：先按换乘次数排序，再按站点数排序</p>
                <p>4. 数据来源：北京市交通委员会官方公交站点数据（58697条记录，1150条线路）</p>
              </div>
            </div>

            {transferPlans.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">共找到 {transferPlans.length} 个换乘方案</h3>
                {transferPlans.map((plan, idx) => (
                  <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium text-gray-900">方案 {idx + 1}</div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{plan.transfers}次换乘</span>
                        <span>{plan.stations}个站点</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {plan.segments.map((seg, segIdx) => (
                        <div key={segIdx} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-medium">
                            {segIdx + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{seg.line}</div>
                            <div className="text-sm text-gray-500">{seg.from} → {seg.to}（{seg.stationCount}站）</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {plan.transfers > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-500">
                        换乘提示：在 {plan.segments[0].to} 站换乘
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {!transferLoading && transferFrom && transferTo && transferPlans.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>未找到换乘方案，请尝试其他站点名称</p>
                <p className="text-sm mt-2">提示：请输入准确的站点名称，如"四惠枢纽站"、"东直门枢纽站"等</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "crosscity" && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">跨城纯市内公交</h2>
            <p className="text-gray-500 text-sm mb-6">仅乘坐不同城市的市内公交，在城市边界步行接驳，实现跨城出行</p>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">出发城市</label>
                <select
                  value={crossFromCity}
                  onChange={(e) => setCrossFromCity(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
                >
                  {availableCities.map((city) => (
                    <option key={city} value={city}>{city}市政府</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => { const t = crossFromCity; setCrossFromCity(crossToCity); setCrossToCity(t); }}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  交换
                </button>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">到达城市</label>
                <select
                  value={crossToCity}
                  onChange={(e) => setCrossToCity(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
                >
                  {availableCities.map((city) => (
                    <option key={city} value={city}>{city}市政府</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleCrossCitySearch}
                  disabled={crossFromCity === crossToCity || crossLoading}
                  className="w-full px-6 py-2.5 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {crossLoading ? "计算中..." : "查询跨城方案"}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-3">跨城算法说明</h3>
              <div className="text-sm text-gray-500 space-y-2">
                <p>1. 构建多城市公交站点图（节点=站点，边=同线路相邻站）</p>
                <p>2. 城市边界站点通过步行接驳连接（地理位置接近的不同城市站点对）</p>
                <p>3. 使用Dijkstra + K-shortest paths算法规划多条路线</p>
                <p>4. 按总站点数排序，输出最少换乘/最少步行方案</p>
                <p className="pt-2 border-t border-gray-200">当前数据：北京（真实1150条线路）+ 天津/廊坊（占位数据，待获取真实数据替换）</p>
              </div>
            </div>

            {crossPlans.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">共找到 {crossPlans.length} 个跨城方案</h3>
                {crossPlans.map((plan, idx) => (
                  <div key={plan.id} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                      <div className="font-medium text-gray-900">方案 {idx + 1}</div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{plan.totalBusSegments}段公交</span>
                        <span>{plan.totalWalkSegments}次步行接驳</span>
                        <span>{plan.totalStations}站</span>
                        <span>{plan.transfers}次换乘</span>
                      </div>
                    </div>

                    <div className="mb-4 text-sm text-gray-600 bg-gray-50 rounded p-3">
                      <span className="font-medium">{plan.fromCity}市政府</span>
                      {" → "}
                      {plan.summary}
                      {" → "}
                      <span className="font-medium">{plan.toCity}市政府</span>
                    </div>

                    <div className="space-y-3">
                      {plan.segments.map((seg, segIdx) => (
                        <div key={segIdx} className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                            seg.type === "bus" ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-700"
                          }`}>
                            {segIdx + 1}
                          </div>
                          <div className="flex-1">
                            {seg.type === "bus" ? (
                              <>
                                <div className="font-medium text-gray-900">
                                  {seg.line} <span className="text-gray-500 text-sm">({seg.city})</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                  {seg.from} → {seg.to}（{seg.stationCount}站）
                                </div>
                                {seg.stations.length > 2 && (
                                  <div className="text-xs text-gray-400 mt-1">
                                    途经：{seg.stations.slice(1, -1).join("、")}
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <div className="font-medium text-gray-700">步行接驳</div>
                                <div className="text-sm text-gray-500">
                                  {seg.from}({seg.fromCity}) → {seg.to}({seg.toCity})
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  约{(seg.distanceMeters / 1000).toFixed(1)}公里，预计{seg.estimatedMinutes}分钟
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!crossLoading && crossPlans.length === 0 && crossFromCity !== crossToCity && (
              <div className="text-center py-8 text-gray-500">
                <p>点击"查询跨城方案"开始计算</p>
              </div>
            )}

            {crossFromCity === crossToCity && (
              <div className="text-center py-8 text-gray-400">
                <p>出发城市和到达城市不能相同</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "detail" && selectedLine && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedLine.name}</h2>
                <div className="flex items-center gap-4 text-gray-500">
                  <span>{selectedLine.city}</span>
                  <span>{selectedLine.source === "official" ? "官方数据" : "第三方数据"}</span>
                  <span>{new Date(selectedLine.lastUpdate).toLocaleDateString()}</span>
                </div>
              </div>
              <button
                onClick={() => { setActiveTab("list"); setSelectedLine(null); }}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
              >
                返回列表
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-4">上行路线</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-bold">起</span>
                    <span className="font-medium text-gray-900">{selectedLine.fromStation || "未知"}</span>
                  </div>
                  <div className="pl-10 border-l-2 border-gray-200 space-y-1.5">
                    {selectedLine.stations.up.slice(1, -1).map((station, idx) => (
                      <div key={idx} className="text-sm text-gray-600 pl-3">{station}</div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-gray-600 text-white flex items-center justify-center text-xs font-bold">终</span>
                    <span className="font-medium text-gray-900">{selectedLine.toStation || "未知"}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">共 {selectedLine.stations.up.length} 个站点</div>
              </div>

              {selectedLine.stations.down.length > 0 && (
                <div className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">下行路线</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-bold">起</span>
                      <span className="font-medium text-gray-900">{selectedLine.stations.down[0] || "未知"}</span>
                    </div>
                    <div className="pl-10 border-l-2 border-gray-200 space-y-1.5">
                      {selectedLine.stations.down.slice(1, -1).map((station, idx) => (
                        <div key={idx} className="text-sm text-gray-600 pl-3">{station}</div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-gray-600 text-white flex items-center justify-center text-xs font-bold">终</span>
                      <span className="font-medium text-gray-900">{selectedLine.stations.down[selectedLine.stations.down.length - 1] || "未知"}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">共 {selectedLine.stations.down.length} 个站点</div>
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-4">完整站点列表</h3>
              <div className="flex flex-wrap gap-2">
                {selectedLine.stations.up.map((station, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded bg-gray-100 text-gray-700 text-sm">
                    {idx + 1}. {station}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-400 text-sm">
          <p>数据来源：{metadata?.source}</p>
          <p className="mt-1">
            <a href={metadata?.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
              {metadata?.sourceUrl}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}