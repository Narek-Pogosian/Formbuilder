import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-lg border-2 bg-input px-2 text-sm font-medium placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 not-focus-visible:aria-invalid:border-danger-text",
        className
      )}
      {...props}
    />
  );
}

export { Input };
