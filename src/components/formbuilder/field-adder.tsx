import {
  type FormSchema,
  MAX_LENGTH,
  MAX_LENGTH_TEXTAREA,
} from "@/lib/schemas/form-schema";
import { Button } from "../ui/button";
import { MousePointer, Sigma, Type, TypeOutline } from "lucide-react";
import { memo } from "react";

interface FieldAdderProps {
  setFields: React.Dispatch<React.SetStateAction<FormSchema>>;
}

function FieldAdder({ setFields }: FieldAdderProps) {
  function append(field: FormSchema[number]) {
    setFields((prevFields) => [...prevFields, field]);
  }

  function addTextField() {
    append({
      id: crypto.randomUUID(),
      type: "text",
      placeholder: "",
      label: "",
      required: false,
      minLength: 1,
      maxLength: MAX_LENGTH,
    });
  }

  function addNumberField() {
    append({
      id: crypto.randomUUID(),
      type: "number",
      label: "",
      required: false,
      min: "",
      max: "",
    });
  }

  function addTextArea() {
    append({
      id: crypto.randomUUID(),
      type: "textarea",
      placeholder: "",
      label: "",
      required: false,
      minLength: 1,
      maxLength: MAX_LENGTH_TEXTAREA,
    });
  }

  function addSelectField() {
    append({
      id: crypto.randomUUID(),
      type: "select",
      placeholder: "",
      label: "",
      required: false,
      options: [],
    });
  }

  return (
    <div className="shadow flex w-60 shrink-0 flex-col space-y-4 bg-background-card p-8 lg:sticky lg:top-0 lg:h-screen">
      <h3 className="text-center font-semibold">Add field</h3>
      <Button
        className="h-fit flex-col gap-2"
        variant="outline"
        onClick={addTextField}
      >
        <Type className="size-8" />
        Text Field
      </Button>
      <Button
        className="h-fit flex-col gap-2"
        variant="outline"
        onClick={addTextArea}
      >
        <TypeOutline className="size-8" />
        Text Area
      </Button>
      <Button
        className="h-fit flex-col gap-2"
        variant="outline"
        onClick={addNumberField}
      >
        <Sigma className="size-8" />
        Number Field
      </Button>
      <Button
        className="h-fit flex-col gap-2"
        variant="outline"
        onClick={addSelectField}
      >
        <MousePointer className="size-8" />
        Select Field
      </Button>
    </div>
  );
}

export default memo(FieldAdder);
