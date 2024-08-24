import FormBuilder from "@/components/formbuilder";
import { formSchema } from "@/lib/schemas/form-schema";
import { getFormById } from "@/server/data-access/form";
import { notFound } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
  const form = await getFormById(params.id);
  if (!form) notFound();

  const { data, success } = formSchema.safeParse(
    JSON.parse(form?.content?.toString() ?? ""),
  );

  if (!data || !success) notFound();

  return (
    <FormBuilder
      mode="edit"
      id={params.id}
      defaultTitle={form.title}
      defaultFields={data}
    />
  );
}

export default page;
