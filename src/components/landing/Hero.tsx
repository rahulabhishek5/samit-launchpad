import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

export const Hero = () => (
  <section id="top" className="relative overflow-hidden bg-hero">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-hero-dots opacity-[0.32]"
    />
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -left-24 top-0 h-[22rem] w-[22rem] rounded-full bg-primary/[0.11] blur-3xl" />
      <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-primary/[0.09] blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-[28rem] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-3xl" />
      <div className="absolute right-[12%] top-[38%] h-3 w-3 rounded-full bg-primary/35 shadow-[0_0_28px_hsl(var(--primary)/0.4)]" />
      <div className="absolute left-[18%] top-[52%] h-2 w-2 rounded-full bg-primary/25" />
      <div className="absolute right-[20%] bottom-[26%] h-28 w-28 rounded-[2rem] border border-primary/12 bg-background/45 backdrop-blur-md" />
      <div className="absolute left-[6%] top-[20%] h-[4.5rem] w-[4.5rem] rounded-3xl border border-primary/12 bg-primary-soft/35 backdrop-blur-md" />
    </div>

    <div className="container-tight relative py-32 md:py-40">
      <Reveal className="mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/90 px-5 py-2 text-xs font-semibold tracking-wide text-muted-foreground shadow-soft backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
          IT Training & Placement Institute
        </span>
        <h1 className="mt-10 text-balance text-5xl font-bold tracking-[-0.03em] text-foreground sm:text-6xl md:text-7xl md:leading-[1.06]">
          Learn the skills.{" "}
          <span className="bg-gradient-to-r from-primary via-[hsl(212_78%_46%)] to-[hsl(212_72%_38%)] bg-clip-text text-transparent">
            Land the job.
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:mt-10 md:text-xl md:leading-relaxed">
          SamIT Technology delivers job-oriented IT training with hands-on projects, expert
          mentors, and dedicated placement support — built to take you from learning to earning.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Button asChild size="lg" className="group min-w-[210px] px-11">
            <a href="#courses">
              Explore Courses
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-w-[190px] px-9">
            <a href="#contact">Contact Us</a>
          </Button>
        </div>
        <p className="mt-10 text-xs font-medium tracking-[0.08em] text-muted-foreground/90">
          Trusted by 2,000+ students · 95% placement assistance · Industry-led curriculum
        </p>
      </Reveal>
    </div>
  </section>
);
