"use client";

import { useState, useCallback } from "react";

/**
 * 真实步行路径规划 Hook
 * 通过 /api/amap/walking 代理调用高德 API
 * 用于可达性分析，计算真实步行距离和时间
 */

export interface WalkingStep {
  instruction: string;
  road: string;
  distance: number;
  duration: number;
  polyline: string;
}

export interface WalkingRoute {
  origin: string;
  destination: string;
  distance: number;
  duration: number;
  steps: WalkingStep[];
  polyline: string;
  source: "amap";
}

interface UseRealWalkingResult {
  route: WalkingRoute | null;
  loading: boolean;
  error: string | null;
  isRealData: boolean;
  plan: (origin: string, destination: string) => Promise<void>;
}

export function useRealWalking(): UseRealWalkingResult {
  const [route, setRoute] = useState<WalkingRoute | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRealData, setIsRealData] = useState(false);

  const plan = useCallback(async (origin: string, destination: string) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ origin, destination });
      const res = await fetch(`/api/amap/walking?${params.toString()}`);
      const json = await res.json();

      if (!json.ok) {
        setIsRealData(false);
        setError(json.message || json.error || "请求失败");
        setRoute(null);
        return;
      }

      const paths = json.data?.route?.paths || [];
      if (paths.length === 0) {
        setIsRealData(false);
        setError("未找到可行路径");
        setRoute(null);
        return;
      }

      const path = paths[0];
      const steps: WalkingStep[] = (path.steps || []).map((s: any) => ({
        instruction: s.instruction,
        road: s.road,
        distance: Number(s.distance),
        duration: Number(s.duration),
        polyline: s.polyline,
      }));

      const mapped: WalkingRoute = {
        origin: path.origin || origin,
        destination: path.destination || destination,
        distance: Number(path.distance),
        duration: Number(path.duration),
        steps,
        polyline: steps.map((s) => s.polyline).join(";"),
        source: "amap",
      };

      setRoute(mapped);
      setIsRealData(true);
      setError(null);
    } catch (err: any) {
      setIsRealData(false);
      setError(err?.message || "网络异常");
      setRoute(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { route, loading, error, isRealData, plan };
}
