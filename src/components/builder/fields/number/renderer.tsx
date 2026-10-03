"use client";

import { type FieldRendererProps } from "../registry";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function NumberFieldRenderer({ fieldDefinition, form }: FieldRendererProps) {
  if (fieldDefinition.type !== "number") return null;

  return (
    <Controller
      key={fieldDefinition.id}
      name={fieldDefinition.id}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={fieldDefinition.id}>{fieldDefinition.label}</FieldLabel>

          {fieldDefinition.description && (
            <FieldDescription>{fieldDefinition.description}</FieldDescription>
          )}

          <Input
            {...field}
            id={fieldDefinition.id}
            type="number"
            inputMode="decimal"
            step="any"
            min={fieldDefinition.min}
            max={fieldDefinition.max}
            value={field.value ?? ""}
            onChange={(event) => field.onChange(event.target.value)}
            aria-invalid={fieldState.invalid}
            placeholder={fieldDefinition.placeholder || "0"}
          />

          {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
        </Field>
      )}
    />
  );
}
