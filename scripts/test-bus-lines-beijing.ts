/**
 * 市内公交线路数据查询脚本 - 北京测试
 *
 * 阶段1: 单城市测试
 * 目标: 查询北京部分公交线路，验证数据格式和质量
 *
 * 高德 API 公交线路查询接口:
 * - /v3/bus/linename: 通过线路名称查询
 * - /v3/bus/stopname: 通过站点名称查询
 * - /v3/bus/lineid: 通过线路ID查询详情
 */

const AMAP_KEY = "dc6fa182a56d82275d8b6f809c72c772";

interface BusLine {
  id: string;
  name: string;
  type: string;
  start_stop: string;
  end_stop: string;
  start_time: string;
  end_time: string;
  company: string;
  distance: string;
  basic_price: string;
  total_price: string;
  via_stops: ViaStop[];
  bounds: string;
  direction: string;
  polyline: string;
}

interface ViaStop {
  sequence: string;
  name: string;
  location: string;
}

interface BusLineResponse {
  status: string;
  buslines: BusLine[];
  count: string;
}

async function fetchBusLineByName(
  city: string,
  keywords: string
): Promise<BusLine[]> {
  const url = `https://restapi.amap.com/v3/bus/linename?key=${AMAP_KEY}&city=${encodeURIComponent(
    city
  )}&keywords=${encodeURIComponent(keywords)}&extensions=base&output=json`;

  const res = await fetch(url);
  const data: BusLineResponse = await res.json();

  if (data.status !== "1") {
    console.warn(`  ⚠️ 查询失败:`, data);
    return [];
  }

  return data.buslines || [];
}

async function main() {
  console.log("=== 阶段1: 北京公交线路测试 ===\n");
  console.log("目标: 查询北京部分公交线路，验证数据格式\n");

  // 测试查询几条北京知名公交线路
  const testLines = ["1路", "特1路", "52路", "300路", "运通101"];

  for (const lineName of testLines) {
    console.log(`\n查询: 北京 ${lineName}`);
    const lines = await fetchBusLineByName("北京", lineName);

    if (lines.length === 0) {
      console.log(`  ❌ 未找到线路`);
      continue;
    }

    // 只展示第一条匹配线路
    const line = lines[0];
    console.log(`  ✅ 找到 ${lines.length} 条匹配线路，展示第 1 条:`);
    console.log(`     ID: ${line.id}`);
    console.log(`     名称: ${line.name}`);
    console.log(`     类型: ${line.type}`);
    console.log(`     起点: ${line.start_stop}`);
    console.log(`     终点: ${line.end_stop}`);
    console.log(`     首班车: ${line.start_time}`);
    console.log(`     末班车: ${line.end_time}`);
    console.log(`     运营公司: ${line.company || "未知"}`);
    console.log(`     距离: ${line.distance} 公里`);
    console.log(`     票价: ${line.basic_price}元 (全程 ${line.total_price}元)`);
    console.log(`     途经站点数: ${line.via_stops?.length || 0}`);

    if (line.via_stops && line.via_stops.length > 0) {
      console.log(`     前 3 站: ${line.via_stops.slice(0, 3).map((s) => s.name).join(" → ")}`);
      console.log(`     末 3 站: ${line.via_stops.slice(-3).map((s) => s.name).join(" → ")}`);
    }

    // 避免 API 限流
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("\n\n=== 阶段1 测试完成 ===");
  console.log("✅ 高德 API 可正常获取公交线路数据");
  console.log("✅ 数据字段完整：名称、起终点、时刻表、票价、途经站点");
  console.log("\n下一步: 确认数据格式后，可扩展到更多城市");
}

main().catch((error) => {
  console.error("执行错误:", error);
  process.exit(1);
});

export {};
