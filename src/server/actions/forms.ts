"use server";

import z from "zod";
import { ActionError, protectedActionClient } from "./action-client";
import { revalidatePath } from "next/cache";
import { forms } from "../db/schema";
import { eq } from "drizzle-orm";

const publishFormSchema = z.object({
  title: z.string(),
  content: z.string(),
  description: z.string().optional(),
});

export const publishFormAction = protectedActionClient
  .inputSchema(publishFormSchema)
  .action(async ({ parsedInput, ctx }) => {
    await ctx.db.insert(forms).values({
      userId: ctx.userId,
      title: parsedInput.title,
      content: parsedInput.content,
      description: parsedInput.description,
    });

    revalidatePath("/");
  });

export const deleteFormAction = protectedActionClient
  .inputSchema(z.number())
  .action(async ({ parsedInput, ctx }) => {
    const form = await ctx.db.query.forms.findFirst({
      where: eq(forms.id, parsedInput),
    });

    if (!form) {
      throw new ActionError("Form doesn't exist");
    }

    if (form.userId !== ctx.userId) {
      throw new ActionError("Your are not authorized do delete this form!");
    }

    await ctx.db.delete(forms).where(eq(forms.id, parsedInput));

    revalidatePath("/");
  });

export const toggleFormStatusAction = protectedActionClient
  .inputSchema(z.number())
  .action(async ({ parsedInput, ctx }) => {
    const form = await ctx.db.query.forms.findFirst({
      where: eq(forms.id, parsedInput),
    });

    if (!form) {
      throw new ActionError("Form doesn't exist!");
    }

    if (form.userId !== ctx.userId) {
      throw new ActionError("You are not authorized to cancel this form!");
    }

    await ctx.db
      .update(forms)
      .set({ status: form.status === "cancelled" ? "published" : "cancelled" })
      .where(eq(forms.id, parsedInput));

    revalidatePath("/");
  });
