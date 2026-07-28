# 多数据源迭代文档

> 本文档记录从「单一高德数据源」演进到「高德 + 腾讯多数据源架构」的实施细节、防伪机制和未来规划。

## 一、为什么需要多数据源

### 1.1 高德地图 API 的局限

| 痛点 | 说明 |
|------|------|
| **个人版配额** | 高德 Web Service 个人版每日配额 3000-5000 次（按 Key 累计） |
| **并发限制** | 单 Key 60 req/min，并发数过高会触发 `CUQPS_HAS_EXCEEDED_THE_LIMIT` |
| **数据完整度** | 部分中小城市线路返回空（如县级市） |
| **Key 失效** | Web 端 / Web Service 端 Key 不能混用，需要分别申请 |
| **成本** | 超额按 0.01 元/次 计费，54 城 × 千条线路成本不可忽视 |

### 1.2 引入腾讯地图的动机

- **互补性强**：腾讯在 POI 搜索、路径规划方面表现稳定
- **免费额度**：腾讯位置服务 Web Service 同样提供每日 10000 次免费配额
- **数据差异**：同一线路距离/时长在两源间存在差异，**双源对比是天然防伪机制**

### 1.3 风险：腾讯可能返回「假数据」

用户已明确提醒「腾讯有可能返回假数」，需建立防伪机制。

---

## 二、腾讯地图 API 介绍

### 2.1 申请方式

- **官网**：https://lbs.qq.com/webservice_v1/guide-geocoder
- **步骤**：
  1. 注册腾讯位置服务账号
  2. 创建应用，选择「WebService API」类型
  3. 勾选需要的接口（建议全选）
  4. 获取 Key，添加到 `TENCENT_MAP_KEYS`

### 2.2 主要接口

| 接口 | 端点 | 用途 |
|------|------|------|
| **POI 搜索** | `/ws/place/v1/search` | 按关键词搜索公交站点/线路 |
| **公交路径规划** | `/ws/direction/v1/bus/` | 输入起终点经纬度，返回公交方案 |
| **地理编码** | `/ws/geocoder/v1/` | 地址 → 经纬度 |
| **逆地理编码** | `/ws/geocoder/v1/` | 经纬度 → 地址 |

### 2.3 配额与限流

- **个人版**：每日 10000 次/Key
- **并发**：建议 ≤ 5 QPS/Key
- **响应格式**：JSON，根对象有 `status`（0=成功）和 `message`

### 2.4 重要差异（vs 高德）

| 维度 | 高德 | 腾讯 |
|------|------|------|
| 列出城市所有线路 | ❌（无此接口） | ❌（无此接口） |
| 路径规划 | `/v3/direction/transit/integrated` | `/ws/direction/v1/bus/` |
| POI 搜索 | `/v3/place/text` | `/ws/place/v1/search` |
| 返回线路详情 | ✅（含全部站点） | ❌（仅含起终点） |
| 首末班车 | ❌ | ❌ |
| 坐标格式 | `lng,lat` | `lat,lng`（注意反） |
| Region 参数 | `city=北京` | `region=北京` |

---

## 三、防伪机制（5种）

> 由于腾讯可能返回错误数据，引入多重校验。

### 3.1 物理合理性校验

```typescript
// 距离 0.1~80km，时长 1~300min，速度 3~60km/h
if (distance < 0.1 || distance > 80) reject;
if (duration < 1 || duration > 300) reject;
const speed = distance / (duration / 60);
if (speed < 3 || speed > 60) reject;
```

### 3.2 多 Key 共识

```typescript
// 用 3 个不同 Key 查同一 OD 对
const distances = [];
for (let i = 0; i < 3; i++) {
  distances.push(await planTencentBus(...));
}
// 偏差 < 5% 才通过
```

### 3.3 双源对比（高德 vs 腾讯）

```typescript
// 距离/时长偏差 ≤ 40% 视为一致
const ratio = max(|amap.dist - tencent.dist| / avg, |amap.dur - tencent.dur| / avg);
if (ratio > 0.4) mark suspect;
```

### 3.4 时序稳定性

- 同一线路 1 小时后重查，差异 < 5% 视为稳定
- 用于发现「临时性 API 错误」

### 3.5 历史模式

- 与已有数据对比，名字/距离突变标记可疑
- 例如：原本 1 路是 15km，突然返回 50km，标记 suspect

---

## 四、信任评分体系

| 检查项 | 通过加分 | 不通过扣分 |
|--------|---------|-----------|
| 物理合理性 | +20 | -50 |
| 多 Key 共识 | +20 | -30 |
| 双源对比一致 | +15 | -30 |
| 时序稳定 | +10 | -20 |
| 历史模式匹配 | +10 | -20 |
| 高德主源 | +25 | — |

