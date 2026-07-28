import { CITIES_WITH_CENTER } from "../src/lib/city-data";

const cityIds = CITIES_WITH_CENTER.map(c => c.id);
const cityMap = new Map(CITIES_WITH_CENTER.map(c => [c.id, c]));

let corridors = "";

for (let i = 0; i < cityIds.length; i++) {
  for (let j = 0; j < cityIds.length; j++) {
    if (i === j) continue;
    
    const city1 = cityMap.get(cityIds[i])!;
    const city2 = cityMap.get(cityIds[j])!;
    
    corridors += `  {
    id: "${city1.id}-${city2.id}",
    name: "${city1.name} → ${city2.name}",
    cities: [
      { id: "${city1.id}", name: "${city1.name}", center: [${city1.center[0]}, ${city1.center[1]}] },
      { id: "${city2.id}", name: "${city2.name}", center: [${city2.center[0]}, ${city2.center[1]}] },
    ],
  },\n`;
  }
}

console.log(`// 自动生成的城市间公交走廊配置
// 生成时间: ${new Date().toISOString()}
// 城市数量: ${cityIds.length}
// 线路数量: ${cityIds.length * (cityIds.length - 1)}
// 包含所有城市间的双向线路

export const INTERCITY_BUS_CORRIDORS = [
${corridors}];
`);
