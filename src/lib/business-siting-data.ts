export type BusinessType = "cafe" | "restaurant" | "retail" | "gym" | "bookstore" | "pharmacy";

export interface LocationScore {
  id: string;
  name: string;
  lng: number;
  lat: number;
  businessType: BusinessType;
  overallScore: number;
  dimensions: {
    footTraffic: number;
    accessibility: number;
    competition: number;
    demographics: number;
    rent: number;
    surrounding: number;
  };
  rentPerSqm: number;
  estimatedDailyCustomers: number;
  estimatedMonthlyRevenue: number;
  nearbyCompetitors: number;
  nearbySupporters: number;
  description: string;
}

export interface BusinessSitingArea {
  id: string;
  name: string;
  city: string;
  center: [number, number];
  businessType: BusinessType;
  locations: LocationScore[];
  avgScore: number;
  bestLocation?: LocationScore;
}

export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  cafe: "咖啡店",
  restaurant: "餐厅",
  retail: "零售店",
  gym: "健身房",
  bookstore: "书店",
  pharmacy: "药店",
};

export const BUSINESS_TYPE_ICONS: Record<BusinessType, string> = {
  cafe: "☕",
  restaurant: "🍜",
  retail: "🛍️",
  gym: "💪",
  bookstore: "📚",
  pharmacy: "💊",
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateLocation(
  id: string,
  name: string,
  centerLng: number,
  centerLat: number,
  idx: number,
  businessType: BusinessType
): LocationScore {
  const offsetLng = (seededRandom(idx * 7 + 1) - 0.5) * 0.03;
  const offsetLat = (seededRandom(idx * 11 + 3) - 0.5) * 0.02;
  const lng = centerLng + offsetLng;
  const lat = centerLat + offsetLat;

  const distFromCenter = Math.sqrt(offsetLng * offsetLng + offsetLat * offsetLat) * 100;
  const centerBonus = Math.max(0, 100 - distFromCenter * 3) / 100;

  const footTraffic = Math.round(40 + seededRandom(idx * 13 + 5) * 50 + centerBonus * 20);
  const accessibility = Math.round(50 + seededRandom(idx * 17 + 7) * 40 + centerBonus * 15);
  const competition = Math.round(30 + seededRandom(idx * 19 + 9) * 60);
  const demographics = Math.round(45 + seededRandom(idx * 23 + 11) * 45 + centerBonus * 10);
  const rent = Math.round(30 + seededRandom(idx * 29 + 13) * 50 + centerBonus * 30);
  const surrounding = Math.round(40 + seededRandom(idx * 31 + 15) * 50);

  const competitionPenalty = competition * 0.15;
  const rentPenalty = rent * 0.1;
  const overallScore = Math.round(
    (footTraffic * 0.25 + accessibility * 0.2 + demographics * 0.2 + surrounding * 0.15
      + (100 - competitionPenalty) * 0.1 + (100 - rentPenalty) * 0.1)
  );

  const baseRent = 150 + rent * 8;
  const dailyCustomers = Math.round(30 + footTraffic * 2 + (100 - competition) * 0.5);
  const avgSpend = businessType === "restaurant" ? 80 : businessType === "gym" ? 200 : 50;
  const monthlyRevenue = dailyCustomers * avgSpend * 30;

  return {
    id,
    name,
    lng,
    lat,
    businessType,
    overallScore,
    dimensions: {
      footTraffic,
      accessibility,
      competition,
      demographics,
      rent,
      surrounding,
    },
    rentPerSqm: Math.round(baseRent),
    estimatedDailyCustomers: dailyCustomers,
    estimatedMonthlyRevenue: Math.round(monthlyRevenue),
    nearbyCompetitors: Math.round(3 + competition * 0.12),
    nearbySupporters: Math.round(5 + surrounding * 0.15),
    description: `${name} — ${BUSINESS_TYPE_LABELS[businessType]}选址评估点`,
  };
}

export function generateBusinessSitingArea(
  id: string,
  name: string,
  city: string,
  center: [number, number],
  businessType: BusinessType = "cafe",
  locationCount: number = 20
): BusinessSitingArea {
  const locations: LocationScore[] = [];

  for (let i = 0; i < locationCount; i++) {
    locations.push(
      generateLocation(
        `${id}-loc-${i}`,
        `${name}选址点${i + 1}`,
        center[0],
        center[1],
        i,
        businessType
      )
    );
  }

  locations.sort((a, b) => b.overallScore - a.overallScore);

  const avgScore = Math.round(
    locations.reduce((s, l) => s + l.overallScore, 0) / locations.length
  );

  return {
    id,
    name,
    city,
    center,
    businessType,
    locations,
    avgScore,
    bestLocation: locations[0],
  };
}

const SITING_AREAS: BusinessSitingArea[] = [
  generateBusinessSitingArea("beijing-cbd-cafe", "国贸CBD咖啡", "北京", [116.46, 39.915], "cafe", 20),
  generateBusinessSitingArea("shanghai-pudong-restaurant", "浦东陆家嘴餐饮", "上海", [121.5, 31.235], "restaurant", 18),
];

export function getBusinessSitingAreas(): BusinessSitingArea[] {
  return SITING_AREAS;
}

export function getBusinessSitingById(id: string): BusinessSitingArea | undefined {
  return SITING_AREAS.find((a) => a.id === id);
}

export const DIMENSION_META = {
  footTraffic: { label: "人流量", color: "#ef4444", weight: 0.25, desc: "评估点周边日均人流量" },
  accessibility: { label: "可达性", color: "#3b82f6", weight: 0.2, desc: "公共交通与道路通达性" },
  competition: { label: "竞争烈度", color: "#f59e0b", weight: 0.1, desc: "周边同类商家数量（越低越好）" },
  demographics: { label: "客群匹配", color: "#8b5cf6", weight: 0.2, desc: "周边人口与目标客群匹配度" },
  rent: { label: "租金成本", color: "#6b7280", weight: 0.1, desc: "单位面积租金水平（越低越好）" },
  surrounding: { label: "周边配套", color: "#10b981", weight: 0.15, desc: "周边商业/办公/居住配套" },
};
