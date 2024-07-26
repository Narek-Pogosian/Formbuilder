import { getForms } from "@/server/data-access/form";
import Link from "next/link";

async function FormsPage() {
  const forms = await getForms();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-8 text-xl font-bold">Forms</h1>

      <ul className="grid grid-cols-2 gap-4">
        {forms.map((form) => (
          <li key={form.id} className="relative rounded border p-4">
            <Link
              href={`/forms/${form.id}`}
              className="text-lg font-semibold after:absolute after:inset-0"
            >
              {form.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormsPage;
