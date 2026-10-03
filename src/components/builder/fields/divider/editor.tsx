"use client";

import { type FieldEditorProps, fieldRegistry } from "../registry";
import { useForm } from "react-hook-form";
import Editor from "../shared/editor";

export default function DividerFieldEditor({ fieldDefinition }: FieldEditorProps) {
  if (fieldDefinition.type !== "divider") throw new Error("Invalid field type");

  const form = useForm({
    defaultValues: {},
  });

  const Icon = fieldRegistry.get("divider").icon;

  return (
    <Editor fieldDefinition={fieldDefinition} form={form} Icon={Icon}>
      <p className="text-sm text-muted-foreground">
        This divider will appear as a horizontal line between content sections.
      </p>
    </Editor>
  );
}
