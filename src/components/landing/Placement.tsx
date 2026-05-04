import { CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  { title: "Resume Building", desc: "Tailored resumes that pass screening filters and highlight your projects." },
  { title: "Mock Interviews", desc: "Technical and HR rounds with structured feedback after each round." },
  { title: "Aptitude & Coding Prep", desc: "Daily practice on logical reasoning, DSA basics, and core CS topics." },
  { title: "Interview Drives", desc: "Direct interviews with our hiring partners and walk-in opportunities." },
  { title: "Offer & Onboarding", desc: "Negotiation guidance and onboarding support up to your first day." },
];

export const Placement = () => (
  <section id="placements" aria-labelledby="placements-heading" className="section-surface section-y">
    <div className="container-tight grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start lg:gap-20">
      <Reveal>
        <div className="rounded-3xl border border-border/50 bg-card/55 p-9 shadow-card backdrop-blur-md md:p-11">
          <span className="inline-block rounded-full border border-primary/18 bg-primary-soft/95 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary shadow-soft">
            Placement Support
          </span>
          <h2
            id="placements-heading"
            className="mt-6 text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl md:leading-[1.15]"
          >
            A career team that works with you, not just for you
          </h2>
          <p className="mt-6 text-base leading-[1.65] text-muted-foreground md:text-lg md:leading-relaxed">
            From the first resume draft to your final offer letter, our placement team partners with
            you across every step. We focus on consistent practice, honest feedback and connecting
            you to roles that match your skills.
          </p>
          <ul className="mt-9 space-y-4 text-sm font-medium leading-snug text-muted-foreground">
            {[
              "Dedicated placement officer for every batch",
              "Verified hiring partners across India",
              "Continuous support until you are placed",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="relative overflow-hidden rounded-3xl border border-border/55 bg-card/95 p-9 shadow-card backdrop-blur-sm md:p-11">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[2.125rem] top-12 bottom-16 w-px bg-gradient-to-b from-primary/45 via-border to-primary/15 md:left-[2.25rem]"
          />
          <ol className="relative space-y-9 pl-12 md:pl-14">
            {steps.map((step, idx) => (
              <li key={step.title} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[2.55rem] top-0.5 grid h-10 w-10 place-items-center rounded-2xl bg-primary text-xs font-bold text-primary-foreground shadow-soft md:-left-[2.85rem]"
                >
                  {idx + 1}
                </span>
                <h3 className="text-base font-semibold tracking-tight text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </div>
  </section>
);
