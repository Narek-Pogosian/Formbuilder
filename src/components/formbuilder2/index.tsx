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

function FormBuilder2(props: FormbuilderProps) {
  const { state } = useFormbuilder();

  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle>
        {props.mode === "create" ? "Create" : "Edit"} Survey
      </PageTitle>
      <FormbuilderSettings {...props} />
      <Tabs defaultValue="builder" className="pt-6">
        <TabsList className="w-full py-4">
          <TabsTrigger className="flex-1" value="builder">
            Builder
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="preview">
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="builder" className="py-2">
          <FieldList />
          <FieldDialog />
        </TabsContent>
        <TabsContent value="preview" className="py-2">
          <FormRenderer mode="preview" form={state.fields} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default FormBuilder2;