**最终判定**：
- `score >= 70` → `trusted`
- `40 <= score < 70` → `suspect`
- `score < 40` → `rejected`

---

## 五、文件结构

```
scripts/
├── fetch-bus-data.ts                 # 高德拉取（主源）
├── fetch-bus-data-tencent.ts         # 腾讯拉取（辅源/校验）
├── validate-tencent.ts               # 腾讯数据专项验证
└── multi-source-orchestrator.ts      # 多源协调器（主入口）

src/lib/data-sources/
└── config.ts                         # Key 池管理（轮询/失效/统计）

src/lib/bus-data/                     # 高德数据（主数据）
src/lib/bus-data-tencent/             # 腾讯数据（中间产物）
src/lib/bus-data-merged/              # 合并后数据（对外提供）
```

---

## 六、执行流程

### 6.1 单次执行

```bash
# 双源模式（推荐）
npx tsx scripts/multi-source-orchestrator.ts 北京 1 50

# 仅高德（应急）
npx tsx scripts/multi-source-orchestrator.ts 北京 1 50 --no-tencent

# 严格模式（双源一致才保留）
npx tsx scripts/multi-source-orchestrator.ts 北京 1 50 --strict
```

### 6.2 Worker 7×24 运行

```bash
# 启动（后台）
nohup npx tsx scripts/fetch-worker.ts > logs/worker.log 2>&1 &

# 查看日志
tail -f logs/worker.log

# 优雅停止
kill -TERM <PID>
```

### 6.3 输出文件

| 文件 | 内容 |
|------|------|
| `src/lib/bus-data/[city]/lines.ts` | 高德数据（主） |
| `src/lib/bus-data-tencent/[city]/results.json` | 腾讯原始数据 |
| `src/lib/bus-data-merged/[city]/report.json` | 完整报告（含 trust 评分） |
| `src/lib/bus-data-merged/[city]/lines.json` | 仅 trusted 线路（推荐使用） |

---

## 七、运维监控

### 7.1 Key 池状态

```bash
# 启动时自动打印
npx tsx scripts/multi-source-orchestrator.ts 北京 1 50
# 高德 Key 池: 10/10 可用
# 腾讯 Key 池: 6/6 可用
```

### 7.2 自动禁用机制

- 触发条件：API 返回 `key`、`配额`、`limit` 等关键词
- 处理：调用 `disableKey(source, key)`，从轮询池移除
- 恢复：每天 0 点自动重置 disabled 集合

### 7.3 异常告警

- 高德 Key < 3 时告警
- 腾讯 Key < 2 时告警
- 双源偏差 > 60% 占比 > 30% 时告警

---

## 八、迭代路径

### 已完成

- [x] 多数据源 Key 池管理（轮询/失效/统计）
- [x] 5 种防伪机制实现
- [x] 高德 + 腾讯双源拉取脚本
- [x] 多源协调器（合并/去重/评分）
- [x] 严格模式开关

### 进行中

- [ ] 双源对比阈值动态调整（基于历史数据自适应）
- [ ] 信任评分机器学习优化

### 未来规划

- [ ] **第三数据源**：百度地图（高德/腾讯全部失效时兜底）
- [ ] **数据源健康看板**：可视化 Key 池使用情况
- [ ] **智能调度**：根据 Key 健康度自动切换主源
- [ ] **数据反向修正**：用 trusted 数据回写，修正已 reject 的可疑数据

---

## 九、保密信息

### ⚠️ 重要：API Key 保密

- `AMAP_WEB_SERVICE_KEYS` 和 `TENCENT_MAP_KEYS` **必须**存储在 `.env.local`
- **严禁**硬编码到源码
- **严禁**提交到 Git 仓库
- `.env.local` 已在 `.gitignore` 中
- `.env.local.example` 提供模板但不包含真实 Key
- **不向第三方分享** 任何 API Key

### 泄漏应急

1. 立即在对应平台 revoke 所有相关 Key
2. 重新申请新 Key
3. 更新 `.env.local`
4. 重启 worker 进程
5. 检查 git log 中是否有历史泄漏

---

## 十、参考资料

- [高德开放平台 Web Service API 文档](https://lbs.amap.com/api/webservice/guide/api-advanced/search)
- [腾讯位置服务 Web Service API 文档](https://lbs.qq.com/webservice_v1/guide-geocoder)
- [防伪机制设计灵感](https://en.wikipedia.org/wiki/Byzantine_fault)
- [本项目 VERSION_PLAN.md](../VERSION_PLAN.md)
