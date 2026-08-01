"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 记录错误日志
    if (typeof window !== "undefined") {
      console.error("[ErrorBoundary] 捕获到错误:", error);
      console.error("[ErrorBoundary] 组件栈:", errorInfo.componentStack);
    }
  }

  handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-2xl">
            <div className="mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mb-3">
                <span className="text-sm font-bold text-gray-400">!</span>
              </div>
              <h2 className="text-base font-semibold text-white mb-1">
                页面出现错误
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                我们在渲染页面时遇到了意外问题。您可以尝试刷新页面，或返回首页。
              </p>
            </div>

            {this.state.error && (
              <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-800 overflow-auto">
                <p className="text-[11px] font-mono text-gray-500 mb-1">
                  错误信息：
                </p>
                <p className="text-[11px] font-mono text-red-400">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={this.handleReload}
                className="flex-1 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
              >
                刷新页面
              </button>
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition"
              >
                重试
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
