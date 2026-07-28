"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { StreetEdge, StreetNode } from "@/lib/street-network-data";
import type { NetworkMetric } from "@/lib/street-network-data";
import { getMetricColor } from "@/lib/street-network-data";

interface StreetNetworkMapProps {
  edges: StreetEdge[];
  nodes: StreetNode[];
  center: [number, number];
  zoom?: number;
  height?: string;
  metric: NetworkMetric;
  onEdgeClick?: (edge: StreetEdge) => void;
  onNodeClick?: (node: StreetNode) => void;
  showNodes?: boolean;
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

export default function StreetNetworkMap({
  edges,
  nodes,
  center,
  zoom = 15,
  height = "h-96",
  metric,
  onEdgeClick,
  onNodeClick,
  showNodes = false,
}: StreetNetworkMapProps) {
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

  const getEdgeMetricValue = useCallback(
    (edge: StreetEdge): number => {
      switch (metric) {
        case "betweenness":
          return edge.betweenness;
        case "closeness":
          return edge.closeness;
        case "straightness":
          return edge.straightness;
        case "integration":
          return edge.integration;
        case "degree":
          return 0.5;
      }
    },
    [metric]
  );

  const getNodeMetricValue = useCallback(
    (node: StreetNode): number => {
      switch (metric) {
        case "betweenness":
          return node.betweenness;
        case "closeness":
          return node.closeness;
        case "integration":
          return node.integration;
        case "degree":
          return node.degree / 8;
        case "straightness":
          return 0.5;
      }
    },
    [metric]
  );

  const drawNetwork = useCallback(() => {
    const map = mapRef.current;
    const AMap = (window as any).AMap;
    if (!map || !AMap || edges.length === 0) return;

    clearAll();

    const maxMetric = Math.max(...edges.map((e) => getEdgeMetricValue(e)), 0.01);

    const sortedEdges = [...edges].sort(
      (a, b) => getEdgeMetricValue(a) - getEdgeMetricValue(b)
    );

    sortedEdges.forEach((edge) => {
      const value = getEdgeMetricValue(edge);
      const color = getMetricColor(value, maxMetric);

      const baseWeight = edge.roadClass === "highway" ? 5 :
        edge.roadClass === "main" ? 4 :
        edge.roadClass === "secondary" ? 3 :
        edge.roadClass === "local" ? 2 : 1.5;
      const weight = baseWeight * (0.6 + (value / maxMetric) * 0.8);

      const polyline = new AMap.Polyline({
        path: edge.geometry,
        strokeColor: color,
        strokeWeight: weight,
        strokeOpacity: 0.85,
        strokeLinecap: "round",
        strokeLineJoin: "round",
        zIndex: Math.floor(value * 100),
        cursor: "pointer",
        extData: edge,
      });

      polyline.on("click", () => {
        if (onEdgeClick) {
          onEdgeClick(edge);
        }
      });

      polyline.setMap(map);
      polylineRef.current.push(polyline);
    });

    if (showNodes) {
      const maxNodeMetric = Math.max(
        ...nodes.map((n) => getNodeMetricValue(n)),
        0.01
      );

      nodes.forEach((node) => {
        const value = getNodeMetricValue(node);
        const color = getMetricColor(value, maxNodeMetric);
        const size = 3 + value * 6;

        const marker = new AMap.Marker({
          position: [node.lng, node.lat],
          content: `
            <div style="
              width:${size}px;
              height:${size}px;
              border-radius:50%;
              background:${color};
              border:1.5px solid #fff;
              box-shadow:0 1px 3px rgba(0,0,0,0.2);
              cursor:pointer;
            "></div>
          `,
          offset: new AMap.Pixel(-size / 2, -size / 2),
          title: `路口 (度: ${node.degree})`,
          zIndex: 1000 + Math.floor(value * 100),
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
  }, [edges, nodes, getEdgeMetricValue, getNodeMetricValue, clearAll, onEdgeClick, onNodeClick, showNodes]);

  useEffect(() => {
    if (mapReady) {
      drawNetwork();
    }
  }, [mapReady, drawNetwork]);

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
