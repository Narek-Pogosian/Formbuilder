import { type Form } from "@prisma/client";
import { Squirrel } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublishFormButton from "./publish-form-button";
import DeleteFormDialog from "./delete-form-dialog";
import Link from "next/link";

interface SurveysListProps {
  surveys: Form[];
}

function SurveysList({ surveys }: SurveysListProps) {
  if (surveys.length == 0) {
    return (
      <div className="mx-auto max-w-lg pt-20 text-center font-semibold text-foreground-muted">
        <Squirrel className="mx-auto mb-4 size-44" strokeWidth={1} />
        Empty. No surveys here.
      </div>
    );
  }

  return (
    <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {surveys.map((survey) => (
        <li key={survey.id} className="relative rounded bg-background-card p-6">
          <div className="flex justify-between">
            <div>
              <Link
                href={`/surveys/${survey.id}`}
                className="mb-1 block font-semibold after:absolute after:inset-0"
              >
                {survey.title}
              </Link>
              <p className="mb-8 text-sm font-medium text-foreground-muted">
                {new Date(survey.createdAt).toLocaleDateString()}
              </p>
            </div>
            {survey.isPublished && (
              <span className="text-sm font-medium">Published</span>
            )}
          </div>

          <div className="flex justify-between">
            {!survey.isPublished && (
              <div className="flex gap-2">
                <PublishFormButton id={survey.id} />
                <Button asChild variant="outline" size="sm">
                  <Link
                    href={`/surveys/${survey.id}/edit`}
                    className="relative"
                  >
                    Edit
                  </Link>
                </Button>
              </div>
            )}
            <DeleteFormDialog id={survey.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SurveysList;
