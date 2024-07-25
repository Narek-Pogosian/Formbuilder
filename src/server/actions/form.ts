"use server";

import { type FormSchema } from "@/lib/schemas/form-schema";
import { db } from "../db";
import { getServerAuthSession } from "../auth";

export async function saveForm({
  form,
  title,
}: {
  form: FormSchema;
  title: string;
}) {
  const session = await getServerAuthSession();
  if (!session) return;

  return db.form.create({
    data: { title, content: JSON.stringify(form), userId: session.user.id },
  });
}
