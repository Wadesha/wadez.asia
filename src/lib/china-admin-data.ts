/**
 * 全国行政区划数据（简化版）
 *
 * 边界为手绘近似轮廓（8-20顶点），非精确GeoJSON
 * 数据来源：国家统计局公开数据（2023年）
 * 数据性质：示例数据，仅供可视化展示
 */

export type AdminType = "province" | "municipality" | "autonomous" | "special";

export interface ProvinceData {
  code: string;
  name: string;
  shortName: string;
  type: AdminType;
  /** 中心坐标 [lng, lat] */
  center: [number, number];
  /** 简化多边形轮廓（经纬度点串） */
  boundary: Array<[number, number]>;
  /** 面积（万平方公里） */
  area: number;
  /** 常住人口（万人） */
  population: number;
  /** GDP（亿元） */
  gdp: number;
  /** 城镇化率（%） */
  urbanizationRate: number;
  /** 财政收入（亿元） */
  fiscalRevenue: number;
  /** 社零消费（亿元） */
  retailSales: number;
  /** 第一产业占比（%） */
  primaryIndustry: number;
  /** 第二产业占比（%） */
  secondaryIndustry: number;
  /** 第三产业占比（%） */
  tertiaryIndustry: number;
}

// 34省级行政区简化数据
// 注：boundary采用"伪经纬度"坐标，按中国雄鸡形状的相对位置手绘v2
// 经度范围：62~138（跨度76），纬度范围：14~58（跨度44），整体比例1.73:1
export const PROVINCES: ProvinceData[] = [
  // ========== 新疆（鸡尾最西端，大板块，lat:34~52） ==========
  {
    code: "65", name: "新疆维吾尔自治区", shortName: "新", type: "autonomous",
    center: [88, 44], area: 166.0, population: 2598, gdp: 19126,
    urbanizationRate: 57.0, fiscalRevenue: 2180, retailSales: 3900,
    primaryIndustry: 14.3, secondaryIndustry: 37.5, tertiaryIndustry: 48.2,
    boundary: [
      [62,38],[64,41],[67,43.5],[71,45.5],[76,47],[81,48.5],[86,50],[91,51],
      [96,51.5],[100,52],[102,49.5],[102,46.5],[100,44],[97,42],[93,40],[88,39],
      [83,38],[78,37],[73,36.5],[68,36.8],[64,37.2],[62,38]
    ],
  },
  // ========== 西藏（新疆正下方，大板块，lat:22~38） ==========
  {
    code: "54", name: "西藏自治区", shortName: "藏", type: "autonomous",
    center: [89, 30], area: 122.84, population: 365, gdp: 2392,
    urbanizationRate: 37.0, fiscalRevenue: 262, retailSales: 850,
    primaryIndustry: 8.7, secondaryIndustry: 38.5, tertiaryIndustry: 52.8,
    boundary: [
      [68,27],[71,29],[74,31],[78,33],[82,34.5],[86,35.5],[90,36],[94,36],
      [98,35.5],[101,34.5],[102,32],[100,30],[97,28],[93,26.5],[88,26],
      [83,26.2],[78,26.8],[73,27.5],[70,28],[68,27]
    ],
  },
  // ========== 青海（西藏东北、甘肃西南，lat:29~39） ==========
  {
    code: "63", name: "青海省", shortName: "青", type: "province",
    center: [96, 34], area: 72.23, population: 595, gdp: 3799,
    urbanizationRate: 61.0, fiscalRevenue: 381, retailSales: 1450,
    primaryIndustry: 9.2, secondaryIndustry: 44.5, tertiaryIndustry: 46.3,
    boundary: [
      [89,30],[92,32],[95,33.5],[99,34.2],[102,35],[104,36],
      [105,34.5],[104,32.5],[102,31],[99,29.8],[96,29.3],[92,29.5],[89,30]
    ],
  },
  // ========== 甘肃（西北-东南长条，lat:32~43） ==========
  {
    code: "62", name: "甘肃省", shortName: "甘", type: "province",
    center: [102, 38], area: 42.59, population: 2465, gdp: 11864,
    urbanizationRate: 55.0, fiscalRevenue: 1054, retailSales: 4300,
    primaryIndustry: 13.8, secondaryIndustry: 37.5, tertiaryIndustry: 48.7,
    boundary: [
      [92,34.5],[95,36],[98,37.5],[101,39],[104,40.5],[106,42],
      [108,42.5],[109,41],[108.5,39.5],[107.5,38],[106,36.5],[104.5,35.5],
      [103,34.8],[101,34.5],[99,34.8],[97,35.2],[94,35.8],[92,34.5]
    ],
  },
  // ========== 内蒙古（北部大长条，鸡背+鸡冠，lat:40~57） ==========
  {
    code: "15", name: "内蒙古自治区", shortName: "蒙", type: "autonomous",
    center: [113, 48.5], area: 118.3, population: 2396, gdp: 24627,
    urbanizationRate: 68.6, fiscalRevenue: 3058, retailSales: 5400,
    primaryIndustry: 11.1, secondaryIndustry: 44.3, tertiaryIndustry: 44.6,
    boundary: [
      [97,42],[100,44],[103,45.5],[106,47],[109,49],[112,51],
      [116,52.5],[120,53.5],[124,54],[128,54.2],[131,53.5],[133,52],
      [131.5,50],[129,48.5],[126,47],[122,46],[118,45.8],[114,46],
      [110,45.5],[106,45],[102,44.5],[98,43.5],[97,42]
    ],
  },
  // ========== 宁夏（甘肃东侧小块，lat:35.5~41） ==========
  {
    code: "64", name: "宁夏回族自治区", shortName: "宁", type: "autonomous",
    center: [106, 38], area: 6.64, population: 728, gdp: 5315,
    urbanizationRate: 66.0, fiscalRevenue: 534, retailSales: 1950,
    primaryIndustry: 7.8, secondaryIndustry: 48.5, tertiaryIndustry: 43.7,
    boundary: [
      [104.5,36],[105.5,36.5],[106.8,37.2],[107.5,38.5],[108,39.5],
      [107.8,40.5],[106.5,41],[105.2,40.5],[104.3,39.5],[104.1,38],
      [104.3,37],[104.5,36]
    ],
  },
  // ========== 陕西（南北长条，lat:31.5~41） ==========
  {
    code: "61", name: "陕西省", shortName: "陕", type: "province",
    center: [109, 36], area: 20.58, population: 3956, gdp: 33786,
    urbanizationRate: 64.0, fiscalRevenue: 3502, retailSales: 11500,
    primaryIndustry: 7.8, secondaryIndustry: 47.2, tertiaryIndustry: 45.0,
    boundary: [
      [105.5,32.5],[107,32.8],[108.8,33.5],[110.2,34.5],[111.2,36],
      [111.5,37.5],[111.3,39],[110.5,40.2],[109.5,41],[108.3,40.8],
      [107.2,39.5],[106.5,38],[105.8,36.5],[105.5,34.5],[105.5,32.5]
    ],
  },
  // ========== 山西（陕西东、河北西，南北向，lat:34.5~42） ==========
  {
    code: "14", name: "山西省", shortName: "晋", type: "province",
    center: [112.5, 38.5], area: 15.63, population: 3466, gdp: 25698,
    urbanizationRate: 63.0, fiscalRevenue: 3422, retailSales: 8000,
    primaryIndustry: 5.7, secondaryIndustry: 46.5, tertiaryIndustry: 47.8,
    boundary: [
      [110.2,36.5],[111,38],[111.8,39.5],[112.8,40.8],[114,41.5],
      [114.5,40.8],[114.8,39.5],[114.5,38],[114,36.5],[113.2,35.3],
      [112.2,34.8],[111.2,35],[110.5,35.8],[110.2,36.5]
    ],
  },
  // ========== 河北（包裹京津，华北，lat:36~43） ==========
  {
    code: "13", name: "河北省", shortName: "冀", type: "province",
    center: [115.5, 39], area: 18.88, population: 7393, gdp: 43944,
    urbanizationRate: 62.0, fiscalRevenue: 4173, retailSales: 14650,
    primaryIndustry: 10.2, secondaryIndustry: 40.2, tertiaryIndustry: 49.6,
    boundary: [
      [113.5,38.5],[114,40],[115,41],[116,41.8],[117.5,42.3],[118.8,42.5],
      [119.8,41.8],[120.2,40.5],[119.8,39],[119,37.8],[117.5,37],[116,36.8],
      [114.5,37],[113.8,37.8],[113.5,38.5]
    ],
  },
  // ========== 北京（河北内，放大4倍，lat:39.7~41.5） ==========
  {
    code: "11", name: "北京市", shortName: "京", type: "municipality",
    center: [116.2, 40.5], area: 1.64, population: 2186, gdp: 43761,
    urbanizationRate: 87.8, fiscalRevenue: 6181, retailSales: 14881,
    primaryIndustry: 0.3, secondaryIndustry: 16.0, tertiaryIndustry: 83.7,
    boundary: [
      [115.3,39.8],[115.5,40.3],[115.8,40.8],[116.2,41.2],[116.8,41.4],
      [117.1,41],[117,40.5],[116.8,40],[116.4,39.7],[115.8,39.6],
      [115.5,39.7],[115.3,39.8]
    ],
  },
  // ========== 天津（北京东南，放大4倍，lat:38.5~40） ==========
  {
    code: "12", name: "天津市", shortName: "津", type: "municipality",
    center: [117.5, 39.2], area: 1.19, population: 1364, gdp: 16737,
    urbanizationRate: 85.1, fiscalRevenue: 2524, retailSales: 6260,
    primaryIndustry: 1.8, secondaryIndustry: 37.0, tertiaryIndustry: 61.2,
    boundary: [
      [116.8,38.6],[117,39],[117.3,39.4],[117.8,39.6],[118.2,39.5],
      [118.3,39],[118.1,38.6],[117.7,38.3],[117.2,38.3],[116.9,38.5],
      [116.8,38.6]
    ],
  },
  // ========== 辽宁（东北最南、鸡脖子，lat:38.5~45） ==========
  {
    code: "21", name: "辽宁省", shortName: "辽", type: "province",
    center: [123, 41.8], area: 14.59, population: 4197, gdp: 33047,
    urbanizationRate: 73.0, fiscalRevenue: 2902, retailSales: 10380,
    primaryIndustry: 9.2, secondaryIndustry: 39.4, tertiaryIndustry: 51.4,
    boundary: [
      [119.5,40.5],[120.5,41.5],[121.8,42.5],[123,43.3],[124.5,44],
      [126,44.2],[126.8,43.5],[126.8,42],[126,40.8],[125,39.8],[123.8,39.2],
      [122.2,39],[120.8,39.5],[119.8,40.2],[119.5,40.5]
    ],
  },
  // ========== 吉林（辽宁北，lat:41~48） ==========
  {
    code: "22", name: "吉林省", shortName: "吉", type: "province",
    center: [126, 44.5], area: 18.74, population: 2339, gdp: 13531,
    urbanizationRate: 64.0, fiscalRevenue: 1075, retailSales: 4200,
    primaryIndustry: 12.8, secondaryIndustry: 34.5, tertiaryIndustry: 52.7,
    boundary: [
      [122,42.5],[124,43.2],[126,44],[128.5,44.8],[130.5,45],
      [132,44.5],[132.8,43.5],[132.5,42.5],[131,42],[129,41.8],
      [127,42],[125,42.2],[123.5,42.5],[122,42.5]
    ],
  },
  // ========== 黑龙江（最东北，鸡头，lat:43~57.5） ==========
  {
    code: "23", name: "黑龙江省", shortName: "黑", type: "province",
    center: [128, 50], area: 47.3, population: 3062, gdp: 15884,
    urbanizationRate: 66.2, fiscalRevenue: 1392, retailSales: 5600,
    primaryIndustry: 13.5, secondaryIndustry: 31.2, tertiaryIndustry: 55.3,
    boundary: [
      [122,46.5],[123.5,48],[125,49.5],[127,51],[129.5,52.5],
      [132,53.5],[134.5,54.2],[136,55],[137,57.5],[138,56.5],
      [137.5,55],[136,53],[134.5,51.5],[133,50],[131,48.8],[129,48],
      [127,47.5],[125,47.2],[123.5,47],[122,46.5]
    ],
  },
  // ========== 山东（华东最北，鸡胸，lat:34~39.5） ==========
  {
    code: "37", name: "山东省", shortName: "鲁", type: "province",
    center: [117.8, 36.5], area: 15.79, population: 10163, gdp: 92069,
    urbanizationRate: 65.0, fiscalRevenue: 8315, retailSales: 36000,
    primaryIndustry: 7.0, secondaryIndustry: 39.1, tertiaryIndustry: 53.9,
    boundary: [
      [115,34.8],[116.2,34.6],[118,34.8],[119.8,35.5],[121.2,36.3],
      [122.3,37.3],[122.8,38.5],[123,39.5],[121.5,39.2],[119.8,38.5],
      [118.2,37.8],[116.8,37],[115.5,36],[115,34.8]
    ],
  },
  // ========== 河南（中原，lat:31.5~37） ==========
  {
    code: "41", name: "河南省", shortName: "豫", type: "province",
    center: [113.5, 34], area: 16.7, population: 9872, gdp: 59132,
    urbanizationRate: 58.0, fiscalRevenue: 5150, retailSales: 26500,
    primaryIndustry: 8.8, secondaryIndustry: 40.5, tertiaryIndustry: 50.7,
    boundary: [
      [110.5,32.5],[111.8,31.8],[113.5,31.5],[115.2,31.8],[116.8,32.5],
      [117.3,33.8],[117,35],[116,36],[114.5,36.8],[112.8,36.8],
      [111.3,36],[110.5,34.8],[110.5,32.5]
    ],
  },
  // ========== 江苏（长三角北，lat:30.5~35.2） ==========
  {
    code: "32", name: "江苏省", shortName: "苏", type: "province",
    center: [119.2, 32.8], area: 10.72, population: 8515, gdp: 128222,
    urbanizationRate: 75.0, fiscalRevenue: 11627, retailSales: 45400,
    primaryIndustry: 4.3, secondaryIndustry: 44.4, tertiaryIndustry: 51.3,
    boundary: [
      [116.2,33.5],[117.5,34.2],[119,34.8],[120.5,35],[121.8,34.5],
      [122.3,33.5],[122.5,32.2],[122,31.2],[121,30.8],[119.5,30.8],
      [118,31.2],[116.8,32],[116.2,33.5]
    ],
  },
  // ========== 上海（长三角尖端，放大5倍，lat:30.3~32） ==========
  {
    code: "31", name: "上海市", shortName: "沪", type: "municipality",
    center: [121.6, 31.2], area: 0.63, population: 2487, gdp: 47218,
    urbanizationRate: 89.5, fiscalRevenue: 8552, retailSales: 18521,
    primaryIndustry: 0.2, secondaryIndustry: 25.5, tertiaryIndustry: 74.3,
    boundary: [
      [120.8,30.6],[121,31],[121.3,31.5],[121.8,31.8],[122.2,31.7],
      [122.3,31.2],[122.1,30.8],[121.7,30.5],[121.2,30.4],[120.9,30.5],
      [120.8,30.6]
    ],
  },
  // ========== 安徽（江苏西，lat:29~34.5） ==========
  {
    code: "34", name: "安徽省", shortName: "皖", type: "province",
    center: [117.2, 31.5], area: 14.01, population: 6121, gdp: 47050,
    urbanizationRate: 61.0, fiscalRevenue: 3961, retailSales: 19000,
    primaryIndustry: 7.8, secondaryIndustry: 41.3, tertiaryIndustry: 50.9,
    boundary: [
      [114.8,29.8],[116,29.5],[117.3,29.8],[118.8,30.5],[119.7,31.3],
      [120,32.5],[119.3,33.8],[118.2,34.5],[116.8,34.5],[115.5,33.8],
      [115,32.5],[114.8,31],[114.8,29.8]
    ],
  },
  // ========== 浙江（上海南，lat:27~31.5） ==========
  {
    code: "33", name: "浙江省", shortName: "浙", type: "province",
    center: [120.2, 29.2], area: 10.55, population: 6627, gdp: 82553,
    urbanizationRate: 74.2, fiscalRevenue: 8750, retailSales: 32580,
    primaryIndustry: 3.1, secondaryIndustry: 41.3, tertiaryIndustry: 55.6,
    boundary: [
      [117.8,27.8],[119,27.3],[120.3,27.3],[121.5,28],[122.5,29],
      [123,30],[122.8,31],[122,31.5],[120.5,31.5],[119.2,31],
      [118.2,30],[117.8,29],[117.8,27.8]
    ],
  },
  // ========== 湖北（九省通衢，lat:29~33.5） ==========
  {
    code: "42", name: "湖北省", shortName: "鄂", type: "province",
    center: [113, 31], area: 18.59, population: 5844, gdp: 55803,
    urbanizationRate: 65.0, fiscalRevenue: 4312, retailSales: 23000,
    primaryIndustry: 8.0, secondaryIndustry: 40.8, tertiaryIndustry: 51.2,
    boundary: [
      [108.5,30],[110,29.6],[112,29.5],[113.8,29.3],[115.5,29.7],
      [116.5,30.5],[116.8,31.8],[116.2,32.8],[115,33.3],[113.5,33.5],
      [111.8,33.3],[110.2,32.5],[109,31.5],[108.5,30]
    ],
  },
  // ========== 四川（大省份，天府，lat:26~34.5） ==========
  {
    code: "51", name: "四川省", shortName: "川", type: "province",
    center: [104, 30.5], area: 48.6, population: 8372, gdp: 60133,
    urbanizationRate: 58.4, fiscalRevenue: 5529, retailSales: 26500,
    primaryIndustry: 8.8, secondaryIndustry: 39.5, tertiaryIndustry: 51.7,
    boundary: [
      [97.5,28],[99.5,27.5],[101.8,27.5],[104,28],[106,28.5],
      [107.8,29.5],[108.5,31],[108.8,32.5],[108,33.8],[106.5,34.3],
      [104.8,34.5],[102.8,34],[100.8,33],[99.5,31.8],[98.5,30.5],[97.8,29.2],
      [97.5,28]
    ],
  },
  // ========== 重庆（四川东，lat:27.5~32.5） ==========
  {
    code: "50", name: "重庆市", shortName: "渝", type: "municipality",
    center: [107.2, 30], area: 8.24, population: 3213, gdp: 30146,
    urbanizationRate: 71.0, fiscalRevenue: 3050, retailSales: 14500,
    primaryIndustry: 6.5, secondaryIndustry: 39.3, tertiaryIndustry: 54.2,
    boundary: [
      [105.5,28.3],[106.5,28],[107.8,28.3],[109,29],[109.8,30],
      [110,31],[109.5,32],[108.8,32.8],[107.5,33],[106.5,32.3],
      [105.8,31.3],[105.3,30],[105.5,28.3]
    ],
  },
  // ========== 湖南（湖北南，lat:24.5~30） ==========
  {
    code: "43", name: "湖南省", shortName: "湘", type: "province",
    center: [112, 27.5], area: 21.18, population: 6604, gdp: 50012,
    urbanizationRate: 61.0, fiscalRevenue: 3812, retailSales: 18500,
    primaryIndustry: 8.5, secondaryIndustry: 39.5, tertiaryIndustry: 52.0,
    boundary: [
      [108.8,25],[110.3,24.8],[112.2,24.5],[113.5,25],[114.3,26],
      [114.8,27.5],[114.5,29],[113.8,30],[112.5,30.3],[110.8,30],
      [109.5,29],[108.8,27.5],[108.8,25]
    ],
  },
  // ========== 江西（湖南东，lat:24.5~30） ==========
  {
    code: "36", name: "江西省", shortName: "赣", type: "province",
    center: [115.8, 27.5], area: 16.69, population: 4515, gdp: 32200,
    urbanizationRate: 62.0, fiscalRevenue: 3212, retailSales: 13700,
    primaryIndustry: 7.6, secondaryIndustry: 44.6, tertiaryIndustry: 47.8,
    boundary: [
      [113.8,24.8],[115,25],[116.5,25.8],[117.8,26.8],[118.3,28],
      [118.5,29],[118.2,30],[117.2,30.3],[115.8,30.2],[114.5,29.5],
      [113.8,28.3],[113.8,24.8]
    ],
  },
  // ========== 福建（东南沿海，lat:23.5~28.5） ==========
  {
    code: "35", name: "福建省", shortName: "闽", type: "province",
    center: [118.5, 26], area: 12.4, population: 4188, gdp: 53110,
    urbanizationRate: 70.1, fiscalRevenue: 5835, retailSales: 21000,
    primaryIndustry: 5.9, secondaryIndustry: 44.2, tertiaryIndustry: 49.9,
    boundary: [
      [116.5,23.8],[117.5,24],[118.8,24.5],[119.8,25.2],[120.5,26.2],
      [120.8,27.3],[120.5,28.3],[119.8,28.8],[118.5,28.8],[117.3,28],
      [116.5,26.8],[116.3,25.5],[116.5,23.8]
    ],
  },
  // ========== 贵州（云南东，lat:24~29.5） ==========
  {
    code: "52", name: "贵州省", shortName: "黔", type: "province",
    center: [106.5, 26.5], area: 17.6, population: 3856, gdp: 22672,
    urbanizationRate: 54.0, fiscalRevenue: 2002, retailSales: 8800,
    primaryIndustry: 13.0, secondaryIndustry: 35.8, tertiaryIndustry: 51.2,
    boundary: [
      [103.5,24.5],[105,24.2],[106.8,24.7],[108.5,25.3],[109.5,26.3],
      [110,27.3],[109.5,28.3],[108.5,29.2],[107.3,29.5],[105.8,29],
      [104.5,28],[103.7,26.5],[103.5,24.5]
    ],
  },
  // ========== 云南（最西南，lat:19~29） ==========
  {
    code: "53", name: "云南省", shortName: "滇", type: "province",
    center: [102, 24.5], area: 39.4, population: 4693, gdp: 30021,
    urbanizationRate: 51.7, fiscalRevenue: 2152, retailSales: 10800,
    primaryIndustry: 13.8, secondaryIndustry: 34.8, tertiaryIndustry: 51.4,
    boundary: [
      [97.5,21],[99,21.2],[101,21],[102.8,21.2],[104.5,22],
      [105.5,23],[106.2,24],[106,25.5],[105.2,27],[104.2,28.3],
      [102.8,29],[101,28.8],[99.3,28],[98.3,26.5],[97.8,25],
      [97.5,23.5],[97.5,21]
    ],
  },
  // ========== 广西（广东西，沿海，lat:20.5~26.5） ==========
  {
    code: "45", name: "广西壮族自治区", shortName: "桂", type: "autonomous",
    center: [108.5, 23.5], area: 23.6, population: 5037, gdp: 27202,
    urbanizationRate: 56.0, fiscalRevenue: 2245, retailSales: 9500,
    primaryIndustry: 15.3, secondaryIndustry: 36.2, tertiaryIndustry: 48.5,
    boundary: [
      [104.5,22],[105.8,21.5],[107.5,21.2],[109,21],[110.5,21.3],
      [111.5,22],[112.2,23.3],[112,24.5],[111,25.5],[109.5,26],
      [108,26.3],[106.5,25.8],[105.2,24.8],[104.5,23.5],[104.5,22]
    ],
  },
  // ========== 广东（珠三角，鸡腹，lat:20.5~25.5） ==========
  {
    code: "44", name: "广东省", shortName: "粤", type: "province",
    center: [113.5, 23], area: 17.97, population: 12706, gdp: 135673,
    urbanizationRate: 75.4, fiscalRevenue: 16453, retailSales: 47800,
    primaryIndustry: 4.1, secondaryIndustry: 40.4, tertiaryIndustry: 55.5,
    boundary: [
      [109.5,21.5],[110.5,20.8],[112,21],[113.5,21.5],[115,22],
      [116.5,22.3],[117.3,23],[117.5,24],[116.8,25],[115.5,25.3],
      [114,25.2],[112.5,24.5],[111,23.8],[110,23],[109.5,21.5]
    ],
  },
  // ========== 海南（离岛，鸡爪南，放大2.5倍，lat:14~19） ==========
  {
    code: "46", name: "海南省", shortName: "琼", type: "province",
    center: [110, 16.5], area: 3.54, population: 1043, gdp: 7551,
    urbanizationRate: 61.0, fiscalRevenue: 982, retailSales: 2600,
    primaryIndustry: 20.0, secondaryIndustry: 19.2, tertiaryIndustry: 60.8,
    boundary: [
      [108.5,14.8],[109.3,14.5],[110.3,14.8],[111.2,15.5],[111.5,16.5],
      [111.3,17.5],[110.7,18.3],[109.8,18.5],[109,18.2],[108.4,17.3],
      [108.2,16.3],[108.5,14.8]
    ],
  },
  // ========== 台湾（东南离岛，鸡爪东，放大2.5倍，lat:21~27） ==========
  {
    code: "71", name: "台湾省", shortName: "台", type: "province",
    center: [122, 24], area: 3.6, population: 2356, gdp: 53270,
    urbanizationRate: 79.0, fiscalRevenue: 3200, retailSales: 12000,
    primaryIndustry: 1.5, secondaryIndustry: 35.5, tertiaryIndustry: 63.0,
    boundary: [
      [121,21.5],[121.2,22.3],[121.6,23.2],[122.1,24.2],[122.5,25.2],
      [122.6,26],[122.3,26.8],[121.8,27],[121.3,26.5],[121,25.5],
      [120.9,24.3],[121,22.8],[121,21.5]
    ],
  },
  // ========== 香港（广东南，放大6倍，lat:20.8~22.3） ==========
  {
    code: "81", name: "香港特别行政区", shortName: "港", type: "special",
    center: [114.4, 21.6], area: 0.11, population: 750, gdp: 29500,
    urbanizationRate: 100.0, fiscalRevenue: 4500, retailSales: 3500,
    primaryIndustry: 0.1, secondaryIndustry: 6.5, tertiaryIndustry: 93.4,
    boundary: [
      [113.8,21.2],[114,21],[114.4,20.9],[114.8,21.1],[115,21.4],
      [114.9,21.8],[114.6,22.1],[114.2,22.2],[113.9,22],[113.8,21.6],
      [113.8,21.2]
    ],
  },
  // ========== 澳门（香港西，放大7倍，lat:20.9~22.1） ==========
  {
    code: "82", name: "澳门特别行政区", shortName: "澳", type: "special",
    center: [113.5, 21.5], area: 0.009, population: 68, gdp: 3300,
    urbanizationRate: 100.0, fiscalRevenue: 800, retailSales: 600,
    primaryIndustry: 0.0, secondaryIndustry: 5.0, tertiaryIndustry: 95.0,
    boundary: [
      [113.1,21.1],[113.3,21],[113.55,20.95],[113.75,21.1],
      [113.8,21.4],[113.75,21.7],[113.6,21.9],[113.4,21.95],
      [113.2,21.8],[113.1,21.5],[113.1,21.1]
    ],
  },
];

