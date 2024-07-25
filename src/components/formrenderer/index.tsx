"use client";

import { createValidationSchema } from "@/lib/utils/create-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/lib/schemas/form-schema";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function FormRenderer({ form }: { form: FormSchema }) {
  const schema = createValidationSchema(form);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<typeof schema>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: typeof schema) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {form.map((field) => {
        const label = field.label as keyof typeof schema;

        return (
          <div key={label}>
            <Label htmlFor={label} className="capitalize">
              {label}
            </Label>
            <Input id={label} type={field.type} {...register(label)} />
            {errors[label] && <span>{errors[label]?.message?.toString()}</span>}
          </div>
        );
      })}
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default FormRenderer;
