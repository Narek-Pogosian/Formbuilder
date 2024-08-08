"use client";

import { createValidationSchema } from "./create-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FormSchema } from "@/lib/schemas/form-schema";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

function FormRenderer({ form }: { form: FormSchema }) {
  const schema = createValidationSchema(form);
  const f = useForm<typeof schema>({
    resolver: zodResolver(schema),
    reValidateMode: "onSubmit",
  });

  function onSubmit(data: typeof schema) {
    console.log(data);
  }

  return (
    <Form {...f}>
      <form
        onSubmit={f.handleSubmit(onSubmit)}
        className="mx-auto grid max-w-3xl gap-10 py-4"
      >
        {form.map((formField) => {
          const label = formField.label as keyof typeof schema;

          if (formField.type === "text")
            return (
              <FormField
                key={label}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={formField.placeholder}
                        {...field}
                        value={field.value as string}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );

          if (formField.type === "number")
            return (
              <FormField
                key={label}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={formField.min}
                        max={formField.max}
                        placeholder={formField.min?.toString() ?? ""}
                        {...field}
                        value={field.value as number | string}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );

          if (formField.type === "textarea")
            return (
              <FormField
                key={label}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={formField.placeholder}
                        {...field}
                        rows={4}
                        value={field.value as string}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
        })}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default FormRenderer;