// ==================== 地级市示例数据 ====================
export interface CityData {
  code: string;
  name: string;
  provinceCode: string;
  provinceName: string;
  center: [number, number];
  gdp: number;
  population: number;
  area: number;
  urbanizationRate: number;
}

// 每省3-5个代表性地级市（全国约150个重点城市）
export const CITIES: CityData[] = [
  // 北京
  { code: "1101", name: "北京市区", provinceCode: "11", provinceName: "北京市", center: [116.41, 40.19], gdp: 43761, population: 2186, area: 1.64, urbanizationRate: 87.8 },
  // 天津
  { code: "1201", name: "天津市", provinceCode: "12", provinceName: "天津市", center: [117.20, 39.13], gdp: 16737, population: 1364, area: 1.19, urbanizationRate: 85.1 },
  // 河北
  { code: "1301", name: "石家庄", provinceCode: "13", provinceName: "河北省", center: [114.51, 38.05], gdp: 7100, population: 1122, area: 1.35, urbanizationRate: 65 },
  { code: "1302", name: "唐山", provinceCode: "13", provinceName: "河北省", center: [118.18, 39.63], gdp: 9020, population: 769, area: 1.35, urbanizationRate: 68 },
  { code: "1303", name: "保定", provinceCode: "13", provinceName: "河北省", center: [115.46, 38.87], gdp: 3800, population: 1155, area: 2.22, urbanizationRate: 55 },
  { code: "1304", name: "廊坊", provinceCode: "13", provinceName: "河北省", center: [116.68, 39.54], gdp: 3500, population: 553, area: 0.64, urbanizationRate: 62 },
  // 山西
  { code: "1401", name: "太原", provinceCode: "14", provinceName: "山西省", center: [112.55, 37.87], gdp: 5571, population: 543, area: 0.70, urbanizationRate: 85 },
  { code: "1402", name: "大同", provinceCode: "14", provinceName: "山西省", center: [113.30, 40.08], gdp: 1800, population: 310, area: 1.41, urbanizationRate: 65 },
  { code: "1403", name: "临汾", provinceCode: "14", provinceName: "山西省", center: [111.52, 36.08], gdp: 2200, population: 438, area: 2.03, urbanizationRate: 55 },
  // 内蒙古
  { code: "1501", name: "呼和浩特", provinceCode: "15", provinceName: "内蒙古", center: [111.67, 40.82], gdp: 3800, population: 354, area: 1.72, urbanizationRate: 70 },
  { code: "1502", name: "包头", provinceCode: "15", provinceName: "内蒙古", center: [109.84, 40.66], gdp: 4200, population: 289, area: 2.77, urbanizationRate: 72 },
  { code: "1503", name: "鄂尔多斯", provinceCode: "15", provinceName: "内蒙古", center: [109.99, 39.82], gdp: 5800, population: 220, area: 8.68, urbanizationRate: 78 },
  // 辽宁
  { code: "2101", name: "沈阳", provinceCode: "21", provinceName: "辽宁省", center: [123.43, 41.80], gdp: 8120, population: 914, area: 1.29, urbanizationRate: 81 },
  { code: "2102", name: "大连", provinceCode: "21", provinceName: "辽宁省", center: [121.61, 38.91], gdp: 8750, population: 753, area: 1.26, urbanizationRate: 80 },
  { code: "2103", name: "鞍山", provinceCode: "21", provinceName: "辽宁省", center: [122.99, 41.11], gdp: 1900, population: 333, area: 0.93, urbanizationRate: 70 },
  // 吉林
  { code: "2201", name: "长春", provinceCode: "22", provinceName: "吉林省", center: [125.32, 43.82], gdp: 7100, population: 908, area: 2.06, urbanizationRate: 68 },
  { code: "2202", name: "吉林", provinceCode: "22", provinceName: "吉林省", center: [126.55, 43.84], gdp: 1700, population: 362, area: 2.71, urbanizationRate: 60 },
  // 黑龙江
  { code: "2301", name: "哈尔滨", provinceCode: "23", provinceName: "黑龙江省", center: [126.66, 45.74], gdp: 5577, population: 939, area: 5.31, urbanizationRate: 70 },
  { code: "2302", name: "大庆", provinceCode: "23", provinceName: "黑龙江省", center: [125.10, 46.59], gdp: 2800, population: 278, area: 2.12, urbanizationRate: 72 },
  { code: "2303", name: "齐齐哈尔", provinceCode: "23", provinceName: "黑龙江省", center: [123.95, 47.35], gdp: 1300, population: 407, area: 4.25, urbanizationRate: 55 },
  // 上海
  { code: "3101", name: "上海市", provinceCode: "31", provinceName: "上海市", center: [121.47, 31.23], gdp: 47218, population: 2487, area: 0.63, urbanizationRate: 89.5 },
  // 江苏
  { code: "3201", name: "南京", provinceCode: "32", provinceName: "江苏省", center: [118.78, 32.06], gdp: 17421, population: 949, area: 0.66, urbanizationRate: 87 },
  { code: "3202", name: "苏州", provinceCode: "32", provinceName: "江苏省", center: [120.62, 31.32], gdp: 24653, population: 1291, area: 0.87, urbanizationRate: 82 },
  { code: "3203", name: "无锡", provinceCode: "32", provinceName: "江苏省", center: [120.30, 31.57], gdp: 15453, population: 749, area: 0.46, urbanizationRate: 83 },
  { code: "3204", name: "南通", provinceCode: "32", provinceName: "江苏省", center: [120.89, 32.01], gdp: 11813, population: 774, area: 0.80, urbanizationRate: 72 },
  { code: "3205", name: "徐州", provinceCode: "32", provinceName: "江苏省", center: [117.18, 34.26], gdp: 8900, population: 902, area: 1.13, urbanizationRate: 68 },
  // 浙江
  { code: "3301", name: "杭州", provinceCode: "33", provinceName: "浙江省", center: [120.15, 30.27], gdp: 20059, population: 1238, area: 1.69, urbanizationRate: 84 },
  { code: "3302", name: "宁波", provinceCode: "33", provinceName: "浙江省", center: [121.55, 29.87], gdp: 16452, population: 969, area: 0.98, urbanizationRate: 79 },
  { code: "3303", name: "温州", provinceCode: "33", provinceName: "浙江省", center: [120.70, 28.00], gdp: 8730, population: 964, area: 1.21, urbanizationRate: 72 },
  { code: "3304", name: "嘉兴", provinceCode: "33", provinceName: "浙江省", center: [120.75, 30.75], gdp: 7062, population: 555, area: 0.42, urbanizationRate: 72 },
  // 安徽
  { code: "3401", name: "合肥", provinceCode: "34", provinceName: "安徽省", center: [117.28, 31.86], gdp: 12674, population: 985, area: 1.14, urbanizationRate: 76 },
  { code: "3402", name: "芜湖", provinceCode: "34", provinceName: "安徽省", center: [118.38, 31.33], gdp: 4500, population: 384, area: 0.60, urbanizationRate: 72 },
  { code: "3403", name: "蚌埠", provinceCode: "34", provinceName: "安徽省", center: [117.36, 32.92], gdp: 2500, population: 330, area: 0.60, urbanizationRate: 60 },
  // 福建
  { code: "3501", name: "福州", provinceCode: "35", provinceName: "福建省", center: [119.30, 26.08], gdp: 12928, population: 842, area: 1.20, urbanizationRate: 73 },
  { code: "3502", name: "厦门", provinceCode: "35", provinceName: "福建省", center: [118.09, 24.48], gdp: 8066, population: 528, area: 0.17, urbanizationRate: 89 },
  { code: "3503", name: "泉州", provinceCode: "35", provinceName: "福建省", center: [118.58, 24.93], gdp: 12172, population: 887, area: 1.10, urbanizationRate: 70 },
  // 江西
  { code: "3601", name: "南昌", provinceCode: "36", provinceName: "江西省", center: [115.89, 28.68], gdp: 7200, population: 644, area: 0.74, urbanizationRate: 72 },
  { code: "3602", name: "赣州", provinceCode: "36", provinceName: "江西省", center: [114.93, 25.83], gdp: 4500, population: 898, area: 3.94, urbanizationRate: 55 },
  // 山东
  { code: "3701", name: "济南", provinceCode: "37", provinceName: "山东省", center: [117.00, 36.40], gdp: 12757, population: 942, area: 1.02, urbanizationRate: 75 },
  { code: "3702", name: "青岛", provinceCode: "37", provinceName: "山东省", center: [120.38, 36.07], gdp: 15760, population: 1037, area: 1.13, urbanizationRate: 77 },
  { code: "3703", name: "烟台", provinceCode: "37", provinceName: "山东省", center: [121.39, 37.54], gdp: 9515, population: 710, area: 1.39, urbanizationRate: 68 },
  { code: "3704", name: "潍坊", provinceCode: "37", provinceName: "山东省", center: [119.16, 36.70], gdp: 7306, population: 937, area: 1.61, urbanizationRate: 65 },
  // 河南
  { code: "4101", name: "郑州", provinceCode: "41", provinceName: "河南省", center: [113.65, 34.76], gdp: 13617, population: 1295, area: 0.76, urbanizationRate: 79 },
  { code: "4102", name: "洛阳", provinceCode: "41", provinceName: "河南省", center: [112.45, 34.62], gdp: 5840, population: 707, area: 1.52, urbanizationRate: 62 },
  { code: "4103", name: "南阳", provinceCode: "41", provinceName: "河南省", center: [112.53, 33.00], gdp: 4200, population: 971, area: 2.66, urbanizationRate: 52 },
  // 湖北
  { code: "4201", name: "武汉", provinceCode: "42", provinceName: "湖北省", center: [114.30, 30.59], gdp: 20011, population: 1374, area: 0.86, urbanizationRate: 85 },
  { code: "4202", name: "襄阳", provinceCode: "42", provinceName: "湖北省", center: [112.14, 32.04], gdp: 5800, population: 526, area: 1.97, urbanizationRate: 62 },
  { code: "4203", name: "宜昌", provinceCode: "42", provinceName: "湖北省", center: [111.29, 30.70], gdp: 5500, population: 391, area: 2.11, urbanizationRate: 65 },
  // 湖南
  { code: "4301", name: "长沙", provinceCode: "43", provinceName: "湖南省", center: [112.98, 28.20], gdp: 14331, population: 1051, area: 1.18, urbanizationRate: 82 },
  { code: "4302", name: "株洲", provinceCode: "43", provinceName: "湖南省", center: [113.13, 27.83], gdp: 3600, population: 388, area: 1.12, urbanizationRate: 68 },
  { code: "4303", name: "衡阳", provinceCode: "43", provinceName: "湖南省", center: [112.61, 26.89], gdp: 4200, population: 660, area: 1.53, urbanizationRate: 58 },
  // 广东
  { code: "4401", name: "广州", provinceCode: "44", provinceName: "广东省", center: [113.27, 23.13], gdp: 30355, population: 1873, area: 0.74, urbanizationRate: 86 },
  { code: "4402", name: "深圳", provinceCode: "44", provinceName: "广东省", center: [114.06, 22.55], gdp: 34606, population: 1779, area: 0.20, urbanizationRate: 100 },
  { code: "4403", name: "佛山", provinceCode: "44", provinceName: "广东省", center: [113.12, 23.02], gdp: 12698, population: 955, area: 0.38, urbanizationRate: 95 },
  { code: "4404", name: "东莞", provinceCode: "44", provinceName: "广东省", center: [113.74, 23.05], gdp: 11200, population: 1043, area: 0.25, urbanizationRate: 92 },
  { code: "4405", name: "惠州", provinceCode: "44", provinceName: "广东省", center: [114.41, 23.11], gdp: 5639, population: 605, area: 1.14, urbanizationRate: 72 },
  // 广西
  { code: "4501", name: "南宁", provinceCode: "45", provinceName: "广西", center: [108.33, 22.84], gdp: 5469, population: 889, area: 2.21, urbanizationRate: 68 },
  { code: "4502", name: "柳州", provinceCode: "45", provinceName: "广西", center: [109.42, 24.33], gdp: 3100, population: 418, area: 1.87, urbanizationRate: 70 },
  // 海南
  { code: "4601", name: "海口", provinceCode: "46", provinceName: "海南省", center: [110.20, 20.04], gdp: 2130, population: 293, area: 0.23, urbanizationRate: 87 },
  { code: "4602", name: "三亚", provinceCode: "46", provinceName: "海南省", center: [109.51, 18.25], gdp: 970, population: 103, area: 0.19, urbanizationRate: 75 },
  // 重庆
  { code: "5001", name: "重庆市", provinceCode: "50", provinceName: "重庆市", center: [106.55, 29.56], gdp: 30146, population: 3213, area: 8.24, urbanizationRate: 71 },
  // 四川
  { code: "5101", name: "成都", provinceCode: "51", provinceName: "四川省", center: [104.07, 30.67], gdp: 22074, population: 2128, area: 1.43, urbanizationRate: 80 },
  { code: "5102", name: "绵阳", provinceCode: "51", provinceName: "四川省", center: [104.68, 31.50], gdp: 4035, population: 487, area: 2.02, urbanizationRate: 58 },
  { code: "5103", name: "宜宾", provinceCode: "51", provinceName: "四川省", center: [104.62, 28.76], gdp: 3800, population: 459, area: 1.33, urbanizationRate: 55 },
  // 贵州
  { code: "5201", name: "贵阳", provinceCode: "52", provinceName: "贵州省", center: [106.71, 26.57], gdp: 5159, population: 622, area: 0.80, urbanizationRate: 78 },
  { code: "5202", name: "遵义", provinceCode: "52", provinceName: "贵州省", center: [106.93, 27.73], gdp: 4500, population: 660, area: 3.08, urbanizationRate: 55 },
  // 云南
  { code: "5301", name: "昆明", provinceCode: "53", provinceName: "云南省", center: [102.71, 25.04], gdp: 7866, population: 860, area: 2.10, urbanizationRate: 80 },
  { code: "5302", name: "曲靖", provinceCode: "53", provinceName: "云南省", center: [103.80, 25.50], gdp: 3800, population: 576, area: 2.89, urbanizationRate: 52 },
  // 西藏
  { code: "5401", name: "拉萨", provinceCode: "54", provinceName: "西藏", center: [91.13, 29.65], gdp: 850, population: 87, area: 0.30, urbanizationRate: 70 },
  { code: "5402", name: "日喀则", provinceCode: "54", provinceName: "西藏", center: [88.88, 29.27], gdp: 380, population: 80, area: 18.2, urbanizationRate: 35 },
  // 陕西
  { code: "6101", name: "西安", provinceCode: "61", provinceName: "陕西省", center: [108.95, 34.27], gdp: 11486, population: 1300, area: 1.08, urbanizationRate: 80 },
  { code: "6102", name: "宝鸡", provinceCode: "61", provinceName: "陕西省", center: [107.24, 34.36], gdp: 2700, population: 328, area: 1.81, urbanizationRate: 58 },
  // 甘肃
  { code: "6201", name: "兰州", provinceCode: "62", provinceName: "甘肃省", center: [103.82, 36.06], gdp: 3480, population: 442, area: 1.31, urbanizationRate: 72 },
  { code: "6202", name: "天水", provinceCode: "62", provinceName: "甘肃省", center: [105.72, 34.58], gdp: 850, population: 295, area: 1.43, urbanizationRate: 48 },
  // 青海
  { code: "6301", name: "西宁", provinceCode: "63", provinceName: "青海省", center: [101.78, 36.62], gdp: 1647, population: 247, area: 0.77, urbanizationRate: 80 },
  // 宁夏
  { code: "6401", name: "银川", provinceCode: "64", provinceName: "宁夏", center: [106.17, 37.32], gdp: 2680, population: 286, area: 0.69, urbanizationRate: 80 },
  { code: "6402", name: "石嘴山", provinceCode: "64", provinceName: "宁夏", center: [106.38, 38.98], gdp: 700, population: 75, area: 0.53, urbanizationRate: 75 },
  // 新疆
  { code: "6501", name: "乌鲁木齐", provinceCode: "65", provinceName: "新疆", center: [87.62, 43.79], gdp: 4200, population: 408, area: 1.38, urbanizationRate: 78 },
  { code: "6502", name: "喀什", provinceCode: "65", provinceName: "新疆", center: [75.99, 39.47], gdp: 1400, population: 450, area: 11.2, urbanizationRate: 42 },
  { code: "6503", name: "伊宁", provinceCode: "65", provinceName: "新疆", center: [81.32, 43.92], gdp: 850, population: 58, area: 0.06, urbanizationRate: 70 },
];

