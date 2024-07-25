"use server";

import { type RegisterSchemaType } from "@/lib/schemas/auth-schemas";
import { db } from "../db";
import bcrypt from "bcrypt";

export async function register(values: RegisterSchemaType) {
  const hashedPassword = bcrypt.hashSync(values.password, 10);
  const { email } = await db.user.create({
    data: {
      name: values.firstName + " " + values.lastName,
      email: values.email,
      hashedPassword: hashedPassword,
    },
  });

  return {
    email,
    password: values.password,
  };
}
