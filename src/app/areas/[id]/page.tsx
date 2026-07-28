"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import dynamic from "next/dynamic";
import {
  getAreaById,
  getAllAreas,
  type AreaEntrance,
} from "@/lib/area-data";

const AreaMap = dynamic(() => import("@/components/AreaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-72 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

export default function AreaDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const area = getAreaById(id);
  const [selectedEntrance, setSelectedEntrance] = useState<AreaEntrance | null>(
    null
  );

  if (!area) {
    notFound();
  }

  const isOpen = area.category === "open";
  const isLinear = area.shape === "linear";
  const allAreas = getAllAreas();
  const sameCityAreas = allAreas.filter(
    (a) => a.city === area.city && a.id !== area.id
  );
  const sameTypeAreas = allAreas.filter(
    (a) => a.type === area.type && a.id !== area.id
  );

  const mainEntrances = area.entrances.filter((e) => e.type === "main");
  const secondaryEntrances = area.entrances.filter(
    (e) => e.type === "secondary"
  );
  const otherEntrances = area.entrances.filter(
    (e) => e.type !== "main" && e.type !== "secondary"
  );

  const accessLabel = {
    none: "无限制",
    partial: "部分限制",
    full: "完全管控",
  }[area.accessRestriction];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Link
                href="/areas"
                className="text-xs text-gray-400 hover:text-gray-600 transition"
              >
                ← 列表
              </Link>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-base font-bold text-gray-900">
                    {area.name}
                  </h1>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isOpen
                        ? "bg-gray-100 text-gray-600 border border-gray-200"
                        : "bg-gray-900 text-white"
                    }`}
                  >
                    {isOpen ? "开放性区域" : "封闭性区域"}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded border ${
                      isLinear
                        ? "bg-gray-50 text-gray-500 border-dashed border-gray-300"
                        : "bg-gray-50 text-gray-500 border-gray-200"
                    }`}
                  >
                    {isLinear ? "线性空间" : "面状区域"}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {area.city} · {area.typeLabel}
                  {area.builtYear ? ` · ${area.builtYear}年建成` : ""}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-gray-400 mb-0.5">封闭度</div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-4 rounded-sm ${
                      i <= area.enclosureLevel ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                {area.enclosureLevel}/5
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex-wrap">
            {isLinear ? (
              <>
                <span>
                  长度 <b className="text-gray-700">{area.lengthKm} km</b>
                </span>
                <span className="text-gray-200">|</span>
                <span>
                  平均宽度 <b className="text-gray-700">{area.avgWidthM} m</b>
                </span>
                <span className="text-gray-200">|</span>
                {area.greenbeltSubtype && (
                  <>
                    <span>
                      子类 <b className="text-gray-700">
                        {{
                          roadside: "路侧绿带",
                          central: "中央分车带",
                          interchange: "立交绿地",
                          riverside: "滨河绿带",
                          pedestrian: "步行街道",
                          corridor: "生态廊道",
                          protective: "防护绿带",
                          median: "中央分车带",
                          sidewalk: "行道树绿带",
                          "both-sides": "路侧绿带",
                        }[area.greenbeltSubtype] || area.greenbeltSubtype}
                      </b>
                    </span>
                    <span className="text-gray-200">|</span>
                  </>
                )}
              </>
            ) : (
              <>
                <span>
                  面积 <b className="text-gray-700">{area.areaKm2} km²</b>
                </span>
                <span className="text-gray-200">|</span>
              </>
            )}
            <span>
              出入口 <b className="text-gray-700">{area.entrances.length}</b> 个
            </span>
            {!isLinear && (
              <>
                <span className="text-gray-200">|</span>
                <span>
                  围墙 <b className="text-gray-700">{area.hasPerimeterWall ? "有" : "无"}</b>
                </span>
              </>
            )}
            <span className="text-gray-200">|</span>
            <span>
              准入 <b className="text-gray-700">{accessLabel}</b>
            </span>
            {area.dailyFootfall && (
              <>
                <span className="text-gray-200">|</span>
                <span>
                  日均客流{" "}
                  <b className="text-gray-700">
                    {area.dailyFootfall.toLocaleString()}
                  </b>
                </span>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2 space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-2">
              <AreaMap
                area={area}
                height="h-72"
                onEntranceClick={(e) => setSelectedEntrance(e)}
              />
            </div>

            {isLinear && (
              <div className="bg-white border border-gray-200 rounded-xl p-3">
                <h2 className="text-sm font-semibold text-gray-800 mb-3">
                  线性空间特征
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-400 mb-1">总长度</div>
                    <div className="text-lg font-bold text-gray-800">
                      {area.lengthKm} <span className="text-xs font-normal text-gray-500">km</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-400 mb-1">平均宽度</div>
                    <div className="text-lg font-bold text-gray-800">
                      {area.avgWidthM} <span className="text-xs font-normal text-gray-500">m</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-400 mb-1">起点</div>
                    <div className="text-sm font-medium text-gray-700">
                      {area.startPoint || "—"}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-400 mb-1">终点</div>
                    <div className="text-sm font-medium text-gray-700">
                      {area.endPoint || "—"}
                    </div>
                  </div>
                </div>
                {area.greenbeltSubtype && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-[10px] text-gray-400 mb-1.5">空间类型</div>
                    <div className="text-sm text-gray-700">
                      {{
                        roadside: "城市道路路侧绿带 — 沿道路两侧布置的带状绿化空间，兼具景观与生态功能",
                        central: "道路中央分车带 — 分隔对向车流，提供安全缓冲与景观效果",
                        interchange: "立交枢纽绿地 — 道路立交节点周围的绿化空间，降噪除尘",
                        riverside: "滨河/滨江绿带 — 沿水体岸线布置的线性开放空间，兼具防洪与休闲",
                        pedestrian: "步行商业街 — 以步行为主的线性商业空间，全天候开放",
                        corridor: "生态廊道 — 连接城市生态斑块的线状绿色空间，生物迁徙通道",
                        protective: "防护绿带 — 城市建设用地之间的隔离绿带，卫生防护功能",
                        median: "中央分车绿带 — 设于道路中央分隔对向车流的带状绿化",
                        sidewalk: "行道树绿带 — 布设在人行道与车行道之间的行道树绿带",
                        "both-sides": "道路两侧绿带 — 沿道路两侧对称布置的带状绿化空间",
                      }[area.greenbeltSubtype] || area.greenbeltSubtype}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h2 className="text-sm font-semibold text-gray-800 mb-2">
                区域概述
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                {area.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-3">
                {area.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 bg-gray-50 text-gray-500 rounded border border-gray-100"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-gray-800">
                  出入口分布
                </h2>
                <span className="text-[10px] text-gray-400">
                  共 {area.entrances.length} 个
                </span>
              </div>

              {mainEntrances.length > 0 && (
                <div className="mb-3">
                  <div className="text-[10px] text-gray-400 mb-1.5">
                    主出入口 ({mainEntrances.length})
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {mainEntrances.map((e) => (
                      <EntranceItem
                        key={e.id}
                        entrance={e}
                        isMain
                        selected={selectedEntrance?.id === e.id}
                        onClick={() => setSelectedEntrance(e)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {secondaryEntrances.length > 0 && (
                <div className="mb-3">
                  <div className="text-[10px] text-gray-400 mb-1.5">
                    次出入口 ({secondaryEntrances.length})
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {secondaryEntrances.map((e) => (
                      <EntranceItem
                        key={e.id}
                        entrance={e}
                        selected={selectedEntrance?.id === e.id}
                        onClick={() => setSelectedEntrance(e)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {otherEntrances.length > 0 && (
                <div>
                  <div className="text-[10px] text-gray-400 mb-1.5">
                    其他 ({otherEntrances.length})
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {otherEntrances.map((e) => (
                      <EntranceItem
                        key={e.id}
                        entrance={e}
                        selected={selectedEntrance?.id === e.id}
                        onClick={() => setSelectedEntrance(e)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                {isLinear ? "开放性特征" : "封闭性分析"}
              </h3>
              <div className="space-y-2">
                {isLinear ? (
                  <>
                    <AnalysisBar
                      label="空间连续性"
                      value={90}
                      reverse
                    />
                    <AnalysisBar
                      label="可达性程度"
                      value={isOpen ? 95 : 60}
                      reverse
                    />
                    <AnalysisBar
                      label="穿越便利性"
                      value={isOpen ? 90 : 40}
                      reverse
                    />
                    <AnalysisBar
                      label="边界明确度"
                      value={65}
                    />
                  </>
                ) : (
                  <>
                    <AnalysisBar
                      label="边界围合"
                      value={area.hasPerimeterWall ? 100 : 20}
                    />
                    <AnalysisBar
                      label="出入口管控"
                      value={
                        area.accessRestriction === "full"
                          ? 100
                          : area.accessRestriction === "partial"
                          ? 60
                          : 10
                      }
                    />
                    <AnalysisBar
                      label="内部公共性"
                      value={isOpen ? 90 : 30}
                      reverse
                    />
                    <AnalysisBar
                      label="穿越便利性"
                      value={isOpen ? 85 : 20}
                      reverse
                    />
                  </>
                )}
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-500">
                <p>
                  该区域属于{" "}
                  <b className="text-gray-700">
                    {isOpen ? "开放性" : "封闭性"}
                  </b>{" "}
                  {isLinear ? "线性" : ""}空间，
                  {isLinear
                    ? isOpen
                      ? "沿线性方向连续开放，可自由进入和穿越"
                      : "线性空间但存在部分管控"
                    : isOpen
                    ? "可自由进出"
                    : "需通过指定出入口进入"}
                  。
                </p>
              </div>
            </div>

            {selectedEntrance && (
              <div className="bg-white border border-gray-300 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {selectedEntrance.name}
                  </h3>
                  <button
                    onClick={() => setSelectedEntrance(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-gray-400">类型</span>
                    <span className="text-gray-700">
                      {{
                        main: "主出入口",
                        secondary: "次出入口",
                        emergency: "应急通道",
                        pedestrian: "人行入口",
                        vehicle: "车行入口",
                      }[selectedEntrance.type]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">状态</span>
                    <span
                      className={
                        selectedEntrance.isOpen
                          ? "text-gray-700"
                          : "text-gray-400"
                      }
                    >
                      {selectedEntrance.isOpen ? "开放中" : "未开放"}
                    </span>
                  </div>
                  {selectedEntrance.openingHours && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">时间</span>
                      <span className="text-gray-700">
                        {selectedEntrance.openingHours}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">坐标</span>
                    <span className="text-gray-500 font-mono">
                      {selectedEntrance.lng.toFixed(4)},
                      {selectedEntrance.lat.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {sameCityAreas.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-3">
                <h3 className="text-xs font-semibold text-gray-700 mb-2">
                  {area.city}其他区域
                </h3>
                <div className="space-y-1.5">
                  {sameCityAreas.slice(0, 4).map((a) => (
                    <Link
                      key={a.id}
                      href={`/areas/${a.id}`}
                      className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-50 transition text-xs"
                    >
                      <span className="text-gray-700">{a.name}</span>
                      <span
                        className={`text-[10px] ${
                          a.category === "open"
                            ? "text-gray-500"
                            : "text-gray-700"
                        }`}
                      >
                        {a.category === "open" ? "开放" : "封闭"}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {sameTypeAreas.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-3">
                <h3 className="text-xs font-semibold text-gray-700 mb-2">
                  同类{area.typeLabel}
                </h3>
                <div className="space-y-1.5">
                  {sameTypeAreas.slice(0, 4).map((a) => (
                    <Link
                      key={a.id}
                      href={`/areas/${a.id}`}
                      className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-50 transition text-xs"
                    >
                      <span className="text-gray-700">
                        {a.name}
                      </span>
                      <span className="text-[10px] text-gray-400">{a.city}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400">
          数据来源：模拟数据 · v1.0.0
        </div>
      </div>
    </div>
  );
}

function EntranceItem({
  entrance,
  isMain = false,
  selected = false,
  onClick,
}: {
  entrance: AreaEntrance;
  isMain?: boolean;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-2 py-1.5 rounded-md border text-left transition ${
        selected
          ? "border-gray-800 bg-gray-50"
          : "border-gray-100 hover:border-gray-200"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full shrink-0 ${
          entrance.isOpen
            ? isMain
              ? "bg-gray-800"
              : "bg-gray-500"
            : "bg-gray-300"
        }`}
      />
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-gray-700 truncate">
          {entrance.name}
        </div>
        {entrance.openingHours && (
          <div className="text-[9px] text-gray-400 truncate">
            {entrance.openingHours}
          </div>
        )}
      </div>
    </button>
  );
}

function AnalysisBar({
  label,
  value,
  reverse = false,
}: {
  label: string;
  value: number;
  reverse?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] mb-0.5">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-400">{value}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${
            reverse ? "bg-gray-400" : "bg-gray-800"
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
