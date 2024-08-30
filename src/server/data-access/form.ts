import { redirect } from "next/navigation";
import { getServerAuthSession } from "../auth";
import { db } from "@/lib/db";

export async function getForms() {
  const session = await getServerAuthSession();
  if (!session) throw redirect("/sign-in");

  return db.form.findMany({ where: { userId: session.user.id } });
}

export async function getFormById(id: string) {
  const session = await getServerAuthSession();
  if (!session) throw redirect("/sign-in");

  const form = await db.form.findFirst({ where: { id } });
  if (form?.userId !== session.user.id) return;

  return form;
}
