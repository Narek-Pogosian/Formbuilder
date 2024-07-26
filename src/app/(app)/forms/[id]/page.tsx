import FormRenderer from "@/components/formrenderer";
import { formSchema } from "@/lib/schemas/form-schema";
import { getFormById } from "@/server/data-access/form";
import { notFound } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
  const form = await getFormById(params.id);
  if (!form) notFound();

  const { data } = formSchema.safeParse(
    JSON.parse(form?.content?.toString() ?? ""),
  );

  if (!data) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-8 text-xl font-bold">{form?.title}</h1>

      <FormRenderer form={data} />
    </div>
  );
}

export default page;
