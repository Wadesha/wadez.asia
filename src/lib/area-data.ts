export type AreaShape = "polygon" | "linear";

export type AreaType =
  | "park"
  | "plaza"
  | "block"
  | "community"
  | "campus"
  | "mall"
  | "industrial"
  | "airport"
  | "road-greenbelt"
  | "riverside"
  | "pedestrian-street"
  | "green-corridor"
  | "protective-belt";

export type AreaCategory = "open" | "enclosed";

export type GreenbeltSubtype =
  | "roadside"
  | "central"
  | "interchange"
  | "riverside"
  | "pedestrian"
  | "corridor"
  | "protective"
  | "median"
  | "sidewalk"
  | "both-sides";

export interface AreaEntrance {
  id: string;
  name: string;
  lng: number;
  lat: number;
  type: "main" | "secondary" | "emergency" | "pedestrian" | "vehicle";
  isOpen: boolean;
  openingHours?: string;
}

export interface Area {
  id: string;
  name: string;
  category: AreaCategory;
  type: AreaType;
  typeLabel: string;
  shape: AreaShape;
  city: string;
  description: string;
  areaKm2: number;
  boundary: [number, number][];
  center: [number, number];
  entrances: AreaEntrance[];
  enclosureLevel: number;
  hasPerimeterWall: boolean;
  accessRestriction: "none" | "partial" | "full";
  builtYear?: number;
  dailyFootfall?: number;
  tags: string[];
  lengthKm?: number;
  avgWidthM?: number;
  greenbeltSubtype?: GreenbeltSubtype;
  startPoint?: string;
  endPoint?: string;
  connectedAreas?: string[];
}

