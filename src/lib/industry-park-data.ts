export type IndustryType =
  | "high_tech"
  | "manufacturing"
  | "biomedicine"
  | "new_energy"
  | "finance"
  | "cultural_creative"
  | "logistics"
  | "automotive";

export type ParkLevel = "national" | "provincial" | "municipal";

export interface IndustryPark {
  id: string;
  name: string;
  type: IndustryType;
  level: ParkLevel;
  lng: number;
  lat: number;
  areaSqKm: number;
  establishedYear: number;
  enterpriseCount: number;
  employees: number;
  annualOutput: number;
  gdp: number;
  taxRevenue: number;
  leadingEnterprises: string[];
  developmentPhase: "construction" | "growing" | "mature" | "upgrading";
  description: string;
  dataSource: "simulated";
}

export interface IndustryCity {
  id: string;
  name: string;
  center: [number, number];
  parks: IndustryPark[];
  totalParks: number;
  totalOutput: number;
  dominantIndustry: string;
  dataSource: "simulated";
}

export const INDUSTRY_TYPE_LABELS: Record<IndustryType, string> = {
  high_tech: "高新技术",
  manufacturing: "先进制造",
  biomedicine: "生物医药",
  new_energy: "新能源",
  finance: "金融服务",
  cultural_creative: "文化创意",
  logistics: "现代物流",
  automotive: "汽车产业",
};

export const INDUSTRY_TYPE_ICONS: Record<IndustryType, string> = {
  high_tech: "💻",
  manufacturing: "🏭",
  biomedicine: "🧬",
  new_energy: "⚡",
  finance: "💰",
  cultural_creative: "🎨",
  logistics: "📦",
  automotive: "🚗",
};

export const INDUSTRY_TYPE_COLORS: Record<IndustryType, string> = {
  high_tech: "#3b82f6",
  manufacturing: "#6b7280",
  biomedicine: "#10b981",
  new_energy: "#84cc16",
  finance: "#f59e0b",
  cultural_creative: "#8b5cf6",
  logistics: "#f97316",
  automotive: "#ef4444",
};

