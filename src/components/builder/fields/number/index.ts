import { type FieldPlugin } from "../registry";
import { inputFieldSchema } from "../shared/schema";
import { Sigma } from "lucide-react";
import NumberFieldRenderer from "./renderer";
import NumberFieldEditor from "./editor";
import z from "zod";

const numberSchema = inputFieldSchema.extend({
  type: z.literal("number"),
  placeholder: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
});

export const NumberFieldPlugin: FieldPlugin<typeof numberSchema> = {
  icon: Sigma,
  category: "input",
  definitionSchema: numberSchema,

  createInitialDefinition() {
    return {
      id: crypto.randomUUID(),
      type: "number",
      label: "",
      description: "",
      isRequired: false,
      placeholder: "",
      min: undefined,
      max: undefined,
    };
  },

  createValidationSchema(field) {
    const schema = z
      .string()
      .trim()
      .refine((value) => value === "" || !Number.isNaN(Number(value)), {
        error: "Please enter a valid number",
      });

    let nextSchema = schema;

    if (typeof field.min === "number") {
      nextSchema = nextSchema.refine((value) => value === "" || Number(value) >= field.min!, {
        error: `Value must be at least ${field.min}`,
      });
    }

    if (typeof field.max === "number") {
      nextSchema = nextSchema.refine((value) => value === "" || Number(value) <= field.max!, {
        error: `Value must be at most ${field.max}`,
      });
    }

    if (field.isRequired) {
      return nextSchema.refine((value) => value.trim().length > 0, {
        error: "Please enter a value",
      });
    }

    return nextSchema.optional().or(z.literal(""));
  },

  Editor: NumberFieldEditor,
  Renderer: NumberFieldRenderer,
};
