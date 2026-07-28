# Wadez.asia - 公共交通地图平台

专业公共交通 POI 地图应用，支持公交站、地铁站、火车站、机场等兴趣点的标注和管理。

---

## 项目需求

### 核心需求（2026-07-22 确认）

| 需求项 | 说明 |
|--------|------|
| 网站类型 | 行业/专业地图 —— 物流交通领域 |
| 地图服务 | 高德地图 JS API 2.0 |
| UGC 功能 | 图片上传（关联到 POI） |
| 用户系统 | Supabase Auth 邮箱登录/注册 |
| 前端框架 | Next.js (App Router) + TypeScript + Tailwind CSS |
| 数据库 | Supabase (PostgreSQL + PostGIS) |
| 文件存储 | Supabase Storage |
| 代码托管 | GitHub: github.com/Wadesha/wadez.asia |
| 部署平台 | Vercel |
| 域名 | wadez.asia（阿里云注册） |

### POI 分类体系

公交站(bus)、地铁站(metro)、火车站(train)、客运站(coach)、机场(airport)、码头/轮渡(ferry)、有轨电车(tram)、其他(other)

### 功能清单

- 地图浏览：基于高德地图的公共交通 POI 展示，支持缩放、平移
- 分类筛选：底部筛选栏按 POI 类型过滤
- 用户认证：邮箱注册/登录，Session 自动刷新
- POI 管理：登录用户可添加（地图点选坐标）、编辑、删除兴趣点
- 图片上传：为 POI 上传关联图片，存储于 Supabase Storage
- 权限控制：RLS 策略确保只有创建者可修改/删除自己的 POI

---

## 技术架构

```
┌─────────────────────────────────────────────────┐
│                   Vercel (部署)                   │
├─────────────────────────────────────────────────┤
│  Next.js 16 App Router                          │
│  ├── / (地图主页, force-dynamic)                 │
│  ├── /login (登录/注册)                          │
│  ├── /api/poi (POI CRUD)                        │
│  ├── /api/upload (图片上传)                      │
│  ├── /auth/callback (OAuth 回调)                │
│  └── proxy.ts (Session 刷新)                    │
├─────────────────────────────────────────────────┤
│  高德地图 JS API 2.0 (前端地图渲染)              │
├─────────────────────────────────────────────────┤
│  Supabase                                       │
│  ├── PostgreSQL + PostGIS (公共交通 POI 地理数据) │
│  ├── Auth (邮箱认证)                            │
│  └── Storage (poi-images bucket)                │
└─────────────────────────────────────────────────┘
```

---

## 开发过程记录

### 2026-07-22 第一次开发会话

**需求确认过程：**

1. 用户提出：开发网站，域名阿里云，GitHub 托管，Vercel 部署，Supabase 数据库
2. 确认网站类型：地图、POI、用户 UGC
3. 确认技术栈：Next.js（推荐）
4. 确认地图服务：高德地图
5. 确认 UGC 功能：图片上传
6. 确认用途：行业/专业地图 → 物流/交通
7. 确认登录方式：Supabase Auth 邮箱登录

**开发步骤：**

1. `npx create-next-app@latest` 初始化项目（TypeScript + Tailwind + ESLint + App Router + src 目录）
2. 安装依赖：`@supabase/supabase-js` `@supabase/ssr` `@amap/amap-jsapi-loader`
3. 创建 Supabase 客户端工具（client.ts / server.ts / middleware.ts）
4. 设计数据库表结构并编写 SQL 迁移文件（pois / poi_images / profiles + RLS + 触发器）
5. 开发地图组件 MapView.tsx（高德地图加载、POI 标记渲染、点击交互）
6. 开发 UI 组件：Header / FilterBar / POIPanel / POIDetail / LoginForm
7. 编写 API 路由：POI CRUD + 图片上传 + 图片列表
8. 配置 Vercel 部署（vercel.json + .env.local.example）
9. 修复构建问题：
   - Next.js 16 中 `middleware` 已更名为 `proxy`，需使用 proxy.ts
   - 登录页 SSG 时 Supabase 客户端报错 → 添加 `force-dynamic`
   - 主页 `window is not defined` → 使用 `next/dynamic` + `ssr: false` 加载地图
   - 将页面拆分为 Server Component 包装 + Client Component
10. 构建验证通过，推送到 GitHub

