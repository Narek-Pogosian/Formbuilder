import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-18 w-full min-w-0 rounded-lg border-2 border-input-border bg-input px-2 py-1.5 text-sm font-medium placeholder:text-input-placeholder disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 not-focus-visible:aria-invalid:border-danger-text",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
