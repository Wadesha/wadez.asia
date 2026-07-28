/**
 * 跨城纯市内公交路线规划算法
 * 核心功能：主要城市市政府之间，仅乘坐市内公交的跨城方案
 *
 * 算法原理：
 * 1. 构建多城市公交站点图（节点=站点，边=同线路相邻站）
 * 2. 城市边界站点通过步行接驳连接（地理位置接近的不同城市站点对）
 * 3. Dijkstra最短路径 + K-shortest paths 多方案输出
 */

export interface BusLine {
  name: string;
  city: string;
  fromStation: string;
  toStation: string;
  stations: { up: string[]; down: string[] };
  source: string;
  lastUpdate: string;
  quality: string;
}

export interface CityInfo {
  name: string;
  governmentStation: string; // 市政府所在站点
  data: BusLine[];
}

export interface TransferSegment {
  line: string;
  city: string;
  from: string;
  to: string;
  stations: string[]; // 本段经过的站点序列
  stationCount: number;
}

export interface WalkSegment {
  type: "walk";
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  distanceMeters: number;
  estimatedMinutes: number;
}

export interface BusSegment {
  type: "bus";
  line: string;
  city: string;
  from: string;
  to: string;
  stations: string[];
  stationCount: number;
}

export type RouteSegment = BusSegment | WalkSegment;

export interface CrossCityPlan {
  id: string;
  fromCity: string;
  toCity: string;
  totalSegments: number;
  totalBusSegments: number;
  totalWalkSegments: number;
  totalStations: number;
  totalWalkDistance: number;
  transfers: number;
  segments: RouteSegment[];
  summary: string;
}

// ===== 城市数据（北京真实 + 相邻城市占位，待获取真实数据替换）=====

// 北京线路数据运行时加载
let beijingLinesCache: BusLine[] = [];

export async function loadBeijingLines(): Promise<BusLine[]> {
  if (beijingLinesCache.length > 0) return beijingLinesCache;
  try {
    const res = await fetch("/bus-data-official/beijing/lines.json");
    if (res.ok) {
      beijingLinesCache = await res.json();
    }
  } catch {
    // 静默失败
  }
  return beijingLinesCache;
}

// 相邻城市模拟数据（基于真实站点名，待政府数据申请通过后替换）
const tianjinLines: BusLine[] = [
  {
    name: "611路",
    city: "天津",
    fromStation: "天津站",
    toStation: "杨村客运站",
    stations: {
      up: ["天津站", "天津站后广场", "远洋国际中心", "李地大街", "新开路", "常州道", "正义道", "建昌道", "天津服装城", "北宁公园", "北站", "辰纬路", "东马路", "北门", "城厢东路", "鼓楼", "南门外大街", "升安大街", "海光寺", "鞍山道", "滨江道", "长沙路", "湖北路", "小营门", "大营门", "天津图书大厦", "下瓦房", "东楼", "爱国里", "前程里", "珠江道", "茗都茗座", "瑞江花园", "珠江道茶城", "梅江", "天津市政府"],
      down: ["天津市政府", "梅江", "珠江道茶城", "瑞江花园", "茗都茗座", "珠江道", "前程里", "爱国里", "东楼", "下瓦房", "天津图书大厦", "大营门", "小营门", "湖北路", "长沙路", "滨江道", "鞍山道", "海光寺", "升安大街", "南门外大街", "鼓楼", "城厢东路", "北门", "东马路", "辰纬路", "北站", "北宁公园", "天津服装城", "建昌道", "正义道", "常州道", "新开路", "李地大街", "远洋国际中心", "天津站后广场", "天津站"],
    },
    source: "placeholder",
    lastUpdate: new Date().toISOString(),
    quality: "suspect",
  },
  {
    name: "607路",
    city: "天津",
    fromStation: "天津站",
    toStation: "武清客运站",
    stations: {
      up: ["天津站", "天津站后广场", "远洋国际中心", "李地大街", "新开路", "常州道", "正义道", "建昌道", "天津服装城", "北宁公园", "北站", "辰纬路", "东马路", "北门", "城厢东路", "鼓楼", "南门外大街", "升安大街", "海光寺", "鞍山道", "滨江道", "长沙路", "湖北路", "小营门", "大营门", "天津图书大厦", "下瓦房", "东楼", "爱国里", "前程里", "珠江道", "梅江", "外环线", "双街", "小街", "武清客运站"],
      down: ["武清客运站", "小街", "双街", "外环线", "梅江", "珠江道", "前程里", "爱国里", "东楼", "下瓦房", "天津图书大厦", "大营门", "小营门", "湖北路", "长沙路", "滨江道", "鞍山道", "海光寺", "升安大街", "南门外大街", "鼓楼", "城厢东路", "北门", "东马路", "辰纬路", "北站", "北宁公园", "天津服装城", "建昌道", "正义道", "常州道", "新开路", "李地大街", "远洋国际中心", "天津站后广场", "天津站"],
    },
    source: "placeholder",
    lastUpdate: new Date().toISOString(),
    quality: "suspect",
  },
  {
    name: "562路",
    city: "天津",
    fromStation: "武清客运站",
    toStation: "杨村一中",
    stations: {
      up: ["武清客运站", "杨村三中", "杨村火车站", "杨村一中"],
      down: ["杨村一中", "杨村火车站", "杨村三中", "武清客运站"],
    },
    source: "placeholder",
    lastUpdate: new Date().toISOString(),
    quality: "suspect",
  },
];

