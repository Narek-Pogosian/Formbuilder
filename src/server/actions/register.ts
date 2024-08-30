"use server";

import { registerSchema } from "@/lib/schemas/auth-schemas";
import { actionClient } from ".";
import { db } from "../../lib/db";
import bcrypt from "bcrypt";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput }) => {
    const hashedPassword = bcrypt.hashSync(parsedInput.password, 10);
    const { email } = await db.user.create({
      data: {
        name: parsedInput.firstName + " " + parsedInput.lastName,
        email: parsedInput.email,
        hashedPassword: hashedPassword,
      },
    });

    return {
      email,
      password: parsedInput.password,
    };
  });
