import { formSchema } from "@/lib/schemas/form-schema";
import { getFormById } from "@/server/data-access/form";
import { notFound, redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import { Suspense } from "react";
import Answers from "./_components/answers";
import PageTitle from "../../_components/page-title";
import CancelFormDialog from "../_components/cancel-form-dialog";
import UncancelButton from "../_components/uncancel-button";
import SurveyInformation from "./_components/survey-information";
import DeleteFormDialog from "../_components/delete-form-dialog";

async function page({ params }: { params: { id: string } }) {
  const form = await getFormById(params.id);

  if (!form) notFound();
  if (form.status === "DRAFT") redirect(`/surveys/${params.id}/edit`);

  const session = await getServerAuthSession();
  if (form.userId !== session?.user.id) notFound();

  const { data, success } = formSchema.safeParse(
    JSON.parse(form.content?.toString() ?? ""),
  );
  if (!data || !success) notFound();

  return (
    <div className="space-y-6">
      <PageTitle>{form?.title}</PageTitle>
      <SurveyInformation form={form} />

      <div className="flex gap-2">
        {form.status === "PUBLISHED" ? (
          <CancelFormDialog id={form.id} />
        ) : (
          <UncancelButton id={form.id} />
        )}
        <DeleteFormDialog id={form.id} />
      </div>

      <section aria-describedby="answers">
        <h2
          id="answers"
          className="mb-1 text-lg font-semibold text-foreground-muted"
        >
          Answers
        </h2>
        <Suspense fallback={<p>Loading answers...</p>}>
          <Answers id={form.id} />
        </Suspense>
      </section>
    </div>
  );
}

export default page;
