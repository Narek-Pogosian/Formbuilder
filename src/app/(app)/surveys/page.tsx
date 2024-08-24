import { getForms } from "@/server/data-access/form";
import Link from "next/link";
import DeleteFormDialog from "./_components/delete-form-dialog";

async function FormsPage() {
  const forms = await getForms();

  return (
    <>
      <h1 className="mb-8 text-xl font-bold">Surveys</h1>
      <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {forms.map((form) => (
          <li
            key={form.id}
            className="shadow relative flex rounded bg-background-card p-6"
          >
            <div className="grow">
              <Link
                href={`/surveys/${form.id}`}
                className="mb-2 block font-semibold after:absolute after:inset-0"
              >
                {form.title}
              </Link>
              <p className="text-sm font-medium text-foreground-muted">
                {new Date(form.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <DeleteFormDialog id={form.id} />
              <Link href={`/surveys/${form.id}/edit`} className="relative">
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default FormsPage;
