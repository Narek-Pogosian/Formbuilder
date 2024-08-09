import { type FormSchema } from "@/lib/schemas/form-schema";
import { memo } from "react";
import BaseBlock from "./blocks/base-block";
import TextBlock from "./blocks/text-block";
import NumberBlock from "./blocks/number-block";
import TextAreaBlock from "./blocks/textarea-block";

interface FieldsListProps {
  fields: FormSchema;
  setFields: React.Dispatch<React.SetStateAction<FormSchema>>;
}

type UniqueKeys<T> = T extends T ? keyof T : never;
export type AllKeys = UniqueKeys<FormSchema[number]>;

function FieldsList({ fields, setFields }: FieldsListProps) {
  function remove(id: string) {
    return () => setFields(fields.filter((f) => f.id != id));
  }

  function update(id: string, field: FormSchema[number]) {
    return (property: AllKeys, value: string) =>
      setFields(
        fields.map((f) => (f.id != id ? f : { ...field, [property]: value })),
      );
  }

  return (
    <div className="grid gap-10">
      {JSON.stringify(fields, null, 2)}
      {fields.map((field, i) => {
        if (field.type === "text")
          return (
            <BaseBlock key={field.id} remove={remove(field.id)} type="text">
              <TextBlock update={update(field.id, field)} field={field} />
            </BaseBlock>
          );
        if (field.type === "number")
          return (
            <BaseBlock key={field.id} remove={remove(field.id)} type="number">
              <NumberBlock index={i} />
            </BaseBlock>
          );
        if (field.type === "textarea")
          return (
            <BaseBlock key={field.id} remove={remove(field.id)} type="textarea">
              <TextAreaBlock index={i} />
            </BaseBlock>
          );
      })}
    </div>
  );
}

export default memo(FieldsList);
