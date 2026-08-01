"use client";

import { useState } from "react";
import type { DataLineage, LineageNode } from "@/lib/data-lineage";
import { formatTimestamp, timeAgo } from "@/lib/data-lineage";

interface LineagePanelProps {
  lineage: DataLineage;
  title?: string;
}

const nodeTypeLabels: Record<string, string> = {
  source: "数据源",
  transform: "转换",
  merge: "合并",
  api: "API",
  cache: "缓存",
  computed: "计算",
};

function NodeTree({
  node,
  depth = 0,
}: {
  node: LineageNode;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = (node.children?.length ?? 0) > 0;
  const indent = depth * 16;

  return (
    <div>
      <div
        className="flex items-center gap-2 py-1.5"
        style={{ paddingLeft: `${indent}px` }}
      >
        {hasChildren ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[10px] text-gray-400 w-4 h-4 flex items-center justify-center hover:text-gray-600"
          >
            {expanded ? "-" : "+"}
          </button>
        ) : (
          <span className="w-4 h-4" />
        )}
        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
        <span className="text-[11px] text-gray-700">{node.nodeName}</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">
          {nodeTypeLabels[node.nodeType] || node.nodeType}
        </span>
        <span className="text-[9px] text-gray-400 ml-auto">
          {timeAgo(node.timestamp)}
        </span>
      </div>

      {expanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <NodeTree key={child.nodeId} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function LineagePanel({
  lineage,
  title = "数据血缘",
}: LineagePanelProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-gray-800">{title}</h3>
          <span className="text-[10px] text-gray-500">
            {lineage.rootSource}
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">
            {lineage.steps.length} 步
          </span>
        </div>
        <span className="text-[10px] text-gray-400">
          {expanded ? "收起" : "展开"}
        </span>
      </button>

      {expanded && (
        <div className="px-3 pb-3">
          <div className="flex items-center gap-3 mb-2 text-[10px] text-gray-500">
            <span>数据ID: {lineage.dataId}</span>
            <span>获取: {formatTimestamp(lineage.fetchTime)}</span>
          </div>

          {lineage.dependencies.length > 0 && (
            <div className="mb-2 text-[10px] text-gray-500">
              依赖: {lineage.dependencies.join(", ")}
            </div>
          )}

          <div className="border border-gray-100 rounded-lg p-2 mb-2">
            <div className="text-[10px] text-gray-400 mb-1">来源树</div>
            <NodeTree node={lineage.tree} />
          </div>

          {lineage.steps.length > 0 && (
            <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
              <div className="text-[10px] text-gray-400">处理步骤</div>
              {lineage.steps.map((step, idx) => (
                <div
                  key={step.stepId}
                  className="flex items-center gap-2 text-[11px] border border-gray-100 rounded-md p-2"
                >
                  <span className="text-[10px] text-gray-400 w-4">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step.stepName}</span>
                  {step.description && (
                    <span className="text-[10px] text-gray-400 ml-auto">
                      {step.description}
                    </span>
                  )}
                  <span className="text-[9px] text-gray-400">
                    {timeAgo(step.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
