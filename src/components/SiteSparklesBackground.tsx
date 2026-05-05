"use client";

import { useEffect, useState } from "react";
import { SparklesCore } from "@/components/ui/sparkles";

/**
 * Fixed full-viewport particle layer behind routed content.
 * pointer-events-none keeps links, nav, and sheets interactive.
 *
 * Performance notes:
 * - Reduced particleDensity on mobile (matchMedia) to avoid heavy canvas on
 *   low-end devices while keeping the premium feel on desktop.
 * - Only mounts SparklesCore after first paint (requestIdleCallback /
 *   setTimeout fallback) so it never blocks the critical render path.
 */
export function SiteSparklesBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer sparkles until the browser is idle — avoids blocking LCP/FID
    const cb = () => setMounted(true);
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(cb, { timeout: 1200 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(cb, 400);
    return () => clearTimeout(id);
  }, []);

  // Detect if user prefers reduced motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Fewer particles on mobile for smooth 60fps even on low-end devices
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  if (prefersReduced || !mounted) {
    // Lightweight solid overlay without animation
    return (
      <div
        className="pointer-events-none fixed inset-0 z-0 min-h-[100dvh] w-full"
        aria-hidden
      />
    );
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 min-h-[100dvh] w-full overflow-hidden"
      aria-hidden
    >
      <SparklesCore
        id="site-sparkles"
        background="transparent"
        minSize={0.3}
        maxSize={isMobile ? 0.8 : 1.1}
        particleDensity={isMobile ? 32 : 72}
        className="h-full w-full"
        particleColor="#94c4ff"
        speed={isMobile ? 1.5 : 2.5}
      />
      <div
        className="absolute inset-0 bg-background/82 backdrop-blur-[1px]"
        aria-hidden
      />
    </div>
  );
}
