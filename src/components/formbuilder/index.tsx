"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFormbuilder } from "./hooks/use-formbuilder";
import FormbuilderSettings from "./settings";
import FormRenderer from "../formrenderer";
import FieldDialog from "./field-adder/field-dialog";
import FieldList from "./field-list";
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

export type FormbuilderProps = FormBuilderCreateProps | FormBuilderUpdateProps;

function FormBuilder(props: FormbuilderProps) {
  const { state } = useFormbuilder();

  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle>
        {props.mode === "create" ? "Create" : "Edit"} Survey
      </PageTitle>
      <FormbuilderSettings {...props} />
      <Tabs defaultValue="builder">
        <TabsList>
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="builder">
          <FieldList />
          <FieldDialog />
        </TabsContent>
        <TabsContent value="preview">
          <FormRenderer mode="preview" form={state.fields} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default FormBuilder;
