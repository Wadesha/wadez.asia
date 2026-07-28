export type NetworkMetric =
  | "betweenness"
  | "closeness"
  | "degree"
  | "straightness"
  | "integration";

export interface StreetNode {
  id: string;
  lng: number;
  lat: number;
  degree: number;
  betweenness: number;
  closeness: number;
  integration: number;
}

export interface StreetEdge {
  id: string;
  from: string;
  to: string;
  lengthM: number;
  roadClass: "highway" | "main" | "secondary" | "local" | "alley";
  betweenness: number;
  closeness: number;
  straightness: number;
  integration: number;
  geometry: [number, number][];
  areaId: string;
}

export interface StreetNetworkArea {
  id: string;
  name: string;
  city: string;
  description: string;
  pattern: "grid" | "organic" | "radial" | "tree";
  center: [number, number];
  nodes: StreetNode[];
  edges: StreetEdge[];
}

const METRIC_LABELS: Record<NetworkMetric, string> = {
  betweenness: "介数中心性",
  closeness: "接近中心性",
  degree: "节点度",
  straightness: "直线度指数",
  integration: "集成度",
};

const METRIC_DESCRIPTIONS: Record<NetworkMetric, string> = {
  betweenness: "有多少最短路径经过这条路 — 街道的流量潜力",
  closeness: "从这里到其他地方平均距离 — 区域可达程度",
  degree: "一个路口连接几条路 — 交叉口渗透性",
  straightness: "实际距离 / 直线距离 — 路网绕弯程度",
  integration: "空间句法经典指标 — 区域核心/边缘程度",
};

