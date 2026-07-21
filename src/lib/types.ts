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
  | "warehouse"
  | "distribution"
  | "station"
  | "port"
  | "airport"
  | "railway"
  | "highway"
  | "other";

export const CATEGORY_LABELS: Record<POICategory, string> = {
  warehouse: "仓库",
  distribution: "配送中心",
  station: "站点",
  port: "港口",
  airport: "机场",
  railway: "铁路枢纽",
  highway: "公路枢纽",
  other: "其他",
};

export const CATEGORY_ICONS: Record<POICategory, string> = {
  warehouse: "🏭",
  distribution: "📦",
  station: "🚏",
  port: "⚓",
  airport: "✈️",
  railway: "🚄",
  highway: "🛣️",
  other: "📍",
};

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
}
