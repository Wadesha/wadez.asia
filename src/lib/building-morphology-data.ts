export type BuildingFunction =
  | "office"
  | "commercial"
  | "residential"
  | "mixed"
  | "cultural"
  | "educational"
  | "medical"
  | "industrial";

export type BuildingEra =
  | "pre-1949"
  | "1950s-1970s"
  | "1980s-1990s"
  | "2000s"
  | "2010s+"
  | "unknown";

export interface Building {
  id: string;
  name?: string;
  function: BuildingFunction;
  era: BuildingEra;
  heightM: number;
  floors: number;
  footprintM2: number;
  boundary: [number, number][];
  areaId: string;
}

export interface BuildingArea {
  id: string;
  name: string;
  city: string;
  description: string;
  center: [number, number];
  buildings: Building[];
}

const FUNCTION_LABELS: Record<BuildingFunction, string> = {
  office: "办公",
  commercial: "商业",
  residential: "居住",
  mixed: "综合体",
  cultural: "文化",
  educational: "教育",
  medical: "医疗",
  industrial: "工业",
};

const FUNCTION_COLORS: Record<BuildingFunction, string> = {
  office: "#3b82f6",
  commercial: "#f59e0b",
  residential: "#10b981",
  mixed: "#8b5cf6",
  cultural: "#ec4899",
  educational: "#06b6d4",
  medical: "#ef4444",
  industrial: "#6b7280",
};

