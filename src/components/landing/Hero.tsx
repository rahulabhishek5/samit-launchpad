import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { TheInfiniteGrid } from "@/components/ui/the-infinite-grid";

export const Hero = () => (
  <section id="top" className="relative overflow-hidden">
    <TheInfiniteGrid className="min-h-[85svh] bg-background/70 md:min-h-[90svh]">
      <div className="container-tight relative py-16 md:py-32">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/90 px-4 py-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground shadow-soft backdrop-blur-md sm:px-5 sm:py-2 sm:text-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
            IT Training & Placement Institute
          </span>
          <h1 className="mt-8 text-balance text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl md:mt-10 md:text-7xl md:leading-[1.06]">
            Learn the skills.{" "}
            <span className="bg-gradient-to-r from-primary via-[hsl(212_78%_46%)] to-[hsl(212_72%_38%)] bg-clip-text text-transparent">
              Land the job.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:mt-10 md:text-xl md:leading-relaxed">
            SamIT Technology delivers job-oriented IT training with hands-on projects, expert
            mentors, and dedicated placement support — built to take you from learning to earning.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:mt-12">
            <Button asChild size="lg" className="group w-full sm:w-auto sm:min-w-[210px] sm:px-11">
              <a href="#courses">
                Explore Courses
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto sm:min-w-[190px] sm:px-9">
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
          <p className="mt-10 text-xs font-medium tracking-[0.08em] text-muted-foreground/90">
            Trusted by 2,000+ students · 95% placement assistance · Industry-led curriculum
          </p>
        </Reveal>
      </div>
    </TheInfiniteGrid>
  </section>
);
