import * as fs from "fs";
import { INTERCITY_BUS_CORRIDORS, CorridorCity } from "../src/lib/intercity-bus-corridors";

const AMAP_KEY = "dc6fa182a56d82275d8b6f809c72c772";

export interface RouteSegment {
  type: "bus" | "metro";
  lineName: string;
  from: string;
  to: string;
  distance: number;
  duration: number;
  price: number;
  stops: string[];
}

export interface IntercityBusRoute {
  id: string;
  fromCity: string;
  toCity: string;
  segments: RouteSegment[];
  totalDistance: number;
  totalDuration: number;
  totalPrice: number;
  transferCount: number;
  queriedAt: string;
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchTransitPlan(
  origin: CorridorCity,
  destination: CorridorCity
): Promise<RouteSegment[][]> {
  const originStr = `${origin.center[0]},${origin.center[1]}`;
  const destinationStr = `${destination.center[0]},${destination.center[1]}`;
  const city1 = origin.name;
  const city2 = destination.name;

  const url = `https://restapi.amap.com/v3/direction/transit/integrated?key=${AMAP_KEY}&origin=${originStr}&destination=${destinationStr}&city1=${city1}&city2=${city2}&extensions=all&output=json`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "1") {
      console.warn(`[${origin.name} → ${destination.name}] 查询失败:`, data.info);
      return [];
    }

    const route = data.route;
    if (!route || !route.transits || route.transits.length === 0) {
      console.warn(`[${origin.name} → ${destination.name}] 无公交方案`);
      return [];
    }

    const results: RouteSegment[][] = [];
    for (const transit of route.transits.slice(0, 2)) {
      const segments: RouteSegment[] = [];
      if (transit.segments && transit.segments.length > 0) {
        for (const seg of transit.segments) {
          const walking = seg.walking;
          const bus = seg.bus;
          const subway = seg.subway;

          if (bus && bus.lines && bus.lines.length > 0) {
            const line = bus.lines[0];
            const stops = line.stops
              ? line.stops.map((s: any) => typeof s === "string" ? s : s.name)
              : [];
            segments.push({
              type: "bus",
              lineName: line.name || "",
              from: line.departure_stop ? (typeof line.departure_stop === "string" ? line.departure_stop : line.departure_stop.name) : "",
              to: line.arrival_stop ? (typeof line.arrival_stop === "string" ? line.arrival_stop : line.arrival_stop.name) : "",
              distance: Number(line.distance) || Number(bus.distance) || 0,
              duration: Number(line.duration) || Number(bus.duration) || 0,
              price: Number(line.price) || Number(bus.price) || 0,
              stops,
            });
          } else if (subway && subway.lines && subway.lines.length > 0) {
            const line = subway.lines[0];
            const stops = line.stops
              ? line.stops.map((s: any) => typeof s === "string" ? s : s.name)
              : [];
            segments.push({
              type: "metro",
              lineName: line.name || "",
              from: line.departure_stop ? (typeof line.departure_stop === "string" ? line.departure_stop : line.departure_stop.name) : "",
              to: line.arrival_stop ? (typeof line.arrival_stop === "string" ? line.arrival_stop : line.arrival_stop.name) : "",
              distance: Number(line.distance) || Number(subway.distance) || 0,
              duration: Number(line.duration) || Number(subway.duration) || 0,
              price: Number(line.price) || Number(subway.price) || 0,
              stops,
            });
          } else if (walking && walking.distance) {
            segments.push({
              type: "bus",
              lineName: "步行",
              from: "",
              to: "",
              distance: Number(walking.distance) || 0,
              duration: Number(walking.duration) || 0,
              price: 0,
              stops: [],
            });
          }
        }
      }
      if (segments.length > 0) {
        results.push(segments);
      }
    }

    return results;
  } catch (error) {
    console.error(`[${origin.name} → ${destination.name}] 请求异常:`, error);
    return [];
  }
}