const ERA_LABELS: Record<BuildingEra, string> = {
  "pre-1949": "解放前",
  "1950s-1970s": "50-70年代",
  "1980s-1990s": "80-90年代",
  "2000s": "2000年代",
  "2010s+": "2010年后",
  unknown: "年代未知",
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateBuildingBoundary(
  centerLng: number,
  centerLat: number,
  widthM: number,
  depthM: number,
  rotation: number,
  rand: () => number
): [number, number][] {
  const degreesPerMeter = 0.000009;
  const w = (widthM / 2) * degreesPerMeter;
  const d = (depthM / 2) * degreesPerMeter;

  const corners = [
    [-w, -d],
    [w, -d],
    [w, d],
    [-w, d],
  ];

  const rad = (rotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return corners.map(([x, y]) => {
    const rx = x * cos - y * sin;
    const ry = x * sin + y * cos;
    return [
      Math.round((centerLng + rx) * 100000) / 100000,
      Math.round((centerLat + ry) * 100000) / 100000,
    ] as [number, number];
  });
}

interface AreaTemplate {
  id: string;
  name: string;
  city: string;
  description: string;
  center: [number, number];
  widthKm: number;
  heightKm: number;
  buildingCount: number;
  heightProfile: "cbd" | "historic" | "skyscraper";
  functionMix: Record<BuildingFunction, number>;
  eraMix: Record<BuildingEra, number>;
}

const AREA_TEMPLATES: AreaTemplate[] = [
  {
    id: "beijing-cbd",
    name: "北京国贸CBD",
    city: "北京",
    description:
      "北京中央商务区，超高层写字楼集群，中国经济金融核心区之一。以国贸三期、中国尊等地标建筑为代表。",
    center: [116.46, 39.91],
    widthKm: 1.2,
    heightKm: 1.0,
    buildingCount: 85,
    heightProfile: "cbd",
    functionMix: {
      office: 0.55,
      commercial: 0.15,
      mixed: 0.15,
      residential: 0.08,
      cultural: 0.03,
      educational: 0.02,
      medical: 0.01,
      industrial: 0.01,
    },
    eraMix: {
      "pre-1949": 0.02,
      "1950s-1970s": 0.05,
      "1980s-1990s": 0.18,
      "2000s": 0.45,
      "2010s+": 0.3,
      unknown: 0,
    },
  },
  {
    id: "nanluoguxiang",
    name: "北京南锣鼓巷",
    city: "北京",
    description:
      "北京历史文化保护区，胡同四合院肌理，低层高密度传统街区。元大都时期的城市格局保存至今。",
    center: [116.403, 39.935],
    widthKm: 0.8,
    heightKm: 0.6,
    buildingCount: 280,
    heightProfile: "historic",
    functionMix: {
      residential: 0.5,
      commercial: 0.25,
      cultural: 0.15,
      mixed: 0.05,
      office: 0.02,
      educational: 0.02,
      medical: 0.01,
      industrial: 0,
    },
    eraMix: {
      "pre-1949": 0.6,
      "1950s-1970s": 0.25,
      "1980s-1990s": 0.1,
      "2000s": 0.03,
      "2010s+": 0.02,
      unknown: 0,
    },
  },
  {
    id: "lujiazui",
    name: "上海陆家嘴",
    city: "上海",
    description:
      "上海浦东金融核心区，摩天楼集群，中国金融中心。上海中心大厦、环球金融中心等地标云集。",
    center: [121.505, 31.235],
    widthKm: 1.0,
    heightKm: 1.0,
    buildingCount: 95,
    heightProfile: "skyscraper",
    functionMix: {
      office: 0.5,
      mixed: 0.2,
      commercial: 0.15,
      residential: 0.08,
      cultural: 0.03,
      hotel: 0.03,
      medical: 0.01,
      industrial: 0,
    } as any,
    eraMix: {
      "pre-1949": 0.01,
      "1950s-1970s": 0.02,
      "1980s-1990s": 0.17,
      "2000s": 0.45,
      "2010s+": 0.35,
      unknown: 0,
    },
  },
];

function generateBuildings(template: AreaTemplate, seed: number): Building[] {
  const buildings: Building[] = [];
  const rand = seededRandom(seed);
  const degreesPerKm = 0.009;

  const functionEntries = Object.entries(template.functionMix) as [
    BuildingFunction,
    number
  ][];
  const eraEntries = Object.entries(template.eraMix) as [BuildingEra, number][];

  for (let i = 0; i < template.buildingCount; i++) {
    const fx = (rand() - 0.5) * template.widthKm * degreesPerKm;
    const fy = (rand() - 0.5) * template.heightKm * degreesPerKm;
    const lng = template.center[0] + fx;
    const lat = template.center[1] + fy;

    let heightM: number;
    let floors: number;
    let widthM: number;
    let depthM: number;

    if (template.heightProfile === "skyscraper") {
      const r = rand();
      if (r < 0.05) {
        heightM = 300 + rand() * 300;
      } else if (r < 0.25) {
        heightM = 150 + rand() * 150;
      } else if (r < 0.6) {
        heightM = 60 + rand() * 90;
      } else {
        heightM = 15 + rand() * 45;
      }
      widthM = 20 + rand() * 50;
      depthM = 20 + rand() * 50;
    } else if (template.heightProfile === "cbd") {
      const r = rand();
      if (r < 0.08) {
        heightM = 200 + rand() * 200;
      } else if (r < 0.3) {
        heightM = 80 + rand() * 120;
      } else if (r < 0.65) {
        heightM = 30 + rand() * 50;
      } else {
        heightM = 10 + rand() * 20;
      }
      widthM = 15 + rand() * 40;
      depthM = 15 + rand() * 40;
    } else {
      const r = rand();
      if (r < 0.7) {
        heightM = 3 + rand() * 6;
      } else if (r < 0.95) {
        heightM = 9 + rand() * 12;
      } else {
        heightM = 20 + rand() * 20;
      }
      widthM = 8 + rand() * 25;
      depthM = 10 + rand() * 30;
    }

    floors = Math.max(1, Math.round(heightM / 3.2));

    const distFromCenter = Math.sqrt(fx * fx + fy * fy);
    const maxDist =
      (Math.min(template.widthKm, template.heightKm) / 2) * degreesPerKm;
    const distRatio = Math.min(1, distFromCenter / maxDist);

    if (template.heightProfile !== "historic") {
      heightM *= 1 - distRatio * 0.5;
      floors = Math.max(1, Math.round(heightM / 3.2));
    }

    let func: BuildingFunction = "office";
    let cumFunc = 0;
    const rFunc = rand();
    for (const [f, weight] of functionEntries) {
      cumFunc += weight;
      if (rFunc <= cumFunc) {
        func = f;
        break;
      }
    }

    let era: BuildingEra = "2000s";
    let cumEra = 0;
    const rEra = rand();
    for (const [e, weight] of eraEntries) {
      cumEra += weight;
      if (rEra <= cumEra) {
        era = e;
        break;
      }
    }

    const rotation = rand() * 360;
    const boundary = generateBuildingBoundary(
      lng,
      lat,
      widthM,
      depthM,
      rotation,
      rand
    );

    const footprintM2 = Math.round(widthM * depthM);

    buildings.push({
      id: `${template.id}-${i}`,
      name: `${template.name}建筑${i + 1}号`,
      function: func,
      era,
      heightM: Math.round(heightM * 10) / 10,
      floors,
      footprintM2,
      boundary,
      areaId: template.id,
    });
  }

  return buildings;
}

let buildingAreas: BuildingArea[] | null = null;

function getBuildingAreas(): BuildingArea[] {
  if (!buildingAreas) {
    buildingAreas = AREA_TEMPLATES.map((template, idx) => ({
      id: template.id,
      name: template.name,
      city: template.city,
      description: template.description,
      center: template.center,
      buildings: generateBuildings(template, idx * 1000 + 7),
    }));
  }
  return buildingAreas;
}

function getBuildingArea(id: string): BuildingArea | undefined {
  return getBuildingAreas().find((a) => a.id === id);
}

function getAreaStats(area: BuildingArea) {
  const buildings = area.buildings;
  const totalCount = buildings.length;

  const totalFootprint = buildings.reduce(
    (sum, b) => sum + b.footprintM2,
    0
  );
  const avgHeight =
    buildings.reduce((sum, b) => sum + b.heightM, 0) / totalCount;
  const maxHeight = Math.max(...buildings.map((b) => b.heightM));

  const heightDistribution = {
    low: buildings.filter((b) => b.heightM <= 12).length,
    mid: buildings.filter((b) => b.heightM > 12 && b.heightM <= 50).length,
    high: buildings.filter((b) => b.heightM > 50 && b.heightM <= 150).length,
    super: buildings.filter((b) => b.heightM > 150).length,
  };

  const functionDistribution: Record<BuildingFunction, number> = {
    office: 0,
    commercial: 0,
    residential: 0,
    mixed: 0,
    cultural: 0,
    educational: 0,
    medical: 0,
    industrial: 0,
  };
  buildings.forEach((b) => {
    functionDistribution[b.function]++;
  });

  const areaKm2 = 1.2 * 1.0;
  const density = totalCount / areaKm2;
  const floorAreaRatio =
    (totalFootprint * avgHeight / 3.2) / (areaKm2 * 1000000);

  return {
    totalCount,
    totalFootprint,
    avgHeight: Math.round(avgHeight * 10) / 10,
    maxHeight: Math.round(maxHeight * 10) / 10,
    heightDistribution,
    functionDistribution,
    density: Math.round(density),
    floorAreaRatio: Math.round(floorAreaRatio * 100) / 100,
  };
}

function getHeightColor(heightM: number, maxHeight: number): string {
  const ratio = Math.min(heightM / maxHeight, 1);
  if (ratio < 0.15) return "#d1fae5";
  if (ratio < 0.3) return "#a7f3d0";
  if (ratio < 0.45) return "#6ee7b7";
  if (ratio < 0.6) return "#34d399";
  if (ratio < 0.75) return "#fbbf24";
  if (ratio < 0.9) return "#f97316";
  return "#ef4444";
}

export {
  FUNCTION_LABELS,
  FUNCTION_COLORS,
  ERA_LABELS,
  AREA_TEMPLATES,
  getBuildingAreas,
  getBuildingArea,
  getAreaStats,
  getHeightColor,
};
