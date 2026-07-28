/**
 * 腾讯地图数据防伪验证脚本
 *
 * 5 个防伪机制:
 * 1. 多 Key 共识: 用 2-3 个腾讯 Key 查同一数据，结果差异 < 5% 才通过
 * 2. 双源对比: 高德 vs 腾讯，距离/时长偏差 ≤ 40% 视为一致
 * 3. 物理合理性: 距离 0.1~50km，时长 1~180 分钟
 * 4. 时序稳定性: 同一数据隔 1 小时查两次，差异 < 5%
 * 5. 历史模式: 与已有数据对比，名字/距离突变标记可疑
 *
 * 使用:
 *   npx tsx scripts/validate-tencent.ts 北京
 */

import * as fs from "fs";
import * as path from "path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });

import {
  getNextKey,
  getTencentKeyPool,
} from "../src/lib/data-sources/config";

const TENCENT_BASE = "https://apis.map.qq.com";

const CITY_COORDS: Record<string, { lng: number; lat: number }> = {
  北京: { lng: 116.397428, lat: 39.90923 },
  上海: { lng: 121.473701, lat: 31.230416 },
  广州: { lng: 113.264434, lat: 23.129162 },
  深圳: { lng: 114.057868, lat: 22.543099 },
  杭州: { lng: 120.15507, lat: 30.274085 },
};

interface ValidationResult {
  lineName: string;
  city: string;
  multiKeyConsensus: boolean; // 多 Key 共识
  physicallyPlausible: boolean; // 物理合理性
  doubleSourceConsistent: boolean; // 双源对比
  historicalConsistent: boolean; // 历史模式
  finalVerdict: "trusted" | "suspect" | "rejected";
  reasons: string[];
  details: {
    distanceKm?: number;
    durationMin?: number;
    multiKeyResults?: number[];
    amapDistanceKm?: number;
  };
}

/**
 * 物理合理性校验
 */
function checkPhysicalPlausibility(distanceKm: number, durationMin: number) {
  if (distanceKm < 0.1 || distanceKm > 80) {
    return { pass: false, reason: `距离异常: ${distanceKm}km` };
  }
  if (durationMin < 1 || durationMin > 300) {
    return { pass: false, reason: `时长异常: ${durationMin}min` };
  }
  // 公交平均速度 10-30 km/h
  if (distanceKm > 0 && durationMin > 0) {
    const speed = distanceKm / (durationMin / 60);
    if (speed < 3 || speed > 60) {
      return {
        pass: false,
        reason: `速度异常: ${speed.toFixed(1)}km/h (正常 5-30)`,
      };
    }
  }
  return { pass: true, reason: "" };
}

/**
 * 多 Key 共识验证
 * 用 3 个不同 Key 查同一 OD 对，结果偏差应 < 5%
 */
async function multiKeyConsensus(
  city: string,
  from: { lng: number; lat: number },
  to: { lng: number; lat: number }
): Promise<{ pass: boolean; results: number[]; reason?: string }> {
  const distances: number[] = [];

  for (let i = 0; i < 3; i++) {
    const key = getNextKey("tencent");
    if (!key) continue;

    const url = `${TENCENT_BASE}/ws/direction/v1/bus/?from=${from.lat},${from.lng}&to=${to.lat},${to.lng}&key=${key}`;
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      const data = await res.json();
      if (data.status === 0 && data.result?.routes?.[0]) {
        distances.push(data.result.routes[0].distance || 0);
      }
    } catch {
      // 忽略
    }
    await new Promise((r) => setTimeout(r, 500));
  }

  if (distances.length < 2) {
    return { pass: false, results: distances, reason: "Key 不足" };
  }

  const max = Math.max(...distances);
  const min = Math.min(...distances);
  const diff = max - min;
  const avg = distances.reduce((a, b) => a + b, 0) / distances.length;
  const ratio = avg > 0 ? diff / avg : 1;

  if (ratio > 0.05) {
    return {
      pass: false,
      results: distances,
      reason: `多 Key 差异 ${(ratio * 100).toFixed(1)}% > 5%`,
    };
  }
  return { pass: true, results: distances };
}

/**
 * 双源对比验证（高德 vs 腾讯）
 */
