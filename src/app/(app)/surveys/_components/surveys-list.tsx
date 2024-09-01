import { type Form } from "@prisma/client";
import { Squirrel } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PublishForm from "./publish-form-dialog";
import DeleteFormDialog from "./delete-form-dialog";
import CancelFormDialog from "./cancel-form-dialog";
import UncancelButton from "./uncancel-button";

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
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
            {!survey.isCancelled ? (
              <span className="h-fit text-sm font-medium">
                {survey.isPublished ? "Published" : "Draft"}
              </span>
            ) : (
              <span className="text-sm font-medium text-danger-500">
                Cancelled
              </span>
            )}
          </div>

          <div className="flex justify-between">
            {!survey.isPublished && (
              <div className="flex gap-2">
                <PublishForm id={survey.id} />
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
            <div className="flex gap-2">
              <DeleteFormDialog id={survey.id} />
              {survey.isPublished &&
                (!survey.isCancelled ? (
                  <CancelFormDialog id={survey.id} />
                ) : (
                  <UncancelButton id={survey.id} />
                ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SurveysList;