const langfangLines: BusLine[] = [
  {
    name: "廊坊1路",
    city: "廊坊",
    fromStation: "廊坊站",
    toStation: "万庄",
    stations: {
      up: ["廊坊站", "廊坊市政府", "新华路", "银河路", "万庄"],
      down: ["万庄", "银河路", "新华路", "廊坊市政府", "廊坊站"],
    },
    source: "placeholder",
    lastUpdate: new Date().toISOString(),
    quality: "suspect",
  },
];

// 城市信息（北京数据运行时加载）
export function getCities(beijingLines: BusLine[]): CityInfo[] {
  return [
    {
      name: "北京",
      governmentStation: "东直门枢纽站",
      data: beijingLines,
    },
    {
      name: "天津",
      governmentStation: "天津市政府",
      data: tianjinLines,
    },
    {
      name: "廊坊",
      governmentStation: "廊坊市政府",
      data: langfangLines,
    },
  ];
}

// 跨城步行接驳点（地理位置接近的不同城市站点对）
// 待接入高德地理编码API后可自动计算，当前手动配置
export const CITY_CONNECTIONS: Array<{
  fromCity: string;
  fromStation: string;
  toCity: string;
  toStation: string;
  distanceMeters: number;
  estimatedMinutes: number;
}> = [
  // 北京-廊坊接驳（万庄是廊坊靠近北京的节点）
  {
    fromCity: "北京",
    fromStation: "万庄",
    toCity: "廊坊",
    toStation: "万庄",
    distanceMeters: 500,
    estimatedMinutes: 7,
  },
  // 北京-天津接驳（武清是天津靠近北京的节点）
  {
    fromCity: "北京",
    fromStation: "杨村客运站",
    toCity: "天津",
    toStation: "武清客运站",
    distanceMeters: 300,
    estimatedMinutes: 5,
  },
];

// ===== 图算法实现 =====

interface GraphNode {
  station: string;
  city: string;
  id: string; // `${city}::${station}`
}

interface GraphEdge {
  to: string;
  weight: number;
  line?: string;
  city?: string;
  type: "bus" | "walk";
  stations?: string[];
  distanceMeters?: number;
  estimatedMinutes?: number;
}

class BusGraph {
  private nodes = new Map<string, GraphNode>();
  private adj = new Map<string, GraphEdge[]>();

  addNode(station: string, city: string) {
    const id = `${city}::${station}`;
    if (!this.nodes.has(id)) {
      this.nodes.set(id, { station, city, id });
      this.adj.set(id, []);
    }
    return id;
  }

  addBusEdge(fromId: string, toId: string, line: string, city: string, stations: string[]) {
    this.adj.get(fromId)!.push({ to: toId, weight: 1, line, city, type: "bus", stations });
    this.adj.get(toId)!.push({ to: fromId, weight: 1, line, city, type: "bus", stations: stations.slice().reverse() });
  }

  addWalkEdge(fromId: string, toId: string, distanceMeters: number, estimatedMinutes: number) {
    const weight = estimatedMinutes / 3; // 步行时间换算为"站"权重
    this.adj.get(fromId)!.push({ to: toId, weight, type: "walk", distanceMeters, estimatedMinutes });
    this.adj.get(toId)!.push({ to: fromId, weight, type: "walk", distanceMeters, estimatedMinutes });
  }

