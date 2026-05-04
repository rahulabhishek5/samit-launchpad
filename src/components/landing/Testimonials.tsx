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
  <section id="testimonials" aria-labelledby="testimonials-heading" className="py-20 md:py-28">
    <div className="container-tight">
      <Reveal>
        <SectionHeading
          eyebrow="Success Stories"
          title="Students who built careers with us"
          description="A few words from learners who walked in curious and walked out hired."
        />
        <h2 id="testimonials-heading" className="sr-only">Testimonials</h2>
      </Reveal>

      <Reveal className="mt-12">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.name} className="md:basis-1/2">
                <figure className="flex h-full flex-col rounded-lg border border-border bg-card p-7 shadow-soft">
                  <Quote className="h-6 w-6 text-primary/70" aria-hidden />
                  <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-6 border-t border-border pt-4">
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.course} · {t.company}
                    </div>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex items-center justify-center gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </Reveal>
    </div>
  </section>
);
