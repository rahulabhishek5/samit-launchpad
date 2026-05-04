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
      "max-w-2xl",
      align === "center" ? "mx-auto text-center" : "text-left",
      className,
    )}
  >
    {eyebrow && (
      <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-medium tracking-wide text-primary">
        {eyebrow}
      </span>
    )}
    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
        {description}
      </p>
    )}
  </div>
);
