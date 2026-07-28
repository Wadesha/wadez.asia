# 2026-07-22 开发会话记录

## 会话主题

初始化 wadez.asia 物流地图平台项目

## 需求讨论

### 用户原始需求
> 开发一个网站，域名 aliyun，GitHub 托管，Vercel 部署，数据库 Supabase。
> 仓库：https://github.com/Wadesha/wadez.asia

### 需求确认（问答记录）

| 问题 | 用户回答 |
|------|----------|
| 网站类型？ | 地图、POI、用户 UGC |
| 前端技术栈？ | Next.js（推荐） |
| 地图服务提供商？ | 高德地图 |
| UGC 功能？ | 图片上传 |
| 网站用途？ | 行业/专业地图 → 物流/交通 |
| 登录方式？ | Supabase Auth 邮箱登录 |

## 技术决策

1. **框架版本**: Next.js 16.2.11 (Turbopack)，App Router
2. **地图方案**: 高德地图 JS API 2.0，使用 `@amap/amap-jsapi-loader` 动态加载
3. **数据库设计**: PostgreSQL + PostGIS 扩展，支持空间查询
4. **认证方案**: Supabase Auth，邮箱+密码，配合 proxy.ts 自动刷新 Session
5. **文件存储**: Supabase Storage `poi-images` bucket，按 userId/poiId/ 组织
6. **部署区域**: Vercel HKG1（香港，兼顾国内访问速度）

## 操作步骤

1. `npx create-next-app@latest wadez-asia --typescript --tailwind --eslint --app --src-dir`
2. `npm install @supabase/supabase-js @supabase/ssr @amap/amap-jsapi-loader`
3. 创建 Supabase 客户端工具文件（client / server / middleware）
4. 编写数据库迁移 SQL（pois + poi_images + profiles + RLS + triggers + storage）
5. 开发 MapView 组件（高德地图初始化、POI 标记、点击交互）
6. 开发 UI 组件（Header / FilterBar / POIPanel / POIDetail / LoginForm）
7. 编写 API 路由（POI CRUD + 图片上传 + 图片列表）
8. 配置 vercel.json + .env.local.example
9. 修复构建错误（详见下方）
10. `npm run build` 验证通过
11. `git init` → `git commit` → `git push` 到 GitHub

## 遇到的问题

### 问题 1: Next.js 16 middleware 弃用
- **现象**: 构建警告 "middleware file convention is deprecated, use proxy instead"
- **原因**: Next.js 16 将 `middleware.ts` 重命名为 `proxy.ts`，导出函数名从 `middleware` 改为 `proxy`
- **解决**: 删除 middleware.ts，创建 src/proxy.ts，导出 `proxy` 函数

### 问题 2: 两文件共存冲突
- **现象**: "Both middleware file and proxy file are detected"
- **原因**: Next.js 16 不允许 middleware.ts 和 proxy.ts 同时存在
- **解决**: 彻底移除 middleware.ts（重命名为 .bak）

### 问题 3: 登录页 SSG 报错
- **现象**: "Your project's URL and API key are required to create a Supabase client"
- **原因**: 登录页在 SSG 时尝试创建 Supabase 客户端，但环境变量未设置
- **解决**: 添加 `export const dynamic = "force-dynamic"` 跳过静态生成

### 问题 4: 主页 window 未定义
- **现象**: "ReferenceError: window is not defined"
- **原因**: 高德地图 SDK 在模块加载时访问 window 对象
- **解决**: 使用 `next/dynamic` + `{ ssr: false }` 延迟加载地图组件

### 问题 5: Client Component 无法导出 dynamic 配置
- **现象**: "use client" 文件中无法使用 route segment config
- **原因**: Next.js 要求 `export const dynamic` 必须从 Server Component 导出
- **解决**: 将 page.tsx 改为 Server Component 包装层，实际逻辑移入 MapPage.tsx (Client Component)

## 生成文件清单

| 文件 | 用途 |
|------|------|
| src/app/page.tsx | 主页 Server Component 包装 |
| src/app/layout.tsx | 根布局（中文 lang, 元数据） |
| src/app/globals.css | 全局样式 + 地图标记 CSS |
| src/app/login/page.tsx | 登录页 |
| src/app/auth/callback/route.ts | OAuth 回调处理 |
| src/app/api/poi/route.ts | POI 列表 + 创建 API |
| src/app/api/poi/[id]/route.ts | POI 更新 + 删除 API |
| src/app/api/poi/[id]/images/route.ts | POI 图片列表 API |
| src/app/api/upload/route.ts | 图片上传 API |
| src/components/MapPage.tsx | 地图主页面逻辑 |
| src/components/MapView.tsx | 高德地图渲染组件 |
| src/components/Header.tsx | 顶部导航栏 |
| src/components/FilterBar.tsx | POI 分类筛选栏 |
| src/components/POIPanel.tsx | POI 添加/编辑表单 |
| src/components/POIDetail.tsx | POI 详情展示卡片 |
| src/components/LoginForm.tsx | 登录/注册表单 |
| src/lib/types.ts | TypeScript 类型定义 |
| src/lib/supabase/client.ts | 浏览器端 Supabase 客户端 |
| src/lib/supabase/server.ts | 服务端 Supabase 客户端 |
| src/lib/supabase/middleware.ts | Session 刷新逻辑 |
| src/proxy.ts | Next.js 16 Proxy |
| supabase/migrations/001_initial.sql | 数据库完整初始化脚本 |
| vercel.json | Vercel 部署配置 |
| .env.local.example | 环境变量模板 |