**遇到的问题及解决方案：**

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| middleware 文件冲突 | Next.js 16 将 middleware 重命名为 proxy | 删除 middleware.ts，创建 proxy.ts |
| 登录页 SSG 报错 | 预渲染时缺少 Supabase 环境变量 | 添加 `export const dynamic = "force-dynamic"` |
| 主页 window 未定义 | 高德地图在 SSR 时访问 window | 使用 `dynamic(() => import(...), { ssr: false })` |
| createClient 在 SSG 执行 | 组件顶层调用 createClient | 拆分为 Server/Client 组件，useMemo 延迟创建 |

---

## 项目结构

```
wadez-asia/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 主页（Server Component 包装）
│   │   ├── layout.tsx            # 根布局
│   │   ├── globals.css           # 全局样式 + 地图标记样式
│   │   ├── login/page.tsx        # 登录页
│   │   ├── auth/callback/route.ts # OAuth 回调
│   │   └── api/
│   │       ├── poi/route.ts      # POI 列表 + 创建
│   │       ├── poi/[id]/route.ts # POI 更新 + 删除
│   │       ├── poi/[id]/images/route.ts # POI 图片列表
│   │       └── upload/route.ts   # 图片上传
│   ├── components/
│   │   ├── MapPage.tsx           # 地图主页面（Client Component）
│   │   ├── MapView.tsx           # 高德地图组件
│   │   ├── Header.tsx            # 顶部导航
│   │   ├── FilterBar.tsx         # 分类筛选栏
│   │   ├── POIPanel.tsx          # POI 添加/编辑面板
│   │   ├── POIDetail.tsx         # POI 详情卡片
│   │   └── LoginForm.tsx         # 登录/注册表单
│   ├── lib/
│   │   ├── types.ts              # 类型定义
│   │   └── supabase/
│   │       ├── client.ts         # 浏览器端 Supabase 客户端
│   │       ├── server.ts         # 服务端 Supabase 客户端
│   │       └── middleware.ts     # Session 刷新逻辑
│   └── proxy.ts                  # Next.js 16 Proxy（原 middleware）
├── supabase/
│   └── migrations/
│       └── 001_initial.sql       # 数据库初始化（表 + RLS + 触发器）
├── docs/
│   └── history/                  # 历史生成内容存档
├── vercel.json                   # Vercel 部署配置
├── .env.local.example            # 环境变量模板
└── README.md                     # 本文件
```

---

## 本地开发

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.local.example .env.local
# 编辑 .env.local 填入你的 Supabase 和高德地图密钥

# 启动开发服务器
npm run dev
```

## 数据库初始化

在 Supabase 控制台的 SQL Editor 中运行 `supabase/migrations/001_initial.sql`。

该脚本会创建：
- `pois` 表（含 PostGIS 空间索引）
- `poi_images` 表
- `profiles` 表
- RLS 安全策略
- 自动创建用户资料的触发器
- `poi-images` Storage bucket

## 部署到 Vercel

1. 将代码推送到 GitHub（已完成）
2. 在 [Vercel](https://vercel.com) 中导入仓库 `Wadesha/wadez.asia`
3. 配置环境变量（参考 `.env.local.example`）
4. 部署完成，获得 `*.vercel.app` 地址

## 环境变量

| 变量 | 说明 | 获取方式 |
|------|------|----------|
| NEXT_PUBLIC_SUPABASE_URL | Supabase 项目 URL | Supabase Dashboard → Settings → API |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anon key | 同上 |
| NEXT_PUBLIC_AMAP_KEY | 高德地图 Web JS API Key | 高德开放平台 → 应用管理 |
| NEXT_PUBLIC_AMAP_SECURITY_CODE | 高德地图安全密钥 | 同上 |
| NEXT_PUBLIC_APP_URL | 应用 URL | 部署后填入 Vercel 域名 |

## 域名配置（阿里云）

在阿里云 DNS 解析中添加：

| 记录类型 | 主机记录 | 记录值 |
|----------|----------|--------|
| CNAME | @ | cname.vercel-dns.com |
| CNAME | www | cname.vercel-dns.com |

然后在 Vercel 项目 Settings → Domains 中添加 `wadez.asia`。

---

## 后续规划

- [ ] 配置 Supabase 项目并初始化数据库
- [ ] 申请高德地图 Web JS API Key
- [ ] Vercel 部署并绑定域名 wadez.asia
- [ ] POI 搜索功能（按名称/地址搜索）
- [ ] 地图聚合（大量 POI 时的性能优化）
- [ ] 用户个人主页（我发布的 POI）
- [ ] POI 评论/评分系统
- [ ] 数据导入（批量导入物流节点数据）
- [ ] 移动端适配优化

---

## 历史存档

所有开发过程中生成的页面、组件和文档均保存在 [`docs/history/`](docs/history/) 目录中，按日期归档。
