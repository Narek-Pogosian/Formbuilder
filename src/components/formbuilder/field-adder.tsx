import { type UseFieldArrayAppend } from "react-hook-form";
import { MAX_LENGTH, type CreateFormSchema } from "@/lib/schemas/form-schema";
import { Button } from "../ui/button";

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
    <div className="sticky top-4 grid h-fit gap-4 rounded border bg-element p-4">
      <Button className="w-full" onClick={addTextField}>
        Add Text Field
      </Button>
      <Button className="w-full" onClick={addNumberField}>
        Add Number Field
      </Button>
    </div>
  );
}

export default FieldAdder;
