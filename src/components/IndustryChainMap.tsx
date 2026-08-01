"use client";

import { useMemo } from "react";
import SchematicMap from "./SchematicMap";
import OsmMap from "@/components/OsmMap";
import { useMapMode } from "@/context/MapModeContext";
import {
  type IndustryChain,
  type ChainNode,
  CHAIN_LEVEL_LABELS,
} from "@/lib/industry-chain-data";

interface IndustryChainMapProps {
  chain: IndustryChain | null;
  height?: string;
  onNodeClick?: (node: ChainNode) => void;
}

const LEVEL_TO_CATEGORY: Record<string, 0 | 1 | 2 | 3 | 4> = {
  leader: 0,
  upstream: 1,
  midstream: 2,
  downstream: 3,
  supporting: 4,
};

const LEVEL_TO_RADIUS: Record<string, number> = {
  leader: 6,
  upstream: 4,
  midstream: 5,
  downstream: 4,
  supporting: 3,
};

export default function IndustryChainMap({
  chain,
  height = "h-[500px]",
  onNodeClick,
}: IndustryChainMapProps) {
  const { mode } = useMapMode();

  const mapData = useMemo(() => {
    const legend = [
      { label: "链主", kind: "point" as const, category: 0 },
      { label: "上游", kind: "point" as const, category: 1 },
      { label: "中游", kind: "point" as const, category: 2 },
      { label: "下游", kind: "point" as const, category: 3 },
      { label: "配套", kind: "point" as const, category: 4 },
      { label: "协作", kind: "line" as const, shade: 500 },
    ];

    if (!chain) {
      return {
        title: "产业链图谱示意图",
        legend,
        points: [],
        polylines: [],
        markers: [],
      };
    }

    const LNG_MIN = 116.0;
    const LNG_MAX = 116.6;
    const LAT_MIN = 39.7;
    const LAT_MAX = 40.1;

    const nodePositions: Record<string, { lng: number; lat: number }> = {};
    const points: Array<{
      id: string;
      lng: number;
      lat: number;
      category: 0 | 1 | 2 | 3 | 4;
      r: number;
      label: string;
      onClick?: () => void;
    }> = [];
    const markers: Array<{
      id: string;
      lng: number;
      lat: number;
      label: string;
      kind: 0 | 1 | 2 | 3;
    }> = [];
    const polylines: Array<{
      id: string;
      path: Array<{ lng: number; lat: number }>;
      style: 1 | 2 | 3;
      shade: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
      width: number;
      label?: string;
    }> = [];

    const nodes = chain.nodes;

    nodes.forEach((node, idx) => {
      const levelIdx = node.level === "upstream" ? 0 : node.level === "midstream" ? 1 : 2;
      const baseLng = LNG_MIN + (LNG_MAX - LNG_MIN) * (0.15 + levelIdx * 0.35);
      const sameLevelNodes = nodes.filter((n) => n.level === node.level);
      const levelPos = sameLevelNodes.findIndex((n) => n.id === node.id);
      const count = sameLevelNodes.length;
      const latStep = count > 1 ? (LAT_MAX - LAT_MIN) * 0.6 / (count - 1) : 0;
      const baseLat = count === 1
        ? (LAT_MIN + LAT_MAX) / 2
        : LAT_MIN + (LAT_MAX - LAT_MIN) * 0.2 + levelPos * latStep;

      const jitterLng = (Math.sin(idx * 13.37) - 0.5) * 0.02;
      const jitterLat = (Math.cos(idx * 17.23) - 0.5) * 0.02;

      const lng = baseLng + jitterLng;
      const lat = baseLat + jitterLat;

      nodePositions[node.id] = { lng, lat };

      points.push({
        id: node.id,
        lng,
        lat,
        category: LEVEL_TO_CATEGORY[node.level],
        r: LEVEL_TO_RADIUS[node.level],
        label: `${node.name} (${CHAIN_LEVEL_LABELS[node.level]})`,
        onClick: () => onNodeClick?.(node),
      });

      if (node.level === "midstream" && node.companies.length > 0) {
        markers.push({
          id: `${node.id}-leader`,
          lng: lng + 0.01,
          lat: lat + 0.015,
          label: node.companies[0],
          kind: 3,
        });
        const leaderCat: 0 | 1 | 2 | 3 | 4 = 0;
        points.push({
          id: `${node.id}-leader-pt`,
          lng: lng + 0.005,
          lat: lat + 0.008,
          category: leaderCat,
          r: LEVEL_TO_RADIUS.leader,
          label: `链主: ${node.companies[0]}`,
        });
      }

      node.companies.slice(1, 3).forEach((company, ci) => {
        const sLng = lng + (ci - 0.5) * 0.015;
        const sLat = lat - 0.018 - ci * 0.006;
        const supCat: 0 | 1 | 2 | 3 | 4 = 4;
        points.push({
          id: `${node.id}-sup-${ci}`,
          lng: sLng,
          lat: sLat,
          category: supCat,
          r: LEVEL_TO_RADIUS.supporting,
          label: `配套: ${company}`,
        });
        polylines.push({
          id: `${node.id}-line-sup-${ci}`,
          path: [
            { lng, lat },
            { lng: sLng, lat: sLat },
          ],
          style: 1,
          shade: 500,
          width: 1,
          label: "协作配套",
        });
      });
    });

    const upstreamNodes = nodes.filter((n) => n.level === "upstream");
    const midstreamNodes = nodes.filter((n) => n.level === "midstream");
    const downstreamNodes = nodes.filter((n) => n.level === "downstream");

    midstreamNodes.forEach((mid) => {
      upstreamNodes.forEach((up) => {
        const from = nodePositions[up.id];
        const to = nodePositions[mid.id];
        if (from && to) {
          polylines.push({
            id: `${up.id}-${mid.id}`,
            path: [from, to],
            style: 1,
            shade: 500,
            width: 1,
            label: "上游供应",
          });
        }
      });
      downstreamNodes.forEach((down) => {
        const from = nodePositions[mid.id];
        const to = nodePositions[down.id];
        if (from && to) {
          polylines.push({
            id: `${mid.id}-${down.id}`,
            path: [from, to],
            style: 1,
            shade: 500,
            width: 1,
            label: "下游配送",
          });
        }
      });
    });

    return {
      title: `${chain.name} - 产业链示意图`,
      legend,
      points,
      polylines,
      markers,
    };
  }, [chain, onNodeClick]);

  if (mode === "schematic") {
    return (
      <div className={`w-full ${height}`}>
        <SchematicMap
          width={800}
          height={500}
          points={mapData.points}
          polylines={mapData.polylines}
          markers={mapData.markers}
          legend={mapData.legend}
          title={mapData.title}
          showCompass
          className="w-full"
        />
      </div>
    );
  }

  if (mode === "osm") {
    return (
      <div className={`w-full ${height}`}>
        <OsmMap
          height={500}
          points={mapData.points}
          polylines={mapData.polylines}
          markers={mapData.markers}
          legend={mapData.legend}
          title={mapData.title}
        />
      </div>
    );
  }

  return (
    <div className={`w-full ${height} bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200`}>
      <span className="text-gray-400 text-xs">请切换至示意图模式查看产业链图谱</span>
    </div>
  );
}
