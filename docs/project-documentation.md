# Wadez.asia 项目文档

## 一、项目概述

### 1.1 项目定位
公共交通地图平台，提供中国主要城市间的公共交通线路查询服务。

### 1.2 核心目标
- 展示城市间公共交通线路（公交车、城际巴士、高铁、飞机）
- 地图上绘制点对点的公交路线轨迹
- 支持城市选择和线路筛选
- 提供精准的线路信息卡片展示

### 1.3 项目状态
- **当前版本**: 开发中
- **部署状态**: 已部署到 Vercel
- **域名**: wadez.asia（阿里云注册，一年内到期）

---

## 二、技术栈

### 2.1 前端框架
- **框架**: Next.js 16.2.11（App Router）
- **语言**: TypeScript
- **样式**: Tailwind CSS 3
- **地图**: 高德地图 JS API 2.0

### 2.2 后端服务
- **数据库**: Supabase（PostgreSQL + PostGIS）
- **认证**: Supabase Auth
- **存储**: Supabase Storage

### 2.3 部署平台
- **托管**: Vercel（香港区域 hkg1）
- **代码仓库**: GitHub

---

## 三、需求详细说明

### 3.1 首页需求

#### 3.1.1 地图展示
- 显示高德地图，默认缩放级别为5
- 点击线路卡片后，地图自动绘制公交路线轨迹
- 起点标记为绿色，终点标记为红色
- 路线折线为蓝色

#### 3.1.2 底部卡片栏（替换原POI筛选栏）
- **城市选择器**: 可选择出发城市和到达城市（50个中国主要城市）
- **交通方式标签**:
  - 🚌 市内公交（第一优先级）
  - 🚐 城际公交（第二优先级）
- **线路卡片**: 展示线路名称、站点、票价、时长、标签

### 3.2 线路查询页面（/routes）
- 城市选择器（出发/到达）
- 筛选标签（全部/火车/巴士/飞机）
- 线路结果展示
- 热门线路快捷选择
- 线路详情展开

### 3.3 交通方式优先级
| 优先级 | 交通方式 | 说明 |
|--------|----------|------|
| 1 | 🚌 市内公交 | 城市内部公共交通 |
| 2 | 🚐 城际公交 | 跨城市交通（高铁/长途巴士） |
| 3 | 🚄 高铁/火车 | 快速城际交通 |
| 4 | ✈️ 飞机 | 远距离交通 |

---

## 四、数据结构

### 4.1 城市数据（City）
```typescript
interface City {
  id: string;           // 城市唯一标识
  name: string;         // 城市名称（如：北京）
  province: string;     // 所属省份（如：北京市）
}
```

### 4.2 线路分段（RouteSegment）
```typescript
interface RouteSegment {
  type: "train" | "bus" | "metro" | "flight";  // 交通类型
  from: string;         // 出发站点
  to: string;           // 到达站点
  departure: string;    // 发车时间
  arrival: string;      // 到达时间
  duration: string;     // 历时
  name: string;         // 线路名称/车次
  price: string;        // 票价
}
```

### 4.3 线路数据（TransitRoute）
```typescript
interface TransitRoute {
  id: string;           // 线路唯一标识
  fromCity: string;     // 出发城市
  toCity: string;       // 到达城市
  type: "direct" | "transfer";  // 直达/换乘
  segments: RouteSegment[];  // 分段信息
  totalDuration: string;     // 总时长
  totalPrice: string;        // 总票价
  tags: string[];            // 标签（如：最快、经济）
}
```

### 4.4 POI数据（POI）
```typescript
interface POI {
  id: string;
  name: string;
  category: POICategory;  // bus_stop | subway | train_station | bus_terminal | airport | ferry | tram | other
  description: string | null;
  address: string | null;
  longitude: number;
  latitude: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}
```

---

## 五、功能模块

### 5.1 首页地图模块
- 文件: `src/components/MapView.tsx`
- 功能:
  - 初始化高德地图
  - 渲染POI标记
  - 绘制路线轨迹（使用AMap.Transfer插件）
  - 响应式地图交互

### 5.2 线路卡片栏模块
- 文件: `src/components/RouteCardBar.tsx`
- 功能:
  - 城市选择器
  - 交通方式切换
  - 线路卡片展示
  - 线路选择事件

### 5.3 线路数据模块
- 文件: `src/lib/route-data.ts`
- 功能:
  - 城市列表（50个中国主要城市）
  - 线路数据（30+条模拟线路）
  - 图标和标签配置

### 5.4 POI管理模块
- 文件: `src/components/POIPanel.tsx`, `src/components/POIDetail.tsx`
- 功能:
  - 添加POI
  - 编辑POI
  - 删除POI
  - 上传图片

### 5.5 认证模块
- 文件: `src/components/LoginForm.tsx`, `src/app/auth/callback/route.ts`
- 功能:
  - 邮箱注册/登录
  - 认证回调
  - 用户状态管理

---

## 六、应急预案

### 6.1 域名到期预案