const ROAD_CLASS_LABELS: Record<string, string> = {
  highway: "快速路",
  main: "主干道",
  secondary: "次干道",
  local: "支路",
  alley: "胡同/小巷",
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

interface NetworkAreaTemplate {
  id: string;
  name: string;
  city: string;
  description: string;
  pattern: "grid" | "organic" | "radial" | "tree";
  center: [number, number];
  sizeKm: number;
  nodeCount: number;
}

const AREA_TEMPLATES: NetworkAreaTemplate[] = [
  {
    id: "guomao-grid",
    name: "北京国贸CBD",
    city: "北京",
    description:
      "典型方格路网，高中心性、高直线度，代表现代城市规划的高效路网形态。",
    pattern: "grid",
    center: [116.46, 39.91],
    sizeKm: 1.5,
    nodeCount: 100,
  },
  {
    id: "nanluo-organic",
    name: "北京南锣鼓巷",
    city: "北京",
    description:
      "胡同有机肌理，低直线度、高聚类性，代表传统历史街区的自然生长路网。",
    pattern: "organic",
    center: [116.403, 39.935],
    sizeKm: 0.8,
    nodeCount: 120,
  },
  {
    id: "lujiazui-tree",
    name: "上海陆家嘴",
    city: "上海",
    description:
      "树形路网结构，核心区环路+放射，外围尽端式道路，高低中心性分化明显。",
    pattern: "tree",
    center: [121.505, 31.235],
    sizeKm: 1.2,
    nodeCount: 90,
  },
];

function generateGridNetwork(
  template: NetworkAreaTemplate,
  seed: number
): { nodes: StreetNode[]; edges: StreetEdge[] } {
  const rand = seededRandom(seed);
  const degreesPerKm = 0.009;
  const halfSize = (template.sizeKm * degreesPerKm) / 2;

  const gridN = Math.ceil(Math.sqrt(template.nodeCount));
  const stepLng = (halfSize * 2) / gridN;
  const stepLat = (halfSize * 2) / gridN;

  const nodes: StreetNode[] = [];
  const nodeGrid: (StreetNode | null)[][] = [];

  for (let i = 0; i <= gridN; i++) {
    nodeGrid[i] = [];
    for (let j = 0; j <= gridN; j++) {
      if (rand() > 0.85 && i > 0 && j > 0 && i < gridN && j < gridN) {
        nodeGrid[i][j] = null;
        continue;
      }

      const jitterX = (rand() - 0.5) * stepLng * 0.15;
      const jitterY = (rand() - 0.5) * stepLat * 0.15;

      const lng = template.center[0] - halfSize + i * stepLng + jitterX;
      const lat = template.center[1] - halfSize + j * stepLat + jitterY;

      const node: StreetNode = {
        id: `node-${i}-${j}`,
        lng,
        lat,
        degree: 0,
        betweenness: 0,
        closeness: 0,
        integration: 0,
      };
      nodes.push(node);
      nodeGrid[i][j] = node;
    }
  }

  const edges: StreetEdge[] = [];
  let edgeId = 0;

  const addEdge = (
    n1: StreetNode,
    n2: StreetNode,
    roadClass: StreetEdge["roadClass"],
    baseBetweenness: number
  ) => {
    const dx = n2.lng - n1.lng;
    const dy = n2.lat - n1.lat;
    const lengthM = Math.sqrt(dx * dx + dy * dy) * 111000;

    const straightness = 0.85 + rand() * 0.15;
    const closeness = 0.3 + baseBetweenness * 0.5 + rand() * 0.2;
    const integration = 0.25 + baseBetweenness * 0.6 + rand() * 0.15;
    const betweenness = baseBetweenness * (0.8 + rand() * 0.4);

    const edge: StreetEdge = {
      id: `edge-${edgeId++}`,
      from: n1.id,
      to: n2.id,
      lengthM: Math.round(lengthM),
      roadClass,
      betweenness: Math.round(betweenness * 1000) / 1000,
      closeness: Math.round(closeness * 1000) / 1000,
      straightness: Math.round(straightness * 1000) / 1000,
      integration: Math.round(integration * 1000) / 1000,
      geometry: [
        [n1.lng, n1.lat],
        [n2.lng, n2.lat],
      ],
      areaId: template.id,
    };
    edges.push(edge);
    n1.degree++;
    n2.degree++;
  };

  for (let i = 0; i <= gridN; i++) {
    for (let j = 0; j <= gridN; j++) {
      const node = nodeGrid[i][j];
      if (!node) continue;

      if (i < gridN) {
        const rightNode = nodeGrid[i + 1][j];
        if (rightNode) {
          const isMain = j === Math.floor(gridN / 2) || i % 3 === 0;
          addEdge(
            node,
            rightNode,
            isMain ? "main" : "secondary",
            isMain ? 0.7 + rand() * 0.3 : 0.3 + rand() * 0.4
          );
        }
      }

      if (j < gridN) {
        const downNode = nodeGrid[i][j + 1];
        if (downNode) {
          const isMain = i === Math.floor(gridN / 2) || j % 3 === 0;
          addEdge(
            node,
            downNode,
            isMain ? "main" : "secondary",
            isMain ? 0.7 + rand() * 0.3 : 0.3 + rand() * 0.4
          );
        }
      }
    }
  }

  nodes.forEach((node) => {
    node.betweenness = Math.round((node.degree / 4) * 0.5 + rand() * 0.5 * 1000) / 1000;
    node.closeness = Math.round(0.3 + (node.degree / 8) * 0.5 + rand() * 0.2 * 1000) / 1000;
    node.integration = Math.round(0.2 + (node.degree / 8) * 0.6 + rand() * 0.2 * 1000) / 1000;
  });

  return { nodes, edges };
}

function generateOrganicNetwork(
  template: NetworkAreaTemplate,
  seed: number
): { nodes: StreetNode[]; edges: StreetEdge[] } {
  const rand = seededRandom(seed);
  const degreesPerKm = 0.009;
  const halfSize = (template.sizeKm * degreesPerKm) / 2;

  const nodes: StreetNode[] = [];

  for (let i = 0; i < template.nodeCount; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = Math.sqrt(rand()) * halfSize;
    const lng = template.center[0] + Math.cos(angle) * dist;
    const lat = template.center[1] + Math.sin(angle) * dist;

    nodes.push({
      id: `node-${i}`,
      lng,
      lat,
      degree: 0,
      betweenness: 0,
      closeness: 0,
      integration: 0,
    });
  }

  const edges: StreetEdge[] = [];
  let edgeId = 0;

  const connectRadius = halfSize * 0.25;

  nodes.forEach((node, idx) => {
    const nearNodes = nodes
      .filter((n, nIdx) => {
        if (nIdx <= idx) return false;
        const dx = n.lng - node.lng;
        const dy = n.lat - node.lat;
        return Math.sqrt(dx * dx + dy * dy) < connectRadius;
      })
      .slice(0, 3);

    nearNodes.forEach((nearNode, nearIdx) => {
      const dx = nearNode.lng - node.lng;
      const dy = nearNode.lat - node.lat;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const lengthM = dist * 111000;

      const distFromCenter =
        Math.sqrt(
          Math.pow((node.lng + nearNode.lng) / 2 - template.center[0], 2) +
            Math.pow((node.lat + nearNode.lat) / 2 - template.center[1], 2)
        ) / halfSize;
      const centrality = Math.max(0, 1 - distFromCenter);

      const roadClass: StreetEdge["roadClass"] =
        centrality > 0.7
          ? "secondary"
          : centrality > 0.4
          ? "local"
          : "alley";

      const midLng = (node.lng + nearNode.lng) / 2 + (rand() - 0.5) * dist * 0.3;
      const midLat = (node.lat + nearNode.lat) / 2 + (rand() - 0.5) * dist * 0.3;

      const straightPath = dist;
      const detourPath =
        Math.sqrt(
          Math.pow(midLng - node.lng, 2) + Math.pow(midLat - node.lat, 2)
        ) +
        Math.sqrt(
          Math.pow(nearNode.lng - midLng, 2) + Math.pow(nearNode.lat - midLat, 2)
        );
      const straightness = straightPath / detourPath;

      const betweenness = centrality * 0.6 + rand() * 0.4;
      const closeness = centrality * 0.5 + 0.2 + rand() * 0.3;
      const integration = centrality * 0.7 + 0.1 + rand() * 0.2;

      edges.push({
        id: `edge-${edgeId++}`,
        from: node.id,
        to: nearNode.id,
        lengthM: Math.round(lengthM),
        roadClass,
        betweenness: Math.round(betweenness * 1000) / 1000,
        closeness: Math.round(closeness * 1000) / 1000,
        straightness: Math.round(straightness * 1000) / 1000,
        integration: Math.round(integration * 1000) / 1000,
        geometry: [
          [node.lng, node.lat],
          [midLng, midLat],
          [nearNode.lng, nearNode.lat],
        ],
        areaId: template.id,
      });

      node.degree++;
      nearNode.degree++;
    });
  });

  nodes.forEach((node) => {
    const distFromCenter =
      Math.sqrt(
        Math.pow(node.lng - template.center[0], 2) +
          Math.pow(node.lat - template.center[1], 2)
      ) / halfSize;
    const centrality = Math.max(0, 1 - distFromCenter);

    node.betweenness = Math.round((centrality * 0.6 + rand() * 0.4) * 1000) / 1000;
    node.closeness = Math.round((centrality * 0.5 + 0.2 + rand() * 0.3) * 1000) / 1000;
    node.integration = Math.round((centrality * 0.7 + 0.1 + rand() * 0.2) * 1000) / 1000;
  });

  return { nodes, edges };
}

function generateTreeNetwork(
  template: NetworkAreaTemplate,
  seed: number
): { nodes: StreetNode[]; edges: StreetEdge[] } {
  const rand = seededRandom(seed);
  const degreesPerKm = 0.009;
  const halfSize = (template.sizeKm * degreesPerKm) / 2;

  const nodes: StreetNode[] = [];
  const edges: StreetEdge[] = [];
  let edgeId = 0;

  const centerNode: StreetNode = {
    id: "node-center",
    lng: template.center[0],
    lat: template.center[1],
    degree: 0,
    betweenness: 0.95,
    closeness: 0.9,
    integration: 0.95,
  };
  nodes.push(centerNode);

  const ringCount = 3;
  const nodesPerRing = [6, 10, 14];

  for (let ring = 0; ring < ringCount; ring++) {
    const ringRadius = ((ring + 1) / (ringCount + 1)) * halfSize;
    const nodeCount = nodesPerRing[ring];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 + ring * 0.3;
      const jitter = (rand() - 0.5) * 0.15;
      const r = ringRadius * (1 + jitter);
      const lng = template.center[0] + Math.cos(angle) * r;
      const lat = template.center[1] + Math.sin(angle) * r;

      const distFromCenter = (ring + 1) / (ringCount + 1);
      const centrality = 1 - distFromCenter * 0.8;

      const node: StreetNode = {
        id: `node-${ring}-${i}`,
        lng,
        lat,
        degree: 0,
        betweenness: Math.round(centrality * 1000) / 1000,
        closeness: Math.round((0.3 + centrality * 0.6) * 1000) / 1000,
        integration: Math.round((0.2 + centrality * 0.7) * 1000) / 1000,
      };
      nodes.push(node);

      const parentRing = ring === 0 ? [centerNode] : nodes.filter(
        (n) => n.id.startsWith(`node-${ring - 1}-`)
      );
      const parentIdx = Math.min(
        Math.floor(i * (parentRing.length / nodeCount)),
        parentRing.length - 1
      );
      const parent = parentRing[parentIdx];

      const dx = lng - parent.lng;
      const dy = lat - parent.lat;
      const lengthM = Math.sqrt(dx * dx + dy * dy) * 111000;

      const roadClass: StreetEdge["roadClass"] =
        ring === 0
          ? "main"
          : ring === 1
          ? "secondary"
          : "local";

      edges.push({
        id: `edge-${edgeId++}`,
        from: parent.id,
        to: node.id,
        lengthM: Math.round(lengthM),
        roadClass,
        betweenness: Math.round((centrality * 0.8 + rand() * 0.2) * 1000) / 1000,
        closeness: Math.round((0.3 + centrality * 0.5 + rand() * 0.2) * 1000) / 1000,
        straightness: Math.round((0.9 + rand() * 0.1) * 1000) / 1000,
        integration: Math.round((0.2 + centrality * 0.6 + rand() * 0.2) * 1000) / 1000,
        geometry: [
          [parent.lng, parent.lat],
          [lng, lat],
        ],
        areaId: template.id,
      });

      parent.degree++;
      node.degree++;
    }
  }

  for (let ring = 0; ring < ringCount; ring++) {
    const ringNodes = nodes.filter((n) => n.id.startsWith(`node-${ring}-`));
    for (let i = 0; i < ringNodes.length; i++) {
      if (rand() > 0.4) continue;
      const next = ringNodes[(i + 1) % ringNodes.length];
      const curr = ringNodes[i];

      const dx = next.lng - curr.lng;
      const dy = next.lat - curr.lat;
      const lengthM = Math.sqrt(dx * dx + dy * dy) * 111000;

      edges.push({
        id: `edge-ring-${ring}-${i}`,
        from: curr.id,
        to: next.id,
        lengthM: Math.round(lengthM),
        roadClass: ring <= 1 ? "secondary" : "local",
        betweenness: Math.round((0.4 + rand() * 0.4) * 1000) / 1000,
        closeness: Math.round((0.4 + rand() * 0.3) * 1000) / 1000,
        straightness: Math.round((0.85 + rand() * 0.15) * 1000) / 1000,
        integration: Math.round((0.35 + rand() * 0.35) * 1000) / 1000,
        geometry: [
          [curr.lng, curr.lat],
          [next.lng, next.lat],
        ],
        areaId: template.id,
      });

      curr.degree++;
      next.degree++;
    }
  }

  return { nodes, edges };
}