const AREAS: Area[] = [
  {
    id: "chaoyang-park",
    name: "朝阳公园",
    category: "open",
    type: "park",
    typeLabel: "城市公园",
    shape: "polygon",
    city: "北京",
    description: "北京最大的城市公园之一，四面均有入口，可自由进出，无围墙阻隔。",
    areaKm2: 2.89,
    center: [116.4767, 39.9339],
    boundary: [
      [116.465, 39.942],
      [116.489, 39.940],
      [116.490, 39.926],
      [116.464, 39.928],
    ],
    entrances: [
      { id: "e1", name: "南门", lng: 116.478, lat: 39.926, type: "main", isOpen: true, openingHours: "06:00-22:00" },
      { id: "e2", name: "北门", lng: 116.476, lat: 39.942, type: "main", isOpen: true, openingHours: "06:00-22:00" },
      { id: "e3", name: "东门", lng: 116.489, lat: 39.934, type: "secondary", isOpen: true, openingHours: "06:00-22:00" },
      { id: "e4", name: "西门", lng: 116.465, lat: 39.935, type: "secondary", isOpen: true, openingHours: "06:00-22:00" },
      { id: "e5", name: "东南门", lng: 116.486, lat: 39.928, type: "pedestrian", isOpen: true },
    ],
    enclosureLevel: 1,
    hasPerimeterWall: false,
    accessRestriction: "none",
    builtYear: 1984,
    dailyFootfall: 30000,
    tags: ["绿地", "休闲", "开放式", "多入口"],
  },
  {
    id: "tiananmen-square",
    name: "天安门广场",
    category: "open",
    type: "plaza",
    typeLabel: "城市广场",
    shape: "polygon",
    city: "北京",
    description: "世界最大的城市广场之一，完全开放，可从多个方向自由进入。",
    areaKm2: 0.44,
    center: [116.3975, 39.9087],
    boundary: [
      [116.391, 39.912],
      [116.404, 39.912],
      [116.404, 39.905],
      [116.391, 39.905],
    ],
    entrances: [
      { id: "e1", name: "北侧入口", lng: 116.3975, lat: 39.912, type: "main", isOpen: true },
      { id: "e2", name: "南侧入口", lng: 116.3975, lat: 39.905, type: "main", isOpen: true },
      { id: "e3", name: "东侧入口", lng: 116.404, lat: 39.9087, type: "pedestrian", isOpen: true },
      { id: "e4", name: "西侧入口", lng: 116.391, lat: 39.9087, type: "pedestrian", isOpen: true },
    ],
    enclosureLevel: 0,
    hasPerimeterWall: false,
    accessRestriction: "none",
    builtYear: 1949,
    dailyFootfall: 100000,
    tags: ["地标", "开放式", "完全开放"],
  },
  {
    id: "sanlitun-village",
    name: "三里屯太古里",
    category: "open",
    type: "block",
    typeLabel: "开放街区",
    shape: "polygon",
    city: "北京",
    description: "开放式商业街区，无围墙，多条街道穿越，可从任意方向进入。",
    areaKm2: 0.12,
    center: [116.4558, 39.9372],
    boundary: [
      [116.452, 39.939],
      [116.460, 39.939],
      [116.460, 39.935],
      [116.452, 39.935],
    ],
    entrances: [
      { id: "e1", name: "北区主入口", lng: 116.455, lat: 39.939, type: "main", isOpen: true, openingHours: "10:00-22:00" },
      { id: "e2", name: "南区主入口", lng: 116.456, lat: 39.935, type: "main", isOpen: true, openingHours: "10:00-22:00" },
      { id: "e3", name: "东侧入口", lng: 116.460, lat: 39.937, type: "pedestrian", isOpen: true },
      { id: "e4", name: "西侧入口", lng: 116.452, lat: 39.937, type: "pedestrian", isOpen: true },
    ],
    enclosureLevel: 0,
    hasPerimeterWall: false,
    accessRestriction: "none",
    builtYear: 2008,
    dailyFootfall: 80000,
    tags: ["商业", "开放式", "街区制"],
  },
  {
    id: "tsinghua-campus",
    name: "清华大学校园",
    category: "enclosed",
    type: "campus",
    typeLabel: "大学校园",
    shape: "polygon",
    city: "北京",
    description: "百年名校校园，有围墙环绕，主要出入口需验证身份，部分时段对外开放。",
    areaKm2: 4.42,
    center: [116.3256, 40.0039],
    boundary: [
      [116.310, 40.015],
      [116.342, 40.015],
      [116.340, 39.992],
      [116.312, 39.994],
    ],
    entrances: [
      { id: "e1", name: "西门", lng: 116.310, lat: 40.003, type: "main", isOpen: true, openingHours: "08:00-16:00（游客）" },
      { id: "e2", name: "东门", lng: 116.342, lat: 40.002, type: "main", isOpen: true, openingHours: "全天（校内人员）" },
      { id: "e3", name: "南门", lng: 116.326, lat: 39.994, type: "secondary", isOpen: true },
      { id: "e4", name: "北门", lng: 116.328, lat: 40.015, type: "secondary", isOpen: true },
      { id: "e5", name: "东北门", lng: 116.338, lat: 40.010, type: "vehicle", isOpen: true },
      { id: "e6", name: "西北门", lng: 116.315, lat: 40.011, type: "pedestrian", isOpen: false },
    ],
    enclosureLevel: 4,
    hasPerimeterWall: true,
    accessRestriction: "partial",
    builtYear: 1911,
    dailyFootfall: 50000,
    tags: ["校园", "封闭式", "围墙", "身份核验"],
  },
  {
    id: "zhongguancun-mall",
    name: "中关村购物中心",
    category: "enclosed",
    type: "mall",
    typeLabel: "商业综合体",
    shape: "polygon",
    city: "北京",
    description: "大型封闭式购物中心，仅能通过指定入口进入，营业时间外全封闭。",
    areaKm2: 0.25,
    center: [116.3156, 39.9829],
    boundary: [
      [116.312, 39.985],
      [116.319, 39.985],
      [116.319, 39.981],
      [116.312, 39.981],
    ],
    entrances: [
      { id: "e1", name: "1号门（东）", lng: 116.319, lat: 39.983, type: "main", isOpen: true, openingHours: "10:00-22:00" },
      { id: "e2", name: "2号门（西）", lng: 116.312, lat: 39.983, type: "main", isOpen: true, openingHours: "10:00-22:00" },
      { id: "e3", name: "3号门（南）", lng: 116.3155, lat: 39.981, type: "secondary", isOpen: true, openingHours: "10:00-22:00" },
      { id: "e4", name: "地下入口", lng: 116.316, lat: 39.982, type: "pedestrian", isOpen: true, openingHours: "10:00-22:00" },
      { id: "e5", name: "货运入口", lng: 116.318, lat: 39.985, type: "vehicle", isOpen: false },
    ],
    enclosureLevel: 5,
    hasPerimeterWall: true,
    accessRestriction: "partial",
    builtYear: 2006,
    dailyFootfall: 60000,
    tags: ["商业", "封闭式", "定时开放"],
  },
  {
    id: "wangjing-community",
    name: "望京新城小区",
    category: "enclosed",
    type: "community",
    typeLabel: "住宅小区",
    shape: "polygon",
    city: "北京",
    description: "典型封闭式居民小区，围墙环绕，出入口有保安值守，需门禁卡进入。",
    areaKm2: 1.2,
    center: [116.4758, 39.9972],
    boundary: [
      [116.468, 40.002],
      [116.483, 40.002],
      [116.483, 39.992],
      [116.468, 39.992],
    ],
    entrances: [
      { id: "e1", name: "东门", lng: 116.483, lat: 39.997, type: "main", isOpen: true, openingHours: "24小时（门禁）" },
      { id: "e2", name: "西门", lng: 116.468, lat: 39.996, type: "main", isOpen: true, openingHours: "24小时（门禁）" },
      { id: "e3", name: "南门", lng: 116.475, lat: 39.992, type: "secondary", isOpen: true, openingHours: "06:00-23:00" },
      { id: "e4", name: "北门", lng: 116.476, lat: 40.002, type: "secondary", isOpen: true, openingHours: "06:00-23:00" },
      { id: "e5", name: "地库入口", lng: 116.479, lat: 39.995, type: "vehicle", isOpen: true },
      { id: "e6", name: "消防通道", lng: 116.472, lat: 39.994, type: "emergency", isOpen: false },
    ],
    enclosureLevel: 5,
    hasPerimeterWall: true,
    accessRestriction: "full",
    builtYear: 2000,
    dailyFootfall: 20000,
    tags: ["住宅", "封闭式", "门禁", "围墙"],
  },
  {
    id: "yizhuang-industrial",
    name: "亦庄经济开发区工业园",
    category: "enclosed",
    type: "industrial",
    typeLabel: "工业园区",
    shape: "polygon",
    city: "北京",
    description: "产业园区，有围墙和门卫，需登记或工牌进入，内部道路不对外开放。",
    areaKm2: 3.5,
    center: [116.5156, 39.7972],
    boundary: [
      [116.500, 39.808],
      [116.532, 39.808],
      [116.530, 39.786],
      [116.502, 39.788],
    ],
    entrances: [
      { id: "e1", name: "1号门（东）", lng: 116.532, lat: 39.797, type: "main", isOpen: true, openingHours: "07:00-22:00" },
      { id: "e2", name: "2号门（西）", lng: 116.500, lat: 39.796, type: "main", isOpen: true, openingHours: "07:00-22:00" },
      { id: "e3", name: "3号门（货运）", lng: 116.526, lat: 39.788, type: "vehicle", isOpen: true, openingHours: "06:00-24:00" },
      { id: "e4", name: "人行便门", lng: 116.515, lat: 39.808, type: "pedestrian", isOpen: false },
    ],
    enclosureLevel: 5,
    hasPerimeterWall: true,
    accessRestriction: "full",
    builtYear: 2005,
    dailyFootfall: 15000,
    tags: ["工业", "封闭式", "登记进入"],
  },
  {
    id: "beijing-capital-airport",
    name: "北京首都国际机场 T3",
    category: "enclosed",
    type: "airport",
    typeLabel: "机场航站楼",
    shape: "polygon",
    city: "北京",
    description: "机场航站楼属于典型封闭区域，安检后方可进入隔离区，出入口严格管控。",
    areaKm2: 0.98,
    center: [116.6056, 40.0772],
    boundary: [
      [116.595, 40.085],
      [116.616, 40.085],
      [116.614, 40.068],
      [116.597, 40.070],
    ],
    entrances: [
      { id: "e1", name: "4号门（国内出发）", lng: 116.606, lat: 40.085, type: "main", isOpen: true, openingHours: "04:30-23:00" },
      { id: "e2", name: "5号门（国际出发）", lng: 116.609, lat: 40.084, type: "main", isOpen: true, openingHours: "04:30-23:00" },
      { id: "e3", name: "到达出口A", lng: 116.603, lat: 40.070, type: "secondary", isOpen: true },
      { id: "e4", name: "到达出口B", lng: 116.608, lat: 40.069, type: "secondary", isOpen: true },
      { id: "e5", name: "员工通道", lng: 116.595, lat: 40.078, type: "pedestrian", isOpen: false },
    ],
    enclosureLevel: 5,
    hasPerimeterWall: true,
    accessRestriction: "full",
    builtYear: 2008,
    dailyFootfall: 200000,
    tags: ["交通", "封闭式", "安检", "管控严格"],
  },
  {
    id: "olympic-forest-park",
    name: "奥林匹克森林公园",
    category: "open",
    type: "park",
    typeLabel: "森林公园",
    shape: "polygon",
    city: "北京",
    description: "大型城市森林公园，多个入口，大部分区域免费开放，仅部分场馆收费。",
    areaKm2: 6.8,
    center: [116.3956, 40.0272],
    boundary: [
      [116.380, 40.042],
      [116.412, 40.042],
      [116.410, 40.012],
      [116.382, 40.014],
    ],
    entrances: [
      { id: "e1", name: "南门", lng: 116.396, lat: 40.014, type: "main", isOpen: true, openingHours: "06:00-21:00" },
      { id: "e2", name: "北门", lng: 116.398, lat: 40.042, type: "main", isOpen: true, openingHours: "06:00-21:00" },
      { id: "e3", name: "东门", lng: 116.412, lat: 40.028, type: "secondary", isOpen: true, openingHours: "06:00-21:00" },
      { id: "e4", name: "西门", lng: 116.380, lat: 40.026, type: "secondary", isOpen: true, openingHours: "06:00-21:00" },
      { id: "e5", name: "东南门", lng: 116.408, lat: 40.016, type: "pedestrian", isOpen: true },
      { id: "e6", name: "西北门", lng: 116.385, lat: 40.038, type: "pedestrian", isOpen: true },
      { id: "e7", name: "停车场入口", lng: 116.388, lat: 40.018, type: "vehicle", isOpen: true },
    ],
    enclosureLevel: 1,
    hasPerimeterWall: false,
    accessRestriction: "none",
    builtYear: 2008,
    dailyFootfall: 45000,
    tags: ["绿地", "开放式", "跑步", "多入口"],
  },
  {
    id: "798-art-zone",
    name: "798艺术区",
    category: "open",
    type: "block",
    typeLabel: "文创园区",
    shape: "polygon",
    city: "北京",
    description: "由工厂改造的艺术园区，街区式布局，公共道路开放，部分画廊需购票。",
    areaKm2: 0.65,
    center: [116.4956, 39.9872],
    boundary: [
      [116.488, 39.992],
      [116.503, 39.992],
      [116.502, 39.982],
      [116.489, 39.983],
    ],
    entrances: [
      { id: "e1", name: "大山子路口（东）", lng: 116.503, lat: 39.987, type: "main", isOpen: true },
      { id: "e2", name: "酒仙桥路（西）", lng: 116.488, lat: 39.988, type: "main", isOpen: true },
      { id: "e3", name: "万红路（北）", lng: 116.495, lat: 39.992, type: "pedestrian", isOpen: true },
      { id: "e4", name: "南侧入口", lng: 116.496, lat: 39.982, type: "pedestrian", isOpen: true },
    ],
    enclosureLevel: 0,
    hasPerimeterWall: false,
    accessRestriction: "none",
    builtYear: 2002,
    dailyFootfall: 25000,
    tags: ["艺术", "开放式", "街区制"],
  },
  {
    id: "fuxing-park",
    name: "复兴公园",
    category: "open",
    type: "park",
    typeLabel: "城市公园",
    shape: "polygon",
    city: "上海",
    description: "上海老牌公园，多入口开放，法式园林风格，免费对公众开放。",
    areaKm2: 0.08,
    center: [121.4656, 31.2172],
    boundary: [
      [121.463, 31.219],
      [121.468, 31.219],
      [121.468, 31.215],
      [121.463, 31.215],
    ],
    entrances: [
      { id: "e1", name: "南门", lng: 121.4655, lat: 31.215, type: "main", isOpen: true, openingHours: "06:00-21:00" },
      { id: "e2", name: "北门", lng: 121.465, lat: 31.219, type: "main", isOpen: true, openingHours: "06:00-21:00" },
      { id: "e3", name: "东门", lng: 121.468, lat: 31.217, type: "secondary", isOpen: true },
      { id: "e4", name: "西门", lng: 121.463, lat: 31.217, type: "secondary", isOpen: true },
    ],
    enclosureLevel: 1,
    hasPerimeterWall: false,
    accessRestriction: "none",
    builtYear: 1909,
    dailyFootfall: 8000,
    tags: ["历史", "开放式", "免费"],
  },
  {
    id: "xintiandi",
    name: "上海新天地",
    category: "open",
    type: "block",
    typeLabel: "开放街区",
    shape: "polygon",
    city: "上海",
    description: "石库门改造的开放式商业街区，多条步行街纵横，可自由穿行。",
    areaKm2: 0.06,
    center: [121.4756, 31.2272],
    boundary: [
      [121.473, 31.229],
      [121.478, 31.229],
      [121.478, 31.225],
      [121.473, 31.225],
    ],
    entrances: [
      { id: "e1", name: "太仓路入口", lng: 121.475, lat: 31.225, type: "main", isOpen: true },
      { id: "e2", name: "马当路入口", lng: 121.478, lat: 31.227, type: "main", isOpen: true },
      { id: "e3", name: "黄陂南路入口", lng: 121.473, lat: 31.227, type: "pedestrian", isOpen: true },
      { id: "e4", name: "北侧入口", lng: 121.476, lat: 31.229, type: "pedestrian", isOpen: true },
    ],
    enclosureLevel: 0,
    hasPerimeterWall: false,
    accessRestriction: "none",
    builtYear: 2001,
    dailyFootfall: 50000,
    tags: ["商业", "开放式", "历史建筑"],
  },
  {
    id: "changan-avenue-greenbelt",
    name: "长安街沿线绿带",
    category: "open",
    type: "road-greenbelt",
    typeLabel: "道路绿化带",
    shape: "linear",
    city: "北京",
    description: "长安街两侧的行道树绿带与路侧绿带，东西走向绵延数十公里，是北京最具代表性的线性开放空间。绿带随道路自然延伸，无物理边界，行人可随时进入。",
    areaKm2: 0.85,
    center: [116.4075, 39.9087],
    boundary: [
      [116.360, 39.910],
      [116.460, 39.908],
      [116.460, 39.907],
      [116.360, 39.909],
    ],
    entrances: [
      { id: "e1", name: "西单段入口", lng: 116.375, lat: 39.909, type: "pedestrian", isOpen: true },
      { id: "e2", name: "天安门段入口", lng: 116.397, lat: 39.9085, type: "pedestrian", isOpen: true },
      { id: "e3", name: "王府井段入口", lng: 116.410, lat: 39.908, type: "pedestrian", isOpen: true },
      { id: "e4", name: "建国门段入口", lng: 116.435, lat: 39.9075, type: "pedestrian", isOpen: true },
      { id: "e5", name: "国贸段入口", lng: 116.455, lat: 39.907, type: "pedestrian", isOpen: true },
    ],
    enclosureLevel: 0,
    hasPerimeterWall: false,
    accessRestriction: "none",
    builtYear: 1959,
    dailyFootfall: 150000,
    tags: ["线性空间", "道路绿化", "开放式", "无边界"],
    lengthKm: 12.5,
    avgWidthM: 68,
    greenbeltSubtype: "both-sides",
    startPoint: "复兴门",
    endPoint: "大望路",
    connectedAreas: ["天安门广场", "王府井步行街"],
  },
  {
    id: "tonghui-riverside",
    name: "通惠河滨水绿道",
    category: "open",
    type: "riverside",
    typeLabel: "滨河绿道",
    shape: "linear",
    city: "北京",
    description: "沿通惠河两岸修建的滨水绿道，线性开放空间，连接多个城市公园。设有步行道和骑行道，24小时开放，无物理阻隔。",
    areaKm2: 0.52,
    center: [116.475, 39.905],
    boundary: [
      [116.420, 39.912],
      [116.510, 39.898],
      [116.510, 39.895],
      [116.420, 39.909],
    ],
    entrances: [
      { id: "e1", name: "国贸桥入口", lng: 116.458, lat: 39.907, type: "main", isOpen: true },
      { id: "e2", name: "大望路入口", lng: 116.472, lat: 39.903, type: "main", isOpen: true },
      { id: "e3", name: "四惠桥入口", lng: 116.485, lat: 39.900, type: "secondary", isOpen: true },
      { id: "e4", name: "高碑店入口", lng: 116.502, lat: 39.896, type: "secondary", isOpen: true },
      { id: "e5", name: "永安里入口", lng: 116.442, lat: 39.910, type: "pedestrian", isOpen: true },
    ],
    enclosureLevel: 0,
    hasPerimeterWall: false,
    accessRestriction: "none",
    builtYear: 2018,
    dailyFootfall: 25000,
    tags: ["线性空间", "滨水", "绿道", "开放式"],
    lengthKm: 8.5,
    avgWidthM: 61,
    startPoint: "建国门",
    endPoint: "高碑店",
    connectedAreas: ["朝阳公园", "奥林匹克森林公园"],
  },
  {
    id: "wangfujing-pedestrian",
    name: "王府井步行街",
    category: "open",
    type: "pedestrian-street",
    typeLabel: "步行街",
    shape: "linear",
    city: "北京",
    description: "北京最著名的商业步行街，南北走向，完全步行化。两端及中间多条胡同可进出，属于典型的线性开放商业空间。",
    areaKm2: 0.045,
    center: [116.4105, 39.9145],
    boundary: [
      [116.409, 39.920],
      [116.412, 39.920],
      [116.412, 39.909],
      [116.409, 39.909],
    ],
    entrances: [
      { id: "e1", name: "北入口（五四大街）", lng: 116.4105, lat: 39.920, type: "main", isOpen: true },
      { id: "e2", name: "南入口（东长安街）", lng: 116.4105, lat: 39.909, type: "main", isOpen: true },
      { id: "e3", name: "东安门大街入口", lng: 116.4115, lat: 39.915, type: "secondary", isOpen: true },
      { id: "e4", name: "灯市口入口", lng: 116.410, lat: 39.917, type: "secondary", isOpen: true },
      { id: "e6", name: "霞公府入口", lng: 116.4095, lat: 39.912, type: "pedestrian", isOpen: true },
    ],
    enclosureLevel: 0,
    hasPerimeterWall: false,
    accessRestriction: "none",
    builtYear: 1999,
    dailyFootfall: 200000,
    tags: ["线性空间", "商业", "步行街", "开放式"],
    lengthKm: 1.2,
    avgWidthM: 38,
    startPoint: "五四大街",
    endPoint: "东长安街",
    connectedAreas: ["天安门广场", "故宫"],
  },
  {
    id: "north-3rd-ring-greenbelt",
    name: "北三环中路绿带",
    category: "open",
    type: "road-greenbelt",
    typeLabel: "道路分隔绿带",
    shape: "linear",
    city: "北京",
    description: "北三环中路的中间分车绿带与两侧行道树绿带，东西走向。以乔木和灌木为主，形成连续的绿色廊道，具有降噪防尘功能。",
    areaKm2: 0.28,
    center: [116.375, 39.968],
    boundary: [
      [116.340, 39.969],
      [116.410, 39.967],
      [116.410, 39.966],
      [116.340, 39.968],
    ],
    entrances: [
      { id: "e1", name: "蓟门桥段", lng: 116.350, lat: 39.9685, type: "pedestrian", isOpen: true },
      { id: "e2", name: "联想桥段", lng: 116.365, lat: 39.968, type: "pedestrian", isOpen: true },
      { id: "e3", name: "学院桥段", lng: 116.378, lat: 39.9675, type: "pedestrian", isOpen: true },
      { id: "e4", name: "北太平桥段", lng: 116.392, lat: 39.967, type: "pedestrian", isOpen: true },
      { id: "e5", name: "马甸桥段", lng: 116.405, lat: 39.9665, type: "pedestrian", isOpen: true },
    ],
    enclosureLevel: 0,
    hasPerimeterWall: false,
    accessRestriction: "none",
    builtYear: 1994,
    dailyFootfall: 30000,
    tags: ["线性空间", "道路绿化", "分车绿带", "生态廊道"],
    lengthKm: 7.0,
    avgWidthM: 40,
    greenbeltSubtype: "median",
    startPoint: "蓟门桥",
    endPoint: "马甸桥",
  },
  {
    id: "wenyuhe-green-corridor",
    name: "温榆河生态走廊",
    category: "open",
    type: "green-corridor",
    typeLabel: "生态廊道",
    shape: "linear",
    city: "北京",
    description: "温榆河沿岸的大型生态廊道，北京城市总体规划中的重要绿色基础设施。集防洪、生态、休闲于一体，南北蜿蜒数十公里。",
    areaKm2: 12.5,
    center: [116.550, 40.050],
    boundary: [
      [116.500, 40.100],
      [116.600, 39.980],
      [116.605, 39.982],
      [116.505, 40.102],
    ],
    entrances: [
      { id: "e1", name: "北段入口", lng: 116.520, lat: 40.090, type: "main", isOpen: true, openingHours: "全天" },
      { id: "e2", name: "中段入口", lng: 116.550, lat: 40.050, type: "main", isOpen: true, openingHours: "全天" },
      { id: "e3", name: "南段入口", lng: 116.580, lat: 40.010, type: "secondary", isOpen: true },
      { id: "e4", name: "东侧入口", lng: 116.595, lat: 40.035, type: "vehicle", isOpen: true },
      { id: "e5", name: "西侧入口", lng: 116.510, lat: 40.065, type: "pedestrian", isOpen: true },
    ],
    enclosureLevel: 0,
    hasPerimeterWall: false,
    accessRestriction: "none",
    builtYear: 2020,
    dailyFootfall: 15000,
    tags: ["线性空间", "生态廊道", "滨水", "开放式"],
    lengthKm: 22.0,
    avgWidthM: 568,
    startPoint: "昌平沙河",
    endPoint: "通州北关",
    connectedAreas: ["奥林匹克森林公园"],
  },
  {
    id: "nanjing-west-road-pedestrian",
    name: "南京西路商业街",
    category: "open",
    type: "pedestrian-street",
    typeLabel: "步行街",
    shape: "linear",
    city: "上海",
    description: "上海最繁华的商业街之一，东西走向，部分时段步行化。沿线商场林立，两端及多条支路可自由进出，形成线性商业开放空间。",
    areaKm2: 0.07,
    center: [121.455, 31.232],
    boundary: [
      [121.440, 31.234],
      [121.470, 31.230],
      [121.470, 31.229],
      [121.440, 31.233],
    ],
    entrances: [
      { id: "e1", name: "西入口（静安寺）", lng: 121.445, lat: 31.233, type: "main", isOpen: true },
      { id: "e2", name: "东入口（人民广场）", lng: 121.468, lat: 31.230, type: "main", isOpen: true },
      { id: "e3", name: "陕西路口", lng: 121.455, lat: 31.232, type: "secondary", isOpen: true },
      { id: "e4", name: "石门路口", lng: 121.462, lat: 31.231, type: "secondary", isOpen: true },
    ],
    enclosureLevel: 0,
    hasPerimeterWall: false,
    accessRestriction: "none",
    builtYear: 1995,
    dailyFootfall: 300000,
    tags: ["线性空间", "商业", "步行街", "开放式"],
    lengthKm: 2.5,
    avgWidthM: 28,
    startPoint: "静安寺",
    endPoint: "人民广场",
    connectedAreas: ["人民广场", "静安公园"],
  },
  {
    id: "huangpu-riverside",
    name: "黄浦江滨江绿道",
    category: "open",
    type: "riverside",
    typeLabel: "滨江绿道",
    shape: "linear",
    city: "上海",
    description: "黄浦江两岸贯通的滨江绿道，浦东浦西各数十公里。集休闲、健身、观光于一体，24小时开放，多个人口可进入，是上海最重要的线性公共空间。",
    areaKm2: 1.8,
    center: [121.490, 31.235],
    boundary: [
      [121.480, 31.250],
      [121.500, 31.220],
      [121.502, 31.221],
      [121.482, 31.251],
    ],
    entrances: [
      { id: "e1", name: "外滩段入口", lng: 121.490, lat: 31.238, type: "main", isOpen: true },
      { id: "e2", name: "陆家嘴段入口", lng: 121.495, lat: 31.232, type: "main", isOpen: true },
      { id: "e3", name: "南浦大桥段入口", lng: 121.492, lat: 31.218, type: "secondary", isOpen: true },
      { id: "e4", name: "杨浦大桥段入口", lng: 121.485, lat: 31.250, type: "secondary", isOpen: true },
      { id: "e5", name: "世博段入口", lng: 121.488, lat: 31.208, type: "pedestrian", isOpen: true },
    ],
    enclosureLevel: 0,
    hasPerimeterWall: false,
    accessRestriction: "none",
    builtYear: 2017,
    dailyFootfall: 80000,
    tags: ["线性空间", "滨江", "绿道", "开放式"],
    lengthKm: 15.0,
    avgWidthM: 120,
    startPoint: "杨浦大桥",
    endPoint: "徐浦大桥",
    connectedAreas: ["外滩", "陆家嘴", "世博园区"],
  },
  {
    id: "elevated-road-protective-belt",
    name: "西二环防护林带",
    category: "open",
    type: "protective-belt",
    typeLabel: "防护绿带",
    shape: "linear",
    city: "北京",
    description: "西二环外侧的防护林带，南北走向，主要功能为降噪、防尘、改善城市微气候。以乔木密植为主，设有步行小径，可进入但空间形态狭长。",
    areaKm2: 0.42,
    center: [116.345, 39.925],
    boundary: [
      [116.342, 39.950],
      [116.348, 39.950],
      [116.348, 39.900],
      [116.342, 39.900],
    ],
    entrances: [
      { id: "e1", name: "北端入口", lng: 116.345, lat: 39.948, type: "secondary", isOpen: true },
      { id: "e2", name: "阜成门段入口", lng: 116.344, lat: 39.932, type: "pedestrian", isOpen: true },
      { id: "e3", name: "月坛段入口", lng: 116.346, lat: 39.922, type: "pedestrian", isOpen: true },
      { id: "e4", name: "南端入口", lng: 116.345, lat: 39.902, type: "secondary", isOpen: true },
    ],
    enclosureLevel: 1,
    hasPerimeterWall: false,
    accessRestriction: "none",
    builtYear: 2003,
    dailyFootfall: 8000,
    tags: ["线性空间", "防护绿带", "生态", "开放式"],
    lengthKm: 5.5,
    avgWidthM: 76,
    startPoint: "西直门",
    endPoint: "菜户营桥",
  },
];

