"use client";

import { useEffect } from "react";
import ErrorBoundary from "./ErrorBoundary";
import ShortcutHelp from "./ShortcutHelp";
import { initPerformanceMonitor } from "@/lib/performance-monitor";
import { MapModeProvider } from "@/context/MapModeContext";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initPerformanceMonitor();
  }, []);

  return (
    <ErrorBoundary>
      <MapModeProvider>
        {children}
        <ShortcutHelp />
      </MapModeProvider>
    </ErrorBoundary>
  );
}
