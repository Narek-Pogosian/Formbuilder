import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset data-slot="field-set" className={cn("flex flex-col gap-3", className)} {...props} />
  );
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1.5 font-semibold data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className
      )}
      {...props}
    />
  );
}

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="field"
      className={cn("group/field flex w-full flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn("group-data-[invalid=true]/field:text-danger-text", className)}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-70",
        className
      )}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "-mt-0.5 text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance last:mt-0",
        className
      )}
      {...props}
    />
  );
}

function FieldError({
  className,
  children,
  error,
  ...props
}: React.ComponentProps<"div"> & {
  error: string | undefined;
}) {
  if (!error) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-normal text-danger-text", className)}
      {...props}
    >
      {error}
    </div>
  );
}

export { Field, FieldLabel, FieldDescription, FieldError, FieldLegend, FieldSet, FieldTitle };
