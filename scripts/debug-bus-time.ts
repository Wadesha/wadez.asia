/**
 * 查看首末班车时间的实际格式
 */

const AMAP_KEY = "dc6fa182a56d82275d8b6f809c72c772";
const LINE_ID = "110100013436";

async function main() {
  const url = `https://restapi.amap.com/v3/bus/lineid?key=${AMAP_KEY}&id=${LINE_ID}&extensions=all&output=json`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.buslines && data.buslines.length > 0) {
    const line = data.buslines[0];

    console.log("=== 首末班车时间原始数据 ===");
    console.log("start_time:", JSON.stringify(line.start_time));
    console.log("end_time:", JSON.stringify(line.end_time));
    console.log("");

    // 尝试 base 模式
    const url2 = `https://restapi.amap.com/v3/bus/lineid?key=${AMAP_KEY}&id=${LINE_ID}&extensions=base&output=json`;
    const res2 = await fetch(url2);
    const data2 = await res2.json();

    if (data2.buslines && data2.buslines.length > 0) {
      const line2 = data2.buslines[0];
      console.log("=== base模式首末班车时间 ===");
      console.log("start_time:", JSON.stringify(line2.start_time));
      console.log("end_time:", JSON.stringify(line2.end_time));
      console.log("");

      console.log("=== base模式所有字段 ===");
      console.log(Object.keys(line2).join(", "));
    }
  }
}

main().catch(console.error);

export {};
