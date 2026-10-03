import { type FieldPlugin } from "../registry";
import { baseFieldSchema } from "../shared/schema";
import { Pilcrow } from "lucide-react";
import ParagraphFieldRenderer from "./renderer";
import ParagraphFieldEditor from "./editor";
import z from "zod";

const paragraphSchema = baseFieldSchema.extend({
  type: z.literal("paragraph"),
  text: z.string().trim().min(1, { error: "Text is required" }),
});

export const ParagraphFieldPlugin: FieldPlugin<typeof paragraphSchema> = {
  icon: Pilcrow,
  category: "layout",
  definitionSchema: paragraphSchema,

  createInitialDefinition() {
    return {
      id: crypto.randomUUID(),
      type: "paragraph",
      text: "",
    };
  },

  createValidationSchema: null,

  Editor: ParagraphFieldEditor,
  Renderer: ParagraphFieldRenderer,
};
