"use client";

import { type FieldEditorProps, fieldRegistry } from "../registry";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { useInputFocus } from "../shared/use-input-focus";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import Editor from "../shared/editor";

export default function ParagraphFieldEditor({ fieldDefinition }: FieldEditorProps) {
  if (fieldDefinition.type !== "paragraph") throw new Error("Invalid field type");

  const inputRef = useInputFocus() as unknown as React.RefObject<HTMLTextAreaElement>;
  const paragraphFieldSchema = useMemo(
    () => fieldRegistry.get("paragraph").definitionSchema.omit({ id: true, type: true }),
    []
  );

  const form = useForm({
    resolver: zodResolver(paragraphFieldSchema),
    defaultValues: {
      text: fieldDefinition.text,
    },
  });

  const Icon = fieldRegistry.get("paragraph").icon;

  return (
    <Editor fieldDefinition={fieldDefinition} form={form} Icon={Icon}>
      <Controller
        name="text"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="paragraph-text">Paragraph text</FieldLabel>

            <FieldDescription>
              Add a block of text to give respondents context, instructions, or a reminder.
            </FieldDescription>

            <Textarea
              id="paragraph-text"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. Please review the information below before submitting."
              ref={inputRef}
            />

            {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
          </Field>
        )}
      />
    </Editor>
  );
}
