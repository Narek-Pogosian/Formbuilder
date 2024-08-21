import FormBuilder from "@/components/formbuilder";

function CreatePage() {
  return (
    <>
      {/* <div className="absolute inset-0 -z-50 h-full w-full bg-[radial-gradient(#cecccc_1px,transparent_1px)] [background-size:22px_22px] dark:bg-[radial-gradient(#494949_1px,transparent_1px)]"></div> */}
      <FormBuilder mode="create" />
    </>
  );
}

export default CreatePage;
