"use client";

import { type FieldRendererProps } from "../registry";

export default function DividerFieldRenderer({ fieldDefinition }: FieldRendererProps) {
  if (fieldDefinition.type !== "divider") return null;

  return <hr className="w-full rounded-full border-2 border-foreground/15" />;
}
