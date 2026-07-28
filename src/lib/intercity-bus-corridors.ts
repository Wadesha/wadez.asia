// 自动生成的城市间公交走廊配置
// 生成时间: 2026-07-27T04:13:04.902Z
// 城市数量: 49
// 线路数量: 2352
// 包含所有城市间的双向线路

export interface CorridorCity {
  id: string;
  name: string;
  center: [number, number];
}

export interface IntercityBusCorridor {
  id: string;
  name: string;
  cities: CorridorCity[];
}

export const INTERCITY_BUS_CORRIDORS: IntercityBusCorridor[] = [
  {
    id: "beijing-shanghai",
    name: "北京 → 上海",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "beijing-guangzhou",
    name: "北京 → 广州",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "beijing-shenzhen",
    name: "北京 → 深圳",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "beijing-chengdu",
    name: "北京 → 成都",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "beijing-hangzhou",
    name: "北京 → 杭州",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "beijing-wuhan",
    name: "北京 → 武汉",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "beijing-xian",
    name: "北京 → 西安",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "beijing-nanjing",
    name: "北京 → 南京",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "beijing-chongqing",
    name: "北京 → 重庆",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "beijing-tianjin",
    name: "北京 → 天津",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "beijing-suzhou",
    name: "北京 → 苏州",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "beijing-zhengzhou",
    name: "北京 → 郑州",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "beijing-changsha",
    name: "北京 → 长沙",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "beijing-kunming",
    name: "北京 → 昆明",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "beijing-harbin",
    name: "北京 → 哈尔滨",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "beijing-dalian",
    name: "北京 → 大连",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "beijing-qingdao",
    name: "北京 → 青岛",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "beijing-jinan",
    name: "北京 → 济南",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "beijing-nanchang",
    name: "北京 → 南昌",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "beijing-fuzhou",
    name: "北京 → 福州",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "beijing-xiamen",
    name: "北京 → 厦门",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "beijing-wuxi",
    name: "北京 → 无锡",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "beijing-dongguan",
    name: "北京 → 东莞",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "beijing-zhuhai",
    name: "北京 → 珠海",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "beijing-ningbo",
    name: "北京 → 宁波",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "beijing-shenyang",
    name: "北京 → 沈阳",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "beijing-lanzhou",
    name: "北京 → 兰州",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "beijing-haikou",
    name: "北京 → 海口",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "beijing-cangzhou",
    name: "北京 → 沧州",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "beijing-xuzhou",
    name: "北京 → 徐州",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "beijing-changzhou",
    name: "北京 → 常州",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "beijing-nantong",
    name: "北京 → 南通",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "beijing-wenzhou",
    name: "北京 → 温州",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "beijing-jiaxing",
    name: "北京 → 嘉兴",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "beijing-baoding",
    name: "北京 → 保定",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "beijing-tangshan",
    name: "北京 → 唐山",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "beijing-taiyuan",
    name: "北京 → 太原",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "beijing-hefei",
    name: "北京 → 合肥",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "beijing-foshan",
    name: "北京 → 佛山",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "beijing-shijiazhuang",
    name: "北京 → 石家庄",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "beijing-changchun",
    name: "北京 → 长春",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "beijing-guiyang",
    name: "北京 → 贵阳",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "beijing-nanning",
    name: "北京 → 南宁",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "beijing-jinhua",
    name: "北京 → 金华",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "beijing-shaoxing",
    name: "北京 → 绍兴",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "beijing-taizhou",
    name: "北京 → 台州",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "beijing-huizhou",
    name: "北京 → 惠州",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "beijing-zhongshan",
    name: "北京 → 中山",
    cities: [
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "shanghai-beijing",
    name: "上海 → 北京",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "shanghai-guangzhou",
    name: "上海 → 广州",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "shanghai-shenzhen",
    name: "上海 → 深圳",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "shanghai-chengdu",
    name: "上海 → 成都",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "shanghai-hangzhou",
    name: "上海 → 杭州",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "shanghai-wuhan",
    name: "上海 → 武汉",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "shanghai-xian",
    name: "上海 → 西安",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "shanghai-nanjing",
    name: "上海 → 南京",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "shanghai-chongqing",
    name: "上海 → 重庆",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "shanghai-tianjin",
    name: "上海 → 天津",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "shanghai-suzhou",
    name: "上海 → 苏州",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "shanghai-zhengzhou",
    name: "上海 → 郑州",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "shanghai-changsha",
    name: "上海 → 长沙",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "shanghai-kunming",
    name: "上海 → 昆明",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "shanghai-harbin",
    name: "上海 → 哈尔滨",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "shanghai-dalian",
    name: "上海 → 大连",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "shanghai-qingdao",
    name: "上海 → 青岛",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "shanghai-jinan",
    name: "上海 → 济南",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "shanghai-nanchang",
    name: "上海 → 南昌",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "shanghai-fuzhou",
    name: "上海 → 福州",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "shanghai-xiamen",
    name: "上海 → 厦门",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "shanghai-wuxi",
    name: "上海 → 无锡",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "shanghai-dongguan",
    name: "上海 → 东莞",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "shanghai-zhuhai",
    name: "上海 → 珠海",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "shanghai-ningbo",
    name: "上海 → 宁波",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "shanghai-shenyang",
    name: "上海 → 沈阳",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "shanghai-lanzhou",
    name: "上海 → 兰州",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "shanghai-haikou",
    name: "上海 → 海口",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "shanghai-cangzhou",
    name: "上海 → 沧州",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "shanghai-xuzhou",
    name: "上海 → 徐州",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "shanghai-changzhou",
    name: "上海 → 常州",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "shanghai-nantong",
    name: "上海 → 南通",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "shanghai-wenzhou",
    name: "上海 → 温州",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "shanghai-jiaxing",
    name: "上海 → 嘉兴",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "shanghai-baoding",
    name: "上海 → 保定",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "shanghai-tangshan",
    name: "上海 → 唐山",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "shanghai-taiyuan",
    name: "上海 → 太原",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "shanghai-hefei",
    name: "上海 → 合肥",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "shanghai-foshan",
    name: "上海 → 佛山",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "shanghai-shijiazhuang",
    name: "上海 → 石家庄",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "shanghai-changchun",
    name: "上海 → 长春",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "shanghai-guiyang",
    name: "上海 → 贵阳",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "shanghai-nanning",
    name: "上海 → 南宁",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "shanghai-jinhua",
    name: "上海 → 金华",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "shanghai-shaoxing",
    name: "上海 → 绍兴",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "shanghai-taizhou",
    name: "上海 → 台州",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "shanghai-huizhou",
    name: "上海 → 惠州",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "shanghai-zhongshan",
    name: "上海 → 中山",
    cities: [
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "guangzhou-beijing",
    name: "广州 → 北京",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "guangzhou-shanghai",
    name: "广州 → 上海",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "guangzhou-shenzhen",
    name: "广州 → 深圳",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "guangzhou-chengdu",
    name: "广州 → 成都",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "guangzhou-hangzhou",
    name: "广州 → 杭州",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "guangzhou-wuhan",
    name: "广州 → 武汉",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "guangzhou-xian",
    name: "广州 → 西安",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "guangzhou-nanjing",
    name: "广州 → 南京",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "guangzhou-chongqing",
    name: "广州 → 重庆",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "guangzhou-tianjin",
    name: "广州 → 天津",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "guangzhou-suzhou",
    name: "广州 → 苏州",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "guangzhou-zhengzhou",
    name: "广州 → 郑州",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "guangzhou-changsha",
    name: "广州 → 长沙",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "guangzhou-kunming",
    name: "广州 → 昆明",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "guangzhou-harbin",
    name: "广州 → 哈尔滨",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "guangzhou-dalian",
    name: "广州 → 大连",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "guangzhou-qingdao",
    name: "广州 → 青岛",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "guangzhou-jinan",
    name: "广州 → 济南",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "guangzhou-nanchang",
    name: "广州 → 南昌",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "guangzhou-fuzhou",
    name: "广州 → 福州",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "guangzhou-xiamen",
    name: "广州 → 厦门",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "guangzhou-wuxi",
    name: "广州 → 无锡",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "guangzhou-dongguan",
    name: "广州 → 东莞",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "guangzhou-zhuhai",
    name: "广州 → 珠海",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "guangzhou-ningbo",
    name: "广州 → 宁波",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "guangzhou-shenyang",
    name: "广州 → 沈阳",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "guangzhou-lanzhou",
    name: "广州 → 兰州",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "guangzhou-haikou",
    name: "广州 → 海口",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "guangzhou-cangzhou",
    name: "广州 → 沧州",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "guangzhou-xuzhou",
    name: "广州 → 徐州",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "guangzhou-changzhou",
    name: "广州 → 常州",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "guangzhou-nantong",
    name: "广州 → 南通",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "guangzhou-wenzhou",
    name: "广州 → 温州",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "guangzhou-jiaxing",
    name: "广州 → 嘉兴",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "guangzhou-baoding",
    name: "广州 → 保定",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "guangzhou-tangshan",
    name: "广州 → 唐山",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "guangzhou-taiyuan",
    name: "广州 → 太原",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "guangzhou-hefei",
    name: "广州 → 合肥",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "guangzhou-foshan",
    name: "广州 → 佛山",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "guangzhou-shijiazhuang",
    name: "广州 → 石家庄",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "guangzhou-changchun",
    name: "广州 → 长春",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "guangzhou-guiyang",
    name: "广州 → 贵阳",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "guangzhou-nanning",
    name: "广州 → 南宁",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "guangzhou-jinhua",
    name: "广州 → 金华",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "guangzhou-shaoxing",
    name: "广州 → 绍兴",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "guangzhou-taizhou",
    name: "广州 → 台州",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "guangzhou-huizhou",
    name: "广州 → 惠州",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "guangzhou-zhongshan",
    name: "广州 → 中山",
    cities: [
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "shenzhen-beijing",
    name: "深圳 → 北京",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "shenzhen-shanghai",
    name: "深圳 → 上海",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "shenzhen-guangzhou",
    name: "深圳 → 广州",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "shenzhen-chengdu",
    name: "深圳 → 成都",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "shenzhen-hangzhou",
    name: "深圳 → 杭州",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "shenzhen-wuhan",
    name: "深圳 → 武汉",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "shenzhen-xian",
    name: "深圳 → 西安",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "shenzhen-nanjing",
    name: "深圳 → 南京",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "shenzhen-chongqing",
    name: "深圳 → 重庆",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "shenzhen-tianjin",
    name: "深圳 → 天津",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "shenzhen-suzhou",
    name: "深圳 → 苏州",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "shenzhen-zhengzhou",
    name: "深圳 → 郑州",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "shenzhen-changsha",
    name: "深圳 → 长沙",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "shenzhen-kunming",
    name: "深圳 → 昆明",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "shenzhen-harbin",
    name: "深圳 → 哈尔滨",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "shenzhen-dalian",
    name: "深圳 → 大连",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "shenzhen-qingdao",
    name: "深圳 → 青岛",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "shenzhen-jinan",
    name: "深圳 → 济南",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "shenzhen-nanchang",
    name: "深圳 → 南昌",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "shenzhen-fuzhou",
    name: "深圳 → 福州",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "shenzhen-xiamen",
    name: "深圳 → 厦门",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "shenzhen-wuxi",
    name: "深圳 → 无锡",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "shenzhen-dongguan",
    name: "深圳 → 东莞",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "shenzhen-zhuhai",
    name: "深圳 → 珠海",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "shenzhen-ningbo",
    name: "深圳 → 宁波",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "shenzhen-shenyang",
    name: "深圳 → 沈阳",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "shenzhen-lanzhou",
    name: "深圳 → 兰州",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "shenzhen-haikou",
    name: "深圳 → 海口",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "shenzhen-cangzhou",
    name: "深圳 → 沧州",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "shenzhen-xuzhou",
    name: "深圳 → 徐州",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "shenzhen-changzhou",
    name: "深圳 → 常州",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "shenzhen-nantong",
    name: "深圳 → 南通",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "shenzhen-wenzhou",
    name: "深圳 → 温州",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "shenzhen-jiaxing",
    name: "深圳 → 嘉兴",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "shenzhen-baoding",
    name: "深圳 → 保定",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "shenzhen-tangshan",
    name: "深圳 → 唐山",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "shenzhen-taiyuan",
    name: "深圳 → 太原",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "shenzhen-hefei",
    name: "深圳 → 合肥",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "shenzhen-foshan",
    name: "深圳 → 佛山",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "shenzhen-shijiazhuang",
    name: "深圳 → 石家庄",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "shenzhen-changchun",
    name: "深圳 → 长春",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "shenzhen-guiyang",
    name: "深圳 → 贵阳",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "shenzhen-nanning",
    name: "深圳 → 南宁",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "shenzhen-jinhua",
    name: "深圳 → 金华",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "shenzhen-shaoxing",
    name: "深圳 → 绍兴",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "shenzhen-taizhou",
    name: "深圳 → 台州",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "shenzhen-huizhou",
    name: "深圳 → 惠州",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "shenzhen-zhongshan",
    name: "深圳 → 中山",
    cities: [
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "chengdu-beijing",
    name: "成都 → 北京",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "chengdu-shanghai",
    name: "成都 → 上海",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "chengdu-guangzhou",
    name: "成都 → 广州",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "chengdu-shenzhen",
    name: "成都 → 深圳",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "chengdu-hangzhou",
    name: "成都 → 杭州",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "chengdu-wuhan",
    name: "成都 → 武汉",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "chengdu-xian",
    name: "成都 → 西安",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "chengdu-nanjing",
    name: "成都 → 南京",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "chengdu-chongqing",
    name: "成都 → 重庆",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "chengdu-tianjin",
    name: "成都 → 天津",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "chengdu-suzhou",
    name: "成都 → 苏州",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "chengdu-zhengzhou",
    name: "成都 → 郑州",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "chengdu-changsha",
    name: "成都 → 长沙",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "chengdu-kunming",
    name: "成都 → 昆明",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "chengdu-harbin",
    name: "成都 → 哈尔滨",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "chengdu-dalian",
    name: "成都 → 大连",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "chengdu-qingdao",
    name: "成都 → 青岛",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "chengdu-jinan",
    name: "成都 → 济南",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "chengdu-nanchang",
    name: "成都 → 南昌",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "chengdu-fuzhou",
    name: "成都 → 福州",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "chengdu-xiamen",
    name: "成都 → 厦门",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "chengdu-wuxi",
    name: "成都 → 无锡",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "chengdu-dongguan",
    name: "成都 → 东莞",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "chengdu-zhuhai",
    name: "成都 → 珠海",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "chengdu-ningbo",
    name: "成都 → 宁波",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "chengdu-shenyang",
    name: "成都 → 沈阳",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "chengdu-lanzhou",
    name: "成都 → 兰州",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "chengdu-haikou",
    name: "成都 → 海口",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "chengdu-cangzhou",
    name: "成都 → 沧州",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "chengdu-xuzhou",
    name: "成都 → 徐州",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "chengdu-changzhou",
    name: "成都 → 常州",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "chengdu-nantong",
    name: "成都 → 南通",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "chengdu-wenzhou",
    name: "成都 → 温州",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "chengdu-jiaxing",
    name: "成都 → 嘉兴",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "chengdu-baoding",
    name: "成都 → 保定",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "chengdu-tangshan",
    name: "成都 → 唐山",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "chengdu-taiyuan",
    name: "成都 → 太原",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "chengdu-hefei",
    name: "成都 → 合肥",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "chengdu-foshan",
    name: "成都 → 佛山",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "chengdu-shijiazhuang",
    name: "成都 → 石家庄",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "chengdu-changchun",
    name: "成都 → 长春",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "chengdu-guiyang",
    name: "成都 → 贵阳",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "chengdu-nanning",
    name: "成都 → 南宁",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "chengdu-jinhua",
    name: "成都 → 金华",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "chengdu-shaoxing",
    name: "成都 → 绍兴",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "chengdu-taizhou",
    name: "成都 → 台州",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "chengdu-huizhou",
    name: "成都 → 惠州",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "chengdu-zhongshan",
    name: "成都 → 中山",
    cities: [
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "hangzhou-beijing",
    name: "杭州 → 北京",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "hangzhou-shanghai",
    name: "杭州 → 上海",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "hangzhou-guangzhou",
    name: "杭州 → 广州",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "hangzhou-shenzhen",
    name: "杭州 → 深圳",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "hangzhou-chengdu",
    name: "杭州 → 成都",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "hangzhou-wuhan",
    name: "杭州 → 武汉",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "hangzhou-xian",
    name: "杭州 → 西安",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "hangzhou-nanjing",
    name: "杭州 → 南京",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "hangzhou-chongqing",
    name: "杭州 → 重庆",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "hangzhou-tianjin",
    name: "杭州 → 天津",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "hangzhou-suzhou",
    name: "杭州 → 苏州",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "hangzhou-zhengzhou",
    name: "杭州 → 郑州",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "hangzhou-changsha",
    name: "杭州 → 长沙",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "hangzhou-kunming",
    name: "杭州 → 昆明",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "hangzhou-harbin",
    name: "杭州 → 哈尔滨",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "hangzhou-dalian",
    name: "杭州 → 大连",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "hangzhou-qingdao",
    name: "杭州 → 青岛",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "hangzhou-jinan",
    name: "杭州 → 济南",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "hangzhou-nanchang",
    name: "杭州 → 南昌",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "hangzhou-fuzhou",
    name: "杭州 → 福州",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "hangzhou-xiamen",
    name: "杭州 → 厦门",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "hangzhou-wuxi",
    name: "杭州 → 无锡",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "hangzhou-dongguan",
    name: "杭州 → 东莞",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "hangzhou-zhuhai",
    name: "杭州 → 珠海",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "hangzhou-ningbo",
    name: "杭州 → 宁波",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "hangzhou-shenyang",
    name: "杭州 → 沈阳",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "hangzhou-lanzhou",
    name: "杭州 → 兰州",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "hangzhou-haikou",
    name: "杭州 → 海口",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "hangzhou-cangzhou",
    name: "杭州 → 沧州",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "hangzhou-xuzhou",
    name: "杭州 → 徐州",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "hangzhou-changzhou",
    name: "杭州 → 常州",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "hangzhou-nantong",
    name: "杭州 → 南通",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "hangzhou-wenzhou",
    name: "杭州 → 温州",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "hangzhou-jiaxing",
    name: "杭州 → 嘉兴",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "hangzhou-baoding",
    name: "杭州 → 保定",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "hangzhou-tangshan",
    name: "杭州 → 唐山",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "hangzhou-taiyuan",
    name: "杭州 → 太原",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "hangzhou-hefei",
    name: "杭州 → 合肥",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "hangzhou-foshan",
    name: "杭州 → 佛山",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "hangzhou-shijiazhuang",
    name: "杭州 → 石家庄",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "hangzhou-changchun",
    name: "杭州 → 长春",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "hangzhou-guiyang",
    name: "杭州 → 贵阳",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "hangzhou-nanning",
    name: "杭州 → 南宁",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "hangzhou-jinhua",
    name: "杭州 → 金华",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "hangzhou-shaoxing",
    name: "杭州 → 绍兴",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "hangzhou-taizhou",
    name: "杭州 → 台州",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "hangzhou-huizhou",
    name: "杭州 → 惠州",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "hangzhou-zhongshan",
    name: "杭州 → 中山",
    cities: [
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "wuhan-beijing",
    name: "武汉 → 北京",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "wuhan-shanghai",
    name: "武汉 → 上海",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "wuhan-guangzhou",
    name: "武汉 → 广州",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "wuhan-shenzhen",
    name: "武汉 → 深圳",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "wuhan-chengdu",
    name: "武汉 → 成都",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "wuhan-hangzhou",
    name: "武汉 → 杭州",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "wuhan-xian",
    name: "武汉 → 西安",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "wuhan-nanjing",
    name: "武汉 → 南京",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "wuhan-chongqing",
    name: "武汉 → 重庆",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "wuhan-tianjin",
    name: "武汉 → 天津",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "wuhan-suzhou",
    name: "武汉 → 苏州",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "wuhan-zhengzhou",
    name: "武汉 → 郑州",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "wuhan-changsha",
    name: "武汉 → 长沙",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "wuhan-kunming",
    name: "武汉 → 昆明",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "wuhan-harbin",
    name: "武汉 → 哈尔滨",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "wuhan-dalian",
    name: "武汉 → 大连",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "wuhan-qingdao",
    name: "武汉 → 青岛",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "wuhan-jinan",
    name: "武汉 → 济南",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "wuhan-nanchang",
    name: "武汉 → 南昌",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "wuhan-fuzhou",
    name: "武汉 → 福州",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "wuhan-xiamen",
    name: "武汉 → 厦门",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "wuhan-wuxi",
    name: "武汉 → 无锡",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "wuhan-dongguan",
    name: "武汉 → 东莞",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "wuhan-zhuhai",
    name: "武汉 → 珠海",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "wuhan-ningbo",
    name: "武汉 → 宁波",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "wuhan-shenyang",
    name: "武汉 → 沈阳",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "wuhan-lanzhou",
    name: "武汉 → 兰州",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "wuhan-haikou",
    name: "武汉 → 海口",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "wuhan-cangzhou",
    name: "武汉 → 沧州",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "wuhan-xuzhou",
    name: "武汉 → 徐州",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "wuhan-changzhou",
    name: "武汉 → 常州",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "wuhan-nantong",
    name: "武汉 → 南通",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "wuhan-wenzhou",
    name: "武汉 → 温州",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "wuhan-jiaxing",
    name: "武汉 → 嘉兴",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "wuhan-baoding",
    name: "武汉 → 保定",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "wuhan-tangshan",
    name: "武汉 → 唐山",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "wuhan-taiyuan",
    name: "武汉 → 太原",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "wuhan-hefei",
    name: "武汉 → 合肥",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "wuhan-foshan",
    name: "武汉 → 佛山",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "wuhan-shijiazhuang",
    name: "武汉 → 石家庄",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "wuhan-changchun",
    name: "武汉 → 长春",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "wuhan-guiyang",
    name: "武汉 → 贵阳",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "wuhan-nanning",
    name: "武汉 → 南宁",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "wuhan-jinhua",
    name: "武汉 → 金华",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "wuhan-shaoxing",
    name: "武汉 → 绍兴",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "wuhan-taizhou",
    name: "武汉 → 台州",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "wuhan-huizhou",
    name: "武汉 → 惠州",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "wuhan-zhongshan",
    name: "武汉 → 中山",
    cities: [
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "xian-beijing",
    name: "西安 → 北京",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "xian-shanghai",
    name: "西安 → 上海",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "xian-guangzhou",
    name: "西安 → 广州",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "xian-shenzhen",
    name: "西安 → 深圳",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "xian-chengdu",
    name: "西安 → 成都",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "xian-hangzhou",
    name: "西安 → 杭州",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "xian-wuhan",
    name: "西安 → 武汉",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "xian-nanjing",
    name: "西安 → 南京",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "xian-chongqing",
    name: "西安 → 重庆",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "xian-tianjin",
    name: "西安 → 天津",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "xian-suzhou",
    name: "西安 → 苏州",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "xian-zhengzhou",
    name: "西安 → 郑州",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "xian-changsha",
    name: "西安 → 长沙",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "xian-kunming",
    name: "西安 → 昆明",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "xian-harbin",
    name: "西安 → 哈尔滨",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "xian-dalian",
    name: "西安 → 大连",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "xian-qingdao",
    name: "西安 → 青岛",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "xian-jinan",
    name: "西安 → 济南",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "xian-nanchang",
    name: "西安 → 南昌",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "xian-fuzhou",
    name: "西安 → 福州",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "xian-xiamen",
    name: "西安 → 厦门",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "xian-wuxi",
    name: "西安 → 无锡",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "xian-dongguan",
    name: "西安 → 东莞",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "xian-zhuhai",
    name: "西安 → 珠海",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "xian-ningbo",
    name: "西安 → 宁波",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "xian-shenyang",
    name: "西安 → 沈阳",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "xian-lanzhou",
    name: "西安 → 兰州",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "xian-haikou",
    name: "西安 → 海口",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "xian-cangzhou",
    name: "西安 → 沧州",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "xian-xuzhou",
    name: "西安 → 徐州",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "xian-changzhou",
    name: "西安 → 常州",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "xian-nantong",
    name: "西安 → 南通",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "xian-wenzhou",
    name: "西安 → 温州",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "xian-jiaxing",
    name: "西安 → 嘉兴",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "xian-baoding",
    name: "西安 → 保定",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "xian-tangshan",
    name: "西安 → 唐山",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "xian-taiyuan",
    name: "西安 → 太原",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "xian-hefei",
    name: "西安 → 合肥",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "xian-foshan",
    name: "西安 → 佛山",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "xian-shijiazhuang",
    name: "西安 → 石家庄",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "xian-changchun",
    name: "西安 → 长春",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "xian-guiyang",
    name: "西安 → 贵阳",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "xian-nanning",
    name: "西安 → 南宁",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "xian-jinhua",
    name: "西安 → 金华",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "xian-shaoxing",
    name: "西安 → 绍兴",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "xian-taizhou",
    name: "西安 → 台州",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "xian-huizhou",
    name: "西安 → 惠州",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "xian-zhongshan",
    name: "西安 → 中山",
    cities: [
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "nanjing-beijing",
    name: "南京 → 北京",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "nanjing-shanghai",
    name: "南京 → 上海",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "nanjing-guangzhou",
    name: "南京 → 广州",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "nanjing-shenzhen",
    name: "南京 → 深圳",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "nanjing-chengdu",
    name: "南京 → 成都",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "nanjing-hangzhou",
    name: "南京 → 杭州",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "nanjing-wuhan",
    name: "南京 → 武汉",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "nanjing-xian",
    name: "南京 → 西安",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "nanjing-chongqing",
    name: "南京 → 重庆",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "nanjing-tianjin",
    name: "南京 → 天津",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "nanjing-suzhou",
    name: "南京 → 苏州",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "nanjing-zhengzhou",
    name: "南京 → 郑州",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "nanjing-changsha",
    name: "南京 → 长沙",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "nanjing-kunming",
    name: "南京 → 昆明",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "nanjing-harbin",
    name: "南京 → 哈尔滨",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "nanjing-dalian",
    name: "南京 → 大连",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "nanjing-qingdao",
    name: "南京 → 青岛",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "nanjing-jinan",
    name: "南京 → 济南",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "nanjing-nanchang",
    name: "南京 → 南昌",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "nanjing-fuzhou",
    name: "南京 → 福州",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "nanjing-xiamen",
    name: "南京 → 厦门",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "nanjing-wuxi",
    name: "南京 → 无锡",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "nanjing-dongguan",
    name: "南京 → 东莞",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "nanjing-zhuhai",
    name: "南京 → 珠海",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "nanjing-ningbo",
    name: "南京 → 宁波",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "nanjing-shenyang",
    name: "南京 → 沈阳",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "nanjing-lanzhou",
    name: "南京 → 兰州",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "nanjing-haikou",
    name: "南京 → 海口",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "nanjing-cangzhou",
    name: "南京 → 沧州",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "nanjing-xuzhou",
    name: "南京 → 徐州",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "nanjing-changzhou",
    name: "南京 → 常州",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "nanjing-nantong",
    name: "南京 → 南通",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "nanjing-wenzhou",
    name: "南京 → 温州",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "nanjing-jiaxing",
    name: "南京 → 嘉兴",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "nanjing-baoding",
    name: "南京 → 保定",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "nanjing-tangshan",
    name: "南京 → 唐山",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "nanjing-taiyuan",
    name: "南京 → 太原",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "nanjing-hefei",
    name: "南京 → 合肥",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "nanjing-foshan",
    name: "南京 → 佛山",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "nanjing-shijiazhuang",
    name: "南京 → 石家庄",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "nanjing-changchun",
    name: "南京 → 长春",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "nanjing-guiyang",
    name: "南京 → 贵阳",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "nanjing-nanning",
    name: "南京 → 南宁",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "nanjing-jinhua",
    name: "南京 → 金华",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "nanjing-shaoxing",
    name: "南京 → 绍兴",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "nanjing-taizhou",
    name: "南京 → 台州",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "nanjing-huizhou",
    name: "南京 → 惠州",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "nanjing-zhongshan",
    name: "南京 → 中山",
    cities: [
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "chongqing-beijing",
    name: "重庆 → 北京",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "chongqing-shanghai",
    name: "重庆 → 上海",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "chongqing-guangzhou",
    name: "重庆 → 广州",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "chongqing-shenzhen",
    name: "重庆 → 深圳",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "chongqing-chengdu",
    name: "重庆 → 成都",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "chongqing-hangzhou",
    name: "重庆 → 杭州",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "chongqing-wuhan",
    name: "重庆 → 武汉",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "chongqing-xian",
    name: "重庆 → 西安",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "chongqing-nanjing",
    name: "重庆 → 南京",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "chongqing-tianjin",
    name: "重庆 → 天津",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "chongqing-suzhou",
    name: "重庆 → 苏州",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "chongqing-zhengzhou",
    name: "重庆 → 郑州",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "chongqing-changsha",
    name: "重庆 → 长沙",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "chongqing-kunming",
    name: "重庆 → 昆明",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "chongqing-harbin",
    name: "重庆 → 哈尔滨",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "chongqing-dalian",
    name: "重庆 → 大连",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "chongqing-qingdao",
    name: "重庆 → 青岛",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "chongqing-jinan",
    name: "重庆 → 济南",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "chongqing-nanchang",
    name: "重庆 → 南昌",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "chongqing-fuzhou",
    name: "重庆 → 福州",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "chongqing-xiamen",
    name: "重庆 → 厦门",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "chongqing-wuxi",
    name: "重庆 → 无锡",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "chongqing-dongguan",
    name: "重庆 → 东莞",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "chongqing-zhuhai",
    name: "重庆 → 珠海",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "chongqing-ningbo",
    name: "重庆 → 宁波",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "chongqing-shenyang",
    name: "重庆 → 沈阳",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "chongqing-lanzhou",
    name: "重庆 → 兰州",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "chongqing-haikou",
    name: "重庆 → 海口",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "chongqing-cangzhou",
    name: "重庆 → 沧州",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "chongqing-xuzhou",
    name: "重庆 → 徐州",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "chongqing-changzhou",
    name: "重庆 → 常州",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "chongqing-nantong",
    name: "重庆 → 南通",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "chongqing-wenzhou",
    name: "重庆 → 温州",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "chongqing-jiaxing",
    name: "重庆 → 嘉兴",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "chongqing-baoding",
    name: "重庆 → 保定",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "chongqing-tangshan",
    name: "重庆 → 唐山",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "chongqing-taiyuan",
    name: "重庆 → 太原",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "chongqing-hefei",
    name: "重庆 → 合肥",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "chongqing-foshan",
    name: "重庆 → 佛山",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "chongqing-shijiazhuang",
    name: "重庆 → 石家庄",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "chongqing-changchun",
    name: "重庆 → 长春",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "chongqing-guiyang",
    name: "重庆 → 贵阳",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "chongqing-nanning",
    name: "重庆 → 南宁",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "chongqing-jinhua",
    name: "重庆 → 金华",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "chongqing-shaoxing",
    name: "重庆 → 绍兴",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "chongqing-taizhou",
    name: "重庆 → 台州",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "chongqing-huizhou",
    name: "重庆 → 惠州",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "chongqing-zhongshan",
    name: "重庆 → 中山",
    cities: [
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "tianjin-beijing",
    name: "天津 → 北京",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "tianjin-shanghai",
    name: "天津 → 上海",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "tianjin-guangzhou",
    name: "天津 → 广州",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "tianjin-shenzhen",
    name: "天津 → 深圳",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "tianjin-chengdu",
    name: "天津 → 成都",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "tianjin-hangzhou",
    name: "天津 → 杭州",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "tianjin-wuhan",
    name: "天津 → 武汉",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "tianjin-xian",
    name: "天津 → 西安",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "tianjin-nanjing",
    name: "天津 → 南京",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "tianjin-chongqing",
    name: "天津 → 重庆",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "tianjin-suzhou",
    name: "天津 → 苏州",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "tianjin-zhengzhou",
    name: "天津 → 郑州",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "tianjin-changsha",
    name: "天津 → 长沙",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "tianjin-kunming",
    name: "天津 → 昆明",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "tianjin-harbin",
    name: "天津 → 哈尔滨",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "tianjin-dalian",
    name: "天津 → 大连",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "tianjin-qingdao",
    name: "天津 → 青岛",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "tianjin-jinan",
    name: "天津 → 济南",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "tianjin-nanchang",
    name: "天津 → 南昌",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "tianjin-fuzhou",
    name: "天津 → 福州",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "tianjin-xiamen",
    name: "天津 → 厦门",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "tianjin-wuxi",
    name: "天津 → 无锡",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "tianjin-dongguan",
    name: "天津 → 东莞",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "tianjin-zhuhai",
    name: "天津 → 珠海",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "tianjin-ningbo",
    name: "天津 → 宁波",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "tianjin-shenyang",
    name: "天津 → 沈阳",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "tianjin-lanzhou",
    name: "天津 → 兰州",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "tianjin-haikou",
    name: "天津 → 海口",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "tianjin-cangzhou",
    name: "天津 → 沧州",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "tianjin-xuzhou",
    name: "天津 → 徐州",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "tianjin-changzhou",
    name: "天津 → 常州",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "tianjin-nantong",
    name: "天津 → 南通",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "tianjin-wenzhou",
    name: "天津 → 温州",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "tianjin-jiaxing",
    name: "天津 → 嘉兴",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "tianjin-baoding",
    name: "天津 → 保定",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "tianjin-tangshan",
    name: "天津 → 唐山",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "tianjin-taiyuan",
    name: "天津 → 太原",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "tianjin-hefei",
    name: "天津 → 合肥",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "tianjin-foshan",
    name: "天津 → 佛山",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "tianjin-shijiazhuang",
    name: "天津 → 石家庄",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "tianjin-changchun",
    name: "天津 → 长春",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "tianjin-guiyang",
    name: "天津 → 贵阳",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "tianjin-nanning",
    name: "天津 → 南宁",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "tianjin-jinhua",
    name: "天津 → 金华",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "tianjin-shaoxing",
    name: "天津 → 绍兴",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "tianjin-taizhou",
    name: "天津 → 台州",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "tianjin-huizhou",
    name: "天津 → 惠州",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "tianjin-zhongshan",
    name: "天津 → 中山",
    cities: [
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "suzhou-beijing",
    name: "苏州 → 北京",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "suzhou-shanghai",
    name: "苏州 → 上海",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "suzhou-guangzhou",
    name: "苏州 → 广州",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "suzhou-shenzhen",
    name: "苏州 → 深圳",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "suzhou-chengdu",
    name: "苏州 → 成都",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "suzhou-hangzhou",
    name: "苏州 → 杭州",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "suzhou-wuhan",
    name: "苏州 → 武汉",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "suzhou-xian",
    name: "苏州 → 西安",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "suzhou-nanjing",
    name: "苏州 → 南京",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "suzhou-chongqing",
    name: "苏州 → 重庆",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "suzhou-tianjin",
    name: "苏州 → 天津",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "suzhou-zhengzhou",
    name: "苏州 → 郑州",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "suzhou-changsha",
    name: "苏州 → 长沙",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "suzhou-kunming",
    name: "苏州 → 昆明",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "suzhou-harbin",
    name: "苏州 → 哈尔滨",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "suzhou-dalian",
    name: "苏州 → 大连",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "suzhou-qingdao",
    name: "苏州 → 青岛",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "suzhou-jinan",
    name: "苏州 → 济南",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "suzhou-nanchang",
    name: "苏州 → 南昌",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "suzhou-fuzhou",
    name: "苏州 → 福州",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "suzhou-xiamen",
    name: "苏州 → 厦门",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "suzhou-wuxi",
    name: "苏州 → 无锡",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "suzhou-dongguan",
    name: "苏州 → 东莞",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "suzhou-zhuhai",
    name: "苏州 → 珠海",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "suzhou-ningbo",
    name: "苏州 → 宁波",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "suzhou-shenyang",
    name: "苏州 → 沈阳",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "suzhou-lanzhou",
    name: "苏州 → 兰州",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "suzhou-haikou",
    name: "苏州 → 海口",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "suzhou-cangzhou",
    name: "苏州 → 沧州",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "suzhou-xuzhou",
    name: "苏州 → 徐州",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "suzhou-changzhou",
    name: "苏州 → 常州",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "suzhou-nantong",
    name: "苏州 → 南通",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "suzhou-wenzhou",
    name: "苏州 → 温州",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "suzhou-jiaxing",
    name: "苏州 → 嘉兴",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "suzhou-baoding",
    name: "苏州 → 保定",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "suzhou-tangshan",
    name: "苏州 → 唐山",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "suzhou-taiyuan",
    name: "苏州 → 太原",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "suzhou-hefei",
    name: "苏州 → 合肥",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "suzhou-foshan",
    name: "苏州 → 佛山",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "suzhou-shijiazhuang",
    name: "苏州 → 石家庄",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "suzhou-changchun",
    name: "苏州 → 长春",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "suzhou-guiyang",
    name: "苏州 → 贵阳",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "suzhou-nanning",
    name: "苏州 → 南宁",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "suzhou-jinhua",
    name: "苏州 → 金华",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "suzhou-shaoxing",
    name: "苏州 → 绍兴",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "suzhou-taizhou",
    name: "苏州 → 台州",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "suzhou-huizhou",
    name: "苏州 → 惠州",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "suzhou-zhongshan",
    name: "苏州 → 中山",
    cities: [
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "zhengzhou-beijing",
    name: "郑州 → 北京",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "zhengzhou-shanghai",
    name: "郑州 → 上海",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "zhengzhou-guangzhou",
    name: "郑州 → 广州",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "zhengzhou-shenzhen",
    name: "郑州 → 深圳",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "zhengzhou-chengdu",
    name: "郑州 → 成都",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "zhengzhou-hangzhou",
    name: "郑州 → 杭州",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "zhengzhou-wuhan",
    name: "郑州 → 武汉",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "zhengzhou-xian",
    name: "郑州 → 西安",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "zhengzhou-nanjing",
    name: "郑州 → 南京",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "zhengzhou-chongqing",
    name: "郑州 → 重庆",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "zhengzhou-tianjin",
    name: "郑州 → 天津",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "zhengzhou-suzhou",
    name: "郑州 → 苏州",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "zhengzhou-changsha",
    name: "郑州 → 长沙",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "zhengzhou-kunming",
    name: "郑州 → 昆明",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "zhengzhou-harbin",
    name: "郑州 → 哈尔滨",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "zhengzhou-dalian",
    name: "郑州 → 大连",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "zhengzhou-qingdao",
    name: "郑州 → 青岛",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "zhengzhou-jinan",
    name: "郑州 → 济南",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "zhengzhou-nanchang",
    name: "郑州 → 南昌",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "zhengzhou-fuzhou",
    name: "郑州 → 福州",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "zhengzhou-xiamen",
    name: "郑州 → 厦门",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "zhengzhou-wuxi",
    name: "郑州 → 无锡",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "zhengzhou-dongguan",
    name: "郑州 → 东莞",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "zhengzhou-zhuhai",
    name: "郑州 → 珠海",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "zhengzhou-ningbo",
    name: "郑州 → 宁波",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "zhengzhou-shenyang",
    name: "郑州 → 沈阳",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "zhengzhou-lanzhou",
    name: "郑州 → 兰州",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "zhengzhou-haikou",
    name: "郑州 → 海口",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "zhengzhou-cangzhou",
    name: "郑州 → 沧州",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "zhengzhou-xuzhou",
    name: "郑州 → 徐州",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "zhengzhou-changzhou",
    name: "郑州 → 常州",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "zhengzhou-nantong",
    name: "郑州 → 南通",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "zhengzhou-wenzhou",
    name: "郑州 → 温州",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "zhengzhou-jiaxing",
    name: "郑州 → 嘉兴",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "zhengzhou-baoding",
    name: "郑州 → 保定",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "zhengzhou-tangshan",
    name: "郑州 → 唐山",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "zhengzhou-taiyuan",
    name: "郑州 → 太原",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "zhengzhou-hefei",
    name: "郑州 → 合肥",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "zhengzhou-foshan",
    name: "郑州 → 佛山",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "zhengzhou-shijiazhuang",
    name: "郑州 → 石家庄",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "zhengzhou-changchun",
    name: "郑州 → 长春",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "zhengzhou-guiyang",
    name: "郑州 → 贵阳",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "zhengzhou-nanning",
    name: "郑州 → 南宁",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "zhengzhou-jinhua",
    name: "郑州 → 金华",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "zhengzhou-shaoxing",
    name: "郑州 → 绍兴",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "zhengzhou-taizhou",
    name: "郑州 → 台州",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "zhengzhou-huizhou",
    name: "郑州 → 惠州",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "zhengzhou-zhongshan",
    name: "郑州 → 中山",
    cities: [
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "changsha-beijing",
    name: "长沙 → 北京",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "changsha-shanghai",
    name: "长沙 → 上海",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "changsha-guangzhou",
    name: "长沙 → 广州",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "changsha-shenzhen",
    name: "长沙 → 深圳",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "changsha-chengdu",
    name: "长沙 → 成都",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "changsha-hangzhou",
    name: "长沙 → 杭州",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "changsha-wuhan",
    name: "长沙 → 武汉",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "changsha-xian",
    name: "长沙 → 西安",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "changsha-nanjing",
    name: "长沙 → 南京",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "changsha-chongqing",
    name: "长沙 → 重庆",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "changsha-tianjin",
    name: "长沙 → 天津",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "changsha-suzhou",
    name: "长沙 → 苏州",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "changsha-zhengzhou",
    name: "长沙 → 郑州",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "changsha-kunming",
    name: "长沙 → 昆明",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "changsha-harbin",
    name: "长沙 → 哈尔滨",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "changsha-dalian",
    name: "长沙 → 大连",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "changsha-qingdao",
    name: "长沙 → 青岛",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "changsha-jinan",
    name: "长沙 → 济南",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "changsha-nanchang",
    name: "长沙 → 南昌",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "changsha-fuzhou",
    name: "长沙 → 福州",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "changsha-xiamen",
    name: "长沙 → 厦门",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "changsha-wuxi",
    name: "长沙 → 无锡",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "changsha-dongguan",
    name: "长沙 → 东莞",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "changsha-zhuhai",
    name: "长沙 → 珠海",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "changsha-ningbo",
    name: "长沙 → 宁波",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "changsha-shenyang",
    name: "长沙 → 沈阳",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "changsha-lanzhou",
    name: "长沙 → 兰州",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "changsha-haikou",
    name: "长沙 → 海口",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "changsha-cangzhou",
    name: "长沙 → 沧州",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "changsha-xuzhou",
    name: "长沙 → 徐州",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "changsha-changzhou",
    name: "长沙 → 常州",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "changsha-nantong",
    name: "长沙 → 南通",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "changsha-wenzhou",
    name: "长沙 → 温州",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "changsha-jiaxing",
    name: "长沙 → 嘉兴",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "changsha-baoding",
    name: "长沙 → 保定",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "changsha-tangshan",
    name: "长沙 → 唐山",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "changsha-taiyuan",
    name: "长沙 → 太原",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "changsha-hefei",
    name: "长沙 → 合肥",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "changsha-foshan",
    name: "长沙 → 佛山",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "changsha-shijiazhuang",
    name: "长沙 → 石家庄",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "changsha-changchun",
    name: "长沙 → 长春",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "changsha-guiyang",
    name: "长沙 → 贵阳",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "changsha-nanning",
    name: "长沙 → 南宁",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "changsha-jinhua",
    name: "长沙 → 金华",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "changsha-shaoxing",
    name: "长沙 → 绍兴",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "changsha-taizhou",
    name: "长沙 → 台州",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "changsha-huizhou",
    name: "长沙 → 惠州",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "changsha-zhongshan",
    name: "长沙 → 中山",
    cities: [
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "kunming-beijing",
    name: "昆明 → 北京",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "kunming-shanghai",
    name: "昆明 → 上海",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "kunming-guangzhou",
    name: "昆明 → 广州",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "kunming-shenzhen",
    name: "昆明 → 深圳",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "kunming-chengdu",
    name: "昆明 → 成都",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "kunming-hangzhou",
    name: "昆明 → 杭州",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "kunming-wuhan",
    name: "昆明 → 武汉",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "kunming-xian",
    name: "昆明 → 西安",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "kunming-nanjing",
    name: "昆明 → 南京",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "kunming-chongqing",
    name: "昆明 → 重庆",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "kunming-tianjin",
    name: "昆明 → 天津",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "kunming-suzhou",
    name: "昆明 → 苏州",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "kunming-zhengzhou",
    name: "昆明 → 郑州",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "kunming-changsha",
    name: "昆明 → 长沙",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "kunming-harbin",
    name: "昆明 → 哈尔滨",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "kunming-dalian",
    name: "昆明 → 大连",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "kunming-qingdao",
    name: "昆明 → 青岛",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "kunming-jinan",
    name: "昆明 → 济南",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "kunming-nanchang",
    name: "昆明 → 南昌",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "kunming-fuzhou",
    name: "昆明 → 福州",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "kunming-xiamen",
    name: "昆明 → 厦门",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "kunming-wuxi",
    name: "昆明 → 无锡",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "kunming-dongguan",
    name: "昆明 → 东莞",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "kunming-zhuhai",
    name: "昆明 → 珠海",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "kunming-ningbo",
    name: "昆明 → 宁波",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "kunming-shenyang",
    name: "昆明 → 沈阳",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "kunming-lanzhou",
    name: "昆明 → 兰州",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "kunming-haikou",
    name: "昆明 → 海口",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "kunming-cangzhou",
    name: "昆明 → 沧州",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "kunming-xuzhou",
    name: "昆明 → 徐州",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "kunming-changzhou",
    name: "昆明 → 常州",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "kunming-nantong",
    name: "昆明 → 南通",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "kunming-wenzhou",
    name: "昆明 → 温州",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "kunming-jiaxing",
    name: "昆明 → 嘉兴",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "kunming-baoding",
    name: "昆明 → 保定",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "kunming-tangshan",
    name: "昆明 → 唐山",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "kunming-taiyuan",
    name: "昆明 → 太原",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "kunming-hefei",
    name: "昆明 → 合肥",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "kunming-foshan",
    name: "昆明 → 佛山",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "kunming-shijiazhuang",
    name: "昆明 → 石家庄",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "kunming-changchun",
    name: "昆明 → 长春",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "kunming-guiyang",
    name: "昆明 → 贵阳",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "kunming-nanning",
    name: "昆明 → 南宁",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "kunming-jinhua",
    name: "昆明 → 金华",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "kunming-shaoxing",
    name: "昆明 → 绍兴",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "kunming-taizhou",
    name: "昆明 → 台州",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "kunming-huizhou",
    name: "昆明 → 惠州",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "kunming-zhongshan",
    name: "昆明 → 中山",
    cities: [
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "harbin-beijing",
    name: "哈尔滨 → 北京",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "harbin-shanghai",
    name: "哈尔滨 → 上海",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "harbin-guangzhou",
    name: "哈尔滨 → 广州",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "harbin-shenzhen",
    name: "哈尔滨 → 深圳",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "harbin-chengdu",
    name: "哈尔滨 → 成都",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "harbin-hangzhou",
    name: "哈尔滨 → 杭州",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "harbin-wuhan",
    name: "哈尔滨 → 武汉",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "harbin-xian",
    name: "哈尔滨 → 西安",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "harbin-nanjing",
    name: "哈尔滨 → 南京",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "harbin-chongqing",
    name: "哈尔滨 → 重庆",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "harbin-tianjin",
    name: "哈尔滨 → 天津",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "harbin-suzhou",
    name: "哈尔滨 → 苏州",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "harbin-zhengzhou",
    name: "哈尔滨 → 郑州",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "harbin-changsha",
    name: "哈尔滨 → 长沙",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "harbin-kunming",
    name: "哈尔滨 → 昆明",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "harbin-dalian",
    name: "哈尔滨 → 大连",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "harbin-qingdao",
    name: "哈尔滨 → 青岛",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "harbin-jinan",
    name: "哈尔滨 → 济南",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "harbin-nanchang",
    name: "哈尔滨 → 南昌",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "harbin-fuzhou",
    name: "哈尔滨 → 福州",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "harbin-xiamen",
    name: "哈尔滨 → 厦门",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "harbin-wuxi",
    name: "哈尔滨 → 无锡",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "harbin-dongguan",
    name: "哈尔滨 → 东莞",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "harbin-zhuhai",
    name: "哈尔滨 → 珠海",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "harbin-ningbo",
    name: "哈尔滨 → 宁波",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "harbin-shenyang",
    name: "哈尔滨 → 沈阳",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "harbin-lanzhou",
    name: "哈尔滨 → 兰州",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "harbin-haikou",
    name: "哈尔滨 → 海口",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "harbin-cangzhou",
    name: "哈尔滨 → 沧州",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "harbin-xuzhou",
    name: "哈尔滨 → 徐州",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "harbin-changzhou",
    name: "哈尔滨 → 常州",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "harbin-nantong",
    name: "哈尔滨 → 南通",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "harbin-wenzhou",
    name: "哈尔滨 → 温州",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "harbin-jiaxing",
    name: "哈尔滨 → 嘉兴",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "harbin-baoding",
    name: "哈尔滨 → 保定",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "harbin-tangshan",
    name: "哈尔滨 → 唐山",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "harbin-taiyuan",
    name: "哈尔滨 → 太原",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "harbin-hefei",
    name: "哈尔滨 → 合肥",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "harbin-foshan",
    name: "哈尔滨 → 佛山",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "harbin-shijiazhuang",
    name: "哈尔滨 → 石家庄",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "harbin-changchun",
    name: "哈尔滨 → 长春",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "harbin-guiyang",
    name: "哈尔滨 → 贵阳",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "harbin-nanning",
    name: "哈尔滨 → 南宁",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "harbin-jinhua",
    name: "哈尔滨 → 金华",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "harbin-shaoxing",
    name: "哈尔滨 → 绍兴",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "harbin-taizhou",
    name: "哈尔滨 → 台州",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "harbin-huizhou",
    name: "哈尔滨 → 惠州",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "harbin-zhongshan",
    name: "哈尔滨 → 中山",
    cities: [
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "dalian-beijing",
    name: "大连 → 北京",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "dalian-shanghai",
    name: "大连 → 上海",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "dalian-guangzhou",
    name: "大连 → 广州",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "dalian-shenzhen",
    name: "大连 → 深圳",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "dalian-chengdu",
    name: "大连 → 成都",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "dalian-hangzhou",
    name: "大连 → 杭州",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "dalian-wuhan",
    name: "大连 → 武汉",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "dalian-xian",
    name: "大连 → 西安",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "dalian-nanjing",
    name: "大连 → 南京",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "dalian-chongqing",
    name: "大连 → 重庆",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "dalian-tianjin",
    name: "大连 → 天津",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "dalian-suzhou",
    name: "大连 → 苏州",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "dalian-zhengzhou",
    name: "大连 → 郑州",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "dalian-changsha",
    name: "大连 → 长沙",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "dalian-kunming",
    name: "大连 → 昆明",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "dalian-harbin",
    name: "大连 → 哈尔滨",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "dalian-qingdao",
    name: "大连 → 青岛",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "dalian-jinan",
    name: "大连 → 济南",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "dalian-nanchang",
    name: "大连 → 南昌",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "dalian-fuzhou",
    name: "大连 → 福州",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "dalian-xiamen",
    name: "大连 → 厦门",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "dalian-wuxi",
    name: "大连 → 无锡",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "dalian-dongguan",
    name: "大连 → 东莞",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "dalian-zhuhai",
    name: "大连 → 珠海",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "dalian-ningbo",
    name: "大连 → 宁波",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "dalian-shenyang",
    name: "大连 → 沈阳",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "dalian-lanzhou",
    name: "大连 → 兰州",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "dalian-haikou",
    name: "大连 → 海口",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "dalian-cangzhou",
    name: "大连 → 沧州",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "dalian-xuzhou",
    name: "大连 → 徐州",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "dalian-changzhou",
    name: "大连 → 常州",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "dalian-nantong",
    name: "大连 → 南通",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "dalian-wenzhou",
    name: "大连 → 温州",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "dalian-jiaxing",
    name: "大连 → 嘉兴",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "dalian-baoding",
    name: "大连 → 保定",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "dalian-tangshan",
    name: "大连 → 唐山",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "dalian-taiyuan",
    name: "大连 → 太原",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "dalian-hefei",
    name: "大连 → 合肥",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "dalian-foshan",
    name: "大连 → 佛山",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "dalian-shijiazhuang",
    name: "大连 → 石家庄",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "dalian-changchun",
    name: "大连 → 长春",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "dalian-guiyang",
    name: "大连 → 贵阳",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "dalian-nanning",
    name: "大连 → 南宁",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "dalian-jinhua",
    name: "大连 → 金华",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "dalian-shaoxing",
    name: "大连 → 绍兴",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "dalian-taizhou",
    name: "大连 → 台州",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "dalian-huizhou",
    name: "大连 → 惠州",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "dalian-zhongshan",
    name: "大连 → 中山",
    cities: [
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "qingdao-beijing",
    name: "青岛 → 北京",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "qingdao-shanghai",
    name: "青岛 → 上海",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "qingdao-guangzhou",
    name: "青岛 → 广州",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "qingdao-shenzhen",
    name: "青岛 → 深圳",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "qingdao-chengdu",
    name: "青岛 → 成都",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "qingdao-hangzhou",
    name: "青岛 → 杭州",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "qingdao-wuhan",
    name: "青岛 → 武汉",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "qingdao-xian",
    name: "青岛 → 西安",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "qingdao-nanjing",
    name: "青岛 → 南京",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "qingdao-chongqing",
    name: "青岛 → 重庆",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "qingdao-tianjin",
    name: "青岛 → 天津",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "qingdao-suzhou",
    name: "青岛 → 苏州",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "qingdao-zhengzhou",
    name: "青岛 → 郑州",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "qingdao-changsha",
    name: "青岛 → 长沙",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "qingdao-kunming",
    name: "青岛 → 昆明",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "qingdao-harbin",
    name: "青岛 → 哈尔滨",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "qingdao-dalian",
    name: "青岛 → 大连",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "qingdao-jinan",
    name: "青岛 → 济南",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "qingdao-nanchang",
    name: "青岛 → 南昌",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "qingdao-fuzhou",
    name: "青岛 → 福州",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "qingdao-xiamen",
    name: "青岛 → 厦门",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "qingdao-wuxi",
    name: "青岛 → 无锡",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "qingdao-dongguan",
    name: "青岛 → 东莞",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "qingdao-zhuhai",
    name: "青岛 → 珠海",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "qingdao-ningbo",
    name: "青岛 → 宁波",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "qingdao-shenyang",
    name: "青岛 → 沈阳",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "qingdao-lanzhou",
    name: "青岛 → 兰州",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "qingdao-haikou",
    name: "青岛 → 海口",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "qingdao-cangzhou",
    name: "青岛 → 沧州",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "qingdao-xuzhou",
    name: "青岛 → 徐州",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "qingdao-changzhou",
    name: "青岛 → 常州",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "qingdao-nantong",
    name: "青岛 → 南通",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "qingdao-wenzhou",
    name: "青岛 → 温州",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "qingdao-jiaxing",
    name: "青岛 → 嘉兴",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "qingdao-baoding",
    name: "青岛 → 保定",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "qingdao-tangshan",
    name: "青岛 → 唐山",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "qingdao-taiyuan",
    name: "青岛 → 太原",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "qingdao-hefei",
    name: "青岛 → 合肥",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "qingdao-foshan",
    name: "青岛 → 佛山",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "qingdao-shijiazhuang",
    name: "青岛 → 石家庄",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "qingdao-changchun",
    name: "青岛 → 长春",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "qingdao-guiyang",
    name: "青岛 → 贵阳",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "qingdao-nanning",
    name: "青岛 → 南宁",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "qingdao-jinhua",
    name: "青岛 → 金华",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "qingdao-shaoxing",
    name: "青岛 → 绍兴",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "qingdao-taizhou",
    name: "青岛 → 台州",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "qingdao-huizhou",
    name: "青岛 → 惠州",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "qingdao-zhongshan",
    name: "青岛 → 中山",
    cities: [
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "jinan-beijing",
    name: "济南 → 北京",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "jinan-shanghai",
    name: "济南 → 上海",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "jinan-guangzhou",
    name: "济南 → 广州",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "jinan-shenzhen",
    name: "济南 → 深圳",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "jinan-chengdu",
    name: "济南 → 成都",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "jinan-hangzhou",
    name: "济南 → 杭州",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "jinan-wuhan",
    name: "济南 → 武汉",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "jinan-xian",
    name: "济南 → 西安",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "jinan-nanjing",
    name: "济南 → 南京",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "jinan-chongqing",
    name: "济南 → 重庆",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "jinan-tianjin",
    name: "济南 → 天津",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "jinan-suzhou",
    name: "济南 → 苏州",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "jinan-zhengzhou",
    name: "济南 → 郑州",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "jinan-changsha",
    name: "济南 → 长沙",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "jinan-kunming",
    name: "济南 → 昆明",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "jinan-harbin",
    name: "济南 → 哈尔滨",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "jinan-dalian",
    name: "济南 → 大连",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "jinan-qingdao",
    name: "济南 → 青岛",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "jinan-nanchang",
    name: "济南 → 南昌",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "jinan-fuzhou",
    name: "济南 → 福州",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "jinan-xiamen",
    name: "济南 → 厦门",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "jinan-wuxi",
    name: "济南 → 无锡",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "jinan-dongguan",
    name: "济南 → 东莞",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "jinan-zhuhai",
    name: "济南 → 珠海",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "jinan-ningbo",
    name: "济南 → 宁波",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "jinan-shenyang",
    name: "济南 → 沈阳",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "jinan-lanzhou",
    name: "济南 → 兰州",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "jinan-haikou",
    name: "济南 → 海口",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "jinan-cangzhou",
    name: "济南 → 沧州",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "jinan-xuzhou",
    name: "济南 → 徐州",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "jinan-changzhou",
    name: "济南 → 常州",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "jinan-nantong",
    name: "济南 → 南通",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "jinan-wenzhou",
    name: "济南 → 温州",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "jinan-jiaxing",
    name: "济南 → 嘉兴",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "jinan-baoding",
    name: "济南 → 保定",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "jinan-tangshan",
    name: "济南 → 唐山",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "jinan-taiyuan",
    name: "济南 → 太原",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "jinan-hefei",
    name: "济南 → 合肥",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "jinan-foshan",
    name: "济南 → 佛山",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "jinan-shijiazhuang",
    name: "济南 → 石家庄",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "jinan-changchun",
    name: "济南 → 长春",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "jinan-guiyang",
    name: "济南 → 贵阳",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "jinan-nanning",
    name: "济南 → 南宁",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "jinan-jinhua",
    name: "济南 → 金华",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "jinan-shaoxing",
    name: "济南 → 绍兴",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "jinan-taizhou",
    name: "济南 → 台州",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "jinan-huizhou",
    name: "济南 → 惠州",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "jinan-zhongshan",
    name: "济南 → 中山",
    cities: [
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "nanchang-beijing",
    name: "南昌 → 北京",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "nanchang-shanghai",
    name: "南昌 → 上海",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "nanchang-guangzhou",
    name: "南昌 → 广州",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "nanchang-shenzhen",
    name: "南昌 → 深圳",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "nanchang-chengdu",
    name: "南昌 → 成都",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "nanchang-hangzhou",
    name: "南昌 → 杭州",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "nanchang-wuhan",
    name: "南昌 → 武汉",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "nanchang-xian",
    name: "南昌 → 西安",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "nanchang-nanjing",
    name: "南昌 → 南京",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "nanchang-chongqing",
    name: "南昌 → 重庆",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "nanchang-tianjin",
    name: "南昌 → 天津",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "nanchang-suzhou",
    name: "南昌 → 苏州",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "nanchang-zhengzhou",
    name: "南昌 → 郑州",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "nanchang-changsha",
    name: "南昌 → 长沙",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "nanchang-kunming",
    name: "南昌 → 昆明",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "nanchang-harbin",
    name: "南昌 → 哈尔滨",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "nanchang-dalian",
    name: "南昌 → 大连",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "nanchang-qingdao",
    name: "南昌 → 青岛",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "nanchang-jinan",
    name: "南昌 → 济南",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "nanchang-fuzhou",
    name: "南昌 → 福州",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "nanchang-xiamen",
    name: "南昌 → 厦门",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "nanchang-wuxi",
    name: "南昌 → 无锡",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "nanchang-dongguan",
    name: "南昌 → 东莞",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "nanchang-zhuhai",
    name: "南昌 → 珠海",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "nanchang-ningbo",
    name: "南昌 → 宁波",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "nanchang-shenyang",
    name: "南昌 → 沈阳",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "nanchang-lanzhou",
    name: "南昌 → 兰州",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "nanchang-haikou",
    name: "南昌 → 海口",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "nanchang-cangzhou",
    name: "南昌 → 沧州",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "nanchang-xuzhou",
    name: "南昌 → 徐州",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "nanchang-changzhou",
    name: "南昌 → 常州",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "nanchang-nantong",
    name: "南昌 → 南通",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "nanchang-wenzhou",
    name: "南昌 → 温州",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "nanchang-jiaxing",
    name: "南昌 → 嘉兴",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "nanchang-baoding",
    name: "南昌 → 保定",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "nanchang-tangshan",
    name: "南昌 → 唐山",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "nanchang-taiyuan",
    name: "南昌 → 太原",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "nanchang-hefei",
    name: "南昌 → 合肥",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "nanchang-foshan",
    name: "南昌 → 佛山",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "nanchang-shijiazhuang",
    name: "南昌 → 石家庄",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "nanchang-changchun",
    name: "南昌 → 长春",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "nanchang-guiyang",
    name: "南昌 → 贵阳",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "nanchang-nanning",
    name: "南昌 → 南宁",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "nanchang-jinhua",
    name: "南昌 → 金华",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "nanchang-shaoxing",
    name: "南昌 → 绍兴",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "nanchang-taizhou",
    name: "南昌 → 台州",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "nanchang-huizhou",
    name: "南昌 → 惠州",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "nanchang-zhongshan",
    name: "南昌 → 中山",
    cities: [
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "fuzhou-beijing",
    name: "福州 → 北京",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "fuzhou-shanghai",
    name: "福州 → 上海",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "fuzhou-guangzhou",
    name: "福州 → 广州",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "fuzhou-shenzhen",
    name: "福州 → 深圳",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "fuzhou-chengdu",
    name: "福州 → 成都",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "fuzhou-hangzhou",
    name: "福州 → 杭州",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "fuzhou-wuhan",
    name: "福州 → 武汉",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "fuzhou-xian",
    name: "福州 → 西安",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "fuzhou-nanjing",
    name: "福州 → 南京",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "fuzhou-chongqing",
    name: "福州 → 重庆",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "fuzhou-tianjin",
    name: "福州 → 天津",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "fuzhou-suzhou",
    name: "福州 → 苏州",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "fuzhou-zhengzhou",
    name: "福州 → 郑州",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "fuzhou-changsha",
    name: "福州 → 长沙",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "fuzhou-kunming",
    name: "福州 → 昆明",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "fuzhou-harbin",
    name: "福州 → 哈尔滨",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "fuzhou-dalian",
    name: "福州 → 大连",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "fuzhou-qingdao",
    name: "福州 → 青岛",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "fuzhou-jinan",
    name: "福州 → 济南",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "fuzhou-nanchang",
    name: "福州 → 南昌",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "fuzhou-xiamen",
    name: "福州 → 厦门",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "fuzhou-wuxi",
    name: "福州 → 无锡",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "fuzhou-dongguan",
    name: "福州 → 东莞",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "fuzhou-zhuhai",
    name: "福州 → 珠海",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "fuzhou-ningbo",
    name: "福州 → 宁波",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "fuzhou-shenyang",
    name: "福州 → 沈阳",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "fuzhou-lanzhou",
    name: "福州 → 兰州",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "fuzhou-haikou",
    name: "福州 → 海口",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "fuzhou-cangzhou",
    name: "福州 → 沧州",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "fuzhou-xuzhou",
    name: "福州 → 徐州",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "fuzhou-changzhou",
    name: "福州 → 常州",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "fuzhou-nantong",
    name: "福州 → 南通",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "fuzhou-wenzhou",
    name: "福州 → 温州",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "fuzhou-jiaxing",
    name: "福州 → 嘉兴",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "fuzhou-baoding",
    name: "福州 → 保定",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "fuzhou-tangshan",
    name: "福州 → 唐山",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "fuzhou-taiyuan",
    name: "福州 → 太原",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "fuzhou-hefei",
    name: "福州 → 合肥",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "fuzhou-foshan",
    name: "福州 → 佛山",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "fuzhou-shijiazhuang",
    name: "福州 → 石家庄",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "fuzhou-changchun",
    name: "福州 → 长春",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "fuzhou-guiyang",
    name: "福州 → 贵阳",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "fuzhou-nanning",
    name: "福州 → 南宁",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "fuzhou-jinhua",
    name: "福州 → 金华",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "fuzhou-shaoxing",
    name: "福州 → 绍兴",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "fuzhou-taizhou",
    name: "福州 → 台州",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "fuzhou-huizhou",
    name: "福州 → 惠州",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "fuzhou-zhongshan",
    name: "福州 → 中山",
    cities: [
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "xiamen-beijing",
    name: "厦门 → 北京",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "xiamen-shanghai",
    name: "厦门 → 上海",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "xiamen-guangzhou",
    name: "厦门 → 广州",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "xiamen-shenzhen",
    name: "厦门 → 深圳",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "xiamen-chengdu",
    name: "厦门 → 成都",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "xiamen-hangzhou",
    name: "厦门 → 杭州",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "xiamen-wuhan",
    name: "厦门 → 武汉",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "xiamen-xian",
    name: "厦门 → 西安",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "xiamen-nanjing",
    name: "厦门 → 南京",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "xiamen-chongqing",
    name: "厦门 → 重庆",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "xiamen-tianjin",
    name: "厦门 → 天津",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "xiamen-suzhou",
    name: "厦门 → 苏州",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "xiamen-zhengzhou",
    name: "厦门 → 郑州",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "xiamen-changsha",
    name: "厦门 → 长沙",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "xiamen-kunming",
    name: "厦门 → 昆明",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "xiamen-harbin",
    name: "厦门 → 哈尔滨",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "xiamen-dalian",
    name: "厦门 → 大连",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "xiamen-qingdao",
    name: "厦门 → 青岛",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "xiamen-jinan",
    name: "厦门 → 济南",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "xiamen-nanchang",
    name: "厦门 → 南昌",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "xiamen-fuzhou",
    name: "厦门 → 福州",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "xiamen-wuxi",
    name: "厦门 → 无锡",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "xiamen-dongguan",
    name: "厦门 → 东莞",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "xiamen-zhuhai",
    name: "厦门 → 珠海",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "xiamen-ningbo",
    name: "厦门 → 宁波",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "xiamen-shenyang",
    name: "厦门 → 沈阳",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "xiamen-lanzhou",
    name: "厦门 → 兰州",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "xiamen-haikou",
    name: "厦门 → 海口",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "xiamen-cangzhou",
    name: "厦门 → 沧州",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "xiamen-xuzhou",
    name: "厦门 → 徐州",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "xiamen-changzhou",
    name: "厦门 → 常州",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "xiamen-nantong",
    name: "厦门 → 南通",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "xiamen-wenzhou",
    name: "厦门 → 温州",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "xiamen-jiaxing",
    name: "厦门 → 嘉兴",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "xiamen-baoding",
    name: "厦门 → 保定",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "xiamen-tangshan",
    name: "厦门 → 唐山",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "xiamen-taiyuan",
    name: "厦门 → 太原",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "xiamen-hefei",
    name: "厦门 → 合肥",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "xiamen-foshan",
    name: "厦门 → 佛山",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "xiamen-shijiazhuang",
    name: "厦门 → 石家庄",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "xiamen-changchun",
    name: "厦门 → 长春",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "xiamen-guiyang",
    name: "厦门 → 贵阳",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "xiamen-nanning",
    name: "厦门 → 南宁",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "xiamen-jinhua",
    name: "厦门 → 金华",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "xiamen-shaoxing",
    name: "厦门 → 绍兴",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "xiamen-taizhou",
    name: "厦门 → 台州",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "xiamen-huizhou",
    name: "厦门 → 惠州",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "xiamen-zhongshan",
    name: "厦门 → 中山",
    cities: [
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "wuxi-beijing",
    name: "无锡 → 北京",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "wuxi-shanghai",
    name: "无锡 → 上海",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "wuxi-guangzhou",
    name: "无锡 → 广州",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "wuxi-shenzhen",
    name: "无锡 → 深圳",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "wuxi-chengdu",
    name: "无锡 → 成都",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "wuxi-hangzhou",
    name: "无锡 → 杭州",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "wuxi-wuhan",
    name: "无锡 → 武汉",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "wuxi-xian",
    name: "无锡 → 西安",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "wuxi-nanjing",
    name: "无锡 → 南京",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "wuxi-chongqing",
    name: "无锡 → 重庆",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "wuxi-tianjin",
    name: "无锡 → 天津",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "wuxi-suzhou",
    name: "无锡 → 苏州",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "wuxi-zhengzhou",
    name: "无锡 → 郑州",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "wuxi-changsha",
    name: "无锡 → 长沙",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "wuxi-kunming",
    name: "无锡 → 昆明",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "wuxi-harbin",
    name: "无锡 → 哈尔滨",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "wuxi-dalian",
    name: "无锡 → 大连",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "wuxi-qingdao",
    name: "无锡 → 青岛",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "wuxi-jinan",
    name: "无锡 → 济南",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "wuxi-nanchang",
    name: "无锡 → 南昌",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "wuxi-fuzhou",
    name: "无锡 → 福州",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "wuxi-xiamen",
    name: "无锡 → 厦门",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "wuxi-dongguan",
    name: "无锡 → 东莞",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "wuxi-zhuhai",
    name: "无锡 → 珠海",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "wuxi-ningbo",
    name: "无锡 → 宁波",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "wuxi-shenyang",
    name: "无锡 → 沈阳",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "wuxi-lanzhou",
    name: "无锡 → 兰州",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "wuxi-haikou",
    name: "无锡 → 海口",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "wuxi-cangzhou",
    name: "无锡 → 沧州",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "wuxi-xuzhou",
    name: "无锡 → 徐州",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "wuxi-changzhou",
    name: "无锡 → 常州",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "wuxi-nantong",
    name: "无锡 → 南通",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "wuxi-wenzhou",
    name: "无锡 → 温州",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "wuxi-jiaxing",
    name: "无锡 → 嘉兴",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "wuxi-baoding",
    name: "无锡 → 保定",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "wuxi-tangshan",
    name: "无锡 → 唐山",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "wuxi-taiyuan",
    name: "无锡 → 太原",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "wuxi-hefei",
    name: "无锡 → 合肥",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "wuxi-foshan",
    name: "无锡 → 佛山",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "wuxi-shijiazhuang",
    name: "无锡 → 石家庄",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "wuxi-changchun",
    name: "无锡 → 长春",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "wuxi-guiyang",
    name: "无锡 → 贵阳",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "wuxi-nanning",
    name: "无锡 → 南宁",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "wuxi-jinhua",
    name: "无锡 → 金华",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "wuxi-shaoxing",
    name: "无锡 → 绍兴",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "wuxi-taizhou",
    name: "无锡 → 台州",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "wuxi-huizhou",
    name: "无锡 → 惠州",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "wuxi-zhongshan",
    name: "无锡 → 中山",
    cities: [
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "dongguan-beijing",
    name: "东莞 → 北京",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "dongguan-shanghai",
    name: "东莞 → 上海",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "dongguan-guangzhou",
    name: "东莞 → 广州",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "dongguan-shenzhen",
    name: "东莞 → 深圳",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "dongguan-chengdu",
    name: "东莞 → 成都",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "dongguan-hangzhou",
    name: "东莞 → 杭州",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "dongguan-wuhan",
    name: "东莞 → 武汉",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "dongguan-xian",
    name: "东莞 → 西安",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "dongguan-nanjing",
    name: "东莞 → 南京",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "dongguan-chongqing",
    name: "东莞 → 重庆",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "dongguan-tianjin",
    name: "东莞 → 天津",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "dongguan-suzhou",
    name: "东莞 → 苏州",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "dongguan-zhengzhou",
    name: "东莞 → 郑州",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "dongguan-changsha",
    name: "东莞 → 长沙",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "dongguan-kunming",
    name: "东莞 → 昆明",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "dongguan-harbin",
    name: "东莞 → 哈尔滨",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "dongguan-dalian",
    name: "东莞 → 大连",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "dongguan-qingdao",
    name: "东莞 → 青岛",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "dongguan-jinan",
    name: "东莞 → 济南",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "dongguan-nanchang",
    name: "东莞 → 南昌",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "dongguan-fuzhou",
    name: "东莞 → 福州",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "dongguan-xiamen",
    name: "东莞 → 厦门",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "dongguan-wuxi",
    name: "东莞 → 无锡",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "dongguan-zhuhai",
    name: "东莞 → 珠海",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "dongguan-ningbo",
    name: "东莞 → 宁波",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "dongguan-shenyang",
    name: "东莞 → 沈阳",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "dongguan-lanzhou",
    name: "东莞 → 兰州",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "dongguan-haikou",
    name: "东莞 → 海口",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "dongguan-cangzhou",
    name: "东莞 → 沧州",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "dongguan-xuzhou",
    name: "东莞 → 徐州",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "dongguan-changzhou",
    name: "东莞 → 常州",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "dongguan-nantong",
    name: "东莞 → 南通",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "dongguan-wenzhou",
    name: "东莞 → 温州",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "dongguan-jiaxing",
    name: "东莞 → 嘉兴",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "dongguan-baoding",
    name: "东莞 → 保定",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "dongguan-tangshan",
    name: "东莞 → 唐山",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "dongguan-taiyuan",
    name: "东莞 → 太原",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "dongguan-hefei",
    name: "东莞 → 合肥",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "dongguan-foshan",
    name: "东莞 → 佛山",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "dongguan-shijiazhuang",
    name: "东莞 → 石家庄",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "dongguan-changchun",
    name: "东莞 → 长春",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "dongguan-guiyang",
    name: "东莞 → 贵阳",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "dongguan-nanning",
    name: "东莞 → 南宁",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "dongguan-jinhua",
    name: "东莞 → 金华",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "dongguan-shaoxing",
    name: "东莞 → 绍兴",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "dongguan-taizhou",
    name: "东莞 → 台州",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "dongguan-huizhou",
    name: "东莞 → 惠州",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "dongguan-zhongshan",
    name: "东莞 → 中山",
    cities: [
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "zhuhai-beijing",
    name: "珠海 → 北京",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "zhuhai-shanghai",
    name: "珠海 → 上海",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "zhuhai-guangzhou",
    name: "珠海 → 广州",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "zhuhai-shenzhen",
    name: "珠海 → 深圳",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "zhuhai-chengdu",
    name: "珠海 → 成都",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "zhuhai-hangzhou",
    name: "珠海 → 杭州",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "zhuhai-wuhan",
    name: "珠海 → 武汉",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "zhuhai-xian",
    name: "珠海 → 西安",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "zhuhai-nanjing",
    name: "珠海 → 南京",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "zhuhai-chongqing",
    name: "珠海 → 重庆",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "zhuhai-tianjin",
    name: "珠海 → 天津",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "zhuhai-suzhou",
    name: "珠海 → 苏州",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "zhuhai-zhengzhou",
    name: "珠海 → 郑州",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "zhuhai-changsha",
    name: "珠海 → 长沙",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "zhuhai-kunming",
    name: "珠海 → 昆明",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "zhuhai-harbin",
    name: "珠海 → 哈尔滨",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "zhuhai-dalian",
    name: "珠海 → 大连",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "zhuhai-qingdao",
    name: "珠海 → 青岛",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "zhuhai-jinan",
    name: "珠海 → 济南",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "zhuhai-nanchang",
    name: "珠海 → 南昌",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "zhuhai-fuzhou",
    name: "珠海 → 福州",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "zhuhai-xiamen",
    name: "珠海 → 厦门",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "zhuhai-wuxi",
    name: "珠海 → 无锡",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "zhuhai-dongguan",
    name: "珠海 → 东莞",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "zhuhai-ningbo",
    name: "珠海 → 宁波",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "zhuhai-shenyang",
    name: "珠海 → 沈阳",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "zhuhai-lanzhou",
    name: "珠海 → 兰州",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "zhuhai-haikou",
    name: "珠海 → 海口",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "zhuhai-cangzhou",
    name: "珠海 → 沧州",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "zhuhai-xuzhou",
    name: "珠海 → 徐州",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "zhuhai-changzhou",
    name: "珠海 → 常州",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "zhuhai-nantong",
    name: "珠海 → 南通",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "zhuhai-wenzhou",
    name: "珠海 → 温州",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "zhuhai-jiaxing",
    name: "珠海 → 嘉兴",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "zhuhai-baoding",
    name: "珠海 → 保定",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "zhuhai-tangshan",
    name: "珠海 → 唐山",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "zhuhai-taiyuan",
    name: "珠海 → 太原",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "zhuhai-hefei",
    name: "珠海 → 合肥",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "zhuhai-foshan",
    name: "珠海 → 佛山",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "zhuhai-shijiazhuang",
    name: "珠海 → 石家庄",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "zhuhai-changchun",
    name: "珠海 → 长春",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "zhuhai-guiyang",
    name: "珠海 → 贵阳",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "zhuhai-nanning",
    name: "珠海 → 南宁",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "zhuhai-jinhua",
    name: "珠海 → 金华",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "zhuhai-shaoxing",
    name: "珠海 → 绍兴",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "zhuhai-taizhou",
    name: "珠海 → 台州",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "zhuhai-huizhou",
    name: "珠海 → 惠州",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "zhuhai-zhongshan",
    name: "珠海 → 中山",
    cities: [
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "ningbo-beijing",
    name: "宁波 → 北京",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "ningbo-shanghai",
    name: "宁波 → 上海",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "ningbo-guangzhou",
    name: "宁波 → 广州",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "ningbo-shenzhen",
    name: "宁波 → 深圳",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "ningbo-chengdu",
    name: "宁波 → 成都",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "ningbo-hangzhou",
    name: "宁波 → 杭州",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "ningbo-wuhan",
    name: "宁波 → 武汉",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "ningbo-xian",
    name: "宁波 → 西安",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "ningbo-nanjing",
    name: "宁波 → 南京",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "ningbo-chongqing",
    name: "宁波 → 重庆",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "ningbo-tianjin",
    name: "宁波 → 天津",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "ningbo-suzhou",
    name: "宁波 → 苏州",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "ningbo-zhengzhou",
    name: "宁波 → 郑州",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "ningbo-changsha",
    name: "宁波 → 长沙",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "ningbo-kunming",
    name: "宁波 → 昆明",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "ningbo-harbin",
    name: "宁波 → 哈尔滨",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "ningbo-dalian",
    name: "宁波 → 大连",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "ningbo-qingdao",
    name: "宁波 → 青岛",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "ningbo-jinan",
    name: "宁波 → 济南",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "ningbo-nanchang",
    name: "宁波 → 南昌",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "ningbo-fuzhou",
    name: "宁波 → 福州",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "ningbo-xiamen",
    name: "宁波 → 厦门",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "ningbo-wuxi",
    name: "宁波 → 无锡",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "ningbo-dongguan",
    name: "宁波 → 东莞",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "ningbo-zhuhai",
    name: "宁波 → 珠海",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "ningbo-shenyang",
    name: "宁波 → 沈阳",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "ningbo-lanzhou",
    name: "宁波 → 兰州",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "ningbo-haikou",
    name: "宁波 → 海口",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "ningbo-cangzhou",
    name: "宁波 → 沧州",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "ningbo-xuzhou",
    name: "宁波 → 徐州",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "ningbo-changzhou",
    name: "宁波 → 常州",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "ningbo-nantong",
    name: "宁波 → 南通",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "ningbo-wenzhou",
    name: "宁波 → 温州",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "ningbo-jiaxing",
    name: "宁波 → 嘉兴",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "ningbo-baoding",
    name: "宁波 → 保定",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "ningbo-tangshan",
    name: "宁波 → 唐山",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "ningbo-taiyuan",
    name: "宁波 → 太原",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "ningbo-hefei",
    name: "宁波 → 合肥",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "ningbo-foshan",
    name: "宁波 → 佛山",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "ningbo-shijiazhuang",
    name: "宁波 → 石家庄",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "ningbo-changchun",
    name: "宁波 → 长春",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "ningbo-guiyang",
    name: "宁波 → 贵阳",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "ningbo-nanning",
    name: "宁波 → 南宁",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "ningbo-jinhua",
    name: "宁波 → 金华",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "ningbo-shaoxing",
    name: "宁波 → 绍兴",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "ningbo-taizhou",
    name: "宁波 → 台州",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "ningbo-huizhou",
    name: "宁波 → 惠州",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "ningbo-zhongshan",
    name: "宁波 → 中山",
    cities: [
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "shenyang-beijing",
    name: "沈阳 → 北京",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "shenyang-shanghai",
    name: "沈阳 → 上海",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "shenyang-guangzhou",
    name: "沈阳 → 广州",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "shenyang-shenzhen",
    name: "沈阳 → 深圳",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "shenyang-chengdu",
    name: "沈阳 → 成都",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "shenyang-hangzhou",
    name: "沈阳 → 杭州",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "shenyang-wuhan",
    name: "沈阳 → 武汉",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "shenyang-xian",
    name: "沈阳 → 西安",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "shenyang-nanjing",
    name: "沈阳 → 南京",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "shenyang-chongqing",
    name: "沈阳 → 重庆",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "shenyang-tianjin",
    name: "沈阳 → 天津",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "shenyang-suzhou",
    name: "沈阳 → 苏州",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "shenyang-zhengzhou",
    name: "沈阳 → 郑州",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "shenyang-changsha",
    name: "沈阳 → 长沙",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "shenyang-kunming",
    name: "沈阳 → 昆明",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "shenyang-harbin",
    name: "沈阳 → 哈尔滨",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "shenyang-dalian",
    name: "沈阳 → 大连",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "shenyang-qingdao",
    name: "沈阳 → 青岛",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "shenyang-jinan",
    name: "沈阳 → 济南",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "shenyang-nanchang",
    name: "沈阳 → 南昌",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "shenyang-fuzhou",
    name: "沈阳 → 福州",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "shenyang-xiamen",
    name: "沈阳 → 厦门",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "shenyang-wuxi",
    name: "沈阳 → 无锡",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "shenyang-dongguan",
    name: "沈阳 → 东莞",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "shenyang-zhuhai",
    name: "沈阳 → 珠海",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "shenyang-ningbo",
    name: "沈阳 → 宁波",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "shenyang-lanzhou",
    name: "沈阳 → 兰州",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "shenyang-haikou",
    name: "沈阳 → 海口",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "shenyang-cangzhou",
    name: "沈阳 → 沧州",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "shenyang-xuzhou",
    name: "沈阳 → 徐州",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "shenyang-changzhou",
    name: "沈阳 → 常州",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "shenyang-nantong",
    name: "沈阳 → 南通",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "shenyang-wenzhou",
    name: "沈阳 → 温州",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "shenyang-jiaxing",
    name: "沈阳 → 嘉兴",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "shenyang-baoding",
    name: "沈阳 → 保定",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "shenyang-tangshan",
    name: "沈阳 → 唐山",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "shenyang-taiyuan",
    name: "沈阳 → 太原",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "shenyang-hefei",
    name: "沈阳 → 合肥",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "shenyang-foshan",
    name: "沈阳 → 佛山",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "shenyang-shijiazhuang",
    name: "沈阳 → 石家庄",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "shenyang-changchun",
    name: "沈阳 → 长春",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "shenyang-guiyang",
    name: "沈阳 → 贵阳",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "shenyang-nanning",
    name: "沈阳 → 南宁",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "shenyang-jinhua",
    name: "沈阳 → 金华",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "shenyang-shaoxing",
    name: "沈阳 → 绍兴",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "shenyang-taizhou",
    name: "沈阳 → 台州",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "shenyang-huizhou",
    name: "沈阳 → 惠州",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "shenyang-zhongshan",
    name: "沈阳 → 中山",
    cities: [
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "lanzhou-beijing",
    name: "兰州 → 北京",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "lanzhou-shanghai",
    name: "兰州 → 上海",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "lanzhou-guangzhou",
    name: "兰州 → 广州",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "lanzhou-shenzhen",
    name: "兰州 → 深圳",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "lanzhou-chengdu",
    name: "兰州 → 成都",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "lanzhou-hangzhou",
    name: "兰州 → 杭州",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "lanzhou-wuhan",
    name: "兰州 → 武汉",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "lanzhou-xian",
    name: "兰州 → 西安",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "lanzhou-nanjing",
    name: "兰州 → 南京",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "lanzhou-chongqing",
    name: "兰州 → 重庆",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "lanzhou-tianjin",
    name: "兰州 → 天津",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "lanzhou-suzhou",
    name: "兰州 → 苏州",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "lanzhou-zhengzhou",
    name: "兰州 → 郑州",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "lanzhou-changsha",
    name: "兰州 → 长沙",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "lanzhou-kunming",
    name: "兰州 → 昆明",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "lanzhou-harbin",
    name: "兰州 → 哈尔滨",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "lanzhou-dalian",
    name: "兰州 → 大连",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "lanzhou-qingdao",
    name: "兰州 → 青岛",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "lanzhou-jinan",
    name: "兰州 → 济南",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "lanzhou-nanchang",
    name: "兰州 → 南昌",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "lanzhou-fuzhou",
    name: "兰州 → 福州",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "lanzhou-xiamen",
    name: "兰州 → 厦门",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "lanzhou-wuxi",
    name: "兰州 → 无锡",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "lanzhou-dongguan",
    name: "兰州 → 东莞",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "lanzhou-zhuhai",
    name: "兰州 → 珠海",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "lanzhou-ningbo",
    name: "兰州 → 宁波",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "lanzhou-shenyang",
    name: "兰州 → 沈阳",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "lanzhou-haikou",
    name: "兰州 → 海口",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "lanzhou-cangzhou",
    name: "兰州 → 沧州",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "lanzhou-xuzhou",
    name: "兰州 → 徐州",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "lanzhou-changzhou",
    name: "兰州 → 常州",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "lanzhou-nantong",
    name: "兰州 → 南通",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "lanzhou-wenzhou",
    name: "兰州 → 温州",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "lanzhou-jiaxing",
    name: "兰州 → 嘉兴",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "lanzhou-baoding",
    name: "兰州 → 保定",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "lanzhou-tangshan",
    name: "兰州 → 唐山",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "lanzhou-taiyuan",
    name: "兰州 → 太原",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "lanzhou-hefei",
    name: "兰州 → 合肥",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "lanzhou-foshan",
    name: "兰州 → 佛山",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "lanzhou-shijiazhuang",
    name: "兰州 → 石家庄",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "lanzhou-changchun",
    name: "兰州 → 长春",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "lanzhou-guiyang",
    name: "兰州 → 贵阳",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "lanzhou-nanning",
    name: "兰州 → 南宁",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "lanzhou-jinhua",
    name: "兰州 → 金华",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "lanzhou-shaoxing",
    name: "兰州 → 绍兴",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "lanzhou-taizhou",
    name: "兰州 → 台州",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "lanzhou-huizhou",
    name: "兰州 → 惠州",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "lanzhou-zhongshan",
    name: "兰州 → 中山",
    cities: [
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "haikou-beijing",
    name: "海口 → 北京",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "haikou-shanghai",
    name: "海口 → 上海",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "haikou-guangzhou",
    name: "海口 → 广州",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "haikou-shenzhen",
    name: "海口 → 深圳",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "haikou-chengdu",
    name: "海口 → 成都",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "haikou-hangzhou",
    name: "海口 → 杭州",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "haikou-wuhan",
    name: "海口 → 武汉",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "haikou-xian",
    name: "海口 → 西安",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "haikou-nanjing",
    name: "海口 → 南京",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "haikou-chongqing",
    name: "海口 → 重庆",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "haikou-tianjin",
    name: "海口 → 天津",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "haikou-suzhou",
    name: "海口 → 苏州",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "haikou-zhengzhou",
    name: "海口 → 郑州",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "haikou-changsha",
    name: "海口 → 长沙",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "haikou-kunming",
    name: "海口 → 昆明",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "haikou-harbin",
    name: "海口 → 哈尔滨",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "haikou-dalian",
    name: "海口 → 大连",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "haikou-qingdao",
    name: "海口 → 青岛",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "haikou-jinan",
    name: "海口 → 济南",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "haikou-nanchang",
    name: "海口 → 南昌",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "haikou-fuzhou",
    name: "海口 → 福州",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "haikou-xiamen",
    name: "海口 → 厦门",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "haikou-wuxi",
    name: "海口 → 无锡",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "haikou-dongguan",
    name: "海口 → 东莞",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "haikou-zhuhai",
    name: "海口 → 珠海",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "haikou-ningbo",
    name: "海口 → 宁波",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "haikou-shenyang",
    name: "海口 → 沈阳",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "haikou-lanzhou",
    name: "海口 → 兰州",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "haikou-cangzhou",
    name: "海口 → 沧州",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "haikou-xuzhou",
    name: "海口 → 徐州",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "haikou-changzhou",
    name: "海口 → 常州",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "haikou-nantong",
    name: "海口 → 南通",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "haikou-wenzhou",
    name: "海口 → 温州",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "haikou-jiaxing",
    name: "海口 → 嘉兴",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "haikou-baoding",
    name: "海口 → 保定",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "haikou-tangshan",
    name: "海口 → 唐山",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "haikou-taiyuan",
    name: "海口 → 太原",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "haikou-hefei",
    name: "海口 → 合肥",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "haikou-foshan",
    name: "海口 → 佛山",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "haikou-shijiazhuang",
    name: "海口 → 石家庄",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "haikou-changchun",
    name: "海口 → 长春",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "haikou-guiyang",
    name: "海口 → 贵阳",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "haikou-nanning",
    name: "海口 → 南宁",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "haikou-jinhua",
    name: "海口 → 金华",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "haikou-shaoxing",
    name: "海口 → 绍兴",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "haikou-taizhou",
    name: "海口 → 台州",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "haikou-huizhou",
    name: "海口 → 惠州",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "haikou-zhongshan",
    name: "海口 → 中山",
    cities: [
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "cangzhou-beijing",
    name: "沧州 → 北京",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "cangzhou-shanghai",
    name: "沧州 → 上海",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "cangzhou-guangzhou",
    name: "沧州 → 广州",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "cangzhou-shenzhen",
    name: "沧州 → 深圳",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "cangzhou-chengdu",
    name: "沧州 → 成都",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "cangzhou-hangzhou",
    name: "沧州 → 杭州",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "cangzhou-wuhan",
    name: "沧州 → 武汉",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "cangzhou-xian",
    name: "沧州 → 西安",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "cangzhou-nanjing",
    name: "沧州 → 南京",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "cangzhou-chongqing",
    name: "沧州 → 重庆",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "cangzhou-tianjin",
    name: "沧州 → 天津",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "cangzhou-suzhou",
    name: "沧州 → 苏州",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "cangzhou-zhengzhou",
    name: "沧州 → 郑州",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "cangzhou-changsha",
    name: "沧州 → 长沙",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "cangzhou-kunming",
    name: "沧州 → 昆明",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "cangzhou-harbin",
    name: "沧州 → 哈尔滨",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "cangzhou-dalian",
    name: "沧州 → 大连",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "cangzhou-qingdao",
    name: "沧州 → 青岛",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "cangzhou-jinan",
    name: "沧州 → 济南",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "cangzhou-nanchang",
    name: "沧州 → 南昌",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "cangzhou-fuzhou",
    name: "沧州 → 福州",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "cangzhou-xiamen",
    name: "沧州 → 厦门",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "cangzhou-wuxi",
    name: "沧州 → 无锡",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "cangzhou-dongguan",
    name: "沧州 → 东莞",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "cangzhou-zhuhai",
    name: "沧州 → 珠海",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "cangzhou-ningbo",
    name: "沧州 → 宁波",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "cangzhou-shenyang",
    name: "沧州 → 沈阳",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "cangzhou-lanzhou",
    name: "沧州 → 兰州",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "cangzhou-haikou",
    name: "沧州 → 海口",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "cangzhou-xuzhou",
    name: "沧州 → 徐州",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "cangzhou-changzhou",
    name: "沧州 → 常州",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "cangzhou-nantong",
    name: "沧州 → 南通",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "cangzhou-wenzhou",
    name: "沧州 → 温州",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "cangzhou-jiaxing",
    name: "沧州 → 嘉兴",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "cangzhou-baoding",
    name: "沧州 → 保定",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "cangzhou-tangshan",
    name: "沧州 → 唐山",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "cangzhou-taiyuan",
    name: "沧州 → 太原",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "cangzhou-hefei",
    name: "沧州 → 合肥",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "cangzhou-foshan",
    name: "沧州 → 佛山",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "cangzhou-shijiazhuang",
    name: "沧州 → 石家庄",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "cangzhou-changchun",
    name: "沧州 → 长春",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "cangzhou-guiyang",
    name: "沧州 → 贵阳",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "cangzhou-nanning",
    name: "沧州 → 南宁",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "cangzhou-jinhua",
    name: "沧州 → 金华",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "cangzhou-shaoxing",
    name: "沧州 → 绍兴",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "cangzhou-taizhou",
    name: "沧州 → 台州",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "cangzhou-huizhou",
    name: "沧州 → 惠州",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "cangzhou-zhongshan",
    name: "沧州 → 中山",
    cities: [
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "xuzhou-beijing",
    name: "徐州 → 北京",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "xuzhou-shanghai",
    name: "徐州 → 上海",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "xuzhou-guangzhou",
    name: "徐州 → 广州",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "xuzhou-shenzhen",
    name: "徐州 → 深圳",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "xuzhou-chengdu",
    name: "徐州 → 成都",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "xuzhou-hangzhou",
    name: "徐州 → 杭州",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "xuzhou-wuhan",
    name: "徐州 → 武汉",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "xuzhou-xian",
    name: "徐州 → 西安",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "xuzhou-nanjing",
    name: "徐州 → 南京",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "xuzhou-chongqing",
    name: "徐州 → 重庆",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "xuzhou-tianjin",
    name: "徐州 → 天津",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "xuzhou-suzhou",
    name: "徐州 → 苏州",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "xuzhou-zhengzhou",
    name: "徐州 → 郑州",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "xuzhou-changsha",
    name: "徐州 → 长沙",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "xuzhou-kunming",
    name: "徐州 → 昆明",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "xuzhou-harbin",
    name: "徐州 → 哈尔滨",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "xuzhou-dalian",
    name: "徐州 → 大连",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "xuzhou-qingdao",
    name: "徐州 → 青岛",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "xuzhou-jinan",
    name: "徐州 → 济南",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "xuzhou-nanchang",
    name: "徐州 → 南昌",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "xuzhou-fuzhou",
    name: "徐州 → 福州",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "xuzhou-xiamen",
    name: "徐州 → 厦门",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "xuzhou-wuxi",
    name: "徐州 → 无锡",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "xuzhou-dongguan",
    name: "徐州 → 东莞",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "xuzhou-zhuhai",
    name: "徐州 → 珠海",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "xuzhou-ningbo",
    name: "徐州 → 宁波",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "xuzhou-shenyang",
    name: "徐州 → 沈阳",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "xuzhou-lanzhou",
    name: "徐州 → 兰州",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "xuzhou-haikou",
    name: "徐州 → 海口",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "xuzhou-cangzhou",
    name: "徐州 → 沧州",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "xuzhou-changzhou",
    name: "徐州 → 常州",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "xuzhou-nantong",
    name: "徐州 → 南通",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "xuzhou-wenzhou",
    name: "徐州 → 温州",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "xuzhou-jiaxing",
    name: "徐州 → 嘉兴",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "xuzhou-baoding",
    name: "徐州 → 保定",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "xuzhou-tangshan",
    name: "徐州 → 唐山",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "xuzhou-taiyuan",
    name: "徐州 → 太原",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "xuzhou-hefei",
    name: "徐州 → 合肥",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "xuzhou-foshan",
    name: "徐州 → 佛山",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "xuzhou-shijiazhuang",
    name: "徐州 → 石家庄",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "xuzhou-changchun",
    name: "徐州 → 长春",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "xuzhou-guiyang",
    name: "徐州 → 贵阳",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "xuzhou-nanning",
    name: "徐州 → 南宁",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "xuzhou-jinhua",
    name: "徐州 → 金华",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "xuzhou-shaoxing",
    name: "徐州 → 绍兴",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "xuzhou-taizhou",
    name: "徐州 → 台州",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "xuzhou-huizhou",
    name: "徐州 → 惠州",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "xuzhou-zhongshan",
    name: "徐州 → 中山",
    cities: [
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "changzhou-beijing",
    name: "常州 → 北京",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "changzhou-shanghai",
    name: "常州 → 上海",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "changzhou-guangzhou",
    name: "常州 → 广州",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "changzhou-shenzhen",
    name: "常州 → 深圳",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "changzhou-chengdu",
    name: "常州 → 成都",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "changzhou-hangzhou",
    name: "常州 → 杭州",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "changzhou-wuhan",
    name: "常州 → 武汉",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "changzhou-xian",
    name: "常州 → 西安",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "changzhou-nanjing",
    name: "常州 → 南京",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "changzhou-chongqing",
    name: "常州 → 重庆",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "changzhou-tianjin",
    name: "常州 → 天津",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "changzhou-suzhou",
    name: "常州 → 苏州",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "changzhou-zhengzhou",
    name: "常州 → 郑州",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "changzhou-changsha",
    name: "常州 → 长沙",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "changzhou-kunming",
    name: "常州 → 昆明",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "changzhou-harbin",
    name: "常州 → 哈尔滨",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "changzhou-dalian",
    name: "常州 → 大连",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "changzhou-qingdao",
    name: "常州 → 青岛",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "changzhou-jinan",
    name: "常州 → 济南",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "changzhou-nanchang",
    name: "常州 → 南昌",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "changzhou-fuzhou",
    name: "常州 → 福州",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "changzhou-xiamen",
    name: "常州 → 厦门",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "changzhou-wuxi",
    name: "常州 → 无锡",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "changzhou-dongguan",
    name: "常州 → 东莞",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "changzhou-zhuhai",
    name: "常州 → 珠海",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "changzhou-ningbo",
    name: "常州 → 宁波",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "changzhou-shenyang",
    name: "常州 → 沈阳",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "changzhou-lanzhou",
    name: "常州 → 兰州",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "changzhou-haikou",
    name: "常州 → 海口",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "changzhou-cangzhou",
    name: "常州 → 沧州",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "changzhou-xuzhou",
    name: "常州 → 徐州",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "changzhou-nantong",
    name: "常州 → 南通",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "changzhou-wenzhou",
    name: "常州 → 温州",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "changzhou-jiaxing",
    name: "常州 → 嘉兴",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "changzhou-baoding",
    name: "常州 → 保定",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "changzhou-tangshan",
    name: "常州 → 唐山",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "changzhou-taiyuan",
    name: "常州 → 太原",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "changzhou-hefei",
    name: "常州 → 合肥",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "changzhou-foshan",
    name: "常州 → 佛山",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "changzhou-shijiazhuang",
    name: "常州 → 石家庄",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "changzhou-changchun",
    name: "常州 → 长春",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "changzhou-guiyang",
    name: "常州 → 贵阳",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "changzhou-nanning",
    name: "常州 → 南宁",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "changzhou-jinhua",
    name: "常州 → 金华",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "changzhou-shaoxing",
    name: "常州 → 绍兴",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "changzhou-taizhou",
    name: "常州 → 台州",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "changzhou-huizhou",
    name: "常州 → 惠州",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "changzhou-zhongshan",
    name: "常州 → 中山",
    cities: [
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "nantong-beijing",
    name: "南通 → 北京",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "nantong-shanghai",
    name: "南通 → 上海",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "nantong-guangzhou",
    name: "南通 → 广州",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "nantong-shenzhen",
    name: "南通 → 深圳",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "nantong-chengdu",
    name: "南通 → 成都",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "nantong-hangzhou",
    name: "南通 → 杭州",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "nantong-wuhan",
    name: "南通 → 武汉",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "nantong-xian",
    name: "南通 → 西安",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "nantong-nanjing",
    name: "南通 → 南京",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "nantong-chongqing",
    name: "南通 → 重庆",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "nantong-tianjin",
    name: "南通 → 天津",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "nantong-suzhou",
    name: "南通 → 苏州",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "nantong-zhengzhou",
    name: "南通 → 郑州",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "nantong-changsha",
    name: "南通 → 长沙",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "nantong-kunming",
    name: "南通 → 昆明",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "nantong-harbin",
    name: "南通 → 哈尔滨",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "nantong-dalian",
    name: "南通 → 大连",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "nantong-qingdao",
    name: "南通 → 青岛",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "nantong-jinan",
    name: "南通 → 济南",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "nantong-nanchang",
    name: "南通 → 南昌",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "nantong-fuzhou",
    name: "南通 → 福州",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "nantong-xiamen",
    name: "南通 → 厦门",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "nantong-wuxi",
    name: "南通 → 无锡",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "nantong-dongguan",
    name: "南通 → 东莞",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "nantong-zhuhai",
    name: "南通 → 珠海",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "nantong-ningbo",
    name: "南通 → 宁波",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "nantong-shenyang",
    name: "南通 → 沈阳",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "nantong-lanzhou",
    name: "南通 → 兰州",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "nantong-haikou",
    name: "南通 → 海口",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "nantong-cangzhou",
    name: "南通 → 沧州",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "nantong-xuzhou",
    name: "南通 → 徐州",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "nantong-changzhou",
    name: "南通 → 常州",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "nantong-wenzhou",
    name: "南通 → 温州",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "nantong-jiaxing",
    name: "南通 → 嘉兴",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "nantong-baoding",
    name: "南通 → 保定",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "nantong-tangshan",
    name: "南通 → 唐山",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "nantong-taiyuan",
    name: "南通 → 太原",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "nantong-hefei",
    name: "南通 → 合肥",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "nantong-foshan",
    name: "南通 → 佛山",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "nantong-shijiazhuang",
    name: "南通 → 石家庄",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "nantong-changchun",
    name: "南通 → 长春",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "nantong-guiyang",
    name: "南通 → 贵阳",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "nantong-nanning",
    name: "南通 → 南宁",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "nantong-jinhua",
    name: "南通 → 金华",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "nantong-shaoxing",
    name: "南通 → 绍兴",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "nantong-taizhou",
    name: "南通 → 台州",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "nantong-huizhou",
    name: "南通 → 惠州",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "nantong-zhongshan",
    name: "南通 → 中山",
    cities: [
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "wenzhou-beijing",
    name: "温州 → 北京",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "wenzhou-shanghai",
    name: "温州 → 上海",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "wenzhou-guangzhou",
    name: "温州 → 广州",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "wenzhou-shenzhen",
    name: "温州 → 深圳",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "wenzhou-chengdu",
    name: "温州 → 成都",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "wenzhou-hangzhou",
    name: "温州 → 杭州",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "wenzhou-wuhan",
    name: "温州 → 武汉",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "wenzhou-xian",
    name: "温州 → 西安",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "wenzhou-nanjing",
    name: "温州 → 南京",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "wenzhou-chongqing",
    name: "温州 → 重庆",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "wenzhou-tianjin",
    name: "温州 → 天津",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "wenzhou-suzhou",
    name: "温州 → 苏州",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "wenzhou-zhengzhou",
    name: "温州 → 郑州",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "wenzhou-changsha",
    name: "温州 → 长沙",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "wenzhou-kunming",
    name: "温州 → 昆明",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "wenzhou-harbin",
    name: "温州 → 哈尔滨",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "wenzhou-dalian",
    name: "温州 → 大连",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "wenzhou-qingdao",
    name: "温州 → 青岛",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "wenzhou-jinan",
    name: "温州 → 济南",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "wenzhou-nanchang",
    name: "温州 → 南昌",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "wenzhou-fuzhou",
    name: "温州 → 福州",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "wenzhou-xiamen",
    name: "温州 → 厦门",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "wenzhou-wuxi",
    name: "温州 → 无锡",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "wenzhou-dongguan",
    name: "温州 → 东莞",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "wenzhou-zhuhai",
    name: "温州 → 珠海",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "wenzhou-ningbo",
    name: "温州 → 宁波",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "wenzhou-shenyang",
    name: "温州 → 沈阳",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "wenzhou-lanzhou",
    name: "温州 → 兰州",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "wenzhou-haikou",
    name: "温州 → 海口",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "wenzhou-cangzhou",
    name: "温州 → 沧州",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "wenzhou-xuzhou",
    name: "温州 → 徐州",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "wenzhou-changzhou",
    name: "温州 → 常州",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "wenzhou-nantong",
    name: "温州 → 南通",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "wenzhou-jiaxing",
    name: "温州 → 嘉兴",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "wenzhou-baoding",
    name: "温州 → 保定",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "wenzhou-tangshan",
    name: "温州 → 唐山",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "wenzhou-taiyuan",
    name: "温州 → 太原",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "wenzhou-hefei",
    name: "温州 → 合肥",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "wenzhou-foshan",
    name: "温州 → 佛山",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "wenzhou-shijiazhuang",
    name: "温州 → 石家庄",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "wenzhou-changchun",
    name: "温州 → 长春",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "wenzhou-guiyang",
    name: "温州 → 贵阳",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "wenzhou-nanning",
    name: "温州 → 南宁",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "wenzhou-jinhua",
    name: "温州 → 金华",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "wenzhou-shaoxing",
    name: "温州 → 绍兴",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "wenzhou-taizhou",
    name: "温州 → 台州",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "wenzhou-huizhou",
    name: "温州 → 惠州",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "wenzhou-zhongshan",
    name: "温州 → 中山",
    cities: [
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "jiaxing-beijing",
    name: "嘉兴 → 北京",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "jiaxing-shanghai",
    name: "嘉兴 → 上海",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "jiaxing-guangzhou",
    name: "嘉兴 → 广州",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "jiaxing-shenzhen",
    name: "嘉兴 → 深圳",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "jiaxing-chengdu",
    name: "嘉兴 → 成都",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "jiaxing-hangzhou",
    name: "嘉兴 → 杭州",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "jiaxing-wuhan",
    name: "嘉兴 → 武汉",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "jiaxing-xian",
    name: "嘉兴 → 西安",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "jiaxing-nanjing",
    name: "嘉兴 → 南京",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "jiaxing-chongqing",
    name: "嘉兴 → 重庆",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "jiaxing-tianjin",
    name: "嘉兴 → 天津",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "jiaxing-suzhou",
    name: "嘉兴 → 苏州",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "jiaxing-zhengzhou",
    name: "嘉兴 → 郑州",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "jiaxing-changsha",
    name: "嘉兴 → 长沙",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "jiaxing-kunming",
    name: "嘉兴 → 昆明",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "jiaxing-harbin",
    name: "嘉兴 → 哈尔滨",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "jiaxing-dalian",
    name: "嘉兴 → 大连",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "jiaxing-qingdao",
    name: "嘉兴 → 青岛",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "jiaxing-jinan",
    name: "嘉兴 → 济南",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "jiaxing-nanchang",
    name: "嘉兴 → 南昌",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "jiaxing-fuzhou",
    name: "嘉兴 → 福州",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "jiaxing-xiamen",
    name: "嘉兴 → 厦门",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "jiaxing-wuxi",
    name: "嘉兴 → 无锡",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "jiaxing-dongguan",
    name: "嘉兴 → 东莞",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "jiaxing-zhuhai",
    name: "嘉兴 → 珠海",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "jiaxing-ningbo",
    name: "嘉兴 → 宁波",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "jiaxing-shenyang",
    name: "嘉兴 → 沈阳",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "jiaxing-lanzhou",
    name: "嘉兴 → 兰州",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "jiaxing-haikou",
    name: "嘉兴 → 海口",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "jiaxing-cangzhou",
    name: "嘉兴 → 沧州",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "jiaxing-xuzhou",
    name: "嘉兴 → 徐州",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "jiaxing-changzhou",
    name: "嘉兴 → 常州",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "jiaxing-nantong",
    name: "嘉兴 → 南通",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "jiaxing-wenzhou",
    name: "嘉兴 → 温州",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "jiaxing-baoding",
    name: "嘉兴 → 保定",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "jiaxing-tangshan",
    name: "嘉兴 → 唐山",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "jiaxing-taiyuan",
    name: "嘉兴 → 太原",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "jiaxing-hefei",
    name: "嘉兴 → 合肥",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "jiaxing-foshan",
    name: "嘉兴 → 佛山",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "jiaxing-shijiazhuang",
    name: "嘉兴 → 石家庄",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "jiaxing-changchun",
    name: "嘉兴 → 长春",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "jiaxing-guiyang",
    name: "嘉兴 → 贵阳",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "jiaxing-nanning",
    name: "嘉兴 → 南宁",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "jiaxing-jinhua",
    name: "嘉兴 → 金华",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "jiaxing-shaoxing",
    name: "嘉兴 → 绍兴",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "jiaxing-taizhou",
    name: "嘉兴 → 台州",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "jiaxing-huizhou",
    name: "嘉兴 → 惠州",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "jiaxing-zhongshan",
    name: "嘉兴 → 中山",
    cities: [
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "baoding-beijing",
    name: "保定 → 北京",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "baoding-shanghai",
    name: "保定 → 上海",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "baoding-guangzhou",
    name: "保定 → 广州",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "baoding-shenzhen",
    name: "保定 → 深圳",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "baoding-chengdu",
    name: "保定 → 成都",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "baoding-hangzhou",
    name: "保定 → 杭州",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "baoding-wuhan",
    name: "保定 → 武汉",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "baoding-xian",
    name: "保定 → 西安",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "baoding-nanjing",
    name: "保定 → 南京",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "baoding-chongqing",
    name: "保定 → 重庆",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "baoding-tianjin",
    name: "保定 → 天津",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "baoding-suzhou",
    name: "保定 → 苏州",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "baoding-zhengzhou",
    name: "保定 → 郑州",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "baoding-changsha",
    name: "保定 → 长沙",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "baoding-kunming",
    name: "保定 → 昆明",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "baoding-harbin",
    name: "保定 → 哈尔滨",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "baoding-dalian",
    name: "保定 → 大连",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "baoding-qingdao",
    name: "保定 → 青岛",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "baoding-jinan",
    name: "保定 → 济南",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "baoding-nanchang",
    name: "保定 → 南昌",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "baoding-fuzhou",
    name: "保定 → 福州",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "baoding-xiamen",
    name: "保定 → 厦门",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "baoding-wuxi",
    name: "保定 → 无锡",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "baoding-dongguan",
    name: "保定 → 东莞",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "baoding-zhuhai",
    name: "保定 → 珠海",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "baoding-ningbo",
    name: "保定 → 宁波",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "baoding-shenyang",
    name: "保定 → 沈阳",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "baoding-lanzhou",
    name: "保定 → 兰州",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "baoding-haikou",
    name: "保定 → 海口",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "baoding-cangzhou",
    name: "保定 → 沧州",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "baoding-xuzhou",
    name: "保定 → 徐州",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "baoding-changzhou",
    name: "保定 → 常州",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "baoding-nantong",
    name: "保定 → 南通",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "baoding-wenzhou",
    name: "保定 → 温州",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "baoding-jiaxing",
    name: "保定 → 嘉兴",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "baoding-tangshan",
    name: "保定 → 唐山",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "baoding-taiyuan",
    name: "保定 → 太原",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "baoding-hefei",
    name: "保定 → 合肥",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "baoding-foshan",
    name: "保定 → 佛山",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "baoding-shijiazhuang",
    name: "保定 → 石家庄",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "baoding-changchun",
    name: "保定 → 长春",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "baoding-guiyang",
    name: "保定 → 贵阳",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "baoding-nanning",
    name: "保定 → 南宁",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "baoding-jinhua",
    name: "保定 → 金华",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "baoding-shaoxing",
    name: "保定 → 绍兴",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "baoding-taizhou",
    name: "保定 → 台州",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "baoding-huizhou",
    name: "保定 → 惠州",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "baoding-zhongshan",
    name: "保定 → 中山",
    cities: [
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "tangshan-beijing",
    name: "唐山 → 北京",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "tangshan-shanghai",
    name: "唐山 → 上海",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "tangshan-guangzhou",
    name: "唐山 → 广州",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "tangshan-shenzhen",
    name: "唐山 → 深圳",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "tangshan-chengdu",
    name: "唐山 → 成都",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "tangshan-hangzhou",
    name: "唐山 → 杭州",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "tangshan-wuhan",
    name: "唐山 → 武汉",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "tangshan-xian",
    name: "唐山 → 西安",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "tangshan-nanjing",
    name: "唐山 → 南京",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "tangshan-chongqing",
    name: "唐山 → 重庆",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "tangshan-tianjin",
    name: "唐山 → 天津",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "tangshan-suzhou",
    name: "唐山 → 苏州",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "tangshan-zhengzhou",
    name: "唐山 → 郑州",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "tangshan-changsha",
    name: "唐山 → 长沙",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "tangshan-kunming",
    name: "唐山 → 昆明",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "tangshan-harbin",
    name: "唐山 → 哈尔滨",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "tangshan-dalian",
    name: "唐山 → 大连",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "tangshan-qingdao",
    name: "唐山 → 青岛",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "tangshan-jinan",
    name: "唐山 → 济南",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "tangshan-nanchang",
    name: "唐山 → 南昌",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "tangshan-fuzhou",
    name: "唐山 → 福州",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "tangshan-xiamen",
    name: "唐山 → 厦门",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "tangshan-wuxi",
    name: "唐山 → 无锡",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "tangshan-dongguan",
    name: "唐山 → 东莞",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "tangshan-zhuhai",
    name: "唐山 → 珠海",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "tangshan-ningbo",
    name: "唐山 → 宁波",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "tangshan-shenyang",
    name: "唐山 → 沈阳",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "tangshan-lanzhou",
    name: "唐山 → 兰州",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "tangshan-haikou",
    name: "唐山 → 海口",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "tangshan-cangzhou",
    name: "唐山 → 沧州",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "tangshan-xuzhou",
    name: "唐山 → 徐州",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "tangshan-changzhou",
    name: "唐山 → 常州",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "tangshan-nantong",
    name: "唐山 → 南通",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "tangshan-wenzhou",
    name: "唐山 → 温州",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "tangshan-jiaxing",
    name: "唐山 → 嘉兴",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "tangshan-baoding",
    name: "唐山 → 保定",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "tangshan-taiyuan",
    name: "唐山 → 太原",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "tangshan-hefei",
    name: "唐山 → 合肥",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "tangshan-foshan",
    name: "唐山 → 佛山",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "tangshan-shijiazhuang",
    name: "唐山 → 石家庄",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "tangshan-changchun",
    name: "唐山 → 长春",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "tangshan-guiyang",
    name: "唐山 → 贵阳",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "tangshan-nanning",
    name: "唐山 → 南宁",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "tangshan-jinhua",
    name: "唐山 → 金华",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "tangshan-shaoxing",
    name: "唐山 → 绍兴",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "tangshan-taizhou",
    name: "唐山 → 台州",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "tangshan-huizhou",
    name: "唐山 → 惠州",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "tangshan-zhongshan",
    name: "唐山 → 中山",
    cities: [
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "taiyuan-beijing",
    name: "太原 → 北京",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "taiyuan-shanghai",
    name: "太原 → 上海",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "taiyuan-guangzhou",
    name: "太原 → 广州",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "taiyuan-shenzhen",
    name: "太原 → 深圳",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "taiyuan-chengdu",
    name: "太原 → 成都",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "taiyuan-hangzhou",
    name: "太原 → 杭州",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "taiyuan-wuhan",
    name: "太原 → 武汉",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "taiyuan-xian",
    name: "太原 → 西安",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "taiyuan-nanjing",
    name: "太原 → 南京",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "taiyuan-chongqing",
    name: "太原 → 重庆",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "taiyuan-tianjin",
    name: "太原 → 天津",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "taiyuan-suzhou",
    name: "太原 → 苏州",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "taiyuan-zhengzhou",
    name: "太原 → 郑州",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "taiyuan-changsha",
    name: "太原 → 长沙",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "taiyuan-kunming",
    name: "太原 → 昆明",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "taiyuan-harbin",
    name: "太原 → 哈尔滨",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "taiyuan-dalian",
    name: "太原 → 大连",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "taiyuan-qingdao",
    name: "太原 → 青岛",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "taiyuan-jinan",
    name: "太原 → 济南",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "taiyuan-nanchang",
    name: "太原 → 南昌",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "taiyuan-fuzhou",
    name: "太原 → 福州",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "taiyuan-xiamen",
    name: "太原 → 厦门",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "taiyuan-wuxi",
    name: "太原 → 无锡",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "taiyuan-dongguan",
    name: "太原 → 东莞",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "taiyuan-zhuhai",
    name: "太原 → 珠海",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "taiyuan-ningbo",
    name: "太原 → 宁波",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "taiyuan-shenyang",
    name: "太原 → 沈阳",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "taiyuan-lanzhou",
    name: "太原 → 兰州",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "taiyuan-haikou",
    name: "太原 → 海口",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "taiyuan-cangzhou",
    name: "太原 → 沧州",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "taiyuan-xuzhou",
    name: "太原 → 徐州",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "taiyuan-changzhou",
    name: "太原 → 常州",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "taiyuan-nantong",
    name: "太原 → 南通",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "taiyuan-wenzhou",
    name: "太原 → 温州",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "taiyuan-jiaxing",
    name: "太原 → 嘉兴",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "taiyuan-baoding",
    name: "太原 → 保定",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "taiyuan-tangshan",
    name: "太原 → 唐山",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "taiyuan-hefei",
    name: "太原 → 合肥",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "taiyuan-foshan",
    name: "太原 → 佛山",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "taiyuan-shijiazhuang",
    name: "太原 → 石家庄",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "taiyuan-changchun",
    name: "太原 → 长春",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "taiyuan-guiyang",
    name: "太原 → 贵阳",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "taiyuan-nanning",
    name: "太原 → 南宁",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "taiyuan-jinhua",
    name: "太原 → 金华",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "taiyuan-shaoxing",
    name: "太原 → 绍兴",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "taiyuan-taizhou",
    name: "太原 → 台州",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "taiyuan-huizhou",
    name: "太原 → 惠州",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "taiyuan-zhongshan",
    name: "太原 → 中山",
    cities: [
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "hefei-beijing",
    name: "合肥 → 北京",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "hefei-shanghai",
    name: "合肥 → 上海",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "hefei-guangzhou",
    name: "合肥 → 广州",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "hefei-shenzhen",
    name: "合肥 → 深圳",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "hefei-chengdu",
    name: "合肥 → 成都",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "hefei-hangzhou",
    name: "合肥 → 杭州",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "hefei-wuhan",
    name: "合肥 → 武汉",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "hefei-xian",
    name: "合肥 → 西安",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "hefei-nanjing",
    name: "合肥 → 南京",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "hefei-chongqing",
    name: "合肥 → 重庆",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "hefei-tianjin",
    name: "合肥 → 天津",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "hefei-suzhou",
    name: "合肥 → 苏州",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "hefei-zhengzhou",
    name: "合肥 → 郑州",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "hefei-changsha",
    name: "合肥 → 长沙",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "hefei-kunming",
    name: "合肥 → 昆明",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "hefei-harbin",
    name: "合肥 → 哈尔滨",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "hefei-dalian",
    name: "合肥 → 大连",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "hefei-qingdao",
    name: "合肥 → 青岛",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "hefei-jinan",
    name: "合肥 → 济南",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "hefei-nanchang",
    name: "合肥 → 南昌",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "hefei-fuzhou",
    name: "合肥 → 福州",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "hefei-xiamen",
    name: "合肥 → 厦门",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "hefei-wuxi",
    name: "合肥 → 无锡",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "hefei-dongguan",
    name: "合肥 → 东莞",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "hefei-zhuhai",
    name: "合肥 → 珠海",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "hefei-ningbo",
    name: "合肥 → 宁波",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "hefei-shenyang",
    name: "合肥 → 沈阳",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "hefei-lanzhou",
    name: "合肥 → 兰州",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "hefei-haikou",
    name: "合肥 → 海口",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "hefei-cangzhou",
    name: "合肥 → 沧州",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "hefei-xuzhou",
    name: "合肥 → 徐州",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "hefei-changzhou",
    name: "合肥 → 常州",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "hefei-nantong",
    name: "合肥 → 南通",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "hefei-wenzhou",
    name: "合肥 → 温州",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "hefei-jiaxing",
    name: "合肥 → 嘉兴",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "hefei-baoding",
    name: "合肥 → 保定",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "hefei-tangshan",
    name: "合肥 → 唐山",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "hefei-taiyuan",
    name: "合肥 → 太原",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "hefei-foshan",
    name: "合肥 → 佛山",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "hefei-shijiazhuang",
    name: "合肥 → 石家庄",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "hefei-changchun",
    name: "合肥 → 长春",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "hefei-guiyang",
    name: "合肥 → 贵阳",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "hefei-nanning",
    name: "合肥 → 南宁",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "hefei-jinhua",
    name: "合肥 → 金华",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "hefei-shaoxing",
    name: "合肥 → 绍兴",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "hefei-taizhou",
    name: "合肥 → 台州",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "hefei-huizhou",
    name: "合肥 → 惠州",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "hefei-zhongshan",
    name: "合肥 → 中山",
    cities: [
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "foshan-beijing",
    name: "佛山 → 北京",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "foshan-shanghai",
    name: "佛山 → 上海",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "foshan-guangzhou",
    name: "佛山 → 广州",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "foshan-shenzhen",
    name: "佛山 → 深圳",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "foshan-chengdu",
    name: "佛山 → 成都",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "foshan-hangzhou",
    name: "佛山 → 杭州",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "foshan-wuhan",
    name: "佛山 → 武汉",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "foshan-xian",
    name: "佛山 → 西安",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "foshan-nanjing",
    name: "佛山 → 南京",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "foshan-chongqing",
    name: "佛山 → 重庆",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "foshan-tianjin",
    name: "佛山 → 天津",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "foshan-suzhou",
    name: "佛山 → 苏州",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "foshan-zhengzhou",
    name: "佛山 → 郑州",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "foshan-changsha",
    name: "佛山 → 长沙",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "foshan-kunming",
    name: "佛山 → 昆明",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "foshan-harbin",
    name: "佛山 → 哈尔滨",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "foshan-dalian",
    name: "佛山 → 大连",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "foshan-qingdao",
    name: "佛山 → 青岛",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "foshan-jinan",
    name: "佛山 → 济南",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "foshan-nanchang",
    name: "佛山 → 南昌",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "foshan-fuzhou",
    name: "佛山 → 福州",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "foshan-xiamen",
    name: "佛山 → 厦门",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "foshan-wuxi",
    name: "佛山 → 无锡",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "foshan-dongguan",
    name: "佛山 → 东莞",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "foshan-zhuhai",
    name: "佛山 → 珠海",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "foshan-ningbo",
    name: "佛山 → 宁波",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "foshan-shenyang",
    name: "佛山 → 沈阳",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "foshan-lanzhou",
    name: "佛山 → 兰州",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "foshan-haikou",
    name: "佛山 → 海口",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "foshan-cangzhou",
    name: "佛山 → 沧州",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "foshan-xuzhou",
    name: "佛山 → 徐州",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "foshan-changzhou",
    name: "佛山 → 常州",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "foshan-nantong",
    name: "佛山 → 南通",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "foshan-wenzhou",
    name: "佛山 → 温州",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "foshan-jiaxing",
    name: "佛山 → 嘉兴",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "foshan-baoding",
    name: "佛山 → 保定",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "foshan-tangshan",
    name: "佛山 → 唐山",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "foshan-taiyuan",
    name: "佛山 → 太原",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "foshan-hefei",
    name: "佛山 → 合肥",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "foshan-shijiazhuang",
    name: "佛山 → 石家庄",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "foshan-changchun",
    name: "佛山 → 长春",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "foshan-guiyang",
    name: "佛山 → 贵阳",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "foshan-nanning",
    name: "佛山 → 南宁",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "foshan-jinhua",
    name: "佛山 → 金华",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "foshan-shaoxing",
    name: "佛山 → 绍兴",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "foshan-taizhou",
    name: "佛山 → 台州",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "foshan-huizhou",
    name: "佛山 → 惠州",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "foshan-zhongshan",
    name: "佛山 → 中山",
    cities: [
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "shijiazhuang-beijing",
    name: "石家庄 → 北京",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "shijiazhuang-shanghai",
    name: "石家庄 → 上海",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "shijiazhuang-guangzhou",
    name: "石家庄 → 广州",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "shijiazhuang-shenzhen",
    name: "石家庄 → 深圳",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "shijiazhuang-chengdu",
    name: "石家庄 → 成都",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "shijiazhuang-hangzhou",
    name: "石家庄 → 杭州",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "shijiazhuang-wuhan",
    name: "石家庄 → 武汉",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "shijiazhuang-xian",
    name: "石家庄 → 西安",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "shijiazhuang-nanjing",
    name: "石家庄 → 南京",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "shijiazhuang-chongqing",
    name: "石家庄 → 重庆",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "shijiazhuang-tianjin",
    name: "石家庄 → 天津",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "shijiazhuang-suzhou",
    name: "石家庄 → 苏州",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "shijiazhuang-zhengzhou",
    name: "石家庄 → 郑州",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "shijiazhuang-changsha",
    name: "石家庄 → 长沙",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "shijiazhuang-kunming",
    name: "石家庄 → 昆明",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "shijiazhuang-harbin",
    name: "石家庄 → 哈尔滨",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "shijiazhuang-dalian",
    name: "石家庄 → 大连",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "shijiazhuang-qingdao",
    name: "石家庄 → 青岛",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "shijiazhuang-jinan",
    name: "石家庄 → 济南",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "shijiazhuang-nanchang",
    name: "石家庄 → 南昌",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "shijiazhuang-fuzhou",
    name: "石家庄 → 福州",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "shijiazhuang-xiamen",
    name: "石家庄 → 厦门",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "shijiazhuang-wuxi",
    name: "石家庄 → 无锡",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "shijiazhuang-dongguan",
    name: "石家庄 → 东莞",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "shijiazhuang-zhuhai",
    name: "石家庄 → 珠海",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "shijiazhuang-ningbo",
    name: "石家庄 → 宁波",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "shijiazhuang-shenyang",
    name: "石家庄 → 沈阳",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "shijiazhuang-lanzhou",
    name: "石家庄 → 兰州",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "shijiazhuang-haikou",
    name: "石家庄 → 海口",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "shijiazhuang-cangzhou",
    name: "石家庄 → 沧州",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "shijiazhuang-xuzhou",
    name: "石家庄 → 徐州",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "shijiazhuang-changzhou",
    name: "石家庄 → 常州",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "shijiazhuang-nantong",
    name: "石家庄 → 南通",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "shijiazhuang-wenzhou",
    name: "石家庄 → 温州",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "shijiazhuang-jiaxing",
    name: "石家庄 → 嘉兴",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "shijiazhuang-baoding",
    name: "石家庄 → 保定",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "shijiazhuang-tangshan",
    name: "石家庄 → 唐山",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "shijiazhuang-taiyuan",
    name: "石家庄 → 太原",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "shijiazhuang-hefei",
    name: "石家庄 → 合肥",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "shijiazhuang-foshan",
    name: "石家庄 → 佛山",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "shijiazhuang-changchun",
    name: "石家庄 → 长春",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "shijiazhuang-guiyang",
    name: "石家庄 → 贵阳",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "shijiazhuang-nanning",
    name: "石家庄 → 南宁",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "shijiazhuang-jinhua",
    name: "石家庄 → 金华",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "shijiazhuang-shaoxing",
    name: "石家庄 → 绍兴",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "shijiazhuang-taizhou",
    name: "石家庄 → 台州",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "shijiazhuang-huizhou",
    name: "石家庄 → 惠州",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "shijiazhuang-zhongshan",
    name: "石家庄 → 中山",
    cities: [
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "changchun-beijing",
    name: "长春 → 北京",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "changchun-shanghai",
    name: "长春 → 上海",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "changchun-guangzhou",
    name: "长春 → 广州",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "changchun-shenzhen",
    name: "长春 → 深圳",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "changchun-chengdu",
    name: "长春 → 成都",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "changchun-hangzhou",
    name: "长春 → 杭州",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "changchun-wuhan",
    name: "长春 → 武汉",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "changchun-xian",
    name: "长春 → 西安",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "changchun-nanjing",
    name: "长春 → 南京",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "changchun-chongqing",
    name: "长春 → 重庆",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "changchun-tianjin",
    name: "长春 → 天津",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "changchun-suzhou",
    name: "长春 → 苏州",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "changchun-zhengzhou",
    name: "长春 → 郑州",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "changchun-changsha",
    name: "长春 → 长沙",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "changchun-kunming",
    name: "长春 → 昆明",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "changchun-harbin",
    name: "长春 → 哈尔滨",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "changchun-dalian",
    name: "长春 → 大连",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "changchun-qingdao",
    name: "长春 → 青岛",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "changchun-jinan",
    name: "长春 → 济南",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "changchun-nanchang",
    name: "长春 → 南昌",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "changchun-fuzhou",
    name: "长春 → 福州",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "changchun-xiamen",
    name: "长春 → 厦门",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "changchun-wuxi",
    name: "长春 → 无锡",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "changchun-dongguan",
    name: "长春 → 东莞",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "changchun-zhuhai",
    name: "长春 → 珠海",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "changchun-ningbo",
    name: "长春 → 宁波",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "changchun-shenyang",
    name: "长春 → 沈阳",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "changchun-lanzhou",
    name: "长春 → 兰州",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "changchun-haikou",
    name: "长春 → 海口",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "changchun-cangzhou",
    name: "长春 → 沧州",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "changchun-xuzhou",
    name: "长春 → 徐州",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "changchun-changzhou",
    name: "长春 → 常州",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "changchun-nantong",
    name: "长春 → 南通",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "changchun-wenzhou",
    name: "长春 → 温州",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "changchun-jiaxing",
    name: "长春 → 嘉兴",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "changchun-baoding",
    name: "长春 → 保定",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "changchun-tangshan",
    name: "长春 → 唐山",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "changchun-taiyuan",
    name: "长春 → 太原",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "changchun-hefei",
    name: "长春 → 合肥",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "changchun-foshan",
    name: "长春 → 佛山",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "changchun-shijiazhuang",
    name: "长春 → 石家庄",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "changchun-guiyang",
    name: "长春 → 贵阳",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "changchun-nanning",
    name: "长春 → 南宁",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "changchun-jinhua",
    name: "长春 → 金华",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "changchun-shaoxing",
    name: "长春 → 绍兴",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "changchun-taizhou",
    name: "长春 → 台州",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "changchun-huizhou",
    name: "长春 → 惠州",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "changchun-zhongshan",
    name: "长春 → 中山",
    cities: [
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "guiyang-beijing",
    name: "贵阳 → 北京",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "guiyang-shanghai",
    name: "贵阳 → 上海",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "guiyang-guangzhou",
    name: "贵阳 → 广州",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "guiyang-shenzhen",
    name: "贵阳 → 深圳",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "guiyang-chengdu",
    name: "贵阳 → 成都",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "guiyang-hangzhou",
    name: "贵阳 → 杭州",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "guiyang-wuhan",
    name: "贵阳 → 武汉",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "guiyang-xian",
    name: "贵阳 → 西安",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "guiyang-nanjing",
    name: "贵阳 → 南京",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "guiyang-chongqing",
    name: "贵阳 → 重庆",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "guiyang-tianjin",
    name: "贵阳 → 天津",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "guiyang-suzhou",
    name: "贵阳 → 苏州",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "guiyang-zhengzhou",
    name: "贵阳 → 郑州",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "guiyang-changsha",
    name: "贵阳 → 长沙",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "guiyang-kunming",
    name: "贵阳 → 昆明",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "guiyang-harbin",
    name: "贵阳 → 哈尔滨",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "guiyang-dalian",
    name: "贵阳 → 大连",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "guiyang-qingdao",
    name: "贵阳 → 青岛",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "guiyang-jinan",
    name: "贵阳 → 济南",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "guiyang-nanchang",
    name: "贵阳 → 南昌",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "guiyang-fuzhou",
    name: "贵阳 → 福州",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "guiyang-xiamen",
    name: "贵阳 → 厦门",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "guiyang-wuxi",
    name: "贵阳 → 无锡",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "guiyang-dongguan",
    name: "贵阳 → 东莞",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "guiyang-zhuhai",
    name: "贵阳 → 珠海",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "guiyang-ningbo",
    name: "贵阳 → 宁波",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "guiyang-shenyang",
    name: "贵阳 → 沈阳",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "guiyang-lanzhou",
    name: "贵阳 → 兰州",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "guiyang-haikou",
    name: "贵阳 → 海口",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "guiyang-cangzhou",
    name: "贵阳 → 沧州",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "guiyang-xuzhou",
    name: "贵阳 → 徐州",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "guiyang-changzhou",
    name: "贵阳 → 常州",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "guiyang-nantong",
    name: "贵阳 → 南通",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "guiyang-wenzhou",
    name: "贵阳 → 温州",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "guiyang-jiaxing",
    name: "贵阳 → 嘉兴",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "guiyang-baoding",
    name: "贵阳 → 保定",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "guiyang-tangshan",
    name: "贵阳 → 唐山",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "guiyang-taiyuan",
    name: "贵阳 → 太原",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "guiyang-hefei",
    name: "贵阳 → 合肥",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "guiyang-foshan",
    name: "贵阳 → 佛山",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "guiyang-shijiazhuang",
    name: "贵阳 → 石家庄",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "guiyang-changchun",
    name: "贵阳 → 长春",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "guiyang-nanning",
    name: "贵阳 → 南宁",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "guiyang-jinhua",
    name: "贵阳 → 金华",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "guiyang-shaoxing",
    name: "贵阳 → 绍兴",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "guiyang-taizhou",
    name: "贵阳 → 台州",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "guiyang-huizhou",
    name: "贵阳 → 惠州",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "guiyang-zhongshan",
    name: "贵阳 → 中山",
    cities: [
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "nanning-beijing",
    name: "南宁 → 北京",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "nanning-shanghai",
    name: "南宁 → 上海",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "nanning-guangzhou",
    name: "南宁 → 广州",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "nanning-shenzhen",
    name: "南宁 → 深圳",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "nanning-chengdu",
    name: "南宁 → 成都",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "nanning-hangzhou",
    name: "南宁 → 杭州",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "nanning-wuhan",
    name: "南宁 → 武汉",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "nanning-xian",
    name: "南宁 → 西安",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "nanning-nanjing",
    name: "南宁 → 南京",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "nanning-chongqing",
    name: "南宁 → 重庆",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "nanning-tianjin",
    name: "南宁 → 天津",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "nanning-suzhou",
    name: "南宁 → 苏州",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "nanning-zhengzhou",
    name: "南宁 → 郑州",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "nanning-changsha",
    name: "南宁 → 长沙",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "nanning-kunming",
    name: "南宁 → 昆明",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "nanning-harbin",
    name: "南宁 → 哈尔滨",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "nanning-dalian",
    name: "南宁 → 大连",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "nanning-qingdao",
    name: "南宁 → 青岛",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "nanning-jinan",
    name: "南宁 → 济南",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "nanning-nanchang",
    name: "南宁 → 南昌",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "nanning-fuzhou",
    name: "南宁 → 福州",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "nanning-xiamen",
    name: "南宁 → 厦门",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "nanning-wuxi",
    name: "南宁 → 无锡",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "nanning-dongguan",
    name: "南宁 → 东莞",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "nanning-zhuhai",
    name: "南宁 → 珠海",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "nanning-ningbo",
    name: "南宁 → 宁波",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "nanning-shenyang",
    name: "南宁 → 沈阳",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "nanning-lanzhou",
    name: "南宁 → 兰州",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "nanning-haikou",
    name: "南宁 → 海口",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "nanning-cangzhou",
    name: "南宁 → 沧州",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "nanning-xuzhou",
    name: "南宁 → 徐州",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "nanning-changzhou",
    name: "南宁 → 常州",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "nanning-nantong",
    name: "南宁 → 南通",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "nanning-wenzhou",
    name: "南宁 → 温州",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "nanning-jiaxing",
    name: "南宁 → 嘉兴",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "nanning-baoding",
    name: "南宁 → 保定",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "nanning-tangshan",
    name: "南宁 → 唐山",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "nanning-taiyuan",
    name: "南宁 → 太原",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "nanning-hefei",
    name: "南宁 → 合肥",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "nanning-foshan",
    name: "南宁 → 佛山",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "nanning-shijiazhuang",
    name: "南宁 → 石家庄",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "nanning-changchun",
    name: "南宁 → 长春",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "nanning-guiyang",
    name: "南宁 → 贵阳",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "nanning-jinhua",
    name: "南宁 → 金华",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "nanning-shaoxing",
    name: "南宁 → 绍兴",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "nanning-taizhou",
    name: "南宁 → 台州",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "nanning-huizhou",
    name: "南宁 → 惠州",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "nanning-zhongshan",
    name: "南宁 → 中山",
    cities: [
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "jinhua-beijing",
    name: "金华 → 北京",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "jinhua-shanghai",
    name: "金华 → 上海",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "jinhua-guangzhou",
    name: "金华 → 广州",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "jinhua-shenzhen",
    name: "金华 → 深圳",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "jinhua-chengdu",
    name: "金华 → 成都",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "jinhua-hangzhou",
    name: "金华 → 杭州",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "jinhua-wuhan",
    name: "金华 → 武汉",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "jinhua-xian",
    name: "金华 → 西安",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "jinhua-nanjing",
    name: "金华 → 南京",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "jinhua-chongqing",
    name: "金华 → 重庆",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "jinhua-tianjin",
    name: "金华 → 天津",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "jinhua-suzhou",
    name: "金华 → 苏州",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "jinhua-zhengzhou",
    name: "金华 → 郑州",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "jinhua-changsha",
    name: "金华 → 长沙",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "jinhua-kunming",
    name: "金华 → 昆明",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "jinhua-harbin",
    name: "金华 → 哈尔滨",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "jinhua-dalian",
    name: "金华 → 大连",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "jinhua-qingdao",
    name: "金华 → 青岛",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "jinhua-jinan",
    name: "金华 → 济南",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "jinhua-nanchang",
    name: "金华 → 南昌",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "jinhua-fuzhou",
    name: "金华 → 福州",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "jinhua-xiamen",
    name: "金华 → 厦门",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "jinhua-wuxi",
    name: "金华 → 无锡",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "jinhua-dongguan",
    name: "金华 → 东莞",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "jinhua-zhuhai",
    name: "金华 → 珠海",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "jinhua-ningbo",
    name: "金华 → 宁波",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "jinhua-shenyang",
    name: "金华 → 沈阳",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "jinhua-lanzhou",
    name: "金华 → 兰州",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "jinhua-haikou",
    name: "金华 → 海口",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "jinhua-cangzhou",
    name: "金华 → 沧州",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "jinhua-xuzhou",
    name: "金华 → 徐州",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "jinhua-changzhou",
    name: "金华 → 常州",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "jinhua-nantong",
    name: "金华 → 南通",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "jinhua-wenzhou",
    name: "金华 → 温州",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "jinhua-jiaxing",
    name: "金华 → 嘉兴",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "jinhua-baoding",
    name: "金华 → 保定",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "jinhua-tangshan",
    name: "金华 → 唐山",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "jinhua-taiyuan",
    name: "金华 → 太原",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "jinhua-hefei",
    name: "金华 → 合肥",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "jinhua-foshan",
    name: "金华 → 佛山",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "jinhua-shijiazhuang",
    name: "金华 → 石家庄",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "jinhua-changchun",
    name: "金华 → 长春",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "jinhua-guiyang",
    name: "金华 → 贵阳",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "jinhua-nanning",
    name: "金华 → 南宁",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "jinhua-shaoxing",
    name: "金华 → 绍兴",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "jinhua-taizhou",
    name: "金华 → 台州",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "jinhua-huizhou",
    name: "金华 → 惠州",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "jinhua-zhongshan",
    name: "金华 → 中山",
    cities: [
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "shaoxing-beijing",
    name: "绍兴 → 北京",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "shaoxing-shanghai",
    name: "绍兴 → 上海",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "shaoxing-guangzhou",
    name: "绍兴 → 广州",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "shaoxing-shenzhen",
    name: "绍兴 → 深圳",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "shaoxing-chengdu",
    name: "绍兴 → 成都",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "shaoxing-hangzhou",
    name: "绍兴 → 杭州",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "shaoxing-wuhan",
    name: "绍兴 → 武汉",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "shaoxing-xian",
    name: "绍兴 → 西安",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "shaoxing-nanjing",
    name: "绍兴 → 南京",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "shaoxing-chongqing",
    name: "绍兴 → 重庆",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "shaoxing-tianjin",
    name: "绍兴 → 天津",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "shaoxing-suzhou",
    name: "绍兴 → 苏州",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "shaoxing-zhengzhou",
    name: "绍兴 → 郑州",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "shaoxing-changsha",
    name: "绍兴 → 长沙",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "shaoxing-kunming",
    name: "绍兴 → 昆明",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "shaoxing-harbin",
    name: "绍兴 → 哈尔滨",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "shaoxing-dalian",
    name: "绍兴 → 大连",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "shaoxing-qingdao",
    name: "绍兴 → 青岛",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "shaoxing-jinan",
    name: "绍兴 → 济南",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "shaoxing-nanchang",
    name: "绍兴 → 南昌",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "shaoxing-fuzhou",
    name: "绍兴 → 福州",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "shaoxing-xiamen",
    name: "绍兴 → 厦门",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "shaoxing-wuxi",
    name: "绍兴 → 无锡",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "shaoxing-dongguan",
    name: "绍兴 → 东莞",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "shaoxing-zhuhai",
    name: "绍兴 → 珠海",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "shaoxing-ningbo",
    name: "绍兴 → 宁波",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "shaoxing-shenyang",
    name: "绍兴 → 沈阳",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "shaoxing-lanzhou",
    name: "绍兴 → 兰州",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "shaoxing-haikou",
    name: "绍兴 → 海口",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "shaoxing-cangzhou",
    name: "绍兴 → 沧州",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "shaoxing-xuzhou",
    name: "绍兴 → 徐州",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "shaoxing-changzhou",
    name: "绍兴 → 常州",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "shaoxing-nantong",
    name: "绍兴 → 南通",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "shaoxing-wenzhou",
    name: "绍兴 → 温州",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "shaoxing-jiaxing",
    name: "绍兴 → 嘉兴",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "shaoxing-baoding",
    name: "绍兴 → 保定",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "shaoxing-tangshan",
    name: "绍兴 → 唐山",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "shaoxing-taiyuan",
    name: "绍兴 → 太原",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "shaoxing-hefei",
    name: "绍兴 → 合肥",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "shaoxing-foshan",
    name: "绍兴 → 佛山",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "shaoxing-shijiazhuang",
    name: "绍兴 → 石家庄",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "shaoxing-changchun",
    name: "绍兴 → 长春",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "shaoxing-guiyang",
    name: "绍兴 → 贵阳",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "shaoxing-nanning",
    name: "绍兴 → 南宁",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "shaoxing-jinhua",
    name: "绍兴 → 金华",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "shaoxing-taizhou",
    name: "绍兴 → 台州",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "shaoxing-huizhou",
    name: "绍兴 → 惠州",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "shaoxing-zhongshan",
    name: "绍兴 → 中山",
    cities: [
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "taizhou-beijing",
    name: "台州 → 北京",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "taizhou-shanghai",
    name: "台州 → 上海",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "taizhou-guangzhou",
    name: "台州 → 广州",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "taizhou-shenzhen",
    name: "台州 → 深圳",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "taizhou-chengdu",
    name: "台州 → 成都",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "taizhou-hangzhou",
    name: "台州 → 杭州",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "taizhou-wuhan",
    name: "台州 → 武汉",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "taizhou-xian",
    name: "台州 → 西安",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "taizhou-nanjing",
    name: "台州 → 南京",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "taizhou-chongqing",
    name: "台州 → 重庆",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "taizhou-tianjin",
    name: "台州 → 天津",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "taizhou-suzhou",
    name: "台州 → 苏州",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "taizhou-zhengzhou",
    name: "台州 → 郑州",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "taizhou-changsha",
    name: "台州 → 长沙",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "taizhou-kunming",
    name: "台州 → 昆明",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "taizhou-harbin",
    name: "台州 → 哈尔滨",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "taizhou-dalian",
    name: "台州 → 大连",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "taizhou-qingdao",
    name: "台州 → 青岛",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "taizhou-jinan",
    name: "台州 → 济南",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "taizhou-nanchang",
    name: "台州 → 南昌",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "taizhou-fuzhou",
    name: "台州 → 福州",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "taizhou-xiamen",
    name: "台州 → 厦门",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "taizhou-wuxi",
    name: "台州 → 无锡",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "taizhou-dongguan",
    name: "台州 → 东莞",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "taizhou-zhuhai",
    name: "台州 → 珠海",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "taizhou-ningbo",
    name: "台州 → 宁波",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "taizhou-shenyang",
    name: "台州 → 沈阳",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "taizhou-lanzhou",
    name: "台州 → 兰州",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "taizhou-haikou",
    name: "台州 → 海口",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "taizhou-cangzhou",
    name: "台州 → 沧州",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "taizhou-xuzhou",
    name: "台州 → 徐州",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "taizhou-changzhou",
    name: "台州 → 常州",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "taizhou-nantong",
    name: "台州 → 南通",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "taizhou-wenzhou",
    name: "台州 → 温州",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "taizhou-jiaxing",
    name: "台州 → 嘉兴",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "taizhou-baoding",
    name: "台州 → 保定",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "taizhou-tangshan",
    name: "台州 → 唐山",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "taizhou-taiyuan",
    name: "台州 → 太原",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "taizhou-hefei",
    name: "台州 → 合肥",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "taizhou-foshan",
    name: "台州 → 佛山",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "taizhou-shijiazhuang",
    name: "台州 → 石家庄",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "taizhou-changchun",
    name: "台州 → 长春",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "taizhou-guiyang",
    name: "台州 → 贵阳",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "taizhou-nanning",
    name: "台州 → 南宁",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "taizhou-jinhua",
    name: "台州 → 金华",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "taizhou-shaoxing",
    name: "台州 → 绍兴",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "taizhou-huizhou",
    name: "台州 → 惠州",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
  {
    id: "taizhou-zhongshan",
    name: "台州 → 中山",
    cities: [
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "huizhou-beijing",
    name: "惠州 → 北京",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "huizhou-shanghai",
    name: "惠州 → 上海",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "huizhou-guangzhou",
    name: "惠州 → 广州",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "huizhou-shenzhen",
    name: "惠州 → 深圳",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "huizhou-chengdu",
    name: "惠州 → 成都",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "huizhou-hangzhou",
    name: "惠州 → 杭州",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "huizhou-wuhan",
    name: "惠州 → 武汉",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "huizhou-xian",
    name: "惠州 → 西安",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "huizhou-nanjing",
    name: "惠州 → 南京",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "huizhou-chongqing",
    name: "惠州 → 重庆",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "huizhou-tianjin",
    name: "惠州 → 天津",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "huizhou-suzhou",
    name: "惠州 → 苏州",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "huizhou-zhengzhou",
    name: "惠州 → 郑州",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "huizhou-changsha",
    name: "惠州 → 长沙",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "huizhou-kunming",
    name: "惠州 → 昆明",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "huizhou-harbin",
    name: "惠州 → 哈尔滨",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "huizhou-dalian",
    name: "惠州 → 大连",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "huizhou-qingdao",
    name: "惠州 → 青岛",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "huizhou-jinan",
    name: "惠州 → 济南",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "huizhou-nanchang",
    name: "惠州 → 南昌",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "huizhou-fuzhou",
    name: "惠州 → 福州",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "huizhou-xiamen",
    name: "惠州 → 厦门",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "huizhou-wuxi",
    name: "惠州 → 无锡",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "huizhou-dongguan",
    name: "惠州 → 东莞",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "huizhou-zhuhai",
    name: "惠州 → 珠海",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "huizhou-ningbo",
    name: "惠州 → 宁波",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "huizhou-shenyang",
    name: "惠州 → 沈阳",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "huizhou-lanzhou",
    name: "惠州 → 兰州",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "huizhou-haikou",
    name: "惠州 → 海口",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "huizhou-cangzhou",
    name: "惠州 → 沧州",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "huizhou-xuzhou",
    name: "惠州 → 徐州",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "huizhou-changzhou",
    name: "惠州 → 常州",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "huizhou-nantong",
    name: "惠州 → 南通",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "huizhou-wenzhou",
    name: "惠州 → 温州",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "huizhou-jiaxing",
    name: "惠州 → 嘉兴",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "huizhou-baoding",
    name: "惠州 → 保定",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "huizhou-tangshan",
    name: "惠州 → 唐山",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "huizhou-taiyuan",
    name: "惠州 → 太原",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "huizhou-hefei",
    name: "惠州 → 合肥",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "huizhou-foshan",
    name: "惠州 → 佛山",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "huizhou-shijiazhuang",
    name: "惠州 → 石家庄",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "huizhou-changchun",
    name: "惠州 → 长春",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "huizhou-guiyang",
    name: "惠州 → 贵阳",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "huizhou-nanning",
    name: "惠州 → 南宁",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "huizhou-jinhua",
    name: "惠州 → 金华",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "huizhou-shaoxing",
    name: "惠州 → 绍兴",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "huizhou-taizhou",
    name: "惠州 → 台州",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "huizhou-zhongshan",
    name: "惠州 → 中山",
    cities: [
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
    ],
  },
  {
    id: "zhongshan-beijing",
    name: "中山 → 北京",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "beijing", name: "北京", center: [116.5572, 39.9142] },
    ],
  },
  {
    id: "zhongshan-shanghai",
    name: "中山 → 上海",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "shanghai", name: "上海", center: [121.4737, 31.2304] },
    ],
  },
  {
    id: "zhongshan-guangzhou",
    name: "中山 → 广州",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "guangzhou", name: "广州", center: [113.2644, 23.1291] },
    ],
  },
  {
    id: "zhongshan-shenzhen",
    name: "中山 → 深圳",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "shenzhen", name: "深圳", center: [114.0596, 22.5429] },
    ],
  },
  {
    id: "zhongshan-chengdu",
    name: "中山 → 成都",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "chengdu", name: "成都", center: [104.0665, 30.5723] },
    ],
  },
  {
    id: "zhongshan-hangzhou",
    name: "中山 → 杭州",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "hangzhou", name: "杭州", center: [120.1689, 30.2686] },
    ],
  },
  {
    id: "zhongshan-wuhan",
    name: "中山 → 武汉",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "wuhan", name: "武汉", center: [114.3055, 30.5928] },
    ],
  },
  {
    id: "zhongshan-xian",
    name: "中山 → 西安",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "xian", name: "西安", center: [108.948, 34.2632] },
    ],
  },
  {
    id: "zhongshan-nanjing",
    name: "中山 → 南京",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "nanjing", name: "南京", center: [118.7972, 32.0603] },
    ],
  },
  {
    id: "zhongshan-chongqing",
    name: "中山 → 重庆",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "chongqing", name: "重庆", center: [106.5049, 29.5331] },
    ],
  },
  {
    id: "zhongshan-tianjin",
    name: "中山 → 天津",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "tianjin", name: "天津", center: [117.1901, 39.1252] },
    ],
  },
  {
    id: "zhongshan-suzhou",
    name: "中山 → 苏州",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "suzhou", name: "苏州", center: [120.6199, 31.2994] },
    ],
  },
  {
    id: "zhongshan-zhengzhou",
    name: "中山 → 郑州",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "zhengzhou", name: "郑州", center: [113.6253, 34.7466] },
    ],
  },
  {
    id: "zhongshan-changsha",
    name: "中山 → 长沙",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "changsha", name: "长沙", center: [112.9388, 28.2282] },
    ],
  },
  {
    id: "zhongshan-kunming",
    name: "中山 → 昆明",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "kunming", name: "昆明", center: [102.7122, 25.0389] },
    ],
  },
  {
    id: "zhongshan-harbin",
    name: "中山 → 哈尔滨",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "harbin", name: "哈尔滨", center: [126.5358, 45.8023] },
    ],
  },
  {
    id: "zhongshan-dalian",
    name: "中山 → 大连",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "dalian", name: "大连", center: [121.6147, 38.9142] },
    ],
  },
  {
    id: "zhongshan-qingdao",
    name: "中山 → 青岛",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "qingdao", name: "青岛", center: [120.3894, 36.0714] },
    ],
  },
  {
    id: "zhongshan-jinan",
    name: "中山 → 济南",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "jinan", name: "济南", center: [117.1205, 36.6519] },
    ],
  },
  {
    id: "zhongshan-nanchang",
    name: "中山 → 南昌",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "nanchang", name: "南昌", center: [115.8921, 28.682] },
    ],
  },
  {
    id: "zhongshan-fuzhou",
    name: "中山 → 福州",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "fuzhou", name: "福州", center: [119.2964, 26.0745] },
    ],
  },
  {
    id: "zhongshan-xiamen",
    name: "中山 → 厦门",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "xiamen", name: "厦门", center: [118.0894, 24.4798] },
    ],
  },
  {
    id: "zhongshan-wuxi",
    name: "中山 → 无锡",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "wuxi", name: "无锡", center: [120.3119, 31.4912] },
    ],
  },
  {
    id: "zhongshan-dongguan",
    name: "中山 → 东莞",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "dongguan", name: "东莞", center: [113.7527, 23.0208] },
    ],
  },
  {
    id: "zhongshan-zhuhai",
    name: "中山 → 珠海",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "zhuhai", name: "珠海", center: [113.5751, 22.2748] },
    ],
  },
  {
    id: "zhongshan-ningbo",
    name: "中山 → 宁波",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "ningbo", name: "宁波", center: [121.5455, 29.8739] },
    ],
  },
  {
    id: "zhongshan-shenyang",
    name: "中山 → 沈阳",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "shenyang", name: "沈阳", center: [123.4328, 41.8056] },
    ],
  },
  {
    id: "zhongshan-lanzhou",
    name: "中山 → 兰州",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "lanzhou", name: "兰州", center: [103.8235, 36.0593] },
    ],
  },
  {
    id: "zhongshan-haikou",
    name: "中山 → 海口",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "haikou", name: "海口", center: [110.3467, 20.0239] },
    ],
  },
  {
    id: "zhongshan-cangzhou",
    name: "中山 → 沧州",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "cangzhou", name: "沧州", center: [116.8388, 38.3037] },
    ],
  },
  {
    id: "zhongshan-xuzhou",
    name: "中山 → 徐州",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "xuzhou", name: "徐州", center: [117.2841, 34.2058] },
    ],
  },
  {
    id: "zhongshan-changzhou",
    name: "中山 → 常州",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "changzhou", name: "常州", center: [119.9723, 31.8115] },
    ],
  },
  {
    id: "zhongshan-nantong",
    name: "中山 → 南通",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "nantong", name: "南通", center: [120.8655, 31.9819] },
    ],
  },
  {
    id: "zhongshan-wenzhou",
    name: "中山 → 温州",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "wenzhou", name: "温州", center: [120.6517, 28.0117] },
    ],
  },
  {
    id: "zhongshan-jiaxing",
    name: "中山 → 嘉兴",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "jiaxing", name: "嘉兴", center: [120.7579, 30.7618] },
    ],
  },
  {
    id: "zhongshan-baoding",
    name: "中山 → 保定",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "baoding", name: "保定", center: [115.4804, 38.8761] },
    ],
  },
  {
    id: "zhongshan-tangshan",
    name: "中山 → 唐山",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "tangshan", name: "唐山", center: [118.1948, 39.6356] },
    ],
  },
  {
    id: "zhongshan-taiyuan",
    name: "中山 → 太原",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "taiyuan", name: "太原", center: [112.5489, 37.857] },
    ],
  },
  {
    id: "zhongshan-hefei",
    name: "中山 → 合肥",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "hefei", name: "合肥", center: [117.2308, 31.8313] },
    ],
  },
  {
    id: "zhongshan-foshan",
    name: "中山 → 佛山",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "foshan", name: "佛山", center: [113.1232, 23.0218] },
    ],
  },
  {
    id: "zhongshan-shijiazhuang",
    name: "中山 → 石家庄",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "shijiazhuang", name: "石家庄", center: [114.5149, 38.0423] },
    ],
  },
  {
    id: "zhongshan-changchun",
    name: "中山 → 长春",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "changchun", name: "长春", center: [125.3245, 43.817] },
    ],
  },
  {
    id: "zhongshan-guiyang",
    name: "中山 → 贵阳",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "guiyang", name: "贵阳", center: [106.6305, 26.6577] },
    ],
  },
  {
    id: "zhongshan-nanning",
    name: "中山 → 南宁",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "nanning", name: "南宁", center: [108.3665, 22.8177] },
    ],
  },
  {
    id: "zhongshan-jinhua",
    name: "中山 → 金华",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "jinhua", name: "金华", center: [119.6489, 29.0771] },
    ],
  },
  {
    id: "zhongshan-shaoxing",
    name: "中山 → 绍兴",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "shaoxing", name: "绍兴", center: [120.5853, 30.0027] },
    ],
  },
  {
    id: "zhongshan-taizhou",
    name: "中山 → 台州",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "taizhou", name: "台州", center: [121.4221, 28.6542] },
    ],
  },
  {
    id: "zhongshan-huizhou",
    name: "中山 → 惠州",
    cities: [
      { id: "zhongshan", name: "中山", center: [113.3909, 22.5276] },
      { id: "huizhou", name: "惠州", center: [114.4147, 23.106] },
    ],
  },
];

