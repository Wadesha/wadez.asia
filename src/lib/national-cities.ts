/**
 * 全国主要城市公交数据配置
 * 真实数据来源：city-vein(15城) + 北京市交通委员会(1城)
 * 模拟数据：标注为simulated，后续真实数据获取后更新
 */

export interface CityConfig {
  name: string;
  pinyin: string;
  province: string;
  region: "华北" | "华东" | "华南" | "华中" | "西南" | "西北" | "东北";
  governmentStation: string; // 市政府附近站点
  dataSource: "official" | "cityvein" | "simulated";
  lineCount: number;
  adjacentCities: string[]; // 地理相邻城市
  realDataAvailable: boolean;
}

export const NATIONAL_CITIES: CityConfig[] = [
  // 华北
  { name: "北京", pinyin: "beijing", province: "北京市", region: "华北", governmentStation: "东直门枢纽站", dataSource: "official", lineCount: 1150, adjacentCities: ["天津", "廊坊", "保定"], realDataAvailable: true },
  { name: "天津", pinyin: "tianjin", province: "天津市", region: "华北", governmentStation: "天津市政府", dataSource: "cityvein", lineCount: 818, adjacentCities: ["北京", "廊坊", "唐山"], realDataAvailable: true },
  { name: "廊坊", pinyin: "langfang", province: "河北省", region: "华北", governmentStation: "廊坊市政府", dataSource: "simulated", lineCount: 45, adjacentCities: ["北京", "天津", "保定"], realDataAvailable: false },
  { name: "保定", pinyin: "baoding", province: "河北省", region: "华北", governmentStation: "保定市政府", dataSource: "simulated", lineCount: 62, adjacentCities: ["北京", "廊坊", "石家庄"], realDataAvailable: false },
  { name: "石家庄", pinyin: "shijiazhuang", province: "河北省", region: "华北", governmentStation: "石家庄市政府", dataSource: "simulated", lineCount: 88, adjacentCities: ["保定", "太原", "济南"], realDataAvailable: false },
  { name: "太原", pinyin: "taiyuan", province: "山西省", region: "华北", governmentStation: "太原市政府", dataSource: "simulated", lineCount: 75, adjacentCities: ["石家庄", "晋中"], realDataAvailable: false },

  // 华东
  { name: "上海", pinyin: "shanghai", province: "上海市", region: "华东", governmentStation: "人民广场", dataSource: "cityvein", lineCount: 1407, adjacentCities: ["苏州", "杭州", "南通"], realDataAvailable: true },
  { name: "南京", pinyin: "nanjing", province: "江苏省", region: "华东", governmentStation: "新街口", dataSource: "cityvein", lineCount: 748, adjacentCities: ["苏州", "合肥", "扬州"], realDataAvailable: true },
  { name: "苏州", pinyin: "suzhou", province: "江苏省", region: "华东", governmentStation: "苏州火车站", dataSource: "cityvein", lineCount: 684, adjacentCities: ["上海", "南京", "无锡"], realDataAvailable: true },
  { name: "杭州", pinyin: "hangzhou", province: "浙江省", region: "华东", governmentStation: "武林广场", dataSource: "cityvein", lineCount: 906, adjacentCities: ["上海", "宁波", "绍兴"], realDataAvailable: true },
  { name: "济南", pinyin: "jinan", province: "山东省", region: "华东", governmentStation: "济南火车站", dataSource: "cityvein", lineCount: 391, adjacentCities: ["青岛", "泰安", "德州"], realDataAvailable: true },
  { name: "青岛", pinyin: "qingdao", province: "山东省", region: "华东", governmentStation: "青岛火车站", dataSource: "cityvein", lineCount: 538, adjacentCities: ["济南", "烟台", "潍坊"], realDataAvailable: true },
  { name: "合肥", pinyin: "hefei", province: "安徽省", region: "华东", governmentStation: "合肥市政府", dataSource: "simulated", lineCount: 156, adjacentCities: ["南京", "武汉"], realDataAvailable: false },
  { name: "南昌", pinyin: "nanchang", province: "江西省", region: "华东", governmentStation: "南昌市政府", dataSource: "simulated", lineCount: 98, adjacentCities: ["武汉", "长沙", "杭州"], realDataAvailable: false },

  // 华南
  { name: "广州", pinyin: "guangzhou", province: "广东省", region: "华南", governmentStation: "广州火车站", dataSource: "cityvein", lineCount: 1459, adjacentCities: ["深圳", "佛山", "东莞"], realDataAvailable: true },
  { name: "深圳", pinyin: "shenzhen", province: "广东省", region: "华南", governmentStation: "深圳火车站", dataSource: "cityvein", lineCount: 965, adjacentCities: ["广州", "东莞", "惠州"], realDataAvailable: true },
  { name: "厦门", pinyin: "xiamen", province: "福建省", region: "华南", governmentStation: "厦门市政府", dataSource: "simulated", lineCount: 112, adjacentCities: ["泉州", "福州"], realDataAvailable: false },
  { name: "南宁", pinyin: "nanning", province: "广西壮族自治区", region: "华南", governmentStation: "南宁市政府", dataSource: "simulated", lineCount: 67, adjacentCities: ["柳州"], realDataAvailable: false },

  // 华中
  { name: "武汉", pinyin: "wuhan", province: "湖北省", region: "华中", governmentStation: "武昌火车站", dataSource: "cityvein", lineCount: 686, adjacentCities: ["长沙", "郑州", "合肥"], realDataAvailable: true },
  { name: "长沙", pinyin: "changsha", province: "湖南省", region: "华中", governmentStation: "长沙火车站", dataSource: "cityvein", lineCount: 417, adjacentCities: ["武汉", "南昌", "广州"], realDataAvailable: true },
  { name: "郑州", pinyin: "zhengzhou", province: "河南省", region: "华中", governmentStation: "郑州火车站", dataSource: "cityvein", lineCount: 401, adjacentCities: ["武汉", "济南", "石家庄"], realDataAvailable: true },

  // 西南
  { name: "成都", pinyin: "chengdu", province: "四川省", region: "西南", governmentStation: "成都火车站", dataSource: "cityvein", lineCount: 1182, adjacentCities: ["重庆", "德阳"], realDataAvailable: true },
  { name: "重庆", pinyin: "chongqing", province: "重庆市", region: "西南", governmentStation: "重庆火车站", dataSource: "cityvein", lineCount: 791, adjacentCities: ["成都", "贵阳"], realDataAvailable: true },
  { name: "昆明", pinyin: "kunming", province: "云南省", region: "西南", governmentStation: "昆明市政府", dataSource: "simulated", lineCount: 89, adjacentCities: ["贵阳"], realDataAvailable: false },
  { name: "贵阳", pinyin: "guiyang", province: "贵州省", region: "西南", governmentStation: "贵阳市政府", dataSource: "simulated", lineCount: 72, adjacentCities: ["重庆", "昆明", "长沙"], realDataAvailable: false },

  // 西北
  { name: "西安", pinyin: "xian", province: "陕西省", region: "西北", governmentStation: "西安火车站", dataSource: "cityvein", lineCount: 529, adjacentCities: ["郑州", "太原", "成都"], realDataAvailable: true },
  { name: "兰州", pinyin: "lanzhou", province: "甘肃省", region: "西北", governmentStation: "兰州市政府", dataSource: "simulated", lineCount: 58, adjacentCities: ["西安", "西宁"], realDataAvailable: false },
  { name: "乌鲁木齐", pinyin: "wulumuqi", province: "新疆维吾尔自治区", region: "西北", governmentStation: "乌鲁木齐市政府", dataSource: "simulated", lineCount: 43, adjacentCities: [], realDataAvailable: false },

  // 东北
  { name: "沈阳", pinyin: "shenyang", province: "辽宁省", region: "东北", governmentStation: "沈阳火车站", dataSource: "simulated", lineCount: 134, adjacentCities: ["长春", "大连", "北京"], realDataAvailable: false },
  { name: "长春", pinyin: "changchun", province: "吉林省", region: "东北", governmentStation: "长春火车站", dataSource: "simulated", lineCount: 87, adjacentCities: ["沈阳", "哈尔滨"], realDataAvailable: false },
  { name: "哈尔滨", pinyin: "haerbin", province: "黑龙江省", region: "东北", governmentStation: "哈尔滨火车站", dataSource: "simulated", lineCount: 95, adjacentCities: ["长春"], realDataAvailable: false },
  { name: "大连", pinyin: "dalian", province: "辽宁省", region: "东北", governmentStation: "大连火车站", dataSource: "simulated", lineCount: 78, adjacentCities: ["沈阳"], realDataAvailable: false },
];

