import { getForms } from "@/server/data-access/form";
import Link from "next/link";
import DeleteFormDialog from "./_components/delete-form-dialog";
import { Button } from "@/components/ui/button";

async function FormsPage() {
  const forms = await getForms();

  return (
    <>
      <h1 className="mb-8 text-xl font-bold">Your Surveys</h1>
      <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {forms.map((form) => (
          <li
            key={form.id}
            className="shadow relative rounded bg-background-card p-6"
          >
            <Link
              href={`/surveys/${form.id}`}
              className="mb-1 block font-semibold after:absolute after:inset-0"
            >
              {form.title}
            </Link>
            <p className="mb-8 text-sm font-medium text-foreground-muted">
              {new Date(form.createdAt).toLocaleDateString()}
            </p>

            <div className="flex gap-2">
              <DeleteFormDialog id={form.id} />
              <Button asChild variant="outline" size="sm">
                <Link href={`/surveys/${form.id}/edit`} className="relative">
                  Edit
                </Link>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default FormsPage;
