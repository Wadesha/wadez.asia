import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

interface CityDataStatus {
  city: string;
  totalLines: number;
  totalStops?: number;
  lastUpdate: string;
  status: "completed" | "running" | "not-started" | "failed";
  version: string;
  sources: string[];
  progress?: {
    lastKeyword: string;
    totalFetched: number;
    startTime: string;
    lastUpdate: string;
  };
  tencent?: {
    totalLines: number;
    lastUpdate: string;
  };
}

const EXPECTED_CITIES = [
  "北京", "上海", "广州", "深圳", "杭州",
  "南京", "武汉", "成都", "西安", "天津", "重庆",
  "苏州", "郑州", "长沙", "青岛", "沈阳", "宁波",
  "佛山", "合肥", "大连", "厦门", "福州", "无锡",
  "济南", "哈尔滨", "石家庄", "贵阳", "南宁",
  "太原", "昆明", "南昌", "长春", "兰州",
  "常州", "南通", "徐州", "温州", "金华", "绍兴",
  "嘉兴", "台州", "珠海", "惠州", "中山",
];

const DATA_DIR = path.join(process.cwd(), "src/lib/bus-data");
const TENCENT_DATA_DIR = path.join(process.cwd(), "src/lib/bus-data-tencent");
const WORKER_STATE_FILE = path.join(DATA_DIR, "_worker-state.json");

interface WorkerStateItem {
  city: string;
  status: "idle" | "running" | "completed" | "failed";
  mode?: string;
  lastUpdate: string;
  totalLines: number;
  trustedLines?: number;
  lastError?: string;
}

function readWorkerState(): WorkerStateItem[] {
  if (!fs.existsSync(WORKER_STATE_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(WORKER_STATE_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function readTencentData(city: string): { totalLines: number; lastUpdate: string } | null {
  const cityDir = path.join(TENCENT_DATA_DIR, city);
  if (!fs.existsSync(cityDir)) return null;

  const resultsFile = path.join(cityDir, "results.json");
  if (!fs.existsSync(resultsFile)) return null;

  try {
    const stat = fs.statSync(resultsFile);
    const data = JSON.parse(fs.readFileSync(resultsFile, "utf-8"));
    return {
      totalLines: Array.isArray(data) ? data.length : 0,
      lastUpdate: stat.mtime.toISOString(),
    };
  } catch {
    return null;
  }
}

function readCityStatus(city: string): CityDataStatus | null {
  const cityDir = path.join(DATA_DIR, city);
  if (!fs.existsSync(cityDir)) {
    return null;
  }

  const metaFile = path.join(cityDir, "metadata.json");
  const progressFile = path.join(cityDir, "progress.json");

  if (!fs.existsSync(metaFile)) return null;

  try {
    const metadata = JSON.parse(fs.readFileSync(metaFile, "utf-8"));
    let progress;
    if (fs.existsSync(progressFile)) {
      try {
        progress = JSON.parse(fs.readFileSync(progressFile, "utf-8"));
      } catch {
        progress = undefined;
      }
    }

    return {
      city,
      totalLines: metadata.totalLines || 0,
      totalStops: metadata.totalStops,
      lastUpdate: metadata.lastUpdate,
      status: "completed",
      version: metadata.version || "1.0.0",
      sources: metadata.sources || [],
      progress,
    };
  } catch (err) {
    return null;
  }
}

export async function GET() {
  const workerState = readWorkerState();
  const workerMap = new Map(workerState.map((w) => [w.city, w]));

  const cities: CityDataStatus[] = [];

  for (const city of EXPECTED_CITIES) {
    const amapStatus = readCityStatus(city);
    const tencentData = readTencentData(city);
    const workerItem = workerMap.get(city);

    let status: CityDataStatus["status"] = "not-started";
    let totalLines = 0;
    let lastUpdate = "";
    let sources: string[] = [];
    let progress;

    if (amapStatus) {
      totalLines = amapStatus.totalLines;
      lastUpdate = amapStatus.lastUpdate;
      sources = amapStatus.sources;
      progress = amapStatus.progress;
      status = amapStatus.status;
    }

    if (tencentData && tencentData.totalLines > totalLines) {
      totalLines = tencentData.totalLines;
      lastUpdate = tencentData.lastUpdate;
      if (!sources.includes("腾讯地图API")) {
        sources.push("腾讯地图API");
      }
    }

    if (workerItem) {
      if (workerItem.status === "running") {
        status = "running";
      } else if (workerItem.status === "failed") {
        status = "failed";
      } else if (workerItem.status === "completed" && totalLines > 0) {
        status = "completed";
      }
    }

    cities.push({
      city,
      totalLines,
      lastUpdate,
      status,
      version: "1.0.0",
      sources,
      progress,
      tencent: tencentData || undefined,
    });
  }

  const completed = cities.filter((c) => c.status === "completed" && c.totalLines > 0).length;
  const running = cities.filter((c) => c.status === "running").length;
  const totalLines = cities.reduce((sum, c) => sum + c.totalLines, 0);
  const totalStops = cities.reduce((sum, c) => sum + (c.totalStops || 0), 0);

  const workerRunning = workerState.some((w) => w.status === "running");
  const workerMode = workerState.find((w) => w.mode)?.mode || "unknown";

  return NextResponse.json({
    summary: {
      totalCities: EXPECTED_CITIES.length,
      completedCities: completed,
      runningCities: running,
      totalLines,
      totalStops,
      workerRunning,
      workerMode,
    },
    cities,
    worker: workerState,
    timestamp: new Date().toISOString(),
  });
}
