export type InvestmentType =
  | "industrial_park"
  | "business_building"
  | "key_project"
  | "incubator"
  | "logistics_park"
  | "research_institute";

export type InvestmentStatus = "planning" | "under_construction" | "operation" | "negotiating";

export interface InvestmentProject {
  id: string;
  name: string;
  type: InvestmentType;
  status: InvestmentStatus;
  lng: number;
  lat: number;
  totalInvestment: number;
  areaSqM: number;
  expectedOutput: number;
  expectedJobs: number;
  industry: string;
  developer: string;
  startYear: number;
  completeYear: number;
  policyBenefits: string[];
  description: string;
  contactPerson?: string;
  contactPhone?: string;
  dataSource: "simulated";
}

export interface InvestmentCity {
  id: string;
  name: string;
  center: [number, number];
  projects: InvestmentProject[];
  totalInvestment: number;
  totalProjects: number;
  keyIndustries: string[];
  policies: string[];
  dataSource: "simulated";
}

export const INVESTMENT_TYPE_LABELS: Record<InvestmentType, string> = {
  industrial_park: "产业园区",
  business_building: "商务楼宇",
  key_project: "重点项目",
  incubator: "孵化器",
  logistics_park: "物流园区",
  research_institute: "科研院所",
};

export const INVESTMENT_TYPE_ICONS: Record<InvestmentType, string> = {
  industrial_park: "🏭",
  business_building: "🏢",
  key_project: "🚧",
  incubator: "🚀",
  logistics_park: "📦",
  research_institute: "🔬",
};

export const INVESTMENT_TYPE_COLORS: Record<InvestmentType, string> = {
  industrial_park: "#3b82f6",
  business_building: "#8b5cf6",
  key_project: "#ef4444",
  incubator: "#10b981",
  logistics_park: "#f59e0b",
  research_institute: "#06b6d4",
};

export const STATUS_LABELS: Record<InvestmentStatus, { label: string; color: string }> = {
  planning: { label: "规划中", color: "#6b7280" },
  under_construction: { label: "建设中", color: "#f59e0b" },
  operation: { label: "运营中", color: "#10b981" },
  negotiating: { label: "洽谈中", color: "#3b82f6" },
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateProject(
  id: string,
  idx: number,
  centerLng: number,
  centerLat: number,
  typeBias?: InvestmentType[]
): InvestmentProject {
  const types: InvestmentType[] = [
    "industrial_park",
    "business_building",
    "key_project",
    "incubator",
    "logistics_park",
    "research_institute",
  ];
  const pool = typeBias && typeBias.length > 0 ? typeBias : types;
  const type = pool[Math.floor(seededRandom(idx * 3 + 1) * pool.length)];

  const offsetLng = (seededRandom(idx * 7 + 3) - 0.5) * 0.5;
  const offsetLat = (seededRandom(idx * 11 + 5) - 0.5) * 0.4;

  const statuses: InvestmentStatus[] = [
    "planning",
    "under_construction",
    "operation",
    "operation",
    "operation",
    "negotiating",
  ];
  const status = statuses[Math.floor(seededRandom(idx * 13 + 7) * statuses.length)];

  const baseInvest = 2 + seededRandom(idx * 17 + 9) * 48;
  const totalInvestment = Math.round(baseInvest * 10) / 10;

  const industries = [
    "新一代信息技术", "生物医药", "高端装备制造", "新能源",
    "新材料", "数字经济", "现代服务业", "人工智能",
  ];
  const industry = industries[Math.floor(seededRandom(idx * 19 + 11) * industries.length)];

  const developers = [
    "招商局集团", "华润置地", "万科产业", "保利发展",
    "中关村发展", "张江高科", "深圳湾科技", "华夏幸福",
  ];
  const developer = developers[Math.floor(seededRandom(idx * 23 + 13) * developers.length)];

  const area = Math.round((1 + seededRandom(idx * 29 + 15) * 30) * 10000);
  const expectedOutput = Math.round(totalInvestment * (1.5 + seededRandom(idx * 31 + 17) * 3));
  const expectedJobs = Math.round(totalInvestment * 500 + seededRandom(idx * 37 + 19) * 2000);
  const startYear = 2020 + Math.floor(seededRandom(idx * 41 + 21) * 4);
  const completeYear = startYear + 2 + Math.floor(seededRandom(idx * 43 + 23) * 4);

  const allPolicies = [
    "税收减免", "租金补贴", "人才政策", "研发补贴",
    "贷款贴息", "落地奖励", "场地免费", "一事一议",
    "基金支持", "上市奖励",
  ];
  const policyCount = 3 + Math.floor(seededRandom(idx * 47 + 25) * 4);
  const shuffled = [...allPolicies].sort(() => seededRandom(idx * 53 + 27) - 0.5);
  const policyBenefits = shuffled.slice(0, policyCount);

  return {
    id,
    name: `${INVESTMENT_TYPE_LABELS[type]}项目${idx + 1}`,
    type,
    status,
    lng: centerLng + offsetLng,
    lat: centerLat + offsetLat,
    totalInvestment,
    areaSqM: area,
    expectedOutput,
    expectedJobs,
    industry,
    developer,
    startYear,
    completeYear,
    policyBenefits,
    description: `${INVESTMENT_TYPE_LABELS[type]}重点招商项目，总投资${totalInvestment}亿元`,
    contactPerson: "张经理",
    contactPhone: "0755-8888" + (1000 + idx * 7),
    dataSource: "simulated" as const,
  };
}

function generateInvestmentCity(
  id: string,
  name: string,
  center: [number, number],
  projectCount: number,
  typeBias?: InvestmentType[]
): InvestmentCity {
  const projects: InvestmentProject[] = [];
  for (let i = 0; i < projectCount; i++) {
    projects.push(
      generateProject(`${id}-proj-${i}`, i, center[0], center[1], typeBias)
    );
  }

  const totalInvestment = +projects.reduce((s, p) => s + p.totalInvestment, 0).toFixed(1);

  const industryCount: Record<string, number> = {};
  projects.forEach((p) => {
    industryCount[p.industry] = (industryCount[p.industry] || 0) + 1;
  });
  const keyIndustries = Object.entries(industryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([k]) => k);

  const policies = [
    "《关于促进产业高质量发展的若干措施》",
    "《招商引资优惠政策实施细则》",
    "《高层次人才引进计划》",
    "《科技创新专项扶持办法》",
    "《中小微企业发展专项资金管理办法》",
  ];

  return {
    id,
    name,
    center,
    projects,
    totalInvestment,
    totalProjects: projects.length,
    keyIndustries,
    policies,
    dataSource: "simulated" as const,
  };
}

const INVESTMENT_CITIES: InvestmentCity[] = [
  generateInvestmentCity(
    "guangzhou",
    "广州",
    [113.26, 23.13],
    25,
    ["business_building", "key_project", "incubator", "industrial_park"]
  ),
  generateInvestmentCity(
    "chengdu",
    "成都",
    [104.06, 30.67],
    20,
    ["industrial_park", "research_institute", "logistics_park", "key_project"]
  ),
];

export function getInvestmentCities(): InvestmentCity[] {
  return INVESTMENT_CITIES;
}

export function getInvestmentCityById(id: string): InvestmentCity | undefined {
  return INVESTMENT_CITIES.find((c) => c.id === id);
}
