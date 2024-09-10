"use client";

import PageTitle from "@/app/(app)/_components/page-title";
import FormbuilderSettings from "./settings";
import FieldList from "./field-list";
import FieldDialog from "./field-adder/field-dialog";

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
  return (
    <>
      <PageTitle>{props.mode === "create" ? "Create" : "Edit"} Survey</PageTitle>
      <FormbuilderSettings />
      <FieldList />
      <FieldDialog />
    </>
  );
}

export default FormBuilder2;
