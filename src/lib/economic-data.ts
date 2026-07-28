export interface RegionEconData {
  id: string;
  name: string;
  level: "province" | "city";
  lng: number;
  lat: number;
  gdp: number;
  gdpGrowth: number;
  perCapitaGdp: number;
  population: number;
  areaSqKm: number;
  fiscalRevenue: number;
  fixedAssetInvestment: number;
  totalRetail: number;
  foreignTrade: number;
  industryStructure: { primary: number; secondary: number; tertiary: number };
  urbanizationRate: number;
  ranking: number;
}

export interface EconDataset {
  id: string;
  name: string;
  year: number;
  regions: RegionEconData[];
  totalGdp: number;
  totalPopulation: number;
  avgGrowth: number;
}

export const ECON_METRICS = {
  gdp: { label: "GDP总量", unit: "亿", color: "#3b82f6", format: "亿" },
  perCapitaGdp: { label: "人均GDP", unit: "元", color: "#8b5cf6", format: "万" },
  gdpGrowth: { label: "GDP增速", unit: "%", color: "#10b981", format: "%" },
  population: { label: "常住人口", unit: "万人", color: "#f59e0b", format: "万" },
  fiscalRevenue: { label: "财政收入", unit: "亿", color: "#ef4444", format: "亿" },
  fixedAssetInvestment: { label: "固投", unit: "亿", color: "#06b6d4", format: "亿" },
  totalRetail: { label: "社零总额", unit: "亿", color: "#ec4899", format: "亿" },
  foreignTrade: { label: "进出口", unit: "亿", color: "#84cc16", format: "亿" },
  urbanizationRate: { label: "城镇化率", unit: "%", color: "#6366f1", format: "%" },
};

export type EconMetricKey = keyof typeof ECON_METRICS;

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const PROVINCE_NAMES = [
  "广东", "江苏", "山东", "浙江", "河南", "四川", "湖北", "福建",
  "湖南", "上海", "安徽", "北京", "河北", "陕西", "江西", "重庆",
  "辽宁", "云南", "广西", "山西", "内蒙古", "贵州", "新疆", "天津",
  "黑龙江", "吉林", "甘肃", "海南", "宁夏", "青海", "西藏",
];

const PROVINCE_LOCATIONS: Record<string, [number, number]> = {
  "广东": [113.3, 23.1], "江苏": [118.8, 32.0], "山东": [117.0, 36.6],
  "浙江": [120.2, 30.3], "河南": [113.6, 34.7], "四川": [104.0, 30.6],
  "湖北": [114.3, 30.6], "福建": [119.3, 26.0], "湖南": [113.0, 28.2],
  "上海": [121.5, 31.2], "安徽": [117.3, 31.8], "北京": [116.4, 39.9],
  "河北": [114.5, 38.0], "陕西": [108.9, 34.3], "江西": [115.9, 28.7],
  "重庆": [106.5, 29.5], "辽宁": [123.4, 41.8], "云南": [102.7, 25.0],
  "广西": [108.3, 22.8], "山西": [112.5, 37.9], "内蒙古": [111.7, 40.8],
  "贵州": [106.6, 26.6], "新疆": [87.6, 43.8], "天津": [117.2, 39.1],
  "黑龙江": [126.5, 45.8], "吉林": [125.3, 43.9], "甘肃": [103.8, 36.1],
  "海南": [110.3, 20.0], "宁夏": [106.3, 38.5], "青海": [101.8, 36.6],
  "西藏": [91.1, 29.6],
};

const GDP_BASE: Record<string, number> = {
  "广东": 135673, "江苏": 128222, "山东": 99522, "浙江": 82553,
  "河南": 59132, "四川": 56749, "湖北": 53734, "福建": 53109,
  "湖南": 48670, "上海": 47218, "安徽": 45045, "北京": 41610,
  "河北": 42370, "陕西": 32772, "江西": 32074, "重庆": 30145,
  "辽宁": 28975, "云南": 28412, "广西": 26300, "山西": 25243,
  "内蒙古": 23159, "贵州": 20164, "新疆": 17741, "天津": 16311,
  "黑龙江": 15883, "吉林": 13070, "甘肃": 11201, "海南": 6818,
  "宁夏": 5069, "青海": 3610, "西藏": 2080,
};

