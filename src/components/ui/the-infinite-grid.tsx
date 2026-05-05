"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

type InfiniteGridProps = {
  className?: string;
  children?: ReactNode;
};

export const TheInfiniteGrid = ({ className, children }: InfiniteGridProps) => {
  const [count, setCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    if (rafRef.current !== null) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const nextX = e.clientX - left;
    const nextY = e.clientY - top;
    rafRef.current = window.requestAnimationFrame(() => {
      mouseX.set(nextX);
      mouseY.set(nextY);
      rafRef.current = null;
    });
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = shouldReduceMotion ? 0 : 0.16;
  const speedY = shouldReduceMotion ? 0 : 0.16;

  useAnimationFrame(() => {
    if (shouldReduceMotion) return;
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "relative flex min-h-[88svh] w-full flex-col items-center justify-center overflow-hidden bg-background",
        className,
      )}
    >
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 z-0 opacity-30"
          style={{ maskImage, WebkitMaskImage: maskImage, willChange: "transform, opacity" }}
        >
          <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
        </motion.div>
      )}

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -right-[20%] -top-[20%] h-[40%] w-[40%] rounded-full bg-primary/14 blur-[80px]" />
        <div className="absolute right-[8%] -top-[8%] h-[20%] w-[20%] rounded-full bg-accent/12 blur-[68px]" />
        <div className="absolute -bottom-[20%] -left-[10%] h-[40%] w-[40%] rounded-full bg-[hsl(40_45%_58%/.11)] blur-[80px]" />
      </div>

      {children ?? (
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center space-y-6 px-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground drop-shadow-sm md:text-6xl">
              The Infinite Grid
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Move your cursor to reveal the active grid layer.
              <br />
              The pattern scrolls infinitely in the background.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="rounded-md bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
            >
              Interact ({count})
            </button>
            <button className="rounded-md bg-secondary px-8 py-3 font-semibold text-secondary-foreground transition-all hover:bg-secondary/80 active:scale-95">
              Learn More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const Component = TheInfiniteGrid;

const GridPattern = ({
  offsetX,
  offsetY,
}: {
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
}) => {
  return (
    <svg className="h-full w-full">
      <defs>
        <motion.pattern
          id="grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
};
