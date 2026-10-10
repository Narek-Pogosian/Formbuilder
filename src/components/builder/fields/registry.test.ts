import { describe, expect, it } from "vitest";
import { validateFormDefinitions, type FormDefinitions } from "./registry";

describe("validateFormDefinitions", () => {
  it("accepts definitions that match their field schemas", () => {
    const fields: unknown = [
      { id: "heading-1", type: "heading", text: "Title" },
      {
        id: "text-1",
        type: "text",
        label: "Name",
        description: "Your name",
        isRequired: true,
        validationRule: "none",
        longAnswer: false,
        placeholder: "",
      },
    ];

    if (!validateFormDefinitions(fields)) {
      throw new Error("Expected field definitions to be valid");
    }

    const definitions: FormDefinitions = fields;
    expect(definitions).toHaveLength(2);
  });

  it("rejects definitions that do not match their field schema", () => {
    const fields: unknown = [
      {
        id: "text-1",
        type: "text",
        label: "",
        isRequired: true,
        validationRule: "none",
        longAnswer: false,
      },
    ];

    expect(validateFormDefinitions(fields)).toBe(false);
  });

  it("rejects field types that are not registered", () => {
    const fields: unknown = [{ id: "unknown-1", type: "unknown" }];

    expect(validateFormDefinitions(fields)).toBe(false);
  });
});
