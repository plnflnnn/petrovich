import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const pillVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 active:scale-98",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white shadow-sm hover:bg-accent-hover hover:shadow-md",
        secondary:
          "bg-accent text-white shadow-sm hover:bg-accent-hover hover:shadow-md",
        ghost:
          "bg-transparent text-text hover:bg-black/4",
        outline:
          "border border-neutral bg-white text-text hover:border-accent hover:text-accent",
        inverse:
          "bg-white text-primary shadow-sm hover:bg-white/95",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-8 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof pillVariants> & {
    asChild?: boolean;
  };

export function PillButton({
  className,
  variant,
  size,
  asChild = false,
  type,
  ...props
}: PillButtonProps) {
  const Comp = asChild ? Slot : "button";
  const buttonType = asChild ? undefined : (type ?? "button");
  return (
    <Comp
      className={cn(pillVariants({ variant, size, className }))}
      {...(buttonType ? { type: buttonType } : {})}
      {...props}
    />
  );
}
