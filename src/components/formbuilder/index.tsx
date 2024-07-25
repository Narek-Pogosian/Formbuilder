"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { saveForm } from "@/server/actions/form";
import {
  formSchema,
  type FormSchema,
  MAX_LENGTH,
} from "@/lib/schemas/form-schema";
import TextBlock from "./blocks/text-block";
import NumberBlock from "./blocks/number-block";

function FormBuilder() {
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState<FormSchema>([]);

  function addTextField() {
    setFields([
      ...fields,
      {
        id: crypto.randomUUID(),
        type: "text",
        label: "",
        required: false,
        minLength: 1,
        maxLength: MAX_LENGTH,
      },
    ]);
  }

  function addNumberField() {
    setFields([
      ...fields,
      {
        id: crypto.randomUUID(),
        type: "number",
        label: "",
        required: false,
        min: undefined,
        max: undefined,
      },
    ]);
  }

  async function handleSaveForm() {
    if (!title.trim()) return;
    if (fields.length === 0) return;

    const { success, data } = formSchema.safeParse(fields);
    if (!success) return;

    try {
      await saveForm({ title, form: data });
      setFields([]);
      setTitle("");
    } catch (error) {}
  }

  return (
    <div className="space-y-4 py-8">
      <div className="flex gap-2">
        <Button onClick={addTextField}>Add Text Field</Button>
        <Button onClick={addNumberField}>Add Number Field</Button>
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
        {fields.map((field) => {
          if (field.type === "text")
            return (
              <TextBlock field={field} setFields={setFields} key={field.id} />
            );

          if (field.type === "number")
            return (
              <NumberBlock field={field} setFields={setFields} key={field.id} />
            );
        })}
      </div>
    </div>
  );
}

export default FormBuilder;
