import { useMemo } from "react";

export interface CrossSitePair {
  siteA: string;
  siteB: string;
  labelA: string;
  labelB: string;
  description: string;
}

export interface ScatterPoint {
  x: number;
  y: number;
  label: string;
}

export interface CrossSiteAnalysisResult {
  pair: CrossSitePair;
  correlation: number;
  regressionSlope: number;
  regressionIntercept: number;
  rSquared: number;
  sampleSize: number;
  scatterData: ScatterPoint[];
  interpretation: string;
}

// 定义已知的子网站关联映射
const CROSS_SITE_PAIRS: CrossSitePair[] = [
  {
    siteA: "population-density",
    siteB: "accessibility",
    labelA: "人口密度 (人/ha)",
    labelB: "可达性综合评分",
    description: "人口密度与设施可达性的关联分析：高密度区域通常拥有更完善的配套设施",
  },
  {
    siteA: "poi-heat",
    siteB: "traffic-capacity",
    labelA: "POI密度 (个/km²)",
    labelB: "道路饱和度 (%)",
    description: "POI热力与交通承载力的关联：兴趣点密集区域往往伴随更高的交通压力",
  },
  {
    siteA: "heat-island",
    siteB: "greenway",
    labelA: "热岛强度 (°C)",
    labelB: "绿道覆盖率 (%)",
    description: "热岛效应与绿道系统的关联：绿道网络对缓解城市热岛具有显著作用",
  },
  {
    siteA: "development-intensity",
    siteB: "building-morphology",
    labelA: "开发强度指数",
    labelB: "建筑密度 (%)",
    description: "开发强度与建筑形态的关联：容积率与建筑密度呈现显著正相关",
  },
  {
    siteA: "land-use",
    siteB: "population-density",
    labelA: "居住用地比例 (%)",
    labelB: "人口密度 (人/ha)",
    description: "用地结构与人口分布的关联：居住用地占比直接影响人口空间分布",
  },
  {
    siteA: "street-syntax",
    siteB: "accessibility",
    labelA: "路网整合度",
    labelB: "可达性综合评分",
    description: "街道网络与可达性的关联：整合度高的路网通常带来更好的空间可达性",
  },
];

// 根据关联对生成模拟散点数据
function generateScatterData(pair: CrossSitePair): ScatterPoint[] {
  const seed = pair.siteA.length + pair.siteB.length;
  const points: ScatterPoint[] = [];
  const n = 12;

  for (let i = 0; i < n; i++) {
    const t = (i + 1) / n;
    // 使用伪随机但确定性的方式生成数据
    const noise = Math.sin(seed * 7 + i * 13) * 0.3;
    const xBase = 20 + t * 60;
    const x = Math.max(0, Math.round(xBase + noise * 15));
    // y 与 x 有正相关关系，但带有噪声
    const slope = 0.6 + Math.sin(seed * 3) * 0.3;
    const yBase = x * slope + (100 - x * slope) * 0.2;
    const yNoise = Math.cos(seed * 11 + i * 7) * 12;
    const y = Math.max(0, Math.round(Math.min(100, yBase + yNoise)));

    points.push({
      x,
      y,
      label: `区域${String.fromCharCode(65 + i)}`,
    });
  }

  return points;
}

// 计算皮尔逊相关系数
function calcCorrelation(points: ScatterPoint[]): number {
  const n = points.length;
  if (n < 2) return 0;

  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumX2 = points.reduce((s, p) => s + p.x * p.x, 0);
  const sumY2 = points.reduce((s, p) => s + p.y * p.y, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  if (denominator === 0) return 0;
  return Math.round((numerator / denominator) * 100) / 100;
}

// 计算线性回归系数
function calcRegression(points: ScatterPoint[]) {
  const n = points.length;
  if (n < 2) return { slope: 0, intercept: 0 };

  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumX2 = points.reduce((s, p) => s + p.x * p.x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return {
    slope: Math.round(slope * 100) / 100,
    intercept: Math.round(intercept * 100) / 100,
  };
}

// 计算 R²
function calcRSquared(points: ScatterPoint[], slope: number, intercept: number): number {
  const n = points.length;
  if (n < 2) return 0;

  const meanY = points.reduce((s, p) => s + p.y, 0) / n;
  const ssTot = points.reduce((s, p) => s + Math.pow(p.y - meanY, 2), 0);
  const ssRes = points.reduce(
    (s, p) => s + Math.pow(p.y - (slope * p.x + intercept), 2),
    0
  );

  if (ssTot === 0) return 0;
  return Math.round((1 - ssRes / ssTot) * 100) / 100;
}

function getInterpretation(correlation: number): string {
  const abs = Math.abs(correlation);
  if (abs >= 0.8) return "强相关";
  if (abs >= 0.5) return "中等相关";
  if (abs >= 0.3) return "弱相关";
  return "几乎无相关";
}

export function useCrossSiteAnalysis(
  siteA: string,
  siteB: string
): CrossSiteAnalysisResult | null {
  return useMemo(() => {
    const pair = CROSS_SITE_PAIRS.find(
      (p) =>
        (p.siteA === siteA && p.siteB === siteB) ||
        (p.siteA === siteB && p.siteB === siteA)
    );

    if (!pair) return null;

    const scatterData = generateScatterData(pair);
    const correlation = calcCorrelation(scatterData);
    const { slope, intercept } = calcRegression(scatterData);
    const rSquared = calcRSquared(scatterData, slope, intercept);

    return {
      pair,
      correlation,
      regressionSlope: slope,
      regressionIntercept: intercept,
      rSquared,
      sampleSize: scatterData.length,
      scatterData,
      interpretation: getInterpretation(correlation),
    };
  }, [siteA, siteB]);
}

export function getAvailablePairs(): CrossSitePair[] {
  return CROSS_SITE_PAIRS;
}

export function getRelatedSites(siteId: string): string[] {
  const related = new Set<string>();
  CROSS_SITE_PAIRS.forEach((pair) => {
    if (pair.siteA === siteId) related.add(pair.siteB);
    if (pair.siteB === siteId) related.add(pair.siteA);
  });
  return Array.from(related);
}
