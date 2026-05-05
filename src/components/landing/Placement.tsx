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
  <section id="placements" aria-labelledby="placements-heading" className="section-surface section-y content-lazy">
    <div className="container-tight grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-20">
      <Reveal>
        <div className="rounded-3xl border border-border/50 bg-card/55 p-7 shadow-card backdrop-blur-md sm:p-9 md:p-11">
          <span className="inline-block rounded-full border border-primary/18 bg-primary-soft/95 px-3 py-1 text-[11px] font-semibold tracking-wide text-primary shadow-soft sm:px-4 sm:py-1.5 sm:text-xs">
            Placement Support
          </span>
          <h2
            id="placements-heading"
            className="mt-5 text-balance text-2xl font-semibold tracking-[-0.02em] text-foreground sm:mt-6 sm:text-3xl md:text-4xl md:leading-[1.15]"
          >
            A career team that works with you, not just for you
          </h2>
          <p className="mt-4 text-sm leading-[1.65] text-muted-foreground sm:mt-6 sm:text-base md:text-lg md:leading-relaxed">
            From the first resume draft to your final offer letter, our placement team partners with
            you across every step. We focus on consistent practice, honest feedback and connecting
            you to roles that match your skills.
          </p>
          <ul className="mt-7 space-y-3 text-xs font-medium leading-snug text-muted-foreground sm:mt-9 sm:space-y-4 sm:text-sm">
            {[
              "Dedicated placement officer for every batch",
              "Verified hiring partners across India",
              "Continuous support until you are placed",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2.5 sm:gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary sm:h-5 sm:w-5" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="relative overflow-hidden rounded-3xl border border-border/55 bg-card/95 p-7 shadow-card backdrop-blur-sm sm:p-9 md:p-11">
          <ol className="relative space-y-8 sm:space-y-9">
            {steps.map((step, idx) => (
              <li key={step.title} className="relative flex items-start gap-4 sm:gap-5">
                {idx !== steps.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute left-[1.125rem] top-10 bottom-[-2rem] w-px bg-gradient-to-b from-primary/45 via-border to-primary/15 sm:left-[1.375rem]"
                  />
                )}
                <span
                  aria-hidden
                  className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-primary text-xs font-bold text-primary-foreground shadow-soft sm:h-11 sm:w-11"
                >
                  {idx + 1}
                </span>
                <div className="pt-1.5 sm:pt-2.5">
                  <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm md:text-[15px]">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </div>
  </section>
);
