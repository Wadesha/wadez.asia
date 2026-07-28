'use client';

import { useState, useMemo } from 'react';
import Head from 'next/head';
import { 
  getCityTrafficData, 
  getAllCities, 
  filterRoads,
  RoadSegment,
  levelNames,
  congestionColors,
} from '@/lib/traffic-capacity-data';

export default function TrafficCapacityPage() {
  const cities = getAllCities();
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedLevel, setSelectedLevel] = useState<RoadSegment['level'] | undefined>();

  const cityData = useMemo(() => getCityTrafficData(selectedCity), [selectedCity]);
  const filteredRoads = useMemo(() => {
    if (!cityData) return [];
    return filterRoads(cityData, selectedLevel);
  }, [cityData, selectedLevel]);

  if (!cityData) return null;

  const { stats, indicators, zones } = cityData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>交通承载力分析 | 城市规划工具箱</title>
        <meta name="description" content="路网容量与交通拥堵分析" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">交通承载力分析</h1>
              <p className="text-sm text-gray-500 mt-1">路网容量与拥堵状况评估</p>
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
            <span className="text-gray-600">路网总长: <strong>{stats.totalRoadLength}km</strong></span>
            <span className="text-gray-600">平均速度: <strong>{stats.avgSpeed}km/h</strong></span>
            <span className="text-gray-600">平均饱和度: <strong>{stats.avgCongestion}%</strong></span>
            <span className="text-gray-600">路网密度: <strong>{stats.roadDensity}km/km²</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 左侧：承载力指标 */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">承载力指标</h3>
              <div className="space-y-3">
                {indicators.map(indicator => {
                  const ratingColors: Record<string, string> = {
                    excellent: 'bg-green-500',
                    good: 'bg-blue-500',
                    fair: 'bg-yellow-500',
                    poor: 'bg-orange-500',
                    critical: 'bg-red-500',
                  };

                  return (
                    <div key={indicator.name} className="border-b pb-2 last:border-0">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">{indicator.name}</span>
                        <span className="font-bold text-gray-900">
                          {indicator.value}{indicator.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${ratingColors[indicator.rating]} rounded-full`}
                            style={{ width: typeof indicator.value === 'number' ? `${indicator.value}%` : '50%' }}
                          />
                        </div>
                        <span className={`text-xs ${
                          indicator.trend === 'up' ? 'text-red-500' : indicator.trend === 'down' ? 'text-green-500' : 'text-gray-400'
                        }`}>
                          {indicator.trend === 'up' ? '↑' : indicator.trend === 'down' ? '↓' : '-'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 交通分区 */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">交通分区</h3>
              <div className="space-y-2">
                {zones.map(zone => (
                  <div key={zone.id} className="border rounded p-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm text-gray-900">{zone.name}</span>
                      <span className="text-xs text-gray-500">{zone.area}km²</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      人口{zone.population.toLocaleString()} · 就业{zone.employment.toLocaleString()}
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <span className="text-gray-500">可达性: {zone.accessibility}</span>
                      <span className={zone.congestionIndex > 60 ? 'text-red-600' : 'text-green-600'}>
                        拥堵: {zone.congestionIndex}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 中间：拥堵分布图 */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">道路拥堵分布</h3>
              
              {/* 等级筛选 */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setSelectedLevel(undefined)}
                  className={`px-3 py-1 rounded text-xs ${
                    !selectedLevel ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  全部
                </button>
                {(Object.keys(levelNames) as RoadSegment['level'][]).map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(selectedLevel === level ? undefined : level)}
                    className={`px-3 py-1 rounded text-xs ${
                      selectedLevel === level ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {levelNames[level]}
                  </button>
                ))}
              </div>

              {/* 拥堵等级图例 */}
              <div className="flex gap-3 mb-3 text-xs">
                {Object.entries(congestionColors).map(([level, color]) => {
                  const labels: Record<string, string> = {
                    free: '畅通',
                    slow: '缓行',
                    congested: '拥堵',
                    blocked: '严重拥堵',
                  };
                  return (
                    <div key={level} className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded" style={{ background: color }} />
                      <span className="text-gray-600">{labels[level]}</span>
                    </div>
                  );
                })}
              </div>

              {/* 道路列表 */}
              <div className="max-h-[400px] overflow-y-auto space-y-1">
                {filteredRoads.map(road => (
                  <div key={road.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-8 rounded"
                        style={{ background: congestionColors[road.congestionLevel] }}
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{road.name}</div>
                        <div className="text-xs text-gray-500">
                          {levelNames[road.level]} · {road.lanes}车道 · {road.length}km
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{road.speed}km/h</div>
                      <div className="text-xs text-gray-500">
                        {Math.round(road.volume / road.capacity * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：高峰时段分析 */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">高峰时段流量</h3>
              <div className="space-y-3">
                {/* 早高峰 */}
                <div>
                  <div className="text-xs text-gray-500 mb-1">早高峰 (7:00-9:00)</div>
                  <div className="h-24 bg-gray-100 rounded relative">
                    {filteredRoads.slice(0, 10).map((road, i) => {
                      const height = (road.peak.morning / road.capacity) * 100;
                      return (
                        <div
                          key={road.id}
                          className="absolute bottom-0"
                          style={{
                            left: `${i * 10}%`,
                            width: '8%',
                            height: `${Math.min(height, 100)}%`,
                            background: congestionColors[road.congestionLevel],
                            opacity: 0.7,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* 晚高峰 */}
                <div>
                  <div className="text-xs text-gray-500 mb-1">晚高峰 (17:00-19:00)</div>
                  <div className="h-24 bg-gray-100 rounded relative">
                    {filteredRoads.slice(0, 10).map((road, i) => {
                      const height = (road.peak.evening / road.capacity) * 100;
                      return (
                        <div
                          key={road.id}
                          className="absolute bottom-0"
                          style={{
                            left: `${i * 10}%`,
                            width: '8%',
                            height: `${Math.min(height, 100)}%`,
                            background: congestionColors[road.congestionLevel],
                            opacity: 0.7,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 建议 */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">改善建议</h3>
              <div className="space-y-2 text-xs text-gray-600">
                <p>• {indicators.find(i => i.name === '路网容量利用率')?.value}% 容量利用率接近临界值，建议增加公共交通投入</p>
                <p>• 高峰时段拥堵指数偏高，可考虑潮汐车道或错峰出行政策</p>
                <p>• CBD区域路网密度较高但拥堵严重，建议优化信号配时</p>
                <p>• 公共交通分担率{indicators.find(i => i.name === '公共交通分担率')?.value}%，仍有提升空间</p>
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