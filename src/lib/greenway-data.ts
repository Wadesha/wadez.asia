export type GreenwayType =
  | "riverside"
  | "park-ring"
  | "road-greenbelt"
  | "pedestrian-street"
  | "eco-corridor"
  | "bike-lane";

export type ConnectivityStatus = "connected" | "partial" | "broken";

export interface GreenwaySegment {
  id: string;
  name: string;
  type: GreenwayType;
  lengthM: number;
  widthM: number;
  surface: string;
  status: ConnectivityStatus;
  geometry: [number, number][];
  greenwayId: string;
}

export interface GreenwayNode {
  id: string;
  lng: number;
  lat: number;
  isBreakpoint: boolean;
  breakReason?: string;
  connectedSegments: string[];
}

export interface Greenway {
  id: string;
  name: string;
  city: string;
  type: GreenwayType;
  description: string;
  totalLengthKm: number;
  connectivityScore: number;
  alphaIndex: number;
  betaIndex: number;
  gammaIndex: number;
  coveragePercent: number;
  segments: GreenwaySegment[];
  nodes: GreenwayNode[];
}

const GREENWAY_TYPE_LABELS: Record<GreenwayType, string> = {
  riverside: "滨水绿道",
  "park-ring": "公园环道",
  "road-greenbelt": "道路绿带",
  "pedestrian-street": "步行街道",
  "eco-corridor": "生态廊道",
  "bike-lane": "自行车专用道",
};

const GREENWAY_TYPE_COLORS: Record<GreenwayType, string> = {
  riverside: "#0ea5e9",
  "park-ring": "#22c55e",
  "road-greenbelt": "#84cc16",
  "pedestrian-street": "#f59e0b",
  "eco-corridor": "#10b981",
  "bike-lane": "#6366f1",
};

const STATUS_LABELS: Record<ConnectivityStatus, string> = {
  connected: "连通",
  partial: "部分连通",
  broken: "断点",
};

