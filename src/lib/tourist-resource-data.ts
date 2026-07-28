export type TouristType = "scenic" | "historical" | "cultural" | "nature" | "food" | "entertainment";
export type TouristLevel = "5A" | "4A" | "3A" | "none";

export interface TouristResource {
  id: string;
  name: string;
  type: TouristType;
  level: TouristLevel;
  lng: number;
  lat: number;
  rating: number;
  reviewCount: number;
  ticketPrice: number;
  openTime: string;
  duration: string;
  description: string;
  tags: string[];
  crowdLevel: "low" | "medium" | "high";
  popularity: number;
  imagePlaceholder: string;
}

export interface TouristCity {
  id: string;
  name: string;
  center: [number, number];
  totalResources: number;
  avgRating: number;
  resources: TouristResource[];
}

export const TOURIST_TYPE_LABELS: Record<TouristType, string> = {
  scenic: "自然风光",
  historical: "历史古迹",
  cultural: "文化艺术",
  nature: "自然生态",
  food: "美食街区",
  entertainment: "娱乐休闲",
};

export const TOURIST_TYPE_ICONS: Record<TouristType, string> = {
  scenic: "🏔️",
  historical: "🏛️",
  cultural: "🎭",
  nature: "🌿",
  food: "🍜",
  entertainment: "🎡",
};

