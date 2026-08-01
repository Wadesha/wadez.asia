/**
 * 全国省级行政区时间序列数据（2010-2024）
 *
 * 数据性质：示例数据，基于公开统计年鉴趋势模拟生成
 * 字段：GDP（亿元）/人口（万人）/城镇化率（%）/人均GDP（万元）
 * 用途：时间轴动画、趋势对比、增长分析
 */

export interface YearData {
  year: number;
  gdp: number;
  population: number;
  urbanizationRate: number;
  /** 人均GDP（万元） */
  perCapita: number;
}

export interface ProvinceTimeSeries {
  code: string;
  name: string;
  series: YearData[];
}

export const YEARS = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

/**
 * 基于基准年（2023）数据反推/正向生成时间序列
 * 使用复合增长率模型：GDP年增5-12%、人口缓慢变化、城镇化率年增0.5-1.5pct
 */
function genSeries(
  baseGdp: number,
  basePop: number,
  baseUrban: number,
  gdpGrowthRate: number = 0.07,
  popGrowthRate: number = 0.002
): YearData[] {
  // 2023 -> 2024 假设 5% 增长
  // 反向推算 2010-2022
  const series: YearData[] = [];
  for (let i = 0; i < YEARS.length; i++) {
    const year = YEARS[i];
    const yearsFromBase = year - 2023;
    let gdp: number, pop: number, urban: number;
    if (yearsFromBase >= 0) {
      // 2023-2024：5% 增长
      gdp = baseGdp * Math.pow(1.05, yearsFromBase);
      pop = basePop * Math.pow(1 + popGrowthRate, yearsFromBase);
      urban = Math.min(95, baseUrban + yearsFromBase * 0.5);
    } else {
      // 2010-2022：复合增长率
      const yrs = -yearsFromBase;
      gdp = baseGdp / Math.pow(1 + gdpGrowthRate, yrs);
      pop = basePop / Math.pow(1 + popGrowthRate, yrs);
      urban = Math.max(20, baseUrban - yrs * 1.0);
    }
    series.push({
      year,
      gdp: Math.round(gdp),
      population: Math.round(pop),
      urbanizationRate: +urban.toFixed(1),
      perCapita: pop > 0 ? +(gdp / pop * 10).toFixed(2) : 0,
    });
  }
  return series;
}

