export type ClusterLevel = "core" | "sub" | "emerging";
export type BrandTier = "luxury" | "premium" | "mass" | "budget";

export interface BrandInfo {
  name: string;
  tier: BrandTier;
  category: string;
  storeCount: number;
}

export interface CustomerProfile {
  age: string;
  income: string;
  education: string;
  consumption: string;
  percentage: number;
}

export interface BusinessCluster {
  id: string;
  name: string;
  city: string;
  level: ClusterLevel;
  center: [number, number];
  area: number;
  brandCount: number;
  storeCount: number;
  competitionIndex: number;
  attractiveness: number;
  brands: BrandInfo[];
  customerProfiles: CustomerProfile[];
  strengths: string[];
  weaknesses: string[];
  avgRent: number;
  dailyTraffic: number;
  monthlyRevenue: number;
}

export const CLUSTER_LEVEL_LABELS: Record<ClusterLevel, string> = {
  core: "核心商圈",
  sub: "次级商圈",
  emerging: "新兴商圈",
};

export const CLUSTER_LEVEL_COLORS: Record<ClusterLevel, string> = {
  core: "#ef4444",
  sub: "#f59e0b",
  emerging: "#10b981",
};

export const BRAND_TIER_LABELS: Record<BrandTier, string> = {
  luxury: "奢侈品牌",
  premium: "高端品牌",
  mass: "大众品牌",
  budget: "平价品牌",
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateBrands(clusterId: string, idx: number): BrandInfo[] {
  const brands: BrandInfo[] = [];
  const brandNames = [
    { name: "星巴克", tier: "premium" as BrandTier, category: "餐饮" },
    { name: "肯德基", tier: "mass" as BrandTier, category: "餐饮" },
    { name: "麦当劳", tier: "mass" as BrandTier, category: "餐饮" },
    { name: "优衣库", tier: "mass" as BrandTier, category: "服装" },
    { name: "ZARA", tier: "premium" as BrandTier, category: "服装" },
    { name: "H&M", tier: "mass" as BrandTier, category: "服装" },
    { name: "苹果", tier: "luxury" as BrandTier, category: "数码" },
    { name: "华为", tier: "premium" as BrandTier, category: "数码" },
    { name: "LV", tier: "luxury" as BrandTier, category: "奢侈品" },
    { name: "Gucci", tier: "luxury" as BrandTier, category: "奢侈品" },
    { name: "耐克", tier: "premium" as BrandTier, category: "运动" },
    { name: "阿迪达斯", tier: "premium" as BrandTier, category: "运动" },
    { name: "屈臣氏", tier: "mass" as BrandTier, category: "零售" },
    { name: "名创优品", tier: "budget" as BrandTier, category: "零售" },
    { name: "海底捞", tier: "premium" as BrandTier, category: "餐饮" },
  ];

  const count = 6 + Math.floor(seededRandom(idx * 7 + 1) * 8);
  for (let i = 0; i < count; i++) {
    const brand = brandNames[Math.floor(seededRandom(idx * 13 + i * 3) * brandNames.length)];
    brands.push({
      ...brand,
      storeCount: 1 + Math.floor(seededRandom(idx * 17 + i * 5) * 3),
    });
  }
  return brands;
}

function generateCustomerProfiles(idx: number): CustomerProfile[] {
  return [
    {
      age: "18-25岁",
      income: "3-6万",
      education: "本科",
      consumption: "追求时尚",
      percentage: Math.round(15 + seededRandom(idx * 23 + 1) * 15),
    },
    {
      age: "26-35岁",
      income: "8-15万",
      education: "本科/硕士",
      consumption: "注重品质",
      percentage: Math.round(25 + seededRandom(idx * 29 + 2) * 20),
    },
    {
      age: "36-45岁",
      income: "15-30万",
      education: "本科/硕士",
      consumption: "家庭消费",
      percentage: Math.round(20 + seededRandom(idx * 31 + 3) * 15),
    },
    {
      age: "46-55岁",
      income: "20-50万",
      education: "本科及以上",
      consumption: "稳健消费",
      percentage: Math.round(10 + seededRandom(idx * 37 + 4) * 10),
    },
    {
      age: "55岁以上",
      income: "退休金",
      education: "大专及以上",
      consumption: "理性消费",
      percentage: Math.round(5 + seededRandom(idx * 41 + 5) * 8),
    },
  ];
}

function generateCluster(
  id: string,
  name: string,
  city: string,
  center: [number, number],
  level: ClusterLevel,
  idx: number
): BusinessCluster {
  const brands = generateBrands(id, idx);
  const customerProfiles = generateCustomerProfiles(idx);

  const baseArea = level === "core" ? 80 : level === "sub" ? 45 : 25;
  const area = Math.round(baseArea + seededRandom(idx * 11 + 3) * 30);

  const competitionIndex = Math.round(
    40 + seededRandom(idx * 19 + 9) * 50 + (level === "core" ? 10 : 0)
  );
  const attractiveness = Math.round(
    60 + seededRandom(idx * 23 + 11) * 35 - competitionIndex * 0.3
  );

  const strengths = [
    "交通便利，地铁直达",
    "品牌集聚效应强",
    "消费氛围浓厚",
    "周边配套设施完善",
    "人流量稳定",
  ].slice(0, 2 + Math.floor(seededRandom(idx * 29 + 13) * 2));

  const weaknesses = [
    "租金成本较高",
    "竞争品牌较多",
    "停车位紧张",
    "部分时段拥堵",
    "新兴品牌入场难度大",
  ].slice(0, 1 + Math.floor(seededRandom(idx * 31 + 15) * 2));

  return {
    id,
    name,
    city,
    level,
    center,
    area,
    brandCount: brands.length,
    storeCount: brands.reduce((s, b) => s + b.storeCount, 0),
    competitionIndex,
    attractiveness,
    brands,
    customerProfiles,
    strengths,
    weaknesses,
    avgRent: Math.round(150 + seededRandom(idx * 37 + 17) * 250 + (level === "core" ? 100 : 0)),
    dailyTraffic: Math.round(
      50000 + seededRandom(idx * 41 + 19) * 150000 * (level === "core" ? 2 : 1)
    ),
    monthlyRevenue: Math.round(
      500 + seededRandom(idx * 43 + 21) * 2000 + (level === "core" ? 500 : 0)
    ),
  };
}

const CLUSTERS: BusinessCluster[] = [
  generateCluster("bj-cbd", "国贸CBD商圈", "北京", [116.46, 39.915], "core", 1),
  generateCluster("bj-sanlitun", "三里屯商圈", "北京", [116.455, 39.933], "core", 2),
  generateCluster("bj-wangfujing", "王府井商圈", "北京", [116.41, 39.915], "core", 3),
  generateCluster("bj-xidan", "西单商圈", "北京", [116.37, 39.913], "sub", 4),
  generateCluster("bj-zhongguancun", "中关村商圈", "北京", [116.32, 39.98], "sub", 5),
  generateCluster("bj-wudaokou", "五道口商圈", "北京", [116.34, 39.99], "emerging", 6),
  generateCluster("sh-lujiazui", "陆家嘴商圈", "上海", [121.5, 31.235], "core", 7),
  generateCluster("sh-nanjinglu", "南京路商圈", "上海", [121.48, 31.238], "core", 8),
  generateCluster("sh-xintiandi", "新天地商圈", "上海", [121.475, 31.22], "core", 9),
  generateCluster("sh-xujiahui", "徐家汇商圈", "上海", [121.44, 31.195], "sub", 10),
  generateCluster("sh-jingan", "静安寺商圈", "上海", [121.45, 31.225], "sub", 11),
  generateCluster("sh-dapuqiao", "打浦桥商圈", "上海", [121.47, 31.215], "emerging", 12),
  generateCluster("gz-tianhe", "天河路商圈", "广州", [113.33, 23.13], "core", 13),
  generateCluster("gz-zhujiang", "珠江新城商圈", "广州", [113.32, 23.12], "core", 14),
  generateCluster("gz-beijinglu", "北京路商圈", "广州", [113.27, 23.125], "sub", 15),
  generateCluster("gz-pazhou", "琶洲商圈", "广州", [113.35, 23.1], "emerging", 16),
];

export function getBusinessClusters(): BusinessCluster[] {
  return CLUSTERS;
}

export function getBusinessClusterById(id: string): BusinessCluster | undefined {
  return CLUSTERS.find((c) => c.id === id);
}

export function getClustersByCity(city: string): BusinessCluster[] {
  return CLUSTERS.filter((c) => c.city === city);
}

export function getCities(): string[] {
  return [...new Set(CLUSTERS.map((c) => c.city))];
}