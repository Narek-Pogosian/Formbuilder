"use server";

import z from "zod";
import { actionClient, ActionError } from "./action-client";
import { createValidationSchema } from "@/components/builder/lib/create-validation";
import { type FormDefinitions } from "@/components/builder/fields/registry";
import { forms, responses } from "../db/schema";
import { eq } from "drizzle-orm";

const respondToFormDefinitions = z.object({
  formId: z.number(),
  answers: z.string(),
});

export const respondToFormAction = actionClient
  .inputSchema(respondToFormDefinitions)
  .action(async ({ parsedInput, ctx }) => {
    const form = await ctx.db.query.forms.findFirst({
      where: eq(forms.id, parsedInput.formId),
    });

    if (!form) {
      throw new ActionError("Form not found.");
    }

    if (form.status === "cancelled") {
      throw new ActionError("This form is no longer accepting responses.");
    }

    // const parsedForm = FormDefinitions.safeParse(form.content);
    // if (!parsedForm.success) {
    //   throw new ActionError("Form content is invalid.");
    // }

    let answers: unknown;
    try {
      answers = JSON.parse(parsedInput.answers);
    } catch (_) {
      throw new ActionError("Invalid answers payload.");
    }

    const { schema } = createValidationSchema(form.content as FormDefinitions);
    const validation = schema.safeParse(answers);
    if (!validation.success) {
      throw new ActionError("Submitted answers are invalid.");
    }

    await ctx.db.insert(responses).values({
      formId: parsedInput.formId,
      answers: validation.data,
    });
  });