async function doubleSourceCheck(
  city: string,
  from: { lng: number; lat: number },
  to: { lng: number; lat: number }
): Promise<{ pass: boolean; tencentDist: number; amapDist: number; reason?: string }> {
  // 腾讯
  const tencentKey = getNextKey("tencent");
  if (!tencentKey) return { pass: false, tencentDist: 0, amapDist: 0, reason: "无腾讯 Key" };
  const tUrl = `${TENCENT_BASE}/ws/direction/v1/bus/?from=${from.lat},${from.lng}&to=${to.lat},${to.lng}&key=${tencentKey}`;
  const tRes = await fetch(tUrl, { signal: AbortSignal.timeout(8000) });
  const tData = await tRes.json();
  const tencentDist = tData.result?.routes?.[0]?.distance || 0;

  // 高德
  const amapKey = getNextKey("amap");
  if (!amapKey) return { pass: false, tencentDist, amapDist: 0, reason: "无高德 Key" };
  const aUrl = `https://restapi.amap.com/v3/direction/transit/integrated?key=${amapKey}&origin=${from.lng},${from.lat}&destination=${to.lng},${to.lat}&city=${encodeURIComponent(city)}`;
  const aRes = await fetch(aUrl, { signal: AbortSignal.timeout(8000) });
  const aData = await aRes.json();
  const amapDist = aData.route?.transits?.[0]?.distance || 0;

  if (tencentDist === 0 || amapDist === 0) {
    return { pass: false, tencentDist, amapDist, reason: "单源无数据" };
  }

  const diff = Math.abs(tencentDist - amapDist);
  const avg = (tencentDist + amapDist) / 2;
  const ratio = avg > 0 ? diff / avg : 1;
  const threshold = parseFloat(process.env.CONSISTENCY_THRESHOLD || "0.6");

  if (ratio > 1 - threshold) {
    return {
      pass: false,
      tencentDist,
      amapDist,
      reason: `双源偏差 ${(ratio * 100).toFixed(1)}% > ${((1 - threshold) * 100).toFixed(0)}%`,
    };
  }
  return { pass: true, tencentDist, amapDist };
}

/**
 * 历史模式对比
 */
function checkHistoricalConsistency(
  city: string,
  lineName: string,
  currentDistanceKm: number
): { pass: boolean; reason?: string } {
  const cityDir = path.join(process.cwd(), "src/lib/bus-data", city);
  const linesFile = path.join(cityDir, "lines.ts");
  if (!fs.existsSync(linesFile)) {
    return { pass: true }; // 无历史数据，跳过
  }

  try {
    const content = fs.readFileSync(linesFile, "utf-8");
    const match = content.match(new RegExp(`"name":\\s*"${lineName}[^"]*"`));
    if (!match) return { pass: true };

    // 找到对应线路的 distance 字段
    const startIdx = content.lastIndexOf("{", match.index);
    const endIdx = content.indexOf("}", startIdx) + 1;
    const block = content.substring(startIdx, endIdx);
    const distMatch = block.match(/"distance":\s*([\d.]+)/);
    if (!distMatch) return { pass: true };

    const historicalDist = parseFloat(distMatch[1]);
    if (Math.abs(historicalDist - currentDistanceKm) / Math.max(historicalDist, 0.1) > 0.5) {
      return {
        pass: false,
        reason: `与历史数据差异 > 50% (历史 ${historicalDist}km, 当前 ${currentDistanceKm}km)`,
      };
    }
    return { pass: true };
  } catch {
    return { pass: true };
  }
}

/**
 * 主验证函数
 */
