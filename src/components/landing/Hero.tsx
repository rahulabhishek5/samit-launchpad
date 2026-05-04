import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

export const Hero = () => (
  <section id="top" className="relative overflow-hidden bg-hero">
    {/* Soft accent shapes */}
    <div
      aria-hidden
      className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-32 right-[-6rem] h-72 w-72 rounded-full bg-primary/10 blur-3xl"
    />

    <div className="container-tight relative py-24 md:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          IT Training & Placement Institute
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Learn the skills.{" "}
          <span className="text-primary">Land the job.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          SamIT Technology delivers job-oriented IT training with hands-on projects, expert
          mentors, and dedicated placement support — built to take you from learning to earning.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="group">
            <a href="#courses">
              Explore Courses
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#contact">Contact Us</a>
          </Button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Trusted by 2,000+ students · 95% placement assistance · Industry-led curriculum
        </p>
      </Reveal>
    </div>
  </section>
);
