/**
 * 高德 Web Service API Key 验证脚本
 * 测试多个 API Key，找出能用于公交线路查询的有效 Key
 */

// 从 .env.local 中读取的可用 Keys
const AMAP_KEYS = [
  "dc6fa182a56d82275d8b6f809c72c772",
  "cbafc3d69edd44f1b8ac1c48ad30cf86",
  "69941a31a059680b6b7a370ac26cc156",
  "f405c04913d36fe4c9dc31007e7f782b",
  "760043bb5e5ae87e9c229022501035fb",
  "531ba9ab54b0406eb7e08b1e453bce40",
  "23dafef23f6d1392ee8d600489679258",
  "64d20c70ef28cbf34cb21b5ee1fc6b16",
  "913f7a43b608f9095fb4aef0a389ec4d",
  "dda71058eee0fa80a181ee5b536c03c8",
];

// 测试用：北京市公交线路查询
const TEST_CITY = "北京";
const TEST_KEYWORDS = "1路"; // 测试查询"1路"公交

interface TestResult {
  key: string;
  available: boolean;
  errorCode?: string;
  errorInfo?: string;
  routeCount?: number;
}

async function testKey(key: string): Promise<TestResult> {
  const url = `https://restapi.amap.com/v3/bus/linename?key=${key}&city=${TEST_CITY}&keywords=${TEST_KEYWORDS}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === "1") {
      return {
        key,
        available: true,
        routeCount: data.buslines?.length || 0,
      };
    } else {
      return {
        key,
        available: false,
        errorCode: data.infocode,
        errorInfo: data.info,
      };
    }
  } catch (error) {
    return {
      key,
      available: false,
      errorInfo: (error as Error).message,
    };
  }
}

async function main() {
  console.log("=== 高德 API Key 验证 ===");
  console.log(`测试城市: ${TEST_CITY}`);
  console.log(`测试线路: ${TEST_KEYWORDS}`);
  console.log(`共测试 ${AMAP_KEYS.length} 个 Key\n`);

  const results: TestResult[] = [];

  for (let i = 0; i < AMAP_KEYS.length; i++) {
    const key = AMAP_KEYS[i];
    const maskedKey = key.substring(0, 8) + "..." + key.substring(key.length - 4);
    process.stdout.write(`[${i + 1}/${AMAP_KEYS.length}] 测试 ${maskedKey}... `);

    const result = await testKey(key);
    results.push(result);

    if (result.available) {
      console.log(`✅ 可用 (${result.routeCount} 条线路)`);
    } else {
      console.log(`❌ 失败: ${result.errorInfo} (${result.errorCode || "网络错误"})`);
    }

    // 避免限流
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log("\n=== 验证结果 ===");
  const availableKeys = results.filter((r) => r.available);
  console.log(`✅ 可用 Key: ${availableKeys.length}/${AMAP_KEYS.length}`);

  if (availableKeys.length > 0) {
    console.log("\n推荐使用的 Key:");
    availableKeys.forEach((r) => {
      const maskedKey = r.key.substring(0, 8) + "..." + r.key.substring(r.key.length - 4);
      console.log(`  - ${maskedKey} (返回 ${r.routeCount} 条线路)`);
    });
  } else {
    console.log("\n❌ 所有 Key 都不可用，需要申请新的高德 Web Service API Key");
  }

  // 失败原因统计
  const failedResults = results.filter((r) => !r.available);
  if (failedResults.length > 0) {
    console.log("\n失败原因统计:");
    const errorStats: Record<string, number> = {};
    failedResults.forEach((r) => {
      const reason = r.errorInfo || "未知错误";
      errorStats[reason] = (errorStats[reason] || 0) + 1;
    });
    Object.entries(errorStats).forEach(([reason, count]) => {
      console.log(`  - ${reason}: ${count} 次`);
    });
  }
}

main().catch(console.error);
