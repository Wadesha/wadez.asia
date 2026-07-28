"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";

interface CityDataStatus {
  city: string;
  totalLines: number;
  totalStops?: number;
  lastUpdate: string;
  status: "completed" | "running" | "not-started" | "failed";
  version: string;
  sources: string[];
  tencent?: { totalLines: number; lastUpdate: string };
  lastError?: string;
}

interface DataStatusResponse {
  summary: {
    totalCities: number;
    completedCities: number;
    runningCities: number;
    totalLines: number;
    totalStops: number;
    workerRunning: boolean;
    workerMode: string;
  };
  cities: CityDataStatus[];
  worker: {
    city: string;
    status: string;
    mode?: string;
    totalLines: number;
    trustedLines?: number;
    lastUpdate: string;
    lastError?: string;
  }[];
  timestamp: string;
}

interface BusLine {
  name: string;
  fromStation: string;
  toStation: string;
  distance: number;
  duration: number;
  city: string;
}

const STATUS_COLORS: Record<string, string> = {
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  running: "bg-blue-50 text-blue-700 border-blue-200",
  "not-started": "bg-gray-50 text-gray-400 border-gray-200",
  failed: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_LABELS: Record<string, string> = {
  completed: "已完成",
  running: "进行中",
  "not-started": "待开始",
  failed: "失败",
};

const MODE_LABELS: Record<string, string> = {
  amap: "高德",
  tencent: "腾讯",
  multi: "双源",
};

function formatTime(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatDateTime(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * 线路走马灯组件
 * 横向滚动展示获取到的线路名称
 */
function LineMarquee({ lines }: { lines: BusLine[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (lines.length === 0) {
    return (
      <div className="text-center text-xs text-slate-400 py-6">
        等待数据...
      </div>
    );
  }

  return (
    <div className="overflow-hidden relative">
      <div
        ref={trackRef}
        className="flex gap-4 animate-marquee whitespace-nowrap"
        style={{
          animationDuration: `${Math.max(20, lines.length * 2)}s`,
        }}
      >
        {[...lines, ...lines].map((line, idx) => (
          <div
            key={`${line.name}-${idx}`}
            className="flex-shrink-0 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full font-medium">
                {line.city}
              </span>
              <span className="text-sm font-bold text-slate-900">
                {line.name}
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {line.fromStation || "起"} → {line.toStation || "终"}
              <span className="ml-2 text-slate-300">·</span>
              <span className="ml-2">{line.distance}km</span>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  );
}

export default function DataPage() {
  const [data, setData] = useState<DataStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "running" | "not-started">("all");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [cityLines, setCityLines] = useState<BusLine[]>([]);
  const [linesLoading, setLinesLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/data-status");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCityLines = useCallback(async (city: string) => {
    setLinesLoading(true);
    setSelectedCity(city);
    try {
      const tencentPath = `/bus-data-tencent/${city}/results.json`;
      const res = await fetch(tencentPath);
      if (res.ok) {
        const raw = await res.json();
        setCityLines(raw.map((l: any) => ({
          name: l.name,
          fromStation: l.fromStation,
          toStation: l.toStation,
          distance: l.distance,
          duration: l.duration,
          city,
        })));
      } else {
        setCityLines([]);
      }
    } catch {
      setCityLines([]);
    } finally {
      setLinesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    if (!autoRefresh) return;
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData, autoRefresh]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-400 text-sm">加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-red-500 mb-2">加载失败</p>
          <p className="text-slate-400 text-sm">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-1.5 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const filteredCities = data.cities.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  const progressPct = data.summary.totalCities > 0
    ? Math.round((data.summary.completedCities / data.summary.totalCities) * 100)
    : 0;

  const allLines: BusLine[] = [];
  data.cities.forEach((c) => {
    if (c.tencent && c.tencent.totalLines > 0 && c.status === "completed") {
      for (let i = 0; i < Math.min(20, c.tencent.totalLines); i++) {
        allLines.push({
          name: `${c.city}线路`,
          fromStation: "",
          toStation: "",
          distance: 0,
          duration: 0,
          city: c.city,
        });
      }
    }
  });

  // 加载真实线路数据用于滚动展示
  const [realMarqueeLines, setRealMarqueeLines] = useState<BusLine[]>([]);
  useEffect(() => {
    async function loadAllLines() {
      const allRealLines: BusLine[] = [];
      if (!data) return;
      const completedCities = data.cities.filter(
        (c) => c.tencent && c.tencent.totalLines > 0 && c.status === "completed"
      );
      for (const c of completedCities) {
        try {
          const res = await fetch(`/bus-data-tencent/${c.city}/results.json`);
          if (res.ok) {
            const raw = await res.json();
            const busLines = raw.filter((l: any) => !l.name.includes("地铁") && !l.name.includes("磁浮"));
            allRealLines.push(
              ...busLines.map((l: any) => ({
                name: l.name,
                fromStation: l.fromStation,
                toStation: l.toStation,
                distance: l.distance,
                duration: l.duration,
                city: c.city,
              }))
            );
          }
        } catch {
          // skip
        }
      }
      // 打乱顺序
      for (let i = allRealLines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allRealLines[i], allRealLines[j]] = [allRealLines[j], allRealLines[i]];
      }
      setRealMarqueeLines(allRealLines);
    }
    loadAllLines();
  }, [data]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg">
              📊
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">数据获取实时进度</h1>
              <p className="text-xs text-slate-400">
                刷新于 {formatTime(data.timestamp)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="accent-blue-600"
              />
              自动刷新
            </label>
            <Link
              href="/"
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              ← 首页
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-5">
        {/* 线路滚动展示区 */}
        <div className="mb-5 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-4 text-white overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold">实时线路流</span>
            </div>
            <span className="text-xs text-slate-400">
              共 {data.summary.totalLines.toLocaleString()} 条
            </span>
          </div>
          <LineMarquee lines={cityLines.length > 0 ? cityLines : realMarqueeLines} />
        </div>

        {/* Worker 状态条 */}
        <div className={`mb-5 rounded-2xl border p-4 ${
          data.summary.workerRunning
            ? "bg-blue-50 border-blue-200"
            : "bg-slate-50 border-slate-200"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${
                data.summary.workerRunning ? "bg-blue-500 animate-pulse" : "bg-slate-300"
              }`}></div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Worker {data.summary.workerRunning ? "运行中" : "已停止"}
                </p>
                <p className="text-xs text-slate-500">
                  模式: <span className="font-medium">{MODE_LABELS[data.summary.workerMode] || data.summary.workerMode}</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">进行中</p>
              <p className="text-lg font-bold text-blue-600">{data.summary.runningCities}</p>
            </div>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <p className="text-xs text-slate-400">总城市数</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {data.summary.totalCities}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <p className="text-xs text-slate-400">已完成</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">
              {data.summary.completedCities}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <p className="text-xs text-slate-400">总线路数</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {data.summary.totalLines.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <p className="text-xs text-slate-400">完成度</p>
            <div className="mt-1.5">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">进度</span>
                <span className="font-semibold text-indigo-600">{progressPct}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 数据源标签 */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-slate-500">数据源:</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">高德</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">腾讯</span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-500">
            每 {autoRefresh ? "5" : "--"} 秒自动刷新
          </span>
        </div>

        {/* 过滤 */}
        <div className="flex gap-2 mb-4">
          {[
            { v: "all", label: "全部" },
            { v: "completed", label: "已完成" },
            { v: "running", label: "进行中" },
            { v: "not-started", label: "待开始" },
          ].map((f) => (
            <button
              key={f.v}
              onClick={() => setFilter(f.v as typeof filter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                filter === f.v
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 城市网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredCities.map((c) => (
            <button
              key={c.city}
              onClick={() => loadCityLines(c.city)}
              className={`text-left bg-white rounded-2xl p-4 border shadow-sm transition hover:shadow-md hover:-translate-y-0.5 ${
                selectedCity === c.city
                  ? "ring-2 ring-blue-500 border-blue-300"
                  : c.status === "running"
                    ? "border-blue-200 ring-1 ring-blue-100"
                    : "border-slate-100"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900">{c.city}</h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border ${STATUS_COLORS[c.status]}`}
                >
                  {c.status === "running" && (
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-1 animate-pulse"></span>
                  )}
                  {STATUS_LABELS[c.status]}
                </span>
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs">线路数</span>
                  <span className="font-semibold text-slate-900">
                    {c.totalLines.toLocaleString()}
                  </span>
                </div>

                {c.tencent && c.tencent.totalLines > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-xs">腾讯源</span>
                    <span className="text-xs text-blue-600 font-medium">
                      {c.tencent.totalLines.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs">更新</span>
                  <span className="text-xs text-slate-600">
                    {formatDateTime(c.lastUpdate)}
                  </span>
                </div>
              </div>

              {c.status === "completed" && c.totalLines > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1">
                    {c.sources.slice(0, 2).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-slate-50 text-slate-500"
                      >
                        {s.includes("腾讯") ? "腾讯" : s.includes("高德") ? "高德" : s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {c.status === "failed" && c.lastError && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <p className="text-xs text-red-500 truncate">{c.lastError}</p>
                </div>
              )}
            </button>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            没有符合筛选条件的城市
          </div>
        )}

        {/* 选中城市的线路列表 */}
        {selectedCity && (
          <div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedCity} 公交线路
                </h2>
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                  {cityLines.length} 条
                </span>
              </div>
              <button
                onClick={() => setSelectedCity(null)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                关闭 ✕
              </button>
            </div>

            {linesLoading ? (
              <div className="text-center py-8 text-slate-400 text-sm">加载中...</div>
            ) : cityLines.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">暂无数据</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[400px] overflow-y-auto pr-1">
                {cityLines.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">
                        {line.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {line.distance}km
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 truncate">
                      {line.fromStation || "起"} → {line.toStation || "终"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 底部信息 */}
        <div className="mt-10 text-center text-xs text-slate-400 space-y-1">
          <p>
            数据来源: 高德地图 API + 腾讯地图 API · 多 Key 轮询
          </p>
          <p>
            API 端点: <code className="bg-slate-100 px-1.5 py-0.5 rounded">/api/data-status</code>
          </p>
        </div>
      </div>
    </div>
  );
}
