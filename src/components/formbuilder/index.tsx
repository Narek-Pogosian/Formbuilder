"use client";

import { Button } from "../ui/button";
import { saveForm } from "@/server/actions/form";
import {
  type CreateFormSchema,
  createFormScema,
} from "@/lib/schemas/form-schema";
import { Input } from "../ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldAdder from "./field-adder";
import BaseBlock from "./blocks/base-block";
import NumberBlock from "./blocks/number-block";
import TextBlock from "./blocks/text-block";
import TextAreaBlock from "./blocks/textarea-block";

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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-full flex-col-reverse gap-8 max-lg:p-4 lg:flex-row lg:pl-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSaveForm)}
          className="w-full py-8"
        >
          <div className="bg-background-card mb-8 flex flex-col gap-2 rounded px-8 py-6 sm:flex-row sm:gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Title of your survey</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Story Survey" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="h-fit sm:mt-5" type="submit">
              Save Form
            </Button>
          </div>
          <div className="grid gap-10">
            {fields.map((field, i) => {
              if (field.type === "text")
                return (
                  <BaseBlock
                    key={field.id}
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
              if (field.type === "textarea")
                return (
                  <BaseBlock
                    key={field.id}
                    remove={remove}
                    swap={swap}
                    isLast={i === fields.length - 1}
                    index={i}
                    type="textarea"
                  >
                    <TextAreaBlock
                      key={field.id}
                      control={form.control}
                      index={i}
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
