export type TransportMode = "walk" | "bus" | "metro" | "bike" | "car";

export interface RouteStop {
  name: string;
  lng: number;
  lat: number;
  duration: number;
  description: string;
}

export interface TourismRoute {
  id: string;
  name: string;
  city: string;
  transport: TransportMode;
  stops: RouteStop[];
  totalDuration: number;
  totalDistance: number;
  difficulty: "easy" | "moderate" | "hard";
  cost: number;
  bestTime: string;
  tips: string[];
  rating: number;
}

export const TRANSPORT_MODE_LABELS: Record<TransportMode, string> = {
  walk: "步行",
  bus: "公交",
  metro: "地铁",
  bike: "骑行",
  car: "自驾",
};

export const TRANSPORT_MODE_ICONS: Record<TransportMode, string> = {
  walk: "🚶",
  bus: "🚌",
  metro: "🚇",
  bike: "🚴",
  car: "🚗",
};

export const DIFFICULTY_LABELS = {
  easy: { label: "轻松", color: "#10b981" },
  moderate: { label: "适中", color: "#f59e0b" },
  hard: { label: "挑战", color: "#ef4444" },
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const BEIJING_ROUTES: TourismRoute[] = [
  {
    id: "bj-route-1",
    name: "故宫-天安门经典游",
    city: "北京",
    transport: "walk",
    stops: [
      { name: "天安门广场", lng: 116.397, lat: 39.903, duration: 30, description: "观看升旗仪式，拍照留念" },
      { name: "天安门城楼", lng: 116.39, lat: 39.9, duration: 20, description: "登楼俯瞰广场全景" },
      { name: "故宫博物院", lng: 116.397, lat: 39.916, duration: 180, description: "参观紫禁城，感受皇家气派" },
      { name: "景山公园", lng: 116.396, lat: 39.926, duration: 40, description: "登顶俯瞰故宫全景" },
    ],
    totalDuration: 270,
    totalDistance: 3.2,
    difficulty: "easy",
    cost: 60,
    bestTime: "8:00-11:00",
    tips: ["提前网上预约故宫门票", "穿舒适的鞋子", "带足饮用水"],
    rating: 4.8,
  },
  {
    id: "bj-route-2",
    name: "胡同深度文化游",
    city: "北京",
    transport: "walk",
    stops: [
      { name: "南锣鼓巷", lng: 116.403, lat: 39.936, duration: 60, description: "逛文艺小店，品尝小吃" },
      { name: "烟袋斜街", lng: 116.395, lat: 39.942, duration: 30, description: "老北京风情街" },
      { name: "什刹海", lng: 116.379, lat: 39.94, duration: 60, description: "湖边散步，酒吧小憩" },
      { name: "恭王府", lng: 116.387, lat: 39.936, duration: 90, description: "清代王府建筑典范" },
    ],
    totalDuration: 240,
    totalDistance: 2.5,
    difficulty: "easy",
    cost: 40,
    bestTime: "14:00-18:00",
    tips: ["避开周末高峰", "体验胡同三轮车", "品尝炸酱面"],
    rating: 4.6,
  },
];

const SHANGHAI_ROUTES: TourismRoute[] = [
  {
    id: "sh-route-1",
    name: "外滩-南京路购物游",
    city: "上海",
    transport: "walk",
    stops: [
      { name: "外滩观景平台", lng: 121.49, lat: 31.24, duration: 45, description: "观赏浦江两岸风光" },
      { name: "南京路步行街", lng: 121.475, lat: 31.237, duration: 90, description: "购物逛街，品尝美食" },
      { name: "人民广场", lng: 121.475, lat: 31.23, duration: 30, description: "城市中心广场" },
      { name: "新天地", lng: 121.48, lat: 31.22, duration: 60, description: "石库门风情，酒吧街区" },
    ],
    totalDuration: 225,
    totalDistance: 2.8,
    difficulty: "easy",
    cost: 0,
    bestTime: "16:00-20:00",
    tips: ["傍晚欣赏外滩夜景", "带好购物袋", "避开节假日"],
    rating: 4.7,
  },
];

const ALL_ROUTES = [...BEIJING_ROUTES, ...SHANGHAI_ROUTES];

export function getRoutes(): TourismRoute[] {
  return ALL_ROUTES;
}

export function getRoutesByCity(city: string): TourismRoute[] {
  return ALL_ROUTES.filter((r) => r.city === city);
}

export function getCities(): string[] {
  return [...new Set(ALL_ROUTES.map((r) => r.city))];
}