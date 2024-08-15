import { type FormSchema } from "@/lib/schemas/form-schema";
import { z, type ZodTypeAny } from "zod";

export function createValidationSchema(form: FormSchema) {
  const shape: Record<string, ZodTypeAny> = {};

  form.forEach((field) => {
    let fieldSchema;

    switch (field.type) {
      case "text":
        fieldSchema = z.string().trim();
        if (field.minLength) {
          fieldSchema = fieldSchema.min(field.minLength, {
            message: `Must be at least ${field.minLength} characters`,
          });
        }
        if (field.maxLength) {
          fieldSchema = fieldSchema.max(field.maxLength, {
            message: `Must be at most ${field.maxLength} characters`,
          });
        }
        if (!field.required) {
          fieldSchema = fieldSchema.optional().or(z.literal(""));
        }
        break;

      case "number":
        fieldSchema = z.coerce.number({ message: "Must be a number" });
        if (field.min) {
          fieldSchema = fieldSchema.min(field.min, {
            message: `Must be at least ${field.min}`,
          });
        }
        if (field.max) {
          fieldSchema = fieldSchema.max(field.max, {
            message: `Must be at most ${field.max}`,
          });
        }
        if (!field.required) {
          fieldSchema = z
            .literal("")
            .transform(() => undefined)
            .or(fieldSchema.optional());
        }
        break;

      case "textarea":
        fieldSchema = z.string().trim();
        if (field.minLength) {
          fieldSchema = fieldSchema.min(field.minLength, {
            message: `Must be at least ${field.minLength} characters`,
          });
        }
        if (field.maxLength) {
          fieldSchema = fieldSchema.max(field.maxLength, {
            message: `Must be at most ${field.maxLength} characters`,
          });
        }
        if (!field.required) {
          fieldSchema = fieldSchema.optional().or(z.literal(""));
        }
        break;

      case "select":
        fieldSchema = z.string().refine((val) => field.options.includes(val), {
          message: "Invalid string",
        });
        if (!field.required) {
          fieldSchema = fieldSchema.optional().or(z.literal(""));
        }
        break;

      case "checkbox":
        fieldSchema = z.boolean().default(false).optional();
        break;

      case "radio":
        fieldSchema = z.string();
        break;

      default:
        throw new Error(`Unsupported field type`);
    }

    shape[field.label] = fieldSchema;
  });

  return z.object(shape);
}
