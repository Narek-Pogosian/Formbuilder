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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Editor from "../shared/editor";

export default function DateTimeFieldEditor({ fieldDefinition }: FieldEditorProps) {
  if (fieldDefinition.type !== "dateTime") throw new Error("Invalid field type");

  const inputRef = useInputFocus();
  const dateTimeFieldSchema = useMemo(
    () => fieldRegistry.get("dateTime").definitionSchema.omit({ id: true, type: true }),
    []
  );

  const form = useForm({
    resolver: zodResolver(dateTimeFieldSchema),
    defaultValues: {
      label: fieldDefinition.label,
      description: fieldDefinition.description,
      isRequired: fieldDefinition.isRequired,
      placeholder: fieldDefinition.placeholder,
      mode: fieldDefinition.mode,
      min: fieldDefinition.min,
      max: fieldDefinition.max,
    },
  });

  const Icon = fieldRegistry.get("dateTime").icon;

  return (
    <Editor fieldDefinition={fieldDefinition} form={form} Icon={Icon}>
      <Controller
        name="label"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="date-time-label">Field label</FieldLabel>
            <FieldDescription>
              Ask respondents to provide a specific date, time, or date and time.
            </FieldDescription>
            <Input
              id="date-time-label"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. Appointment date"
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
            <FieldLabel htmlFor="date-time-description">
              Description
              <span className="font-normal text-muted-foreground"> (optional)</span>
            </FieldLabel>
            <Textarea
              id="date-time-description"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="Optional guidance or instructions"
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
              <FieldLabel htmlFor="date-time-required">
                <Field
                  className="flex-row justify-between gap-4 p-4"
                  data-invalid={fieldState.invalid}
                >
                  <div className="space-y-1">
                    <FieldTitle>Required field</FieldTitle>
                    <FieldDescription>Respondents must provide this value.</FieldDescription>
                    {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
                  </div>
                  <Switch
                    id="date-time-required"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              </FieldLabel>
            )}
          />

          <Controller
            name="mode"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="p-4">
                <FieldTitle>Field format</FieldTitle>
                <FieldDescription>
                  Choose whether respondents provide a date, a time, or both.
                </FieldDescription>
                <RadioGroup
                  id="date-time-mode"
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  className="mt-1 grid grid-cols-3 gap-2"
                >
                  {[
                    { value: "date", label: "Date" },
                    { value: "time", label: "Time" },
                    { value: "datetime-local", label: "Date and time" },
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

          <div className="grid gap-4 p-4 sm:grid-cols-2">
            <Controller
              name="min"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="date-time-min">Minimum</FieldLabel>
                  <FieldDescription>Earliest date or time respondents can enter.</FieldDescription>
                  <Input
                    id="date-time-min"
                    type={form.watch("mode")}
                    value={field.value ?? ""}
                    onChange={(event) => field.onChange(event.target.value || undefined)}
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
                  <FieldLabel htmlFor="date-time-max">Maximum</FieldLabel>
                  <FieldDescription>Latest date or time respondents can enter.</FieldDescription>
                  <Input
                    id="date-time-max"
                    type={form.watch("mode")}
                    value={field.value ?? ""}
                    onChange={(event) => field.onChange(event.target.value || undefined)}
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
