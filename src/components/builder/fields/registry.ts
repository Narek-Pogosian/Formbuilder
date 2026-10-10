import { type ZodObject, type ZodType, type z } from "zod";
import { type UseFormReturn } from "react-hook-form";
import { type LucideIcon } from "lucide-react";
import { ParagraphFieldPlugin } from "./paragraph";
import { CheckboxFieldPlugin } from "./checkbox";
import { DateTimeFieldPlugin } from "./date-time";
import { OptionsFieldPlugin } from "./options";
import { HeadingFieldPlugin } from "./heading";
import { DividerFieldPlugin } from "./divider";
import { NumberFieldPlugin } from "./number";
import { TextFieldPlugin } from "./text";

type Category = "input" | "layout";

const FIELDS = {
  text: TextFieldPlugin,
  number: NumberFieldPlugin,
  options: OptionsFieldPlugin,
  dateTime: DateTimeFieldPlugin,
  checkbox: CheckboxFieldPlugin,
  heading: HeadingFieldPlugin,
  paragraph: ParagraphFieldPlugin,
  divider: DividerFieldPlugin,
} as const;

export type FieldType = keyof typeof FIELDS;
export type FieldDefinition = z.infer<(typeof FIELDS)[FieldType]["definitionSchema"]>;
export type FormDefinitions = FieldDefinition[];

function isFieldType(type: unknown): type is FieldType {
  return typeof type === "string" && FIELDS.hasOwnProperty(type);
}

export function validateFormDefinitions(fields: unknown): fields is FormDefinitions {
  if (!Array.isArray(fields)) return false;

  return fields.every((field) => {
    if (!field || typeof field !== "object") return false;

    const type = field.type;
    if (!isFieldType(type)) return false;

    return FIELDS[type].definitionSchema.safeParse(field).success;
  });
}

export const fieldRegistry = {
  categorizedFields: Object.groupBy(
    Object.entries(FIELDS).map(([type, field]) => ({
      type: type as FieldType,
      icon: field.icon,
      category: field.category,
    })),
    (field) => field.category
  ),

  get<T extends FieldType>(type: T): (typeof FIELDS)[T] {
    return FIELDS[type];
  },
} as const;

export interface FieldPlugin<TSchema extends ZodObject> {
  icon: LucideIcon;
  category: Category;
  definitionSchema: TSchema;

  createInitialDefinition: () => z.infer<TSchema>;
  createValidationSchema: ((fieldDefinition: z.infer<TSchema>) => ZodType) | null;

  Editor: React.ComponentType<FieldEditorProps>;
  Renderer: React.ComponentType<FieldRendererProps>;
}

export type FieldEditorProps = { fieldDefinition: FieldDefinition };
export type FieldRendererProps = { fieldDefinition: FieldDefinition; form: UseFormReturn };

// type PluginFor<T extends FieldType> = (typeof FIELDS)[T];
// type DefinitionFor<T extends FieldType> = z.infer<PluginFor<T>["definitionSchema"]>;
// export type FieldDefinition = { [K in FieldType]: DefinitionFor<K> }[FieldType];
// export type FieldEditorProps<T extends FieldType> = { fieldDefinition: DefinitionFor<T>};
// export type FieldRendererProps<T extends FieldType> = { fieldDefinition: DefinitionFor<T>;form: UseFormReturn;};
