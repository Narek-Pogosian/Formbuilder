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
import { Label } from "../ui/label";
import { Input, InputControl } from "../ui/input";

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
    <>
      <div className="mb-8 flex gap-2">
        <Button onClick={addTextField}>Add Text Field</Button>
        <Button onClick={addNumberField}>Add Number Field</Button>
      </div>

      <div className="mb-8 flex items-end gap-4">
        <InputControl className="grow">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputControl>
        <Button onClick={handleSaveForm} className="h-fit">
          Save Form
        </Button>
      </div>

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
    </>
  );
}

export default FormBuilder;
