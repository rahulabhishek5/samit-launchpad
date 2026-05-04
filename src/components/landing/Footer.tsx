import { Github, Instagram, Linkedin } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#courses", label: "Courses" },
  { href: "#why-us", label: "Why Us" },
  { href: "#placements", label: "Placements" },
  { href: "#contact", label: "Contact" },
];

export const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="container-tight py-10">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground font-bold">
            S
          </span>
          <div>
            <div className="text-sm font-semibold">SamIT Technology</div>
            <div className="text-xs text-muted-foreground">IT Training & Placement Institute</div>
          </div>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {[
            { Icon: Linkedin, label: "LinkedIn", href: "#" },
            { Icon: Instagram, label: "Instagram", href: "#" },
            { Icon: Github, label: "GitHub", href: "#" },
          ].map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} SamIT Technology. All rights reserved.</p>
        <p>Made with care for aspiring IT professionals.</p>
      </div>
    </div>
  </footer>
);
