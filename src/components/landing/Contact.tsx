import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Item = {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
  cta?: string;
};

const items: Item[] = [
  {
    icon: MapPin,
    label: "Visit us",
    value: "2nd Floor, Tech Park, MG Road, Bengaluru 560001",
    href: "https://maps.google.com/?q=MG+Road+Bengaluru",
    cta: "Get Directions",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    cta: "Call now",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@samittechnology.in",
    href: "mailto:hello@samittechnology.in",
    cta: "Send email",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with admissions",
    href: "https://wa.me/919876543210",
    cta: "Open WhatsApp",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Sat · 9:00 AM – 8:00 PM",
  },
];

export const Contact = () => (
  <section id="contact" aria-labelledby="contact-heading" className="section-surface section-y content-lazy">
    <div className="container-tight">
      <Reveal>
        <SectionHeading
          eyebrow="Contact"
          title="Talk to our admissions team"
          description="Reach out for course details, demo classes, or campus visits — we usually reply within a few hours."
        />
        <h2 id="contact-heading" className="sr-only">
          Contact SamIT Technology
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.label} delay={i * 60}>
            <Card className="group h-full border-border/55 bg-card/98 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/18 hover:shadow-elevated">
              <CardContent className="flex h-full flex-col p-6 sm:p-7 md:p-9">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/12 bg-primary-soft text-primary shadow-soft transition-all duration-300 group-hover:border-primary/22 group-hover:bg-primary/8 sm:h-14 sm:w-14">
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="mt-5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:mt-6 sm:text-xs">{item.label}</div>
                <div className="mt-1.5 text-sm font-semibold leading-snug text-foreground sm:mt-2 sm:text-base md:text-[17px]">{item.value}</div>
                {item.href && item.cta && (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="mt-6 inline-flex w-fit rounded-full text-sm font-semibold text-primary transition-colors hover:text-primary/85"
                  >
                    {item.cta} →
                  </a>
                )}
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
