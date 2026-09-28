import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-ivory text-obsidian shadow-[0_0_0_1px_rgba(243,237,224,0.12)] hover:opacity-90",
        gold: "bg-gold text-obsidian hover:bg-gold-soft",
        ghost:
          "bg-transparent text-ivory shadow-[0_0_0_1px_rgba(243,237,224,0.16)] hover:bg-ivory/6",
        danger:
          "bg-transparent text-crimson shadow-[0_0_0_1px_rgba(179,58,58,0.45)] hover:bg-crimson/10",
      },
      size: {
        sm: "h-10 rounded-[var(--radius-sm)] px-3.5 text-sm",
        md: "h-11 rounded-[var(--radius-md)] px-5 text-sm",
        lg: "h-12 rounded-[var(--radius-md)] px-6 text-base",
        xl: "h-14 rounded-[var(--radius-lg)] px-8 text-base tracking-[0.18em]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
