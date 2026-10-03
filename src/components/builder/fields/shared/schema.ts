import z from "zod";

export const baseFieldSchema = z.object({
  id: z.string(),
});

export const inputFieldSchema = baseFieldSchema.extend({
  label: z.string().trim().min(1, { error: "Label is required" }),
  description: z.string().trim().optional(),
  isRequired: z.boolean(),
});
