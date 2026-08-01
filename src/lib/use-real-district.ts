"use client";

import { useState, useCallback } from "react";

/**
 * 真实行政区划边界查询 Hook
 * 通过 /api/amap/district 代理调用高德 API
 * 用于区域探索，获取真实行政边界
 */

export interface DistrictBoundary {
  adcode: string;
  name: string;
  level: string;
  center: string;
  polyline: string;   // 边界点串 "lng,lat;lng,lat;..."
  districts: DistrictBoundary[];
  source: "amap";
}

interface UseRealDistrictResult {
  district: DistrictBoundary | null;
  loading: boolean;
  error: string | null;
  isRealData: boolean;
  query: (params: {
    keywords: string;
    subdistrict?: number;
    extensions?: "base" | "all";
  }) => Promise<void>;
}

export function useRealDistrict(): UseRealDistrictResult {
  const [district, setDistrict] = useState<DistrictBoundary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRealData, setIsRealData] = useState(false);

  const query = useCallback(
    async ({ keywords, subdistrict = 0, extensions = "all" }: {
      keywords: string;
      subdistrict?: number;
      extensions?: "base" | "all";
    }) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          keywords,
          subdistrict: String(subdistrict),
          extensions,
        });
        const res = await fetch(`/api/amap/district?${params.toString()}`);
        const json = await res.json();

        if (!json.ok) {
          setIsRealData(false);
          setError(json.message || json.error || "请求失败");
          setDistrict(null);
          return;
        }

        const districts = json.data?.districts || [];
        if (districts.length === 0) {
          setIsRealData(false);
          setError("未找到该区域");
          setDistrict(null);
          return;
        }

        const mapDistrict = (d: any): DistrictBoundary => ({
          adcode: d.adcode,
          name: d.name,
          level: d.level,
          center: d.center,
          polyline: d.polyline || "",
          districts: (d.districts || []).map(mapDistrict),
          source: "amap",
        });

        setDistrict(mapDistrict(districts[0]));
        setIsRealData(true);
        setError(null);
      } catch (err: any) {
        setIsRealData(false);
        setError(err?.message || "网络异常");
        setDistrict(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { district, loading, error, isRealData, query };
}
