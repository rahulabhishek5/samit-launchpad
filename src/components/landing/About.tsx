import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const stats = [
  { value: "2,000+", label: "Students Trained" },
  { value: "40+", label: "Courses Offered" },
  { value: "150+", label: "Placement Partners" },
];

export const About = () => (
  <section id="about" aria-labelledby="about-heading" className="section-muted section-y">
    <div className="container-tight">
      <Reveal>
        <SectionHeading
          eyebrow="About Us"
          title="A practical institute for real-world IT careers"
          description="SamIT Technology is built around one mission: prepare students with industry-ready skills and place them in meaningful tech roles. Our programs blend structured learning, live projects, and personal mentoring."
        />
        <h2 id="about-heading" className="sr-only">
          About SamIT Technology
        </h2>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-3 sm:mt-16 sm:gap-6">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="rounded-2xl border border-border/55 bg-card/95 p-5 text-center shadow-card backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/18 hover:shadow-elevated sm:rounded-3xl sm:p-8 md:p-9">
              <div className="text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-[2.15rem]">{s.value}</div>
              <div className="mt-1.5 text-[11px] font-medium leading-snug text-muted-foreground sm:mt-3 sm:text-sm">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
