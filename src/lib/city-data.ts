// 城市数据，含市政府坐标（作为默认起终点）
export interface CityWithCenter {
  id: string;
  name: string;
  province: string;
  // 市政府坐标 [lng, lat]
  center: [number, number];
  // 市政府地址名（用于地理编码回退）
  centerName: string;
}

export const CITIES_WITH_CENTER: CityWithCenter[] = [
  { id: "beijing", name: "北京", province: "北京市", center: [116.5572, 39.9142], centerName: "北京市人民政府" },
  { id: "shanghai", name: "上海", province: "上海市", center: [121.4737, 31.2304], centerName: "上海市人民政府" },
  { id: "guangzhou", name: "广州", province: "广东省", center: [113.2644, 23.1291], centerName: "广州市人民政府" },
  { id: "shenzhen", name: "深圳", province: "广东省", center: [114.0596, 22.5429], centerName: "深圳市人民政府" },
  { id: "chengdu", name: "成都", province: "四川省", center: [104.0665, 30.5723], centerName: "成都市人民政府" },
  { id: "hangzhou", name: "杭州", province: "浙江省", center: [120.1689, 30.2686], centerName: "杭州市人民政府" },
  { id: "wuhan", name: "武汉", province: "湖北省", center: [114.3055, 30.5928], centerName: "武汉市人民政府" },
  { id: "xian", name: "西安", province: "陕西省", center: [108.9480, 34.2632], centerName: "西安市人民政府" },
  { id: "nanjing", name: "南京", province: "江苏省", center: [118.7972, 32.0603], centerName: "南京市人民政府" },
  { id: "chongqing", name: "重庆", province: "重庆市", center: [106.5049, 29.5331], centerName: "重庆市人民政府" },
  { id: "tianjin", name: "天津", province: "天津市", center: [117.1901, 39.1252], centerName: "天津市人民政府" },
  { id: "suzhou", name: "苏州", province: "江苏省", center: [120.6199, 31.2994], centerName: "苏州市人民政府" },
  { id: "zhengzhou", name: "郑州", province: "河南省", center: [113.6253, 34.7466], centerName: "郑州市人民政府" },
  { id: "changsha", name: "长沙", province: "湖南省", center: [112.9388, 28.2282], centerName: "长沙市人民政府" },
  { id: "kunming", name: "昆明", province: "云南省", center: [102.7122, 25.0389], centerName: "昆明市人民政府" },
  { id: "harbin", name: "哈尔滨", province: "黑龙江省", center: [126.5358, 45.8023], centerName: "哈尔滨市人民政府" },
  { id: "dalian", name: "大连", province: "辽宁省", center: [121.6147, 38.9142], centerName: "大连市人民政府" },
  { id: "qingdao", name: "青岛", province: "山东省", center: [120.3894, 36.0714], centerName: "青岛市人民政府" },
  { id: "jinan", name: "济南", province: "山东省", center: [117.1205, 36.6519], centerName: "济南市人民政府" },
  { id: "nanchang", name: "南昌", province: "江西省", center: [115.8921, 28.6820], centerName: "南昌市人民政府" },
  { id: "fuzhou", name: "福州", province: "福建省", center: [119.2964, 26.0745], centerName: "福州市人民政府" },
  { id: "xiamen", name: "厦门", province: "福建省", center: [118.0894, 24.4798], centerName: "厦门市人民政府" },
  { id: "wuxi", name: "无锡", province: "江苏省", center: [120.3119, 31.4912], centerName: "无锡市人民政府" },
  { id: "dongguan", name: "东莞", province: "广东省", center: [113.7527, 23.0208], centerName: "东莞市人民政府" },
  { id: "zhuhai", name: "珠海", province: "广东省", center: [113.5751, 22.2748], centerName: "珠海市人民政府" },
  { id: "ningbo", name: "宁波", province: "浙江省", center: [121.5455, 29.8739], centerName: "宁波市人民政府" },
  { id: "shenyang", name: "沈阳", province: "辽宁省", center: [123.4328, 41.8056], centerName: "沈阳市人民政府" },
  { id: "lanzhou", name: "兰州", province: "甘肃省", center: [103.8235, 36.0593], centerName: "兰州市人民政府" },
  { id: "haikou", name: "海口", province: "海南省", center: [110.3467, 20.0239], centerName: "海口市人民政府" },
  { id: "cangzhou", name: "沧州", province: "河北省", center: [116.8388, 38.3037], centerName: "沧州市人民政府" },
  { id: "xuzhou", name: "徐州", province: "江苏省", center: [117.2841, 34.2058], centerName: "徐州市人民政府" },
  { id: "changzhou", name: "常州", province: "江苏省", center: [119.9723, 31.8115], centerName: "常州市人民政府" },
  { id: "nantong", name: "南通", province: "江苏省", center: [120.8655, 31.9819], centerName: "南通市人民政府" },
  { id: "wenzhou", name: "温州", province: "浙江省", center: [120.6517, 28.0117], centerName: "温州市人民政府" },
  { id: "jiaxing", name: "嘉兴", province: "浙江省", center: [120.7579, 30.7618], centerName: "嘉兴市人民政府" },
  { id: "baoding", name: "保定", province: "河北省", center: [115.4804, 38.8761], centerName: "保定市人民政府" },
  { id: "tangshan", name: "唐山", province: "河北省", center: [118.1948, 39.6356], centerName: "唐山市人民政府" },
  { id: "taiyuan", name: "太原", province: "山西省", center: [112.5489, 37.8570], centerName: "太原市人民政府" },
  { id: "hefei", name: "合肥", province: "安徽省", center: [117.2308, 31.8313], centerName: "合肥市人民政府" },
  { id: "foshan", name: "佛山", province: "广东省", center: [113.1232, 23.0218], centerName: "佛山市人民政府" },
  { id: "shijiazhuang", name: "石家庄", province: "河北省", center: [114.5149, 38.0423], centerName: "石家庄市人民政府" },
  { id: "changchun", name: "长春", province: "吉林省", center: [125.3245, 43.8170], centerName: "长春市人民政府" },
  { id: "guiyang", name: "贵阳", province: "贵州省", center: [106.6305, 26.6577], centerName: "贵阳市人民政府" },
  { id: "nanning", name: "南宁", province: "广西壮族自治区", center: [108.3665, 22.8177], centerName: "南宁市人民政府" },
  { id: "jinhua", name: "金华", province: "浙江省", center: [119.6489, 29.0771], centerName: "金华市人民政府" },
  { id: "shaoxing", name: "绍兴", province: "浙江省", center: [120.5853, 30.0027], centerName: "绍兴市人民政府" },
  { id: "taizhou", name: "台州", province: "浙江省", center: [121.4221, 28.6542], centerName: "台州市人民政府" },
  { id: "huizhou", name: "惠州", province: "广东省", center: [114.4147, 23.1060], centerName: "惠州市人民政府" },
  { id: "zhongshan", name: "中山", province: "广东省", center: [113.3909, 22.5276], centerName: "中山市人民政府" },
];

export function getCityById(id: string): CityWithCenter | undefined {
  return CITIES_WITH_CENTER.find((c) => c.id === id);
}
