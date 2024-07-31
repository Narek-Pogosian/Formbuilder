"use client";

import { Button } from "../ui/button";
import { saveForm } from "@/server/actions/form";
import {
  type CreateFormSchema,
  createFormScema,
} from "@/lib/schemas/form-schema";
import { Input } from "../ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldAdder from "./field-adder";
import NumberBlock from "./blocks/number-block";
import TextBlock from "./blocks/text-block";
import BaseBlock from "./blocks/base-block";

function FormBuilder() {
  const form = useForm<CreateFormSchema>({
    resolver: zodResolver(createFormScema),
    defaultValues: {
      title: "",
      form: [],
    },
  });

  const { fields, append, remove, swap } = useFieldArray({
    control: form.control,
    name: "form",
  });

  async function handleSaveForm(values: CreateFormSchema) {
    if (fields.length === 0) return;

    try {
      await saveForm(values);
      form.reset();
    } catch (error) {}
  }

  return (
    <div className="flex h-full flex-col-reverse gap-12 max-lg:p-4 lg:flex-row lg:pl-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSaveForm)}
          className="w-full py-8"
        >
          <div className="mb-8 flex flex-col gap-2 rounded bg-element p-4 sm:flex-row sm:items-end">
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
                  <BaseBlock
                    key={field.id}
                    control={form.control}
                    remove={remove}
                    swap={swap}
                    isLast={i === fields.length - 1}
                    index={i}
                    type="text"
                  >
                    <TextBlock
                      key={field.id}
                      control={form.control}
                      index={i}
                    />
                  </BaseBlock>
                );
              if (field.type === "number")
                return (
                  <BaseBlock
                    key={field.id}
                    control={form.control}
                    remove={remove}
                    swap={swap}
                    isLast={i === fields.length - 1}
                    index={i}
                    type="number"
                  >
                    <NumberBlock
                      control={form.control}
                      index={i}
                      key={field.id}
                    />
                  </BaseBlock>
                );
            })}
          </div>
        </form>
      </Form>

      <FieldAdder append={append} />
    </div>
  );
}

export default FormBuilder;
