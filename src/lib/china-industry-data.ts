/**
 * 全国行业分布数据
 * 数据性质：示例数据，基于公开产业聚集区信息整理
 */

export interface IndustryCluster {
  id: string;
  name: string;
  provinceCode: string;
  provinceName: string;
  center: [number, number];
  /** 主导产业类型 */
  type: IndustryType;
  /** 园区级别 */
  level: "国家级" | "省级" | "市级";
  /** 企业数量（家） */
  enterprises: number;
  /** 年产值（亿元） */
  output: number;
  /** 就业人数（万人） */
  employees: number;
  desc: string;
}

export type IndustryType =
  | "manufacturing" | "electronics" | "automotive" | "chemical"
  | "finance" | "internet" | "biotech" | "energy"
  | "agriculture" | "logistics" | "tourism" | "aerospace";

export const INDUSTRY_TYPES: Array<{ type: IndustryType; label: string; shade: number }> = [
  { type: "manufacturing", label: "装备制造", shade: 900 },
  { type: "electronics", label: "电子信息", shade: 700 },
  { type: "automotive", label: "汽车工业", shade: 600 },
  { type: "chemical", label: "化工材料", shade: 500 },
  { type: "finance", label: "金融商务", shade: 400 },
  { type: "internet", label: "互联网", shade: 800 },
  { type: "biotech", label: "生物医药", shade: 300 },
  { type: "energy", label: "能源电力", shade: 700 },
  { type: "agriculture", label: "现代农业", shade: 400 },
  { type: "logistics", label: "现代物流", shade: 500 },
  { type: "tourism", label: "文化旅游", shade: 300 },
  { type: "aerospace", label: "航空航天", shade: 900 },
];

