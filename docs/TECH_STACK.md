# Wadez.asia 技术栈与架构文档

## 一、项目定位

**Wadez.asia** - 中国城市间公共交通出行查询平台
- **核心功能**: 纯公交出行方案查询(拒绝高铁/航班)
- **数据范围**: 54个主要城市,覆盖市内公交+城际大巴
- **用户体验**: 离线优先、秒级响应、无广告干扰

---

## 二、技术栈总览

### 前端技术栈
| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|---------|
| **Next.js** | 16.2.11 | 全栈框架 | App Router + Turbopack,支持SSR/SSG |
| **React** | 19.2.4 | UI库 | 最新版,并发渲染优化 |
| **TypeScript** | 5.x | 类型系统 | 强类型,减少运行时错误 |
| **Tailwind CSS** | v4 | 样式方案 | JIT编译,体积小,开发快 |
| **高德地图 JS API** | 2.0 | 地图渲染 | 国内最成熟的地图SDK |

### 后端技术栈
| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|---------|
| **Supabase** | - | BaaS平台 | PostgreSQL + Auth + Storage,快速开发 |
| **Vercel** | - | 部署平台 | Edge Functions + CDN + 零配置部署 |
| **Node.js** | 22.x | 运行时 | 服务端脚本执行环境 |

### 数据获取技术栈
| 技术 | 用途 | 说明 |
|------|------|------|
| **政府开放数据平台API** | **主数据源** | 北京/上海/山东等公交官方数据 |
| **接口盒子API** | **辅助数据源** | 免费无限制,全国公交线路 |
| **高德地图 Web Service** | 地理编码/路径规划 | 坐标转换,距离计算 |
| **腾讯地图 Web Service** | 备用数据源 | POI搜索,双源校验 |

---

## 三、数据源架构(核心)

### 3.1 政府开放数据平台(主数据源)

#### 北京市公交站点信息
- **数据量**: 76283条记录
- **字段**: 线路名称、方向、站点序号、站点名称
- **API**: `https://data.beijing.gov.cn/cms/web/bjdata/api/dataDoc.jsp?contentID=17453`
- **认证**: 个人唯一标识码(用户中心获取)
- **格式**: JSON/CSV/XLSX
- **更新频率**: 年度(2026-01-26最后更新)
- **开放条件**: **无条件开放**

**使用方法**:
```typescript
// 1. 注册账号获取唯一标识码
// https://data.beijing.gov.cn

// 2. 下载完整数据
const response = await fetch(
  'https://data.beijing.gov.cn/cms/web/bjdata/api/userApply.jsp' +
  '?id=a12812ba8132448184fc5c2599bc3b7d35261' +
  '&key=YOUR_UNIQUE_ID'
);

// 3. 解析并存储到本地
const data = await response.json();
// data格式: [{线路名称, 方向, 站点序号, 站点名称}, ...]
```

#### 上海市公交设施数据
- **数据量**: 3364次调用
- **字段**: 线路基础信息、起讫点、线路长度、停靠站点、运营时间
- **API**: 上海市政府数据开放平台
- **开放条件**: 有条件开放(需申请)