const POPULATION_BASE: Record<string, number> = {
  "广东": 12684, "山东": 10163, "河南": 9872, "江苏": 8515,
  "四川": 8374, "河北": 7420, "湖南": 6604, "浙江": 6627,
  "安徽": 6102, "湖北": 5844, "广西": 5047, "云南": 4693,
  "江西": 4517, "辽宁": 4197, "福建": 4188, "陕西": 3956,
  "贵州": 3856, "山西": 3481, "重庆": 3212, "黑龙江": 3099,
  "新疆": 2587, "甘肃": 2492, "上海": 2475, "吉林": 2347,
  "内蒙古": 2400, "北京": 2184, "天津": 1363, "海南": 1027,
  "宁夏": 728, "青海": 595, "西藏": 364,
};

function generateProvinceData(name: string, idx: number): RegionEconData {
  const baseGdp = GDP_BASE[name] || 20000;
  const basePop = POPULATION_BASE[name] || 3000;
  const loc = PROVINCE_LOCATIONS[name] || [105.0, 35.0];
  const jitter = 0.95 + seededRandom(idx * 7 + 1) * 0.1;

  const gdp = Math.round(baseGdp * jitter);
  const population = Math.round(basePop * jitter);
  const perCapitaGdp = Math.round((gdp / population) * 10000);
  const gdpGrowth = +(3 + seededRandom(idx * 11 + 3) * 5).toFixed(1);
  const fiscalRevenue = Math.round(gdp * (0.08 + seededRandom(idx * 13 + 5) * 0.08));
  const fixedAssetInvestment = Math.round(gdp * (0.5 + seededRandom(idx * 17 + 7) * 0.4));
  const totalRetail = Math.round(gdp * (0.3 + seededRandom(idx * 19 + 9) * 0.25));
  const foreignTrade = Math.round(gdp * (0.05 + seededRandom(idx * 23 + 11) * 0.35));

  const primary = +(3 + seededRandom(idx * 29 + 13) * 8).toFixed(1);
  const secondary = +(35 + seededRandom(idx * 31 + 15) * 15).toFixed(1);
  const tertiary = +(100 - primary - secondary).toFixed(1);

  const urbanizationRate = +(50 + seededRandom(idx * 37 + 17) * 40).toFixed(1);
  const areaSqKm = Math.round(50000 + seededRandom(idx * 41 + 19) * 150000);

  return {
    id: `prov-${idx}`,
    name,
    level: "province",
    lng: loc[0] + (seededRandom(idx * 43 + 21) - 0.5) * 0.5,
    lat: loc[1] + (seededRandom(idx * 47 + 23) - 0.5) * 0.3,
    gdp,
    gdpGrowth,
    perCapitaGdp,
    population,
    areaSqKm,
    fiscalRevenue,
    fixedAssetInvestment,
    totalRetail,
    foreignTrade,
    industryStructure: { primary, secondary, tertiary },
    urbanizationRate,
    ranking: 0,
  };
}

function generateDataset(): EconDataset {
  const regions: RegionEconData[] = PROVINCE_NAMES.map((name, i) =>
    generateProvinceData(name, i)
  );

  regions.sort((a, b) => b.gdp - a.gdp);
  regions.forEach((r, i) => (r.ranking = i + 1));

  const totalGdp = regions.reduce((s, r) => s + r.gdp, 0);
  const totalPopulation = regions.reduce((s, r) => s + r.population, 0);
  const avgGrowth = +(regions.reduce((s, r) => s + r.gdpGrowth, 0) / regions.length).toFixed(1);

  return {
    id: "national-2025",
    name: "全国省级经济数据",
    year: 2025,
    regions,
    totalGdp,
    totalPopulation,
    avgGrowth,
  };
}

const ECON_DATASETS: EconDataset[] = [generateDataset()];

export function getEconDatasets(): EconDataset[] {
  return ECON_DATASETS;
}

export function getEconDatasetById(id: string): EconDataset | undefined {
  return ECON_DATASETS.find((d) => d.id === id);
}
