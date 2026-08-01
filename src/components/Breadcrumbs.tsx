"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * 面包屑导航 (v2.1.20)
 */

const PATH_LABELS: Record<string, string> = {
  "": "首页",
  gis: "GIS工具箱",
  planning: "城市规划",
  pois: "POI兴趣点",
  areas: "区域探索",
  "poi-heat": "POI热力分布",
  "building-morphology": "建筑形态图谱",
  "street-syntax": "街道网络句法",
  accessibility: "可达性分析器",
  greenway: "绿道慢行系统",
  "land-use": "用地性质",
  "development-intensity": "开发强度",
  "population-density": "人口密度分布",
  "public-service": "公共服务设施",
  skyline: "城市天际线",
  "traffic-capacity": "交通承载力",
  "business-siting": "商铺选址评估",
  "business-cluster": "商圈竞争力",
  "passenger-flow": "客流预测",
  "air-quality": "空气质量监测",
  "heat-island": "城市热岛效应",
  "noise-pollution": "噪声污染地图",
  "tourist-resource": "文旅资源地图",
  "intangible-heritage": "非遗文化分布",
  "smart-tourism": "智慧旅游路线",
  "mineral-resource": "矿产资源分布",
  "land-use-resource": "土地利用现状",
  "water-resource": "水资源分布",
  "forest-resource": "林业资源",
  "marine-resource": "海洋资源",
  "industry-park": "产业园区分布",
  "economic-data": "经济数据图谱",
  investment: "招商投资地图",
  "industry-chain": "产业图谱",
  compare: "对比仪表盘",
  versions: "版本历史",
  routes: "城际公交",
  cities: "城市列表",
  lines: "线路查询",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs: { href: string; label: string }[] = [
    { href: "/", label: "首页" },
  ];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const label = PATH_LABELS[segment] || segment;
    crumbs.push({ href: currentPath, label });
  }

  return (
    <nav className="flex items-center gap-1 text-[10px] text-gray-400 mb-2 flex-wrap">
      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1;
        return (
          <span key={crumb.href} className="flex items-center gap-1">
            {idx > 0 && <span className="text-gray-300">/</span>}
            {isLast ? (
              <span className="text-gray-600 font-medium">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-gray-600 transition">
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
