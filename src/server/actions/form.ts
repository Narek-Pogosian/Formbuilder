"use server";

import { protectedActionClient } from ".";
import { createFormScema } from "@/lib/schemas/form-schema";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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

export const deleteFormById = protectedActionClient
  .schema(z.string())
  .action(async ({ ctx, parsedInput }) => {
    const form = await db.form.findFirst({ where: { id: parsedInput } });

    if (!form || form.userId !== ctx.userId) return;

    await db.form.delete({ where: { id: parsedInput } });
    revalidatePath("/forms");
  });
