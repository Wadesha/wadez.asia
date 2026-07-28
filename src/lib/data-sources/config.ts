/**
 * 多数据源 Key 池管理
 *
 * 设计要点:
 * 1. 所有 API Keys 严格从环境变量加载（不硬编码）
 * 2. 支持多个数据源（amap / tencent）的 Key 池
 * 3. 轮询算法（Round Robin）避免单 Key 限流
 * 4. Key 失败标记（disabledKeys 集合）
 * 5. 使用统计（每日配额监控）
 *
 * 环境变量:
 * - AMAP_WEB_SERVICE_KEYS=key1,key2,...     （逗号分隔）
 * - TENCENT_MAP_KEYS=key1,key2,...           （逗号分隔）
 * - DATA_SOURCE_MODE=amap|tencent|multi
 * - PRIMARY_DATA_SOURCE=amap|tencent
 * - CONSISTENCY_THRESHOLD=0.6
 */

export type DataSource = "amap" | "tencent";

export interface KeyPoolStatus {
  source: DataSource;
  totalKeys: number;
  activeKeys: number;
  disabledKeys: number;
  usedToday: number; // 今日已用次数
  lastUsed?: string;
}

export interface MultiSourceConfig {
  mode: "amap" | "tencent" | "multi";
  primary: DataSource;
  consistencyThreshold: number;
}

/**
 * 解析逗号分隔的 Key 列表
 */
function parseKeys(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((k) => k.trim())
    .filter((k) => k.length > 0);
}

/**
 * 加载数据源配置
 */
export function loadConfig(): MultiSourceConfig {
  const mode = (process.env.DATA_SOURCE_MODE || "multi") as
    | "amap"
    | "tencent"
    | "multi";
  const primary = (process.env.PRIMARY_DATA_SOURCE || "amap") as DataSource;
  const consistencyThreshold = parseFloat(
    process.env.CONSISTENCY_THRESHOLD || "0.6"
  );
  return {
    mode,
    primary,
    consistencyThreshold: Math.max(0, Math.min(1, consistencyThreshold)),
  };
}

// ============================================================
// Key 池实现（Round Robin 轮询）
// ============================================================

class KeyPool {
  private keys: string[] = [];
  private disabled: Set<string> = new Set();
  private counter = 0;
  private usedToday = 0;
  private lastResetDate = new Date().toDateString();

  constructor(source: DataSource) {
    this.loadKeys(source);
  }

  private loadKeys(source: DataSource) {
    const raw =
      source === "amap"
        ? process.env.AMAP_WEB_SERVICE_KEYS
        : process.env.TENCENT_MAP_KEYS;
    this.keys = parseKeys(raw);
  }

  /**
   * 获取下一个可用 Key（轮询 + 跳过已禁用）
   */
  getNextKey(): string | null {
    this.checkDailyReset();
    if (this.keys.length === 0) return null;
    if (this.activeCount() === 0) return null;

    // 轮询查找可用 Key
    for (let i = 0; i < this.keys.length; i++) {
      const idx = (this.counter + i) % this.keys.length;
      const key = this.keys[idx];
      if (!this.disabled.has(key)) {
        this.counter = (idx + 1) % this.keys.length;
        this.usedToday++;
        return key;
      }
    }
    return null;
  }

  /**
   * 标记 Key 失效
   */
  disableKey(key: string) {
    this.disabled.add(key);
  }

  /**
   * 获取 Key 池状态
   */
  getStatus(source: DataSource): KeyPoolStatus {
    this.checkDailyReset();
    return {
      source,
      totalKeys: this.keys.length,
      activeKeys: this.activeCount(),
      disabledKeys: this.disabled.size,
      usedToday: this.usedToday,
    };
  }

  private activeCount(): number {
    return this.keys.length - this.disabled.size;
  }

  private checkDailyReset() {
    const today = new Date().toDateString();
    if (today !== this.lastResetDate) {
      this.usedToday = 0;
      this.lastResetDate = today;
    }
  }
}

// ============================================================
// 全局单例
// ============================================================

let _amapPool: KeyPool | null = null;
let _tencentPool: KeyPool | null = null;

export function getAmapKeyPool(): KeyPool {
  if (!_amapPool) {
    _amapPool = new KeyPool("amap");
  }
  return _amapPool;
}

export function getTencentKeyPool(): KeyPool {
  if (!_tencentPool) {
    _tencentPool = new KeyPool("tencent");
  }
  return _tencentPool;
}

export function getKeyPool(source: DataSource): KeyPool {
  return source === "amap" ? getAmapKeyPool() : getTencentKeyPool();
}

/**
 * 便捷函数：获取下一个 Key
 */
export function getNextKey(source: DataSource): string | null {
  return getKeyPool(source).getNextKey();
}

/**
 * 标记 Key 失效
 */
export function disableKey(source: DataSource, key: string) {
  getKeyPool(source).disableKey(key);
}

/**
 * 获取所有数据源状态
 */
export function getAllKeyPoolStatus(): KeyPoolStatus[] {
  return [
    getAmapKeyPool().getStatus("amap"),
    getTencentKeyPool().getStatus("tencent"),
  ];
}