// 城市间步行接驳点（模拟，标注后续更新）
export interface CityConnection {
  fromCity: string;
  fromStation: string;
  toCity: string;
  toStation: string;
  distanceMeters: number;
  estimatedMinutes: number;
  isSimulated: boolean;
}

export const CITY_CONNECTIONS: CityConnection[] = [
  // === 华北 ===
  { fromCity: "北京", fromStation: "万庄", toCity: "廊坊", toStation: "万庄", distanceMeters: 500, estimatedMinutes: 7, isSimulated: true },
  { fromCity: "北京", fromStation: "杨村", toCity: "天津", toStation: "武清客运站", distanceMeters: 300, estimatedMinutes: 5, isSimulated: true },
  { fromCity: "廊坊", fromStation: "廊坊站", toCity: "天津", toStation: "武清", distanceMeters: 800, estimatedMinutes: 10, isSimulated: true },
  { fromCity: "北京", fromStation: "涿州", toCity: "保定", toStation: "涿州", distanceMeters: 400, estimatedMinutes: 6, isSimulated: true },
  { fromCity: "保定", fromStation: "定州", toCity: "石家庄", toStation: "定州", distanceMeters: 500, estimatedMinutes: 7, isSimulated: true },
  { fromCity: "石家庄", fromStation: "邢台", toCity: "郑州", toStation: "安阳", distanceMeters: 1500, estimatedMinutes: 20, isSimulated: true },
  { fromCity: "济南", fromStation: "德州", toCity: "北京", toStation: "沧州", distanceMeters: 2000, estimatedMinutes: 25, isSimulated: true },
  { fromCity: "济南", fromStation: "泰安", toCity: "郑州", toStation: "菏泽", distanceMeters: 2500, estimatedMinutes: 30, isSimulated: true },
  { fromCity: "青岛", fromStation: "即墨", toCity: "济南", toStation: "淄博", distanceMeters: 3000, estimatedMinutes: 35, isSimulated: true },

  // === 长三角 ===
  { fromCity: "上海", fromStation: "嘉定北", toCity: "苏州", toStation: "昆山", distanceMeters: 600, estimatedMinutes: 8, isSimulated: true },
  { fromCity: "上海", fromStation: "青浦", toCity: "杭州", toStation: "海宁", distanceMeters: 1500, estimatedMinutes: 18, isSimulated: true },
  { fromCity: "上海", fromStation: "奉贤", toCity: "宁波", toStation: "余姚", distanceMeters: 2500, estimatedMinutes: 30, isSimulated: true },
  { fromCity: "苏州", fromStation: "常熟", toCity: "南京", toStation: "无锡", distanceMeters: 1800, estimatedMinutes: 22, isSimulated: true },
  { fromCity: "苏州", fromStation: "吴江", toCity: "杭州", toStation: "嘉兴", distanceMeters: 800, estimatedMinutes: 10, isSimulated: true },
  { fromCity: "南京", fromStation: "溧水", toCity: "杭州", toStation: "湖州", distanceMeters: 2000, estimatedMinutes: 24, isSimulated: true },
  { fromCity: "南京", fromStation: "马鞍山", toCity: "合肥", toStation: "巢湖", distanceMeters: 1200, estimatedMinutes: 15, isSimulated: true },
  { fromCity: "杭州", fromStation: "绍兴", toCity: "宁波", toStation: "余姚", distanceMeters: 1000, estimatedMinutes: 12, isSimulated: true },
  { fromCity: "杭州", fromStation: "义乌", toCity: "南昌", toStation: "上饶", distanceMeters: 2000, estimatedMinutes: 25, isSimulated: true },

  // === 珠三角 ===
  { fromCity: "广州", fromStation: "新塘", toCity: "东莞", toStation: "中堂", distanceMeters: 700, estimatedMinutes: 9, isSimulated: true },
  { fromCity: "东莞", fromStation: "长安", toCity: "深圳", toStation: "松岗", distanceMeters: 400, estimatedMinutes: 6, isSimulated: true },
  { fromCity: "广州", fromStation: "南沙", toCity: "深圳", toStation: "宝安", distanceMeters: 3000, estimatedMinutes: 35, isSimulated: true },
  { fromCity: "广州", fromStation: "南海", toCity: "佛山", toStation: "南海", distanceMeters: 500, estimatedMinutes: 7, isSimulated: true },
  { fromCity: "深圳", fromStation: "惠州南", toCity: "厦门", toStation: "漳州", distanceMeters: 3500, estimatedMinutes: 40, isSimulated: true },
  { fromCity: "佛山", fromStation: "顺德", toCity: "中山", toStation: "小榄", distanceMeters: 800, estimatedMinutes: 10, isSimulated: true },

  // === 华中 ===
  { fromCity: "武汉", fromStation: "咸宁", toCity: "长沙", toStation: "岳阳", distanceMeters: 1500, estimatedMinutes: 20, isSimulated: true },
  { fromCity: "武汉", fromStation: "信阳", toCity: "郑州", toStation: "信阳", distanceMeters: 500, estimatedMinutes: 7, isSimulated: true },
  { fromCity: "武汉", fromStation: "黄冈", toCity: "南昌", toStation: "九江", distanceMeters: 1200, estimatedMinutes: 15, isSimulated: true },
  { fromCity: "长沙", fromStation: "株洲", toCity: "南昌", toStation: "萍乡", distanceMeters: 1800, estimatedMinutes: 22, isSimulated: true },
  { fromCity: "长沙", fromStation: "衡阳", toCity: "广州", toStation: "郴州", distanceMeters: 3000, estimatedMinutes: 35, isSimulated: true },
  { fromCity: "郑州", fromStation: "许昌", toCity: "武汉", toStation: "信阳", distanceMeters: 1500, estimatedMinutes: 18, isSimulated: true },
  { fromCity: "郑州", fromStation: "开封", toCity: "济南", toStation: "菏泽", distanceMeters: 2000, estimatedMinutes: 24, isSimulated: true },

  // === 西南 ===
  { fromCity: "成都", fromStation: "简阳", toCity: "重庆", toStation: "安岳", distanceMeters: 3000, estimatedMinutes: 35, isSimulated: true },
  { fromCity: "成都", fromStation: "德阳", toCity: "西安", toStation: "汉中", distanceMeters: 4000, estimatedMinutes: 45, isSimulated: true },
  { fromCity: "重庆", fromStation: "涪陵", toCity: "长沙", toStation: "怀化", distanceMeters: 4500, estimatedMinutes: 50, isSimulated: true },
  { fromCity: "重庆", fromStation: "万州", toCity: "贵阳", toStation: "遵义", distanceMeters: 3500, estimatedMinutes: 40, isSimulated: true },
  { fromCity: "贵阳", fromStation: "安顺", toCity: "昆明", toStation: "曲靖", distanceMeters: 3000, estimatedMinutes: 35, isSimulated: true },

  // === 西北 ===
  { fromCity: "西安", fromStation: "渭南", toCity: "郑州", toStation: "三门峡", distanceMeters: 2500, estimatedMinutes: 30, isSimulated: true },
  { fromCity: "西安", fromStation: "咸阳", toCity: "兰州", toStation: "定西", distanceMeters: 5000, estimatedMinutes: 55, isSimulated: true },
  { fromCity: "西安", fromStation: "宝鸡", toCity: "成都", toStation: "广元", distanceMeters: 3500, estimatedMinutes: 40, isSimulated: true },

  // === 东北 ===
  { fromCity: "北京", fromStation: "承德", toCity: "沈阳", toStation: "朝阳", distanceMeters: 4000, estimatedMinutes: 45, isSimulated: true },
  { fromCity: "沈阳", fromStation: "铁岭", toCity: "长春", toStation: "四平", distanceMeters: 2000, estimatedMinutes: 24, isSimulated: true },
  { fromCity: "长春", fromStation: "德惠", toCity: "哈尔滨", toStation: "双城", distanceMeters: 1800, estimatedMinutes: 22, isSimulated: true },
  { fromCity: "沈阳", fromStation: "营口", toCity: "大连", toStation: "普兰店", distanceMeters: 2500, estimatedMinutes: 30, isSimulated: true },
];

