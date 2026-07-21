export interface POI {
  id: string;
  name: string;
  category: POICategory;
  description: string | null;
  address: string | null;
  longitude: number;
  latitude: number;
  images: string[];
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type POICategory =
  | "bus"
  | "metro"
  | "train"
  | "coach"
  | "airport"
  | "ferry"
  | "tram"
  | "other";

export const CATEGORY_LABELS: Record<POICategory, string> = {
  bus: "公交站",
  metro: "地铁站",
  train: "火车站",
  coach: "客运站",
  airport: "机场",
  ferry: "码头/轮渡",
  tram: "有轨电车",
  other: "其他",
};

export const CATEGORY_ICONS: Record<POICategory, string> = {
  bus: "🚌",
  metro: "🚇",
  train: "🚄",
  coach: "🚐",
  airport: "✈️",
  ferry: "⛴️",
  tram: "🚊",
  other: "📍",
};

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
}