  // Dijkstra + 路径记录
  dijkstra(startId: string, endId: string): { path: string[]; edges: GraphEdge[]; cost: number } | null {
    const dist = new Map<string, number>();
    const prev = new Map<string, { node: string; edge: GraphEdge }>();
    const visited = new Set<string>();
    const queue: Array<{ id: string; cost: number }> = [{ id: startId, cost: 0 }];
    dist.set(startId, 0);

    while (queue.length > 0) {
      queue.sort((a, b) => a.cost - b.cost);
      const current = queue.shift()!;

      if (visited.has(current.id)) continue;
      visited.add(current.id);

      if (current.id === endId) {
        const path: string[] = [];
        const edges: GraphEdge[] = [];
        let node = endId;
        while (node !== startId) {
          const p = prev.get(node);
          if (!p) return null;
          path.unshift(node);
          edges.unshift(p.edge);
          node = p.node;
        }
        path.unshift(startId);
        return { path, edges, cost: current.cost };
      }

      const neighbors = this.adj.get(current.id) || [];
      for (const edge of neighbors) {
        if (visited.has(edge.to)) continue;
        const newCost = current.cost + edge.weight;
        if (!dist.has(edge.to) || newCost < dist.get(edge.to)!) {
          dist.set(edge.to, newCost);
          prev.set(edge.to, { node: current.id, edge });
          queue.push({ id: edge.to, cost: newCost });
        }
      }
    }

    return null;
  }

  // Yen's algorithm for K-shortest paths (简化版)
  kShortestPaths(startId: string, endId: string, k: number): Array<{ path: string[]; edges: GraphEdge[]; cost: number }> {
    const results: Array<{ path: string[]; edges: GraphEdge[]; cost: number }> = [];

    const first = this.dijkstra(startId, endId);
    if (!first) return results;
    results.push(first);

    for (let i = 1; i < k; i++) {
      const candidates: Array<{ path: string[]; edges: GraphEdge[]; cost: number }> = [];

      for (let j = 0; j < results[i - 1].path.length - 1; j++) {
        const spurNode = results[i - 1].path[j];
        const rootPath = results[i - 1].path.slice(0, j + 1);
        const rootEdges = results[i - 1].edges.slice(0, j);

        // 临时移除边
        const removedEdges: Array<{ from: string; edge: GraphEdge }> = [];
        for (const result of results) {
          if (result.path.length > j && result.path.slice(0, j + 1).join(",") === rootPath.join(",")) {
            const fromId = result.path[j];
            const toId = result.path[j + 1];
            const edges = this.adj.get(fromId) || [];
            const idx = edges.findIndex((e) => e.to === toId);
            if (idx >= 0) {
              removedEdges.push({ from: fromId, edge: edges[idx] });
              edges.splice(idx, 1);
            }
          }
        }

        const spurResult = this.dijkstra(spurNode, endId);
        if (spurResult) {
          const totalPath = [...rootPath.slice(0, -1), ...spurResult.path];
          const totalEdges = [...rootEdges, ...spurResult.edges];
          const totalCost = rootEdges.reduce((s, e) => s + e.weight, 0) + spurResult.cost;

          const exists = candidates.some((c) => c.path.join(",") === totalPath.join(","));
          const inResults = results.some((r) => r.path.join(",") === totalPath.join(","));
          if (!exists && !inResults) {
            candidates.push({ path: totalPath, edges: totalEdges, cost: totalCost });
          }
        }

        // 恢复边
        for (const { from, edge } of removedEdges) {
          this.adj.get(from)!.push(edge);
        }
      }

      if (candidates.length === 0) break;
      candidates.sort((a, b) => a.cost - b.cost);
      results.push(candidates[0]);
    }

    return results;
  }
}

// ===== 构建图并查询 =====

function buildGraph(cities: CityInfo[]): BusGraph {
  const graph = new BusGraph();

  // 添加所有城市线路
  for (const city of cities) {
    for (const line of city.data) {
      // 上行
      for (let i = 0; i < line.stations.up.length - 1; i++) {
        const fromId = graph.addNode(line.stations.up[i], city.name);
        const toId = graph.addNode(line.stations.up[i + 1], city.name);
        graph.addBusEdge(fromId, toId, line.name, city.name, line.stations.up.slice(i, i + 2));
      }
      // 下行
      for (let i = 0; i < line.stations.down.length - 1; i++) {
        const fromId = graph.addNode(line.stations.down[i], city.name);
        const toId = graph.addNode(line.stations.down[i + 1], city.name);
        graph.addBusEdge(fromId, toId, line.name, city.name, line.stations.down.slice(i, i + 2));
      }
    }
  }

  // 添加跨城步行接驳
  for (const conn of CITY_CONNECTIONS) {
    const fromId = graph.addNode(conn.fromStation, conn.fromCity);
    const toId = graph.addNode(conn.toStation, conn.toCity);
    graph.addWalkEdge(fromId, toId, conn.distanceMeters, conn.estimatedMinutes);
  }

  return graph;
}

