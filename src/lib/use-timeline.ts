"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * 时间轴动画 Hook (v2.1.9)
 * 用于客流/拥堵/温度等按时间变化的数据动画
 */

interface UseTimelineOptions {
  totalSteps: number;        // 总步数（如24小时=24步）
  interval?: number;         // 每步间隔(ms)，默认1000
  autoPlay?: boolean;        // 是否自动播放
  loop?: boolean;            // 是否循环
}

interface UseTimelineResult {
  currentStep: number;
  isPlaying: boolean;
  speed: number;             // 播放速度倍数
  play: () => void;
  pause: () => void;
  toggle: () => void;
  reset: () => void;
  setStep: (step: number) => void;
  setSpeed: (speed: number) => void;
}

export function useTimeline({
  totalSteps,
  interval = 1000,
  autoPlay = false,
  loop = true,
}: UseTimelineOptions): UseTimelineResult {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const setStep = useCallback((step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, totalSteps - 1)));
  }, [totalSteps]);

  useEffect(() => {
    if (!isPlaying) {
      clearTimer();
      return;
    }

    clearTimer();
    timerRef.current = setTimeout(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next >= totalSteps) {
          if (loop) return 0;
          setIsPlaying(false);
          return prev;
        }
        return next;
      });
    }, interval / speed);

    return clearTimer;
  }, [isPlaying, currentStep, totalSteps, interval, speed, loop, clearTimer]);

  // 清理
  useEffect(() => clearTimer, [clearTimer]);

  return {
    currentStep,
    isPlaying,
    speed,
    play,
    pause,
    toggle,
    reset,
    setStep,
    setSpeed,
  };
}
