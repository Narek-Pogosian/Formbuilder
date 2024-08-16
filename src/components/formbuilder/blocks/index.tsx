import { type FormSchema, type FieldType } from "@/lib/schemas/form-schema";
import TextBlock from "./text-block";
import TextAreaBlock from "./textarea-block";
import NumberBlock from "./number-block";
import SelectBlock from "./select-block";
import CheckBlock from "./check-block";
import RadioBlock from "./radio-block";

// UniqueKeys is needed to make sure updatekeys contains all possible keys and not just the shared one between the fields.
type UniqueKeys<T> = T extends T ? keyof T : never;
export type UpdateKeys = UniqueKeys<FormSchema[number]>;
export type UpdateValue = string | boolean | number | string[];
export type UpdateFunction = (property: UpdateKeys, value: UpdateValue) => void;

/** Theese are the props every block should receive */
export interface BlockProps {
  field: FormSchema[number];
  update: UpdateFunction;
}

export const availableBlocks: Record<
  FieldType,
  React.ComponentType<BlockProps>
> = {
  text: TextBlock,
  textarea: TextAreaBlock,
  number: NumberBlock,
  select: SelectBlock,
  checkbox: CheckBlock,
  radio: RadioBlock,
};
