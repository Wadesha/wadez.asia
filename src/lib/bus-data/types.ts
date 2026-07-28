// 公交线路数据类型定义

export interface BusStop {
  name: string;
  location: string; // "lng,lat"
  sequence: number;
}

export interface BusLine {
  id: string;
  name: string;
  type: string;
  city: string;
  startStop: string;
  endStop: string;
  distance: number; // 公里
  basicPrice: number; // 起步价（元）
  totalPrice: number; // 全程价（元）
  company: string;
  stops: BusStop[];
  polyline: string; // 折线坐标串
  fetchedAt: string; // ISO 时间
}
