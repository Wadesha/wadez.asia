// 城市天际线数据模型和模拟数据生成

export interface BuildingHeight {
  id: string;
  name: string;
  location: { lng: number; lat: number };
  height: number;        // 建筑高度(米)
  floors: number;        // 楼层数
  yearBuilt: number;     // 建成年份
  function: 'commercial' | 'residential' | 'office' | 'hotel' | 'mixed' | 'public';
  landmark?: boolean;    // 是否地标建筑
  status: 'built' | 'under_construction' | 'planned';
}

export interface SkylineProfile {
  name: string;
  direction: 'north-south' | 'east-west' | 'diagonal';
  buildings: BuildingHeight[];
  maxHeight: number;
  avgHeight: number;
  silhouette: number[];  // 天际线轮廓点(相对高度)
}

export interface HeightZone {
  name: string;
  maxHeight: number;
  minheight: number;
  area: number;          // 面积(km²)
  district: string;
  restriction: string;   // 限高原因
}

export interface CitySkylineData {
  city: string;
  center: { lng: number; lat: number };
  buildings: BuildingHeight[];
  profiles: SkylineProfile[];
  zones: HeightZone[];
  stats: {
    totalBuildings: number;
    avgHeight: number;
    maxHeight: number;
    landmarkCount: number;
    heightDistribution: {
      low: number;      // <50m
      medium: number;   // 50-100m
      high: number;     // 100-200m
      super: number;    // >200m
    };
  };
}

// 建筑功能中文名
export const functionNames: Record<BuildingHeight['function'], string> = {
  commercial: '商业',
  residential: '住宅',
  office: '办公',
  hotel: '酒店',
  mixed: '综合',
  public: '公共设施',
};

// 状态中文名
export const statusNames: Record<BuildingHeight['status'], string> = {
  built: '已建成',
  under_construction: '在建',
  planned: '规划中',
};

// 模拟数据生成函数
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function generateBuildingsForCity(
  city: string,
  centerLng: number,
  centerLat: number,
  seed: number
): BuildingHeight[] {
  const random = seededRandom(seed);
  const buildings: BuildingHeight[] = [];

  // 著名地标建筑(模拟)
  const landmarks: Array<{ name: string; height: number; floors: number; year: number; func: BuildingHeight['function'] }> = 
    city === '北京' ? [
      { name: '中国尊', height: 528, floors: 108, year: 2018, func: 'office' },
      { name: '国贸三期', height: 330, floors: 74, year: 2010, func: 'office' },
      { name: '银泰中心', height: 250, floors: 62, year: 2008, func: 'mixed' },
      { name: '央视总部大楼', height: 234, floors: 52, year: 2012, func: 'office' },
      { name: '京城大厦', height: 183, floors: 51, year: 1991, func: 'office' },
    ] : city === '上海' ? [
      { name: '上海中心大厦', height: 632, floors: 128, year: 2016, func: 'mixed' },
      { name: '环球金融中心', height: 492, floors: 101, year: 2008, func: 'office' },
      { name: '金茂大厦', height: 421, floors: 88, year: 1999, func: 'mixed' },
      { name: '世茂国际广场', height: 333, floors: 66, year: 2006, func: 'office' },
      { name: '恒隆广场', height: 288, floors: 62, year: 2001, func: 'commercial' },
    ] : city === '广州' ? [
      { name: '广州周大福金融中心', height: 530, floors: 111, year: 2016, func: 'mixed' },
      { name: '广州国际金融中心', height: 439, floors: 88, year: 2010, func: 'office' },
      { name: '广晟国际大厦', height: 360, floors: 68, year: 2011, func: 'office' },
      { name: '珠江城大厦', height: 309, floors: 65, year: 2013, func: 'office' },
    ] : [];

  // 添加地标建筑
  landmarks.forEach((lm, i) => {
    const angle = (i / landmarks.length) * 2 * Math.PI + random() * 0.3;
    const distance = 0.02 + random() * 0.02;

    buildings.push({
      id: `${city.toLowerCase()}-landmark-${i}`,
      name: lm.name,
      location: {
        lng: centerLng + distance * Math.cos(angle) * 0.8,
        lat: centerLat + distance * Math.sin(angle),
      },
      height: lm.height,
      floors: lm.floors,
      yearBuilt: lm.year,
      function: lm.func,
      landmark: true,
      status: 'built',
    });
  });

  // 生成其他建筑
  const buildingCount = Math.floor(random() * 80 + 50);

  for (let i = 0; i < buildingCount; i++) {
    const angle = random() * 2 * Math.PI;
    const distanceFactor = random() ** 0.4;
    const maxDistance = 0.08;
    const distance = distanceFactor * maxDistance;

    const lng = centerLng + distance * Math.cos(angle) * 0.8;
    const lat = centerLat + distance * Math.sin(angle);

    // 中心区域建筑更高
    const heightFactor = 1 - distanceFactor * 0.6;
    const baseHeight = city === '上海' ? 150 : city === '北京' ? 100 : 80;
    const height = Math.floor(random() * baseHeight * heightFactor + 30);
    const floors = Math.floor(height / 3.5);

    const functions: BuildingHeight['function'][] = ['commercial', 'residential', 'office', 'hotel', 'mixed', 'public'];
    const func = functions[Math.floor(random() * functions.length)];

    buildings.push({
      id: `${city.toLowerCase()}-building-${i}`,
      name: `${city}${func === 'office' ? '写字楼' : func === 'residential' ? '住宅楼' : '商住楼'}${i + 1}`,
      location: { lng, lat },
      height,
      floors,
      yearBuilt: Math.floor(random() * 30 + 1990),
      function: func,
      landmark: false,
      status: random() > 0.1 ? 'built' : random() > 0.5 ? 'under_construction' : 'planned',
    });
  }

  return buildings.sort((a, b) => b.height - a.height);
}

