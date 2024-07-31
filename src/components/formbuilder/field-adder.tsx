import { type UseFieldArrayAppend } from "react-hook-form";
import { MAX_LENGTH, type CreateFormSchema } from "@/lib/schemas/form-schema";
import { Button } from "../ui/button";
import { Sigma, Type } from "lucide-react";

interface FieldAdderProps {
  append: UseFieldArrayAppend<CreateFormSchema>;
}

function FieldAdder({ append }: FieldAdderProps) {
  function addTextField() {
    append({
      id: crypto.randomUUID(),
      type: "text",
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

  return (
    <div className="space-y-4 rounded bg-element p-8 lg:sticky lg:top-0 lg:h-screen">
      <h3 className="text-center font-semibold">Add field</h3>
      <Button
        className="h-fit w-full flex-col"
        variant="outline"
        onClick={addTextField}
      >
        <Type className="size-10" />
        Text Field
      </Button>
      <Button
        className="h-fit w-full flex-col"
        variant="outline"
        onClick={addNumberField}
      >
        <Sigma className="size-10" />
        Number Field
      </Button>
    </div>
  );
}

export default FieldAdder;
