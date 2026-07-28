"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { GreenwaySegment, GreenwayNode, GreenwayType, ConnectivityStatus } from "@/lib/greenway-data";
import { GREENWAY_TYPE_COLORS, STATUS_COLORS } from "@/lib/greenway-data";

export type GreenwayColorMode = "type" | "status" | "connectivity";

interface GreenwayMapProps {
  segments: GreenwaySegment[];
  nodes: GreenwayNode[];
  center: [number, number];
  zoom?: number;
  height?: string;
  colorMode: GreenwayColorMode;
  showBreakpoints: boolean;
  onSegmentClick?: (segment: GreenwaySegment) => void;
  onNodeClick?: (node: GreenwayNode) => void;
}

function loadAMapScript(): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any).AMap) {
      resolve((window as any).AMap);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${process.env.NEXT_PUBLIC_AMAP_KEY}&securityCode=${process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE}`;
    script.async = true;
    script.onload = () => {
      const AMap = (window as any).AMap;
      if (AMap) {
        resolve(AMap);
      } else {
        reject(new Error("AMap not loaded"));
      }
    };
    script.onerror = () => {
      reject(new Error("Failed to load AMap script"));
    };
    document.head.appendChild(script);
  });
}

export default function GreenwayMap({
  segments,
  nodes,
  center,
  zoom = 13,
  height = "h-96",
  colorMode,
  showBreakpoints,
  onSegmentClick,
  onNodeClick,
}: GreenwayMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const polylineRef = useRef<any[]>([]);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    let mounted = true;

    loadAMapScript()
      .then((AMap) => {
        if (!mounted || !mapContainerRef.current) return;

        const map = new AMap.Map(mapContainerRef.current, {
          zoom,
          center,
          mapStyle: "amap://styles/light",
          viewMode: "2D",
        });

        mapRef.current = map;
        setMapReady(true);
      })
      .catch((err) => {
        if (mounted) {
          setMapError(err.message);
        }
      });

    return () => {
      mounted = false;
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setZoomAndCenter(zoom, center);
    }
  }, [center, zoom]);

  const clearAll = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    polylineRef.current.forEach((p) => map.remove(p));
    polylineRef.current = [];
    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];
  }, []);

  const getSegmentColor = useCallback(
    (segment: GreenwaySegment): string => {
      if (colorMode === "type") {
        return GREENWAY_TYPE_COLORS[segment.type as GreenwayType] || "#6b7280";
      } else if (colorMode === "status") {
        return STATUS_COLORS[segment.status];
      } else {
        return segment.status === "connected" ? "#22c55e" : "#ef4444";
      }
    },
    [colorMode]
  );

  const drawGreenways = useCallback(() => {
    const map = mapRef.current;
    const AMap = (window as any).AMap;
    if (!map || !AMap || segments.length === 0) return;

    clearAll();

    const sortedSegments = [...segments].sort((a, b) => {
      const order: Record<ConnectivityStatus, number> = {
        connected: 0,
        partial: 1,
        broken: 2,
      };
      return order[a.status] - order[b.status];
    });

    sortedSegments.forEach((segment) => {
      const color = getSegmentColor(segment);
      const width = segment.type === "road-greenbelt" ? 6 :
        segment.type === "riverside" ? 5 :
        segment.type === "eco-corridor" ? 7 : 4;

      const polyline = new AMap.Polyline({
        path: segment.geometry,
        strokeColor: color,
        strokeWeight: width,
        strokeOpacity: 0.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        zIndex: segment.status === "connected" ? 10 : 20,
        cursor: "pointer",
        extData: segment,
      });

      polyline.on("click", () => {
        if (onSegmentClick) {
          onSegmentClick(segment);
        }
      });

      polyline.setMap(map);
      polylineRef.current.push(polyline);
    });

    if (showBreakpoints) {
      const breakpoints = nodes.filter((n) => n.isBreakpoint);

      breakpoints.forEach((node) => {
        const marker = new AMap.Marker({
          position: [node.lng, node.lat],
          content: `
            <div style="
              width:14px;
              height:14px;
              border-radius:50%;
              background:#ef4444;
              border:2px solid #fff;
              box-shadow:0 2px 6px rgba(239,68,68,0.5);
              cursor:pointer;
              display:flex;
              align-items:center;
              justify-content:center;
              color:#fff;
              font-size:9px;
              font-weight:bold;
            ">!</div>
          `,
          offset: new AMap.Pixel(-7, -7),
          title: node.breakReason || "断点",
          zIndex: 100,
          extData: node,
        });

        marker.on("click", () => {
          if (onNodeClick) {
            onNodeClick(node);
          }
        });

        marker.setMap(map);
        markersRef.current.push(marker);
      });
    }
  }, [segments, nodes, getSegmentColor, showBreakpoints, clearAll, onSegmentClick, onNodeClick]);

  useEffect(() => {
    if (mapReady) {
      drawGreenways();
    }
  }, [mapReady, drawGreenways]);

  if (mapError) {
    return (
      <div
        className={`w-full ${height} bg-gray-100 rounded-lg flex items-center justify-center`}
      >
        <span className="text-gray-400 text-xs">地图加载失败</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={mapContainerRef}
        className={`w-full ${height} rounded-lg bg-gray-100`}
      ></div>
    </div>
  );
}
