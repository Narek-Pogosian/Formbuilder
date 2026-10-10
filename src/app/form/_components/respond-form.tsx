"use client";

import { fieldRegistry, type FormDefinitions } from "@/components/builder/fields/registry";
import { createValidationSchema } from "@/components/builder/lib/create-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { respondToFormAction } from "@/server/actions/responses";

export default function RespondForm({
  fields,
  formId,
}: {
  fields: FormDefinitions;
  formId: number;
}) {
  const { schema, defaultValues } = useMemo(() => createValidationSchema(fields), [fields]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const router = useRouter();
  const { execute, isPending, result } = useAction(respondToFormAction, {
    onSuccess: () => {
      router.replace("/form/success");
    },
  });

  function onSubmit(data: unknown) {
    if (isPending) return;

    execute({ formId, answers: JSON.stringify(data) });
  }

  return (
    <form autoComplete="off" className="space-y-10" onSubmit={form.handleSubmit(onSubmit)}>
      {fields.map((field) => {
        const Renderer = fieldRegistry.get(field.type).Renderer;
        return <Renderer key={field.id} form={form} fieldDefinition={field} />;
      })}

      <Button type="submit" aria-disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
