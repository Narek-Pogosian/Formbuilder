"use client";

import { Button } from "../ui/button";
import { saveForm } from "@/server/actions/form";
import {
  type CreateFormSchema,
  createFormScema,
  MAX_LENGTH,
} from "@/lib/schemas/form-schema";
import { Input } from "../ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import NumberBlock from "./blocks/number-block";
import TextBlock from "./blocks/text-block";

function FormBuilder() {
  const form = useForm<CreateFormSchema>({
    resolver: zodResolver(createFormScema),
    defaultValues: {
      title: "",
      form: [],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "form",
  });

  function addTextField() {
    append({
      id: crypto.randomUUID(),
      type: "text",
      label: "",
      required: false,
      minLength: 1,
      maxLength: MAX_LENGTH,
    });
  }

  function addNumberField() {
    append({
      id: crypto.randomUUID(),
      type: "number",
      label: "",
      required: false,
      min: "",
      max: "",
    });
  }

  async function handleSaveForm(values: CreateFormSchema) {
    if (fields.length === 0) return;

    try {
      await saveForm(values);
      form.reset();
    } catch (error) {}
  }

  return (
    <>
      <div className="mb-8 flex gap-2">
        <Button onClick={addTextField}>Add Text Field</Button>
        <Button onClick={addNumberField}>Add Number Field</Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSaveForm)}>
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="h-fit" type="submit">
              Save Form
            </Button>
          </div>
          <div className="grid gap-10">
            {fields.map((field, i) => {
              if (field.type === "text")
                return (
                  <TextBlock control={form.control} index={i} key={field.id} />
                );
              if (field.type === "number")
                return (
                  <NumberBlock
                    control={form.control}
                    index={i}
                    key={field.id}
                  />
                );
            })}
          </div>
        </form>
      </Form>
    </>
  );
}

export default FormBuilder;
