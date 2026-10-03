import { fieldRegistry, type FormDefinitions, type FieldDefinition } from "../fields/registry";
import z from "zod";

function createFieldSchema(field: FieldDefinition) {
  const fieldPlugin = fieldRegistry.get(field.type);
  if (!fieldPlugin.createValidationSchema) return;

  // @ts-ignore it works, because we use z.infer<TSchema> in registry
  const schema = fieldPlugin.createValidationSchema(field);

  return schema;
}

function getDefaultValue(field: FieldDefinition) {
  switch (field.type) {
    case "options":
      if (field.multipleAnswers) return [];
      return;
    case "checkbox":
      return false;
    default:
      return "";
  }
}

export function createValidationSchema(form: FormDefinitions) {
  const shape: Record<string, any> = {};
  const defaultValues: Record<string, any> = {};

  form.forEach((field) => {
    const schema = createFieldSchema(field);
    if (schema) {
      defaultValues[field.id] = getDefaultValue(field);
      shape[field.id] = schema;
    }
  });

  return { schema: z.object(shape), defaultValues };
}