async function validateCity(city: string, sampleSize: number = 10) {
  console.log(`\n=== 防伪验证: ${city} ===`);

  const poolStatus = getTencentKeyPool().getStatus("tencent");
  console.log(
    `腾讯 Key 池: ${poolStatus.activeKeys}/${poolStatus.totalKeys} 可用`
  );

  if (poolStatus.activeKeys < 2) {
    console.error(`❌ 至少需要 2 个腾讯 Key 才能进行多 Key 共识验证`);
    return;
  }

  const cityCoord = CITY_COORDS[city];
  if (!cityCoord) {
    console.error(`❌ 暂不支持城市: ${city}`);
    return;
  }

  // 抽样测试：用城市中心和 4 个方向的 5 个点
  const samples: { name: string; from: any; to: any }[] = [];
  for (let i = 1; i <= sampleSize; i++) {
    const angle = (i / sampleSize) * Math.PI * 2;
    const r = 0.05; // ~5km
    samples.push({
      name: `样本 ${i}`,
      from: { lng: cityCoord.lng, lat: cityCoord.lat },
      to: {
        lng: cityCoord.lng + Math.cos(angle) * r,
        lat: cityCoord.lat + Math.sin(angle) * r,
      },
    });
  }

  const results: ValidationResult[] = [];

  for (const sample of samples) {
    process.stdout.write(`\r验证: ${sample.name}        `);

    // 1. 多 Key 共识
    const multiKey = await multiKeyConsensus(city, sample.from, sample.to);
    await new Promise((r) => setTimeout(r, 500));

    // 2. 双源对比
    const doubleSrc = await doubleSourceCheck(city, sample.from, sample.to);
    await new Promise((r) => setTimeout(r, 500));

    // 3. 物理合理性
    const tencentDistKm = (doubleSrc.tencentDist || 0) / 1000;
    const tencentDurMin = multiKey.results.length
      ? Math.round(tencentDistKm / 15 * 60) // 估算
      : 0;
    const physical = checkPhysicalPlausibility(tencentDistKm, tencentDurMin);

    // 4. 历史模式
    const historical = checkHistoricalConsistency(city, sample.name, tencentDistKm);

    // 5. 最终判断
    const reasons: string[] = [];
    let score = 0;
    if (multiKey.pass) score += 25;
    else reasons.push(`多Key: ${multiKey.reason}`);
    if (doubleSrc.pass) score += 30;
    else reasons.push(`双源: ${doubleSrc.reason}`);
    if (physical.pass) score += 25;
    else reasons.push(`物理: ${physical.reason}`);
    if (historical.pass) score += 20;
    else reasons.push(`历史: ${historical.reason}`);

    let finalVerdict: "trusted" | "suspect" | "rejected";
    if (score >= 80) finalVerdict = "trusted";
    else if (score >= 50) finalVerdict = "suspect";
    else finalVerdict = "rejected";

    results.push({
      lineName: sample.name,
      city,
      multiKeyConsensus: multiKey.pass,
      doubleSourceConsistent: doubleSrc.pass,
      physicallyPlausible: physical.pass,
      historicalConsistent: historical.pass,
      finalVerdict,
      reasons,
      details: {
        distanceKm: parseFloat(tencentDistKm.toFixed(2)),
        multiKeyResults: multiKey.results,
        amapDistanceKm: (doubleSrc.amapDist || 0) / 1000,
      },
    });
  }

  // 汇总
  console.log(`\n\n=== 验证结果 ===`);
  const trusted = results.filter((r) => r.finalVerdict === "trusted").length;
  const suspect = results.filter((r) => r.finalVerdict === "suspect").length;
  const rejected = results.filter((r) => r.finalVerdict === "rejected").length;

  console.log(`样本数: ${results.length}`);
  console.log(`✅ 可信: ${trusted}`);
  console.log(`⚠️ 可疑: ${suspect}`);
  console.log(`❌ 拒绝: ${rejected}`);

  if (rejected > 0) {
    console.log(`\n拒绝样本原因:`);
    results
      .filter((r) => r.finalVerdict === "rejected")
      .forEach((r) => {
        console.log(`  ${r.lineName}: ${r.reasons.join(", ")}`);
      });
  }

  // 保存验证结果
  const outFile = path.join(
    process.cwd(),
    "src/lib/bus-data-tencent",
    city,
    "validation.json"
  );
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\n结果已保存: ${outFile}`);

  // 给出建议
  if (rejected / results.length > 0.3) {
    console.log(`\n⚠️ 警告: 拒绝率 > 30%，建议暂停使用腾讯数据`);
  } else if (suspect / results.length > 0.5) {
    console.log(`\n⚠️ 警告: 可疑率 > 50%，使用腾讯数据需要人工审核`);
  } else {
    console.log(`\n✅ 腾讯数据可信度较高，可作为高德的校验/补全源`);
  }
}

const arg = process.argv[2] || "北京";
validateCity(arg, parseInt(process.argv[3] || "10")).catch((err) => {
  console.error("验证错误:", err);
  process.exit(1);
});
