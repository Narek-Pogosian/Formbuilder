"use client";

import { type FieldRendererProps } from "../registry";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxFieldRenderer({ fieldDefinition, form }: FieldRendererProps) {
  if (fieldDefinition.type !== "checkbox") return null;

  return (
    <Controller
      key={fieldDefinition.id}
      name={fieldDefinition.id}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <label className="flex items-start gap-3" htmlFor={fieldDefinition.id}>
            <Checkbox
              id={fieldDefinition.id}
              checked={field.value === true}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              aria-invalid={fieldState.invalid}
            />

            <span className="flex-1">
              <FieldLabel htmlFor={fieldDefinition.id} className="cursor-pointer">
                {fieldDefinition.label}
              </FieldLabel>

              {fieldDefinition.description && (
                <FieldDescription>{fieldDefinition.description}</FieldDescription>
              )}
            </span>
          </label>

          {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
        </Field>
      )}
    />
  );
}
