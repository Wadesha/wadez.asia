"use client";

import { useState, useCallback } from "react";

/**
 * 真实周边搜索 Hook
 * 通过 /api/amap/around 代理调用高德 API
 * 用于建筑形态、街道句法、绿道等子网站获取周边真实POI
 */

export interface RealAroundPOI {
  id: string;
  name: string;
  type: string;
  typecode: string;
  address: string;
  location: string;
  lng: number;
  lat: number;
  tel?: string;
  distance: number;
  source: "amap";
}

interface UseRealAroundResult {
  pois: RealAroundPOI[];
  loading: boolean;
  error: string | null;
  isRealData: boolean;
  search: (params: {
    location: string;        // "lng,lat"
    types?: string;          // POI类型code
    radius?: number;         // 搜索半径(米)
    keywords?: string;
    page?: number;
  }) => Promise<void>;
}

// 建筑相关POI类型码
export const BUILDING_TYPE_CODES = "120000";    // 商务住宅
// 道路相关POI类型码
export const ROAD_TYPE_CODES = "150000";        // 交通设施服务
// 绿地公园相关POI类型码
export const GREEN_TYPE_CODES = "110101";       // 公园广场

export function useRealAround(): UseRealAroundResult {
  const [pois, setPois] = useState<RealAroundPOI[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRealData, setIsRealData] = useState(false);

  const search = useCallback(
    async ({ location, types, radius = 3000, keywords, page = 1 }: {
      location: string;
      types?: string;
      radius?: number;
      keywords?: string;
      page?: number;
    }) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          location,
          radius: String(radius),
          page: String(page),
          offset: "25",
          extensions: "all",
        });
        if (types) params.set("types", types);
        if (keywords) params.set("keywords", keywords);

        const res = await fetch(`/api/amap/around?${params.toString()}`);
        const json = await res.json();

        if (!json.ok) {
          setIsRealData(false);
          setError(json.message || json.error || "请求失败");
          setPois([]);
          return;
        }

        const poisData = json.data?.pois || [];
        const mapped: RealAroundPOI[] = poisData.map((p: any) => {
          const [lng, lat] = (p.location || "0,0").split(",").map(Number);
          return {
            id: p.id,
            name: p.name,
            type: p.type || "",
            typecode: p.typecode || "",
            address: p.address || "",
            location: p.location || "",
            lng,
            lat,
            tel: p.tel,
            distance: Number(p.distance) || 0,
            source: "amap" as const,
          };
        });

        setPois(mapped);
        setIsRealData(true);
        setError(null);
      } catch (err: any) {
        setIsRealData(false);
        setError(err?.message || "网络异常");
        setPois([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { pois, loading, error, isRealData, search };
}
