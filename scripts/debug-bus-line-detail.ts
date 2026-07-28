/**
 * 通过线路ID查询公交线路详细信息
 */

const AMAP_KEY = "dc6fa182a56d82275d8b6f809c72c772";

// 1路公交的ID
const LINE_ID = "110100013436";

async function main() {
  // 通过ID查询线路详情
  const url = `https://restapi.amap.com/v3/bus/lineid?key=${AMAP_KEY}&id=${LINE_ID}&extensions=all&output=json`;

  console.log("=== 通过ID查询线路详情 ===");
  console.log("URL:", url);
  console.log("");

  const res = await fetch(url);
  const data = await res.json();

  console.log("返回的线路数:", data.buslines?.length || 0);
  console.log("");

  if (data.buslines && data.buslines.length > 0) {
    const line = data.buslines[0];

    console.log("=== 线路基本信息 ===");
    console.log("名称:", line.name);
    console.log("ID:", line.id);
    console.log("类型:", line.type);
    console.log("起点:", line.start_stop);
    console.log("终点:", line.end_stop);
    console.log("");

    console.log("=== 运营信息 ===");
    console.log("首班车:", line.start_time || "未提供");
    console.log("末班车:", line.end_time || "未提供");
    console.log("距离:", line.distance ? `${line.distance} 公里` : "未提供");
    console.log("票价:", line.basic_price ? `${line.basic_price} 元` : "未提供");
    console.log("全程票价:", line.total_price ? `${line.total_price} 元` : "未提供");
    console.log("运营公司:", line.company || "未提供");
    console.log("");

    if (line.via_stops && line.via_stops.length > 0) {
      console.log("=== 途经站点 ===");
      console.log(`共 ${line.via_stops.length} 站`);
      console.log("前 5 站:", line.via_stops.slice(0, 5).map((s: any) => s.name).join(" → "));
      console.log("后 5 站:", line.via_stops.slice(-5).map((s: any) => s.name).join(" → "));
    }

    console.log("");
    console.log("=== 完整JSON（部分字段）===");
    console.log(JSON.stringify({
      name: line.name,
      type: line.type,
      start_stop: line.start_stop,
      end_stop: line.end_stop,
      start_time: line.start_time,
      end_time: line.end_time,
      distance: line.distance,
      basic_price: line.basic_price,
      total_price: line.total_price,
      company: line.company,
      via_stops_count: line.via_stops?.length,
    }, null, 2));
  }
}

main().catch(console.error);

export {};
