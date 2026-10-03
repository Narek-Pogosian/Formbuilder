"use client";

import { type FieldRendererProps } from "../registry";

export default function ParagraphFieldRenderer({ fieldDefinition }: FieldRendererProps) {
  if (fieldDefinition.type !== "paragraph") return null;

  return (
    <div className="leading-6 font-medium whitespace-pre-wrap text-muted-foreground">
      {fieldDefinition.text}
    </div>
  );
}
