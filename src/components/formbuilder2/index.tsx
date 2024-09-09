import PageTitle from "@/app/(app)/_components/page-title";

interface FormBuilderProps {
  mode: "create" | "edit";
}

interface FormBuilderCreateProps extends FormBuilderProps {
  mode: "create";
}

interface FormBuilderUpdateProps extends FormBuilderProps {
  mode: "edit";
  id: string;
}

type Props = FormBuilderCreateProps | FormBuilderUpdateProps;

function FormBuilder2(props: Props) {
  console.log(props);
  return (
    <>
      <PageTitle>{props.mode === "create" ? "Create" : "Edit"} Survey</PageTitle>

      <div>TODO: Settings</div>
      <div>TODO: Fields list</div>
      <div>TODO: Add field dialog</div>
    </>
  );
}

export default FormBuilder2;
