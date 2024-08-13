import { type UniqueIdentifier } from "@dnd-kit/core";
import { type FormSchema } from "@/lib/schemas/form-schema";
import { memo } from "react";
import BaseBlock from "./blocks/base-block";
import TextBlock from "./blocks/text-block";
import NumberBlock from "./blocks/number-block";
import TextAreaBlock from "./blocks/textarea-block";

type UniqueKeys<T> = T extends T ? keyof T : never;
export type UpdateKeys = UniqueKeys<FormSchema[number]>;
export type UpdateValue = string | boolean | number;
export type UpdateFunction = (property: UpdateKeys, value: UpdateValue) => void;

interface FieldsListProps {
  fields: FormSchema;
  setFields: React.Dispatch<React.SetStateAction<FormSchema>>;
  activeId: UniqueIdentifier | null;
}

function FieldsList({ fields, setFields, activeId }: FieldsListProps) {
  function remove(id: string) {
    return () => setFields(fields.filter((f) => f.id != id));
  }

  function update(id: string, field: FormSchema[number]) {
    return (property: UpdateKeys, value: UpdateValue) =>
      setFields(
        fields.map((f) => (f.id != id ? f : { ...field, [property]: value })),
      );
  }

  return (
    <div className="grid gap-10">
      {fields.map((field) => (
        <BaseBlock
          key={field.id}
          id={field.id}
          type={field.type}
          remove={remove(field.id)}
          className={activeId === field.id ? "opacity-35" : ""}
        >
          {field.type === "text" && (
            <TextBlock update={update(field.id, field)} field={field} />
          )}
          {field.type === "textarea" && (
            <TextAreaBlock update={update(field.id, field)} field={field} />
          )}
          {field.type === "number" && (
            <NumberBlock update={update(field.id, field)} field={field} />
          )}
        </BaseBlock>
      ))}
    </div>
  );
}

export default memo(FieldsList);
