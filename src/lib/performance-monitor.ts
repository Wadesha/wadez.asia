export interface PerformanceMetrics {
  ttfb: number;
  fcp: number;
  lcp: number;
  domReady: number;
  loadComplete: number;
}

function getNavigationTiming(): Partial<PerformanceMetrics> {
  if (typeof window === "undefined" || !window.performance) {
    return {};
  }

  const nav = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming | undefined;

  if (!nav) {
    return {};
  }

  return {
    ttfb: Math.round(nav.responseStart - nav.startTime),
    domReady: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
    loadComplete: Math.round(nav.loadEventEnd - nav.startTime),
  };
}

function observePaint(
  name: "first-contentful-paint" | "largest-contentful-paint",
  callback: (value: number) => void
) {
  if (typeof window === "undefined" || !window.performance) {
    return;
  }

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === name || entry.entryType === "largest-contentful-paint") {
        callback(Math.round(entry.startTime));
        observer.disconnect();
        break;
      }
    }
  });

  try {
    observer.observe({ type: "paint", buffered: true });
    if (name === "largest-contentful-paint") {
      observer.observe({ type: "largest-contentful-paint", buffered: true });
    }
  } catch {
    // 浏览器不支持则静默失败
  }
}

export function initPerformanceMonitor() {
  if (typeof window === "undefined") return;

  window.addEventListener("load", () => {
    // 延迟执行，确保 load 事件已完成
    setTimeout(() => {
      const navMetrics = getNavigationTiming();

      const metrics: Partial<PerformanceMetrics> = {
        ...navMetrics,
      };

      console.log(
        `%c[Performance]%c 首屏加载指标`,
        "color: #9ca3af; font-weight: bold;",
        "color: inherit;"
      );
      console.log(`  TTFB: ${metrics.ttfb ?? "--"}ms`);
      console.log(`  DOM Ready: ${metrics.domReady ?? "--"}ms`);
      console.log(`  Load Complete: ${metrics.loadComplete ?? "--"}ms`);

      observePaint("first-contentful-paint", (fcp) => {
        console.log(`  FCP: ${fcp}ms`);
      });

      observePaint("largest-contentful-paint", (lcp) => {
        console.log(`  LCP: ${lcp}ms`);
      });
    }, 0);
  });
}
