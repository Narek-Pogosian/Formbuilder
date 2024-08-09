"use client";

import { type FormSchema } from "@/lib/schemas/form-schema";
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

  return (
    <div className="flex h-full flex-col-reverse gap-8 max-lg:p-4 lg:flex-row lg:pl-8">
      <form className="grow space-y-4 py-8">
        <div className="mb-8 flex flex-col gap-2 rounded bg-background-card px-8 py-6 sm:flex-row sm:gap-4">
          <div className="grow">
            <Label htmlFor="title">Title of survey</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </div>
          <Button className="h-fit sm:mt-5" type="submit">
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
