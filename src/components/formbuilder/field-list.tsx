import { availableBlocks, type UpdateKeys, type UpdateValue } from "./blocks";
import { type UniqueIdentifier } from "@dnd-kit/core";
import { type FormSchema } from "@/lib/schemas/form-schema";
import { createElement, memo } from "react";
import BaseBlock from "./blocks/base-block";
import { Squirrel } from "lucide-react";

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

  if (fields.length === 0) {
    return (
      <div className="mx-auto max-w-lg pt-10 text-center font-semibold text-foreground-muted">
        <Squirrel className="mx-auto mb-4 size-44" strokeWidth={1} />
        Your survey is currently empty. <br /> Add a field bellow to begin
        building your survey.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {fields.map((field) => (
        <BaseBlock
          key={field.id}
          id={field.id}
          type={field.type}
          remove={remove(field.id)}
          className={activeId === field.id ? "opacity-25" : ""}
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
