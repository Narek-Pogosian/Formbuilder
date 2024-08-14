import { availableBlocks, type UpdateKeys, type UpdateValue } from "./blocks";
import { type UniqueIdentifier } from "@dnd-kit/core";
import { type FormSchema } from "@/lib/schemas/form-schema";
import { createElement, memo } from "react";
import BaseBlock from "./blocks/base-block";

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
    <div className="grid gap-5">
      {fields.map((field) => (
        <BaseBlock
          key={field.id}
          id={field.id}
          type={field.type}
          remove={remove(field.id)}
          className={activeId === field.id ? "opacity-0" : ""}
        >
          {availableBlocks[field.type] &&
            createElement(availableBlocks[field.type], {
              update: update(field.id, field),
              field: field,
            })}
        </BaseBlock>
      ))}
    </div>
  );
}

export default memo(FieldsList);
