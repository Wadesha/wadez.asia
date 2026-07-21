# Wadez.asia - 物流地图平台

专业物流交通 POI 地图应用，支持仓库、配送中心、站点、港口等兴趣点的标注和管理。

## 技术栈

- **前端**: Next.js 15 + TypeScript + Tailwind CSS
- **地图**: 高德地图 JS API 2.0
- **后端/数据库**: Supabase (PostgreSQL + Auth + Storage)
- **部署**: Vercel
- **域名**: wadez.asia (阿里云)

## 功能

- 地图浏览：基于高德地图的物流 POI 展示
- 分类筛选：仓库、配送中心、站点、港口、机场、铁路、公路枢纽
- 用户系统：邮箱注册/登录 (Supabase Auth)
- POI 管理：登录用户可添加、编辑、删除兴趣点
- 图片上传：为 POI 上传关联图片 (Supabase Storage)

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

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 中导入仓库
3. 配置环境变量（参考 `.env.local.example`）
4. 部署完成

## 环境变量

| 变量 | 说明 |
|------|------|
| NEXT_PUBLIC_SUPABASE_URL | Supabase 项目 URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anon key |
| NEXT_PUBLIC_AMAP_KEY | 高德地图 Web JS API Key |
| NEXT_PUBLIC_AMAP_SECURITY_CODE | 高德地图安全密钥 |
| NEXT_PUBLIC_APP_URL | 应用 URL |

## 域名配置

在阿里云 DNS 解析中添加：
- 类型: CNAME
- 主机记录: @
- 记录值: cname.vercel-dns.com
