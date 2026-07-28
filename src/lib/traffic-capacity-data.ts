// 交通承载力数据模型和模拟数据生成

export interface RoadSegment {
  id: string;
  name: string;
  start: { lng: number; lat: number };
  end: { lng: number; lat: number };
  length: number;        // 长度(km)
  level: 'expressway' | 'arterial' | 'collector' | 'local';
  lanes: number;         // 车道数
  capacity: number;      // 通行能力(辆/小时)
  volume: number;        // 实际流量(辆/小时)
  speed: number;         // 平均速度(km/h)
  congestionLevel: 'free' | 'slow' | 'congested' | 'blocked';
  peak: {
    morning: number;     // 早高峰流量
    evening: number;     // 晚高峰流量
  };
}

export interface TrafficZone {
  id: string;
  name: string;
  area: number;          // 面积(km²)
  population: number;
  employment: number;
  trips: {
    generated: number;   // 出行发生量(万人次/日)
    attracted: number;   // 出行吸引量(万人次/日)
  };
  accessibility: number; // 可达性指数(0-100)
  congestionIndex: number; // 拥堵指数(0-100)
}

export interface CapacityIndicator {
  name: string;
  value: number;
  unit: string;
  rating: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  trend: 'up' | 'stable' | 'down';
}

export interface CityTrafficData {
  city: string;
  roads: RoadSegment[];
  zones: TrafficZone[];
  indicators: CapacityIndicator[];
  stats: {
    totalRoadLength: number;
    avgSpeed: number;
    avgCongestion: number;
    peakHourRatio: number;
    roadDensity: number;
  };
}

// 道路等级中文名
export const levelNames: Record<RoadSegment['level'], string> = {
  expressway: '快速路',
  arterial: '主干道',
  collector: '次干道',
  local: '支路',
};

// 拥堵等级颜色
export const congestionColors: Record<RoadSegment['congestionLevel'], string> = {
  free: '#10B981',
  slow: '#F59E0B',
  congested: '#EF4444',
  blocked: '#7F1D1D',
};

// 模拟数据生成
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function generateRoads(city: string, centerLng: number, centerLat: number, seed: number): RoadSegment[] {
  const random = seededRandom(seed);
  const roads: RoadSegment[] = [];

  const levels: RoadSegment['level'][] = ['expressway', 'arterial', 'collector', 'local'];
  const mainRoadNames = ['长安街', '三环路', '四环路', '五环路', '京开高速', '京承高速', '机场高速'];

  // 生成主要道路
  for (let i = 0; i < 30; i++) {
    const level = i < 5 ? 'expressway' : i < 15 ? 'arterial' : i < 25 ? 'collector' : 'local';
    const lanes = level === 'expressway' ? 6 : level === 'arterial' ? 4 : level === 'collector' ? 2 : 1;
    const capacity = lanes * 2000;
    const volumeRatio = random() * 0.4 + 0.5;
    const volume = Math.floor(capacity * volumeRatio);

    const congestionLevel: RoadSegment['congestionLevel'] = 
      volumeRatio < 0.6 ? 'free' : volumeRatio < 0.75 ? 'slow' : volumeRatio < 0.9 ? 'congested' : 'blocked';

    const angle = random() * 2 * Math.PI;
    const startDist = random() * 0.05;
    const endDist = startDist + random() * 0.03;

    roads.push({
      id: `road-${i}`,
      name: i < mainRoadNames.length ? mainRoadNames[i] : `${city}${levelNames[level]}${i}`,
      start: {
        lng: centerLng + startDist * Math.cos(angle) * 0.8,
        lat: centerLat + startDist * Math.sin(angle),
      },
      end: {
        lng: centerLng + endDist * Math.cos(angle) * 0.8,
        lat: centerLat + endDist * Math.sin(angle),
      },
      length: Math.floor(random() * 10 + 2),
      level,
      lanes,
      capacity,
      volume,
      speed: Math.floor(random() * 40 + 20),
      congestionLevel,
      peak: {
        morning: Math.floor(volume * (1 + random() * 0.3)),
        evening: Math.floor(volume * (1 + random() * 0.4)),
      },
    });
  }

  return roads;
}

function generateZones(city: string): TrafficZone[] {
  const zones: TrafficZone[] = [];
  const zoneNames = ['CBD', '金融街', '中关村', '望京', '亦庄', '通州', '大兴', '昌平'];

  for (let i = 0; i < zoneNames.length; i++) {
    const random = seededRandom(city.charCodeAt(0) + i);
    zones.push({
      id: `zone-${i}`,
      name: `${city}${zoneNames[i]}`,
      area: Math.floor(random() * 30 + 5),
      population: Math.floor(random() * 300000 + 50000),
      employment: Math.floor(random() * 200000 + 20000),
      trips: {
        generated: Math.floor(random() * 50 + 10),
        attracted: Math.floor(random() * 50 + 10),
      },
      accessibility: Math.floor(random() * 30 + 60),
      congestionIndex: Math.floor(random() * 40 + 40),
    });
  }

  return zones;
}

function generateIndicators(): CapacityIndicator[] {
  return [
    { name: '路网容量利用率', value: 78, unit: '%', rating: 'fair', trend: 'up' },
    { name: '高峰小时系数', value: 0.82, unit: '', rating: 'poor', trend: 'up' },
    { name: '平均出行速度', value: 28, unit: 'km/h', rating: 'fair', trend: 'down' },
    { name: '公共交通分担率', value: 45, unit: '%', rating: 'good', trend: 'up' },
    { name: '路网密度', value: 8.2, unit: 'km/km²', rating: 'good', trend: 'stable' },
    { name: '人均道路面积', value: 12, unit: '㎡', rating: 'fair', trend: 'stable' },
  ];
}

function calculateStats(roads: RoadSegment[]) {
  return {
    totalRoadLength: Math.floor(roads.reduce((s, r) => s + r.length, 0)),
    avgSpeed: Math.floor(roads.reduce((s, r) => s + r.speed, 0) / roads.length),
    avgCongestion: Math.floor(roads.reduce((s, r) => s + r.volume / r.capacity, 0) / roads.length * 100),
    peakHourRatio: 0.82,
    roadDensity: 8.2,
  };
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
export const cityTrafficData: CityTrafficData[] = cities.map(c => {
  const roads = generateRoads(c.name, c.center[0], c.center[1], c.seed);
  return {
    city: c.name,
    roads,
    zones: generateZones(c.name),
    indicators: generateIndicators(),
    stats: calculateStats(roads),
  };
});

// 查询函数
export function getCityTrafficData(cityName: string): CityTrafficData | undefined {
  return cityTrafficData.find(c => c.city === cityName);
}

export function getAllCities(): string[] {
  return cities.map(c => c.name);
}

export function filterRoads(data: CityTrafficData, level?: RoadSegment['level']): RoadSegment[] {
  if (!level) return data.roads;
  return data.roads.filter(r => r.level === level);
}