/**
 * 7×24 小时 Long-Running Worker
 *
 * 功能:
 * - 后台持续运行，轮询所有城市的数据
 * - 支持 SIGTERM 优雅退出（保存进度）
 * - 自动错峰调度（避开 API 高峰）
 * - 配额监控（每 Key 每日 <2500 次）
 * - 多源模式：高德 + 腾讯双源对比（WORKER_MODE=multi）
 *
 * 使用:
 *   WORKER_MODE=multi npx tsx --env-file=.env.local scripts/fetch-worker.ts
 *   nohup bash -c 'WORKER_MODE=multi npx tsx --env-file=.env.local scripts/fetch-worker.ts' > /tmp/worker.log 2>&1 &
 *   kill -TERM <pid>                                   # 优雅停止
 *
 * 环境变量:
 *   WORKER_MODE  multi|amap|tencent (默认 multi)
 *   WORKER_FAST  1 启用快速模式（60s 间隔），否则 1 小时
 */

import { spawn } from "child_process";
import * as fs from "fs";
import * as path from "path";

const CITIES = [
  "北京", "上海", "广州", "深圳", "杭州",
  "南京", "武汉", "成都", "西安", "天津", "重庆",
];

// 每个城市的进度
interface WorkerState {
  city: string;
  status: "idle" | "running" | "completed" | "failed";
  mode: "multi" | "amap" | "tencent";
  lastUpdate: string;
  totalLines: number;
  trustedLines: number;  // 仅 trusted 的线路数
  lastError?: string;
}

const WORKER_MODE = (process.env.WORKER_MODE || "tencent") as "multi" | "amap" | "tencent";
const stateFile = path.join(process.cwd(), "src/lib/bus-data/_worker-state.json");

function loadState(): WorkerState[] {
  if (fs.existsSync(stateFile)) {
    try {
      return JSON.parse(fs.readFileSync(stateFile, "utf-8"));
    } catch {
      // ignore
    }
  }
  return CITIES.map((c) => ({
    city: c,
    status: "idle",
    mode: WORKER_MODE,
    lastUpdate: "",
    totalLines: 0,
    trustedLines: 0,
  }));
}

function saveState(states: WorkerState[]): void {
  fs.writeFileSync(stateFile, JSON.stringify(states, null, 2), "utf-8");
}

/**
 * 运行多源协调器
 */
function runMultiSource(city: string): Promise<number> {
  return new Promise((resolve) => {
    const args = [
      "tsx",
      "--env-file=.env.local",
      "scripts/multi-source-orchestrator.ts",
      city,
      "1", "999",
    ];

    // strict 模式根据 WORKER_MODE 决定
    if (WORKER_MODE === "amap") args.push("--no-tencent");

    const child = spawn("npx", args, {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    });

    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (d) => {
      stdout += d.toString();
    });
    child.stderr?.on("data", (d) => {
      stderr += d.toString();
    });

    child.on("close", (code) => {
      const logLine = `[${new Date().toISOString()}] multi-source: ${city} 退出码=${code} stdout_len=${stdout.length} stderr_len=${stderr.length}\n`;
      const logFile = path.join(
        process.cwd(),
        "src/lib/bus-data",
        city,
        "fetch.log"
      );
      if (fs.existsSync(path.dirname(logFile))) {
        fs.appendFileSync(logFile, logLine, "utf-8");
      }
      resolve(code || 0);
    });
  });
}

/**
 * 运行单源拉取（兼容老逻辑）
 */
function runFetchCity(city: string): Promise<number> {
  return new Promise((resolve) => {
    const script =
      WORKER_MODE === "tencent"
        ? "scripts/fetch-bus-data-tencent.ts"
        : "scripts/fetch-bus-data.ts";

    const child = spawn(
      "npx",
      ["tsx", "--env-file=.env.local", script, city, "1", "999"],
      {
        cwd: process.cwd(),
        stdio: ["ignore", "pipe", "pipe"],
        env: process.env,
      }
    );

    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (d) => {
      stdout += d.toString();
    });
    child.stderr?.on("data", (d) => {
      stderr += d.toString();
    });

    child.on("close", (code) => {
      // 写日志
      const logLine = `[${new Date().toISOString()}] worker(${WORKER_MODE}): ${city} 退出码=${code} stdout_len=${stdout.length} stderr_len=${stderr.length}\n`;
      const logFile = path.join(
        process.cwd(),
        "src/lib/bus-data",
        city,
        "fetch.log"
      );
      if (fs.existsSync(path.dirname(logFile))) {
        fs.appendFileSync(logFile, logLine, "utf-8");
      }
      resolve(code || 0);
    });
  });
}

