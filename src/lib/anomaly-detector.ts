export type AnomalyType = "temperature" | "noise" | "density" | "aqi" | "intensity" | "flow" | "generic";

export interface AnomalyItem {
  id: string;
  name: string;
  value: number;
  expectedRange: [number, number];
  anomalyType: AnomalyType;
  severity: "low" | "medium" | "high" | "critical";
  suggestion: string;
  deviation: number;
}

export interface AnomalyResult {
  anomalies: AnomalyItem[];
  total: number;
  criticalCount: number;
  method: "std" | "iqr";
}

function mean(values: number[]): number {
  return values.reduce((s, v) => s + v, 0) / values.length;
}

function stdDev(values: number[]): number {
  const m = mean(values);
  const variance = values.reduce((s, v) => s + Math.pow(v - m, 2), 0) / values.length;
  return Math.sqrt(variance);
}

function quartiles(values: number[]): { q1: number; q3: number; iqr: number } {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const q1Pos = (n - 1) * 0.25;
  const q3Pos = (n - 1) * 0.75;
  const q1Index = Math.floor(q1Pos);
  const q3Index = Math.floor(q3Pos);
  const q1Frac = q1Pos - q1Index;
  const q3Frac = q3Pos - q3Index;
  const q1 = sorted[q1Index] * (1 - q1Frac) + (sorted[q1Index + 1] || sorted[q1Index]) * q1Frac;
  const q3 = sorted[q3Index] * (1 - q3Frac) + (sorted[q3Index + 1] || sorted[q3Index]) * q3Frac;
  return { q1, q3, iqr: q3 - q1 };
}

function getSeverity(deviation: number, threshold: number): "low" | "medium" | "high" | "critical" {
  const ratio = deviation / threshold;
  if (ratio >= 3) return "critical";
  if (ratio >= 2) return "high";
  if (ratio >= 1) return "medium";
  return "low";
}

function getSuggestion(anomalyType: AnomalyType, severity: string, high: boolean): string {
  const direction = high ? "偏高" : "偏低";
  const suggestions: Record<AnomalyType, string[]> = {
    temperature: [
      `${direction}异常，建议检查监测设备并核实周边环境变化`,
      `${direction}异常，建议增加绿化覆盖或调整通风廊道`,
      `温度${direction}显著，建议启动应急预案并通知相关部门`,
    ],
    noise: [
      `${direction}异常，建议复核声级计校准状态`,
      `噪声${direction}，建议排查新增声源或施工活动`,
      `噪声${direction}严重，建议限制作业时间或加装隔音设施`,
    ],
    density: [
      `${direction}异常，建议核查人口统计口径`,
      `密度${direction}，建议优化公共设施配置`,
      `密度${direction}显著，建议启动人口调控或扩容计划`,
    ],
    aqi: [
      `${direction}异常，建议校验仪器并复核气象条件`,
      `空气质量${direction}，建议加强污染源排查`,
      `污染${direction}严重，建议发布预警并限制户外活动`,
    ],
    intensity: [
      `${direction}异常，建议复核热岛模拟参数`,
      `热岛强度${direction}，建议增加透水铺装与遮阴设施`,
      `热岛效应${direction}显著，建议优先实施缓解工程`,
    ],
    flow: [
      `${direction}异常，建议检查计数设备`,
      `客流${direction}，建议动态调整运力与人员部署`,
      `客流${direction}显著，建议启动大客流预案`,
    ],
    generic: [
      `${direction}异常，建议复核数据来源`,
      `数值${direction}，建议持续关注并分析原因`,
      `异常程度显著，建议立即排查并上报`,
    ],
  };
  const list = suggestions[anomalyType] || suggestions.generic;
  if (severity === "critical") return list[2];
  if (severity === "high") return list[1];
  return list[0];
}

export interface DetectAnomaliesInput {
  id: string;
  name: string;
  value: number;
}

export function detectAnomalies(
  data: DetectAnomaliesInput[],
  options: {
    threshold?: number;
    method?: "std" | "iqr";
    anomalyType?: AnomalyType;
  } = {}
): AnomalyResult {
  const { threshold = 2, method = "std", anomalyType = "generic" } = options;
  const values = data.map((d) => d.value);
  if (values.length < 3) {
    return { anomalies: [], total: 0, criticalCount: 0, method };
  }

  const avg = mean(values);
  let lowerBound: number;
  let upperBound: number;

  if (method === "std") {
    const sd = stdDev(values);
    lowerBound = avg - threshold * sd;
    upperBound = avg + threshold * sd;
  } else {
    const { q1, q3, iqr } = quartiles(values);
    lowerBound = q1 - threshold * iqr;
    upperBound = q3 + threshold * iqr;
  }

  const anomalies: AnomalyItem[] = [];

  for (const item of data) {
    const v = item.value;
    if (v >= lowerBound && v <= upperBound) continue;

    const high = v > upperBound;
    const deviation = high ? v - upperBound : lowerBound - v;
    const severity = getSeverity(deviation, method === "std" ? stdDev(values) : quartiles(values).iqr);

    anomalies.push({
      id: item.id,
      name: item.name,
      value: v,
      expectedRange: [Math.round(lowerBound * 100) / 100, Math.round(upperBound * 100) / 100],
      anomalyType,
      severity,
      suggestion: getSuggestion(anomalyType, severity, high),
      deviation: Math.round(deviation * 100) / 100,
    });
  }

  anomalies.sort((a, b) => {
    const sevOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    return sevOrder[b.severity] - sevOrder[a.severity] || b.deviation - a.deviation;
  });

  return {
    anomalies,
    total: anomalies.length,
    criticalCount: anomalies.filter((a) => a.severity === "critical").length,
    method,
  };
}

export function detectAnomaliesFromValues(
  values: number[],
  threshold: number = 2,
  method: "std" | "iqr" = "std"
): Array<{ index: number; value: number; severity: "low" | "medium" | "high" | "critical" }> {
  const data = values.map((v, i) => ({ id: String(i), name: String(i), value: v }));
  const result = detectAnomalies(data, { threshold, method, anomalyType: "generic" });
  return result.anomalies.map((a) => ({
    index: Number(a.id),
    value: a.value,
    severity: a.severity,
  }));
}
