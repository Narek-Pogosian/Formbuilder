import { createValidationSchema } from "../components/formrenderer/create-validation";
import { describe, it, expect } from "vitest";

describe("createValidationSchema", () => {
  it("should create a schema for a text field with min and max length", async () => {
    const form = [
      {
        type: "text",
        label: "usernamee",
        minLength: 3,
        maxLength: 10,
        required: true,
      },
    ];

    const schema = createValidationSchema(form);

    expect(schema.shape).toHaveProperty("username");

    await expect(schema.parseAsync({ username: "a" })).rejects.toThrow(
      /at least 3 characters/,
    );
    await expect(
      schema.parseAsync({ username: "a".repeat(11) }),
    ).rejects.toThrow(/at most 10 characters/);
    await expect(
      schema.parseAsync({ username: "valid" }),
    ).resolves.not.toThrow();
  });

  it("should create a schema for an optional text field", async () => {
    const form = [{ type: "text", label: "nickname", required: false }];

    const schema = createValidationSchema(form);

    expect(schema.shape).toHaveProperty("nickname");

    await expect(schema.parseAsync({ nickname: "" })).resolves.not.toThrow();
    await expect(
      schema.parseAsync({ nickname: undefined }),
    ).resolves.not.toThrow();
    await expect(
      schema.parseAsync({ nickname: "valid" }),
    ).resolves.not.toThrow();
  });

  it("should create a schema for a number field with min and max", async () => {
    const form = [
      { type: "number", label: "age", min: 18, max: 99, required: true },
    ];

    const schema = createValidationSchema(form);

    expect(schema.shape).toHaveProperty("age");

    await expect(schema.parseAsync({ age: 17 })).rejects.toThrow(/at least 18/);
    await expect(schema.parseAsync({ age: 100 })).rejects.toThrow(/at most 99/);
    await expect(schema.parseAsync({ age: 50 })).resolves.not.toThrow();
  });

  it("should create a schema for an optional number field", async () => {
    const form = [{ type: "number", label: "score", required: false }];

    const schema = createValidationSchema(form);

    expect(schema.shape).toHaveProperty("score");

    await expect(schema.parseAsync({ score: "" })).resolves.not.toThrow();
    await expect(
      schema.parseAsync({ score: undefined }),
    ).resolves.not.toThrow();
    await expect(schema.parseAsync({ score: 42 })).resolves.not.toThrow();
  });

  it("should create a schema for a textarea field with min and max length", async () => {
    const form = [
      {
        type: "textarea",
        label: "description",
        minLength: 5,
        maxLength: 50,
        required: true,
      },
    ];

    const schema = createValidationSchema(form);

    expect(schema.shape).toHaveProperty("description");

    await expect(schema.parseAsync({ description: "a" })).rejects.toThrow(
      /at least 5 characters/,
    );
    await expect(
      schema.parseAsync({ description: "a".repeat(51) }),
    ).rejects.toThrow(/at most 50 characters/);
    await expect(
      schema.parseAsync({ description: "valid description" }),
    ).resolves.not.toThrow();
  });

  it("should throw an error for unsupported field type", () => {
    const form = [
      { type: "unsupported", label: "unsupportedField", required: true },
    ];

    expect(() => createValidationSchema(form)).toThrow(
      /Unsupported field type/,
    );
  });
});