export const LEVEL_LABELS: Record<ParkLevel, { label: string; color: string }> = {
  national: { label: "国家级", color: "#ef4444" },
  provincial: { label: "省级", color: "#f59e0b" },
  municipal: { label: "市级", color: "#3b82f6" },
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generatePark(
  id: string,
  idx: number,
  centerLng: number,
  centerLat: number,
  typeBias?: IndustryType[]
): IndustryPark {
  const types: IndustryType[] = [
    "high_tech",
    "manufacturing",
    "biomedicine",
    "new_energy",
    "finance",
    "cultural_creative",
    "logistics",
    "automotive",
  ];
  const pool = typeBias && typeBias.length > 0 ? typeBias : types;
  const type = pool[Math.floor(seededRandom(idx * 3 + 1) * pool.length)];

  const offsetLng = (seededRandom(idx * 7 + 3) - 0.5) * 0.6;
  const offsetLat = (seededRandom(idx * 11 + 5) - 0.5) * 0.5;

  const levels: ParkLevel[] = ["national", "provincial", "municipal"];
  const levelSeed = seededRandom(idx * 13 + 7);
  const level: ParkLevel =
    levelSeed < 0.2 ? "national" : levelSeed < 0.55 ? "provincial" : "municipal";

  const levelMultiplier = level === "national" ? 3 : level === "provincial" ? 1.8 : 1;
  const area = +((2 + seededRandom(idx * 17 + 9) * 8) * levelMultiplier).toFixed(1);
  const enterprises = Math.round((50 + seededRandom(idx * 19 + 11) * 500) * levelMultiplier);
  const employees = Math.round(enterprises * (20 + seededRandom(idx * 23 + 13) * 80));
  const annualOutput = Math.round(enterprises * (0.5 + seededRandom(idx * 29 + 15) * 3) * 10000);
  const gdp = Math.round(annualOutput * (0.2 + seededRandom(idx * 31 + 17) * 0.3));
  const taxRevenue = Math.round(gdp * (0.05 + seededRandom(idx * 37 + 19) * 0.1));
  const establishedYear = 1992 + Math.floor(seededRandom(idx * 41 + 21) * 32);

  const phases: ("construction" | "growing" | "mature" | "upgrading")[] = [
    "construction",
    "growing",
    "mature",
    "upgrading",
  ];
  const phase = phases[Math.floor(seededRandom(idx * 43 + 23) * 4)];

  const allCompanies = [
    "华为", "中兴", "比亚迪", "腾讯", "阿里", "字节",
    "国药集团", "恒瑞医药", "药明康德", "宁德时代",
    "隆基绿能", "中芯国际", "京东方", "小米",
    "百度", "京东", "顺丰", "中通",
  ];
  const leadingCount = 2 + Math.floor(seededRandom(idx * 47 + 25) * 3);
  const shuffled = [...allCompanies].sort(() => seededRandom(idx * 53 + 27) - 0.5);
  const leadingEnterprises = shuffled.slice(0, leadingCount);

  return {
    id,
    name: `${INDUSTRY_TYPE_LABELS[type]}产业园${idx + 1}`,
    type,
    level,
    lng: centerLng + offsetLng,
    lat: centerLat + offsetLat,
    areaSqKm: area,
    establishedYear,
    enterpriseCount: enterprises,
    employees,
    annualOutput,
    gdp,
    taxRevenue,
    leadingEnterprises,
    developmentPhase: phase,
    description: `${LEVEL_LABELS[level].label}${INDUSTRY_TYPE_LABELS[type]}产业园区，规划面积${area}平方公里`,
    dataSource: "simulated" as const,
  };
}

function generateCity(
  id: string,
  name: string,
  center: [number, number],
  parkCount: number,
  typeBias?: IndustryType[]
): IndustryCity {
  const parks: IndustryPark[] = [];
  for (let i = 0; i < parkCount; i++) {
    parks.push(generatePark(`${id}-park-${i}`, i, center[0], center[1], typeBias));
  }

  const totalOutput = parks.reduce((s, p) => s + p.annualOutput, 0);

  const typeCounts: Record<string, number> = {};
  parks.forEach((p) => {
    typeCounts[p.type] = (typeCounts[p.type] || 0) + 1;
  });
  let dominantType = parks[0]?.type || "high_tech";
  let maxCount = 0;
  Object.entries(typeCounts).forEach(([t, c]) => {
    if (c > maxCount) {
      maxCount = c;
      dominantType = t as IndustryType;
    }
  });

  return {
    id,
    name,
    center,
    parks,
    totalParks: parks.length,
    totalOutput,
    dominantIndustry: INDUSTRY_TYPE_LABELS[dominantType as IndustryType],
    dataSource: "simulated" as const,
  };
}

const INDUSTRY_CITIES: IndustryCity[] = [
  generateCity(
    "shenzhen",
    "深圳",
    [114.06, 22.54],
    22,
    ["high_tech", "finance", "cultural_creative", "new_energy"]
  ),
  generateCity(
    "suzhou",
    "苏州",
    [120.62, 31.32],
    18,
    ["manufacturing", "biomedicine", "automotive", "high_tech"]
  ),
];

export function getIndustryCities(): IndustryCity[] {
  return INDUSTRY_CITIES;
}

export function getIndustryCityById(id: string): IndustryCity | undefined {
  return INDUSTRY_CITIES.find((c) => c.id === id);
}

export const PHASE_LABELS = {
  construction: { label: "建设期", color: "#f59e0b" },
  growing: { label: "成长期", color: "#3b82f6" },
  mature: { label: "成熟期", color: "#10b981" },
  upgrading: { label: "升级期", color: "#8b5cf6" },
};
