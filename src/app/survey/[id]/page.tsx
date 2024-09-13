import FormRenderer from "@/components/formrenderer";
import { type Metadata } from "next";
import { getFormById } from "@/server/data-access/form";
import { formSchema } from "@/lib/schemas/form-schema";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { db } from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const form = await getFormById(params.id);
  if (!form) notFound();

  return {
    title: form.title,
    openGraph: {
      type: "website",
      siteName: "Insights",
      title: form.title,
      url: process.env.VERCEL_URL + "/survey/" + params.id,
    },
    twitter: {
      title: form.title,
      site: process.env.VERCEL_URL + "/survey/" + params.id,
    },
  };
}

async function page({ params }: { params: { id: string } }) {
  const ip = headers().get("x-forwarded-for") ?? "kek";
  const found = await db.response.findFirst({
    where: { surveyId: params.id, respondent: ip },
  });

  if (found) {
    return (
      <div className="grid min-h-full place-content-center">
        <h1 className="text-2xl font-semibold">
          You have already answered this survey!
        </h1>
      </div>
    );
  }

  const form = await getFormById(params.id);
  if (!form || form.status !== "PUBLISHED") {
    notFound();
  }

  const { data, success } = formSchema.safeParse(
    JSON.parse(form.content?.toString() ?? ""),
  );
  if (!data || !success) {
    notFound();
  }

  return (
    <div className="py-8">
      <h1 className="mb-4 text-center text-3xl font-bold">{form?.title}</h1>
      <FormRenderer mode="answer" id={params.id} form={data} />
    </div>
  );
}

export default page;
