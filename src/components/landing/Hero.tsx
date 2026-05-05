import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { TheInfiniteGrid } from "@/components/ui/the-infinite-grid";

export const Hero = () => (
  <section id="top" className="relative overflow-hidden">
    <TheInfiniteGrid className="min-h-[90svh] bg-background/70">
      <div className="container-tight relative py-24 md:py-32">
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
    </TheInfiniteGrid>
  </section>
);