export const INDUSTRY_CLUSTERS: IndustryCluster[] = [
  // 长三角装备制造
  { id: "ic1", name: "上海装备制造业集聚区", provinceCode: "31", provinceName: "上海", center: [121.47, 31.23], type: "manufacturing", level: "国家级", enterprises: 3200, output: 8500, employees: 85, desc: "高端装备、船舶、电力设备" },
  { id: "ic2", name: "苏州工业园区", provinceCode: "32", provinceName: "江苏", center: [120.62, 31.32], type: "electronics", level: "国家级", enterprises: 8500, output: 6200, employees: 78, desc: "电子信息、精密机械" },
  { id: "ic3", name: "无锡物联网产业园", provinceCode: "32", provinceName: "江苏", center: [120.30, 31.57], type: "internet", level: "国家级", enterprises: 2100, output: 2800, employees: 28, desc: "物联网、传感器、智慧城市" },
  { id: "ic4", name: "杭州未来科技城", provinceCode: "33", provinceName: "浙江", center: [120.15, 30.27], type: "internet", level: "国家级", enterprises: 12000, output: 4500, employees: 45, desc: "阿里巴巴、人工智能、电商" },
  { id: "ic5", name: "宁波石化产业基地", provinceCode: "33", provinceName: "浙江", center: [121.55, 29.87], type: "chemical", level: "国家级", enterprises: 380, output: 3200, employees: 18, desc: "炼化一体化、新材料" },
  // 珠三角电子
  { id: "ic6", name: "深圳南山科技园", provinceCode: "44", provinceName: "广东", center: [113.93, 22.53], type: "internet", level: "国家级", enterprises: 9500, output: 8800, employees: 65, desc: "腾讯、华为、中兴通讯" },
  { id: "ic7", name: "东莞松山湖", provinceCode: "44", provinceName: "广东", center: [113.74, 23.05], type: "electronics", level: "国家级", enterprises: 6800, output: 5200, employees: 52, desc: "华为终端、智能制造" },
  { id: "ic8", name: "广州汽车产业基地", provinceCode: "44", provinceName: "广东", center: [113.27, 23.13], type: "automotive", level: "国家级", enterprises: 420, output: 4500, employees: 32, desc: "广汽集团、新能源汽车" },
  { id: "ic9", name: "佛山家电产业园", provinceCode: "44", provinceName: "广东", center: [113.12, 23.02], type: "manufacturing", level: "省级", enterprises: 2800, output: 3800, employees: 38, desc: "美的、格兰仕、智能家电" },
  // 京津冀
  { id: "ic10", name: "北京中关村", provinceCode: "11", provinceName: "北京", center: [116.31, 39.98], type: "internet", level: "国家级", enterprises: 22000, output: 8500, employees: 180, desc: "中国硅谷、人工智能、集成电路" },
  { id: "ic11", name: "北京经济技术开发区", provinceCode: "11", provinceName: "北京", center: [116.50, 39.80], type: "biotech", level: "国家级", enterprises: 3500, output: 2800, employees: 25, desc: "生物医药、医疗器械" },
  { id: "ic12", name: "天津滨海新区", provinceCode: "12", provinceName: "天津", center: [117.70, 39.02], type: "manufacturing", level: "国家级", enterprises: 5800, output: 6800, employees: 62, desc: "航空航天、装备制造" },
  { id: "ic13", name: "保定汽车产业园", provinceCode: "13", provinceName: "河北", center: [115.46, 38.87], type: "automotive", level: "省级", enterprises: 320, output: 1500, employees: 15, desc: "长城汽车总部" },
  // 西部
  { id: "ic14", name: "成都高新区", provinceCode: "51", provinceName: "四川", center: [104.07, 30.67], type: "internet", level: "国家级", enterprises: 8500, output: 3200, employees: 42, desc: "游戏、软件服务" },
  { id: "ic15", name: "重庆两江新区", provinceCode: "50", provinceName: "重庆", center: [106.55, 29.56], type: "automotive", level: "国家级", enterprises: 2200, output: 4500, employees: 38, desc: "长安汽车、电子制造" },
  { id: "ic16", name: "西安高新技术产业开发区", provinceCode: "61", provinceName: "陕西", center: [108.95, 34.27], type: "aerospace", level: "国家级", enterprises: 4500, output: 2800, employees: 36, desc: "航空航天、半导体" },
  { id: "ic17", name: "贵阳大数据产业基地", provinceCode: "52", provinceName: "贵州", center: [106.71, 26.57], type: "internet", level: "国家级", enterprises: 3500, output: 1800, employees: 18, desc: "数据中心、云计算" },
  // 中部
  { id: "ic18", name: "武汉光谷", provinceCode: "42", provinceName: "湖北", center: [114.40, 30.50], type: "electronics", level: "国家级", enterprises: 8500, output: 5500, employees: 65, desc: "光电子、生物医药" },
  { id: "ic19", name: "郑州航空港区", provinceCode: "41", provinceName: "河南", center: [113.65, 34.76], type: "logistics", level: "国家级", enterprises: 1800, output: 2200, employees: 28, desc: "航空物流、跨境电商" },
  { id: "ic20", name: "长沙工程机械基地", provinceCode: "43", provinceName: "湖南", center: [112.98, 28.20], type: "manufacturing", level: "国家级", enterprises: 850, output: 2200, employees: 22, desc: "三一重工、中联重科" },
  { id: "ic21", name: "合肥集成电路产业园", provinceCode: "34", provinceName: "安徽", center: [117.28, 31.86], type: "electronics", level: "国家级", enterprises: 3200, output: 1800, employees: 22, desc: "长鑫存储、晶合集成" },
  // 东北
  { id: "ic22", name: "大连软件园", provinceCode: "21", provinceName: "辽宁", center: [121.61, 38.91], type: "internet", level: "国家级", enterprises: 2200, output: 1800, employees: 22, desc: "对日外包、BPO" },
  { id: "ic23", name: "长春一汽集团", provinceCode: "22", provinceName: "吉林", center: [125.32, 43.82], type: "automotive", level: "国家级", enterprises: 280, output: 4500, employees: 32, desc: "中国一汽、红旗" },
  { id: "ic24", name: "大庆油田", provinceCode: "23", provinceName: "黑龙江", center: [125.10, 46.59], type: "energy", level: "国家级", enterprises: 80, output: 2200, employees: 18, desc: "石油开采、炼化" },
  // 西部能源
  { id: "ic25", name: "鄂尔多斯能源基地", provinceCode: "15", provinceName: "内蒙古", center: [109.99, 39.82], type: "energy", level: "国家级", enterprises: 320, output: 3800, employees: 22, desc: "煤炭、天然气" },
  { id: "ic26", name: "克拉玛依石油基地", provinceCode: "65", provinceName: "新疆", center: [84.87, 45.59], type: "energy", level: "国家级", enterprises: 120, output: 1500, employees: 12, desc: "石油开采、炼化" },
  { id: "ic27", name: "银川经开区", provinceCode: "64", provinceName: "宁夏", center: [106.17, 37.32], type: "chemical", level: "省级", enterprises: 380, output: 850, employees: 8, desc: "煤化工、新材料" },
  // 农业
  { id: "ic28", name: "山东寿光蔬菜基地", provinceCode: "37", provinceName: "山东", center: [118.79, 36.86], type: "agriculture", level: "省级", enterprises: 1200, output: 220, employees: 12, desc: "设施蔬菜、农业现代化" },
  { id: "ic29", name: "新疆棉纺织基地", provinceCode: "65", provinceName: "新疆", center: [87.62, 43.79], type: "agriculture", level: "省级", enterprises: 580, output: 850, employees: 18, desc: "棉花、纺织" },
  // 旅游
  { id: "ic30", name: "海南国际旅游岛", provinceCode: "46", provinceName: "海南", center: [110.20, 20.04], type: "tourism", level: "国家级", enterprises: 2800, output: 850, employees: 18, desc: "免税购物、滨海度假" },
  { id: "ic31", name: "云南文旅基地", provinceCode: "53", provinceName: "云南", center: [102.71, 25.04], type: "tourism", level: "省级", enterprises: 1800, output: 580, employees: 14, desc: "民族文化、生态旅游" },
  // 金融
  { id: "ic32", name: "上海陆家嘴金融区", provinceCode: "31", provinceName: "上海", center: [121.50, 31.24], type: "finance", level: "国家级", enterprises: 8500, output: 8500, employees: 42, desc: "中国金融中心" },
  { id: "ic33", name: "深圳前海", provinceCode: "44", provinceName: "广东", center: [113.90, 22.55], type: "finance", level: "国家级", enterprises: 12000, output: 2200, employees: 32, desc: "深港现代服务业合作区" },
];

/** 按省份统计产业园区数量 */
export function getIndustryCountByProvince(): Array<{ provinceCode: string; count: number; output: number }> {
  const map: Record<string, { count: number; output: number }> = {};
  INDUSTRY_CLUSTERS.forEach((c) => {
    if (!map[c.provinceCode]) map[c.provinceCode] = { count: 0, output: 0 };
    map[c.provinceCode].count++;
    map[c.provinceCode].output += c.output;
  });
  return Object.entries(map).map(([provinceCode, v]) => ({ provinceCode, ...v }));
}

/** 按产业类型统计 */
export function getIndustryCountByType(): Array<{ type: IndustryType; count: number; output: number; employees: number }> {
  const map: Record<string, { count: number; output: number; employees: number }> = {};
  INDUSTRY_CLUSTERS.forEach((c) => {
    if (!map[c.type]) map[c.type] = { count: 0, output: 0, employees: 0 };
    map[c.type].count++;
    map[c.type].output += c.output;
    map[c.type].employees += c.employees;
  });
  return Object.entries(map).map(([type, v]) => ({ type: type as IndustryType, ...v }));
}
