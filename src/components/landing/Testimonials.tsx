import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const testimonials = [
  {
    quote:
      "The mentors made complex topics feel simple. The mock interviews gave me the confidence to clear my final round.",
    name: "Priya Sharma",
    course: "Full Stack Java",
    company: "Placed at TCS",
  },
  {
    quote:
      "Hands-on projects made all the difference. I had real things to talk about in interviews instead of just theory.",
    name: "Arjun Verma",
    course: "Data Science",
    company: "Placed at Infosys",
  },
  {
    quote:
      "The placement team kept following up until I had an offer. That kind of support is rare.",
    name: "Sneha R.",
    course: "Selenium Automation",
    company: "Placed at Cognizant",
  },
  {
    quote:
      "Small batches meant I could ask questions freely. The DevOps labs were the best part of my training.",
    name: "Rahul Mehta",
    course: "DevOps Engineering",
    company: "Placed at Wipro",
  },
];

export const Testimonials = () => (
  <section id="testimonials" aria-labelledby="testimonials-heading" className="section-band section-y content-lazy">
    <div className="container-tight">
      <Reveal>
        <SectionHeading
          eyebrow="Success Stories"
          title="Students who built careers with us"
          description="A few words from learners who walked in curious and walked out hired."
        />
        <h2 id="testimonials-heading" className="sr-only">
          Testimonials
        </h2>
      </Reveal>

      <Reveal className="mt-16">
        <Carousel opts={{ align: "start", loop: true, duration: 22 }} className="w-full">
          <CarouselContent className="-ml-3 md:-ml-4">
            {testimonials.map((t) => (
              <CarouselItem key={t.name} className="pl-3 md:basis-1/2 md:pl-4">
                <figure className="flex h-full flex-col rounded-3xl border border-border/55 bg-gradient-to-b from-card via-card to-primary-soft/30 p-7 shadow-card backdrop-blur-sm transition-all duration-300 hover:border-primary/18 hover:shadow-elevated sm:p-8 md:p-10">
                  <Quote className="h-6 w-6 shrink-0 text-primary/75 sm:h-8 sm:w-8" aria-hidden />
                  <blockquote className="mt-5 flex-1 text-base font-medium leading-relaxed tracking-tight text-foreground sm:text-lg md:text-xl md:leading-relaxed">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3 border-t border-border/55 pt-6 sm:mt-10 sm:gap-4 sm:pt-8">
                    <span
                      aria-hidden
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/15 bg-primary-soft text-sm font-bold text-primary shadow-soft sm:h-12 sm:w-12 sm:text-base"
                    >
                      {t.name.trim().charAt(0)}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-foreground sm:text-base">{t.name}</div>
                      <div className="mt-0.5 text-[11px] font-medium leading-snug text-muted-foreground sm:mt-1 sm:text-xs">
                        {t.course} · {t.company}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-10 flex items-center justify-center gap-3">
            <CarouselPrevious className="static translate-y-0 rounded-full border-border/55 shadow-soft" />
            <CarouselNext className="static translate-y-0 rounded-full border-border/55 shadow-soft" />
          </div>
        </Carousel>
      </Reveal>
    </div>
  </section>
);
