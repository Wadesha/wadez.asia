export interface DataQualityScores {
  completeness: number;
  accuracy: number;
  timeliness: number;
  consistency: number;
  total: number;
}

export interface DataQualityDataset {
  dataSource?: "simulated" | "real" | string;
  recordCount?: number;
}

export function calculateDataQuality(
  dataset: DataQualityDataset
): DataQualityScores {
  const source = dataset.dataSource || "simulated";
  const isSimulated = source === "simulated" || source === "mock";

  const baseCompleteness = isSimulated ? 62 : 92;
  const baseAccuracy = isSimulated ? 58 : 90;
  const baseTimeliness = isSimulated ? 55 : 88;
  const baseConsistency = isSimulated ? 60 : 94;

  const variation = (base: number): number => {
    if (dataset.recordCount !== undefined && dataset.recordCount > 0) {
      const delta = (dataset.recordCount % 13) - 6;
      return Math.max(0, Math.min(100, base + delta));
    }
    return base;
  };

  const completeness = variation(baseCompleteness);
  const accuracy = variation(baseAccuracy);
  const timeliness = variation(baseTimeliness);
  const consistency = variation(baseConsistency);

  const total = Math.round(
    completeness * 0.3 +
      accuracy * 0.3 +
      timeliness * 0.2 +
      consistency * 0.2
  );

  return {
    completeness,
    accuracy,
    timeliness,
    consistency,
    total,
  };
}
