import { getServerAuthSession } from "@/server/auth";
import { getAllAnswers, getFormById } from "@/server/data-access/form";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { surveyId: string } },
) {
  try {
    const [session, survey] = await Promise.all([
      getServerAuthSession(),
      getFormById(params.surveyId),
    ]);
    if (session?.user.id !== survey?.userId) {
      return;
    }

    const answers = await getAllAnswers(params.surveyId);
    return Response.json({ answers });
  } catch (_) {
    return Response.error();
  }
}

export type GetAnswersType = {
  answers: Awaited<ReturnType<typeof getAllAnswers>>;
};
