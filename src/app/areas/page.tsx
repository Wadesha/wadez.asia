"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  getAllAreas,
  getAreaStats,
  type Area,
  type AreaCategory,
  type AreaType,
  type AreaShape,
} from "@/lib/area-data";
import { useRealDistrict } from "@/lib/use-real-district";
import { DataSourceToggle, type DataSource } from "@/components/DataSourceToggle";

const CATEGORY_LABELS: Record<AreaCategory, string> = {
  open: "开放性区域",
  enclosed: "封闭性区域",
};

const TYPE_LABELS: Record<AreaType, string> = {
  park: "公园",
  plaza: "广场",
  block: "开放街区",
  community: "住宅小区",
  campus: "校园",
  mall: "商业综合体",
  industrial: "工业园区",
  airport: "机场航站楼",
  "road-greenbelt": "道路绿化带",
  riverside: "滨河/滨江绿道",
  "pedestrian-street": "步行街",
  "green-corridor": "生态廊道",
  "protective-belt": "防护绿带",
};

export default function AreasPage() {
  const allAreas = getAllAreas();
  const stats = getAreaStats();

  const [category, setCategory] = useState<AreaCategory | "all">("all");
  const [shape, setShape] = useState<AreaShape | "all">("all");
  const [type, setType] = useState<AreaType | "all">("all");
  const [city, setCity] = useState<string>("all");
  const [keyword, setKeyword] = useState("");

  const [dataSource, setDataSource] = useState<DataSource>("simulated");
  const realDistrict = useRealDistrict();
  const [searchTerm, setSearchTerm] = useState("");

  const cities = useMemo(() => {
    const set = new Set(allAreas.map((a) => a.city));
    return Array.from(set);
  }, [allAreas]);

  const filteredAreas = useMemo(() => {
    let result = allAreas;

    if (category !== "all") {
      result = result.filter((a) => a.category === category);
    }
    if (shape !== "all") {
      result = result.filter((a) => a.shape === shape);
    }
    if (type !== "all") {
      result = result.filter((a) => a.type === type);
    }
    if (city !== "all") {
      result = result.filter((a) => a.city === city);
    }
    if (keyword.trim()) {
      const kw = keyword.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(kw) ||
          a.description.toLowerCase().includes(kw) ||
          a.tags.some((t) => t.toLowerCase().includes(kw))
      );
    }

    return result;
  }, [allAreas, category, shape, type, city, keyword]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                城市区域开放性探索
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                观察真实世界中 Area 的开放与封闭形态
              </p>
            </div>
            <Link
              href="/gis"
              className="text-xs text-gray-400 hover:text-gray-600 transition"
            >
              ← 返回GIS总览
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            <span>
              共 <b className="text-gray-800">{stats.total}</b> 个区域
            </span>
            <span className="text-gray-300">|</span>
            <span>
              面状 <b className="text-gray-700">{stats.polygonCount}</b>
            </span>
            <span className="text-gray-300">|</span>
            <span>
              线性 <b className="text-gray-600">{stats.linearCount}</b>
            </span>
            <span className="text-gray-300">|</span>
            <span>
              线性总长度 <b className="text-gray-800">{stats.totalLengthKm} km</b>
            </span>
            <span className="text-gray-300">|</span>
            <span>
              出入口 <b className="text-gray-800">{stats.totalEntrances}</b> 个
            </span>
            <span className="text-gray-300">|</span>
            <span>
              平均封闭度 <b className="text-gray-800">{stats.avgEnclosure}</b>/5
            </span>
            <span className="ml-auto text-gray-400">v1.1.0</span>
          </div>
        </div>

        <DataSourceToggle
          source={dataSource}
          onChange={setDataSource}
          simulatedCount={stats.total}
          realDataCount={realDistrict.district ? 1 : 0}
          loading={realDistrict.loading}
          error={realDistrict.error}
          apiName="高德行政区划API"
        />

        {dataSource === "simulated" ? (
          <>
            <div className="bg-white border border-gray-200 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-400">类型</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setCategory("all")}
                  className={`px-2.5 py-1 text-xs rounded-md transition ${
                    category === "all"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  全部
                </button>
                <button
                  onClick={() => setCategory("open")}
                  className={`px-2.5 py-1 text-xs rounded-md transition ${
                    category === "open"
                      ? "bg-gray-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  开放
                </button>
                <button
                  onClick={() => setCategory("enclosed")}
                  className={`px-2.5 py-1 text-xs rounded-md transition ${
                    category === "enclosed"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  封闭
                </button>
              </div>
            </div>

            <div className="h-5 w-px bg-gray-200"></div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400">形态</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setShape("all")}
                  className={`px-2.5 py-1 text-xs rounded-md transition ${
                    shape === "all"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  全部
                </button>
                <button
                  onClick={() => setShape("polygon")}
                  className={`px-2.5 py-1 text-xs rounded-md transition ${
                    shape === "polygon"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  面状
                </button>
                <button
                  onClick={() => setShape("linear")}
                  className={`px-2.5 py-1 text-xs rounded-md transition ${
                    shape === "linear"
                      ? "bg-gray-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  线性
                </button>
              </div>
            </div>

            <div className="h-5 w-px bg-gray-200"></div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400">业态</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as AreaType | "all")}
                className="px-2 py-1 text-xs bg-gray-50 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
              >
                <option value="all">全部</option>
                {(Object.keys(TYPE_LABELS) as AreaType[]).map((t) => (
                  <option key={t} value={t}>
                    {TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400">城市</span>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="px-2 py-1 text-xs bg-gray-50 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
              >
                <option value="all">全部</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-xs text-gray-400">搜索</span>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="区域名称/标签"
                className="px-2.5 py-1 text-xs bg-gray-50 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300 w-36"
              />
            </div>
          </div>
        </div>

        {filteredAreas.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-sm text-gray-400">未找到匹配的区域</p>
          </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredAreas.map((area) => (
                  <AreaCard key={area.id} area={area} />
                ))}
              </div>
            )}
          </>
        ) : (
          <RealDistrictPanel
            realDistrict={realDistrict}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        <div className="mt-6 text-center text-[10px] text-gray-400">
          开放性 vs 封闭性 — 城市空间的两种基本形态
        </div>
      </div>
    </div>
  );
}

function AreaCard({ area }: { area: Area }) {
  const isOpen = area.category === "open";
  const isLinear = area.shape === "linear";

  return (
    <Link
      href={`/areas/${area.id}`}
      className="bg-white border border-gray-200 rounded-xl p-3 hover:border-gray-300 hover:shadow-md transition block"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-gray-900">{area.name}</h3>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded ${
                isOpen
                  ? "bg-gray-100 text-gray-600 border border-gray-200"
                  : "bg-gray-900 text-white"
              }`}
            >
              {isOpen ? "开放" : "封闭"}
            </span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded border ${
                isLinear
                  ? "bg-gray-50 text-gray-500 border-dashed border-gray-300"
                  : "bg-gray-50 text-gray-500 border-gray-200"
              }`}
            >
              {isLinear ? "线性" : "面状"}
            </span>
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {area.city} · {area.typeLabel}
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-400">封闭度</div>
          <div className="flex gap-0.5 mt-0.5 justify-end">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-1.5 h-3 rounded-sm ${
                  i <= area.enclosureLevel
                    ? "bg-gray-800"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 line-clamp-2 mb-2">
        {area.description}
      </p>

      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-gray-100 flex-wrap gap-1">
        {isLinear ? (
          <>
            <span>长 {area.lengthKm} km</span>
            <span>宽 {area.avgWidthM} m</span>
          </>
        ) : (
          <span>{area.areaKm2} km²</span>
        )}
        <span>{area.entrances.length} 个出入口</span>
        {!isLinear && (
          <span>
            {area.hasPerimeterWall ? "有围墙" : "无围墙"}
          </span>
        )}
        {isLinear && area.startPoint && (
          <span className="truncate max-w-24">{area.startPoint} →</span>
        )}
      </div>

      <div className="flex flex-wrap gap-1 mt-2">
        {area.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-1.5 py-0.5 bg-gray-50 text-gray-500 rounded border border-gray-100"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

function RealDistrictPanel({
  realDistrict,
  searchTerm,
  setSearchTerm,
}: {
  realDistrict: ReturnType<typeof useRealDistrict>;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
}) {
  const { district, loading, error, isRealData, query } = realDistrict;

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    query({ keywords: searchTerm.trim(), subdistrict: 1, extensions: "all" });
  };

  const pointCount = district?.polyline
    ? district.polyline
        .replace(/\|/g, ";")
        .split(";")
        .filter(Boolean).length
    : 0;

  return (
    <div className="space-y-3">
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 whitespace-nowrap">查询区域</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="如：海淀区、上海市、北京市"
            className="flex-1 px-2.5 py-1 text-xs bg-gray-50 border border-gray-200 rounded-md text-gray-700 outline-none focus:ring-1 focus:ring-gray-300"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !searchTerm.trim()}
            className="px-3 py-1 text-xs bg-gray-900 text-white rounded-md hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? "查询中..." : "查询"}
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="text-gray-400">状态:</span>
          {loading && (
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
              查询中...
            </span>
          )}
          {error && (
            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">
              ⚠ {error}
            </span>
          )}
          {isRealData && !loading && !error && (
            <span className="px-2 py-0.5 rounded bg-green-50 text-green-600 border border-green-200">
              ✓ 真实数据
            </span>
          )}
          {!loading && !error && !isRealData && (
            <span className="text-gray-400">尚未查询</span>
          )}
        </div>
      </div>

      {district && (
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="text-sm font-bold text-gray-900">{district.name}</h3>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">
              {district.level}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div>
              <span className="text-gray-400">adcode:</span>{" "}
              <span className="font-mono">{district.adcode}</span>
            </div>
            <div>
              <span className="text-gray-400">中心点:</span>{" "}
              <span className="font-mono">{district.center}</span>
            </div>
            <div>
              <span className="text-gray-400">边界点数:</span>{" "}
              <span className="font-mono">{pointCount}</span>
            </div>
            <div>
              <span className="text-gray-400">下级区划:</span>{" "}
              <span>{district.districts.length}</span>
            </div>
          </div>
        </div>
      )}

      {district && district.districts.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <div className="text-xs text-gray-400 mb-2">下级区划（点击查询）</div>
          <div className="flex flex-wrap gap-1.5">
            {district.districts.map((d) => (
              <button
                key={d.adcode}
                onClick={() => {
                  setSearchTerm(d.name);
                  query({ keywords: d.name, subdistrict: 1, extensions: "all" });
                }}
                className="px-2.5 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 hover:border-gray-300 border border-gray-200 transition"
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
