export type LocationType = "commercial" | "transit" | "scenic" | "residential" | "office";
export type TimeSlot = "morning" | "noon" | "afternoon" | "evening" | "night";
export type SeasonFactor = "spring" | "summer" | "autumn" | "winter";

export interface HourlyFlow {
  hour: number;
  flow: number;
  weekday: number;
  weekend: number;
}

export interface FlowFactor {
  name: string;
  impact: number;
  category: string;
}

export interface FlowPrediction {
  id: string;
  name: string;
  locationType: LocationType;
  city: string;
  lng: number;
  lat: number;
  dailyFlow: number;
  peakHour: number;
  peakFlow: number;
  hourlyFlow: HourlyFlow[];
  factors: FlowFactor[];
  weekdayAvg: number;
  weekendAvg: number;
  confidence: number;
}

export const LOCATION_TYPE_LABELS: Record<LocationType, string> = {
  commercial: "商业区",
  transit: "交通枢纽",
  scenic: "景区景点",
  residential: "居住区",
  office: "办公区",
};

export const LOCATION_TYPE_ICONS: Record<LocationType, string> = {
  commercial: "🏬",
  transit: "🚇",
  scenic: "🏞️",
  residential: "🏠",
  office: "🏢",
};

export const TIME_SLOT_LABELS: Record<TimeSlot, string> = {
  morning: "早高峰 7-9点",
  noon: "午间 11-13点",
  afternoon: "下午 14-17点",
  evening: "晚高峰 17-19点",
  night: "夜间 20-22点",
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateHourlyFlow(idx: number): HourlyFlow[] {
  const flows: HourlyFlow[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const baseFlow = 100 + seededRandom(idx * 17 + hour * 3) * 200;

    let multiplier = 0.3;
    if (hour >= 7 && hour <= 9) multiplier = 1.2;
    else if (hour >= 11 && hour <= 13) multiplier = 1.0;
    else if (hour >= 17 && hour <= 19) multiplier = 1.5;
    else if (hour >= 14 && hour <= 16) multiplier = 0.8;
    else if (hour >= 20 && hour <= 22) multiplier = 0.7;

    const weekday = Math.round(baseFlow * multiplier);
    const weekend = Math.round(baseFlow * multiplier * 0.7);

    flows.push({
      hour,
      flow: Math.round((weekday + weekend) / 2),
      weekday,
      weekend,
    });
  }
  return flows;
}

function generateFactors(idx: number): FlowFactor[] {
  const allFactors = [
    { name: "地铁站距离", impact: Math.round(30 + seededRandom(idx * 23 + 1) * 50), category: "交通" },
    { name: "公交线路", impact: Math.round(20 + seededRandom(idx * 29 + 2) * 40), category: "交通" },
    { name: "周边人口", impact: Math.round(40 + seededRandom(idx * 31 + 3) * 60), category: "人口" },
    { name: "商业配套", impact: Math.round(25 + seededRandom(idx * 37 + 4) * 45), category: "商业" },
    { name: "办公密度", impact: Math.round(30 + seededRandom(idx * 41 + 5) * 50), category: "办公" },
    { name: "天气因素", impact: Math.round(15 + seededRandom(idx * 43 + 6) * 25), category: "环境" },
    { name: "节假日效应", impact: Math.round(20 + seededRandom(idx * 47 + 7) * 35), category: "周期" },
    { name: "活动促销", impact: Math.round(10 + seededRandom(idx * 53 + 8) * 30), category: "营销" },
  ];

  return allFactors.slice(0, 5 + Math.floor(seededRandom(idx * 59 + 9) * 3));
}

function generatePrediction(
  id: string,
  name: string,
  locationType: LocationType,
  city: string,
  centerLng: number,
  centerLat: number,
  idx: number
): FlowPrediction {
  const offsetLng = (seededRandom(idx * 7 + 1) - 0.5) * 0.05;
  const offsetLat = (seededRandom(idx * 11 + 3) - 0.5) * 0.04;

  const hourlyFlow = generateHourlyFlow(idx);
  const factors = generateFactors(idx);

  const baseDaily = 5000 + seededRandom(idx * 13 + 5) * 15000;
  const typeMultiplier = locationType === "transit" ? 1.5 : locationType === "commercial" ? 1.3 : 1.0;
  const dailyFlow = Math.round(baseDaily * typeMultiplier);

  const peakHour = hourlyFlow.reduce((max, h) => (h.flow > max.flow ? h : max), hourlyFlow[0]).hour;
  const peakFlow = hourlyFlow[peakHour]?.flow || 0;

  const weekdayAvg = Math.round(hourlyFlow.reduce((s, h) => s + h.weekday, 0) / 24);
  const weekendAvg = Math.round(hourlyFlow.reduce((s, h) => s + h.weekend, 0) / 24);

  return {
    id,
    name,
    locationType,
    city,
    lng: centerLng + offsetLng,
    lat: centerLat + offsetLat,
    dailyFlow,
    peakHour,
    peakFlow,
    hourlyFlow,
    factors,
    weekdayAvg,
    weekendAvg,
    confidence: Math.round(70 + seededRandom(idx * 61 + 11) * 25),
  };
}

const PREDICTIONS: FlowPrediction[] = [
  generatePrediction("bj-guomao", "国贸地铁站", "transit", "北京", 116.46, 39.915, 1),
  generatePrediction("bj-sanlitun", "三里屯商圈", "commercial", "北京", 116.455, 39.933, 2),
  generatePrediction("bj-wangfujing", "王府井大街", "commercial", "北京", 116.41, 39.915, 3),
  generatePrediction("bj-zhongguancun", "中关村软件园", "office", "北京", 116.32, 39.98, 4),
  generatePrediction("bj-tiantan", "天坛公园", "scenic", "北京", 116.41, 39.88, 5),
  generatePrediction("bj-wangjing", "望京居住区", "residential", "北京", 116.47, 39.99, 6),
  generatePrediction("sh-lujiazui", "陆家嘴金融城", "office", "上海", 121.5, 31.235, 7),
  generatePrediction("sh-nanjinglu", "南京路步行街", "commercial", "上海", 121.48, 31.238, 8),
  generatePrediction("sh-xujiahui", "徐家汇商圈", "commercial", "上海", 121.44, 31.195, 9),
  generatePrediction("sh-people", "人民广场站", "transit", "上海", 121.475, 31.23, 10),
  generatePrediction("sh-yuyuan", "豫园景区", "scenic", "上海", 121.49, 31.225, 11),
  generatePrediction("gz-tianhe", "天河体育中心", "commercial", "广州", 113.33, 23.13, 12),
  generatePrediction("gz-zhujiang", "珠江新城站", "transit", "广州", 113.32, 23.12, 13),
  generatePrediction("gz-shamian", "沙面岛景区", "scenic", "广州", 113.24, 23.115, 14),
];

export function getPredictions(): FlowPrediction[] {
  return PREDICTIONS;
}

export function getPredictionById(id: string): FlowPrediction | undefined {
  return PREDICTIONS.find((p) => p.id === id);
}

export function getPredictionsByCity(city: string): FlowPrediction[] {
  return PREDICTIONS.filter((p) => p.city === city);
}

export function getPredictionsByType(type: LocationType): FlowPrediction[] {
  return PREDICTIONS.filter((p) => p.locationType === type);
}

export function getCities(): string[] {
  return [...new Set(PREDICTIONS.map((p) => p.city))];
}