#### 山东省实时公交信息
- **覆盖城市**: 济南、青岛、枣庄、东营、烟台、潍坊、济宁、泰安、日照、滨州、德州、聊城、临沂、菏泽、威海
- **数据格式**: JSON/CSV/XML
- **开放条件**: **无条件开放**
- **下载**: [山东省实时公交信息.csv](https://data.sd.gov.cn/portal/catalog/1c17c57b50e547639cc3c7050fc439df)

### 3.2 接口盒子API(辅助数据源)

**特点**:
- ✅ **免费无限制**: 无日调用上限
- ✅ **覆盖全国**: 含地铁、磁悬浮
- ✅ **数据权威**: 官方数据源
- ✅ **双请求支持**: GET/POST均可用

**接口地址**: `https://cn.apihz.cn/api/jiaotong/gongjiao2.php`

**使用示例**:
```typescript
// 需注册获取id和key
const params = {
  id: '10000000',     // 用户中心数字ID
  key: 'your_key',    // 32位通讯秘钥
  uuid: '23212',      // 线路UUID
  type: '0'           // 0=简略, 1=含坐标
};

const response = await fetch(
  'https://cn.apihz.cn/api/jiaotong/gongjiao2.php?' +
  new URLSearchParams(params)
);

const data = await response.json();
// 返回30+字段: 线路名称、途径站点、票价、运营时间等
```

**返回字段**(部分):
- 线路名称、运营公司
- 途径站点数组(含名称/UUID/经纬度)
- 计费模式、全程票价
- 线路长度、首末班车时间
- 是否双向、发车间隔

### 3.3 高德地图API(地理计算)

**用途**:
- 地理编码: 地址→坐标
- 路径规划: 公交换乘方案
- 距离矩阵: 批量距离计算
- 实时路况: 拥堵指数

**限流策略**:
- 个人版: 3000-5000次/Key/日
- 10个Key轮询: 单Key 600次/分钟
- 请求间隔: 1秒(安全值)

### 3.4 数据源优先级

```
优先级1: 政府开放数据平台(最权威、最完整)
   ↓ (数据缺失时)
优先级2: 接口盒子API(免费无限制)
   ↓ (需要实时计算时)
优先级3: 高德地图API(地理编码/路径规划)
   ↓ (备用校验)
优先级4: 腾讯地图API(双源对比防伪)
```

---

## 四、数据架构设计

### 4.1 数据存储结构

```
src/lib/
├── bus-data-official/        # 政府数据(主)
│   ├── beijing/
│   │   ├── stations.json     # 76283个站点
│   │   ├── lines.json        # 线路汇总
│   │   └── metadata.json     # 元数据
│   ├── shanghai/
│   ├── shandong/
│   └── index.ts              # 统一导出
│
├── bus-data-apihz/           # 接口盒子数据(辅)
│   ├── beijing/
│   │   ├── lines-detail.json # 线路详情
│   │   └── stops-coords.json # 站点坐标
│   └── index.ts
│
├── bus-data-merged/          # 合并数据(对外)
│   └── [city]/
│       ├── lines.ts          # 最终线路数据
│       ├── stops.ts          # 最终站点数据
│       └── report.json       # 数据质量报告
│
└── intercity-bus-data.ts     # 城际大巴(已有)
```

### 4.2 数据模型

#### 站点数据
```typescript
interface BusStation {
  id: string;          // 站点唯一ID
  name: string;        // 站点名称
  city: string;        // 所属城市
  location: {          // 经纬度
    lat: number;
    lng: number;
  };
  lines: string[];     // 途经线路列表
  adcode?: string;     // 行政区码
}
```

#### 线路数据
```typescript
interface BusLine {
  id: string;              // 线路唯一ID
  name: string;            // 线路名称
  city: string;            // 所属城市
  type: 'city' | 'suburban' | 'night' | 'express' | 'BRT';

  // 站点信息
  stations: {
    up: string[];          // 上行站点列表
    down: string[];        // 下行站点列表
  };

  // 运营信息
  operator?: string;       // 运营公司
  distance: number;        // 线路长度(米)
  duration: number;        // 运行时长(分钟)

  // 票价信息
  price: {
    type: 'flat' | 'distance' | 'section';
    value: number;         // 单位: 分
    description?: string;
  };

  // 运营时间
  schedule: {
    first: string;         // 首班车 "05:30"
    last: string;          // 末班车 "22:00"
    interval?: number;     // 发车间隔(分钟)
  };

  // 数据来源
  source: 'official' | 'apihz' | 'amap';
  lastUpdate: string;      // ISO时间戳
  quality: 'trusted' | 'suspect' | 'rejected';
}
```

---

## 五、数据获取流程

### 5.1 政府数据获取流程

```
[用户注册账号] → [申请API Key] → [下载完整数据] → [本地解析] → [存储为JSON]
      ↓               ↓               ↓              ↓             ↓
  data.beijing   个人中心获取     userApply.jsp   parseJSON()   writeFileSync
```

**实施步骤**:

#### Step 1: 注册北京数据平台账号
```bash
访问: https://data.beijing.gov.cn
注册 → 登录 → 用户中心 → 获取唯一标识码
```

#### Step 2: 下载北京公交站点数据
```typescript
// scripts/fetch-official-data.ts
import fs from 'fs';

const BEIJING_DATA_ID = 'a12812ba8132448184fc5c2599bc3b7d35261';
const USER_KEY = process.env.BEIJING_DATA_KEY;

async function fetchBeijingBusData() {
  const url = `https://data.beijing.gov.cn/cms/web/bjdata/api/userApply.jsp?id=${BEIJING_DATA_ID}&key=${USER_KEY}`;

  console.log('📥 正在下载北京公交站点数据...');
  const response = await fetch(url);
  const data = await response.json();

  // 数据格式: [{线路名称, 方向, 站点序号, 站点名称}, ...]
  console.log(`✅ 获取 ${data.length} 条记录`);

  // 按线路分组
  const lineMap = new Map<string, any[]>();
  data.forEach((item: any) => {
    const lineName = item['线路名称'];
    if (!lineMap.has(lineName)) {
      lineMap.set(lineName, []);
    }
    lineMap.get(lineName)!.push(item);
  });

  // 转换为我们的数据格式
  const lines = Array.from(lineMap.entries()).map(([name, stations]) => ({
    name,
    city: '北京',
    stations: {
      up: stations.filter(s => s['方向'] === '上行').map(s => s['站点名称']),
      down: stations.filter(s => s['方向'] === '下行').map(s => s['站点名称'])
    },
    source: 'official',
    lastUpdate: new Date().toISOString(),
    quality: 'trusted'
  }));

  // 写入文件
  fs.writeFileSync(
    'src/lib/bus-data-official/beijing/stations.json',
    JSON.stringify(data, null, 2)
  );
  fs.writeFileSync(
    'src/lib/bus-data-official/beijing/lines.json',
    JSON.stringify(lines, null, 2)
  );

  console.log(`✅ 已保存 ${lines.length} 条线路`);
}