const STATUS_COLORS: Record<ConnectivityStatus, string> = {
  connected: "#22c55e",
  partial: "#f59e0b",
  broken: "#ef4444",
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

interface GreenwayTemplate {
  id: string;
  name: string;
  city: string;
  type: GreenwayType;
  description: string;
  center: [number, number];
  totalLengthKm: number;
  segmentCount: number;
  breakpointCount: number;
  shape: "ring" | "linear" | "branching" | "network";
}

const GREENWAY_TEMPLATES: GreenwayTemplate[] = [
  {
    id: "olympic-ring",
    name: "奥林匹克森林公园环道",
    city: "北京",
    type: "park-ring",
    description:
      "环绕奥林匹克森林公园的环形绿道，全程约10公里，是北京热门跑步和骑行胜地。",
    center: [116.39, 40.02],
    totalLengthKm: 10.2,
    segmentCount: 8,
    breakpointCount: 1,
    shape: "ring",
  },
  {
    id: "north-canal",
    name: "北运河滨水绿道",
    city: "北京",
    type: "riverside",
    description:
      "沿北运河两岸的线性滨水绿道，部分河段存在过街天桥、下穿隧道等断点。",
    center: [116.67, 39.91],
    totalLengthKm: 15.6,
    segmentCount: 12,
    breakpointCount: 4,
    shape: "linear",
  },
  {
    id: "third-ring-greenbelt",
    name: "三环绿带",
    city: "北京",
    type: "road-greenbelt",
    description:
      "沿三环路的道路绿化带，多段式分布，部分立交节点存在连通断点。",
    center: [116.45, 39.86],
    totalLengthKm: 48.0,
    segmentCount: 24,
    breakpointCount: 8,
    shape: "ring",
  },
  {
    id: "wangfujing-pedestrian",
    name: "王府井步行系统",
    city: "北京",
    type: "pedestrian-street",
    description:
      "以王府井大街为核心的步行街区网络，连接多个商业节点和胡同片区。",
    center: [116.415, 39.915],
    totalLengthKm: 4.8,
    segmentCount: 10,
    breakpointCount: 2,
    shape: "network",
  },
  {
    id: "olympic-corridor",
    name: "奥林匹克生态廊道",
    city: "北京",
    type: "eco-corridor",
    description:
      "连接多个城市公园的生态廊道系统，为野生动物迁徙提供通道，部分路段需穿越城市道路。",
    center: [116.42, 40.0],
    totalLengthKm: 8.5,
    segmentCount: 6,
    breakpointCount: 3,
    shape: "branching",
  },
];

function generateGreenway(template: GreenwayTemplate, seed: number): Greenway {
  const rand = seededRandom(seed);
  const degreesPerKm = 0.009;
  const segments: GreenwaySegment[] = [];
  const nodes: GreenwayNode[] = [];
  let nodeId = 0;

  const generateRingPath = (): [number, number][] => {
    const points = 36;
    const path: [number, number][] = [];
    const radius = (template.totalLengthKm / (2 * Math.PI)) * degreesPerKm;
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const r = radius * (0.9 + Math.sin(angle * 3) * 0.08 + rand() * 0.04);
      path.push([
        template.center[0] + Math.cos(angle) * r,
        template.center[1] + Math.sin(angle) * r,
      ]);
    }
    return path;
  };

  const generateLinearPath = (): [number, number][] => {
    const points = 20;
    const path: [number, number][] = [];
    const halfLen = (template.totalLengthKm / 2) * degreesPerKm;
    for (let i = 0; i < points; i++) {
      const t = i / (points - 1);
      const x = -halfLen + t * halfLen * 2;
      const y = Math.sin(t * Math.PI * 2) * halfLen * 0.3 + (rand() - 0.5) * halfLen * 0.1;
      const angle = Math.PI / 6;
      const rx = x * Math.cos(angle) - y * Math.sin(angle);
      const ry = x * Math.sin(angle) + y * Math.cos(angle);
      path.push([template.center[0] + rx, template.center[1] + ry]);
    }
    return path;
  };

  const fullPath =
    template.shape === "ring" || template.shape === "network"
      ? generateRingPath()
      : generateLinearPath();

  const segCount = template.segmentCount;
  const pointsPerSeg = Math.floor(fullPath.length / segCount);

  for (let i = 0; i < segCount; i++) {
    const startIdx = i * pointsPerSeg;
    const endIdx = Math.min(startIdx + pointsPerSeg + 1, fullPath.length);
    const segPath = fullPath.slice(startIdx, endIdx);

    if (segPath.length < 2) continue;

    const isBreakpoint = i < template.breakpointCount;
    const status: ConnectivityStatus = isBreakpoint
      ? i % 2 === 0
        ? "broken"
        : "partial"
      : "connected";

    const segLengthM = Math.round(
      (template.totalLengthKm * 1000) / segCount * (0.8 + rand() * 0.4)
    );

    segments.push({
      id: `seg-${template.id}-${i}`,
      name: `${template.name} 第${i + 1}段`,
      type: template.type,
      lengthM: segLengthM,
      widthM: Math.round(4 + rand() * 12),
      surface: ["沥青", "塑胶", "碎石", "木栈道"][Math.floor(rand() * 4)],
      status,
      geometry: segPath,
      greenwayId: template.id,
    });

    const startNode: GreenwayNode = {
      id: `node-${template.id}-${nodeId++}`,
      lng: segPath[0][0],
      lat: segPath[0][1],
      isBreakpoint: status !== "connected" && i > 0,
      breakReason:
        status === "broken"
          ? "道路穿越，无过街设施"
          : status === "partial"
          ? "需绕行过街天桥"
          : undefined,
      connectedSegments: [],
    };
    nodes.push(startNode);
  }

  const totalLengthKm =
    segments.reduce((sum, s) => sum + s.lengthM, 0) / 1000;

  const connectedCount = segments.filter((s) => s.status === "connected").length;
  const connectivityScore = Math.round((connectedCount / segments.length) * 100);

  const alphaIndex = Math.round(((segments.length - nodes.length + 1) / (2 * nodes.length - 5)) * 100) / 100;
  const betaIndex = Math.round((segments.length / nodes.length) * 100) / 100;
  const gammaIndex = Math.round((segments.length / (3 * (nodes.length - 2))) * 100) / 100;

  return {
    id: template.id,
    name: template.name,
    city: template.city,
    type: template.type,
    description: template.description,
    totalLengthKm: Math.round(totalLengthKm * 10) / 10,
    connectivityScore,
    alphaIndex,
    betaIndex,
    gammaIndex,
    coveragePercent: Math.round(50 + rand() * 40),
    segments,
    nodes,
  };
}

let greenways: Greenway[] | null = null;

function getGreenways(): Greenway[] {
  if (!greenways) {
    greenways = GREENWAY_TEMPLATES.map((t, idx) =>
      generateGreenway(t, idx * 1000 + 9)
    );
  }
  return greenways;
}

function getGreenway(id: string): Greenway | undefined {
  return getGreenways().find((g) => g.id === id);
}

function getTypeStats(greenway: Greenway): Record<GreenwayType, number> {
  const stats: Record<GreenwayType, number> = {
    riverside: 0,
    "park-ring": 0,
    "road-greenbelt": 0,
    "pedestrian-street": 0,
    "eco-corridor": 0,
    "bike-lane": 0,
  };
  greenway.segments.forEach((s) => {
    stats[s.type]++;
  });
  return stats;
}

function getStatusStats(greenway: Greenway): Record<ConnectivityStatus, number> {
  const stats: Record<ConnectivityStatus, number> = {
    connected: 0,
    partial: 0,
    broken: 0,
  };
  greenway.segments.forEach((s) => {
    stats[s.status]++;
  });
  return stats;
}

export {
  GREENWAY_TYPE_LABELS,
  GREENWAY_TYPE_COLORS,
  STATUS_LABELS,
  STATUS_COLORS,
  GREENWAY_TEMPLATES,
  getGreenways,
  getGreenway,
  getTypeStats,
  getStatusStats,
};
