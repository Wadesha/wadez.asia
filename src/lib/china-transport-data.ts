/**
 * 全国交通网络数据
 * 包含高铁、机场、港口、高速公路示例数据
 * 数据性质：示例数据
 */

export interface TransportNode {
  id: string;
  name: string;
  provinceCode: string;
  provinceName: string;
  center: [number, number];
  type: "hsr" | "airport" | "port" | "hub";
  level: "国际" | "国家" | "区域" | "地方";
  /** 年吞吐量/客流量（万人/万吨） */
  throughput: number;
  desc: string;
}

export interface TransportLine {
  id: string;
  name: string;
  type: "hsr" | "expressway";
  /** 途经节点坐标 */
  path: Array<[number, number]>;
  /** 途经城市名 */
  cities: string[];
  /** 全长（公里） */
  length: number;
  /** 设计时速（公里/小时） */
  speed: number;
  desc: string;
}

// 高铁干线
export const HSR_LINES: TransportLine[] = [
  { id: "h1", name: "京沪高铁", type: "hsr", path: [[116.41,40.19],[117.20,39.13],[118.78,32.06],[121.47,31.23]], cities: ["北京","天津","南京","上海"], length: 1318, speed: 350, desc: "北京-上海,中国最繁忙高铁" },
  { id: "h2", name: "京广高铁", type: "hsr", path: [[116.41,40.19],[114.30,30.59],[113.27,23.13]], cities: ["北京","武汉","广州"], length: 2298, speed: 350, desc: "北京-广州,纵贯南北" },
  { id: "h3", name: "京哈高铁", type: "hsr", path: [[116.41,40.19],[123.43,41.80],[125.32,43.82],[126.66,45.74]], cities: ["北京","沈阳","长春","哈尔滨"], length: 1243, speed: 350, desc: "北京-哈尔滨,东北动脉" },
  { id: "h4", name: "沪昆高铁", type: "hsr", path: [[121.47,31.23],[120.15,30.27],[114.30,30.59],[109.42,24.33],[102.71,25.04]], cities: ["上海","杭州","武汉","柳州","昆明"], length: 2252, speed: 350, desc: "上海-昆明,横贯东西" },
  { id: "h5", name: "沪汉蓉高铁", type: "hsr", path: [[121.47,31.23],[114.30,30.59],[104.07,30.67],[106.55,29.56]], cities: ["上海","武汉","成都","重庆"], length: 2078, speed: 250, desc: "沿江通道" },
  { id: "h6", name: "徐兰高铁", type: "hsr", path: [[117.18,34.26],[108.95,34.27],[103.82,36.06]], cities: ["徐州","西安","兰州"], length: 1079, speed: 350, desc: "陆桥通道" },
  { id: "h7", name: "杭福深高铁", type: "hsr", path: [[120.15,30.27],[119.30,26.08],[118.09,24.48],[113.27,23.13],[114.06,22.55]], cities: ["杭州","福州","厦门","广州","深圳"], length: 1495, speed: 250, desc: "东南沿海" },
  { id: "h8", name: "青太高铁", type: "hsr", path: [[120.38,36.07],[117.00,36.40],[112.55,37.87]], cities: ["青岛","济南","太原"], length: 873, speed: 350, desc: "青岛-太原" },
];

// 主要机场
export const AIRPORTS: TransportNode[] = [
  { id: "ap1", name: "北京首都国际机场", provinceCode: "11", provinceName: "北京", center: [116.58, 40.08], type: "airport", level: "国际", throughput: 10001, desc: "中国第一大机场" },
  { id: "ap2", name: "上海浦东国际机场", provinceCode: "31", provinceName: "上海", center: [121.81, 31.14], type: "airport", level: "国际", throughput: 7615, desc: "国际航空枢纽" },
  { id: "ap3", name: "广州白云国际机场", provinceCode: "44", provinceName: "广东", center: [113.30, 23.39], type: "airport", level: "国际", throughput: 7338, desc: "南方航空枢纽" },
  { id: "ap4", name: "成都双流国际机场", provinceCode: "51", provinceName: "四川", center: [103.95, 30.58], type: "airport", level: "国际", throughput: 5585, desc: "西部航空枢纽" },
  { id: "ap5", name: "深圳宝安国际机场", provinceCode: "44", provinceName: "广东", center: [113.81, 22.64], type: "airport", level: "国际", throughput: 5293, desc: "珠三角第二大机场" },
  { id: "ap6", name: "昆明长水国际机场", provinceCode: "53", provinceName: "云南", center: [102.93, 25.10], type: "airport", level: "国际", throughput: 4808, desc: "面向东南亚枢纽" },
  { id: "ap7", name: "西安咸阳国际机场", provinceCode: "61", provinceName: "陕西", center: [108.75, 34.45], type: "airport", level: "国际", throughput: 4465, desc: "西北枢纽" },
  { id: "ap8", name: "重庆江北国际机场", provinceCode: "50", provinceName: "重庆", center: [106.64, 29.72], type: "airport", level: "国际", throughput: 4478, desc: "西南枢纽" },
  { id: "ap9", name: "杭州萧山国际机场", provinceCode: "33", provinceName: "浙江", center: [120.43, 30.24], type: "airport", level: "国际", throughput: 4011, desc: "长三角货运枢纽" },
  { id: "ap10", name: "南京禄口国际机场", provinceCode: "32", provinceName: "江苏", center: [118.86, 31.74], type: "airport", level: "国际", throughput: 3058, desc: "长三角第二大" },
];