fetchBeijingBusData();
```

#### Step 3: 批量下载其他城市数据
```typescript
// scripts/batch-fetch-official.ts
const CITIES = [
  { name: '北京', platform: 'https://data.beijing.gov.cn', dataId: '...' },
  { name: '上海', platform: 'https://data.sh.gov.cn', dataId: '...' },
  { name: '山东', platform: 'https://data.sd.gov.cn', dataId: '...' },
];

for (const city of CITIES) {
  await fetchCityData(city);
  await sleep(3000); // 避免请求过快
}
```

### 5.2 接口盒子API获取流程

```typescript
// scripts/fetch-apihz-data.ts
import axios from 'axios';

const APIHZ_BASE = 'https://cn.apihz.cn/api/jiaotong/gongjiao2.php';
const APIHZ_ID = process.env.APIHZ_ID;
const APIHZ_KEY = process.env.APIHZ_KEY;

async function fetchLineDetail(uuid: string) {
  const response = await axios.get(APIHZ_BASE, {
    params: {
      id: APIHZ_ID,
      key: APIHZ_KEY,
      uuid: uuid,
      type: 1 // 返回详细坐标
    }
  });

  if (response.data.code === 200) {
    return {
      name: response.data.linename,
      stations: response.data.station.map((s: any) => ({
        name: s.name,
        location: { lat: s.lat, lng: s.lng }
      })),
      price: {
        type: response.data.ticketcal,
        value: response.data.totalprice
      },
      schedule: {
        first: response.data.starttime,
        last: response.data.endtime
      },
      distance: response.data.length,
      operator: response.data.company
    };
  }

  throw new Error(response.data.msg);
}
```

---

## 六、数据处理流程

### 6.1 数据合并去重

```typescript
// scripts/merge-bus-data.ts
import officialData from '@/lib/bus-data-official';
import apihzData from '@/lib/bus-data-apihz';

function mergeBusData(city: string) {
  const official = officialData[city] || [];
  const apihz = apihzData[city] || [];

  const merged = new Map<string, BusLine>();

  // 优先使用政府数据(权威)
  official.forEach(line => {
    merged.set(line.name, {
      ...line,
      quality: 'trusted'
    });
  });

  // 补全接口盒子数据
  apihz.forEach(line => {
    if (!merged.has(line.name)) {
      merged.set(line.name, line);
    } else {
      // 合并字段(政府数据缺失时用接口盒子补全)
      const existing = merged.get(line.name)!;
      if (!existing.stations.up.length && line.stations.up.length) {
        existing.stations = line.stations;
      }
    }
  });

  return Array.from(merged.values());
}
```

### 6.2 数据校验

```typescript
function validateBusLine(line: BusLine): boolean {
  // 必填字段检查
  if (!line.name || !line.city) return false;
  if (!line.stations.up.length && !line.stations.down.length) return false;

  // 物理合理性检查
  if (line.distance > 0 && (line.distance < 1000 || line.distance > 100000)) {
    console.warn(`⚠️ ${line.name} 距离异常: ${line.distance}m`);
    line.quality = 'suspect';
  }

  if (line.price.value > 10000) { // 超过100元
    console.warn(`⚠️ ${line.name} 票价异常: ${line.price.value}分`);
    line.quality = 'suspect';
  }

  return true;
}
```

---

## 七、前端架构

### 7.1 目录结构

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # 根布局
│   ├── page.tsx              # 首页
│   ├── routes/page.tsx       # 线路查询页
│   ├── data/page.tsx         # 数据浏览页
│   └── api/                  # API路由
│       ├── routes/route.ts   # 线路查询API
│       └── data-status/route.ts
│
├── components/               # 组件库
│   ├── MapPage.tsx           # 地图主页面
│   ├── LineMarquee.tsx       # 线路滚动展示
│   ├── CitySelector.tsx      # 城市选择器
│   └── RouteCard.tsx         # 线路卡片
│
├── lib/                      # 核心库
│   ├── bus-data-merged/      # 最终数据
│   ├── intercity-bus-data.ts # 城际数据
│   └── route-cache.ts        # 缓存管理
│
└── styles/                   # 样式文件
    └── globals.css           # 全局样式
```

