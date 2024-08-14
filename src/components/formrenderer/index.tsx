"use client";

import { createValidationSchema } from "./create-validation";
import { type FormSchema } from "@/lib/schemas/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface FormRendererProps {
  form: FormSchema;
  mode?: "answer" | "preview";
}

function FormRenderer({ form, mode = "answer" }: FormRendererProps) {
  const schema = createValidationSchema(form);
  const f = useForm<typeof schema>({
    resolver: zodResolver(schema),
    reValidateMode: "onSubmit",
  });

  function onSubmit(data: typeof schema) {
    if (mode === "preview") {
      alert("Preview survey submitted withour errors");
      return;
    }

    console.log("data", data);
  }

  return (
    <Form {...f}>
      <form
        onSubmit={f.handleSubmit(onSubmit)}
        className="mx-auto grid w-full max-w-3xl gap-8 py-4"
      >
        {form.map((formField, i) => {
          const label = formField.label as keyof typeof schema;

          if (formField.type === "text")
            return (
              <FormField
                key={label + i.toString()}
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
                key={label + i.toString()}
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
                key={label + i.toString()}
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

          if (formField.type === "select")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value as string}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={formField.placeholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {formField.options.map((option) => (
                          <SelectItem value={option} key={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
