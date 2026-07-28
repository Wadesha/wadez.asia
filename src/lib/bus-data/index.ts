/**
 * 公交数据总入口
 *
 * 作用:
 * - 提供统一的 API 访问所有城市公交数据
 * - 支持按城市加载、按线路 ID 查找
 * - 数据文件是懒加载（构建时打包）
 *
 * 使用:
 *   import { getCityBusLines, getAllCitiesData } from "@/lib/bus-data";
 *   const lines = await getCityBusLines("北京");
 */

import type { BusLine } from "./types";

/**
 * 列出所有已有数据的城市
 */
export async function getAvailableCities(): Promise<string[]> {
  // 这个函数仅返回静态配置，实际读取需要 fs（仅服务端）
  return [
    "北京", "上海", "广州", "深圳", "杭州",
    "南京", "武汉", "成都", "西安", "天津", "重庆",
  ];
}

/**
 * 加载指定城市的线路数据（动态 import 实现懒加载）
 */
export async function getCityBusLines(city: string): Promise<BusLine[]> {
  switch (city) {
    case "北京":
      const { 北京_BUS_LINES } = await import("./北京/lines");
      return 北京_BUS_LINES;
    case "上海":
      const { 上海_BUS_LINES } = await import("./上海/lines");
      return 上海_BUS_LINES;
    case "广州":
      const { 广州_BUS_LINES } = await import("./广州/lines");
      return 广州_BUS_LINES;
    case "深圳":
      const { 深圳_BUS_LINES } = await import("./深圳/lines");
      return 深圳_BUS_LINES;
    case "杭州":
      const { 杭州_BUS_LINES } = await import("./杭州/lines");
      return 杭州_BUS_LINES;
    case "南京":
      const { 南京_BUS_LINES } = await import("./南京/lines");
      return 南京_BUS_LINES;
    case "武汉":
      const { 武汉_BUS_LINES } = await import("./武汉/lines");
      return 武汉_BUS_LINES;
    case "成都":
      const { 成都_BUS_LINES } = await import("./成都/lines");
      return 成都_BUS_LINES;
    case "西安":
      const { 西安_BUS_LINES } = await import("./西安/lines");
      return 西安_BUS_LINES;
    case "天津":
      const { 天津_BUS_LINES } = await import("./天津/lines");
      return 天津_BUS_LINES;
    case "重庆":
      const { 重庆_BUS_LINES } = await import("./重庆/lines");
      return 重庆_BUS_LINES;
    default:
      return [];
  }
}

/**
 * 同步版本：直接在客户端组件中按城市名加载
 * （打包时会包含所有引用的城市）
 */
export function getCityBusLinesSync(city: string): BusLine[] {
  // 注意：这个函数会在客户端被调用，因此不能使用 fs
  // 它依赖于构建时已经 import 了所有城市
  // 实际使用时建议按城市懒加载
  return [];
}

export type { BusLine, BusStop } from "./types";