export const TOURIST_TYPE_COLORS: Record<TouristType, string> = {
  scenic: "#10b981",
  historical: "#8b5cf6",
  cultural: "#f59e0b",
  nature: "#22c55e",
  food: "#ef4444",
  entertainment: "#3b82f6",
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const BEIJING_RESOURCES: Omit<TouristResource, "id" | "lng" | "lat" | "crowdLevel" | "popularity" | "imagePlaceholder">[] = [
  { name: "故宫博物院", type: "historical", level: "5A", rating: 4.9, reviewCount: 128000, ticketPrice: 60, openTime: "08:30-17:00", duration: "3-4小时", description: "世界上现存规模最大、保存最为完整的木质结构古建筑群", tags: ["世界遗产", "必去", "历史", "文化"] },
  { name: "长城·八达岭", type: "historical", level: "5A", rating: 4.8, reviewCount: 95000, ticketPrice: 40, openTime: "07:30-17:30", duration: "3-4小时", description: "不到长城非好汉，明长城中保存最完好的一段", tags: ["世界遗产", "必去", "徒步", "历史"] },
  { name: "颐和园", type: "scenic", level: "5A", rating: 4.7, reviewCount: 72000, ticketPrice: 30, openTime: "06:30-18:00", duration: "2-3小时", description: "中国现存最大的皇家园林，昆明湖与万寿山交相辉映", tags: ["世界遗产", "园林", "皇家", "休闲"] },
  { name: "天坛公园", type: "historical", level: "5A", rating: 4.7, reviewCount: 58000, ticketPrice: 15, openTime: "06:00-22:00", duration: "2小时", description: "明清两代皇帝祭天、祈谷的场所，建筑杰作", tags: ["世界遗产", "文化", "建筑", "散步"] },
  { name: "南锣鼓巷", type: "cultural", level: "none", rating: 4.4, reviewCount: 65000, ticketPrice: 0, openTime: "全天", duration: "1-2小时", description: "北京最古老的街区之一，胡同文化的代表", tags: ["胡同", "小吃", "文艺", "免费"] },
  { name: "798艺术区", type: "cultural", level: "none", rating: 4.5, reviewCount: 42000, ticketPrice: 0, openTime: "10:00-18:00", duration: "2-3小时", description: "当代艺术聚集地，工业风与艺术的碰撞", tags: ["艺术", "文艺", "拍照", "免费"] },
  { name: "王府井大街", type: "food", level: "none", rating: 4.2, reviewCount: 38000, ticketPrice: 0, openTime: "全天", duration: "1-2小时", description: "北京最著名的商业街，美食购物一站式", tags: ["购物", "美食", "商圈", "免费"] },
  { name: "北海公园", type: "nature", level: "4A", rating: 4.6, reviewCount: 32000, ticketPrice: 10, openTime: "06:30-21:00", duration: "2小时", description: "中国现存最古老的皇家园林之一，白塔倒影", tags: ["园林", "皇家", "划船", "休闲"] },
  { name: "北京欢乐谷", type: "entertainment", level: "4A", rating: 4.5, reviewCount: 45000, ticketPrice: 299, openTime: "09:30-22:00", duration: "全天", description: "大型主题乐园，刺激游乐项目云集", tags: ["主题乐园", "刺激", "亲子", "夜场"] },
  { name: "恭王府", type: "historical", level: "5A", rating: 4.6, reviewCount: 28000, ticketPrice: 40, openTime: "08:30-17:00", duration: "2小时", description: "一座恭王府，半部清朝史", tags: ["历史", "王府", "文化", "建筑"] },
  { name: "什刹海", type: "scenic", level: "none", rating: 4.5, reviewCount: 55000, ticketPrice: 0, openTime: "全天", duration: "2-3小时", description: "老北京风貌保存最完好的地方，酒吧街", tags: ["胡同", "酒吧", "夜景", "免费"] },
  { name: "鸟巢·水立方", type: "entertainment", level: "4A", rating: 4.4, reviewCount: 40000, ticketPrice: 50, openTime: "09:00-21:00", duration: "2小时", description: "2008奥运标志性建筑，现代建筑奇迹", tags: ["奥运", "建筑", "拍照", "夜景"] },
];

function generateResources(
  cityId: string,
  baseResources: typeof BEIJING_RESOURCES,
  center: [number, number]
): TouristResource[] {
  return baseResources.map((r, i) => {
    const offsetLng = (seededRandom(i * 7 + 1) - 0.5) * 0.15;
    const offsetLat = (seededRandom(i * 11 + 3) - 0.5) * 0.12;
    const crowdSeed = seededRandom(i * 13 + 5);
    const crowd = crowdSeed < 0.3 ? "low" : crowdSeed < 0.7 ? "medium" : "high";
    return {
      ...r,
      id: `${cityId}-res-${i}`,
      lng: center[0] + offsetLng,
      lat: center[1] + offsetLat,
      crowdLevel: crowd,
      popularity: Math.round(r.rating * 20 + r.reviewCount / 1000),
      imagePlaceholder: `tourist-${i}`,
    };
  });
}

function generateCity(
  id: string,
  name: string,
  center: [number, number],
  resources: typeof BEIJING_RESOURCES
): TouristCity {
  const res = generateResources(id, resources, center);
  return {
    id,
    name,
    center,
    totalResources: res.length,
    avgRating: +(res.reduce((s, r) => s + r.rating, 0) / res.length).toFixed(1),
    resources: res,
  };
}

const HANGZHOU_RESOURCES: typeof BEIJING_RESOURCES = [
  { name: "西湖", type: "scenic", level: "5A", rating: 4.9, reviewCount: 158000, ticketPrice: 0, openTime: "全天", duration: "4-6小时", description: "上有天堂下有苏杭，西湖十景美不胜收", tags: ["世界遗产", "必去", "免费", "山水"] },
  { name: "灵隐寺", type: "historical", level: "4A", rating: 4.6, reviewCount: 62000, ticketPrice: 30, openTime: "07:00-18:00", duration: "2-3小时", description: "江南著名古刹，飞来峰造像精美绝伦", tags: ["佛教", "历史", "祈福", "山水"] },
  { name: "千岛湖", type: "nature", level: "5A", rating: 4.7, reviewCount: 88000, ticketPrice: 150, openTime: "08:00-17:00", duration: "全天", description: "天下第一秀水，1078个岛屿星罗棋布", tags: ["山水", "度假", "游船", "亲子"] },
  { name: "宋城", type: "entertainment", level: "4A", rating: 4.5, reviewCount: 52000, ticketPrice: 320, openTime: "10:00-21:00", duration: "半天", description: "给我一天，还你千年，宋城千古情", tags: ["主题乐园", "演出", "穿越", "夜场"] },
  { name: "河坊街", type: "food", level: "none", rating: 4.3, reviewCount: 45000, ticketPrice: 0, openTime: "全天", duration: "1-2小时", description: "杭州历史文化街区，特色小吃聚集地", tags: ["美食", "购物", "老街", "免费"] },
  { name: "西溪湿地", type: "nature", level: "5A", rating: 4.5, reviewCount: 38000, ticketPrice: 80, openTime: "07:30-18:30", duration: "3-4小时", description: "中国首个国家湿地公园，生态天堂", tags: ["湿地", "生态", "划船", "休闲"] },
  { name: "雷峰塔", type: "historical", level: "4A", rating: 4.4, reviewCount: 35000, ticketPrice: 40, openTime: "08:00-20:00", duration: "1-2小时", description: "白娘子传说地，登塔俯瞰西湖全景", tags: ["传说", "古迹", "夜景", "登高"] },
  { name: "龙井村", type: "cultural", level: "none", rating: 4.5, reviewCount: 18000, ticketPrice: 0, openTime: "全天", duration: "2-3小时", description: "中国名茶之乡，体验采茶品茶", tags: ["茶文化", "乡村", "体验", "免费"] },
  { name: "乌镇", type: "historical", level: "5A", rating: 4.7, reviewCount: 92000, ticketPrice: 150, openTime: "08:00-22:00", duration: "1-2天", description: "江南六大古镇之首，枕水人家", tags: ["古镇", "水乡", "夜景", "度假"] },
  { name: "杭州乐园", type: "entertainment", level: "4A", rating: 4.3, reviewCount: 28000, ticketPrice: 190, openTime: "10:00-17:00", duration: "全天", description: "大型综合主题乐园，老少皆宜", tags: ["主题乐园", "刺激", "亲子", "水上"] },
  { name: "南宋御街", type: "cultural", level: "none", rating: 4.4, reviewCount: 25000, ticketPrice: 0, openTime: "全天", duration: "1-2小时", description: "南宋都城临安的御街，历史与现代交融", tags: ["历史", "购物", "文艺", "免费"] },
  { name: "京杭大运河", type: "historical", level: "none", rating: 4.5, reviewCount: 32000, ticketPrice: 0, openTime: "全天", duration: "2小时", description: "世界上最长的人工运河，世界文化遗产", tags: ["世界遗产", "历史", "游船", "免费"] },
];

const TOURIST_CITIES: TouristCity[] = [
  generateCity("beijing", "北京", [116.4, 39.9], BEIJING_RESOURCES),
  generateCity("hangzhou", "杭州", [120.15, 30.28], HANGZHOU_RESOURCES),
];

export function getTouristCities(): TouristCity[] {
  return TOURIST_CITIES;
}

export function getTouristCityById(id: string): TouristCity | undefined {
  return TOURIST_CITIES.find((c) => c.id === id);
}

export const CROWD_LABELS = {
  low: { label: "人少", color: "#10b981" },
  medium: { label: "适中", color: "#eab308" },
  high: { label: "人多", color: "#ef4444" },
};
