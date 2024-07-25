import { db } from "../db";

export async function getForms() {
  return db.form.findMany();
}

export async function getFormById(id: string) {
  return db.form.findFirst({ where: { id } });
}