export async function findCrossCityPlansAsync(
  fromCity: string,
  toCity: string,
  maxPlans: number = 5
): Promise<CrossCityPlan[]> {
  const beijingLines = await loadBeijingLines();
  const cities = getCities(beijingLines);

  const fromCityInfo = cities.find((c) => c.name === fromCity);
  const toCityInfo = cities.find((c) => c.name === toCity);

  if (!fromCityInfo || !toCityInfo) return [];
  if (fromCity === toCity) return [];

  const graph = buildGraph(cities);
  const startId = `${fromCity}::${fromCityInfo.governmentStation}`;
  const endId = `${toCity}::${toCityInfo.governmentStation}`;

  const paths = graph.kShortestPaths(startId, endId, maxPlans);

  const plans: CrossCityPlan[] = paths.map((result, idx) => {
    const segments: RouteSegment[] = [];
    let currentLine: string | null = null;
    let currentCity: string | null = null;
    let segStations: string[] = [];
    let segFrom = "";

    for (let i = 0; i < result.edges.length; i++) {
      const edge = result.edges[i];
      const node = result.path[i];
      const [, station] = node.split("::");

      if (edge.type === "walk") {
        // 先结束当前公交段
        if (currentLine && currentCity) {
          segments.push({
            type: "bus",
            line: currentLine,
            city: currentCity,
            from: segFrom,
            to: station,
            stations: [...segStations, station],
            stationCount: segStations.length,
          });
          currentLine = null;
          currentCity = null;
          segStations = [];
        }

        const nextNode = result.path[i + 1];
        const [nextCity, nextStation] = nextNode.split("::");
        segments.push({
          type: "walk",
          from: station,
          fromCity: edge.city || fromCity,
          to: nextStation,
          toCity: nextCity,
          distanceMeters: edge.distanceMeters || 500,
          estimatedMinutes: edge.estimatedMinutes || 7,
        });
        segFrom = nextStation;
      } else {
        // 公交段
        if (currentLine !== edge.line || currentCity !== edge.city) {
          if (currentLine && currentCity) {
            segments.push({
              type: "bus",
              line: currentLine,
              city: currentCity,
              from: segFrom,
              to: station,
              stations: [...segStations, station],
              stationCount: segStations.length,
            });
          }
          currentLine = edge.line!;
          currentCity = edge.city!;
          segFrom = station;
          segStations = [];
        } else {
          segStations.push(station);
        }
      }
    }

    // 结束最后一个公交段
    if (currentLine && currentCity) {
      const lastStation = result.path[result.path.length - 1].split("::")[1];
      segments.push({
        type: "bus",
        line: currentLine,
        city: currentCity,
        from: segFrom,
        to: lastStation,
        stations: [...segStations, lastStation],
        stationCount: segStations.length,
      });
    }

    const busSegments = segments.filter((s): s is BusSegment => s.type === "bus");
    const walkSegments = segments.filter((s): s is WalkSegment => s.type === "walk");
    const totalStations = busSegments.reduce((sum, s) => sum + s.stationCount, 0);
    const totalWalkDistance = walkSegments.reduce((sum, s) => sum + s.distanceMeters, 0);

    const summary = segments
      .map((s) => {
        if (s.type === "bus") return `${s.line}(${s.stationCount}站)`;
        return `步行${s.estimatedMinutes}分钟`;
      })
      .join(" → ");

    return {
      id: `plan-${idx}`,
      fromCity,
      toCity,
      totalSegments: segments.length,
      totalBusSegments: busSegments.length,
      totalWalkSegments: walkSegments.length,
      totalStations,
      totalWalkDistance,
      transfers: busSegments.length - 1,
      segments,
      summary,
    };
  });

  return plans;
}

export function getAvailableCities(): string[] {
  return ["北京", "天津", "廊坊"];
}
