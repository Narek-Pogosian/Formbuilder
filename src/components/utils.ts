import { z, ZodTypeAny } from "zod";
import { FormSchema } from "./formbuilder";

export function createValidationSchema(form: FormSchema) {
  const shape: { [key: string]: ZodTypeAny } = {};

  form.forEach((field) => {
    let fieldSchema;

    switch (field.type) {
      case "text":
        fieldSchema = z.string();
        if (field.minLength !== undefined) {
          fieldSchema = fieldSchema.min(field.minLength, {
            message: `Must be at least ${field.minLength} characters`,
          });
        }
        if (field.maxLength !== undefined) {
          fieldSchema = fieldSchema.max(field.maxLength, {
            message: `Must be at most ${field.maxLength} characters`,
          });
        }
        break;

      case "number":
        fieldSchema = z.coerce.number();
        if (field.min !== undefined) {
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

      case "date":
        fieldSchema = z.string().refine((val) => !isNaN(Date.parse(val)), {
          message: "Invalid date",
        });
        if (field.minDate !== undefined) {
          fieldSchema = fieldSchema.refine(
            (val) => new Date(val) >= new Date(field.minDate ?? ""),
            { message: `Must be after ${field.minDate}` },
          );
        }
        if (field.maxDate !== undefined) {
          fieldSchema = fieldSchema.refine(
            (val) => new Date(val) <= new Date(field.maxDate ?? ""),
            { message: `Must be before ${field.maxDate}` },
          );
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
