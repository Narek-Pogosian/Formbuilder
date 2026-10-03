import { createValidationSchema } from "./create-validation";
import { describe, it, expect } from "vitest";
import { type FormDefinitions } from "../fields/registry";

describe("createValidationSchema", () => {
  it("builds a validation schema for a required text field", () => {
    const form: FormDefinitions = [
      {
        id: "text-1",
        type: "text",
        label: "Text",
        description: "A required text field",
        validationRule: "none",
        isRequired: true,
        longAnswer: false,
        placeholder: "",
      },
    ];

    const { schema, defaultValues } = createValidationSchema(form);

    expect(defaultValues).toEqual({ "text-1": "" });
    expect(schema.safeParse({ "text-1": "Hello" }).success).toBe(true);
    expect(schema.safeParse({ "text-1": "" }).success).toBe(false);
    expect(schema.safeParse({}).success).toBe(false);
  });

  it("accepts blank or omitted values for optional text fields and trims whitespace", () => {
    const form: FormDefinitions = [
      {
        id: "text-1",
        type: "text",
        label: "Text",
        description: "An optional text field",
        validationRule: "none",
        isRequired: false,
        longAnswer: false,
        placeholder: "",
      },
    ];

    const { schema, defaultValues } = createValidationSchema(form);

    expect(defaultValues).toEqual({ "text-1": "" });
    expect(schema.safeParse({ "text-1": "Hello" }).success).toBe(true);
    expect(schema.safeParse({ "text-1": "" }).success).toBe(true);
    expect(schema.safeParse({ "text-1": "   " }).success).toBe(true);
    expect(schema.safeParse({}).success).toBe(true);
  });

  it("validates required email fields and rejects invalid formats", () => {
    const form: FormDefinitions = [
      {
        id: "text-1",
        type: "text",
        label: "Email",
        description: "A required email field",
        validationRule: "email",
        isRequired: true,
        longAnswer: false,
        placeholder: "",
      },
    ];

    const { schema, defaultValues } = createValidationSchema(form);

    expect(defaultValues).toEqual({ "text-1": "" });
    expect(schema.safeParse({ "text-1": "Hello" }).success).toBe(false);
    expect(schema.safeParse({ "text-1": "" }).success).toBe(false);
    expect(schema.safeParse({ "text-1": "test@example.com" }).success).toBe(true);
    expect(schema.safeParse({}).success).toBe(false);
  });

  it("validates URL fields and rejects malformed values", () => {
    const form: FormDefinitions = [
      {
        id: "text-1",
        type: "text",
        label: "Website",
        description: "A required URL field",
        validationRule: "url",
        isRequired: true,
        longAnswer: false,
        placeholder: "",
      },
    ];

    const { schema } = createValidationSchema(form);

    expect(schema.safeParse({ "text-1": "https://example.com" }).success).toBe(true);
    expect(schema.safeParse({ "text-1": "not-a-url" }).success).toBe(false);
    expect(schema.safeParse({ "text-1": "" }).success).toBe(false);
  });

  it("enforces long-answer limits and trims whitespace before validation", () => {
    const form: FormDefinitions = [
      {
        id: "text-1",
        type: "text",
        label: "Bio",
        description: "A long-answer text field",
        validationRule: "none",
        isRequired: false,
        longAnswer: true,
        placeholder: "",
      },
    ];

    const { schema } = createValidationSchema(form);
    const longValue = "a".repeat(1001);

    expect(schema.safeParse({ "text-1": "hello" }).success).toBe(true);
    expect(schema.safeParse({ "text-1": "   hello   " }).success).toBe(true);
    expect(schema.safeParse({ "text-1": longValue }).success).toBe(false);
    expect(schema.safeParse({ "text-1": "" }).success).toBe(true);
  });

  it("validates options fields with multiple answers enabled", () => {
    const form: FormDefinitions = [
      {
        id: "options-1",
        type: "options",
        label: "Options",
        description: "Select one or more options",
        multipleAnswers: true,
        isRequired: true,
        options: [{ value: "Option 1" }, { value: "Option 2" }, { value: "Option 3" }],
      },
    ];

    const { schema, defaultValues } = createValidationSchema(form);

    expect(defaultValues).toEqual({ "options-1": [] });
    expect(schema.safeParse({ "options-1": ["Option 2"] }).success).toBe(true);
    expect(schema.safeParse({ "options-1": ["Option 1", "Option 3"] }).success).toBe(true);
    expect(schema.safeParse({ "options-1": [] }).success).toBe(false);
    expect(schema.safeParse({ "options-1": ["Invalid"] }).success).toBe(false);
    expect(schema.safeParse({ "options-1": ["Option 2", "Invalid"] }).success).toBe(false);
  });

  it("accepts blank values for optional multi-select fields while rejecting invalid selections", () => {
    const form: FormDefinitions = [
      {
        id: "options-2",
        type: "options",
        label: "Options",
        description: "Optional multi-select field",
        multipleAnswers: true,
        isRequired: false,
        options: [{ value: "Option 1" }, { value: "Option 2" }, { value: "Option 3" }],
      },
    ];

    const { schema, defaultValues } = createValidationSchema(form);

    expect(defaultValues).toEqual({ "options-2": [] });
    expect(schema.safeParse({ "options-2": [] }).success).toBe(true);
    expect(schema.safeParse({ "options-2": ["Option 2"] }).success).toBe(true);
    expect(schema.safeParse({ "options-2": ["Invalid"] }).success).toBe(false);
  });

  it("validates optional single-select fields and rejects invalid options", () => {
    const form: FormDefinitions = [
      {
        id: "options-3",
        type: "options",
        label: "Options",
        description: "Select one option",
        multipleAnswers: false,
        isRequired: false,
        options: [{ value: "Option 1" }, { value: "Option 2" }, { value: "Option 3" }],
      },
    ];

    const { schema, defaultValues } = createValidationSchema(form);

    expect(defaultValues).toEqual({ "options-3": undefined });
    expect(schema.safeParse({ "options-3": "Option 2" }).success).toBe(true);
    expect(schema.safeParse({ "options-3": undefined }).success).toBe(true);
    expect(schema.safeParse({ "options-3": "" }).success).toBe(false);
    expect(schema.safeParse({ "options-3": "Invalid" }).success).toBe(false);
  });

  it("validates number fields with required, min, and max constraints", () => {
    const form: FormDefinitions = [
      {
        id: "number-1",
        type: "number",
        label: "Number",
        description: "A required number field",
        isRequired: true,
        min: 1,
        max: 10,
      },
    ];

    const { schema, defaultValues } = createValidationSchema(form);

    expect(defaultValues).toEqual({ "number-1": "" });
    expect(schema.safeParse({ "number-1": "5" }).success).toBe(true);
    expect(schema.safeParse({ "number-1": "" }).success).toBe(false);
    expect(schema.safeParse({ "number-1": "abc" }).success).toBe(false);
    expect(schema.safeParse({ "number-1": "0" }).success).toBe(false);
    expect(schema.safeParse({ "number-1": "11" }).success).toBe(false);
  });

  it("accepts blank numbers for optional fields while still enforcing min and max", () => {
    const form: FormDefinitions = [
      {
        id: "number-1",
        type: "number",
        label: "Number",
        description: "An optional number field",
        isRequired: false,
        min: 1,
        max: 10,
      },
    ];

    const { schema, defaultValues } = createValidationSchema(form);

    expect(defaultValues).toEqual({ "number-1": "" });
    expect(schema.safeParse({ "number-1": "5" }).success).toBe(true);
    expect(schema.safeParse({ "number-1": "" }).success).toBe(true);
    expect(schema.safeParse({ "number-1": "   " }).success).toBe(true);
    expect(schema.safeParse({ "number-1": "abc" }).success).toBe(false);
    expect(schema.safeParse({ "number-1": "0" }).success).toBe(false);
    expect(schema.safeParse({ "number-1": "11" }).success).toBe(false);
  });

  it("validates checkbox fields and enforces required consent", () => {
    const requiredForm: FormDefinitions = [
      {
        id: "checkbox-1",
        type: "checkbox",
        label: "Terms",
        description: "I agree to the terms",
        isRequired: true,
      },
    ];

    const optionalForm: FormDefinitions = [
      {
        id: "checkbox-2",
        type: "checkbox",
        label: "Newsletter",
        description: "Receive updates",
        isRequired: false,
      },
    ];

    const requiredSchema = createValidationSchema(requiredForm).schema;
    const optionalSchema = createValidationSchema(optionalForm).schema;

    expect(createValidationSchema(requiredForm).defaultValues).toEqual({ "checkbox-1": false });
    expect(requiredSchema.safeParse({ "checkbox-1": true }).success).toBe(true);
    expect(requiredSchema.safeParse({ "checkbox-1": false }).success).toBe(false);
    expect(requiredSchema.safeParse({ "checkbox-1": "" }).success).toBe(false);
    expect(requiredSchema.safeParse({}).success).toBe(false);

    expect(createValidationSchema(optionalForm).defaultValues).toEqual({ "checkbox-2": false });
    expect(optionalSchema.safeParse({ "checkbox-2": true }).success).toBe(true);
    expect(optionalSchema.safeParse({ "checkbox-2": false }).success).toBe(true);
    expect(optionalSchema.safeParse({ "checkbox-2": "" }).success).toBe(false);
    expect(optionalSchema.safeParse({}).success).toBe(true);
  });

  it("validates date and time fields, including min/max boundaries and required values", () => {
    const dateForm: FormDefinitions = [
      {
        id: "date-1",
        type: "dateTime",
        label: "Date",
        description: "Select a date",
        isRequired: false,
        placeholder: "",
        mode: "date",
        min: "2024-01-01",
        max: "2024-12-31",
      },
    ];

    const timeForm: FormDefinitions = [
      {
        id: "time-1",
        type: "dateTime",
        label: "Time",
        description: "Select a time",
        isRequired: true,
        placeholder: "",
        mode: "time",
        min: "09:00",
        max: "17:00",
      },
    ];

    const dateSchema = createValidationSchema(dateForm).schema;
    const timeSchema = createValidationSchema(timeForm).schema;

    expect(createValidationSchema(dateForm).defaultValues).toEqual({ "date-1": "" });
    expect(dateSchema.safeParse({ "date-1": "2024-06-15" }).success).toBe(true);
    expect(dateSchema.safeParse({ "date-1": "2024-01-01" }).success).toBe(true);
    expect(dateSchema.safeParse({ "date-1": "2024-12-31" }).success).toBe(true);
    expect(dateSchema.safeParse({ "date-1": "2023-12-31" }).success).toBe(false);
    expect(dateSchema.safeParse({ "date-1": "2025-01-01" }).success).toBe(false);
    expect(dateSchema.safeParse({ "date-1": "not-a-date" }).success).toBe(false);
    expect(dateSchema.safeParse({ "date-1": "" }).success).toBe(true);

    expect(createValidationSchema(timeForm).defaultValues).toEqual({ "time-1": "" });
    expect(timeSchema.safeParse({ "time-1": "09:30" }).success).toBe(true);
    expect(timeSchema.safeParse({ "time-1": "17:00" }).success).toBe(true);
    expect(timeSchema.safeParse({ "time-1": "08:59" }).success).toBe(false);
    expect(timeSchema.safeParse({ "time-1": "17:01" }).success).toBe(false);
    expect(timeSchema.safeParse({ "time-1": "" }).success).toBe(false);
    expect(timeSchema.safeParse({ "time-1": "invalid" }).success).toBe(false);
  });

  it("accepts datetime-local values in the expected format and rejects malformed input", () => {
    const form: FormDefinitions = [
      {
        id: "datetime-1",
        type: "dateTime",
        label: "Appointment",
        description: "Choose a date and time",
        isRequired: false,
        placeholder: "",
        mode: "datetime-local",
        min: "2024-01-01T09:00",
        max: "2024-01-01T17:00",
      },
    ];

    const { schema } = createValidationSchema(form);

    expect(schema.safeParse({ "datetime-1": "2024-01-01T10:30" }).success).toBe(true);
    expect(schema.safeParse({ "datetime-1": "2024-01-01T09:00" }).success).toBe(true);
    expect(schema.safeParse({ "datetime-1": "2024-01-01T17:00" }).success).toBe(true);
    expect(schema.safeParse({ "datetime-1": "2024-01-01T08:59" }).success).toBe(false);
    expect(schema.safeParse({ "datetime-1": "2024-01-01T17:01" }).success).toBe(false);
    expect(schema.safeParse({ "datetime-1": "2024-01-01 10:30" }).success).toBe(false);
  });
});