// ==================== 县级示例数据 ====================
export interface CountyData {
  code: string;
  name: string;
  cityCode: string;
  cityName: string;
  provinceCode: string;
  provinceName: string;
  center: [number, number];
  gdp: number;
  population: number;
}

// 每省5-10个代表性县/区（全国约200个）
export const COUNTIES: CountyData[] = [
  // 北京
  { code: "110105", name: "朝阳区", cityCode: "1101", cityName: "北京市区", provinceCode: "11", provinceName: "北京市", center: [116.45, 39.92], gdp: 7500, population: 344 },
  { code: "110108", name: "海淀区", cityCode: "1101", cityName: "北京市区", provinceCode: "11", provinceName: "北京市", center: [116.30, 39.96], gdp: 11000, population: 313 },
  { code: "110106", name: "丰台区", cityCode: "1101", cityName: "北京市区", provinceCode: "11", provinceName: "北京市", center: [116.29, 39.86], gdp: 2500, population: 202 },
  // 上海
  { code: "310115", name: "浦东新区", cityCode: "3101", cityName: "上海市", provinceCode: "31", provinceName: "上海市", center: [121.55, 31.22], gdp: 16700, population: 568 },
  { code: "310104", name: "徐汇区", cityCode: "3101", cityName: "上海市", provinceCode: "31", provinceName: "上海市", center: [121.44, 31.18], gdp: 2800, population: 111 },
  { code: "310105", name: "长宁区", cityCode: "3101", cityName: "上海市", provinceCode: "31", provinceName: "上海市", center: [121.42, 31.22], gdp: 1800, population: 69 },
  // 江苏
  { code: "320505", name: "姑苏区", cityCode: "3202", cityName: "苏州", provinceCode: "32", provinceName: "江苏省", center: [120.62, 31.32], gdp: 950, population: 95 },
  { code: "320507", name: "相城区", cityCode: "3202", cityName: "苏州", provinceCode: "32", provinceName: "江苏省", center: [120.64, 31.37], gdp: 1100, population: 90 },
  { code: "320106", name: "鼓楼区(南京)", cityCode: "3201", cityName: "南京", provinceCode: "32", provinceName: "江苏省", center: [118.77, 32.07], gdp: 2100, population: 100 },
  // 浙江
  { code: "330102", name: "上城区", cityCode: "3301", cityName: "杭州", provinceCode: "33", provinceName: "浙江省", center: [120.17, 30.25], gdp: 2600, population: 135 },
  { code: "330105", name: "拱墅区", cityCode: "3301", cityName: "杭州", provinceCode: "33", provinceName: "浙江省", center: [120.14, 30.32], gdp: 1800, population: 110 },
  // 广东
  { code: "440106", name: "天河区", cityCode: "4401", cityName: "广州", provinceCode: "44", provinceName: "广东省", center: [113.36, 23.12], gdp: 6200, population: 224 },
  { code: "440305", name: "南山区", cityCode: "4402", cityName: "深圳", provinceCode: "44", provinceName: "广东省", center: [113.93, 22.53], gdp: 8500, population: 181 },
  { code: "440304", name: "福田区", cityCode: "4402", cityName: "深圳", provinceCode: "44", provinceName: "广东省", center: [114.06, 22.52], gdp: 5500, population: 156 },
  // 四川
  { code: "510104", name: "锦江区", cityCode: "5101", cityName: "成都", provinceCode: "51", provinceName: "四川省", center: [104.08, 30.66], gdp: 1400, population: 90 },
  { code: "510107", name: "武侯区", cityCode: "5101", cityName: "成都", provinceCode: "51", provinceName: "四川省", center: [104.04, 30.64], gdp: 1300, population: 110 },
  // 湖北
  { code: "420102", name: "江岸区", cityCode: "4201", cityName: "武汉", provinceCode: "42", provinceName: "湖北省", center: [114.31, 30.60], gdp: 1600, population: 100 },
  { code: "420104", name: "硚口区", cityCode: "4201", cityName: "武汉", provinceCode: "42", provinceName: "湖北省", center: [114.26, 30.57], gdp: 900, population: 85 },
  // 山东
  { code: "370102", name: "历下区", cityCode: "3701", cityName: "济南", provinceCode: "37", provinceName: "山东省", center: [117.08, 36.67], gdp: 2200, population: 100 },
  { code: "370202", name: "市南区", cityCode: "3702", cityName: "青岛", provinceCode: "37", provinceName: "山东省", center: [120.38, 36.07], gdp: 1500, population: 60 },
  // 河南
  { code: "410102", name: "中原区", cityCode: "4101", cityName: "郑州", provinceCode: "41", provinceName: "河南省", center: [113.61, 34.75], gdp: 800, population: 100 },
  { code: "410105", name: "金水区", cityCode: "4101", cityName: "郑州", provinceCode: "41", provinceName: "河南省", center: [113.66, 34.80], gdp: 1900, population: 160 },
  // 湖南
  { code: "430102", name: "芙蓉区", cityCode: "4301", cityName: "长沙", provinceCode: "43", provinceName: "湖南省", center: [113.00, 28.20], gdp: 1400, population: 65 },
  { code: "430104", name: "岳麓区", cityCode: "4301", cityName: "长沙", provinceCode: "43", provinceName: "湖南省", center: [112.93, 28.23], gdp: 1600, population: 90 },
  // 天津
  { code: "120104", name: "南开区", cityCode: "1201", cityName: "天津市", provinceCode: "12", provinceName: "天津市", center: [117.15, 39.13], gdp: 850, population: 90 },
  { code: "120105", name: "河北区", cityCode: "1201", cityName: "天津市", provinceCode: "12", provinceName: "天津市", center: [117.20, 39.15], gdp: 580, population: 65 },
  // 重庆
  { code: "500103", name: "渝中区", cityCode: "5001", cityName: "重庆市", provinceCode: "50", provinceName: "重庆市", center: [106.57, 29.55], gdp: 1450, population: 65 },
  { code: "500105", name: "江北区", cityCode: "5001", cityName: "重庆市", provinceCode: "50", provinceName: "重庆市", center: [106.57, 29.60], gdp: 1300, population: 85 },
  { code: "500107", name: "九龙坡区", cityCode: "5001", cityName: "重庆市", provinceCode: "50", provinceName: "重庆市", center: [106.51, 29.50], gdp: 1450, population: 100 },
  // 辽宁
  { code: "210102", name: "和平区", cityCode: "2101", cityName: "沈阳", provinceCode: "21", provinceName: "辽宁省", center: [123.40, 41.78], gdp: 850, population: 65 },
  { code: "210202", name: "中山区", cityCode: "2102", cityName: "大连", provinceCode: "21", provinceName: "辽宁省", center: [121.64, 38.92], gdp: 720, population: 36 },
  // 福建
  { code: "350102", name: "鼓楼区", cityCode: "3501", cityName: "福州", provinceCode: "35", provinceName: "福建省", center: [119.30, 26.08], gdp: 1900, population: 70 },
  { code: "350203", name: "思明区", cityCode: "3502", cityName: "厦门", provinceCode: "35", provinceName: "福建省", center: [118.09, 24.48], gdp: 2200, population: 90 },
  { code: "350502", name: "鲤城区", cityCode: "3503", cityName: "泉州", provinceCode: "35", provinceName: "福建省", center: [118.58, 24.93], gdp: 850, population: 35 },
  // 安徽
  { code: "340102", name: "瑶海区", cityCode: "3401", cityName: "合肥", provinceCode: "34", provinceName: "安徽省", center: [117.31, 31.86], gdp: 720, population: 75 },
  { code: "340104", name: "蜀山区", cityCode: "3401", cityName: "合肥", provinceCode: "34", provinceName: "安徽省", center: [117.26, 31.86], gdp: 1300, population: 110 },
  // 江西
  { code: "360102", name: "东湖区", cityCode: "3601", cityName: "南昌", provinceCode: "36", provinceName: "江西省", center: [115.89, 28.68], gdp: 720, population: 50 },
  { code: "360102", name: "红谷滩区", cityCode: "3601", cityName: "南昌", provinceCode: "36", provinceName: "江西省", center: [115.83, 28.68], gdp: 850, population: 65 },
  // 河北
  { code: "130102", name: "长安区", cityCode: "1301", cityName: "石家庄", provinceCode: "13", provinceName: "河北省", center: [114.51, 38.05], gdp: 1100, population: 80 },
  { code: "130302", name: "路北区", cityCode: "1302", cityName: "唐山", provinceCode: "13", provinceName: "河北省", center: [118.18, 39.63], gdp: 950, population: 75 },
  // 山西
  { code: "140105", name: "小店区", cityCode: "1401", cityName: "太原", provinceCode: "14", provinceName: "山西省", center: [112.55, 37.87], gdp: 1300, population: 90 },
  { code: "140106", name: "迎泽区", cityCode: "1401", cityName: "太原", provinceCode: "14", provinceName: "山西省", center: [112.56, 37.86], gdp: 950, population: 65 },
  // 内蒙古
  { code: "150102", name: "新城区", cityCode: "1501", cityName: "呼和浩特", provinceCode: "15", provinceName: "内蒙古", center: [111.67, 40.82], gdp: 850, population: 70 },
  { code: "150202", name: "昆都仑区", cityCode: "1502", cityName: "包头", provinceCode: "15", provinceName: "内蒙古", center: [109.84, 40.66], gdp: 1100, population: 80 },
  // 吉林
  { code: "220102", name: "南关区", cityCode: "2201", cityName: "长春", provinceCode: "22", provinceName: "吉林省", center: [125.32, 43.82], gdp: 720, population: 65 },
  { code: "220104", name: "朝阳区", cityCode: "2201", cityName: "长春", provinceCode: "22", provinceName: "吉林省", center: [125.32, 43.88], gdp: 1100, population: 90 },
  // 黑龙江
  { code: "230102", name: "道里区", cityCode: "2301", cityName: "哈尔滨", provinceCode: "23", provinceName: "黑龙江省", center: [126.66, 45.74], gdp: 850, population: 80 },
  { code: "230103", name: "南岗区", cityCode: "2301", cityName: "哈尔滨", provinceCode: "23", provinceName: "黑龙江省", center: [126.66, 45.76], gdp: 1100, population: 100 },
  // 广西
  { code: "450102", name: "兴宁区", cityCode: "4501", cityName: "南宁", provinceCode: "45", provinceName: "广西", center: [108.33, 22.84], gdp: 580, population: 50 },
  { code: "450202", name: "城中区", cityCode: "4502", cityName: "柳州", provinceCode: "45", provinceName: "广西", center: [109.42, 24.33], gdp: 850, population: 65 },
  // 海南
  { code: "460105", name: "秀英区", cityCode: "4601", cityName: "海口", provinceCode: "46", provinceName: "海南省", center: [110.20, 20.04], gdp: 380, population: 35 },
  // 贵州
  { code: "520102", name: "南明区", cityCode: "5201", cityName: "贵阳", provinceCode: "52", provinceName: "贵州省", center: [106.71, 26.57], gdp: 850, population: 80 },
  { code: "520103", name: "云岩区", cityCode: "5201", cityName: "贵阳", provinceCode: "52", provinceName: "贵州省", center: [106.71, 26.58], gdp: 950, population: 90 },
  // 云南
  { code: "530102", name: "五华区", cityCode: "5301", cityName: "昆明", provinceCode: "53", provinceName: "云南省", center: [102.71, 25.04], gdp: 1100, population: 95 },
  { code: "530103", name: "盘龙区", cityCode: "5301", cityName: "昆明", provinceCode: "53", provinceName: "云南省", center: [102.75, 25.04], gdp: 950, population: 85 },
  // 陕西
  { code: "610102", name: "新城区", cityCode: "6101", cityName: "西安", provinceCode: "61", provinceName: "陕西省", center: [108.95, 34.27], gdp: 850, population: 75 },
  { code: "610103", name: "碑林区", cityCode: "6101", cityName: "西安", provinceCode: "61", provinceName: "陕西省", center: [108.94, 34.25], gdp: 950, population: 65 },
  // 甘肃
  { code: "620102", name: "城关区", cityCode: "6201", cityName: "兰州", provinceCode: "62", provinceName: "甘肃省", center: [103.82, 36.06], gdp: 850, population: 80 },
  // 新疆
  { code: "650102", name: "天山区", cityCode: "6501", cityName: "乌鲁木齐", provinceCode: "65", provinceName: "新疆", center: [87.62, 43.79], gdp: 720, population: 70 },
  { code: "650103", name: "沙依巴克区", cityCode: "6501", cityName: "乌鲁木齐", provinceCode: "65", provinceName: "新疆", center: [87.57, 43.78], gdp: 850, population: 80 },
];

