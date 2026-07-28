"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  POIData,
  loadAllPOIs,
  findPOIById,
  CITIES,
  CATEGORY_LABELS,
} from "@/lib/poi-data";

export default function POIDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [pois, setPois] = useState<POIData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllPOIs().then((data) => {
      setPois(data);
      setLoading(false);
    });
  }, []);

  const poi = useMemo(() => findPOIById(pois, id), [pois, id]);

  const nearbyPOIs = useMemo(() => {
    if (!poi) return [];
    return pois
      .filter((p) => p.city === poi.city && p.id !== poi.id)
      .map((p) => ({
        ...p,
        distance: calculateDistance(
          poi.latitude,
          poi.longitude,
          p.latitude,
          p.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10);
  }, [poi, pois]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-3 py-4">
          <div className="text-center py-12 text-gray-400 text-sm">加载中...</div>
        </div>
      </div>
    );
  }

  if (!poi) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-3 py-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-500 mb-4">未找到该POI</p>
            <Link href="/pois" className="text-gray-600 hover:text-gray-800 text-sm underline">
              返回POI列表
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-3 py-4">
        <div className="mb-3">
          <Link href="/pois" className="text-[11px] text-gray-400 hover:text-gray-600">
            ← 返回POI列表
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {poi.name.replace(/\(.*?\)/g, "")}
              </h1>
            </div>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[11px]">
              {poi.categoryLabel}
            </span>
          </div>
          {poi.address && (
            <p className="text-sm text-gray-600 mb-2">{poi.address}</p>
          )}
          <div className="flex flex-wrap gap-3 text-[11px] text-gray-400">
            <span>城市：{poi.city}</span>
            <span>
              坐标：{poi.longitude.toFixed(6)}, {poi.latitude.toFixed(6)}
            </span>
          </div>
        </div>

        {poi.description && (
          <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
            <h2 className="text-sm font-medium text-gray-700 mb-2">类型描述</h2>
            <p className="text-[11px] text-gray-500">{poi.description}</p>
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
          <h2 className="text-sm font-medium text-gray-700 mb-2">
            周边POI ({nearbyPOIs.length})
          </h2>
          <div className="space-y-1.5">
            {nearbyPOIs.map((p) => (
              <Link
                key={p.id}
                href={`/pois/${p.id}`}
                className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-3 px-3"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] shrink-0">
                    {p.categoryLabel}
                  </span>
                  <span className="text-sm text-gray-800 truncate">
                    {p.name.replace(/\(.*?\)/g, "")}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0 ml-2">
                  {formatDistance(p.distance)}
                </span>
              </Link>
            ))}
          </div>
          {nearbyPOIs.length === 0 && (
            <p className="text-[11px] text-gray-400">暂无周边POI数据</p>
          )}
        </div>

        <div className="mt-6 pt-3 border-t border-gray-200 text-[10px] text-gray-400 text-center">
          数据来源：高德地图 API · POI ID: {poi.id}
        </div>

        <div className="mt-3 text-center">
          <Link href="/pois" className="text-gray-400 hover:text-gray-600 text-[10px]">
            返回POI列表
          </Link>
        </div>
      </div>
    </div>
  );
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000;
}

function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}