// 主要港口
export const PORTS: TransportNode[] = [
  { id: "pt1", name: "上海港", provinceCode: "31", provinceName: "上海", center: [121.50, 31.24], type: "port", level: "国际", throughput: 4730, desc: "世界第一大集装箱港" },
  { id: "pt2", name: "宁波舟山港", provinceCode: "33", provinceName: "浙江", center: [122.10, 29.87], type: "port", level: "国际", throughput: 1251, desc: "货物吞吐量世界第一" },
  { id: "pt3", name: "深圳港", provinceCode: "44", provinceName: "广东", center: [113.92, 22.55], type: "port", level: "国际", throughput: 3004, desc: "华南集装箱枢纽" },
  { id: "pt4", name: "广州港", provinceCode: "44", provinceName: "广东", center: [113.50, 23.10], type: "port", level: "国际", throughput: 2460, desc: "华南综合枢纽" },
  { id: "pt5", name: "青岛港", provinceCode: "37", provinceName: "山东", center: [120.38, 36.07], type: "port", level: "国际", throughput: 2600, desc: "北方集装箱枢纽" },
  { id: "pt6", name: "天津港", provinceCode: "12", provinceName: "天津", center: [117.78, 39.02], type: "port", level: "国际", throughput: 530, desc: "北方第一大港" },
  { id: "pt7", name: "大连港", provinceCode: "21", provinceName: "辽宁", center: [121.61, 38.91], type: "port", level: "国际", throughput: 1120, desc: "东北枢纽" },
  { id: "pt8", name: "厦门港", provinceCode: "35", provinceName: "福建", center: [118.09, 24.48], type: "port", level: "国际", throughput: 1147, desc: "海西枢纽" },
  { id: "pt9", name: "苏州港", provinceCode: "32", provinceName: "江苏", center: [120.62, 31.32], type: "port", level: "国家", throughput: 588, desc: "内河第一大港" },
  { id: "pt10", name: "北部湾港", provinceCode: "45", provinceName: "广西", center: [108.33, 22.84], type: "port", level: "国家", throughput: 468, desc: "面向东盟枢纽" },
];

// 全国综合交通枢纽
export const TRANSPORT_HUBS: TransportNode[] = [
  ...AIRPORTS.slice(0, 8).map((a) => ({ ...a, type: "hub" as const })),
  ...PORTS.slice(0, 6).map((p) => ({ ...p, type: "hub" as const })),
];

/** 高铁+机场+港口汇总 */
export const ALL_NODES: TransportNode[] = [
  ...AIRPORTS,
  ...PORTS.map((p) => ({ ...p, type: "port" as const })),
  ...HSR_LINES.flatMap((line) =>
    line.path.map((p, i) => ({
      id: `hsr-${line.id}-${i}`,
      name: line.cities[i] + "站",
      provinceCode: "",
      provinceName: "",
      center: p,
      type: "hsr" as const,
      level: "国家" as const,
      throughput: 0,
      desc: line.name,
    }))
  ),
];

export const TRANSPORT_TYPES: Array<{ type: TransportNode["type"]; label: string; shade: number }> = [
  { type: "hsr", label: "高铁站", shade: 900 },
  { type: "airport", label: "机场", shade: 700 },
  { type: "port", label: "港口", shade: 500 },
  { type: "hub", label: "综合枢纽", shade: 800 },
];
