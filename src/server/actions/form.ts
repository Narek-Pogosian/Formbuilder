"use server";

import { FormSchema } from "@/components/formbuilder";
import { db } from "../db";

export async function saveForm({
  form,
  title,
}: {
  form: FormSchema;
  title: string;
}) {
  return db.form.create({ data: { title, content: JSON.stringify(form) } });
}