function generateProfiles(buildings: BuildingHeight[]): SkylineProfile[] {
  return [
    {
      name: '南北向天际线',
      direction: 'north-south',
      buildings: buildings.slice(0, 20),
      maxHeight: buildings[0]?.height || 0,
      avgHeight: Math.floor(buildings.slice(0, 20).reduce((s, b) => s + b.height, 0) / 20),
      silhouette: buildings.slice(0, 20).map(b => b.height),
    },
    {
      name: '东西向天际线',
      direction: 'east-west',
      buildings: buildings.slice(5, 25),
      maxHeight: buildings[5]?.height || 0,
      avgHeight: Math.floor(buildings.slice(5, 25).reduce((s, b) => s + b.height, 0) / 20),
      silhouette: buildings.slice(5, 25).map(b => b.height),
    },
  ];
}

function generateZones(city: string, centerLng: number, centerLat: number): HeightZone[] {
  const zones: HeightZone[] = [
    { name: '核心区', maxHeight: 500, minheight: 200, area: 5, district: 'CBD', restriction: '鼓励高层，塑造标志性天际线' },
    { name: '过渡区', maxHeight: 150, minheight: 80, area: 15, district: '中心区外围', restriction: '适度控制高度，与核心区过渡衔接' },
    { name: '一般区', maxHeight: 80, minheight: 24, area: 30, district: '城市一般区域', restriction: '严格控制高度，保障居住品质' },
    { name: '保护区', maxHeight: 45, minheight: 12, area: 20, district: '历史街区', restriction: '严格限高，保护历史风貌' },
  ];

  return zones;
}

function calculateStats(buildings: BuildingHeight[]) {
  const totalBuildings = buildings.length;
  const avgHeight = Math.floor(buildings.reduce((s, b) => s + b.height, 0) / totalBuildings);
  const maxHeight = Math.max(...buildings.map(b => b.height));
  const landmarkCount = buildings.filter(b => b.landmark).length;

  const heightDistribution = {
    low: buildings.filter(b => b.height < 50).length,
    medium: buildings.filter(b => b.height >= 50 && b.height < 100).length,
    high: buildings.filter(b => b.height >= 100 && b.height < 200).length,
    super: buildings.filter(b => b.height >= 200).length,
  };

  return { totalBuildings, avgHeight, maxHeight, landmarkCount, heightDistribution };
}

// 城市数据
const cities: Array<{ name: string; center: [number, number]; seed: number }> = [
  { name: '北京', center: [116.4074, 39.9042], seed: 100 },
  { name: '上海', center: [121.4737, 31.2304], seed: 200 },
  { name: '广州', center: [113.2644, 23.1291], seed: 300 },
  { name: '深圳', center: [114.0579, 22.5431], seed: 400 },
  { name: '杭州', center: [120.1551, 30.2741], seed: 500 },
];

// 生成所有城市数据
export const citySkylineData: CitySkylineData[] = cities.map(c => {
  const buildings = generateBuildingsForCity(c.name, c.center[0], c.center[1], c.seed);
  return {
    city: c.name,
    center: { lng: c.center[0], lat: c.center[1] },
    buildings,
    profiles: generateProfiles(buildings),
    zones: generateZones(c.name, c.center[0], c.center[1]),
    stats: calculateStats(buildings),
  };
});

// 查询函数
export function getCitySkylineData(cityName: string): CitySkylineData | undefined {
  return citySkylineData.find(c => c.city === cityName);
}

export function getAllCities(): string[] {
  return cities.map(c => c.name);
}

export function filterBuildings(
  data: CitySkylineData,
  minHeight?: number,
  maxHeight?: number,
  func?: BuildingHeight['function']
): BuildingHeight[] {
  let filtered = data.buildings;

  if (minHeight !== undefined) {
    filtered = filtered.filter(b => b.height >= minHeight);
  }
  if (maxHeight !== undefined) {
    filtered = filtered.filter(b => b.height <= maxHeight);
  }
  if (func) {
    filtered = filtered.filter(b => b.function === func);
  }

  return filtered;
}