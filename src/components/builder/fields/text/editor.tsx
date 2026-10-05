"use client";

import { type FieldEditorProps, fieldRegistry } from "../registry";
import { Field, FieldDescription, FieldError, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller, useForm } from "react-hook-form";
import { useInputFocus } from "../shared/use-input-focus";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useMemo } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import Editor from "../shared/editor";

export default function TextFieldEditor({ fieldDefinition }: FieldEditorProps) {
  if (fieldDefinition.type !== "text") throw new Error("Invalid field type");

  const inputRef = useInputFocus();
  const textFieldSchema = useMemo(
    () => fieldRegistry.get("text").definitionSchema.omit({ id: true, type: true }),
    []
  );

  const form = useForm({
    resolver: zodResolver(textFieldSchema),
    defaultValues: {
      label: fieldDefinition.label,
      isRequired: fieldDefinition.isRequired,
      longAnswer: fieldDefinition.longAnswer,
      placeholder: fieldDefinition.placeholder,
      description: fieldDefinition.description,
      validationRule: fieldDefinition.validationRule,
    },
  });

  const Icon = fieldRegistry.get("text").icon;
  const isLongAnswer = form.watch("longAnswer");

  return (
    <Editor fieldDefinition={fieldDefinition} form={form} Icon={Icon}>
      <Controller
        name="label"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="label">Field label</FieldLabel>

            <FieldDescription>
              This is the question or label shown above the field.
            </FieldDescription>

            <Input
              id="label"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. What is your name?"
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
              id="description"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. Please enter your full name as it appears on your ID."
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
            <FieldLabel htmlFor="placeholder">
              Placeholder
              <span className="font-normal text-muted-foreground"> (optional)</span>
            </FieldLabel>

            <FieldDescription>
              A short hint displayed inside the field before the user starts typing.
            </FieldDescription>

            <Input
              id="placeholder"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. Enter your name"
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
              <FieldLabel htmlFor="isRequired">
                <Field
                  className="flex-row justify-between gap-4 p-4"
                  data-invalid={fieldState.invalid}
                >
                  <div className="space-y-1">
                    <FieldTitle>Required field</FieldTitle>

                    <FieldDescription>
                      Respondents must provide an answer before submitting.
                    </FieldDescription>

                    {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
                  </div>

                  <Switch
                    id="isRequired"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              </FieldLabel>
            )}
          />

          <Controller
            name="longAnswer"
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldLabel htmlFor="longAnswer">
                <Field
                  className="flex-row justify-between gap-4 p-4"
                  data-invalid={fieldState.invalid}
                >
                  <div className="space-y-1">
                    <FieldTitle>Long answer</FieldTitle>

                    <FieldDescription>
                      Use a larger text area for longer responses.
                    </FieldDescription>

                    {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
                  </div>

                  <Switch
                    id="longAnswer"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              </FieldLabel>
            )}
          />

          {!isLongAnswer && (
            <Controller
              name="validationRule"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="p-4">
                  <FieldTitle>Validation</FieldTitle>

                  <FieldDescription>
                    Choose the format to enforce. This setting is ignored when long answer is
                    enabled.
                  </FieldDescription>

                  <RadioGroup
                    id="validationRule"
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="mt-1 flex gap-2"
                  >
                    {[
                      { value: "none", label: "Text" },
                      { value: "email", label: "Email" },
                      { value: "url", label: "URL" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex cursor-pointer items-center gap-3 rounded-md border-2 px-3 py-2 text-sm"
                        data-checked={field.value === option.value}
                      >
                        <RadioGroupItem value={option.value} className="shrink-0" />
                        <span className="flex-1">{option.label}</span>
                      </label>
                    ))}
                  </RadioGroup>

                  {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
                </Field>
              )}
            />
          )}
        </div>
      </div>
    </Editor>
  );
}
