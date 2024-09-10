import { type FormSchema, type FieldType } from "@/lib/schemas/form-schema";
import {
  CircleCheckBig,
  MousePointer,
  Radio,
  Sigma,
  Type,
  TypeOutline,
  type LucideIcon as LI,
} from "lucide-react";
import { createElement, useState } from "react";
import { Button } from "@/components/ui/button";
import TextForm from "./field-forms/text-form";
import TextareaForm from "./field-forms/textarea-form";
import NumberForm from "./field-forms/number-form";
import RadioForm from "./field-forms/radio-form";
import CheckboxForm from "./field-forms/checkbox-form";
import SelectForm from "./field-forms/select-form";

export type FormProps = { defaultField?: FormSchema[number] };
type V = { label: string; icon: LI; form: React.ComponentType<FormProps> };
type FieldForms = Record<FieldType, V>;

const forms: FieldForms = {
  text: { form: TextForm, icon: Type, label: "Text" },
  textarea: { form: TextareaForm, icon: TypeOutline, label: "Textarea" },
  number: { form: NumberForm, icon: Sigma, label: "Number" },
  radio: { form: RadioForm, icon: Radio, label: "Radio Group" },
  select: { form: SelectForm, icon: MousePointer, label: "Select" },
  checkbox: { form: CheckboxForm, icon: CircleCheckBig, label: "Checkbox" },
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
      <ul className="flex flex-wrap gap-2">
        {Object.entries(forms).map(([type, value]) => (
          <li key={type}>
            <Button
              className="size-24 flex-col gap-2"
              variant="outline"
              onClick={() => setFieldType(type as FieldType)}
            >
              <value.icon className="size-6" />
              {value.label}
            </Button>
          </li>
        ))}
      </ul>
    );
  }

  return <div>{createElement(forms[fieldType].form, { defaultField })}</div>;
}

export default FieldAdder;
