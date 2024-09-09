import FormBuilder2 from "@/components/formbuilder2";
import FormbuilderProvider from "@/components/formbuilder2/context/formbuilder-context";
import { formSchema } from "@/lib/schemas/form-schema";
import { getServerAuthSession } from "@/server/auth";
import { getFormById } from "@/server/data-access/form";
import { notFound } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  const form = await getFormById(params.id);

  if (!form) notFound();
  if (form.isPublished) {
    return <div className="text-center font-semibold">Cannot edit a published survey.</div>;
  }
  if (session?.user.id !== form.userId) notFound();

  const { data, success } = formSchema.safeParse(JSON.parse(form?.content?.toString() ?? ""));

  if (!data || !success) notFound();

  return (
    <FormbuilderProvider mode="edit" defaultTitle={form.title} defaultFields={data}>
      <FormBuilder2 mode="edit" id={params.id} />
    </FormbuilderProvider>
  );
}

export default page;
