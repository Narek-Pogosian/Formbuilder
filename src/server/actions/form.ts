"use server";

import { z } from "zod";
import { db } from "../db";
import { protectedActionClient } from ".";
import { createFormScema } from "@/lib/schemas/form-schema";
import { revalidatePath } from "next/cache";
import { getFormById } from "../data-access/form";

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

    if (form) revalidatePath("/surveys");
  });

export const updateForm = protectedActionClient
  .schema(z.object({ id: z.string(), form: createFormScema }))
  .action(async ({ ctx, parsedInput }) => {
    const form = await getFormById(parsedInput.id);
    if (form?.userId !== ctx.userId) return;

    const updatedForm = await db.form.update({
      where: { id: parsedInput.id },
      data: {
        title: parsedInput.form.title,
        content: JSON.stringify(parsedInput.form.form),
      },
    });
    if (updatedForm) revalidatePath("/surveys");
  });

export const deleteFormById = protectedActionClient
  .schema(z.string())
  .action(async ({ ctx, parsedInput }) => {
    const form = await db.form.findFirst({ where: { id: parsedInput } });

    if (!form || form.userId !== ctx.userId) return;

    await db.form.delete({ where: { id: parsedInput } });
    revalidatePath("/surveys");
  });
