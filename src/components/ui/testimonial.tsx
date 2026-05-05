"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  image: string;
  rating?: number;
};

type TestimonialProps = {
  className?: string;
  title?: string;
  description?: string;
  items?: TestimonialItem[];
};

const defaultItems: TestimonialItem[] = [
  {
    quote:
      "I have been using these sessions for nearly two years and the practical curriculum made my interview prep much easier.",
    name: "Donald Jackman",
    role: "SWE 1 @ Amazon",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600",
    rating: 5,
  },
  {
    quote:
      "Mentorship was clear and structured. I improved system thinking and coding confidence before my final placement rounds.",
    name: "Richard Nelson",
    role: "SWE 2 @ Amazon",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600",
    rating: 5,
  },
  {
    quote:
      "Project reviews and mock interviews felt industry-level. I could clearly explain my work and secure a strong offer.",
    name: "James Washington",
    role: "SWE 2 @ Google",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop",
    rating: 5,
  },
];

const Stars = ({ count = 5 }: { count?: number }) => (
  <div className="mt-3 flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="16" height="15" viewBox="0 0 16 15" fill="none" aria-hidden>
        <path
          d="M7.524.464a.5.5 0 0 1 .952 0l1.432 4.41a.5.5 0 0 0 .476.345h4.637a.5.5 0 0 1 .294.904L11.563 8.85a.5.5 0 0 0-.181.559l1.433 4.41a.5.5 0 0 1-.77.559L8.294 11.65a.5.5 0 0 0-.588 0l-3.751 2.726a.5.5 0 0 1-.77-.56l1.433-4.41a.5.5 0 0 0-.181-.558L.685 6.123A.5.5 0 0 1 .98 5.22h4.637a.5.5 0 0 0 .476-.346z"
          fill={i < count ? "#F59E0B" : "#6B7280"}
        />
      </svg>
    ))}
  </div>
);

export default function TestimonialSection({
  className,
  title = "What Our Students Say",
  description = "Join thousands of successful learners who transformed their careers with us.",
  items = defaultItems,
}: TestimonialProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const media = window.matchMedia("(max-width: 767px)");
    if (!media.matches) return;

    let frameId = 0;
    const speedPerFrame = 0.24;

    const tick = () => {
      if (!isPaused) {
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        if (maxScroll <= 0) return;
        if (scroller.scrollLeft >= maxScroll - 1) {
          scroller.scrollTo({ left: 0, behavior: "auto" });
        } else {
          scroller.scrollLeft += speedPerFrame;
        }
      }
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isPaused]);

  return (
    <section className={cn("text-center", className)}>
      <h3 className="text-2xl font-bold text-foreground md:text-3xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">{description}</p>

      <div
        ref={scrollerRef}
        className={cn(
          "mt-10 flex gap-5 overflow-x-auto pb-3 text-left md:mt-12 md:grid md:grid-cols-3 md:overflow-visible",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory md:snap-none",
        )}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {items.map((item) => (
          <article
            key={item.name}
            className={cn(
              "w-[18.5rem] shrink-0 snap-start rounded-2xl border border-border/70 bg-card/95 p-5 shadow-soft",
              "transition-transform duration-300 hover:-translate-y-0.5",
              "md:w-auto",
            )}
          >
            <div className="h-9 w-9 rounded-full bg-primary/15 p-2">
              <svg width="20" height="18" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M33.172 5.469q2.555 0 4.547 1.547a7.4 7.4 0 0 1 2.695 4.007q.47 1.711.469 3.61 0 2.883-1.125 5.86a22.8 22.8 0 0 1-3.094 5.577 33 33 0 0 1-4.57 4.922A35 35 0 0 1 26.539 35l-3.398-3.398q5.296-4.243 7.218-6.563 1.946-2.32 2.016-4.617-2.86-.329-4.781-2.461-1.923-2.133-1.922-4.992 0-3.117 2.18-5.297 2.202-2.203 5.32-2.203m-20.625 0q2.555 0 4.547 1.547a7.4 7.4 0 0 1 2.695 4.007q.47 1.711.469 3.61 0 2.883-1.125 5.86a22.8 22.8 0 0 1-3.094 5.577 33 33 0 0 1-4.57 4.922A35 35 0 0 1 5.914 35l-3.398-3.398q5.296-4.243 7.218-6.563 1.946-2.32 2.016-4.617-2.86-.329-4.781-2.461-1.922-2.133-1.922-4.992 0-3.117 2.18-5.297 2.202-2.203 5.32-2.203"
                  fill="hsl(var(--primary))"
                />
              </svg>
            </div>

            <Stars count={item.rating ?? 5} />

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.quote}</p>

            <div className="mt-4 flex items-center gap-3">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={item.image}
                alt={item.name}
                loading="lazy"
                decoding="async"
              />
              <div>
                <h4 className="text-base font-medium text-foreground">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