export function getAllAreas(): Area[] {
  return AREAS;
}

export function getAreaById(id: string): Area | undefined {
  return AREAS.find((a) => a.id === id);
}

export function getAreasByCategory(category: AreaCategory): Area[] {
  return AREAS.filter((a) => a.category === category);
}

export function getAreasByCity(city: string): Area[] {
  return AREAS.filter((a) => a.city === city);
}

export function getAreasByType(type: AreaType): Area[] {
  return AREAS.filter((a) => a.type === type);
}

export function getAreasByShape(shape: AreaShape): Area[] {
  return AREAS.filter((a) => a.shape === shape);
}

export function searchAreas(keyword: string): Area[] {
  const kw = keyword.toLowerCase();
  return AREAS.filter(
    (a) =>
      a.name.toLowerCase().includes(kw) ||
      a.description.toLowerCase().includes(kw) ||
      a.tags.some((t) => t.toLowerCase().includes(kw))
  );
}

export function getAreaStats() {
  const total = AREAS.length;
  const open = AREAS.filter((a) => a.category === "open").length;
  const enclosed = AREAS.filter((a) => a.category === "enclosed").length;
  const totalEntrances = AREAS.reduce((sum, a) => sum + a.entrances.length, 0);
  const cities = new Set(AREAS.map((a) => a.city)).size;
  const avgEnclosure =
    AREAS.reduce((sum, a) => sum + a.enclosureLevel, 0) / total;

  const polygonCount = AREAS.filter((a) => a.shape === "polygon").length;
  const linearCount = AREAS.filter((a) => a.shape === "linear").length;
  const totalLengthKm = AREAS.reduce(
    (sum, a) => sum + (a.lengthKm || 0),
    0
  );

  return {
    total,
    open,
    enclosed,
    totalEntrances,
    cities,
    avgEnclosure: avgEnclosure.toFixed(1),
    polygonCount,
    linearCount,
    totalLengthKm: totalLengthKm.toFixed(1),
  };
}
