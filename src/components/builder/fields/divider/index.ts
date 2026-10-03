import { type FieldPlugin } from "../registry";
import { baseFieldSchema } from "../shared/schema";
import { Minus } from "lucide-react";
import DividerFieldRenderer from "./renderer";
import DividerFieldEditor from "./editor";
import z from "zod";

const dividerSchema = baseFieldSchema.extend({
  type: z.literal("divider"),
});

export const DividerFieldPlugin: FieldPlugin<typeof dividerSchema> = {
  icon: Minus,
  category: "layout",
  definitionSchema: dividerSchema,

  createInitialDefinition() {
    return {
      id: crypto.randomUUID(),
      type: "divider",
    };
  },

  createValidationSchema: null,

  Editor: DividerFieldEditor,
  Renderer: DividerFieldRenderer,
};