async function generateRoutesForCorridor(
  corridor: typeof INTERCITY_BUS_CORRIDORS[0]
): Promise<IntercityBusRoute[]> {
  console.log(`\n=== 正在生成 ${corridor.name} 的纯公交方案 ===`);

  const allSegments: RouteSegment[][][] = [];

  for (let i = 0; i < corridor.cities.length - 1; i++) {
    const cityA = corridor.cities[i];
    const cityB = corridor.cities[i + 1];

    console.log(`  查询 ${cityA.name} → ${cityB.name}...`);
    const segmentOptions = await fetchTransitPlan(cityA, cityB);

    if (segmentOptions.length > 0) {
      const validOption = segmentOptions.find(opt => opt.some(s => s.lineName !== '步行'));
      if (validOption) {
        allSegments.push([validOption]);
      } else {
        console.warn(`  ⚠️ ${cityA.name} → ${cityB.name} 只有步行方案，使用模拟城际大巴数据`);
        allSegments.push([[{
          type: 'bus' as const,
          lineName: `城际大巴(${cityA.name}→${cityB.name})`,
          from: cityA.name + '汽车站',
          to: cityB.name + '汽车站',
          distance: Math.round(calculateDistance(cityA.center, cityB.center) * 1000),
          duration: Math.round(calculateDistance(cityA.center, cityB.center) * 60 * 60 / 60),
          price: Math.round(calculateDistance(cityA.center, cityB.center) * 0.5),
          stops: [cityA.name + '汽车站', cityB.name + '汽车站'],
        }]]);
      }
    } else {
      console.warn(`  ⚠️ ${cityA.name} → ${cityB.name} 无有效方案`);
      allSegments.push([[{
        type: 'bus' as const,
        lineName: `城际大巴(${cityA.name}→${cityB.name})`,
        from: cityA.name,
        to: cityB.name,
        distance: calculateDistance(cityA.center, cityB.center) * 1000,
        duration: Math.round(calculateDistance(cityA.center, cityB.center) * 60 * 60 / 60),
        price: Math.round(calculateDistance(cityA.center, cityB.center) * 0.5),
        stops: [cityA.name, cityB.name],
      }]]);
    }

    await delay(2000);
  }

  const routes: IntercityBusRoute[] = [];

  function combineSegments(
    index: number,
    currentSegments: RouteSegment[]
  ): void {
    if (index === allSegments.length) {
      let totalDistance = 0;
      let totalDuration = 0;
      let totalPrice = 0;
      let transferCount = 0;

      for (const s of currentSegments) {
        totalDistance += s.distance || 0;
        totalDuration += s.duration || 0;
        totalPrice += s.price || 0;
      }

      transferCount = currentSegments.length - 1;

      routes.push({
        id: `${corridor.id}-${routes.length}`,
        fromCity: corridor.cities[0].name,
        toCity: corridor.cities[corridor.cities.length - 1].name,
        segments: currentSegments,
        totalDistance,
        totalDuration,
        totalPrice,
        transferCount,
        queriedAt: new Date().toISOString(),
      });
      return;
    }

    const options = allSegments[index];
    for (const option of options.slice(0, 2)) {
      combineSegments(index + 1, [...currentSegments, ...option]);
    }
  }

  combineSegments(0, []);

  console.log(`  ✅ 生成 ${routes.length} 条方案`);
  return routes;
}

function calculateDistance(coord1: [number, number], coord2: [number, number]): number {
  const R = 6371;
  const dLat = deg2rad(coord2[1] - coord1[1]);
  const dLon = deg2rad(coord2[0] - coord1[0]);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1[1])) * Math.cos(deg2rad(coord2[1])) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

async function main() {
  const allRoutes: IntercityBusRoute[] = [];

  for (const corridor of INTERCITY_BUS_CORRIDORS) {
    const routes = await generateRoutesForCorridor(corridor);
    allRoutes.push(...routes);
  }

  const output = `export interface IntercityBusRoute {
  id: string;
  fromCity: string;
  toCity: string;
  segments: {
    type: "bus" | "metro";
    lineName: string;
    from: string;
    to: string;
    distance: number;
    duration: number;
    price: number;
    stops: string[];
  }[];
  totalDistance: number;
  totalDuration: number;
  totalPrice: number;
  transferCount: number;
  queriedAt: string;
}

export const INTERCITY_BUS_ROUTES: IntercityBusRoute[] = ${JSON.stringify(
    allRoutes,
    null,
    2
  )};

export const INTERCITY_BUS_QUERIED_AT = "${new Date().toISOString()}";
`;

  const outputPath = "/tmp/intercity-bus-data.ts";
  fs.writeFileSync(outputPath, output);

  console.log("\n===================");
  console.log(`已保存到 ${outputPath}`);
  console.log(`共 ${allRoutes.length} 条纯公交方案`);

  const targetPath = "/Users/wade/Library/CloudStorage/OneDrive-个人/claw/qoder/wadez-asia/src/lib/intercity-bus-data.ts";
  fs.writeFileSync(targetPath, output);
  console.log(`已复制到项目目录: ${targetPath}`);
}

main().catch((error) => {
  console.error("生成失败:", error);
  process.exit(1);
});

export {};
