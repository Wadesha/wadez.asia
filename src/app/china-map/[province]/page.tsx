"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  PROVINCES,
  CITIES,
  COUNTIES,
  METRICS,
  getMetricValue,
  perCapitaGDP,
  populationDensity,
  type MetricKey,
} from "@/lib/china-admin-data";
import ChoroplethMap from "@/components/ChoroplethMap";
import AdminTable from "@/components/AdminTable";

/**
 * 省份下钻页面
 * URL: /china-map/[province]
 * 展示该省下辖地级市数据 + 县级数据 + 排名对比
 */
export default function ProvincePage() {
  const params = useParams();
  const provinceCode = params.province as string;
  const [metric, setMetric] = useState<MetricKey>("gdp");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const province = PROVINCES.find((p) => p.code === provinceCode);

  // 该省地级市
  const cities = useMemo(() => CITIES.filter((c) => c.provinceCode === provinceCode), [provinceCode]);

  // 该省县级
  const counties = useMemo(() => {
    if (selectedCity) return COUNTIES.filter((c) => c.cityCode === selectedCity);
    return COUNTIES.filter((c) => c.provinceCode === provinceCode);
  }, [provinceCode, selectedCity]);

  // 简化处理：暂时只显示该省GDP数据
  const provinceMapData = useMemo(() => {
    if (!province) return {};
    const shortName = province.name.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, "");
    return { [shortName]: province.gdp };
  }, [province]);

  const metricInfo = METRICS.find((m) => m.key === metric)!;
  const formatNum = (v: number) => v >= 10000 ? (v / 10000).toFixed(1) + "万" : v.toFixed(1);

  if (!province) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-2">未找到省份: {provinceCode}</div>
          <a href="/china-map" className="text-xs text-blue-600 hover:underline">返回全国地图</a>
        </div>
      </div>
    );
  }

  // 城市排名
  const rankedCities = [...cities].sort((a, b) => {
    const va = metric === "gdp" ? a.gdp : metric === "population" ? a.population : metric === "area" ? a.area : a.urbanizationRate;
    const vb = metric === "gdp" ? b.gdp : metric === "population" ? b.population : metric === "area" ? b.area : b.urbanizationRate;
    return vb - va;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 面包屑 */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-2 text-xs">
        <a href="/china-map" className="text-gray-400 hover:text-gray-700">全国地图</a>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700 font-medium">{province.name}</span>
        <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">示例数据</span>
      </div>

      {/* 指标选择 */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-[10px] text-gray-400 mr-1">指标：</span>
          {METRICS.map((m) => (
            <button
              key={m.key}
              onClick={() => setMetric(m.key)}
              className={[
                "px-2.5 py-1 text-xs rounded",
                metric === m.key ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100 border border-gray-200",
              ].join(" ")}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* 省份概览 */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "GDP", value: `${province.gdp}亿元` },
            { label: "人口", value: `${province.population}万人` },
            { label: "面积", value: `${province.area}万km²` },
            { label: "城镇化率", value: `${province.urbanizationRate}%` },
            { label: "财政收入", value: `${province.fiscalRevenue}亿元` },
            { label: "社零消费", value: `${province.retailSales}亿元` },
            { label: "人均GDP", value: `${perCapitaGDP(province)}万元` },
            { label: "人口密度", value: `${populationDensity(province)}人/km²` },
          ].map((s) => (
            <div key={s.label} className="border border-gray-200 rounded px-2 py-1">
              <div className="text-[10px] text-gray-400">{s.label}</div>
              <div className="text-xs font-semibold text-gray-800">{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 p-3">
        {/* 左：省份色块图 */}
        <div className="flex-1">
          <ChoroplethMap
            data={provinceMapData}
            bins={5}
            title={`${province.name} - GDP（亿元）`}
            unit="亿元"
            formatValue={formatNum}
            height={480}
          />

          {/* 产业结构 */}
          <div className="mt-3 bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-700 mb-2">{province.name} 产业结构</div>
            <div className="flex h-6 rounded overflow-hidden">
              <div className="bg-gray-800 flex items-center justify-center text-[10px] text-white" style={{ width: `${province.primaryIndustry}%` }}>
                {province.primaryIndustry}%
              </div>
              <div className="bg-gray-500 flex items-center justify-center text-[10px] text-white" style={{ width: `${province.secondaryIndustry}%` }}>
                {province.secondaryIndustry}%
              </div>
              <div className="bg-gray-300 flex items-center justify-center text-[10px] text-gray-700" style={{ width: `${province.tertiaryIndustry}%` }}>
                {province.tertiaryIndustry}%
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>第一产业</span>
              <span>第二产业</span>
              <span>第三产业</span>
            </div>
          </div>
        </div>

        {/* 右：地级市排名 + 县级列表 */}
        <div className="w-80 flex flex-col gap-2">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-700 mb-2">地级市排名</div>
            <div className="space-y-0.5">
              {rankedCities.map((c, i) => {
                const v = metric === "gdp" ? c.gdp : metric === "population" ? c.population : metric === "area" ? c.area : c.urbanizationRate;
                const maxV = rankedCities.length > 0
                  ? metric === "gdp" ? rankedCities[0].gdp
                  : metric === "population" ? rankedCities[0].population
                  : metric === "area" ? rankedCities[0].area
                  : rankedCities[0].urbanizationRate
                  : 1;
                return (
                  <div
                    key={c.code}
                    onClick={() => setSelectedCity(c.code)}
                    className={[
                      "flex items-center gap-2 px-2 py-0.5 rounded cursor-pointer text-xs",
                      selectedCity === c.code ? "bg-gray-200" : "hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <span className="w-4 text-[10px] text-gray-400 text-right">{i + 1}</span>
                    <span className="w-14 text-gray-700 truncate">{c.name}</span>
                    <div className="flex-1 bg-gray-100 rounded-sm h-3 relative overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-gray-700" style={{ width: `${(v / maxV) * 100}%` }} />
                    </div>
                    <span className="w-12 text-[9px] text-gray-500 text-right">{formatNum(v)}</span>
                  </div>
                );
              })}
              {rankedCities.length === 0 && (
                <div className="text-[10px] text-gray-400 text-center py-2">暂无地级市数据</div>
              )}
            </div>
          </div>

          {/* 县级数据表 */}
          {counties.length > 0 && (
            <AdminTable
              title={selectedCity ? `${counties[0]?.cityName} 县级数据` : `${province.name} 县级数据`}
              data={counties.map((c) => ({ ...c, id: c.code, density: 0 }))}
              columns={[
                { key: "name", label: "区县", width: "30%", sortable: true },
                { key: "gdp", label: "GDP(亿)", format: (v) => v.toFixed(0), sortable: true },
                { key: "population", label: "人口(万)", format: (v) => v.toFixed(0), sortable: true },
              ]}
              selectedId={selectedCity ? undefined : undefined}
              pageSize={10}
            />
          )}
        </div>
      </div>
    </div>
  );
}
