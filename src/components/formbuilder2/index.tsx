"use client";

import PageTitle from "@/app/(app)/_components/page-title";
import FormbuilderSettings from "./settings";
import FieldList from "./field-list";
import FieldAdder from "./field-adder";

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
      <FieldAdder />
    </>
  );
}

export default FormBuilder2;
