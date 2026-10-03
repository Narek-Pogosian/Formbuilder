"use client";

import { type FieldEditorProps, fieldRegistry } from "../registry";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { useInputFocus } from "../shared/use-input-focus";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import Editor from "../shared/editor";

export default function HeadingFieldEditor({ fieldDefinition }: FieldEditorProps) {
  if (fieldDefinition.type !== "heading") throw new Error("Invalid field type");

  const inputRef = useInputFocus();
  const headingFieldSchema = useMemo(
    () => fieldRegistry.get("heading").definitionSchema.omit({ id: true, type: true }),
    []
  );

  const form = useForm({
    resolver: zodResolver(headingFieldSchema),
    defaultValues: {
      text: fieldDefinition.text,
    },
  });

  const Icon = fieldRegistry.get("heading").icon;

  return (
    <Editor fieldDefinition={fieldDefinition} form={form} Icon={Icon}>
      <Controller
        name="text"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="heading-text">Heading text</FieldLabel>

            <FieldDescription>
              Keep it short and descriptive so respondents can quickly understand the section.
            </FieldDescription>

            <Input
              id="heading-text"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. Personal information"
              ref={inputRef}
            />

            {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
          </Field>
        )}
      />
    </Editor>
  );
}
