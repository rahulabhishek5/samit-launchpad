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
  <section id="contact" aria-labelledby="contact-heading" className="bg-surface py-20 md:py-28">
    <div className="container-tight">
      <Reveal>
        <SectionHeading
          eyebrow="Contact"
          title="Talk to our admissions team"
          description="Reach out for course details, demo classes, or campus visits — we usually reply within a few hours."
        />
        <h2 id="contact-heading" className="sr-only">Contact SamIT Technology</h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.label} delay={i * 60}>
            <Card className="h-full border-border transition-all hover:-translate-y-0.5 hover:shadow-elevated">
              <CardContent className="flex h-full flex-col p-6">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-primary-soft text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </div>
                <div className="mt-1 text-base font-medium text-foreground">{item.value}</div>
                {item.href && item.cta && (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="mt-4 inline-flex w-fit text-sm font-medium text-primary hover:underline"
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
