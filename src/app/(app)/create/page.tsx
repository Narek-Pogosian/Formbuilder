import FormBuilder from "@/components/formbuilder";

function CreatePage() {
  return (
    <div className="min-h-full">
      <div className="pointer-events-none absolute inset-0 -z-50 h-full w-full bg-[radial-gradient(#cccccc_1px,transparent_1px)] [background-size:22px_22px] dark:bg-[radial-gradient(#2b2b2b_1px,transparent_1px)]"></div>

      <h1 className="mb-8 text-xl font-bold">Formbuilder</h1>
      <FormBuilder />
    </div>
  );
}

export default CreatePage;
