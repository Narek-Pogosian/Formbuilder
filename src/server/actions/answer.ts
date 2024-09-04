import { actionClient } from ".";
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
    const answer = await db.response.create({
      data: {
        answers: parsedInput.answers,
        surveyId: parsedInput.surveyId,
        respondent: "",
      },
    });

    if (answer) return { success: true };
    return { success: false };
  });