export function getCityByName(name: string): CityConfig | undefined {
  return NATIONAL_CITIES.find((c) => c.name === name);
}

export function getCitiesByRegion(region: string): CityConfig[] {
  return NATIONAL_CITIES.filter((c) => c.region === region);
}

export function getAdjacentCities(cityName: string): CityConfig[] {
  const city = getCityByName(cityName);
  if (!city) return [];
  return city.adjacentCities.map(getCityByName).filter(Boolean) as CityConfig[];
}

// 模拟生成跨城换乘方案
export interface SimulatedRouteSegment {
  type: "bus" | "walk";
  line?: string;
  city?: string;
  fromCity?: string;
  toCity?: string;
  from: string;
  to: string;
  stationCount?: number;
  distanceMeters?: number;
  estimatedMinutes?: number;
  isSimulated: boolean;
  note?: string;
}

export interface SimulatedCrossCityRoute {
  id: string;
  fromCity: string;
  toCity: string;
  totalSegments: number;
  totalBusSegments: number;
  totalWalkSegments: number;
  totalStations: number;
  totalWalkDistance: number;
  transfers: number;
  segments: SimulatedRouteSegment[];
  summary: string;
  isFullySimulated: boolean;
  realDataRatio: number; // 0-1, 真实数据占比
}

