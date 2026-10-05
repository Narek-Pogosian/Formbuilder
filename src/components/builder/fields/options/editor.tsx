"use client";

import { type FieldEditorProps, fieldRegistry } from "../registry";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useInputFocus } from "../shared/use-input-focus";
import { Plus, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import Editor from "../shared/editor";

export default function OptionsFieldEditor({ fieldDefinition }: FieldEditorProps) {
  if (fieldDefinition.type !== "options") throw new Error("Invalid field type");

  const inputRef = useInputFocus();
  const optionsFieldSchema = useMemo(
    () => fieldRegistry.get("options").definitionSchema.omit({ id: true, type: true }),
    []
  );

  const form = useForm({
    resolver: zodResolver(optionsFieldSchema),
    defaultValues: {
      label: fieldDefinition.label,
      isRequired: fieldDefinition.isRequired,
      multipleAnswers: fieldDefinition.multipleAnswers,
      options: fieldDefinition.options,
    },
  });

  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const Icon = fieldRegistry.get("options").icon;

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
              placeholder="e.g. How did you hear about?"
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
              placeholder="e.g. Please select an option"
            />

            {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
          </Field>
        )}
      />

      <FieldSet>
        <FieldLegend variant="label" className="mb-0.5">
          Options
        </FieldLegend>

        <FieldDescription>Add the choices respondents can select from.</FieldDescription>

        <div className="-mt-2.5">
          <div className="space-y-2">
            {options.map((option, index) => (
              <Controller
                key={option.id}
                name={`options.${index}`}
                control={form.control}
                render={({ field: controllerField, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <Input
                          aria-label={`Option ${index + 1}`}
                          aria-invalid={fieldState.invalid}
                          placeholder={`Option ${index + 1}`}
                          value={controllerField.value.value}
                          onChange={(e) =>
                            controllerField.onChange({
                              value: e.target.value,
                            })
                          }
                        />

                        {fieldState.invalid && (
                          // @ts-expect-error error.value is not typed correctly in react-hook-form
                          <FieldError className="mt-1" error={fieldState.error?.value?.message} />
                        )}
                      </div>

                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="hover:text-destructive shrink-0 text-muted-foreground"
                        aria-label={`Remove option ${index + 1}`}
                        title={`Remove option ${index + 1}`}
                        onClick={() => remove(index)}
                        disabled={options.length <= 1}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </Field>
                )}
              />
            ))}
          </div>

          <Button
            size="sm"
            type="button"
            className="mt-4 text-xs"
            variant="secondary"
            onClick={() => append({ value: "" })}
          >
            <Plus />
            Add option
          </Button>
        </div>
      </FieldSet>

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
            name="multipleAnswers"
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldLabel htmlFor="multipleAnswers">
                <Field
                  className="flex-row justify-between gap-4 p-4"
                  data-invalid={fieldState.invalid}
                >
                  <div className="space-y-1">
                    <FieldTitle>Multiple answers</FieldTitle>

                    <FieldDescription>Respondents can select multiple options.</FieldDescription>

                    {fieldState.invalid && <FieldError error={fieldState.error?.message} />}
                  </div>

                  <Switch
                    id="multipleAnswers"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              </FieldLabel>
            )}
          />
        </div>
      </div>
    </Editor>
  );
}
