"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  name: string;
  title: string;
  quote?: string;
  avatarSrc: string;
  rating: number;
}

export interface ClientsSectionProps {
  tagLabel: string;
  title: string;
  description: string;
  stats: Stat[];
  testimonials: Testimonial[];
  primaryActionLabel: string;
  secondaryActionLabel: string;
  className?: string;
}

const StatCard = ({ value, label }: Stat) => (
  <Card className="rounded-xl border-border bg-muted/40 text-center">
    <CardContent className="p-4">
      <p className="text-3xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </CardContent>
  </Card>
);

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const StickyTestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  return (
    <motion.div className="sticky w-full" style={{ top: `${20 + index * 24}px` }}>
      <div className={cn("flex h-auto w-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft")}>
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 rounded-xl">
            <AvatarImage
              src={testimonial.avatarSrc}
              alt={testimonial.name}
              loading="lazy"
              decoding="async"
              className="rounded-xl object-cover"
            />
            <AvatarFallback className="rounded-xl bg-muted text-muted-foreground">
              {getInitials(testimonial.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="text-lg font-semibold text-foreground">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
          </div>
        </div>

        <div className="my-4 flex items-center gap-2">
          <span className="text-base font-bold text-foreground">{testimonial.rating.toFixed(1)}</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(testimonial.rating) ? "fill-primary text-primary" : "text-muted-foreground/35",
                )}
              />
            ))}
          </div>
        </div>

        {testimonial.quote && <p className="text-base text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>}
      </div>
    </motion.div>
  );
};

export const ClientsSection = ({
  tagLabel,
  title,
  description,
  stats,
  testimonials,
  primaryActionLabel,
  secondaryActionLabel,
  className,
}: ClientsSectionProps) => {
  const scrollContainerHeight = `calc(100vh + ${testimonials.length * 100}px)`;

  return (
    <section className={cn("w-full bg-background py-20 text-foreground md:py-28", className)}>
      <div className="container mx-auto grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6 lg:sticky lg:top-20">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-muted/50 px-3 py-1 text-sm">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-muted-foreground">{tagLabel}</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4">
            <Button variant="outline" size="lg" className="rounded-full">
              {secondaryActionLabel}
            </Button>
            <Button size="lg" className="rounded-full">
              {primaryActionLabel}
            </Button>
          </div>
        </div>

        <div className="relative flex flex-col gap-4" style={{ height: scrollContainerHeight }}>
          {testimonials.map((testimonial, index) => (
            <StickyTestimonialCard key={testimonial.name} index={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};