let networkAreas: StreetNetworkArea[] | null = null;

function getStreetNetworkAreas(): StreetNetworkArea[] {
  if (!networkAreas) {
    networkAreas = AREA_TEMPLATES.map((template, idx) => {
      let result: { nodes: StreetNode[]; edges: StreetEdge[] };

      if (template.pattern === "grid") {
        result = generateGridNetwork(template, idx * 1000 + 1);
      } else if (template.pattern === "organic") {
        result = generateOrganicNetwork(template, idx * 1000 + 2);
      } else {
        result = generateTreeNetwork(template, idx * 1000 + 3);
      }

      return {
        id: template.id,
        name: template.name,
        city: template.city,
        description: template.description,
        pattern: template.pattern,
        center: template.center,
        nodes: result.nodes,
        edges: result.edges,
      };
    });
  }
  return networkAreas;
}

function getStreetNetworkArea(id: string): StreetNetworkArea | undefined {
  return getStreetNetworkAreas().find((a) => a.id === id);
}

function getNetworkStats(area: StreetNetworkArea, metric: NetworkMetric) {
  const edges = area.edges;
  const nodes = area.nodes;

  const getEdgeMetric = (e: StreetEdge) => {
    switch (metric) {
      case "betweenness":
        return e.betweenness;
      case "closeness":
        return e.closeness;
      case "straightness":
        return e.straightness;
      case "integration":
        return e.integration;
      case "degree":
        return 0;
    }
  };

  const getNodeMetric = (n: StreetNode) => {
    switch (metric) {
      case "betweenness":
        return n.betweenness;
      case "closeness":
        return n.closeness;
      case "integration":
        return n.integration;
      case "degree":
        return n.degree / 8;
      case "straightness":
        return 0;
    }
  };

  const values = edges.map(getEdgeMetric);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);

  const totalLength = edges.reduce((sum, e) => sum + e.lengthM, 0);
  const density = totalLength / (1.5 * 1.5 * 1000);

  const avgDegree =
    nodes.reduce((sum, n) => sum + n.degree, 0) / nodes.length;

  const nodeValues = nodes.map(getNodeMetric);
  const avgNodeValue = nodeValues.reduce((a, b) => a + b, 0) / nodeValues.length;

  return {
    nodeCount: nodes.length,
    edgeCount: edges.length,
    totalLengthKm: Math.round(totalLength / 100) / 10,
    density: Math.round(density * 10) / 10,
    avgDegree: Math.round(avgDegree * 10) / 10,
    avgMetricValue: Math.round(avg * 1000) / 1000,
    maxMetricValue: Math.round(max * 1000) / 1000,
    minMetricValue: Math.round(min * 1000) / 1000,
    avgNodeValue: Math.round(avgNodeValue * 1000) / 1000,
  };
}

function getMetricColor(value: number, max: number): string {
  const ratio = Math.min(Math.max(value / Math.max(max, 0.01), 0), 1);
  if (ratio < 0.2) return "#e5e7eb";
  if (ratio < 0.4) return "#93c5fd";
  if (ratio < 0.6) return "#3b82f6";
  if (ratio < 0.8) return "#7c3aed";
  return "#ef4444";
}

export {
  METRIC_LABELS,
  METRIC_DESCRIPTIONS,
  ROAD_CLASS_LABELS,
  AREA_TEMPLATES,
  getStreetNetworkAreas,
  getStreetNetworkArea,
  getNetworkStats,
  getMetricColor,
};
