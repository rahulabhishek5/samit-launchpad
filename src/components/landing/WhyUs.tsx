import {
  BookOpenCheck,
  Briefcase,
  CalendarClock,
  GraduationCap,
  Hammer,
  Users,
} from "lucide-react";
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
  <section id="why-us" aria-labelledby="why-heading" className="py-20 md:py-28">
    <div className="container-tight">
      <Reveal>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built around outcomes, not just lectures"
          description="Every part of the program is designed to make you confident in interviews and effective on the job."
        />
        <h2 id="why-heading" className="sr-only">Why choose SamIT Technology</h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 60}>
            <div className="h-full rounded-lg border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-primary-soft text-primary">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
