"use server";

import { protectedActionClient } from ".";
import { formSchema } from "@/lib/schemas/form-schema";
import { db } from "../db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const createFormScema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  form: formSchema,
});

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
