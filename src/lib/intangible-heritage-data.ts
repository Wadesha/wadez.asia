export type HeritageLevel = "national" | "provincial" | "municipal" | "county";
export type HeritageCategory = "traditional-music" | "traditional-dance" | "traditional-drama" | "folk-custom" | "traditional-medicine" | "traditional-craft" | "folk-literature";

export interface Inheritor {
  name: string;
  gender: "男" | "女";
  age: number;
  level: HeritageLevel;
  years: number;
}

export interface IntangibleHeritage {
  id: string;
  name: string;
  category: HeritageCategory;
  level: HeritageLevel;
  city: string;
  region: string;
  lng: number;
  lat: number;
  declarationYear: number;
  inheritors: Inheritor[];
  protectionUnit: string;
  description: string;
  status: "active" | "at-risk" | "endangered";
}

export const HERITAGE_LEVEL_LABELS: Record<HeritageLevel, string> = {
  national: "国家级",
  provincial: "省级",
  municipal: "市级",
  county: "县级",
};

export const HERITAGE_LEVEL_COLORS: Record<HeritageLevel, string> = {
  national: "#dc2626",
  provincial: "#ea580c",
  municipal: "#0891b2",
  county: "#65a30d",
};

export const HERITAGE_CATEGORY_LABELS: Record<HeritageCategory, string> = {
  "traditional-music": "传统音乐",
  "traditional-dance": "传统舞蹈",
  "traditional-drama": "传统戏剧",
  "folk-custom": "民俗",
  "traditional-medicine": "传统医药",
  "traditional-craft": "传统技艺",
  "folk-literature": "民间文学",
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateInheritors(idx: number): Inheritor[] {
  const count = 1 + Math.floor(seededRandom(idx * 7 + 1) * 4);
  const inheritors: Inheritor[] = [];
  const levels: HeritageLevel[] = ["national", "provincial", "municipal", "county"];

  for (let i = 0; i < count; i++) {
    const genders: ("男" | "女")[] = ["男", "女"];
    const levelIdx = Math.min(i, 3);
    inheritors.push({
      name: `传承人${i + 1}`,
      gender: genders[Math.floor(seededRandom(idx * 11 + i * 3) * 2)],
      age: 45 + Math.floor(seededRandom(idx * 13 + i * 5) * 30),
      level: levels[levelIdx],
      years: 10 + Math.floor(seededRandom(idx * 17 + i * 7) * 40),
    });
  }
  return inheritors;
}

function generateHeritage(
  id: string,
  name: string,
  category: HeritageCategory,
  level: HeritageLevel,
  city: string,
  region: string,
  centerLng: number,
  centerLat: number,
  idx: number
): IntangibleHeritage {
  const offsetLng = (seededRandom(idx * 19 + 1) - 0.5) * 0.12;
  const offsetLat = (seededRandom(idx * 23 + 3) - 0.5) * 0.1;

  const inheritors = generateInheritors(idx);
  const declarationYear = 2006 + Math.floor(seededRandom(idx * 29 + 5) * 18);

  const statuses: ("active" | "at-risk" | "endangered")[] = ["active", "active", "active", "at-risk", "endangered"];
  const status = statuses[Math.floor(seededRandom(idx * 31 + 7) * statuses.length)];

  return {
    id,
    name,
    category,
    level,
    city,
    region,
    lng: centerLng + offsetLng,
    lat: centerLat + offsetLat,
    declarationYear,
    inheritors,
    protectionUnit: `${region}文化馆`,
    description: `${name}是${city}${region}地区的重要非物质文化遗产，具有悠久的历史传承和独特的文化价值。`,
    status,
  };
}

const HERITAGES: IntangibleHeritage[] = [
  generateHeritage("bj-1", "京剧", "traditional-drama", "national", "北京", "东城区", 116.42, 39.93, 1),
  generateHeritage("bj-2", "景泰蓝制作技艺", "traditional-craft", "national", "北京", "崇文区", 116.43, 39.89, 2),
  generateHeritage("bj-3", "北京烤鸭技艺", "traditional-craft", "provincial", "北京", "朝阳区", 116.46, 39.92, 3),
  generateHeritage("bj-4", "京韵大鼓", "traditional-music", "national", "北京", "西城区", 116.37, 39.93, 4),
  generateHeritage("bj-5", "抖空竹", "folk-custom", "municipal", "北京", "海淀区", 116.30, 39.96, 5),
  generateHeritage("sh-1", "沪剧", "traditional-drama", "national", "上海", "黄浦区", 121.48, 31.23, 6),
  generateHeritage("sh-2", "上海剪纸", "traditional-craft", "provincial", "上海", "徐汇区", 121.44, 19.195, 7),
  generateHeritage("sh-3", "顾绣", "traditional-craft", "national", "上海", "松江区", 121.23, 31.03, 8),
  generateHeritage("sh-4", "江南丝竹", "traditional-music", "national", "上海", "浦东新区", 121.54, 31.22, 9),
  generateHeritage("gz-1", "粤剧", "traditional-drama", "national", "广州", "越秀区", 113.26, 23.13, 10),
  generateHeritage("gz-2", "广州牙雕", "traditional-craft", "national", "广州", "荔湾区", 113.24, 23.12, 11),
  generateHeritage("gz-3", "广绣", "traditional-craft", "provincial", "广州", "海珠区", 113.32, 23.09, 12),
  generateHeritage("gz-4", "广东音乐", "traditional-music", "national", "广州", "天河区", 113.35, 23.13, 13),
  generateHeritage("gz-5", "迎春花市", "folk-custom", "municipal", "广州", "荔湾区", 113.23, 23.11, 14),
];

export function getHeritages(): IntangibleHeritage[] {
  return HERITAGES;
}

export function getHeritageById(id: string): IntangibleHeritage | undefined {
  return HERITAGES.find((h) => h.id === id);
}

export function getHeritagesByCity(city: string): IntangibleHeritage[] {
  return HERITAGES.filter((h) => h.city === city);
}

export function getCities(): string[] {
  return [...new Set(HERITAGES.map((h) => h.city))];
}