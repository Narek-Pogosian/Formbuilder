import FormBuilder2 from "@/components/formbuilder2";
import FormbuilderProvider from "@/components/formbuilder2/context/formbuilder-context";

function CreatePage() {
  return (
    <FormbuilderProvider mode="create">
      <FormBuilder2 mode="create" />
    </FormbuilderProvider>
  );
}

export default CreatePage;
