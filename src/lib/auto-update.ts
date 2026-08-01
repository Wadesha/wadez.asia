export type DataFreshnessStatus = "fresh" | "expiring-soon" | "expired";

export interface FreshnessResult {
  status: DataFreshnessStatus;
  message: string;
  hoursElapsed: number;
  ttlHours: number;
}

const SIMULATED_TTL_HOURS = 8760;
const API_TTL_HOURS = 24;
const EXPIRING_THRESHOLD_HOURS = 4;

export function checkDataFreshness(
  lastUpdated: string | Date | undefined,
  dataSource: "simulated" | "real" | string = "simulated"
): FreshnessResult {
  const isSimulated =
    dataSource === "simulated" || dataSource === "mock";
  const ttlHours = isSimulated ? SIMULATED_TTL_HOURS : API_TTL_HOURS;

  if (!lastUpdated) {
    return {
      status: isSimulated ? "fresh" : "expired",
      message: isSimulated ? "数据长期有效" : "数据可能已过期",
      hoursElapsed: isSimulated ? 0 : Infinity,
      ttlHours,
    };
  }

  const lastDate =
    typeof lastUpdated === "string" ? new Date(lastUpdated) : lastUpdated;
  const now = new Date();
  const hoursElapsed =
    (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60);

  if (hoursElapsed >= ttlHours) {
    return {
      status: "expired",
      message: "数据可能已过期",
      hoursElapsed,
      ttlHours,
    };
  }

  if (hoursElapsed >= ttlHours - EXPIRING_THRESHOLD_HOURS) {
    return {
      status: "expiring-soon",
      message: `数据将于 ${Math.round(ttlHours - hoursElapsed)} 小时后过期`,
      hoursElapsed,
      ttlHours,
    };
  }

  return {
    status: "fresh",
    message: "数据新鲜",
    hoursElapsed,
    ttlHours,
  };
}
