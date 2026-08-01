/**
 * 全国省级行政区流向数据
 * 包含人口迁移、贸易、物流、高铁客流等流向示例
 * 数据性质：示例数据，基于公开报道趋势模拟生成
 */

export interface FlowItem {
  from: string;
  to: string;
  fromName: string;
  toName: string;
  fromCenter: [number, number];
  toCenter: [number, number];
  /** 流量数值 */
  value: number;
  /** 流向类型 */
  type: "migration" | "trade" | "logistics" | "hsr";
  /** 流向描述 */
  desc?: string;
}

// 全国主要省级流向（示例数据）
export const FLOWS: FlowItem[] = [
  // 人口迁移流向（春节返乡方向：发达地区→人口大省）
  { from: "44", to: "51", fromName: "广东", toName: "四川", fromCenter: [113.27, 23.13], toCenter: [104.07, 30.67], value: 320, type: "migration", desc: "广东→四川 春节返乡" },
  { from: "44", to: "42", fromName: "广东", toName: "湖北", fromCenter: [113.27, 23.13], toCenter: [114.30, 30.59], value: 280, type: "migration", desc: "广东→湖北 春节返乡" },
  { from: "44", to: "43", fromName: "广东", toName: "湖南", fromCenter: [113.27, 23.13], toCenter: [112.98, 28.20], value: 380, type: "migration", desc: "广东→湖南 春节返乡" },
  { from: "44", to: "41", fromName: "广东", toName: "河南", fromCenter: [113.27, 23.13], toCenter: [113.65, 34.76], value: 350, type: "migration", desc: "广东→河南 春节返乡" },
  { from: "44", to: "52", fromName: "广东", toName: "贵州", fromCenter: [113.27, 23.13], toCenter: [106.71, 26.57], value: 220, type: "migration", desc: "广东→贵州 春节返乡" },
  { from: "32", to: "34", fromName: "江苏", toName: "安徽", fromCenter: [118.78, 32.06], toCenter: [117.28, 31.86], value: 180, type: "migration", desc: "江苏→安徽 跨省通勤" },
  { from: "11", to: "13", fromName: "北京", toName: "河北", fromCenter: [116.41, 40.19], toCenter: [114.51, 38.05], value: 240, type: "migration", desc: "北京→河北 跨省通勤" },
  { from: "31", to: "34", fromName: "上海", toName: "安徽", fromCenter: [121.47, 31.23], toCenter: [117.28, 31.86], value: 200, type: "migration", desc: "上海→安徽 跨省通勤" },
  { from: "33", to: "34", fromName: "浙江", toName: "安徽", fromCenter: [120.15, 30.27], toCenter: [117.28, 31.86], value: 190, type: "migration", desc: "浙江→安徽 跨省通勤" },

  // 贸易流向（主要进出口港口→内陆）
  { from: "31", to: "32", fromName: "上海", toName: "江苏", fromCenter: [121.47, 31.23], toCenter: [118.78, 32.06], value: 4500, type: "trade", desc: "上海港→江苏 内贸转运" },
  { from: "44", to: "43", fromName: "广东", toName: "湖南", fromCenter: [113.27, 23.13], toCenter: [112.98, 28.20], value: 3200, type: "trade", desc: "深圳港→湖南 内陆转运" },
  { from: "33", to: "32", fromName: "浙江", toName: "江苏", fromCenter: [120.15, 30.27], toCenter: [118.78, 32.06], value: 2800, type: "trade", desc: "宁波港→江苏 内贸转运" },
  { from: "37", to: "13", fromName: "山东", toName: "河北", fromCenter: [117.00, 36.40], toCenter: [114.51, 38.05], value: 2100, type: "trade", desc: "青岛港→河北 内贸转运" },
  { from: "21", to: "13", fromName: "辽宁", toName: "河北", fromCenter: [123.43, 41.80], toCenter: [114.51, 38.05], value: 1500, type: "trade", desc: "大连港→河北 内贸转运" },

  // 物流流向（电商仓储中心→消费地）
  { from: "11", to: "13", fromName: "北京", toName: "河北", fromCenter: [116.41, 40.19], toCenter: [114.51, 38.05], value: 8500, type: "logistics", desc: "北京仓→河北配送" },
  { from: "32", to: "31", fromName: "江苏", toName: "上海", fromCenter: [118.78, 32.06], toCenter: [121.47, 31.23], value: 7800, type: "logistics", desc: "昆山仓→上海配送" },
  { from: "44", to: "45", fromName: "广东", toName: "广西", fromCenter: [113.27, 23.13], toCenter: [108.33, 22.84], value: 4200, type: "logistics", desc: "广州仓→广西配送" },
  { from: "33", to: "32", fromName: "浙江", toName: "江苏", fromCenter: [120.15, 30.27], toCenter: [118.78, 32.06], value: 6500, type: "logistics", desc: "义乌仓→江苏配送" },
  { from: "51", to: "50", fromName: "四川", toName: "重庆", fromCenter: [104.07, 30.67], toCenter: [106.55, 29.56], value: 3800, type: "logistics", desc: "成都仓→重庆配送" },

  // 高铁客流流向（主要高铁干线）
  { from: "11", to: "31", fromName: "北京", toName: "上海", fromCenter: [116.41, 40.19], toCenter: [121.47, 31.23], value: 12000, type: "hsr", desc: "京沪高铁" },
  { from: "11", to: "44", fromName: "北京", toName: "广东", fromCenter: [116.41, 40.19], toCenter: [113.27, 23.13], value: 9500, type: "hsr", desc: "京广高铁" },
  { from: "32", to: "31", fromName: "江苏", toName: "上海", fromCenter: [118.78, 32.06], toCenter: [121.47, 31.23], value: 8500, type: "hsr", desc: "沪宁高铁" },
  { from: "33", to: "31", fromName: "浙江", toName: "上海", fromCenter: [120.15, 30.27], toCenter: [121.47, 31.23], value: 7800, type: "hsr", desc: "沪杭高铁" },
  { from: "42", to: "44", fromName: "湖北", toName: "广东", fromCenter: [114.30, 30.59], toCenter: [113.27, 23.13], value: 6500, type: "hsr", desc: "武广高铁" },
  { from: "61", to: "42", fromName: "陕西", toName: "湖北", fromCenter: [108.95, 34.27], toCenter: [114.30, 30.59], value: 4200, type: "hsr", desc: "西武高铁" },
  { from: "51", to: "42", fromName: "四川", toName: "湖北", fromCenter: [104.07, 30.67], toCenter: [114.30, 30.59], value: 3800, type: "hsr", desc: "汉蓉高铁" },
  { from: "44", to: "45", fromName: "广东", toName: "广西", fromCenter: [113.27, 23.13], toCenter: [108.33, 22.84], value: 3500, type: "hsr", desc: "南广高铁" },
];

export const FLOW_TYPES: Array<{ type: FlowItem["type"]; label: string; color: string }> = [
  { type: "migration", label: "人口迁移", color: "#6b7280" },
  { type: "trade", label: "贸易流向", color: "#374151" },
  { type: "logistics", label: "物流配送", color: "#9ca3af" },
  { type: "hsr", label: "高铁客流", color: "#1f2937" },
];

/** 按类型筛选流向 */
export function getFlowsByType(type: FlowItem["type"] | "all"): FlowItem[] {
  if (type === "all") return FLOWS;
  return FLOWS.filter((f) => f.type === type);
}
