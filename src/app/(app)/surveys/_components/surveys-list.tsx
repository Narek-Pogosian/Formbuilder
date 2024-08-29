import { type Form } from "@prisma/client";
import { Button } from "@/components/ui/button";
import DeleteFormDialog from "./delete-form-dialog";
import Link from "next/link";
import { Squirrel } from "lucide-react";

interface SurveysListProps {
  surveys: Form[];
}

function SurveysList({ surveys }: SurveysListProps) {
  if (surveys.length == 0) {
    return (
      <div className="mx-auto max-w-lg pt-10 text-center font-semibold text-foreground-muted">
        <Squirrel className="mx-auto mb-4 size-44" strokeWidth={1} />
        Empty. No surveys here.
      </div>
    );
  }

  return (
    <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {surveys.map((survey) => (
        <li
          key={survey.id}
          className="shadow relative rounded bg-background-card p-6"
        >
          <Link
            href={`/surveys/${survey.id}`}
            className="mb-1 block font-semibold after:absolute after:inset-0"
          >
            {survey.title}
          </Link>
          <p className="mb-8 text-sm font-medium text-foreground-muted">
            {new Date(survey.createdAt).toLocaleDateString()}
          </p>

          <div className="flex gap-2">
            <DeleteFormDialog id={survey.id} />
            <Button asChild variant="outline" size="sm">
              <Link href={`/surveys/${survey.id}/edit`} className="relative">
                Edit
              </Link>
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SurveysList;
