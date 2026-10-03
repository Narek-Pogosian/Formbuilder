"use client";

import type { FieldRendererProps } from "../registry";

export default function HeadingFieldRenderer({ fieldDefinition }: FieldRendererProps) {
  if (fieldDefinition.type !== "heading") return null;

  return <h2 className="text-xl font-semibold">{fieldDefinition.text}</h2>;
}
