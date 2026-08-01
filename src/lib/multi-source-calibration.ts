export interface DataSourceValue {
  sourceId: string;
  sourceName: string;
  value: number;
  timestamp: number;
  weight?: number;
}

export interface CalibrationResult {
  calibratedValue: number;
  confidence: number;
  sources: Array<{
    sourceId: string;
    sourceName: string;
    value: number;
    deviation: number;
    isOutlier: boolean;
    weight: number;
  }>;
  method: "mean" | "weighted" | "median";
  outlierCount: number;
  stdDev: number;
}

function mean(values: number[]): number {
  return values.reduce((s, v) => s + v, 0) / values.length;
}

function stdDev(values: number[]): number {
  const m = mean(values);
  const variance = values.reduce((s, v) => s + Math.pow(v - m, 2), 0) / values.length;
  return Math.sqrt(variance);
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  if (n === 0) return 0;
  if (n % 2 === 1) return sorted[Math.floor(n / 2)];
  return (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
}

export function calibrateData(
  sources: DataSourceValue[],
  options: {
    method?: "mean" | "weighted" | "median";
    outlierThreshold?: number;
    autoWeight?: boolean;
  } = {}
): CalibrationResult {
  const { method = "mean", outlierThreshold = 2, autoWeight = false } = options;

  if (sources.length === 0) {
    return {
      calibratedValue: 0,
      confidence: 0,
      sources: [],
      method,
      outlierCount: 0,
      stdDev: 0,
    };
  }

  if (sources.length === 1) {
    const s = sources[0];
    return {
      calibratedValue: s.value,
      confidence: 0.5,
      sources: [
        {
          sourceId: s.sourceId,
          sourceName: s.sourceName,
          value: s.value,
          deviation: 0,
          isOutlier: false,
          weight: s.weight ?? 1,
        },
      ],
      method,
      outlierCount: 0,
      stdDev: 0,
    };
  }

  const values = sources.map((s) => s.value);
  const sd = stdDev(values);
  const avg = mean(values);
  const med = median(values);

  // 标准差法识别异常源
  const lowerBound = avg - outlierThreshold * sd;
  const upperBound = avg + outlierThreshold * sd;

  const sourceDetails = sources.map((s) => {
    const isOutlier = s.value < lowerBound || s.value > upperBound;
    const deviation = s.value - avg;
    return {
      sourceId: s.sourceId,
      sourceName: s.sourceName,
      value: s.value,
      deviation: Math.round(deviation * 1000) / 1000,
      isOutlier,
      weight: s.weight ?? 1,
    };
  });

  const validSources = sourceDetails.filter((s) => !s.isOutlier);
  const outlierCount = sourceDetails.length - validSources.length;

  // 计算校准值
  let calibratedValue: number;
  if (method === "median") {
    calibratedValue = med;
  } else if (method === "weighted") {
    const totalWeight = validSources.reduce((s, v) => s + v.weight, 0);
    calibratedValue =
      totalWeight > 0
        ? validSources.reduce((s, v) => s + v.value * v.weight, 0) / totalWeight
        : avg;
  } else {
    calibratedValue =
      validSources.length > 0
        ? mean(validSources.map((s) => s.value))
        : avg;
  }

  // 计算置信度：基于有效源数量、标准差和偏差一致性
  const validRatio = validSources.length / sources.length;
  const cv = avg !== 0 ? sd / Math.abs(avg) : 0;
  const consistency = Math.max(0, 1 - cv * 2);
  const confidence = Math.min(
    1,
    Math.round((validRatio * 0.4 + consistency * 0.4 + Math.min(sources.length, 5) * 0.04) * 100) / 100
  );

  return {
    calibratedValue: Math.round(calibratedValue * 1000) / 1000,
    confidence,
    sources: sourceDetails,
    method,
    outlierCount,
    stdDev: Math.round(sd * 1000) / 1000,
  };
}

export function formatConfidence(confidence: number): string {
  if (confidence >= 0.9) return "极高";
  if (confidence >= 0.75) return "高";
  if (confidence >= 0.6) return "中等";
  if (confidence >= 0.4) return "较低";
  return "低";
}
