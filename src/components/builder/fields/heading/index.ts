import { type FieldPlugin } from "../registry";
import { baseFieldSchema } from "../shared/schema";
import { Heading2 } from "lucide-react";
import HeadingFieldRenderer from "./renderer";
import HeadingFieldEditor from "./editor";
import z from "zod";

const headingSchema = baseFieldSchema.extend({
  type: z.literal("heading"),
  text: z.string().min(1, { error: "Text is required" }),
});

export const HeadingFieldPlugin: FieldPlugin<typeof headingSchema> = {
  icon: Heading2,
  category: "layout",
  definitionSchema: headingSchema,

  createInitialDefinition() {
    return {
      id: crypto.randomUUID(),
      type: "heading",
      text: "",
    };
  },

  createValidationSchema: null,

  Editor: HeadingFieldEditor,
  Renderer: HeadingFieldRenderer,
};