// 34省级行政区时间序列数据
export const PROVINCE_TIMESERIES: ProvinceTimeSeries[] = [
  { code: "11", name: "北京市", series: genSeries(43761, 2186, 87.8, 0.08, 0.005) },
  { code: "12", name: "天津市", series: genSeries(16737, 1364, 85.1, 0.06, 0.003) },
  { code: "13", name: "河北省", series: genSeries(43944, 7393, 62.0, 0.07, 0.001) },
  { code: "14", name: "山西省", series: genSeries(25698, 3466, 63.0, 0.07, 0.002) },
  { code: "15", name: "内蒙古", series: genSeries(24627, 2396, 68.6, 0.07, 0.001) },
  { code: "21", name: "辽宁省", series: genSeries(33047, 4197, 73.0, 0.05, 0.001) },
  { code: "22", name: "吉林省", series: genSeries(13531, 2339, 64.0, 0.05, 0.0) },
  { code: "23", name: "黑龙江省", series: genSeries(15884, 3062, 66.2, 0.05, -0.002) },
  { code: "31", name: "上海市", series: genSeries(47218, 2487, 89.5, 0.08, 0.005) },
  { code: "32", name: "江苏省", series: genSeries(128222, 8526, 75.0, 0.09, 0.003) },
  { code: "33", name: "浙江省", series: genSeries(82553, 6627, 74.2, 0.09, 0.005) },
  { code: "34", name: "安徽省", series: genSeries(47050, 6121, 61.5, 0.09, 0.002) },
  { code: "35", name: "福建省", series: genSeries(53110, 4188, 70.1, 0.09, 0.003) },
  { code: "36", name: "江西省", series: genSeries(32200, 4515, 62.0, 0.08, 0.002) },
  { code: "37", name: "山东省", series: genSeries(92069, 10163, 64.5, 0.08, 0.001) },
  { code: "41", name: "河南省", series: genSeries(59132, 9872, 57.1, 0.07, 0.001) },
  { code: "42", name: "湖北省", series: genSeries(55803, 5844, 65.5, 0.08, 0.002) },
  { code: "43", name: "湖南省", series: genSeries(48670, 6604, 60.9, 0.08, 0.001) },
  { code: "44", name: "广东省", series: genSeries(135673, 12706, 75.4, 0.09, 0.005) },
  { code: "45", name: "广西", series: genSeries(27202, 5037, 56.1, 0.07, 0.002) },
  { code: "46", name: "海南省", series: genSeries(7105, 1043, 61.0, 0.08, 0.005) },
  { code: "50", name: "重庆市", series: genSeries(30146, 3213, 71.7, 0.09, 0.002) },
  { code: "51", name: "四川省", series: genSeries(60133, 8368, 58.4, 0.08, 0.001) },
  { code: "52", name: "贵州省", series: genSeries(22667, 3865, 54.3, 0.10, 0.002) },
  { code: "53", name: "云南省", series: genSeries(30021, 4693, 51.1, 0.08, 0.001) },
  { code: "54", name: "西藏", series: genSeries(2392, 365, 37.0, 0.10, 0.005) },
  { code: "61", name: "陕西省", series: genSeries(33796, 3956, 64.3, 0.08, 0.002) },
  { code: "62", name: "甘肃省", series: genSeries(11864, 2465, 55.5, 0.07, 0.001) },
  { code: "63", name: "青海省", series: genSeries(3799, 595, 61.0, 0.07, 0.002) },
  { code: "64", name: "宁夏", series: genSeries(5315, 728, 65.0, 0.08, 0.003) },
  { code: "65", name: "新疆", series: genSeries(19126, 2598, 57.0, 0.08, 0.003) },
  { code: "71", name: "台湾省", series: genSeries(45000, 2356, 78.0, 0.04, 0.0) },
  { code: "81", name: "香港", series: genSeries(28700, 750, 100, 0.04, 0.001) },
  { code: "82", name: "澳门", series: genSeries(1945, 68, 100, 0.06, 0.005) },
];

/** 获取某年某省数据 */
export function getYearData(provinceCode: string, year: number): YearData | null {
  const p = PROVINCE_TIMESERIES.find((x) => x.code === provinceCode);
  if (!p) return null;
  return p.series.find((s) => s.year === year) || null;
}

/** 计算复合增长率 */
export function compoundGrowthRate(start: number, end: number, years: number): number {
  if (start <= 0 || years <= 0) return 0;
  return +(((Math.pow(end / start, 1 / years) - 1) * 100).toFixed(2));
}

/** 获取某年按指标排名 */
export function getRankingByYear(year: number, metric: keyof YearData): Array<{ code: string; name: string; value: number; rank: number }> {
  const list = PROVINCE_TIMESERIES.map((p) => {
    const y = p.series.find((s) => s.year === year);
    return { code: p.code, name: p.name, value: y ? (y[metric] as number) : 0 };
  });
  list.sort((a, b) => b.value - a.value);
  return list.map((l, i) => ({ ...l, rank: i + 1 }));
}

/** 获取全国某年汇总 */
export function getNationalTotalByYear(year: number, metric: keyof YearData): number {
  return PROVINCE_TIMESERIES.reduce((sum, p) => {
    const y = p.series.find((s) => s.year === year);
    return sum + (y ? (y[metric] as number) : 0);
  }, 0);
}

export type TimeseriesMetric = "gdp" | "population" | "urbanizationRate" | "perCapita";

export const TIMESERIES_METRICS: Array<{ key: TimeseriesMetric; label: string; unit: string; format: (v: number) => string }> = [
  { key: "gdp", label: "GDP总量", unit: "亿元", format: (v) => v >= 10000 ? (v / 10000).toFixed(1) + "万亿" : v.toFixed(0) + "亿" },
  { key: "population", label: "常住人口", unit: "万人", format: (v) => v >= 10000 ? (v / 10000).toFixed(1) + "千万" : v.toFixed(0) + "万" },
  { key: "urbanizationRate", label: "城镇化率", unit: "%", format: (v) => v.toFixed(1) + "%" },
  { key: "perCapita", label: "人均GDP", unit: "万元", format: (v) => v.toFixed(2) + "万元" },
];
