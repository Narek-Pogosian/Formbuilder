import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "@/lib/utils";

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer group/switch border-border-input relative inline-flex h-4.5 w-8 shrink-0 grow-0 items-center rounded-full border-2 transition-all after:absolute after:-inset-x-3 after:-inset-y-2 aria-invalid:border-danger-text data-checked:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-70 data-unchecked:bg-input",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-3.5 rounded-full bg-primary ring-0 transition-transform data-checked:translate-x-full data-checked:bg-primary-foreground"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
