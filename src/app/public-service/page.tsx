'use client';

import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  getCityServiceData, 
  getAllCities, 
  filterFacilities,
  getServiceStats,
  calculateCoverage,
  PublicFacility,
  FacilityCategory,
  FacilityType,
  facilityTypeNames,
  categoryNames,
} from '@/lib/public-service-data';
import PublicServiceMap from '@/components/PublicServiceMap';

export default function PublicServicePage() {
  const cities = getAllCities();
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedCategory, setSelectedCategory] = useState<FacilityCategory | undefined>();
  const [selectedType, setSelectedType] = useState<FacilityType | undefined>();
  const [selectedFacility, setSelectedFacility] = useState<PublicFacility | null>(null);

  const cityData = useMemo(() => getCityServiceData(selectedCity), [selectedCity]);
  const stats = useMemo(() => cityData ? getServiceStats(cityData) : null, [cityData]);
  const filteredFacilities = useMemo(() => {
    if (!cityData) return [];
    return filterFacilities(cityData, selectedCategory, selectedType);
  }, [cityData, selectedCategory, selectedType]);
  const coverages = useMemo(() => {
    if (!cityData) return [];
    return calculateCoverage(cityData.facilities, 500000);
  }, [cityData]);

  const facilityTypes: FacilityType[] = [
    'kindergarten', 'primary_school', 'middle_school', 'high_school',
    'hospital', 'clinic', 'community_health',
    'library', 'culture_center', 'sports_center',
    'community_center', 'elderly_care', 'day_care',
  ];

  if (!cityData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>公共服务设施分布 | 城市规划工具箱</title>
        <meta name="description" content="教育、医疗、文体、社区服务设施分布与覆盖率分析" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">公共服务设施分布</h1>
              <p className="text-sm text-gray-500 mt-1">15分钟生活圈设施覆盖率分析</p>
            </div>
            
            {/* 城市选择 */}
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
          {stats && (
            <div className="flex gap-4 mt-3 pt-3 border-t text-sm">
              <span className="text-gray-600">总设施: <strong>{stats.total}</strong></span>
              <span className="text-blue-600">教育: {stats.education}</span>
              <span className="text-red-600">医疗: {stats.medical}</span>
              <span className="text-purple-600">文体: {stats.culture}</span>
              <span className="text-green-600">社区: {stats.community}</span>
            </div>
          )}
        </div>

        {/* 筛选和主内容 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 左侧：筛选和列表 */}
          <div className="space-y-4">
            {/* 类别筛选 */}
            <div className="bg-white rounded-lg shadow-sm p-3">
              <h3 className="text-sm font-medium text-gray-700 mb-2">设施类别</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setSelectedCategory(undefined); setSelectedType(undefined); }}
                  className={`px-3 py-1 rounded text-xs ${
                    !selectedCategory ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  全部
                </button>
                {(Object.keys(categoryNames) as FacilityCategory[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setSelectedType(undefined); }}
                    className={`px-3 py-1 rounded text-xs ${
                      selectedCategory === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {categoryNames[cat]}
                  </button>
                ))}
              </div>

              {selectedCategory && (
                <div className="mt-2 pt-2 border-t">
                  <h4 className="text-xs text-gray-500 mb-1">设施类型</h4>
                  <div className="flex flex-wrap gap-1">
                    {facilityTypes
                      .filter(t => cityData.facilities.some(f => f.type === t && f.category === selectedCategory))
                      .map(type => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(selectedType === type ? undefined : type)}
                          className={`px-2 py-0.5 rounded text-xs ${
                            selectedType === type ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {facilityTypeNames[type]}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* 设施列表 */}
            <div className="bg-white rounded-lg shadow-sm p-3 max-h-[500px] overflow-y-auto">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                设施列表 ({filteredFacilities.length})
              </h3>
              <div className="space-y-2">
                {filteredFacilities.slice(0, 50).map(facility => (
                  <button
                    key={facility.id}
                    onClick={() => setSelectedFacility(facility)}
                    className={`w-full text-left p-2 rounded border ${
                      selectedFacility?.id === facility.id 
                        ? 'border-gray-900 bg-gray-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900">{facility.name}</div>
                    <div className="text-xs text-gray-500 flex justify-between mt-1">
                      <span>{facilityTypeNames[facility.type]}</span>
                      <span>{facility.coverageRadius}m 服务半径</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 中间：地图 */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm overflow-hidden h-[600px]">
            <PublicServiceMap
              facilities={filteredFacilities}
              center={cityData.center}
              selectedCategory={selectedCategory}
              selectedType={selectedType}
              onFacilityClick={setSelectedFacility}
            />
          </div>

          {/* 右侧：详情和覆盖率 */}
          <div className="space-y-4">
            {/* 选中设施详情 */}
            {selectedFacility && (
              <div className="bg-white rounded-lg shadow-sm p-3">
                <h3 className="text-sm font-medium text-gray-900 mb-2">{selectedFacility.name}</h3>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>类型: {facilityTypeNames[selectedFacility.type]}</p>
                  <p>地址: {selectedFacility.address}</p>
                  {selectedFacility.capacity && <p>容量: {selectedFacility.capacity}人</p>}
                  {selectedFacility.area && <p>面积: {selectedFacility.area}㎡</p>}
                  {selectedFacility.level && <p>等级: {selectedFacility.level}</p>}
                  <p>服务半径: {selectedFacility.coverageRadius}米</p>
                  {selectedFacility.servedPopulation && <p>服务人口: {selectedFacility.servedPopulation}人</p>}
                  {selectedFacility.openingHours && <p>开放时间: {selectedFacility.openingHours}</p>}
                </div>
              </div>
            )}

            {/* 覆盖率分析 */}
            <div className="bg-white rounded-lg shadow-sm p-3">
              <h3 className="text-sm font-medium text-gray-700 mb-2">覆盖率分析</h3>
              <div className="space-y-2">
                {coverages.slice(0, 8).map(coverage => (
                  <div key={coverage.facilityType} className="text-xs">
                    <div className="flex justify-between text-gray-600 mb-0.5">
                      <span>{facilityTypeNames[coverage.facilityType]}</span>
                      <span>{coverage.coverageRate}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gray-800 rounded-full"
                        style={{ width: `${coverage.coverageRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 区县统计 */}
            <div className="bg-white rounded-lg shadow-sm p-3">
              <h3 className="text-sm font-medium text-gray-700 mb-2">各区设施统计</h3>
              <div className="space-y-2 text-xs">
                {cityData.districtStats.map(district => (
                  <div key={district.district} className="border-b pb-2 last:border-0">
                    <div className="flex justify-between font-medium text-gray-900">
                      <span>{district.district}</span>
                      <span>{district.score}分</span>
                    </div>
                    <div className="text-gray-500 mt-1">
                      教育{district.facilities.education} 医疗{district.facilities.medical} 
                      文体{district.facilities.culture} 社区{district.facilities.community}
                    </div>
                    <div className="text-gray-400 mt-0.5">
                      15分钟覆盖率: {district.coverage['15min']}%
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