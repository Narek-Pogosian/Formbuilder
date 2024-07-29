"use server";

import { protectedActionClient } from ".";
import { createFormScema } from "@/lib/schemas/form-schema";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export const saveForm = protectedActionClient
  .schema(createFormScema)
  .action(async ({ ctx, parsedInput }) => {
    const form = await db.form.create({
      data: {
        title: parsedInput.title,
        content: JSON.stringify(parsedInput.form),
        userId: ctx.userId,
      },
    });

    if (form) revalidatePath("/form");
  });
