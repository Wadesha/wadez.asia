# 应急预案

## 一、域名应急预案（wadez.asia 一年内到期）

### 现状
- 域名 wadez.asia 在阿里云注册，一年内到期
- 可能不续费或更换新域名

### 预案 A：不续费，使用 Vercel 免费子域名
- 网站地址变为 `wadez-asia.vercel.app`（或自定义项目名）
- 无需任何代码改动，Vercel 自动提供
- 缺点：地址不够简洁，没有品牌感

### 预案 B：更换新域名
- 操作步骤：
  1. 在新域名注册商购买域名
  2. 在 Vercel → Settings → Domains 中添加新域名
  3. 在新域名的 DNS 管理中添加 CNAME 记录指向 `cname.vercel-dns.com`
  4. 更新 `.env.local` 和 Vercel 环境变量中的 `NEXT_PUBLIC_APP_URL`
  5. 更新 Supabase Auth 的回调 URL（Authentication → URL Configuration）
- 代码无需改动，只需更新配置
- 旧域名到期前可设置 301 重定向到新域名

### 预案 C：续费（如果决定保留）
- 阿里云控制台 → 域名管理 → 续费
- 无需任何技术操作

### 注意事项
- 无论哪种方案，Supabase 数据不受影响（数据在 Supabase 云端）
- 更换域名时需更新 Supabase Auth 的 Site URL 和 Redirect URLs
- 建议域名到期前 1 个月做决定

---

## 二、GitHub 不稳定应急预案

### 现状
- 从国内推送代码到 GitHub 经常超时（443 端口连接失败）
- 首次推送成功，但后续推送多次失败

### 预案 A：多次重试（当前方案）
- 网络波动时等待几分钟后重试 `git push`
- 适合偶尔不稳定的情况

### 预案 B：使用 GitHub 镜像/代理
- 配置 git 代理：`git config --global http.proxy http://127.0.0.1:端口`
- 或使用 GitHub 加速服务（如 ghproxy.com）
- 命令：`git remote set-url origin https://ghproxy.com/https://github.com/Wadesha/wadez.asia.git`

### 预案 C：迁移到 Gitee（码云）
- 国内访问稳定，无需翻墙
- 操作步骤：
  1. 在 Gitee 创建仓库
  2. `git remote add gitee https://gitee.com/用户名/wadez.asia.git`
  3. `git push -u gitee main`
  4. Vercel 也支持从 Gitee 导入（需安装 Gitee 集成）
- 可同时保留 GitHub 和 Gitee 两个远程仓库

### 预案 D：直接使用 Vercel CLI 部署（绕过 Git）
- 安装：`npm i -g vercel`
- 部署：在项目目录执行 `vercel --prod`
- 完全不依赖 GitHub，直接从本地部署到 Vercel
- 适合 GitHub 完全不可用时的紧急部署

### 预案 E：使用 GitHub PAT 令牌认证（推荐）
- **原理**：使用个人访问令牌（PAT）进行 HTTPS 认证推送，比 SSH 更稳定
- **操作步骤**：
  1. 使用令牌设置远程仓库地址：
     ```bash
     git remote set-url origin https://<TOKEN>@github.com/Wadesha/wadez.asia.git
     ```
  2. 之后直接 `git push` 即可，无需额外认证
- **注意事项**：
  - 令牌有效期为 90 天，到期前需在 GitHub → Settings → Developer settings → Personal access tokens 中重新生成
  - 令牌仅限当前账号使用，不要分享给他人
  - 令牌具有仓库读写权限，泄露后需立即撤销
- **优势**：
  - 避免 SSH 密钥配置问题
  - HTTPS 连接在国内网络环境下更稳定
  - 无需每次输入用户名密码

### 当前建议
- 日常使用预案 E（PAT 令牌认证）作为首选方案
- 如果频繁失败，切换到预案 B（代理）或预案 C（Gitee）
- 紧急情况用预案 D（Vercel CLI）

---

## 三、Vercel 部署限制管理

### 现状
- 当前使用 Vercel Hobby（免费）计划
- 每日部署限制：100 次/天（包括 Production 和 Preview 部署）
- 每次向 main 分支推送都会触发 Production 部署
- 当前域名：wadez.asia（已配置）

### 部署策略
- **批量修改**：将多个修改合并到一个提交后再推送，避免频繁部署
- **确认机制**：每次推送前必须获得用户确认，防止误触发部署
- **预览环境**：使用 Preview Deployment 测试后再合并到 main

### 部署流程（推荐）
1. 在本地完成开发和测试
2. 运行 `npm run build` 确保构建成功
3. 检查 git status 确认待提交的更改
4. 向用户展示更改内容并请求确认
5. 用户确认后执行 git add → git commit → git push

### 超过限制的应对措施
- 等待次日自动恢复（每日重置）
- 使用 Vercel CLI 部署：`vercel --prod`（绕过 GitHub，不消耗部署次数）
- 升级到 Pro 计划（$20/月，无部署次数限制）

---

## 四、数据安全保障

无论域名或代码托管如何变化：
- **数据库安全**：Supabase 数据独立存储，与域名/GitHub 无关
- **代码安全**：本地始终保留完整项目副本（C:\Users\wade\OneDrive\claw\qoder\wadez-asia\）
- **部署安全**：Vercel 部署不依赖域名，随时可切换域名或回退到 vercel.app 子域名
- **密钥安全**：环境变量存储在 Vercel 和本地 `.env.local`（已添加到 .gitignore）
