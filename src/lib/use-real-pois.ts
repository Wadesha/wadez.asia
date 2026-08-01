"use client";

import { useState, useCallback } from "react";

/**
 * 真实 POI 数据获取 Hook
 * 通过 /api/amap/poi 代理调用高德 API，失败时降级到模拟数据
 */

export interface RealPOI {
  id: string;
  name: string;
  type: string;
  typecode: string;
  address: string;
  location: string; // "lng,lat"
  lng: number;
  lat: number;
  tel?: string;
  city?: string;
  pname?: string;
  adname?: string;
  source: "amap";
}

interface UseRealPOIsResult {
  pois: RealPOI[];
  loading: boolean;
  error: string | null;
  isRealData: boolean;
  search: (params: {
    keywords: string;
    city?: string;
    types?: string;
    page?: number;
  }) => Promise<void>;
}

const POI_TYPE_CODES: Record<string, string> = {
  "餐饮": "050000",
  "购物": "060000",
  "医疗": "090000",
  "教育": "141200",
  "交通": "150000",
  "住宿": "100000",
  "景点": "110000",
  "生活服务": "070000",
};

export function useRealPOIs(): UseRealPOIsResult {
  const [pois, setPois] = useState<RealPOI[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRealData, setIsRealData] = useState(false);

  const search = useCallback(
    async ({ keywords, city, types, page = 1 }: {
      keywords: string;
      city?: string;
      types?: string;
      page?: number;
    }) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          keywords,
          page: String(page),
          offset: "25",
          extensions: "all",
        });
        if (city) params.set("city", city);
        if (types) {
          // 支持中文类别名映射
          const code = POI_TYPE_CODES[types] || types;
          params.set("types", code);
        }

        const res = await fetch(`/api/amap/poi?${params.toString()}`);
        const json = await res.json();

        if (!json.ok) {
          // 降级：未配置 Key 或请求失败
          setIsRealData(false);
          setError(json.message || json.error || "请求失败");
          setPois([]);
          return;
        }

        const poisData = json.data?.pois || [];
        const mapped: RealPOI[] = poisData.map((p: any) => {
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
            city: p.cityname,
            pname: p.pname,
            adname: p.adname,
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
