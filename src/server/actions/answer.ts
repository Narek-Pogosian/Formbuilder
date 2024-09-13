"use server";

import { actionClient } from ".";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { z } from "zod";

export const answerSurvey = actionClient
  .schema(
    z.object({
      surveyId: z.string(),
      answers: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const ip = headers().get("x-forwarded-for") ?? "kek";
    const found = await db.response.findFirst({
      where: { surveyId: parsedInput.surveyId, respondent: ip },
    });

    if (found) {
      return;
    }

    const answer = await db.response.create({
      data: {
        answers: parsedInput.answers,
        surveyId: parsedInput.surveyId,
        respondent: ip,
      },
    });

    if (answer) return { success: true };
    return { success: false };
  });
