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

export default function CheckboxFieldEditor({ fieldDefinition }: FieldEditorProps) {
  if (fieldDefinition.type !== "checkbox") throw new Error("Invalid field type");

  const inputRef = useInputFocus();
  const checkboxFieldSchema = useMemo(
    () => fieldRegistry.get("checkbox").definitionSchema.omit({ id: true, type: true }),
    []
  );

  const form = useForm({
    resolver: zodResolver(checkboxFieldSchema),
    defaultValues: {
      label: fieldDefinition.label,
      description: fieldDefinition.description,
      isRequired: fieldDefinition.isRequired,
    },
  });

  const Icon = fieldRegistry.get("checkbox").icon;

  return (
    <Editor fieldDefinition={fieldDefinition} form={form} Icon={Icon}>
      <Controller
        name="label"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="checkbox-label">Field label</FieldLabel>
            <FieldDescription>
              This text sits next to the checkbox and tells respondents what they are agreeing to.
            </FieldDescription>
            <Input
              id="checkbox-label"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. I agree to the terms and conditions"
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
            <FieldLabel htmlFor="description">
              Description
              <span className="font-normal text-muted-foreground"> (optional)</span>
            </FieldLabel>

            <FieldDescription>
              Add additional context or instructions to help respondents answer this question.
            </FieldDescription>

            <Textarea
              id="checkbox-description"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="Optional explanation"
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

        <Controller
          name="isRequired"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldLabel htmlFor="checkbox-required">
              <Field
                className="flex-row justify-between gap-4 rounded-lg border-2 p-4"
                data-invalid={fieldState.invalid}
              >
                <div className="space-y-1">
                  <FieldTitle>Required field</FieldTitle>
                  <FieldDescription>
                    Respondents must confirm this before submitting.
                  </FieldDescription>
                  {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
                </div>
                <Switch
                  id="checkbox-required"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />
              </Field>
            </FieldLabel>
          )}
        />
      </div>
    </Editor>
  );
}
