"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { saveForm } from "@/server/actions/form";
import {
  formSchema,
  FormSchema,
  InputType,
  MAX_LENGTH,
} from "@/lib/schemas/form-schema";

function FormBuilder() {
  const [title, setTitle] = useState("");
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

  async function handleSaveForm() {
    if (!title.trim()) return;
    if (fields.length === 0) return;
    const { success, data } = formSchema.safeParse(fields);

    if (success) {
      const res = await saveForm({ title, form: data });
      console.log(res);
    }
  }

  return (
    <div className="space-y-4 py-8">
      <div className="flex gap-2">
        <Button onClick={() => addField("text")}>Add Text Field</Button>
        <Button onClick={() => addField("number")}>Add Number Field</Button>
        <Button onClick={() => addField("date")}>Add Date Field</Button>
      </div>

      <label htmlFor="title" className="grid gap-0.5 text-sm font-semibold">
        Title
        <input
          type="text"
          id="title"
          className="rounded border px-2 py-1.5 font-normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <Button onClick={handleSaveForm}>Save Form</Button>

      <div className="grid gap-6">
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