// 确定性hash函数（避免Math.random导致hydration不一致）
function deterministicHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// 基于城市名生成确定性站点数
function getStationCount(from: string, to: string, min: number, max: number): number {
  const hash = deterministicHash(`${from}-${to}`);
  return min + (hash % (max - min + 1));
}

// 生成两个城市间的跨城换乘方案（含模拟数据标注）
export function generateCrossCityRoute(fromCity: string, toCity: string): SimulatedCrossCityRoute[] {
  const fromCityInfo = getCityByName(fromCity);
  const toCityInfo = getCityByName(toCity);
  if (!fromCityInfo || !toCityInfo || fromCity === toCity) return [];

  // 查找直达接驳
  const directConnection = CITY_CONNECTIONS.find(
    (c) =>
      (c.fromCity === fromCity && c.toCity === toCity) ||
      (c.fromCity === toCity && c.toCity === fromCity)
  );

  const plans: SimulatedCrossCityRoute[] = [];

  // 方案1：直达接驳（如果有）
  if (directConnection) {
    const conn = directConnection.fromCity === fromCity ? directConnection : {
      ...directConnection,
      fromCity: directConnection.toCity,
      fromStation: directConnection.toStation,
      toCity: directConnection.fromCity,
      toStation: directConnection.fromStation,
    };

    const fromBusSimulated = !fromCityInfo.realDataAvailable;
    const toBusSimulated = !toCityInfo.realDataAvailable;

    const segments: SimulatedRouteSegment[] = [
      {
        type: "bus",
        line: `${fromCity}市内公交`,
        city: fromCity,
        from: fromCityInfo.governmentStation,
        to: conn.fromStation,
        stationCount: getStationCount(fromCityInfo.name, conn.fromStation, 10, 24),
        isSimulated: fromBusSimulated,
        note: fromBusSimulated ? "模拟数据，后续获取真实站点后更新" : undefined,
      },
      {
        type: "walk",
        from: conn.fromStation,
        to: conn.toStation,
        distanceMeters: conn.distanceMeters,
        estimatedMinutes: conn.estimatedMinutes,
        isSimulated: conn.isSimulated,
        note: "城市边界步行接驳",
      },
      {
        type: "bus",
        line: `${toCity}市内公交`,
        city: toCity,
        from: conn.toStation,
        to: toCityInfo.governmentStation,
        stationCount: getStationCount(toCityInfo.name, conn.toStation, 10, 24),
        isSimulated: toBusSimulated,
        note: toBusSimulated ? "模拟数据，后续获取真实站点后更新" : undefined,
      },
    ];

    const busSegs = segments.filter((s) => s.type === "bus");
    const walkSegs = segments.filter((s) => s.type === "walk");
    const realSegs = segments.filter((s) => !s.isSimulated);

    plans.push({
      id: `route-direct`,
      fromCity,
      toCity,
      totalSegments: segments.length,
      totalBusSegments: busSegs.length,
      totalWalkSegments: walkSegs.length,
      totalStations: busSegs.reduce((s, seg) => s + (seg.stationCount || 0), 0),
      totalWalkDistance: walkSegs.reduce((s, seg) => s + (seg.distanceMeters || 0), 0),
      transfers: 1,
      segments,
      summary: `${fromCityInfo.governmentStation} → ${conn.fromStation} → 步行${conn.estimatedMinutes}分钟 → ${conn.toStation} → ${toCityInfo.governmentStation}`,
      isFullySimulated: realSegs.length === 0,
      realDataRatio: realSegs.length / segments.length,
    });
  }

  // 方案2：经相邻城市中转
  const fromAdjacent = fromCityInfo.adjacentCities;
  const toAdjacent = toCityInfo.adjacentCities;
  const commonCities = fromAdjacent.filter((c) => toAdjacent.includes(c));

  for (const midCity of commonCities.slice(0, 2)) {
    const midCityInfo = getCityByName(midCity);
    if (!midCityInfo) continue;

    const conn1 = CITY_CONNECTIONS.find(
      (c) => (c.fromCity === fromCity && c.toCity === midCity) || (c.fromCity === midCity && c.toCity === fromCity)
    );
    const conn2 = CITY_CONNECTIONS.find(
      (c) => (c.fromCity === midCity && c.toCity === toCity) || (c.fromCity === toCity && c.toCity === midCity)
    );

    if (!conn1 || !conn2) continue;

    const segments: SimulatedRouteSegment[] = [
      {
        type: "bus",
        line: `${fromCity}市内公交`,
        city: fromCity,
        from: fromCityInfo.governmentStation,
        to: conn1.fromCity === fromCity ? conn1.fromStation : conn1.toStation,
        stationCount: getStationCount(fromCityInfo.name, midCity, 8, 19),
        isSimulated: !fromCityInfo.realDataAvailable,
        note: !fromCityInfo.realDataAvailable ? "模拟数据" : undefined,
      },
      {
        type: "walk",
        from: conn1.fromCity === fromCity ? conn1.fromStation : conn1.toStation,
        to: conn1.fromCity === midCity ? conn1.fromStation : conn1.toStation,
        distanceMeters: conn1.distanceMeters,
        estimatedMinutes: conn1.estimatedMinutes,
        isSimulated: conn1.isSimulated,
        note: `${fromCity}-${midCity}接驳`,
      },
      {
        type: "bus",
        line: `${midCity}市内公交`,
        city: midCity,
        from: conn1.fromCity === midCity ? conn1.fromStation : conn1.toStation,
        to: conn2.fromCity === midCity ? conn2.fromStation : conn2.toStation,
        stationCount: getStationCount(midCity, `${conn1.fromStation}-${conn2.fromStation}`, 5, 14),
        isSimulated: !midCityInfo.realDataAvailable,
        note: !midCityInfo.realDataAvailable ? "模拟数据" : undefined,
      },
      {
        type: "walk",
        from: conn2.fromCity === midCity ? conn2.fromStation : conn2.toStation,
        to: conn2.fromCity === toCity ? conn2.fromStation : conn2.toStation,
        distanceMeters: conn2.distanceMeters,
        estimatedMinutes: conn2.estimatedMinutes,
        isSimulated: conn2.isSimulated,
        note: `${midCity}-${toCity}接驳`,
      },
      {
        type: "bus",
        line: `${toCity}市内公交`,
        city: toCity,
        from: conn2.fromCity === toCity ? conn2.fromStation : conn2.toStation,
        to: toCityInfo.governmentStation,
        stationCount: getStationCount(toCityInfo.name, midCity, 8, 19),
        isSimulated: !toCityInfo.realDataAvailable,
        note: !toCityInfo.realDataAvailable ? "模拟数据" : undefined,
      },
    ];

    const busSegs = segments.filter((s) => s.type === "bus");
    const walkSegs = segments.filter((s) => s.type === "walk");
    const realSegs = segments.filter((s) => !s.isSimulated);

    plans.push({
      id: `route-via-${midCity}`,
      fromCity,
      toCity,
      totalSegments: segments.length,
      totalBusSegments: busSegs.length,
      totalWalkSegments: walkSegs.length,
      totalStations: busSegs.reduce((s, seg) => s + (seg.stationCount || 0), 0),
      totalWalkDistance: walkSegs.reduce((s, seg) => s + (seg.distanceMeters || 0), 0),
      transfers: 2,
      segments,
      summary: `${fromCity} → 经${midCity}中转 → ${toCity}`,
      isFullySimulated: realSegs.length === 0,
      realDataRatio: realSegs.length / segments.length,
    });
  }

  return plans;
}
