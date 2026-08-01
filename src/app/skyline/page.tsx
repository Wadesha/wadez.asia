'use client';

import { useState, useMemo } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {
  getCitySkylineData,
  getAllCities,
  filterBuildings,
  BuildingHeight,
  functionNames,
  statusNames,
} from '@/lib/skyline-data';

const SkylineMap = dynamic(() => import('@/components/SkylineMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400 text-xs">地图加载中...</span>
    </div>
  ),
});

export default function SkylinePage() {
  const cities = getAllCities();
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [minHeight, setMinHeight] = useState<number>(0);
  const [selectedFunc, setSelectedFunc] = useState<BuildingHeight['function'] | undefined>();
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingHeight | undefined>();

  const cityData = useMemo(() => getCitySkylineData(selectedCity), [selectedCity]);
  const filteredBuildings = useMemo(() => {
    if (!cityData) return [];
    return filterBuildings(cityData, minHeight, undefined, selectedFunc);
  }, [cityData, minHeight, selectedFunc]);

  if (!cityData) return null;

  const { stats } = cityData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>城市天际线分析 | 城市规划工具箱</title>
        <meta name="description" content="城市建筑高度分布与天际线形态分析" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">城市天际线分析</h1>
              <p className="text-sm text-gray-500 mt-1">高度控制与天际线形态评估</p>
            </div>
            
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 border rounded text-sm"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* 统计条 */}
          <div className="flex gap-4 mt-3 pt-3 border-t text-sm">
            <span className="text-gray-600">建筑总数: <strong>{stats.totalBuildings}</strong></span>
            <span className="text-gray-600">平均高度: <strong>{stats.avgHeight}m</strong></span>
            <span className="text-gray-600">最高建筑: <strong>{stats.maxHeight}m</strong></span>
            <span className="text-gray-600">地标建筑: <strong>{stats.landmarkCount}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 左侧：天际线剖面图 */}
          <div className="lg:col-span-2 space-y-4">
            {/* 天际线可视化 */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">天际线剖面</h3>
              <div className="h-64 relative">
                {/* SVG天际线 */}
                <svg className="w-full h-full" viewBox="0 0 800 200">
                  {/* 背景网格 */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="800" height="200" fill="url(#grid)" />
                  
                  {/* 地平线 */}
                  <line x1="0" y1="200" x2="800" y2="200" stroke="#374151" strokeWidth="2" />
                  
                  {/* 天际线轮廓 */}
                  {filteredBuildings.slice(0, 40).map((building, i) => {
                    const x = i * 20;
                    const scaledHeight = (building.height / stats.maxHeight) * 180;
                    const color = building.landmark ? '#1f2937' : '#6b7280';
                    
                    return (
                      <g key={building.id}>
                        {/* 建筑矩形 */}
                        <rect
                          x={x + 2}
                          y={200 - scaledHeight}
                          width="16"
                          height={scaledHeight}
                          fill={color}
                          opacity={building.landmark ? 1 : 0.7}
                        />
                        {/* 地标建筑名称 */}
                        {building.landmark && scaledHeight > 50 && (
                          <text
                            x={x + 10}
                            y={200 - scaledHeight - 5}
                            fontSize="8"
                            fill="#374151"
                            textAnchor="middle"
                          >
                            {building.name.slice(0, 4)}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* 建筑高度地图 */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">建筑高度空间分布</h3>
              <SkylineMap
                buildings={filteredBuildings}
                center={cityData.center}
                zoom={12}
                height="h-[400px]"
                onBuildingClick={setSelectedBuilding}
                selectedId={selectedBuilding?.id}
              />
              {selectedBuilding && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">
                      {selectedBuilding.name}
                      {selectedBuilding.landmark && <span className="ml-2 text-[10px] text-blue-600">地标</span>}
                    </span>
                    <span className="text-sm font-bold text-gray-900">{selectedBuilding.height}m</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {selectedBuilding.floors}层 · {functionNames[selectedBuilding.function]} · {selectedBuilding.yearBuilt}年建成 · {statusNames[selectedBuilding.status]}
                  </div>
                </div>
              )}
            </div>

            {/* 高度分布图 */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">高度分布</h3>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(stats.heightDistribution).map(([level, count]) => {
                  const labels: Record<string, string> = {
                    low: '低层(<50m)',
                    medium: '中层(50-100m)',
                    high: '高层(100-200m)',
                    super: '超高层(>200m)',
                  };
                  const colors: Record<string, string> = {
                    low: 'bg-blue-200',
                    medium: 'bg-blue-400',
                    high: 'bg-blue-600',
                    super: 'bg-blue-800',
                  };
                  const percentage = Math.round((count / stats.totalBuildings) * 100);

                  return (
                    <div key={level} className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{count}</div>
                      <div className="text-xs text-gray-500 mt-1">{labels[level]}</div>
                      <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <div 
                          className={`h-full ${colors[level]} rounded-full`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{percentage}%</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 高度分区 */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">高度控制分区</h3>
              <div className="grid grid-cols-2 gap-3">
                {cityData.zones.map(zone => (
                  <div key={zone.name} className="border rounded p-3">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-gray-900">{zone.name}</div>
                      <div className="text-xs text-gray-500">{zone.area}km²</div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      限高: {zone.minheight}-{zone.maxHeight}m
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{zone.restriction}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：建筑列表 */}
          <div className="space-y-4">
            {/* 筛选 */}
            <div className="bg-white rounded-lg shadow-sm p-3">
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-500">最低高度</label>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    step="10"
                    value={minHeight}
                    onChange={(e) => setMinHeight(Number(e.target.value))}
                    className="w-full h-2 mt-1"
                  />
                  <div className="text-xs text-gray-600">{minHeight}m+</div>
                </div>
                
                <div>
                  <label className="text-xs text-gray-500">建筑功能</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <button
                      onClick={() => setSelectedFunc(undefined)}
                      className={`px-2 py-0.5 rounded text-xs ${
                        !selectedFunc ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      全部
                    </button>
                    {(Object.keys(functionNames) as BuildingHeight['function'][]).map(func => (
                      <button
                        key={func}
                        onClick={() => setSelectedFunc(selectedFunc === func ? undefined : func)}
                        className={`px-2 py-0.5 rounded text-xs ${
                          selectedFunc === func ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {functionNames[func]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 建筑列表 */}
            <div className="bg-white rounded-lg shadow-sm p-3 max-h-[500px] overflow-y-auto">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                建筑列表 ({filteredBuildings.length})
              </h3>
              <div className="space-y-2">
                {filteredBuildings.map(building => (
                  <div key={building.id} className="border-b pb-2 last:border-0">
                    <div className="flex justify-between">
                      <span className={`font-medium text-sm ${building.landmark ? 'text-gray-900' : 'text-gray-700'}`}>
                        {building.name}
                        {building.landmark && <span className="text-xs text-blue-600 ml-1">地标</span>}
                      </span>
                      <span className="text-sm font-bold text-gray-900">{building.height}m</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {building.floors}层 · {functionNames[building.function]} · {building.yearBuilt}年
                    </div>
                    <div className="text-xs text-gray-400">
                      {statusNames[building.status]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 底部说明 */}
        <div className="mt-4 text-xs text-gray-400 text-center">
          数据来源：模拟数据 | 仅供演示
        </div>
      </div>
    </div>
  );
}