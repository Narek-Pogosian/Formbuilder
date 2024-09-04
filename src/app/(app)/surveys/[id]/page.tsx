import FormRenderer from "@/components/formrenderer";
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
    <>
      <h1 className="mb-4 text-center text-3xl font-bold">{form?.title}</h1>
      <FormRenderer mode="preview" form={data} />
    </>
  );
}

export default page;
