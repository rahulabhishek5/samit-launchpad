import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-tight ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:brightness-105 hover:shadow-elevated hover:-translate-y-0.5 active:brightness-95",
        destructive: "bg-destructive text-destructive-foreground shadow-soft hover:bg-destructive/90 hover:-translate-y-0.5",
        outline:
          "border border-border/80 bg-card/90 text-primary shadow-soft hover:border-primary/35 hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5 hover:shadow-float",
        secondary: "bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary/88 hover:-translate-y-0.5",
        ghost: "rounded-xl text-muted-foreground shadow-none hover:bg-muted/70 hover:text-primary hover:-translate-y-0",
        link: "rounded-none shadow-none text-primary underline-offset-4 hover:underline hover:translate-y-0 active:scale-100",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "min-h-[3.25rem] px-10 py-3 text-base",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
