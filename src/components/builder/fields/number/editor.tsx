"use client";

import { type FieldEditorProps, fieldRegistry } from "../registry";
import { Field, FieldDescription, FieldError, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { useInputFocus } from "../shared/use-input-focus";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Editor from "../shared/editor";

export default function NumberFieldEditor({ fieldDefinition }: FieldEditorProps) {
  if (fieldDefinition.type !== "number") throw new Error("Invalid field type");

  const inputRef = useInputFocus();
  const numberFieldSchema = useMemo(
    () => fieldRegistry.get("number").definitionSchema.omit({ id: true, type: true }),
    []
  );

  const form = useForm({
    resolver: zodResolver(numberFieldSchema),
    defaultValues: {
      label: fieldDefinition.label,
      description: fieldDefinition.description,
      isRequired: fieldDefinition.isRequired,
      placeholder: fieldDefinition.placeholder,
      min: fieldDefinition.min,
      max: fieldDefinition.max,
    },
  });

  const Icon = fieldRegistry.get("number").icon;

  return (
    <Editor fieldDefinition={fieldDefinition} form={form} Icon={Icon}>
      <Controller
        name="label"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="number-label">Field label</FieldLabel>
            <FieldDescription>
              Ask for a numeric value, such as an age, quantity, or score.
            </FieldDescription>
            <Input
              id="number-label"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. Age"
              ref={inputRef}
            />
            {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
          </Field>
        )}
      />

      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="number-description">
              Description
              <span className="font-normal text-muted-foreground"> (optional)</span>
            </FieldLabel>
            <Textarea
              id="number-description"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="Optional guidance or context"
            />
            {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
          </Field>
        )}
      />

      <Controller
        name="placeholder"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="number-placeholder">
              Placeholder
              <span className="font-normal text-muted-foreground"> (optional)</span>
            </FieldLabel>
            <Input
              id="number-placeholder"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. 42"
            />
            {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
          </Field>
        )}
      />

      <div>
        <h3 className="text-sm font-semibold">Response settings</h3>
        <p className="mb-1 text-sm text-muted-foreground">
          Control how respondents can answer this field.
        </p>

        <div className="divide-y-2 rounded-lg border-2">
          <Controller
            name="isRequired"
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldLabel htmlFor="number-required">
                <Field
                  className="flex-row justify-between gap-4 p-4"
                  data-invalid={fieldState.invalid}
                >
                  <div className="space-y-1">
                    <FieldTitle>Required field</FieldTitle>
                    <FieldDescription>Respondents must provide a value.</FieldDescription>
                    {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
                  </div>
                  <Switch
                    id="number-required"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              </FieldLabel>
            )}
          />

          <div className="grid gap-4 p-4 sm:grid-cols-2">
            <Controller
              name="min"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="number-min">Minimum</FieldLabel>
                  <FieldDescription>Lowest value respondents can enter.</FieldDescription>
                  <Input
                    type="number"
                    id="number-min"
                    placeholder="0"
                    value={field.value ?? ""}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value === "" ? undefined : Number(event.target.value)
                      )
                    }
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
                </Field>
              )}
            />

            <Controller
              name="max"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="number-max">Maximum</FieldLabel>
                  <FieldDescription>Maximum value respondents can enter. </FieldDescription>
                  <Input
                    type="number"
                    id="number-max"
                    placeholder="100"
                    value={field.value ?? ""}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value === "" ? undefined : Number(event.target.value)
                      )
                    }
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
                </Field>
              )}
            />
          </div>
        </div>
      </div>
    </Editor>
  );
}
