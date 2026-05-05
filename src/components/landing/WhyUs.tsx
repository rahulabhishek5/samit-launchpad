import {
  BookOpenCheck,
  Briefcase,
  CalendarClock,
  GraduationCap,
  Hammer,
  Users,
} from "lucide-react";
import TestimonialSection from "@/components/ui/testimonial";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const items = [
  {
    icon: BookOpenCheck,
    title: "Built for Job Readiness",
    desc: "Our program is structured around the exact skills students need to move from learning to placement — clear concepts, guided practice, real projects, interview preparation, and mentor feedback.",
    highlights: [
      "Curriculum aligned with current hiring expectations",
      "Practice through assignments, labs, and guided projects",
      "Mock interviews and resume feedback from mentors",
      "Support focused on confidence, communication, and placement",
    ],
  },
  {
    icon: Hammer,
    title: "Hands-on Projects",
    desc: "Build portfolio-ready projects that show employers what you can do.",
  },
  {
    icon: GraduationCap,
    title: "Expert Mentors",
    desc: "Learn from working professionals with years of industry experience.",
  },
  {
    icon: Users,
    title: "Small Batches",
    desc: "Personal attention and active learning instead of crowded classrooms.",
  },
  {
    icon: Briefcase,
    title: "Placement Support",
    desc: "Resume reviews, mock interviews, and direct interview drives.",
  },
  {
    icon: CalendarClock,
    title: "Flexible Timing",
    desc: "Weekday, weekend and online batches that fit student schedules.",
  },
];

export const WhyUs = () => (
  <section
    id="why-us"
    aria-labelledby="why-heading"
    className="section-y bg-gradient-to-b from-background via-muted/25 to-background py-16 md:py-24"
  >
    <div className="container-tight">
      <Reveal>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built around outcomes, not just lectures"
          description="Every part of the program is designed to make you confident in interviews and effective on the job."
        />
        <h2 id="why-heading" className="sr-only">
          Why choose SamIT Technology
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {items.map((it, i) => {
          const isFeatured = i === 0;

          return (
            <Reveal
              key={it.title}
              delay={i * 60}
              className={cn(isFeatured && "sm:col-span-2 lg:col-span-2 lg:row-span-2")}
            >
              <div
                className={cn(
                  "flex h-full flex-col rounded-3xl border border-border/55 bg-card/95 p-5 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/22 hover:shadow-elevated sm:p-6 lg:p-8",
                  isFeatured &&
                    "bg-gradient-to-br from-primary-soft via-card to-card sm:min-h-[250px] lg:min-h-[300px] lg:p-9"
                )}
              >
                <div
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-2xl border border-primary/12 bg-primary-soft text-primary shadow-soft sm:h-12 sm:w-12",
                    isFeatured && "sm:h-14 sm:w-14 sm:rounded-[1.25rem]"
                  )}
                >
                  <it.icon className={cn("h-4 w-4 sm:h-5 sm:w-5", isFeatured && "sm:h-7 sm:w-7")} />
                </div>

                <div className={cn("mt-4", isFeatured && "sm:mt-5")}>
                  <h3
                    className={cn(
                      "text-sm font-semibold tracking-tight text-foreground sm:text-base lg:text-lg",
                      isFeatured && "text-base sm:text-xl lg:text-2xl"
                    )}
                  >
                    {it.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm lg:text-[15px]">
                    {it.desc}
                  </p>

                  {isFeatured && it.highlights && (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {it.highlights.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 rounded-2xl border border-border/50 bg-background/35 p-3 text-xs leading-relaxed text-foreground/80 backdrop-blur-sm sm:text-sm"
                        >
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-8 lg:mt-12">
        <div className="rounded-3xl border border-border/60 bg-surface/40 p-4 sm:p-5 lg:p-8">
          <TestimonialSection />
        </div>
      </Reveal>
    </div>
  </section>
);