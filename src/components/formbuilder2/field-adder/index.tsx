import { Button } from "@/components/ui/button";
import { type FormSchema, type FieldType } from "@/lib/schemas/form-schema";
import { Check, type LucideIcon } from "lucide-react";
import { useState } from "react";

/**
 *  Need compoents to work for creating and editing.
 *  Need a form for each type of field to create with RHF that onSubmit adds or edits in state.
 *  Each block in field-list need to open a dialog to edit and based on type of input render corresponding form.
 *  For creating, we open a dialog and choose which type of field to add and then render the form.
 *  The forms should close dialog after submitting.
 */

type Value = { label: string; icon: LucideIcon; form: React.ReactNode };
type FieldForms = Record<FieldType, Value>;

const forms: FieldForms = {
  text: { form: <div></div>, icon: Check, label: "Text" },
  textarea: { form: <div></div>, icon: Check, label: "Textarea" },
  number: { form: <div></div>, icon: Check, label: "Number" },
  radio: { form: <div></div>, icon: Check, label: "Radio" },
  checkbox: { form: <div></div>, icon: Check, label: "Checkbox" },
  select: { form: <div></div>, icon: Check, label: "Select" },
};

interface Props {
  defaultField?: FormSchema[number];
}

function FieldAdder({ defaultField }: Props) {
  const [fieldType, setFieldType] = useState<FieldType | undefined>(
    defaultField?.type,
  );

  if (!fieldType) {
    return (
      <ul className="flex flex-wrap gap-4">
        {Object.entries(forms).map(([type, value]) => (
          <li key={type}>
            <Button
              variant="outline"
              onClick={() => setFieldType(type as FieldType)}
            >
              {value.label}
            </Button>
          </li>
        ))}
      </ul>
    );
  }

  return <div>View that show the form of the Field type.</div>;
}

export default FieldAdder;
