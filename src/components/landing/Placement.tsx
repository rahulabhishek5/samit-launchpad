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
  <section id="placements" aria-labelledby="placements-heading" className="bg-surface py-20 md:py-28">
    <div className="container-tight grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
      <Reveal>
        <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-medium tracking-wide text-primary">
          Placement Support
        </span>
        <h2
          id="placements-heading"
          className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl"
        >
          A career team that works with you, not just for you
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          From the first resume draft to your final offer letter, our placement team partners with
          you across every step. We focus on consistent practice, honest feedback and connecting
          you to roles that match your skills.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
          {[
            "Dedicated placement officer for every batch",
            "Verified hiring partners across India",
            "Continuous support until you are placed",
          ].map((point) => (
            <li key={point} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={120}>
        <ol className="relative space-y-6 border-l border-border pl-6">
          {steps.map((step, idx) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden
                className="absolute -left-[31px] top-1 grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-soft"
              >
                {idx + 1}
              </span>
              <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  </section>
);
