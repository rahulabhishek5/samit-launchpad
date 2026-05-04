import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const stats = [
  { value: "2,000+", label: "Students Trained" },
  { value: "25+", label: "Courses Offered" },
  { value: "150+", label: "Placement Partners" },
];

export const About = () => (
  <section id="about" aria-labelledby="about-heading" className="py-20 md:py-28">
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

      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="rounded-lg border border-border bg-card p-6 text-center shadow-soft transition-shadow hover:shadow-elevated">
              <div className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
