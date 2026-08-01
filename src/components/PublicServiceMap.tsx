'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { loadAMap, isAMapConfigured } from "@/lib/load-amap";
import { PublicFacility, FacilityCategory, FacilityType, facilityTypeNames, categoryNames, facilityCategoryMap } from '@/lib/public-service-data';
import SchematicMap, { type SchematicPoint } from "@/components/SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";

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

function getFacilityCategory(facility: PublicFacility): 0 | 1 | 2 | 3 | 4 {
  if (facility.category === "education") return 0;
  if (facility.category === "medical") return 1;
  if (facility.category === "culture") return 2;
  if (facility.type === "elderly_care" || facility.type === "day_care") return 3;
  return 4;
}

const CATEGORY_LEGEND: Array<{ label: string; kind: "point"; category: 0 | 1 | 2 | 3 | 4 }> = [
  { label: "教育设施", kind: "point", category: 0 },
  { label: "医疗设施", kind: "point", category: 1 },
  { label: "文体设施", kind: "point", category: 2 },
  { label: "养老设施", kind: "point", category: 3 },
  { label: "社区/其他", kind: "point", category: 4 },
];

export default function PublicServiceMap({
  facilities,
  center,
  selectedCategory,
  selectedType,
  onFacilityClick,
}: PublicServiceMapProps) {
  const { mode } = useMapMode();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const filteredFacilities = useMemo(() => {
    let result = facilities;
    if (selectedCategory) {
      result = result.filter((f) => f.category === selectedCategory);
    }
    if (selectedType) {
      result = result.filter((f) => f.type === selectedType);
    }
    return result;
  }, [facilities, selectedCategory, selectedType]);

  const schematicPoints = useMemo<SchematicPoint[]>(() => {
    return filteredFacilities.map((f) => ({
      id: f.id,
      lng: f.location.lng,
      lat: f.location.lat,
      label: `${f.name} · ${facilityTypeNames[f.type]}`,
      category: getFacilityCategory(f),
      r: 5,
      onClick: onFacilityClick ? () => onFacilityClick(f) : undefined,
    }));
  }, [filteredFacilities, onFacilityClick]);

  const presentCats = useMemo(() => {
    const set = new Set<number>(filteredFacilities.map((f) => getFacilityCategory(f)));
    return CATEGORY_LEGEND.filter((l) => set.has(l.category));
  }, [filteredFacilities]);

  if (mode === "schematic") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200 h-full">
        <SchematicMap
          width={800}
          height={500}
          points={schematicPoints}
          legend={presentCats}
          title="公共服务设施示意图"
          showCompass
        />
      </div>
    );
  }

  if (mode === "osm") {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200 h-full">
        <OsmMap
          width={800}
          height={500}
          points={schematicPoints}
          legend={presentCats}
          title="公共服务设施示意图"
        />
      </div>
    );
  }

  // 初始化地图
  useEffect(() => {
    if (!mapRef.current || map) return;
    if (!isAMapConfigured()) {
      setMapError("高德地图 API Key 未配置");
      return;
    }

    let cancelled = false;
    loadAMap()
      .then((AMap) => {
        if (cancelled || !mapRef.current || map) return;
        const mapInstance = new AMap.Map(mapRef.current, {
          zoom: 12,
          center: [center.lng, center.lat],
          mapStyle: 'amap://styles/normal',
        });
        setMap(mapInstance);
      })
      .catch((err) => {
        if (!cancelled) setMapError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [center]);

  // 更新标记
  useEffect(() => {
    if (!map) return;

    // 清除旧标记
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    const AMap = (window as any).AMap;
    if (!AMap) return;

    // 添加新标记
    const newMarkers = filteredFacilities.map(facility => {
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
  }, [map, filteredFacilities, onFacilityClick]);

  if (mapError) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400 text-xs">{mapError}</span>
      </div>
    );
  }

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