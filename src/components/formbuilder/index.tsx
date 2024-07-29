"use client";

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { saveForm } from "@/server/actions/form";
import {
  formSchema,
  type FormSchema,
  MAX_LENGTH,
} from "@/lib/schemas/form-schema";
import { Input, InputControl } from "../ui/input";
import { Label } from "../ui/label";
import NumberBlock from "./blocks/number-block";
import TextBlock from "./blocks/text-block";

// TODO: Maybe use react-hook-form with useFieldArray or add better error messaging for fields.
function FormBuilder() {
  const titleRef = useRef<HTMLInputElement>(null);
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
    if (!titleRef.current) return;

    const title = titleRef.current.value.trim();
    if (!title) return titleRef.current.focus();
    if (fields.length === 0) return;

    const { data, success } = formSchema.safeParse(fields);
    if (!success) return;

    try {
      await saveForm({ title, form: data });
      setFields([]);
      titleRef.current.value = "";
    } catch (error) {}
  }

  return (
    <>
      <div className="mb-8 flex gap-2">
        <Button onClick={addTextField}>Add Text Field</Button>
        <Button onClick={addNumberField}>Add Number Field</Button>
      </div>

      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end">
        <InputControl className="grow">
          <Label htmlFor="title">Title</Label>
          <Input ref={titleRef} type="text" id="title" />
        </InputControl>
        <Button
          onClick={handleSaveForm}
          className="h-fit"
          disabled={fields.length === 0}
        >
          Save Form
        </Button>
      </div>

      <div className="grid gap-10">
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
