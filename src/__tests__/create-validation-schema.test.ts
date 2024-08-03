import { type FormSchema } from "@/lib/schemas/form-schema";
import { createValidationSchema } from "../components/formrenderer/create-validation";
import { describe, it, expect } from "vitest";

describe("createValidationSchema", () => {
  it("should create a schema for text and textarea field with min and max length", async () => {
    const form: FormSchema = [
      {
        id: "id",
        type: "text",
        label: "username",
        placeholder: "",
        minLength: 3,
        maxLength: 10,
        required: true,
      },
      {
        id: "id",
        type: "textarea",
        label: "bio",
        placeholder: "",
        minLength: 3,
        maxLength: 10,
        required: true,
      },
    ];

    const schema = createValidationSchema(form);

    expect(schema.shape).toHaveProperty("username");
    expect(schema.shape).toHaveProperty("bio");

    await expect(
      schema.parseAsync({ username: "a", bio: "okay" }),
    ).rejects.toThrow(/at least 3 characters/);

    await expect(
      schema.parseAsync({ username: "okay", bio: "a" }),
    ).rejects.toThrow(/at least 3 characters/);

    await expect(
      schema.parseAsync({ username: "a".repeat(11), bio: "okay" }),
    ).rejects.toThrow(/at most 10 characters/);

    await expect(
      schema.parseAsync({ username: "okay", bio: "a".repeat(11) }),
    ).rejects.toThrow(/at most 10 characters/);

    await expect(
      schema.parseAsync({ username: "valid", bio: "valid" }),
    ).resolves.not.toThrow();
  });

  it("should create a schema for optional text and number fields", async () => {
    const form: FormSchema = [
      {
        id: "id1",
        type: "text",
        label: "nickname",
        required: false,
        placeholder: "",
      },
      {
        id: "id2",
        type: "number",
        label: "age",
        required: false,
      },
    ];

    const schema = createValidationSchema(form);

    expect(schema.shape).toHaveProperty("nickname");
    expect(schema.shape).toHaveProperty("age");

    await expect(
      schema.parseAsync({ nickname: "", age: "" }),
    ).resolves.not.toThrow();

    await expect(
      schema.parseAsync({ nickname: undefined, age: undefined }),
    ).resolves.not.toThrow();

    await expect(
      schema.parseAsync({ nickname: "name", age: undefined }),
    ).resolves.not.toThrow();
  });

  it("should create a schema for a number field with min and max", async () => {
    const form: FormSchema = [
      {
        id: "id",
        type: "number",
        label: "age",
        min: 18,
        max: 99,
        required: true,
      },
    ];

    const schema = createValidationSchema(form);

    expect(schema.shape).toHaveProperty("age");

    await expect(schema.parseAsync({ age: 17 })).rejects.toThrow(/at least 18/);
    await expect(schema.parseAsync({ age: 100 })).rejects.toThrow(/at most 99/);
    await expect(schema.parseAsync({ age: 50 })).resolves.not.toThrow();
  });

  it("should throw an error for unsupported field type", () => {
    const form = [
      {
        id: "id",
        type: "unsupported",
        label: "unsupportedField",
        required: true,
      },
      {
        id: "id",
        type: "number",
        label: "age",
        min: 18,
        max: 99,
        required: true,
      },
    ];

    // @ts-expect-error we are testing a wrong input
    expect(() => createValidationSchema(form)).toThrow(
      /Unsupported field type/,
    );
  });
});
