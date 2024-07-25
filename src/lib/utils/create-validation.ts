import { type FormSchema } from "@/lib/schemas/form-schema";
import { z, type ZodTypeAny } from "zod";

type Shape = Record<string, ZodTypeAny>;

export function createValidationSchema(form: FormSchema) {
  const shape: Shape = {};

  form.forEach((field) => {
    let fieldSchema;

    switch (field.type) {
      case "text":
        fieldSchema = z.string();
        if (field.minLength && field.required) {
          fieldSchema = fieldSchema.min(field.minLength, {
            message: `Must be at least ${field.minLength} characters`,
          });
        }
        if (field.maxLength) {
          fieldSchema = fieldSchema.max(field.maxLength, {
            message: `Must be at most ${field.maxLength} characters`,
          });
        }
        break;

      case "number":
        fieldSchema = z.coerce.number();
        if (!field.required) break;
        if (field.min) {
          fieldSchema = fieldSchema.min(field.min, {
            message: `Must be at least ${field.min}`,
          });
        }
        if (field.max !== undefined) {
          fieldSchema = fieldSchema.max(field.max, {
            message: `Must be at most ${field.max}`,
          });
        }
        break;

      default:
        throw new Error(`Unsupported field type`);
    }

    if (field.required) {
      shape[field.label] = fieldSchema;
    } else {
      shape[field.label] = fieldSchema.optional();
    }
  });

  return z.object(shape);
}
