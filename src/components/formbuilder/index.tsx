"use client";

import { formSchema, type FormSchema } from "@/lib/schemas/form-schema";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import FieldAdder from "./field-adder";
import FieldsList from "./fields-list";

function FormBuilder() {
  const [fields, setFields] = useState<FormSchema>([]);
  const [title, setTitle] = useState("");

  function append(field: FormSchema[number]) {
    setFields([...fields, field]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const { error } = formSchema.safeParse(fields);
    console.log("error", error?.errors);
  }

  return (
    <div className="flex h-full flex-col-reverse gap-8 max-lg:p-4 lg:flex-row lg:pl-8">
      <form className="grow space-y-4 py-8" onSubmit={handleSubmit}>
        <div className="mb-8 flex flex-col gap-2 rounded bg-background-card px-8 py-6 sm:flex-row sm:gap-4">
          <div className="grow">
            <Label>
              Title of survey
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My survey"
              />
            </Label>
          </div>
          <Button className="h-fit sm:mt-[22px]" type="submit">
            Save
          </Button>
        </div>
        <FieldsList fields={fields} setFields={setFields} />
      </form>
      <FieldAdder append={append} />
    </div>
  );
}

export default FormBuilder;
