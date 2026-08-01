"use client";

import { useState, useEffect } from "react";

interface Step {
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    title: "探索工具箱",
    description: "31+ 个子网站覆盖 GIS 分析、城市规划、商业选址、气象环境、文旅资源等七大领域。",
  },
  {
    title: "切换数据层",
    description: "每个工具支持模拟数据与真实数据切换，点击右上角数据源切换即可体验。",
  },
  {
    title: "跨站联动",
    description: "不同分析页面之间数据互通，POI 选择、城市切换等状态会自动同步。",
  },
];

const STORAGE_KEY = "wadez-onboarding-completed";

export default function OnboardingGuide() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      const completed = localStorage.getItem(STORAGE_KEY);
      if (!completed) {
        setVisible(true);
      }
    } catch {
      // localStorage 不可用则跳过引导
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm mx-4 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
        {/* 顶部进度条 */}
        <div className="flex h-1 bg-gray-800">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`flex-1 transition-colors ${
                i <= step ? "bg-gray-200" : "bg-transparent"
              } ${i > 0 ? "ml-0.5" : ""}`}
            />
          ))}
        </div>

        <div className="p-6">
          {/* 步骤指示器 */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
              快速入门 {step + 1}/{STEPS.length}
            </span>
            <button
              onClick={handleSkip}
              className="text-[10px] text-gray-500 hover:text-gray-300 transition"
            >
              跳过
            </button>
          </div>

          {/* 内容 */}
          <h3 className="text-base font-semibold text-white mb-2">
            {STEPS[step].title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            {STEPS[step].description}
          </p>

          {/* 操作按钮 */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`w-1.5 h-1.5 rounded-full transition ${
                    i === step ? "bg-white" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`转到第 ${i + 1} 步`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-3 py-1.5 text-xs text-gray-400 hover:text-white transition"
                >
                  上一步
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-4 py-1.5 bg-white text-gray-900 rounded-lg text-xs font-medium hover:bg-gray-200 transition"
              >
                {step === STEPS.length - 1 ? "完成" : "下一步"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
