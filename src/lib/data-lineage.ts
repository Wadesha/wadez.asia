export interface LineageStep {
  stepId: string;
  stepName: string;
  timestamp: number;
  description?: string;
}

export interface LineageNode {
  nodeId: string;
  nodeName: string;
  nodeType: "source" | "transform" | "merge" | "api" | "cache" | "computed";
  timestamp: number;
  metadata?: Record<string, string | number | boolean>;
  children?: LineageNode[];
}

export interface DataLineage {
  dataId: string;
  rootSource: string;
  fetchTime: number;
  steps: LineageStep[];
  dependencies: string[];
  tree: LineageNode;
}

const lineageStore = new Map<string, DataLineage>();

export function recordLineage(
  dataId: string,
  rootSource: string,
  steps: LineageStep[],
  options: {
    dependencies?: string[];
    tree?: LineageNode;
  } = {}
): DataLineage {
  const now = Date.now();

  const defaultTree: LineageNode = {
    nodeId: `root-${dataId}`,
    nodeName: rootSource,
    nodeType: "source",
    timestamp: now,
    children:
      steps.length > 0
        ? steps.map((s, idx) => ({
            nodeId: s.stepId,
            nodeName: s.stepName,
            nodeType:
              idx === steps.length - 1
                ? "computed"
                : (["merge", "transform"] as const)[idx % 2],
            timestamp: s.timestamp,
            description: s.description,
            children: [],
          }))
        : [],
  };

  const lineage: DataLineage = {
    dataId,
    rootSource,
    fetchTime: now,
    steps,
    dependencies: options.dependencies ?? [],
    tree: options.tree ?? defaultTree,
  };

  lineageStore.set(dataId, lineage);
  return lineage;
}

export function getLineage(dataId: string): DataLineage | undefined {
  return lineageStore.get(dataId);
}

export function hasLineage(dataId: string): boolean {
  return lineageStore.has(dataId);
}

export function deleteLineage(dataId: string): boolean {
  return lineageStore.delete(dataId);
}

export function listLineageIds(): string[] {
  return Array.from(lineageStore.keys());
}

export function clearLineage(): void {
  lineageStore.clear();
}

export function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}秒前`;
  if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
  return `${Math.floor(diff / 86400)}天前`;
}