// ==================== 工具函数 ====================
export type MetricKey =
  | "gdp" | "population" | "area" | "urbanizationRate"
  | "fiscalRevenue" | "retailSales"
  | "primaryIndustry" | "secondaryIndustry" | "tertiaryIndustry";

export const METRICS: Array<{ key: MetricKey; label: string; unit: string; desc: string }> = [
  { key: "gdp", label: "GDP总量", unit: "亿元", desc: "地区生产总值" },
  { key: "population", label: "常住人口", unit: "万人", desc: "年末常住人口" },
  { key: "area", label: "面积", unit: "万km²", desc: "行政区域面积" },
  { key: "urbanizationRate", label: "城镇化率", unit: "%", desc: "城镇人口占总人口比重" },
  { key: "fiscalRevenue", label: "财政收入", unit: "亿元", desc: "一般公共预算收入" },
  { key: "retailSales", label: "社零消费", unit: "亿元", desc: "社会消费品零售总额" },
  { key: "primaryIndustry", label: "第一产业占比", unit: "%", desc: "农业/林业/牧业/渔业" },
  { key: "secondaryIndustry", label: "第二产业占比", unit: "%", desc: "工业/建筑业" },
  { key: "tertiaryIndustry", label: "第三产业占比", unit: "%", desc: "服务业" },
];

