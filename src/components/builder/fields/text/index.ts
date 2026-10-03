import { type FieldPlugin } from "../registry";
import { inputFieldSchema } from "../shared/schema";
import { Type } from "lucide-react";
import TextFieldRenderer from "./renderer";
import TextFieldEditor from "./editor";
import z from "zod";

const textSchema = inputFieldSchema.extend({
  type: z.literal("text"),
  placeholder: z.string().optional(),
  validationRule: z.enum(["none", "email", "url"]),
  longAnswer: z.boolean(),
});

export const TextFieldPlugin: FieldPlugin<typeof textSchema> = {
  icon: Type,
  category: "input",
  definitionSchema: textSchema,

  createInitialDefinition() {
    return {
      id: crypto.randomUUID(),
      type: "text",
      label: "",
      isRequired: false,
      longAnswer: false,
      placeholder: "",
      description: "",
      validationRule: "none",
    };
  },

  createValidationSchema(field) {
    let schema: z.ZodString | z.ZodEmail | z.ZodURL;

    if (field.longAnswer) {
      schema = z.string().trim().max(1000, { error: "Must be at most 1000 characters" });
    } else {
      switch (field.validationRule) {
        case "email":
          schema = z.email({ error: "Must be a valid email address" });
          break;
        case "url":
          schema = z.url({ error: "Must be a valid URL" });
          break;
        default:
          schema = z.string().trim().max(200, { error: "Must be at most 200 characters" });
          break;
      }
    }

    return field.isRequired
      ? schema.min(1, { error: "Please enter a value" })
      : schema.optional().or(z.literal(""));
  },

  Editor: TextFieldEditor,
  Renderer: TextFieldRenderer,
};