### 7.2 数据流

```
[用户访问] → [Next.js SSG] → [加载静态JSON] → [前端渲染]
     ↓            ↓               ↓              ↓
  /routes     getStaticProps  fs.readFileSync  React组件
```

**离线优先原则**:
- 所有数据预先下载为JSON
- 构建时打包进 `/public` 目录
- 运行时直接读取本地文件
- 无API调用延迟

---

## 八、部署架构

### 8.1 Vercel部署

```yaml
# vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["hkg1"],  # 香港节点,服务亚洲
  "functions": {
    "src/app/api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

### 8.2 CDN缓存策略

```
静态数据(线路/站点):
  Cache-Control: public, max-age=31536000, immutable

动态查询(路径规划):
  Cache-Control: public, max-age=3600, s-maxage=86400

实时数据(公交到站):
  Cache-Control: no-cache
```

---

## 九、监控与运维

### 9.1 数据质量监控

```typescript
// src/app/api/data-quality/route.ts
export async function GET() {
  const cities = ['北京', '上海', '广州'];

  const report = await Promise.all(cities.map(async (city) => {
    const data = await import(`@/lib/bus-data-merged/${city}/lines.json`);

    return {
      city,
      total: data.length,
      trusted: data.filter(d => d.quality === 'trusted').length,
      suspect: data.filter(d => d.quality === 'suspect').length,
      coverage: calculateCoverage(data)
    };
  }));

  return Response.json(report);
}
```

### 9.2 性能指标

| 指标 | 目标值 | 监控方式 |
|------|--------|---------|
| 首屏加载时间 | < 2s | Vercel Analytics |
| 线路查询响应 | < 100ms | 本地JSON读取 |
| 数据完整率 | > 95% | 定期脚本校验 |
| API可用性 | > 99.9% | Vercel监控 |

---

## 十、安全与合规

### 10.1 API Key管理

```typescript
// .env.local (不提交Git)
BEIJING_DATA_KEY=your_beijing_key
SHANGHAI_DATA_KEY=your_shanghai_key
APIHZ_ID=your_apihz_id
APIHZ_KEY=your_apihz_key

// 环境变量使用
const key = process.env.BEIJING_DATA_KEY;
if (!key) {
  throw new Error('请配置 BEIJING_DATA_KEY');
}
```

### 10.2 数据使用协议

- 政府数据: 遵循各平台开放协议
- 接口盒子: 免费使用,禁止转售
- 高德API: 个人开发者协议
- 腾讯API: 同上

---

## 十一、技术栈优势总结

### 11.1 政府数据 vs 商业API

| 维度 | 政府数据 | 商业API |
|------|---------|---------|
| 数据完整性 | ✅ 100%覆盖 | ❌ 依赖关键词查询 |
| 数据权威性 | ✅ 官方发布 | ⚠️ 聚合数据 |
| 获取成本 | ✅ 免费 | ❌ 按次收费 |
| 更新频率 | ⚠️ 年度更新 | ✅ 实时 |
| 使用限制 | ✅ 无限制 | ❌ 每日配额 |

### 11.2 为什么选择Next.js?

1. **SSG支持**: 静态数据预构建,CDN缓存
2. **App Router**: 文件系统路由,开发高效
3. **Turbopack**: 快速HMR,开发体验好
4. **Edge Functions**: API路由边缘计算
5. **Vercel集成**: 零配置部署

### 11.3 为什么离线优先?

1. **性能**: 本地读取<10ms,API请求>500ms
2. **稳定**: 无单点故障,API宕机不影响
3. **成本**: 零API调用费用
4. **合规**: 避免商业API限制

---

## 十二、后续演进路线

### v2.0 - 实时数据接入
- 接入北京公交实时到站API
- 地铁延误信息推送
- 拥堵指数可视化

### v3.0 - 用户系统
- Supabase Auth认证
- 收藏线路功能
- 个性化推荐

### v4.0 - 智能规划
- AI路径推荐
- 多模式出行对比
- 碳排放计算

---

**文档版本**: v1.0
**最后更新**: 2026-07-27
**维护者**: Wade