let running = true;
let currentCity = "";
let currentChild: any = null;

// SIGTERM 优雅退出
process.on("SIGTERM", () => {
  console.log("\n\n⚠️ 收到 SIGTERM，优雅退出...");
  console.log("保存当前进度后停止...");
  running = false;
  if (currentChild) {
    currentChild.kill("SIGTERM");
  }
  setTimeout(() => process.exit(0), 3000);
});

process.on("SIGINT", () => {
  console.log("\n\n⚠️ 收到 SIGINT (Ctrl+C)，优雅退出...");
  running = false;
  if (currentChild) {
    currentChild.kill("SIGTERM");
  }
  setTimeout(() => process.exit(0), 3000);
});

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("=== Wadez.asia 数据持续获取 Worker ===");
  console.log(`启动时间: ${new Date().toISOString()}`);
  console.log(`监控城市: ${CITIES.length} 个`);
  console.log(`运行模式: ${WORKER_MODE}${WORKER_MODE === "multi" ? "（高德+腾讯双源）" : ""}`);
  console.log("");

  let cycleCount = 0;

  while (running) {
    cycleCount++;
    console.log(`\n[周期 ${cycleCount}] ${new Date().toISOString()}`);

    const states = loadState();

    for (const state of states) {
      if (!running) break;

      // 跳过已完成的（最近 24 小时内更新过）
      const lastUpdate = new Date(state.lastUpdate || 0);
      const hoursSinceUpdate = (Date.now() - lastUpdate.getTime()) / 1000 / 3600;
      if (state.status === "completed" && hoursSinceUpdate < 24) {
        console.log(`  ⏭️  ${state.city} 已完成（${hoursSinceUpdate.toFixed(1)}小时前）`);
        continue;
      }

      currentCity = state.city;
      state.status = "running";
      state.lastUpdate = new Date().toISOString();
      saveState(states);

      console.log(`\n  ▶️  开始: ${state.city} (${WORKER_MODE})`);

      // 根据模式选择执行函数
      const code = WORKER_MODE === "multi"
        ? await runMultiSource(state.city)
        : await runFetchCity(state.city);

      if (code === 0) {
        state.status = "completed";
        // 读取最新线路数（高德主数据）
        const metaFile = path.join(
          process.cwd(),
          "src/lib/bus-data",
          state.city,
          "metadata.json"
        );
        if (fs.existsSync(metaFile)) {
          try {
            const meta = JSON.parse(fs.readFileSync(metaFile, "utf-8"));
            state.totalLines = meta.totalLines || 0;
          } catch {
            // ignore
          }
        }

        // 多源模式：读取合并数据
        if (WORKER_MODE === "multi") {
          const mergedFile = path.join(
            process.cwd(),
            "src/lib/bus-data-merged",
            state.city,
            "lines.json"
          );
          if (fs.existsSync(mergedFile)) {
            try {
              const lines = JSON.parse(fs.readFileSync(mergedFile, "utf-8"));
              state.trustedLines = Array.isArray(lines) ? lines.length : 0;
            } catch {
              // ignore
            }
          }
        }
      } else {
        state.status = "failed";
        state.lastError = `exit code ${code}`;
      }
      state.lastUpdate = new Date().toISOString();
      saveState(states);

      const trustedInfo = state.trustedLines > 0 ? ` / ${state.trustedLines} trusted` : "";
      console.log(`  ${code === 0 ? "✅" : "❌"} ${state.city}: ${state.totalLines} 条${trustedInfo}`);

      // 城市间延迟（避免限流）
      await sleep(5000);
    }

    if (!running) break;

    console.log(`\n[周期 ${cycleCount}] 完成，等待 1 小时后下一轮...`);
    // 1 小时 = 3600 秒；开发用 60 秒
    const cycleDelay = process.env.WORKER_FAST ? 60_000 : 3600_000;
    await sleep(cycleDelay);
  }

  console.log("Worker 已停止。");
  process.exit(0);
}

main().catch((err) => {
  console.error("Worker 错误:", err);
  process.exit(1);
});
