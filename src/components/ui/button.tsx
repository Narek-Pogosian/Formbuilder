import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-80 aria-disabled:pointer-events-none aria-disabled:opacity-80",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ghost: "hover:bg-accent",
        outline: "border-2 hover:bg-accent bg-background-input",
        secondary: "bg-background-input shadow-highlight",
        danger:
          "bg-red-700 text-white focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        dangerOutline:
          "bg-red-600/10 border hover:bg-red-700/20 dark:hover:bg-red-600/30 dark:hover:text-red-100 border-red-600/20 text-red-900 dark:text-red-200 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      },
      size: {
        default: "px-4 py-2",
        sm: "rounded py-1.5 px-3 text-xs",
        lg: "rounded py-2 text-lg px-8",
        icon: "h-10 w-10",
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
