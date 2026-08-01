import { useMemo } from "react";

export interface SiteInfo {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface RecommendItem {
  site: SiteInfo;
  reason: string;
  strength: number; // 0-1
}

// 子网站分类体系
const SITE_CATEGORIES: Record<string, string[]> = {
  gis: [
    "poi-heat",
    "building-morphology",
    "street-syntax",
    "accessibility",
    "greenway",
    "gis",
    "pois",
    "areas",
  ],
  planning: [
    "planning",
    "traffic-capacity",
    "population-density",
    "development-intensity",
    "land-use",
    "public-service",
    "skyline",
  ],
  business: [
    "business-cluster",
    "business-siting",
    "industry-park",
    "industry-chain",
    "investment",
  ],
  environment: [
    "heat-island",
    "air-quality",
    "noise-pollution",
    "forest-resource",
    "water-resource",
    "marine-resource",
    "mineral-resource",
  ],
  tourism: [
    "smart-tourism",
    "tourist-resource",
    "intangible-heritage",
    "passenger-flow",
  ],
  data: [
    "economic-data",
    "data",
    "compare",
    "versions",
  ],
};

// 子网站元数据
const SITE_META: Record<string, SiteInfo> = {
  "poi-heat": { id: "poi-heat", name: "POI热力分布", category: "gis", description: "兴趣点密度与城市活力的直观表达" },
  "building-morphology": { id: "building-morphology", name: "建筑形态图谱", category: "gis", description: "高度与密度的城市性格分析" },
  "street-syntax": { id: "street-syntax", name: "街道网络句法", category: "gis", description: "图论指标解码城市结构" },
  accessibility: { id: "accessibility", name: "可达性分析器", category: "gis", description: "15分钟生活圈量化评估" },
  greenway: { id: "greenway", name: "绿道慢行系统", category: "gis", description: "线性空间的连通质量分析" },
  gis: { id: "gis", name: "GIS空间分析", category: "gis", description: "城市空间探索总览" },
  planning: { id: "planning", name: "城市规划工具箱", category: "planning", description: "面向规划师的专业工具集" },
  "traffic-capacity": { id: "traffic-capacity", name: "交通承载力", category: "planning", description: "路网容量与拥堵状况评估" },
  "population-density": { id: "population-density", name: "人口密度分布", category: "planning", description: "人口空间分布格局分析" },
  "development-intensity": { id: "development-intensity", name: "开发强度分析", category: "planning", description: "容积率与城市密度评估" },
  "land-use": { id: "land-use", name: "用地性质图谱", category: "planning", description: "土地是城市的第一语言" },
  "public-service": { id: "public-service", name: "公共服务设施", category: "planning", description: "15分钟生活圈的质量" },
  skyline: { id: "skyline", name: "城市天际线", category: "planning", description: "高度控制塑造城市轮廓" },
  "business-cluster": { id: "business-cluster", name: "商业聚类分析", category: "business", description: "商业空间集聚模式识别" },
  "business-siting": { id: "business-siting", name: "商业选址评估", category: "business", description: "新店选址多因子评估" },
  "industry-park": { id: "industry-park", name: "产业园区分析", category: "business", description: "产业空间绩效评估" },
  "industry-chain": { id: "industry-chain", name: "产业链图谱", category: "business", description: "上下游关系与空间布局" },
  investment: { id: "investment", name: "投资热力图", category: "business", description: "资本流向与区域价值" },
  "heat-island": { id: "heat-island", name: "城市热岛效应", category: "environment", description: "城市温度格局与影响因子" },
  "air-quality": { id: "air-quality", name: "空气质量监测", category: "environment", description: "污染物分布与扩散模拟" },
  "noise-pollution": { id: "noise-pollution", name: "噪声污染分布", category: "environment", description: "声环境质量评估" },
  "forest-resource": { id: "forest-resource", name: "森林资源", category: "environment", description: "林业资源分布与生态价值" },
  "water-resource": { id: "water-resource", name: "水资源分布", category: "environment", description: "水系网络与利用分析" },
  "smart-tourism": { id: "smart-tourism", name: "智慧旅游", category: "tourism", description: "游客行为与景区承载力" },
  "economic-data": { id: "economic-data", name: "经济数据", category: "data", description: "宏观经济指标可视化" },
  compare: { id: "compare", name: "跨站对比", category: "data", description: "多子网站指标横向对比" },
};

// 跨类别关联规则：定义类别之间的推荐强度
const CATEGORY_RELATIONS: Record<string, Record<string, number>> = {
  gis: { planning: 0.9, environment: 0.6, tourism: 0.5, business: 0.5, data: 0.4 },
  planning: { gis: 0.9, business: 0.7, environment: 0.7, data: 0.5, tourism: 0.4 },
  business: { planning: 0.7, gis: 0.5, data: 0.6, tourism: 0.5, environment: 0.3 },
  environment: { gis: 0.6, planning: 0.7, tourism: 0.6, data: 0.4, business: 0.3 },
  tourism: { environment: 0.6, business: 0.5, gis: 0.5, planning: 0.4, data: 0.3 },
  data: { gis: 0.4, planning: 0.5, business: 0.6, environment: 0.4, tourism: 0.3 },
};

// 特殊站点关联（强关联）
const SPECIAL_RELATIONS: Record<string, { target: string; reason: string }[]> = {
  "population-density": [
    { target: "accessibility", reason: "人口密度直接影响设施可达性需求" },
    { target: "public-service", reason: "人口分布决定公共服务设施布局" },
    { target: "land-use", reason: "居住用地比例与人口密度高度相关" },
  ],
  "poi-heat": [
    { target: "traffic-capacity", reason: "POI密集区域通常交通压力更大" },
    { target: "business-cluster", reason: "POI热力直接反映商业集聚程度" },
    { target: "accessibility", reason: "兴趣点密度决定目的地可达性" },
  ],
  "heat-island": [
    { target: "greenway", reason: "绿道系统对缓解热岛效应有显著作用" },
    { target: "air-quality", reason: "热岛区域通常伴随空气质量问题" },
    { target: "land-use", reason: "用地性质影响地表温度分布" },
  ],
  accessibility: [
    { target: "traffic-capacity", reason: "可达性与交通承载力互为补充" },
    { target: "population-density", reason: "高密度区域需要更高可达性" },
    { target: "public-service", reason: "公服设施覆盖率决定可达性水平" },
  ],
  "traffic-capacity": [
    { target: "poi-heat", reason: "交通流量与POI分布密切相关" },
    { target: "accessibility", reason: "路网容量影响区域可达性" },
    { target: "street-syntax", reason: "路网结构决定交通承载效率" },
  ],
};

export function useSmartRecommend(currentPath: string): RecommendItem[] {
  return useMemo(() => {
    // 从路径中提取 site id
    const pathSegments = currentPath.split("/").filter(Boolean);
    const currentId = pathSegments[0] || "";

    if (!currentId || !SITE_META[currentId]) {
      // 如果无法识别，返回热门推荐
      return [
        { site: SITE_META["poi-heat"], reason: "热门GIS分析工具", strength: 0.9 },
        { site: SITE_META["planning"], reason: "规划师首选工具箱", strength: 0.85 },
        { site: SITE_META["accessibility"], reason: "15分钟生活圈评估", strength: 0.8 },
      ];
    }

    const current = SITE_META[currentId];
    const currentCat = current.category;
    const scores = new Map<string, { strength: number; reason: string }>();

    // 1. 特殊关联（最强）
    const special = SPECIAL_RELATIONS[currentId];
    if (special) {
      special.forEach((rel) => {
        if (SITE_META[rel.target]) {
          scores.set(rel.target, { strength: 0.95, reason: rel.reason });
        }
      });
    }

    // 2. 同类别的其他站点
    const sameCategorySites = SITE_CATEGORIES[currentCat] || [];
    sameCategorySites.forEach((id) => {
      if (id === currentId || !SITE_META[id]) return;
      if (scores.has(id)) return;
      const catReasons: Record<string, string> = {
        gis: "同属于GIS空间分析体系",
        planning: "同属于城市规划工具集",
        business: "同属于商业分析套件",
        environment: "同属于环境监测体系",
        tourism: "同属于文旅分析工具",
        data: "同属于数据分析平台",
      };
      scores.set(id, { strength: 0.8, reason: catReasons[currentCat] || "同类分析工具" });
    });

    // 3. 跨类别关联
    const catRelations = CATEGORY_RELATIONS[currentCat] || {};
    Object.entries(catRelations).forEach(([targetCat, baseStrength]) => {
      const sites = SITE_CATEGORIES[targetCat] || [];
      sites.forEach((id) => {
        if (!SITE_META[id] || scores.has(id)) return;
        const crossReasons: Record<string, Record<string, string>> = {
          gis: { planning: "空间分析支撑规划决策", business: "POI数据辅助商业分析", environment: "GIS视角看环境问题", tourism: "空间数据赋能旅游分析" },
          planning: { gis: "规划需要空间数据支撑", business: "产业规划与商业选址联动", environment: "生态规划与环境监测结合" },
          business: { planning: "商业分析依赖规划数据", data: "经济数据支撑投资决策" },
          environment: { planning: "环境评估是规划前提", gis: "环境数据需要空间表达" },
          tourism: { environment: "景区依托生态环境", gis: "旅游需要空间分析支撑" },
        };
        const reason = crossReasons[currentCat]?.[targetCat] || "跨领域关联分析";
        scores.set(id, { strength: baseStrength, reason });
      });
    });

    // 排序并取前 4 个
    const results: RecommendItem[] = Array.from(scores.entries())
      .map(([id, val]) => ({ site: SITE_META[id], reason: val.reason, strength: val.strength }))
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 4);

    return results;
  }, [currentPath]);
}

export function getSiteMeta(siteId: string): SiteInfo | undefined {
  return SITE_META[siteId];
}
