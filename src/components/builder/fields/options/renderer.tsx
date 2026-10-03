"use client";

import { type FieldRendererProps } from "../registry";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

export default function OptionsFieldRenderer({ form, fieldDefinition }: FieldRendererProps) {
  if (fieldDefinition.type !== "options") return null;

  return (
    <Controller
      key={fieldDefinition.id}
      name={fieldDefinition.id}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{fieldDefinition.label}</FieldLabel>

          {fieldDefinition.description && (
            <FieldDescription>{fieldDefinition.description}</FieldDescription>
          )}

          {fieldDefinition.multipleAnswers ? (
            <div className="mt-2 space-y-2">
              {fieldDefinition.options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 text-sm"
                  htmlFor={`renderer-${fieldDefinition.id}-${option.value}`}
                >
                  <Checkbox
                    id={`renderer-${fieldDefinition.id}-${option.value}`}
                    checked={Array.isArray(field.value) && field.value.includes(option.value)}
                    onCheckedChange={(checked) => {
                      const selected = Array.isArray(field.value) ? field.value : [];
                      field.onChange(
                        checked
                          ? [...selected, option.value]
                          : selected.filter((value) => value !== option.value)
                      );
                    }}
                  />
                  <span>{option.value}</span>
                </label>
              ))}
            </div>
          ) : (
            <RadioGroup
              id={`renderer-${fieldDefinition.id}`}
              value={String(field.value ?? "")}
              onValueChange={field.onChange}
              className="mt-2 flex flex-col"
            >
              {fieldDefinition.options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 text-sm"
                  htmlFor={`renderer-${fieldDefinition.id}-${option.value}`}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`renderer-${fieldDefinition.id}-${option.value}`}
                  />
                  <span>{option.value}</span>
                </label>
              ))}
            </RadioGroup>
          )}

          {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
        </Field>
      )}
    />
  );
}
