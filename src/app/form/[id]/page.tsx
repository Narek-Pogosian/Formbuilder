import { type FormDefinitions } from "@/components/builder/fields/registry";
import { type Metadata } from "next";
import { CircleQuestionMark } from "lucide-react";
import { getFormById } from "@/server/queries/forms";
import RespondForm from "../_components/respond-form";

function validateId(id: string) {
  return /^\d+$/.test(id);
}

export async function generateMetadata({ params }: PageProps<"/form/[id]">): Promise<Metadata> {
  const { id } = await params;
  if (!validateId(id)) return {};

  const form = await getFormById(Number(id));
  if (!form) return {};

  return {
    title: form.title ? `${form.title} - Formbuilder` : "Form",
    description: form.description || "Fill out the form on this page for your specific needs.",
    openGraph: {
      title: form.title,
      description: form.description || "Complete the form to submit your responses.",
      url: `${process.env.VERCEL_URL}/form/${form.id}`,
      type: "website",
    },
    twitter: {
      title: form.title,
      description: form.description || "Complete the form to submit your responses.",
    },
  };
}

export default async function AnswerFormPage({ params }: PageProps<"/form/[id]">) {
  const { id } = await params;
  if (!validateId(id)) return <InvalidPage />;

  const form = await getFormById(Number(id));
  if (!form || form.status !== "published") {
    return <InvalidPage />;
  }

  // TODO: Validate
  const fields = form.content as FormDefinitions;
  // const { data, success } = FormDefinitions.safeParse(form.content);
  // if (!success) return <InvalidPage />;

  return (
    <div className="md:px-10 md:py-12">
      <div className="card mx-auto max-w-3xl p-4 max-md:rounded-none md:p-10">
        <h1 className="mb-4 text-center text-2xl font-bold md:text-3xl">{form.title}</h1>
        <div className="mx-auto max-w-xl">
          <p className="mb-8 text-center text-muted-foreground">{form.description}</p>
          <RespondForm fields={fields} formId={form.id} />
        </div>
      </div>
    </div>
  );
}

function InvalidPage() {
  return (
    <div className="mx-auto max-w-lg pt-24 text-center md:pt-38">
      <div className="mx-auto mb-6 flex size-18 items-center justify-center rounded-full border bg-muted">
        <CircleQuestionMark className="size-10 text-muted-foreground" />
      </div>
      <h1 className="mb-3 text-xl font-semibold tracking-tight">This form isn&apos;t available</h1>
      <p className="text-pretty text-muted-foreground">
        The link may be invalid, the form may have expired, or it is no longer accepting responses.
      </p>
    </div>
  );
}
