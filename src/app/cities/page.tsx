"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { NATIONAL_CITIES, getCitiesByRegion, type CityConfig } from "@/lib/national-cities";

export default function CitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("全部");

  const regions = ["全部", "华北", "华东", "华南", "华中", "西南", "西北", "东北"];

  const filteredCities = useMemo(() => {
    let result = NATIONAL_CITIES;
    if (selectedRegion !== "全部") {
      result = result.filter((c) => c.region === selectedRegion);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (c) => c.name.includes(searchTerm) || c.pinyin.includes(term) || c.province.includes(searchTerm)
      );
    }
    return result;
  }, [searchTerm, selectedRegion]);

  const stats = useMemo(() => {
    const real = NATIONAL_CITIES.filter((c) => c.realDataAvailable).length;
    const simulated = NATIONAL_CITIES.length - real;
    const totalLines = NATIONAL_CITIES.reduce((s, c) => s + c.lineCount, 0);
    return { total: NATIONAL_CITIES.length, real, simulated, totalLines };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">全国主要城市公交</h1>
          <p className="text-gray-500">点击城市卡片查看跨城换乘方案（真实数据与模拟数据混合展示）</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-gray-500 text-sm mt-1">主要城市</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="text-2xl font-bold text-gray-900">{stats.real}</div>
            <div className="text-gray-500 text-sm mt-1">已有真实数据</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="text-2xl font-bold text-gray-900">{stats.simulated}</div>
            <div className="text-gray-500 text-sm mt-1">待获取（模拟）</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="text-2xl font-bold text-gray-900">{stats.totalLines}</div>
            <div className="text-gray-500 text-sm mt-1">公交线路总数</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索城市名称、拼音或省份..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    selectedRegion === region
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCities.map((city) => (
            <CityCard key={city.name} city={city} />
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>未找到匹配的城市</p>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">数据来源说明</h3>
          <div className="text-sm text-gray-500 space-y-1">
            <p>真实数据：北京（北京市交通委员会）+ 15城市（city-vein开源项目，含路径坐标）</p>
            <p>模拟数据：其余城市线路数为估算，换乘方案标注为模拟，后续获取真实数据后更新</p>
            <p>数据更新策略：分阶段获取真实数据，逐步替换模拟片段，直到全程为真实数据</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/lines" className="text-gray-500 hover:text-gray-700 text-sm">
            返回线路查询
          </Link>
        </div>
      </div>
    </div>
  );
}

function CityCard({ city }: { city: CityConfig }) {
  const dataSourceLabel = {
    official: "官方数据",
    cityvein: "开源数据",
    simulated: "模拟数据",
  };

  const dataSourceColor = {
    official: "bg-gray-800 text-white",
    cityvein: "bg-gray-600 text-white",
    simulated: "bg-gray-300 text-gray-700",
  };

  return (
    <Link
      href={`/cities/${city.pinyin}`}
      className="bg-white border border-gray-200 rounded-lg p-5 block transition hover:border-gray-400 hover:shadow-md"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
          <p className="text-gray-400 text-xs mt-0.5">{city.province}</p>
        </div>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${dataSourceColor[city.dataSource]}`}>
          {dataSourceLabel[city.dataSource]}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">公交线路</span>
          <span className="text-gray-900 font-medium">{city.lineCount}条</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">市政府站点</span>
          <span className="text-gray-900 font-medium text-xs">{city.governmentStation}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">相邻城市</span>
          <span className="text-gray-900 font-medium text-xs">{city.adjacentCities.length}个</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-gray-400 text-xs">{city.region}</span>
        {city.realDataAvailable ? (
          <span className="text-gray-700 text-xs">查看跨城方案</span>
        ) : (
          <span className="text-gray-400 text-xs">查看模拟方案</span>
        )}
      </div>
    </Link>
  );
}
