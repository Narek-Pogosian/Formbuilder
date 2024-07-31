"use client";

import { createValidationSchema } from "@/lib/utils/create-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FormSchema } from "@/lib/schemas/form-schema";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

function FormRenderer({ form }: { form: FormSchema }) {
  const schema = createValidationSchema(form);
  const f = useForm<typeof schema>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: typeof schema) {
    console.log(data);
  }

  return (
    <Form {...f}>
      <form onSubmit={f.handleSubmit(onSubmit)} className="grid gap-8">
        {form.map((formField) => {
          const label = formField.label as keyof typeof schema;

          // OLD
          // <div key={label}>
          //   <Input id={label} type={formField.type} {...f.register(label)} />
          // </div>;

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
                        placeholder=""
                        {...field}
                        value={field.value as string}
                      />
                    </FormControl>
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
                        placeholder=""
                        {...field}
                        value={field.value as number | string}
                      />
                    </FormControl>
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
