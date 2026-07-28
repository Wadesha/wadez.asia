'use client';

import { useEffect, useRef, useState } from 'react';
import { PublicFacility, FacilityCategory, FacilityType, facilityTypeNames, categoryNames } from '@/lib/public-service-data';

interface PublicServiceMapProps {
  facilities: PublicFacility[];
  center: { lng: number; lat: number };
  selectedCategory?: FacilityCategory;
  selectedType?: FacilityType;
  onFacilityClick?: (facility: PublicFacility) => void;
}

const categoryColors: Record<FacilityCategory, string> = {
  education: '#3B82F6',   // 蓝色
  medical: '#EF4444',     // 红色
  culture: '#8B5CF6',     // 紫色
  community: '#10B981',   // 绿色
};

const typeIcons: Record<FacilityType, string> = {
  kindergarten: '🎒',
  primary_school: '📖',
  middle_school: '📚',
  high_school: '🎓',
  hospital: '🏥',
  clinic: '💊',
  community_health: '🏠',
  library: '📖',
  culture_center: '🎭',
  sports_center: '⚽',
  community_center: '🏘️',
  elderly_care: '👴',
  day_care: '👶',
};

export default function PublicServiceMap({
  facilities,
  center,
  selectedCategory,
  selectedType,
  onFacilityClick,
}: PublicServiceMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  // 初始化地图
  useEffect(() => {
    if (!mapRef.current || map) return;

    const initMap = async () => {
      const AMap = (window as any).AMap;
      if (!AMap) {
        console.error('高德地图 API 未加载');
        return;
      }

      const mapInstance = new AMap.Map(mapRef.current, {
        zoom: 12,
        center: [center.lng, center.lat],
        mapStyle: 'amap://styles/normal',
      });

      setMap(mapInstance);
    };

    // 确保 AMap 已加载
    if ((window as any).AMap) {
      initMap();
    } else {
      const checkInterval = setInterval(() => {
        if ((window as any).AMap) {
          clearInterval(checkInterval);
          initMap();
        }
      }, 100);

      return () => clearInterval(checkInterval);
    }
  }, [center]);

  // 更新标记
  useEffect(() => {
    if (!map) return;

    // 清除旧标记
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    const AMap = (window as any).AMap;
    if (!AMap) return;

    // 筛选设施
    let filtered = facilities;
    if (selectedCategory) {
      filtered = filtered.filter(f => f.category === selectedCategory);
    }
    if (selectedType) {
      filtered = filtered.filter(f => f.type === selectedType);
    }

    // 添加新标记
    const newMarkers = filtered.map(facility => {
      const color = categoryColors[facility.category];
      const icon = typeIcons[facility.type];

      const marker = new AMap.Marker({
        position: [facility.location.lng, facility.location.lat],
        content: `
          <div style="
            width: 28px;
            height: 28px;
            background: ${color};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            border: 2px solid #fff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            cursor: pointer;
          ">${icon}</div>
        `,
      });

      marker.on('click', () => {
        if (onFacilityClick) {
          onFacilityClick(facility);
        }
      });

      marker.setMap(map);
      return marker;
    });

    setMarkers(newMarkers);

    // 自适应视野
    if (newMarkers.length > 0) {
      map.setFitView(newMarkers, false, [50, 50, 50, 50]);
    }
  }, [map, facilities, selectedCategory, selectedType]);

  return (
    <div className="relative h-full">
      <div ref={mapRef} className="h-full w-full" />
      
      {/* 图例 */}
      <div className="absolute bottom-4 left-4 bg-white/95 px-3 py-2 rounded shadow text-xs">
        <div className="font-medium mb-1 text-gray-700">设施类别</div>
        {Object.entries(categoryNames).map(([cat, name]) => (
          <div key={cat} className="flex items-center gap-2 py-0.5">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ background: categoryColors[cat as FacilityCategory] }}
            />
            <span className="text-gray-600">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}