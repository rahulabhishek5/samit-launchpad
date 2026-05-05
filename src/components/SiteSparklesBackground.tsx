"use client";

import { SparklesCore } from "@/components/ui/sparkles";

/**
 * Fixed full-viewport particle layer behind routed content.
 * pointer-events-none keeps links, nav, and sheets interactive.
 */
export function SiteSparklesBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 min-h-[100dvh] w-full overflow-hidden"
      aria-hidden
    >
      <SparklesCore
        id="site-sparkles"
        background="transparent"
        minSize={0.35}
        maxSize={1.1}
        particleDensity={72}
        className="h-full w-full"
        particleColor="#94c4ff"
        speed={2.5}
      />
      <div
        className="absolute inset-0 bg-background/82 backdrop-blur-[1px]"
        aria-hidden
      />
    </div>
  );
}
