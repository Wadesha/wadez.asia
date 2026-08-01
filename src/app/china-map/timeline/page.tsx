"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  PROVINCE_TIMESERIES,
  YEARS,
  TIMESERIES_METRICS,
  getRankingByYear,
  getNationalTotalByYear,
  compoundGrowthRate,
  type TimeseriesMetric,
} from "@/lib/china-timeseries";
import { PROVINCES } from "@/lib/china-admin-data";
import ChoroplethMap from "@/components/ChoroplethMap";

export default function TimelinePage() {
  const [metric, setMetric] = useState<TimeseriesMetric>("gdp");
  const [year, setYear] = useState(2024);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const metricInfo = TIMESERIES_METRICS.find((m) => m.key === metric)!;

  // 播放
  useEffect(() => {
    if (!playing) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(() => {
      setYear((y) => {
        const idx = YEARS.indexOf(y);
        if (idx >= YEARS.length - 1) {
          setPlaying(false);
          return YEARS[YEARS.length - 1];
        }
        return YEARS[idx + 1];
      });
    }, 1200 / speed);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, speed]);

  // 计算全时段（2010-2024）该指标的全局 min/max，作为固定色阶
  // 保证播放动画时同样颜色代表同样的数值范围
  const globalDomain: [number, number] = useMemo(() => {
    let gmin = Infinity;
    let gmax = -Infinity;
    PROVINCE_TIMESERIES.forEach((p) => {
      p.series.forEach((y) => {
        const v = y[metric] as number;
        if (v < gmin) gmin = v;
        if (v > gmax) gmax = v;
      });
    });
    // 上下留 5% 余量
    const pad = (gmax - gmin) * 0.05;
    return [Math.max(0, gmin - pad), gmax + pad];
  }, [metric]);

  // 全局最大值（用于竞赛图条形宽度统一使用）
  const globalMaxValue = globalDomain[1];

  // 构造色块图数据
  const mapData = useMemo(() => {
    const d: Record<string, number> = {};
    PROVINCE_TIMESERIES.forEach(p => {
      const y = p.series.find((s) => s.year === year);
      const shortName = p.name.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, "");
      d[shortName] = y ? (y[metric] as number) : 0;
    });
    return d;
  }, [year, metric]);

  // 排名
  const ranking = useMemo(() => getRankingByYear(year, metric), [year, metric]);

  // 全国总量
  const nationalTotal = useMemo(() => getNationalTotalByYear(year, metric), [year, metric]);

  // 增长率（2010 vs 当前年）
  const growth = useMemo(() => {
    const startYear = YEARS[0];
    const startTotal = getNationalTotalByYear(startYear, metric);
    const years = year - startYear;
    return compoundGrowthRate(startTotal, nationalTotal, years);
  }, [year, metric, nationalTotal]);

  const maxValue = Math.max(...Object.values(mapData));
  const minValue = Math.min(...Object.values(mapData));

  // 排名竞赛图数据（Top 15）
  const top15 = ranking.slice(0, 15);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部 */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <a href="/china-map" className="text-xs text-gray-400 hover:text-gray-700">全国地图</a>
          <span className="text-gray-300">/</span>
          <h1 className="text-sm font-bold text-gray-900">时间序列动画</h1>
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">示例数据</span>
          <span className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
            色阶范围：{metricInfo.format(globalDomain[0])} ~ {metricInfo.format(globalDomain[1])}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {TIMESERIES_METRICS.map((m) => (
            <button
              key={m.key}
              onClick={() => {
                setMetric(m.key);
              }}
              className={[
                "px-2 py-1 text-[10px] rounded",
                metric === m.key ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100 border border-gray-200",
              ].join(" ")}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* 时间轴播放器 */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (year >= YEARS[YEARS.length - 1]) setYear(YEARS[0]);
              setPlaying(!playing);
            }}
            className="px-3 py-1 text-xs bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            {playing ? "暂停" : "播放"}
          </button>
          <button
            onClick={() => setYear(YEARS[0])}
            className="px-2 py-1 text-[10px] text-gray-600 hover:bg-gray-100 border border-gray-200 rounded"
          >
            |◀
          </button>
          <button
            onClick={() => {
              const idx = YEARS.indexOf(year);
              if (idx > 0) setYear(YEARS[idx - 1]);
            }}
            className="px-2 py-1 text-[10px] text-gray-600 hover:bg-gray-100 border border-gray-200 rounded"
          >
            ◀
          </button>
          <div className="text-base font-bold text-gray-900 tabular-nums w-14 text-center">{year}</div>
          <button
            onClick={() => {
              const idx = YEARS.indexOf(year);
              if (idx < YEARS.length - 1) setYear(YEARS[idx + 1]);
            }}
            className="px-2 py-1 text-[10px] text-gray-600 hover:bg-gray-100 border border-gray-200 rounded"
          >
            ▶
          </button>
          <button
            onClick={() => setYear(YEARS[YEARS.length - 1])}
            className="px-2 py-1 text-[10px] text-gray-600 hover:bg-gray-100 border border-gray-200 rounded"
          >
            ▶|
          </button>
          <div className="flex-1 flex items-center gap-2">
            <input
              type="range"
              min={YEARS[0]}
              max={YEARS[YEARS.length - 1]}
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="flex-1 h-1"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-gray-400">速度</span>
            {[0.5, 1, 2, 4].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={[
                  "px-1.5 py-0.5 text-[10px] rounded",
                  speed === s ? "bg-gray-700 text-white" : "text-gray-500 hover:bg-gray-100 border border-gray-200",
                ].join(" ")}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 p-3">
        {/* 左：色块图 */}
        <div className="flex-1">
          <ChoroplethMap
            data={mapData}
            bins={7}
            title={`${year}年 ${metricInfo.label}（${metricInfo.unit}）`}
            unit={metricInfo.unit}
            formatValue={metricInfo.format}
            domain={globalDomain}
            binMode="linear"
            height={520}
          />
          {/* 统计 */}
          <div className="mt-3 grid grid-cols-4 gap-2">
            <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
              <div className="text-[10px] text-gray-400">全国总量</div>
              <div className="text-sm font-semibold text-gray-800">{metricInfo.format(nationalTotal)}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
              <div className="text-[10px] text-gray-400">最高值</div>
              <div className="text-sm font-semibold text-gray-800">{metricInfo.format(maxValue)}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
              <div className="text-[10px] text-gray-400">最低值</div>
              <div className="text-sm font-semibold text-gray-800">{metricInfo.format(minValue)}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
              <div className="text-[10px] text-gray-400">较{YEARS[0]}年CAGR</div>
              <div className="text-sm font-semibold text-gray-800">{growth}%</div>
            </div>
          </div>
        </div>

        {/* 右：排名竞赛图 */}
        <div className="w-80 bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-700">{year}年 Top 15</span>
            <span className="text-[10px] text-gray-400">{metricInfo.unit}</span>
          </div>
          <div className="space-y-1">
            {top15.map((r) => (
            <div key={r.code} className="flex items-center gap-1.5 text-[10px]">
              <span className="w-4 text-gray-400 text-right tabular-nums">{r.rank}</span>
              <span className="w-14 text-gray-700 truncate">{r.name.replace("省", "").replace("市", "").replace("自治区", "").replace("壮族", "").replace("回族", "").replace("维吾尔", "")}</span>
              <div className="flex-1 bg-gray-100 rounded-sm h-3 relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-gray-700 transition-all duration-700"
                  style={{ width: `${(r.value / globalMaxValue) * 100}%` }}
                />
              </div>
              <span className="w-16 text-gray-500 text-right tabular-nums">{metricInfo.format(r.value)}</span>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
