import { type FieldPlugin } from "../registry";
import { inputFieldSchema } from "../shared/schema";
import { CalendarClock } from "lucide-react";
import DateTimeFieldRenderer from "./renderer";
import DateTimeFieldEditor from "./editor";
import z from "zod";

const dateTimeSchema = inputFieldSchema.extend({
  type: z.literal("dateTime"),
  placeholder: z.string().optional(),
  mode: z.enum(["date", "time", "datetime-local"]),
  min: z.string().optional(),
  max: z.string().optional(),
});

export const DateTimeFieldPlugin: FieldPlugin<typeof dateTimeSchema> = {
  icon: CalendarClock,
  category: "input",
  definitionSchema: dateTimeSchema,

  createInitialDefinition() {
    return {
      id: crypto.randomUUID(),
      type: "dateTime",
      label: "",
      description: "",
      isRequired: false,
      placeholder: "",
      mode: "date",
      min: "",
      max: "",
    };
  },

  createValidationSchema(field) {
    const valueSchema = z
      .string()
      .trim()
      .refine((value) => value === "" || isValidDateTimeValue(value, field.mode), {
        error: "Please enter a valid date/time",
      });

    let nextSchema = valueSchema;

    if (field.min) {
      nextSchema = nextSchema.refine((value) => value === "" || value >= field.min!, {
        error: `Value must be on or after ${field.min}`,
      });
    }

    if (field.max) {
      nextSchema = nextSchema.refine((value) => value === "" || value <= field.max!, {
        error: `Value must be on or before ${field.max}`,
      });
    }

    if (field.isRequired) {
      return nextSchema.refine((value) => value.trim().length > 0, {
        error: "Please enter a value",
      });
    }

    return nextSchema.optional().or(z.literal(""));
  },

  Editor: DateTimeFieldEditor,
  Renderer: DateTimeFieldRenderer,
};

function isValidDateTimeValue(value: string, mode: "date" | "time" | "datetime-local") {
  switch (mode) {
    case "date":
      return /^\d{4}-\d{2}-\d{2}$/.test(value);
    case "time":
      return /^\d{2}:\d{2}$/.test(value);
    case "datetime-local":
      return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value);
    default:
      return false;
  }
}