| 方案 | 说明 | 操作步骤 |
|------|------|----------|
| 预案A | 不续费，使用Vercel子域名 | 更新DNS解析，使用 `*.vercel.app` 域名 |
| 预案B | 更换新域名 | 购买新域名，更新DNS和Vercel配置 |
| 预案C | 续费保留 | 在阿里云续费域名 |

### 6.2 GitHub不稳定预案

| 方案 | 说明 | 操作步骤 |
|------|------|----------|
| 预案D | PAT令牌认证（推荐） | 使用HTTPS + PAT令牌连接GitHub |
| 预案E | 使用代理 | 通过代理服务器访问GitHub |
| 预案F | 切换到Gitee | 将代码迁移到Gitee仓库 |
| 预案G | Vercel CLI部署 | 直接使用 `vercel --prod` 部署 |

**GitHub PAT令牌**: 已在 GitHub 后台单独保存（仅限本账号使用，90天有效，到期需重新生成）。如需配置 git remote，向用户当面索取，勿写入任何文件。

### 6.3 Supabase配置问题
- 当前问题: 免费项目已达上限（2个）
- 解决方案:
  - 删除或暂停旧项目
  - 升级到Pro计划（$20/月）
  - 使用环境变量占位符，未配置时优雅降级

### 6.4 Vercel部署限制
- 每日部署限制: 100次/天（Hobby计划）
- 策略:
  - 批量修改后一次性推送
  - 推送前确认用户同意
  - 使用Vercel CLI绕过GitHub

---

## 七、环境变量

### 7.1 前端环境变量
```env
# 高德地图
NEXT_PUBLIC_AMAP_KEY=your-amap-key
NEXT_PUBLIC_AMAP_SECURITY_CODE=your-amap-security-code

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# 应用配置
NEXT_PUBLIC_APP_URL=https://wadez.asia
```

### 7.2 Vercel环境变量（已配置）
- NEXT_PUBLIC_APP_URL
- NEXT_PUBLIC_AMAP_SECURITY_CODE
- NEXT_PUBLIC_AMAP_KEY

---

## 八、项目文件结构

```
wadez-asia/
├── src/
│   ├── app/
│   │   ├── api/           # API路由
│   │   │   ├── poi/       # POI相关API
│   │   │   └── upload/    # 文件上传API
│   │   ├── auth/          # 认证回调
│   │   ├── login/         # 登录页面
│   │   ├── routes/        # 线路查询页面
│   │   ├── page.tsx       # 首页
│   │   └── globals.css    # 全局样式
│   ├── components/        # React组件
│   │   ├── Header.tsx     # 头部导航
│   │   ├── MapView.tsx    # 地图视图
│   │   ├── MapPage.tsx    # 地图页面容器
│   │   ├── RouteCardBar.tsx # 线路卡片栏
│   │   ├── POIPanel.tsx   # POI面板
│   │   ├── POIDetail.tsx  # POI详情
│   │   └── LoginForm.tsx  # 登录表单
│   ├── lib/               # 工具库
│   │   ├── route-data.ts  # 线路数据
│   │   ├── types.ts       # 类型定义
│   │   └── supabase/      # Supabase客户端
│   └── proxy.ts           # 中间件
├── docs/
│   ├── contingency-plan.md # 应急预案
│   └── project-documentation.md # 项目文档
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── .env.local
```

---

## 九、开发流程

### 9.1 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建验证
npm run build
```

### 9.2 部署流程
1. 本地开发完成
2. 运行 `npm run build` 验证构建
3. 向用户确认推送
4. `git add .` → `git commit -m "message"` → `git push origin main`
5. Vercel自动触发部署

---

## 十、对话记录摘要

### 10.1 第一轮对话
- 分析项目结构和GitHub链接
- 确认域名到期问题，制定应急预案
- 确认GitHub PAT令牌（90天有效）

### 10.2 第二轮对话
- 讨论Vercel部署限制（100次/天）
- 建立推送确认机制
- 配置git remote使用PAT令牌

### 10.3 第三轮对话
- 用户要求先本地预览
- 修复Supabase未配置时的崩溃问题
- 添加防护检查，优雅降级

### 10.4 第四轮对话
- 用户要求扩展线路数据到50个城市
- 更新线路卡片为城市间线路
- 添加飞机筛选选项

### 10.5 第五轮对话
- 用户要求改造首页布局
- 底部筛选栏改为城市间线路卡片
- 使用高德地图API绘制公交路线轨迹
- 交通方式优先级：公交车第一，城际公交第二

---

## 十一、待办事项

- [ ] 配置Supabase数据库（需解决免费项目上限问题）
- [ ] 实现真实公交线路数据接入（高德地图API）
- [ ] 添加线路详情页面
- [ ] 优化地图交互体验
- [ ] 实现用户收藏线路功能
- [ ] 域名到期处理（约1年内）
- [ ] PAT令牌到期更新（90天内）

---

## 十二、注意事项

1. **安全**: 环境变量包含敏感信息，已添加到.gitignore
2. **部署**: Vercel每日部署限制100次，推送前需确认
3. **令牌**: GitHub PAT令牌90天有效，到期需重新生成
4. **域名**: wadez.asia一年内到期，需提前处理
5. **数据库**: Supabase免费项目已达上限，需清理或升级