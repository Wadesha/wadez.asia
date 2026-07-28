/**
 * 查看高德公交 API 原始返回数据
 */

const AMAP_KEY = "dc6fa182a56d82275d8b6f809c72c772";

async function main() {
  const city = "北京";
  const keywords = "1路";

  const url = `https://restapi.amap.com/v3/bus/linename?key=${AMAP_KEY}&city=${encodeURIComponent(
    city
  )}&keywords=${encodeURIComponent(keywords)}&extensions=base&output=json`;

  console.log("请求URL:", url);
  console.log("");

  const res = await fetch(url);
  const data = await res.json();

  console.log("=== 完整API返回数据 ===");
  console.log(JSON.stringify(data, null, 2));
}

main().catch(console.error);

export {};
