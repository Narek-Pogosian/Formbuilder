import { getForms } from "@/server/data-access/form";
import Link from "next/link";

async function page() {
  const forms = await getForms();

  return (
    <div className="mx-auto max-w-3xl py-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold">Forms</h1>
        <Link href="/" className="text-sm font-semibold underline">
          Create form
        </Link>
      </div>
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

export default page;
