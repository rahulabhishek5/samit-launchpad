import { Facebook, Instagram, Linkedin } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#courses", label: "Courses" },
  { href: "#why-us", label: "Why Us" },
  { href: "#placements", label: "Placements" },
  { href: "#contact", label: "Contact" },
];

export const Footer = () => (
  <footer className="border-t border-border/50 bg-background/98 backdrop-blur-md">
    <div className="container-tight py-10 sm:py-14 md:py-16">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <img
            src="/samit_logo.png"
            alt="SamIT Technology"
            className="h-10 w-auto object-contain"
          />
          <div className="hidden sm:block">
            <div className="text-sm font-semibold tracking-tight text-foreground">SamIT Technology</div>
            <div className="mt-0.5 text-[11px] font-medium text-muted-foreground sm:text-xs">IT Training & Placement Institute</div>
          </div>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-9">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {[
            { Icon: Linkedin, label: "LinkedIn", href: import.meta.env.VITE_SOCIAL_LINKEDIN },
            { Icon: Instagram, label: "Instagram", href: import.meta.env.VITE_SOCIAL_INSTAGRAM },
            { Icon: Facebook, label: "Facebook", href: import.meta.env.VITE_SOCIAL_FACEBOOK },
          ].map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-11 w-11 place-items-center rounded-full border border-border/60 bg-card/70 text-muted-foreground shadow-soft transition-all duration-200 hover:border-primary/30 hover:bg-primary/12 hover:text-primary hover:shadow-float"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-border/45 pt-7 text-xs font-medium text-muted-foreground sm:mt-12 sm:pt-10 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} SamIT Technology. All rights reserved.</p>
        <p className="text-muted-foreground/90">Made with care for aspiring IT professionals.</p>
      </div>
    </div>
  </footer>
);
