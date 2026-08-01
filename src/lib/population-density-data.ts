// 人口密度数据 - 年龄结构模拟数据

export interface AgeGroup {
  age: string;
  pct: number;
  color: string;
}

export interface AgeStructure {
  groups: AgeGroup[];
  agingRate: number;      // 老龄化率
  dependencyRatio: number; // 抚养比
  medianAge: number;       // 中位年龄
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// 基于区域ID生成确定性的年龄结构数据
export function getAgeStructure(areaId: string): AgeStructure {
  const seed = areaId.length;
  const r1 = seededRandom(seed * 7 + 1);
  const r2 = seededRandom(seed * 11 + 3);
  const r3 = seededRandom(seed * 13 + 5);

  // 不同区域有不同的年龄结构特征
  const youngBase = 10 + r1 * 12;   // 0-14岁: 10-22%
  const youthBase = 18 + r2 * 15;   // 15-29岁: 18-33%
  const middleBase = 24 + r3 * 12;  // 30-44岁: 24-36%
  const olderBase = 16 + seededRandom(seed * 17 + 7) * 10; // 45-59岁: 16-26%
  const elderlyBase = 100 - youngBase - youthBase - middleBase - olderBase;
  const elderly = Math.max(5, Math.min(20, elderlyBase));

  const groups: AgeGroup[] = [
    { age: "0-14岁", pct: Math.round(youngBase), color: "bg-cyan-400" },
    { age: "15-29岁", pct: Math.round(youthBase), color: "bg-blue-400" },
    { age: "30-44岁", pct: Math.round(middleBase), color: "bg-purple-400" },
    { age: "45-59岁", pct: Math.round(olderBase), color: "bg-orange-400" },
    { age: "60岁以上", pct: Math.round(elderly), color: "bg-gray-400" },
  ];

  const agingRate = Math.round(elderly * 10) / 10;
  const dependencyRatio = Math.round(((youngBase + elderly) / (youthBase + middleBase + olderBase)) * 100) / 100;
  const medianAge = Math.round(32 + r1 * 8);

  return { groups, agingRate, dependencyRatio, medianAge };
}
