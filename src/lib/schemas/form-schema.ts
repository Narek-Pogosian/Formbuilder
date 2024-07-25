import { z } from "zod";

const Inputs = ["text", "number", "date"] as const;

const baseSchema = z.object({
  label: z.string(),
  type: z.enum(Inputs),
  required: z.boolean(),
});

export const MAX_LENGTH = 300;
export const textSchema = baseSchema.extend({
  type: z.literal("text"),
  minLength: z.coerce.number().min(0).max(MAX_LENGTH).optional(),
  maxLength: z.coerce.number().min(0).max(MAX_LENGTH).optional(),
});

export const numberSchema = baseSchema.extend({
  type: z.literal("number"),
  min: z.coerce.number().optional(),
  max: z.coerce.number().optional(),
});

export const dateSchema = baseSchema.extend({
  type: z.literal("date"),
  minDate: z.string().optional(),
  maxDate: z.string().optional(),
});

export const formSchema = z
  .array(z.discriminatedUnion("type", [textSchema, numberSchema, dateSchema]))
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

export type FormSchema = z.infer<typeof formSchema>;
export type InputType = (typeof Inputs)[number];
