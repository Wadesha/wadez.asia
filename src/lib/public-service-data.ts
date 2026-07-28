// 公共服务设施数据模型和模拟数据生成

export type FacilityType =
  | 'kindergarten'    // 幼儿园
  | 'primary_school'  // 小学
  | 'middle_school'   // 初中
  | 'high_school'     // 高中
  | 'hospital'        // 医院
  | 'clinic'          // 诊所
  | 'community_health' // 社区卫生服务中心
  | 'library'         // 图书馆
  | 'culture_center'  // 文化馆
  | 'sports_center'   // 体育场馆
  | 'community_center' // 社区服务中心
  | 'elderly_care'    // 养老院
  | 'day_care';       // 日间照料中心

export type FacilityCategory = 'education' | 'medical' | 'culture' | 'community';

export interface PublicFacility {
  id: string;
  name: string;
  type: FacilityType;
  category: FacilityCategory;
  address: string;
  location: {
    lng: number;
    lat: number;
  };
  capacity?: number;      // 容纳人数/床位数
  area?: number;          // 建筑面积(㎡)
  level?: string;         // 等级(一级/二级/三级)
  openingHours?: string;  // 开放时间
  phone?: string;         // 联系电话
  coverageRadius: number; // 服务半径(米)
  servedPopulation?: number; // 服务人口
}

export interface ServiceCoverage {
  facilityType: FacilityType;
  radius: number;
  coverageRate: number;   // 覆盖率(0-100)
  servedPopulation: number;
  totalPopulation: number;
}

export interface DistrictServiceStats {
  district: string;
  population: number;
  area: number;           // 面积(km²)
  facilities: {
    education: number;
    medical: number;
    culture: number;
    community: number;
  };
  coverage: {
    '500m': number;       // 500米覆盖率
    '1000m': number;      // 1000米覆盖率
    '15min': number;      // 15分钟生活圈覆盖率
  };
  score: number;          // 综合评分(0-100)
}

// 设施类型分类映射
export const facilityCategoryMap: Record<FacilityType, FacilityCategory> = {
  kindergarten: 'education',
  primary_school: 'education',
  middle_school: 'education',
  high_school: 'education',
  hospital: 'medical',
  clinic: 'medical',
  community_health: 'medical',
  library: 'culture',
  culture_center: 'culture',
  sports_center: 'culture',
  community_center: 'community',
  elderly_care: 'community',
  day_care: 'community',
};

// 设施类型中文名
export const facilityTypeNames: Record<FacilityType, string> = {
  kindergarten: '幼儿园',
  primary_school: '小学',
  middle_school: '初中',
  high_school: '高中',
  hospital: '医院',
  clinic: '诊所',
  community_health: '社区卫生服务中心',
  library: '图书馆',
  culture_center: '文化馆',
  sports_center: '体育场馆',
  community_center: '社区服务中心',
  elderly_care: '养老院',
  day_care: '日间照料中心',
};

// 设施类别中文名
export const categoryNames: Record<FacilityCategory, string> = {
  education: '教育设施',
  medical: '医疗设施',
  culture: '文体设施',
  community: '社区服务',
};

// 默认服务半径
export const defaultCoverageRadius: Record<FacilityType, number> = {
  kindergarten: 300,
  primary_school: 500,
  middle_school: 1000,
  high_school: 1500,
  hospital: 2000,
  clinic: 500,
  community_health: 1000,
  library: 1500,
  culture_center: 2000,
  sports_center: 2000,
  community_center: 500,
  elderly_care: 1000,
  day_care: 500,
};

// 模拟数据生成函数
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function generateFacilitiesForCity(
  city: string,
  centerLng: number,
  centerLat: number,
  seed: number
): PublicFacility[] {
  const random = seededRandom(seed);
  const facilities: PublicFacility[] = [];

  // 各类型设施数量范围
  const facilityCounts: Record<FacilityType, [number, number]> = {
    kindergarten: [15, 25],
    primary_school: [10, 18],
    middle_school: [6, 12],
    high_school: [3, 6],
    hospital: [4, 8],
    clinic: [20, 35],
    community_health: [8, 15],
    library: [2, 5],
    culture_center: [2, 4],
    sports_center: [3, 6],
    community_center: [12, 20],
    elderly_care: [5, 10],
    day_care: [8, 15],
  };

  let id = 1;

  for (const [type, [min, max]] of Object.entries(facilityCounts)) {
    const count = Math.floor(random() * (max - min + 1)) + min;

    for (let i = 0; i < count; i++) {
      const facilityType = type as FacilityType;
      const category = facilityCategoryMap[facilityType];

      // 生成位置：中心区域密度高，外围密度低
      const angle = random() * 2 * Math.PI;
      const distanceFactor = random() ** 0.5; // 中心偏向
      const maxDistance = 0.08; // 约8km
      const distance = distanceFactor * maxDistance;

      const lng = centerLng + distance * Math.cos(angle) * 0.8;
      const lat = centerLat + distance * Math.sin(angle);

      const facilityId = `${city.toLowerCase().replace(/\s+/g, '-')}-${facilityType}-${id++}`;

      const capacity = random() > 0.3 ? Math.floor(random() * 500 + 50) : undefined;
      const area = Math.floor(random() * 5000 + 200);
      const level = random() > 0.7 ? ['一级', '二级', '三级'][Math.floor(random() * 3)] : undefined;

      facilities.push({
        id: facilityId,
        name: `${city}${facilityTypeNames[facilityType]}${i + 1}`,
        type: facilityType,
        category,
        address: `${city}某区某街道${i + 1}号`,
        location: { lng, lat },
        capacity,
        area,
        level,
        openingHours: '08:00-18:00',
        phone: `010-${Math.floor(random() * 90000000 + 10000000)}`,
        coverageRadius: defaultCoverageRadius[facilityType],
        servedPopulation: Math.floor(random() * 20000 + 5000),
      });
    }
  }

  return facilities;
}

