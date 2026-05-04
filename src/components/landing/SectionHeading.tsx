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
      <span className="inline-block rounded-full border border-primary/20 bg-primary-soft/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary shadow-soft">
        {eyebrow}
      </span>
    )}
    <h2 className="mt-6 text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-5xl md:leading-[1.12]">
      {title}
    </h2>
    {description && (
      <p
        className={cn(
          "mt-6 max-w-2xl text-balance text-base leading-[1.65] text-muted-foreground md:text-lg md:leading-relaxed",
          align === "center" && "md:mx-auto",
        )}
      >
        {description}
      </p>
    )}
  </div>
);
