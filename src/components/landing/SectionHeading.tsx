import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) => (
  <div
    className={cn(
      "max-w-3xl",
      align === "center" ? "mx-auto text-center" : "text-left",
      className,
    )}
  >
    {eyebrow && (
      <span className="inline-block rounded-full border border-primary/20 bg-primary-soft/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-primary shadow-soft sm:px-4 sm:py-1.5 sm:text-xs">
        {eyebrow}
      </span>
    )}
    <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl md:mt-6 md:text-5xl md:leading-[1.12]">
      {title}
    </h2>
    {description && (
      <p
        className={cn(
          "mt-4 max-w-2xl text-balance text-sm leading-[1.65] text-muted-foreground sm:text-base md:mt-6 md:text-lg md:leading-relaxed",
          align === "center" && "md:mx-auto",
        )}
      >
        {description}
      </p>
    )}
  </div>
);
