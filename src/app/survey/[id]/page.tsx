import FormRenderer from "@/components/formrenderer";
import { formSchema } from "@/lib/schemas/form-schema";
import { getFormById } from "@/server/data-access/form";
import { notFound } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
  console.log("hello");
  const form = await getFormById(params.id);
  if (!form) notFound();

  const { data, success } = formSchema.safeParse(
    JSON.parse(form?.content?.toString() ?? ""),
  );

  if (!data || !success) notFound();

  return (
    <>
      <h1 className="text-center text-3xl font-bold">{form?.title}</h1>
      <FormRenderer mode="answer" id={params.id} form={data} />
    </>
  );
}

export default page;
