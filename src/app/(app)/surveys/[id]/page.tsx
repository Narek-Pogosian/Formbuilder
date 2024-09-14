import { formSchema } from "@/lib/schemas/form-schema";
import { getFormById } from "@/server/data-access/form";
import { notFound, redirect } from "next/navigation";
import PageTitle from "../../_components/page-title";

async function page({ params }: { params: { id: string } }) {
  const form = await getFormById(params.id);

  if (!form) notFound();
  if (form.status === "DRAFT") redirect(`/surveys/${params.id}/edit`);

  const { data, success } = formSchema.safeParse(
    JSON.parse(form.content?.toString() ?? ""),
  );
  if (!data || !success) notFound();

  return (
    <>
      <PageTitle>{form?.title}</PageTitle>
      <p>TODO: Info about the survey, answers and preview</p>
    </>
  );
}

export default page;
