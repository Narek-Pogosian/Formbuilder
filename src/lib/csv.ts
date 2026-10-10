"use client";

import { fieldRegistry, type FormDefinitions } from "@/components/builder/fields/registry";

function escapeCell(v: unknown) {
  if (v === undefined || v === null) return "";
  if (Array.isArray(v)) v = v.join("; ");
  const s = typeof v === "object" ? JSON.stringify(v) : String(v);
  return `"${s.replace(/"/g, '""')}"`;
}

export type GetResponsesType = {
  fileName: string;
  fields: FormDefinitions;
  answers: unknown[];
};

export function createCSVFile(data: GetResponsesType) {
  const csvLines: string[] = [];

  const inputFields = data.fields.flatMap((field) => {
    if (fieldRegistry.get(field.type).category !== "input" || !("label" in field)) {
      return [];
    }

    return [{ id: field.id, label: field.label }];
  });

  const headers = inputFields.map((field) => field.label);

  csvLines.push(headers.map((h) => `"${String(h).replace(/"/g, '""')}"`).join(","));

  for (const answer of data.answers) {
    const row = inputFields.map((f, index) => {
      let cell: unknown;

      if (answer && typeof answer === "object") {
        if (Array.isArray(answer)) {
          cell = answer[index];
        } else {
          cell = (answer as Record<string, unknown>)[f.id];
        }
      } else {
        cell = answer;
      }

      return escapeCell(cell);
    });

    csvLines.push(row.join(","));
  }

  return csvLines.join("\n");
}

export function downLoadCSVFile(csv: string, fileName = "responses") {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  const date = new Date().toISOString().slice(0, 10);

  a.href = url;
  a.download = `${fileName}_${date}.csv`;
  document.body.appendChild(a);

  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
