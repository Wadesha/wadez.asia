/**
 * 空间指标计算引擎 (v2.1.15)
 * 统一的空间分析指标计算工具库
 */

import { calculateStats } from "./report-generator";

/**
 * Haversine 距离计算（米）
 */
export function haversineDistance(
  lng1: number, lat1: number,
  lng2: number, lat2: number
): number {
  const R = 6371000; // 地球半径(米)
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * 覆盖率计算
 * @param facilities 设施列表（带坐标）
 * @param targetPoints 目标点列表（带坐标）
 * @param radius 服务半径(米)
 */
export function calculateCoverage(
  facilities: { lng: number; lat: number }[],
  targetPoints: { lng: number; lat: number }[],
  radius: number
): { coverageRate: number; covered: number; total: number; uncovered: number } {
  if (targetPoints.length === 0) {
    return { coverageRate: 0, covered: 0, total: 0, uncovered: 0 };
  }

  let covered = 0;
  for (const point of targetPoints) {
    const isCovered = facilities.some((f) =>
      haversineDistance(f.lng, f.lat, point.lng, point.lat) <= radius
    );
    if (isCovered) covered++;
  }

  return {
    coverageRate: covered / targetPoints.length,
    covered,
    total: targetPoints.length,
    uncovered: targetPoints.length - covered,
  };
}

/**
 * 密度计算（个/平方公里）
 */
export function calculateDensity(
  count: number,
  areaSqKm: number
): number {
  if (areaSqKm === 0) return 0;
  return Math.round((count / areaSqKm) * 100) / 100;
}

/**
 * 可达性评分（0-100）
 * 基于平均距离和覆盖率综合计算
 */
export function calculateAccessibilityScore(
  distances: number[],
  maxAcceptableDistance: number
): { score: number; level: string } {
  if (distances.length === 0) {
    return { score: 0, level: "无数据" };
  }

  const stats = calculateStats(distances);
  const avgInMax = Math.min(stats.avg / maxAcceptableDistance, 1);
  const score = Math.round((1 - avgInMax) * 100);

  let level: string;
  if (score >= 80) level = "优";
  else if (score >= 60) level = "良";
  else if (score >= 40) level = "一般";
  else if (score >= 20) level = "较差";
  else level = "差";

  return { score, level };
}

/**
 * 连通性指数 (α, β, γ)
 * 用于绿道/路网连通性分析
 * @param nodes 节点数
 * @param links 边数
 * @param maxPossibleLinks 最大可能边数 = n*(n-1)/2
 */
export function calculateConnectivity(
  nodes: number,
  links: number
): { alpha: number; beta: number; gamma: number } {
  if (nodes < 2) {
    return { alpha: 0, beta: 0, gamma: 0 };
  }

  const maxPossibleLinks = (nodes * (nodes - 1)) / 2;
  const maxPossibleCircuits = (nodes - 1) * (nodes - 2) / 2;

  // α指数 = 实际环路数 / 最大可能环路数
  const actualCircuits = links - nodes + 1;
  const alpha = maxPossibleCircuits > 0
    ? Math.round((actualCircuits / maxPossibleCircuits) * 100) / 100
    : 0;

  // β指数 = 边数 / 节点数
  const beta = Math.round((links / nodes) * 100) / 100;

  // γ指数 = 实际边数 / 最大可能边数
  const gamma = maxPossibleLinks > 0
    ? Math.round((links / maxPossibleLinks) * 100) / 100
    : 0;

  return { alpha, beta, gamma };
}

/**
 * 中心性指标计算（简化版）
 */
export function calculateCentrality(
  nodes: { id: string; lng: number; lat: number }[],
  edges: { from: string; to: string }[]
): {
  degreeCentrality: Record<string, number>;
  betweennessCentrality: Record<string, number>;
} {
  const degree: Record<string, number> = {};
  const betweenness: Record<string, number> = {};

  for (const node of nodes) {
    degree[node.id] = 0;
    betweenness[node.id] = 0;
  }

  // 度中心性 = 连接的边数
  for (const edge of edges) {
    degree[edge.from] = (degree[edge.from] || 0) + 1;
    degree[edge.to] = (degree[edge.to] || 0) + 1;
  }

  // 简化的介数中心性（基于最短路径，这里用度中心性近似）
  const maxDegree = Math.max(...Object.values(degree), 1);
  for (const id of Object.keys(betweenness)) {
    betweenness[id] = Math.round((degree[id] / maxDegree) * 100) / 100;
  }

  return { degreeCentrality: degree, betweennessCentrality: betweenness };
}

/**
 * 热力密度网格生成
 */
export function generateDensityGrid(
  points: { lng: number; lat: number }[],
  centerLng: number,
  centerLat: number,
  cellSize: number, // 度
  gridCount: number
): {
  lng: number;
  lat: number;
  count: number;
  density: number;
}[] {
  const cells: { lng: number; lat: number; count: number; density: number }[] = [];
  const startLng = centerLng - (gridCount * cellSize) / 2;
  const startLat = centerLat - (gridCount * cellSize) / 2;

  for (let i = 0; i < gridCount; i++) {
    for (let j = 0; j < gridCount; j++) {
      const cellLng = startLng + i * cellSize;
      const cellLat = startLat + j * cellSize;
      let count = 0;

      for (const point of points) {
        if (
          point.lng >= cellLng &&
          point.lng < cellLng + cellSize &&
          point.lat >= cellLat &&
          point.lat < cellLat + cellSize
        ) {
          count++;
        }
      }

      cells.push({
        lng: cellLng + cellSize / 2,
        lat: cellLat + cellSize / 2,
        count,
        density: count, // 密度 = 点数
      });
    }
  }

  return cells;
}
