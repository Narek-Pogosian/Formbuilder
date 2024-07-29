import { getForms } from "@/server/data-access/form";
import Link from "next/link";
import DeleteFormDialog from "./_components/delete-form-dialog";

async function FormsPage() {
  const forms = await getForms();

  return (
    <>
      <h1 className="mb-8 text-xl font-bold">Forms</h1>
      <ul className="grid grid-cols-3 gap-8">
        {forms.map((form) => (
          <li key={form.id} className="relative rounded bg-element p-4">
            <Link
              href={`/forms/${form.id}`}
              className="mb-4 block font-semibold after:absolute after:inset-0"
            >
              {form.title}
            </Link>
            <p className="text-sm font-medium text-foreground-muted">
              {new Date(form.createdAt).toLocaleDateString()}
            </p>
            <DeleteFormDialog id={form.id} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default FormsPage;
