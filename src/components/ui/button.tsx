import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg text-sm font-semibold transition-colors aria-disabled:pointer-events-none aria-disabled:opacity-70 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "bg-muted hover:bg-muted-hover aria-expanded:bg-muted-hover",
        danger: "bg-danger text-danger-foreground outline-danger-text hover:bg-danger-hover",
        ghost: "hover:bg-muted-hover aria-expanded:bg-muted",
      },
      size: {
        default: "h-9 gap-1.5 px-6 has-[>svg]:px-5",
        sm: "h-8 gap-1.5 px-5 has-[>svg]:px-4",
        lg: "h-10 px-7 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
