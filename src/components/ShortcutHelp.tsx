"use client";

import { useState, useEffect } from "react";
import { useKeyboardShortcuts } from "@/lib/use-keyboard-shortcuts";

interface ShortcutItem {
  key: string;
  label: string;
  scope: string;
}

const SHORTCUTS: ShortcutItem[] = [
  { key: "/", label: "聚焦搜索", scope: "全局" },
  { key: "?", label: "显示/隐藏快捷键帮助", scope: "全局" },
  { key: "Esc", label: "关闭弹窗或面板", scope: "全局" },
  { key: "G", label: "跳转至 GIS 工具箱", scope: "全局" },
  { key: "H", label: "返回首页", scope: "全局" },
  { key: "←", label: "返回上一页", scope: "导航" },
];

export default function ShortcutHelp() {
  const [visible, setVisible] = useState(false);

  useKeyboardShortcuts([
    {
      key: "?",
      handler: () => setVisible((v) => !v),
    },
    {
      key: "Escape",
      handler: () => setVisible(false),
    },
  ]);

  // ESC 关闭时恢复滚动（如有需要）
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setVisible(false)}
    >
      <div
        className="w-full max-w-md mx-4 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <h3 className="text-sm font-semibold text-white">快捷键速查</h3>
          <button
            onClick={() => setVisible(false)}
            className="text-xs text-gray-500 hover:text-gray-300 transition"
          >
            ESC 关闭
          </button>
        </div>

        <div className="px-5 py-3">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="pb-2 text-[10px] font-medium text-gray-500 uppercase tracking-wider w-24">
                  快捷键
                </th>
                <th className="pb-2 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  功能
                </th>
                <th className="pb-2 text-[10px] font-medium text-gray-500 uppercase tracking-wider w-16 text-right">
                  范围
                </th>
              </tr>
            </thead>
            <tbody>
              {SHORTCUTS.map((s, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-800/50"
                >
                  <td className="py-2">
                    <kbd className="inline-block min-w-[1.5rem] px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-[11px] font-mono text-gray-300 text-center">
                      {s.key}
                    </kbd>
                  </td>
                  <td className="py-2 text-sm text-gray-300">{s.label}</td>
                  <td className="py-2 text-right text-xs text-gray-500">
                    {s.scope}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 bg-gray-800/30 border-t border-gray-800">
          <p className="text-[10px] text-gray-500">
            提示：在输入框中输入时快捷键不会触发。
          </p>
        </div>
      </div>
    </div>
  );
}
