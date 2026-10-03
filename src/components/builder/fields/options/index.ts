import { type FieldPlugin } from "../registry";
import { inputFieldSchema } from "../shared/schema";
import { List } from "lucide-react";
import OptionsFieldRenderer from "./renderer";
import OptionsFieldEditor from "./editor";
import z from "zod";

const optionsSchema = inputFieldSchema.extend({
  type: z.literal("options"),
  multipleAnswers: z.boolean(),
  options: z
    .array(
      z.object({
        value: z.string().trim().min(1, { error: "A value is required" }),
      })
    )
    .min(1)
    .superRefine((options, ctx) => {
      const seen = new Map<string, number>();

      options.forEach((option, index) => {
        const normalized = option.value.trim().toLowerCase();

        if (seen.has(normalized)) {
          ctx.addIssue({
            code: "custom",
            path: [index, "value"],
            message: "Option must be unique",
          });
        } else {
          seen.set(normalized, index);
        }
      });
    }),
});

export const OptionsFieldPlugin: FieldPlugin<typeof optionsSchema> = {
  icon: List,
  category: "input",
  definitionSchema: optionsSchema,

  createInitialDefinition() {
    return {
      id: crypto.randomUUID(),
      type: "options",
      label: "",
      isRequired: false,
      multipleAnswers: false,
      options: [{ value: "Option 1" }, { value: "Option 2" }, { value: "Option 3" }],
    };
  },

  createValidationSchema(field) {
    if (field.multipleAnswers) {
      const schema = field.isRequired
        ? z.array(z.string()).min(1, { error: "Select at least 1 option" })
        : z.array(z.string());

      return schema.refine((res) => {
        const validOptions = new Set(field.options.map((o) => o.value));
        return res.every((val) => validOptions.has(val));
      });
    }

    const schema = z
      .string({ error: "Please select an option" })
      .refine((val) => field.options.some((o) => o.value === val), {
        error: "Invalid option",
      });

    return field.isRequired ? schema : schema.optional();
  },

  Editor: OptionsFieldEditor,
  Renderer: OptionsFieldRenderer,
};
