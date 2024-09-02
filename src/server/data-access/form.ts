import { redirect } from "next/navigation";
import { getServerAuthSession } from "../auth";
import { cache } from "react";
import { db } from "@/lib/db";

export async function getForms() {
  const session = await getServerAuthSession();
  if (!session) throw redirect("/sign-in");

  return db.form.findMany({ where: { userId: session.user.id } });
}

export const getFormById = cache(async (id: string) => {
  const form = await db.form.findFirst({ where: { id } });

  return form;
});