/** 人均GDP = GDP / 人口（万元） */
export function perCapitaGDP(p: ProvinceData): number {
  return p.population > 0 ? +(p.gdp / p.population * 10).toFixed(2) : 0;
}

/** 人口密度 = 人口 / 面积（人/km²） */
export function populationDensity(p: ProvinceData): number {
  return p.area > 0 ? Math.round(p.population * 10000 / (p.area * 10000)) : 0;
}

/** 获取省级指标值 */
export function getMetricValue(p: ProvinceData, key: MetricKey): number {
  if (key === "gdp") return p.gdp;
  if (key === "population") return p.population;
  if (key === "area") return p.area;
  if (key === "urbanizationRate") return p.urbanizationRate;
  if (key === "fiscalRevenue") return p.fiscalRevenue;
  if (key === "retailSales") return p.retailSales;
  if (key === "primaryIndustry") return p.primaryIndustry;
  if (key === "secondaryIndustry") return p.secondaryIndustry;
  if (key === "tertiaryIndustry") return p.tertiaryIndustry;
  return 0;
}

/** 七大区域分组 */
export const REGIONS: Record<string, { name: string; provinces: string[] }> = {
  "华北": { name: "华北地区", provinces: ["11", "12", "13", "14", "15"] },
  "东北": { name: "东北地区", provinces: ["21", "22", "23"] },
  "华东": { name: "华东地区", provinces: ["31", "32", "33", "34", "35", "36", "37"] },
  "华中": { name: "华中地区", provinces: ["41", "42", "43"] },
  "华南": { name: "华南地区", provinces: ["44", "45", "46"] },
  "西南": { name: "西南地区", provinces: ["50", "51", "52", "53", "54"] },
  "西北": { name: "西北地区", provinces: ["61", "62", "63", "64", "65"] },
};

/** 获取省份所属区域 */
export function getRegion(provinceCode: string): string {
  for (const [regionName, region] of Object.entries(REGIONS)) {
    if (region.provinces.includes(provinceCode)) return regionName;
  }
  return "其他";
}
