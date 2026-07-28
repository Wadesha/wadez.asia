export type MineralType =
  | "coal"
  | "iron"
  | "copper"
  | "gold"
  | "rare_earth"
  | "natural_gas"
  | "oil"
  | "limestone";

export type MineScale = "large" | "medium" | "small";

export interface MineralResource {
  id: string;
  name: string;
  type: MineralType;
  lng: number;
  lat: number;
  scale: MineScale;
  reserves: number;
  reservesUnit: string;
  annualOutput: number;
  grade: number;
  developmentStatus: "producing" | "construction" | "prospecting" | "closed";
  company: string;
  discoverYear: number;
  description: string;
}

export interface MineralRegion {
  id: string;
  name: string;
  province: string;
  center: [number, number];
  minerals: MineralResource[];
  totalReserves: Record<string, number>;
  dominantMineral: string;
  mineCount: number;
}

export const MINERAL_TYPE_LABELS: Record<MineralType, string> = {
  coal: "煤炭",
  iron: "铁矿",
  copper: "铜矿",
  gold: "金矿",
  rare_earth: "稀土",
  natural_gas: "天然气",
  oil: "石油",
  limestone: "石灰石",
};

export const MINERAL_TYPE_ICONS: Record<MineralType, string> = {
  coal: "🪨",
  iron: "⚙️",
  copper: "🔶",
  gold: "🥇",
  rare_earth: "💎",
  natural_gas: "🔥",
  oil: "🛢️",
  limestone: "🧱",
};

export const MINERAL_TYPE_COLORS: Record<MineralType, string> = {
  coal: "#374151",
  iron: "#6b7280",
  copper: "#d97706",
  gold: "#eab308",
  rare_earth: "#8b5cf6",
  natural_gas: "#ef4444",
  oil: "#1e3a8a",
  limestone: "#a3a3a3",
};

export const SCALE_LABELS: Record<MineScale, string> = {
  large: "大型",
  medium: "中型",
  small: "小型",
};

export const STATUS_LABELS = {
  producing: { label: "生产中", color: "#10b981" },
  construction: { label: "建设中", color: "#3b82f6" },
  prospecting: { label: "勘探中", color: "#f59e0b" },
  closed: { label: "已关闭", color: "#9ca3af" },
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateMineral(
  id: string,
  idx: number,
  centerLng: number,
  centerLat: number,
  typeBias?: MineralType[]
): MineralResource {
  const types: MineralType[] = [
    "coal",
    "iron",
    "copper",
    "gold",
    "rare_earth",
    "natural_gas",
    "oil",
    "limestone",
  ];
  const typePool = typeBias && typeBias.length > 0 ? typeBias : types;
  const type = typePool[Math.floor(seededRandom(idx * 3 + 1) * typePool.length)];

  const offsetLng = (seededRandom(idx * 7 + 3) - 0.5) * 3.5;
  const offsetLat = (seededRandom(idx * 11 + 5) - 0.5) * 2.5;

  const scaleSeed = seededRandom(idx * 13 + 7);
  const scale: MineScale = scaleSeed < 0.25 ? "large" : scaleSeed < 0.65 ? "medium" : "small";

  const scaleMultiplier = scale === "large" ? 10 : scale === "medium" ? 3 : 1;
  const baseReserve = seededRandom(idx * 17 + 9) * 5000 + 500;
  const reserves = Math.round(baseReserve * scaleMultiplier);

  const units: Record<MineralType, string> = {
    coal: "万吨",
    iron: "万吨",
    copper: "万吨",
    gold: "吨",
    rare_earth: "万吨",
    natural_gas: "亿立方米",
    oil: "万吨",
    limestone: "万吨",
  };

  const statuses: ("producing" | "construction" | "prospecting" | "closed")[] = [
    "producing",
    "producing",
    "producing",
    "construction",
    "prospecting",
    "closed",
  ];
  const status = statuses[Math.floor(seededRandom(idx * 19 + 11) * statuses.length)];

  const companies = [
    "中矿集团",
    "华能矿业",
    "西部矿业",
    "中金黄金",
    "北方稀土",
    "中石油",
    "中石化",
    "冀东水泥",
  ];
  const company = companies[Math.floor(seededRandom(idx * 23 + 13) * companies.length)];

  const grade = +(20 + seededRandom(idx * 29 + 15) * 75).toFixed(1);
  const annualOutput = Math.round(reserves * (0.01 + seededRandom(idx * 31 + 17) * 0.05));
  const discoverYear = 1950 + Math.floor(seededRandom(idx * 37 + 19) * 70);

  return {
    id,
    name: `${type.charAt(0).toUpperCase()}矿${idx + 1}号`,
    type,
    lng: centerLng + offsetLng,
    lat: centerLat + offsetLat,
    scale,
    reserves,
    reservesUnit: units[type],
    annualOutput,
    grade,
    developmentStatus: status,
    company,
    discoverYear,
    description: `${MINERAL_TYPE_LABELS[type]}矿山，${SCALE_LABELS[scale]}型规模，储量${reserves}${units[type]}`,
  };
}

function generateRegion(
  id: string,
  name: string,
  province: string,
  center: [number, number],
  count: number,
  typeBias?: MineralType[]
): MineralRegion {
  const minerals: MineralResource[] = [];
  for (let i = 0; i < count; i++) {
    minerals.push(
      generateMineral(`${id}-${i}`, i, center[0], center[1], typeBias)
    );
  }

  const totalReserves: Record<string, number> = {};
  minerals.forEach((m) => {
    if (!totalReserves[m.type]) totalReserves[m.type] = 0;
    totalReserves[m.type] += m.reserves;
  });

  let dominantType: MineralType = minerals[0]?.type || "coal";
  let maxReserve = 0;
  Object.entries(totalReserves).forEach(([type, reserve]) => {
    if (reserve > maxReserve) {
      maxReserve = reserve;
      dominantType = type as MineralType;
    }
  });

  return {
    id,
    name,
    province,
    center,
    minerals,
    totalReserves,
    dominantMineral: MINERAL_TYPE_LABELS[dominantType as MineralType],
    mineCount: minerals.length,
  };
}

const MINERAL_REGIONS: MineralRegion[] = [
  generateRegion(
    "shanxi",
    "山西煤炭基地",
    "山西省",
    [112.5, 37.8],
    24,
    ["coal", "coal", "coal", "iron", "limestone"]
  ),
  generateRegion(
    "inner-mongolia",
    "内蒙古稀土基地",
    "内蒙古",
    [110.0, 40.8],
    20,
    ["rare_earth", "coal", "natural_gas", "iron"]
  ),
  generateRegion(
    "xinjiang",
    "新疆油气基地",
    "新疆",
    [87.6, 43.8],
    18,
    ["oil", "natural_gas", "coal", "iron"]
  ),
];

export function getMineralRegions(): MineralRegion[] {
  return MINERAL_REGIONS;
}

export function getMineralRegionById(id: string): MineralRegion | undefined {
  return MINERAL_REGIONS.find((r) => r.id === id);
}
