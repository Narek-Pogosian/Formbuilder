"use client";

import { type FieldRendererProps } from "../registry";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function TextFieldRenderer({ fieldDefinition, form }: FieldRendererProps) {
  if (fieldDefinition.type !== "text") return null;

  const defaultPlaceholder = (() => {
    if (fieldDefinition.placeholder) return fieldDefinition.placeholder;

    switch (fieldDefinition.validationRule) {
      case "email":
        return "name@example.com";
      case "url":
        return "https://example.com";
      default:
        return "Your answer";
    }
  })();

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

          {fieldDefinition.longAnswer ? (
            <Textarea
              {...field}
              id={fieldDefinition.id}
              aria-invalid={fieldState.invalid}
              placeholder={fieldDefinition.placeholder || "Your answer"}
            />
          ) : (
            <Input
              {...field}
              id={fieldDefinition.id}
              aria-invalid={fieldState.invalid}
              placeholder={defaultPlaceholder}
            />
          )}

          {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
        </Field>
      )}
    />
  );
}
