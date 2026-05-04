import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#courses", label: "Courses" },
  { href: "#why-us", label: "Why Us" },
  { href: "#placements", label: "Placements" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

const Brand = () => (
  <a href="#top" className="flex items-center gap-3" aria-label="SamIT Technology home">
    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground shadow-soft">
      S
    </span>
    <span className="text-base font-semibold tracking-tight text-foreground">SamIT Technology</span>
  </a>
);

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-elevated"
      >
        Skip to content
      </a>
      <div className="mx-auto w-full max-w-6xl px-4 pt-3 md:px-8 md:pt-5">
        <nav
          className={cn(
            "flex min-h-[3.75rem] items-center justify-between rounded-3xl border border-border/45 bg-background/72 px-4 shadow-float backdrop-blur-2xl transition-all duration-300 md:px-7",
            scrolled && "border-border/65 bg-background/86 shadow-elevated",
          )}
          aria-label="Primary"
        >
          <Brand />
          <ul className="hidden items-center gap-0.5 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-xl px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-primary-soft/55 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
            <Button asChild size="default" className="px-6">
              <a href="#contact">Enroll Now</a>
            </Button>
          </div>
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(100vw-2rem,22rem)] border-l border-border/50 bg-background/96 backdrop-blur-2xl">
                <SheetTitle className="text-left text-base font-semibold tracking-tight">Menu</SheetTitle>
                <ul className="mt-8 flex flex-col gap-1">
                  {links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-2xl px-4 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-primary-soft/70"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-8 w-full">
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Enroll Now
                  </a>
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};
