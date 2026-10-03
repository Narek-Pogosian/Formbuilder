import { type FieldPlugin } from "../registry";
import { inputFieldSchema } from "../shared/schema";
import { CheckSquare } from "lucide-react";
import CheckboxFieldRenderer from "./renderer";
import CheckboxFieldEditor from "./editor";
import z from "zod";

const checkboxSchema = inputFieldSchema.extend({
  type: z.literal("checkbox"),
});

export const CheckboxFieldPlugin: FieldPlugin<typeof checkboxSchema> = {
  icon: CheckSquare,
  category: "input",
  definitionSchema: checkboxSchema,

  createInitialDefinition() {
    return {
      id: crypto.randomUUID(),
      type: "checkbox",
      label: "",
      description: "",
      isRequired: false,
    };
  },

  createValidationSchema(field) {
    const schema = z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.boolean({ error: "Please select a value" })
    );

    if (field.isRequired) {
      return z.preprocess(
        (value) => (value === "" ? undefined : value),
        z.boolean({ error: "Please agree to continue" }).refine((value) => value === true, {
          error: "Please agree to continue",
        })
      );
    }

    return schema.optional();
  },

  Editor: CheckboxFieldEditor,
  Renderer: CheckboxFieldRenderer,
};