function generateDistrictStats(
  city: string,
  facilities: PublicFacility[]
): DistrictServiceStats[] {
  const districts = ['中心区', '东区', '西区', '南区', '北区'];
  const stats: DistrictServiceStats[] = [];

  for (const district of districts) {
    const random = seededRandom(city.charCodeAt(0) + district.charCodeAt(0));
    const population = Math.floor(random() * 500000 + 100000);
    const area = Math.floor(random() * 50 + 10);

    const districtFacilities = facilities.filter(() => random() > 0.3);

    stats.push({
      district: `${city}${district}`,
      population,
      area,
      facilities: {
        education: districtFacilities.filter(f => f.category === 'education').length,
        medical: districtFacilities.filter(f => f.category === 'medical').length,
        culture: districtFacilities.filter(f => f.category === 'culture').length,
        community: districtFacilities.filter(f => f.category === 'community').length,
      },
      coverage: {
        '500m': Math.floor(random() * 30 + 50),
        '1000m': Math.floor(random() * 20 + 70),
        '15min': Math.floor(random() * 15 + 80),
      },
      score: Math.floor(random() * 30 + 60),
    });
  }

  return stats;
}

// 城市数据
export interface CityServiceData {
  city: string;
  center: { lng: number; lat: number };
  facilities: PublicFacility[];
  districtStats: DistrictServiceStats[];
}

const cities: Array<{ name: string; center: [number, number]; seed: number }> = [
  { name: '北京', center: [116.4074, 39.9042], seed: 100 },
  { name: '上海', center: [121.4737, 31.2304], seed: 200 },
  { name: '广州', center: [113.2644, 23.1291], seed: 300 },
  { name: '深圳', center: [114.0579, 22.5431], seed: 400 },
  { name: '杭州', center: [120.1551, 30.2741], seed: 500 },
];

// 生成所有城市数据
export const cityServiceData: CityServiceData[] = cities.map(c => ({
  city: c.name,
  center: { lng: c.center[0], lat: c.center[1] },
  facilities: generateFacilitiesForCity(c.name, c.center[0], c.center[1], c.seed),
  districtStats: generateDistrictStats(c.name, []),
}));

// 查询函数
export function getCityServiceData(cityName: string): CityServiceData | undefined {
  return cityServiceData.find(c => c.city === cityName);
}

export function getAllCities(): string[] {
  return cities.map(c => c.name);
}

export function filterFacilities(
  data: CityServiceData,
  category?: FacilityCategory,
  type?: FacilityType
): PublicFacility[] {
  let filtered = data.facilities;

  if (category) {
    filtered = filtered.filter(f => f.category === category);
  }
  if (type) {
    filtered = filtered.filter(f => f.type === type);
  }

  return filtered;
}

export function calculateCoverage(
  facilities: PublicFacility[],
  population: number
): ServiceCoverage[] {
  const coverages: ServiceCoverage[] = [];

  const types: FacilityType[] = [
    'kindergarten', 'primary_school', 'middle_school', 'high_school',
    'hospital', 'clinic', 'community_health',
    'library', 'culture_center', 'sports_center',
    'community_center', 'elderly_care', 'day_care',
  ];

  for (const type of types) {
    const typeFacilities = facilities.filter(f => f.type === type);
    const totalServed = typeFacilities.reduce((sum, f) => sum + (f.servedPopulation || 0), 0);
    const coverageRate = Math.min(100, (totalServed / population) * 100);

    coverages.push({
      facilityType: type,
      radius: defaultCoverageRadius[type],
      coverageRate: Math.round(coverageRate),
      servedPopulation: totalServed,
      totalPopulation: population,
    });
  }

  return coverages;
}

// 统计信息
export function getServiceStats(data: CityServiceData) {
  const facilities = data.facilities;

  return {
    total: facilities.length,
    education: facilities.filter(f => f.category === 'education').length,
    medical: facilities.filter(f => f.category === 'medical').length,
    culture: facilities.filter(f => f.category === 'culture').length,
    community: facilities.filter(f => f.category === 'community').length,
    avgCoverageRadius: Math.round(
      facilities.reduce((sum, f) => sum + f.coverageRadius, 0) / facilities.length
    ),
  };
}