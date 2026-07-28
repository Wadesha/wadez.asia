export type ChainLevel = "upstream" | "midstream" | "downstream";

export interface ChainNode {
  id: string;
  name: string;
  level: ChainLevel;
  companies: string[];
  output: number;
  growth: number;
}

export interface IndustryChain {
  id: string;
  name: string;
  city: string;
  nodes: ChainNode[];
 总产值: number;
  enterpriseCount: number;
  clusterScore: number;
}

export const CHAIN_LEVEL_LABELS: Record<ChainLevel, string> = {
  upstream: "上游",
  midstream: "中游",
  downstream: "下游",
};

export const CHAIN_LEVEL_COLORS: Record<ChainLevel, string> = {
  upstream: "#3b82f6",
  midstream: "#f59e0b",
  downstream: "#10b981",
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateNodes(chainId: string): ChainNode[] {
  const upstreamCompanies = ["原材料供应商A", "零部件制造商B", "核心技术提供商C"];
  const midstreamCompanies = ["组装厂商D", "加工企业E", "制造商F"];
  const downstreamCompanies = ["销售商G", "服务商H", "终端品牌I"];

  return [
    {
      id: `${chainId}-up`,
      name: "上游供应",
      level: "upstream",
      companies: upstreamCompanies.slice(0, 2 + Math.floor(seededRandom(chainId.length * 7) * 2)),
      output: Math.round(100 + seededRandom(chainId.length * 11) * 500),
      growth: Math.round(-5 + seededRandom(chainId.length * 13) * 20),
    },
    {
      id: `${chainId}-mid`,
      name: "中游制造",
      level: "midstream",
      companies: midstreamCompanies.slice(0, 2 + Math.floor(seededRandom(chainId.length * 17) * 2)),
      output: Math.round(200 + seededRandom(chainId.length * 19) * 800),
      growth: Math.round(0 + seededRandom(chainId.length * 23) * 25),
    },
    {
      id: `${chainId}-down`,
      name: "下游应用",
      level: "downstream",
      companies: downstreamCompanies.slice(0, 2 + Math.floor(seededRandom(chainId.length * 29) * 2)),
      output: Math.round(300 + seededRandom(chainId.length * 31) * 1000),
      growth: Math.round(5 + seededRandom(chainId.length * 37) * 30),
    },
  ];
}

function generateChain(
  id: string,
  name: string,
  city: string
): IndustryChain {
  const nodes = generateNodes(id);
  const totalOutput = nodes.reduce((s, n) => s + n.output, 0);
  const enterpriseCount = nodes.reduce((s, n) => s + n.companies.length, 0);
  const clusterScore = Math.round(60 + seededRandom(id.length * 41) * 40);

  return {
    id,
    name,
    city,
    nodes,
    总产值: totalOutput,
    enterpriseCount,
    clusterScore,
  };
}

const CHAINS: IndustryChain[] = [
  generateChain("bj-ev", "新能源汽车产业链", "北京"),
  generateChain("bj-ai", "人工智能产业链", "北京"),
  generateChain("sh-bio", "生物医药产业链", "上海"),
  generateChain("sh-ic", "集成电路产业链", "上海"),
  generateChain("gz-auto", "汽车制造产业链", "广州"),
  generateChain("sz-it", "电子信息产业链", "深圳"),
];

export function getChains(): IndustryChain[] {
  return CHAINS;
}

export function getChainById(id: string): IndustryChain | undefined {
  return CHAINS.find((c) => c.id === id);
}

export function getChainsByCity(city: string): IndustryChain[] {
  return CHAINS.filter((c) => c.city === city);
}

export function getCities(): string[] {
  return [...new Set(CHAINS.map((c) => c.city))];
}