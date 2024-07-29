import { z } from "zod";

const Inputs = ["text", "number"] as const;

const baseSchema = z.object({
  label: z.string().min(1),
  type: z.enum(Inputs),
  required: z.boolean(),
  id: z.string(),
});

export const MAX_LENGTH = 300;
export const textSchema = baseSchema.extend({
  type: z.literal("text"),
  minLength: z.coerce.number().min(0).max(MAX_LENGTH).optional(),
  maxLength: z.coerce.number().min(0).max(MAX_LENGTH).optional(),
});

export const numberSchema = baseSchema.extend({
  type: z.literal("number"),
  min: z.coerce.number().optional().or(z.literal("")),
  max: z.coerce.number().optional().or(z.literal("")),
});

export const formSchema = z
  .array(z.discriminatedUnion("type", [textSchema, numberSchema]))
  .refine(
    (data) => {
      const labels = data.map((item) => item.label);
      const uniqueLabels = new Set(labels);
      return uniqueLabels.size === labels.length;
    },
    {
      message: "Labels must be unique",
      path: [],
    },
  );

export const createFormScema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  form: formSchema,
});

export type InputType = (typeof Inputs)[number];
export type FormSchema = z.infer<typeof formSchema>;
export type CreateFormSchema = z.infer<typeof createFormScema>;
export type TextSchemaType = z.infer<typeof textSchema>;
export type NumberSchemaType = z.infer<typeof numberSchema>;
