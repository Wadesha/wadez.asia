"use client";

import React, { useMemo, useState } from "react";

/**
 * 行政区数据表格组件
 * 支持多列排序/筛选/搜索，与地图联动
 */

export interface Column<T> {
  key: keyof T;
  label: string;
  /** 数值格式化 */
  format?: (v: any, row: T) => string;
  /** 是否可排序 */
  sortable?: boolean;
  width?: string;
}

export interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  /** 选中行ID */
  selectedId?: string | null;
  /** 行点击回调 */
  onRowClick?: (row: T) => void;
  /** 每页条数 */
  pageSize?: number;
  /** 搜索字段 */
  searchable?: boolean;
}

function AdminTable<T extends { id?: string; code?: string; name?: string }>({
  data,
  columns,
  title,
  selectedId,
  onRowClick,
  pageSize = 20,
  searchable = true,
}: AdminTableProps<T>) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);

  // 筛选
  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter((row) => {
      return Object.values(row).some((v) => String(v).toLowerCase().includes(q));
    });
  }, [data, query]);

  // 排序
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const list = [...filtered];
    list.sort((a, b) => {
      const av = a[sortKey] as any;
      const bv = b[sortKey] as any;
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "desc" ? bv - av : av - bv;
      }
      return sortDir === "desc"
        ? String(bv).localeCompare(String(av))
        : String(av).localeCompare(String(bv));
    });
    return list;
  }, [filtered, sortKey, sortDir]);

  // 分页
  const paged = useMemo(() => {
    const start = page * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  const totalPages = Math.ceil(sorted.length / pageSize);

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      {title && (
        <div className="px-3 py-1.5 border-b border-gray-100 text-xs font-semibold text-gray-700 flex items-center justify-between">
          <span>{title}<span className="ml-2 text-[10px] font-normal text-gray-400">示例数据</span></span>
          <span className="text-[10px] text-gray-400">{filtered.length} 条</span>
        </div>
      )}
      {searchable && (
        <div className="px-3 py-1.5 border-b border-gray-100">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="搜索名称/代码..."
            className="w-full px-2 py-1 text-[11px] border border-gray-200 rounded focus:outline-none focus:border-gray-400"
          />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  onClick={() => c.sortable !== false && toggleSort(c.key)}
                  className="text-left py-1.5 px-2 text-gray-500 font-medium border-b border-gray-200 cursor-pointer hover:bg-gray-100 select-none"
                  style={{ width: c.width }}
                >
                  {c.label}
                  {sortKey === c.key && (
                    <span className="ml-1">{sortDir === "desc" ? "↓" : "↑"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row, i) => {
              const rowId = (row as any).id || (row as any).code || i;
              const isSelected = selectedId && rowId === selectedId;
              return (
                <tr
                  key={rowId}
                  onClick={() => onRowClick?.(row)}
                  className={[
                    "border-b border-gray-100 cursor-pointer transition-colors",
                    isSelected ? "bg-gray-200" : "hover:bg-gray-50",
                  ].join(" ")}
                >
                  {columns.map((c) => (
                    <td key={String(c.key)} className="py-1 px-2 text-gray-700">
                      {c.format ? c.format(row[c.key], row) : String(row[c.key] ?? "")}
                    </td>
                  ))}
                </tr>
              );
            })}
            {paged.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-4 text-center text-gray-400 text-xs">
                  无数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* 分页 */}
      {totalPages > 1 && (
        <div className="px-3 py-1.5 border-t border-gray-100 flex items-center justify-between text-[10px]">
          <span className="text-gray-400">
            第 {page * pageSize + 1}-{Math.min((page + 1) * pageSize, sorted.length)} 条 / 共 {sorted.length} 条
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-1.5 py-0.5 text-gray-600 hover:bg-gray-100 border border-gray-200 rounded disabled:opacity-40"
            >
              上一页
            </button>
            <span className="text-gray-500">{page + 1}/{totalPages}</span>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="px-1.5 py-0.5 text-gray-600 hover:bg-gray-100 border border-gray-200 rounded disabled:opacity-40"
            >
              下一页
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTable;
