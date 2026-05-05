"use client";

import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FloatingHeaderLink = {
  label: string;
  href: string;
};

type FloatingHeaderProps = {
  brandName?: string;
  links?: FloatingHeaderLink[];
  ctaLabel?: string;
  ctaHref?: string;
};

const defaultLinks: FloatingHeaderLink[] = [
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Why Us", href: "#why-us" },
  { label: "Placements", href: "#placements" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function FloatingHeader({
  brandName = "SamIT Technology",
  links = defaultLinks,
  ctaLabel = "Enroll Now",
  ctaHref = "#contact",
}: FloatingHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;opacity:0;";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { rootMargin: "-12px 0px 0px 0px", threshold: 1 },
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <header className="sticky top-3 z-50 mx-auto w-full max-w-6xl px-4 md:top-4 md:px-8">
      <nav
        className={cn(
          "mx-auto flex min-h-[3.5rem] w-full items-center justify-between rounded-2xl border px-2.5 py-1.5 shadow-soft",
          "bg-background/90 supports-[backdrop-filter]:bg-background/80 backdrop-blur-md",
          "[transform:translateZ(0)] transition-[background-color,border-color,box-shadow,transform] duration-200 will-change-transform",
          scrolled && "border-border/75 bg-background/95 shadow-float",
        )}
        aria-label="Primary"
      >
        <a
          href="#top"
          className="hover:bg-accent flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors"
          aria-label={`${brandName} home`}
        >
          <img 
            src="/samit_logo.png" 
            alt={brandName} 
            className="h-8 w-auto object-contain"
          />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a key={link.href} className={buttonVariants({ variant: "ghost", size: "sm" })} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>

          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex lg:hidden">
            <a href="#courses">Menu</a>
          </Button>

          <Button asChild size="sm" className="sm:hidden">
            <a href={ctaHref}>Enroll</a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setOpen((value) => !value)}
              className="lg:hidden"
              aria-label="Open navigation menu"
            >
              <MenuIcon className="size-4" />
            </Button>
            <SheetContent
              className="gap-0 bg-background/95 pt-8 supports-[backdrop-filter]:bg-background/90 backdrop-blur-lg"
              side="left"
            >
              <SheetTitle className="px-4 text-left">
                <img 
                  src="/samit_logo.png" 
                  alt={brandName} 
                  className="h-8 w-auto object-contain"
                />
              </SheetTitle>
              <div className="grid gap-y-1 overflow-y-auto px-4 py-5">
                {links.map((link) => (
                  <a
                    key={`mobile-${link.href}`}
                    className={buttonVariants({
                      variant: "ghost",
                      className: "justify-start rounded-xl py-6 text-base",
                    })}
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
