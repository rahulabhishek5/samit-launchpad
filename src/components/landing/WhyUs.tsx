import {
  BookOpenCheck,
  Briefcase,
  CalendarClock,
  GraduationCap,
  Hammer,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const items = [
  {
    icon: BookOpenCheck,
    title: "Industry-Aligned Curriculum",
    desc: "Updated regularly with hiring partners to match real role requirements.",
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
    className="bg-gradient-to-b from-background via-muted/35 to-background section-y"
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

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
        {items.map((it, i) => (
          <Reveal
            key={it.title}
            delay={i * 60}
            className={cn(i === 0 && "md:col-span-2 md:row-span-2")}
          >
            <div
              className={cn(
                "flex h-full flex-col rounded-3xl border border-border/55 bg-card/95 p-8 shadow-card backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/22 hover:shadow-elevated md:p-9",
                i === 0 &&
                  "min-h-[270px] bg-gradient-to-br from-primary-soft via-card to-card md:min-h-[340px] md:p-11",
              )}
            >
              <div>
                <div
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-2xl border border-primary/12 bg-primary-soft text-primary shadow-soft",
                    i === 0 && "h-16 w-16 rounded-[1.35rem]",
                  )}
                >
                  <it.icon className={cn("h-5 w-5", i === 0 && "h-8 w-8")} />
                </div>
                <h3
                  className={cn(
                    "mt-6 text-base font-semibold tracking-tight text-foreground md:text-lg",
                    i === 0 && "text-xl md:text-2xl",
                  )}
                >
                  {it.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px] md:leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
