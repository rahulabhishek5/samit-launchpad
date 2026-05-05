import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { rootMargin: "-420px 0px 0px 0px", threshold: 1 },
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-safe-5 right-4 z-[60] sm:bottom-5 sm:right-5" style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.25rem)' }}>
      <Button
        size="icon"
        variant="outline"
        className="h-11 w-11 rounded-full border-border/70 bg-card/90 text-primary shadow-elevated backdrop-blur-md transition-all hover:bg-card hover:text-primary hover:shadow-float active:scale-95"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </div>
  );
}
