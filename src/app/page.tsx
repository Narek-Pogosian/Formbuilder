import FormBuilder from "@/components/formbuilder";
import Link from "next/link";

function HomePage() {
  return (
    <div className="mx-auto max-w-3xl py-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold">Formbuilder</h1>
        <Link href="/forms" className="text-sm font-semibold underline">
          Forms
        </Link>
      </div>

      <FormBuilder />
    </div>
  );
}

export default HomePage;
