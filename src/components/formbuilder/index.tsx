"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { z } from "zod";

const Inputs = ["text", "number", "date"] as const;

const baseSchema = z.object({
  label: z.string(),
  type: z.enum(Inputs),
  required: z.boolean(),
});

const MAX_LENGTH = 300;
export const textSchema = baseSchema.extend({
  type: z.literal("text"),
  minLength: z.coerce.number().min(0).max(MAX_LENGTH).optional(),
  maxLength: z.coerce.number().min(0).max(MAX_LENGTH).optional(),
});

export const numberSchema = baseSchema.extend({
  type: z.literal("number"),
  min: z.coerce.number().optional(),
  max: z.coerce.number().optional(),
});

export const dateSchema = baseSchema.extend({
  type: z.literal("date"),
  minDate: z.string().optional(),
  maxDate: z.string().optional(),
});

const formSchema = z
  .array(z.discriminatedUnion("type", [textSchema, numberSchema, dateSchema]))
  .refine(
    (data) => {
      const labels = data.map((item) => item.label);
      const uniqueLabels = new Set(labels);
      return uniqueLabels.size === labels.length;
    },
    {
      message: "Labels must be unique",
      path: [],
    },
  );

export type FormSchema = z.infer<typeof formSchema>;
type InputType = (typeof Inputs)[number];

function FormBuilder() {
  const [fields, setFields] = useState<FormSchema>([]);

  function addField(type: InputType) {
    setFields([...fields, { type, label: "", required: false }]);
  }

  function handleLabelChange(label: string, i: number) {
    setFields(
      fields.map((field, index) => (i !== index ? field : { ...field, label })),
    );
  }

  function handleRequiredChange(checked: boolean, i: number) {
    setFields(
      fields.map((field, index) =>
        i !== index ? field : { ...field, required: checked },
      ),
    );
  }

  function handleMinLengthChange(val: string, i: number) {
    const num = parseInt(val);
    setFields(
      fields.map((field, index) =>
        i !== index
          ? field
          : { ...field, minLength: isNaN(num) ? undefined : num },
      ),
    );
  }

  function handleMaxLengthChange(val: string, i: number) {
    const num = parseInt(val);
    setFields(
      fields.map((field, index) =>
        i !== index
          ? field
          : { ...field, maxLength: isNaN(num) ? undefined : num },
      ),
    );
  }

  return (
    <div className="py-8">
      <div className="flex gap-2">
        <Button onClick={() => addField("text")}>Add Text Field</Button>
        <Button onClick={() => addField("number")}>Add Number Field</Button>
        <Button onClick={() => addField("date")}>Add Date Field</Button>
      </div>

      <div className="mt-4 grid gap-6">
        {fields.map((field, i) => (
          <div className="space-y-4 rounded border p-6" key={i}>
            <p className="mb-4 text-lg font-bold">
              {field.type === "text"
                ? "Text input"
                : field.type === "number"
                  ? "Number input"
                  : "Date Input"}
            </p>

            <label className="grid gap-0.5 text-sm font-semibold">
              Label
              <input
                type="text"
                className="rounded border px-2 py-1.5 font-normal"
                value={field.label}
                onChange={(e) => handleLabelChange(e.target.value, i)}
              />
            </label>
            <label className="flex items-center gap-1 text-sm font-semibold">
              Required
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => handleRequiredChange(e.target.checked, i)}
              />
            </label>
            {field.type === "text" && (
              <div className="flex gap-2">
                <label className="grid gap-0.5 text-sm font-semibold">
                  Min length
                  <input
                    type="number"
                    min={0}
                    max={MAX_LENGTH}
                    value={field.minLength?.toString() ?? 0}
                    onChange={(e) => handleMinLengthChange(e.target.value, i)}
                    className="rounded border px-2 py-1.5 font-normal"
                  />
                </label>
                <label className="grid gap-0.5 text-sm font-semibold">
                  Max length
                  <input
                    type="number"
                    min={0}
                    max={MAX_LENGTH}
                    value={field.maxLength?.toString() ?? MAX_LENGTH}
                    onChange={(e) => handleMaxLengthChange(e.target.value, i)}
                    className="rounded border px-2 py-1.5 font-normal"
                  />
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormBuilder;
