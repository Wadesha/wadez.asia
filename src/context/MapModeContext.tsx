"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isAMapConfigured } from "@/lib/load-amap";

export type MapMode = "schematic" | "osm" | "amap";

const STORAGE_KEY = "wadez.map-mode";

interface MapModeContextValue {
  mode: MapMode;
  setMode: (m: MapMode) => void;
  availableModes: { mode: MapMode; available: boolean; reason?: string }[];
}

const MapModeContext = createContext<MapModeContextValue | null>(null);

export function MapModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<MapMode>("schematic");

  // 初始化：读 localStorage + 检查可用
  useEffect(() => {
    try {
      const saved = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as MapMode | null;
      if (saved === "schematic" || saved === "osm" || saved === "amap") {
        setModeState(saved);
        return;
      }
    } catch {
      // ignore
    }
    // 第一次访问：有高德Key默认amap，否则schematic
    if (isAMapConfigured()) {
      setModeState("amap");
    } else {
      setModeState("schematic");
    }
  }, []);

  const setMode = useCallback((m: MapMode) => {
    setModeState(m);
    try {
      if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, m);
    } catch {
      // ignore
    }
  }, []);

  const availableModes = useMemo(() => {
    return [
      { mode: "schematic" as MapMode, available: true },
      { mode: "osm" as MapMode, available: true },
      { mode: "amap" as MapMode, available: isAMapConfigured(), reason: isAMapConfigured() ? undefined : "未配置高德 API Key" },
    ];
  }, []);

  const value = useMemo(() => ({ mode, setMode, availableModes }), [mode, setMode, availableModes]);

  return <MapModeContext.Provider value={value}>{children}</MapModeContext.Provider>;
}

export function useMapMode(): MapModeContextValue {
  const ctx = useContext(MapModeContext);
  if (!ctx) {
    // 兜底返回 schematic，防止未包裹Provider就使用
    return {
      mode: "schematic",
      setMode: () => {},
      availableModes: [
        { mode: "schematic", available: true },
        { mode: "osm", available: true },
        { mode: "amap", available: isAMapConfigured() },
      ],
    };
  }
  return ctx;
}
