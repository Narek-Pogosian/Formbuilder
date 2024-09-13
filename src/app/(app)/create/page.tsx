import FormBuilder from "@/components/formbuilder";
import FormbuilderProvider from "@/components/formbuilder/context/formbuilder-context";

function CreatePage() {
  return (
    <FormbuilderProvider mode="create">
      <FormBuilder mode="create" />
    </FormbuilderProvider>
  );
}

export default CreatePage;
