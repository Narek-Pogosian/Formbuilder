import {
  type FormSchema,
  MAX_LENGTH,
  MAX_LENGTH_TEXTAREA,
} from "@/lib/schemas/form-schema";
import { Button } from "../ui/button";
import {
  CircleCheckBig,
  MousePointer,
  Radio,
  Sigma,
  Type,
  TypeOutline,
} from "lucide-react";
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

  function addCheckbox() {
    append({
      id: crypto.randomUUID(),
      type: "checkbox",
      label: "",
      required: false,
    });
  }

  function addRadioButtons() {
    append({
      id: crypto.randomUUID(),
      type: "radio",
      required: false,
      label: "",
      options: [],
    });
  }

  return (
    <div className="shadow bg-background-card p-6">
      <h3 className="mb-4 text-center font-semibold">Add field</h3>
      <div className="flex flex-wrap gap-4">
        <Button
          className="h-fit flex-col gap-2"
          variant="outline"
          onClick={addTextField}
        >
          <Type className="size-6" />
          Text Field
        </Button>
        <Button
          className="h-fit flex-col gap-2"
          variant="outline"
          onClick={addTextArea}
        >
          <TypeOutline className="size-6" />
          Text Area
        </Button>
        <Button
          className="h-fit flex-col gap-2"
          variant="outline"
          onClick={addNumberField}
        >
          <Sigma className="size-6" />
          Number Field
        </Button>
        <Button
          className="h-fit flex-col gap-2"
          variant="outline"
          onClick={addSelectField}
        >
          <MousePointer className="size-6" />
          Select Field
        </Button>
        <Button
          className="h-fit flex-col gap-2"
          variant="outline"
          onClick={addCheckbox}
        >
          <CircleCheckBig className="size-6" />
          Checkbox Field
        </Button>
        <Button
          className="h-fit flex-col gap-2"
          variant="outline"
          onClick={addRadioButtons}
        >
          <Radio className="size-6" />
          Radio Group
        </Button>
      </div>
    </div>
  );
}

export default memo(FieldAdder);
