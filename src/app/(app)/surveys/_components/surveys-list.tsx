import { type Form } from "@prisma/client";
import { Squirrel } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PublishForm from "./publish-form-dialog";
import DeleteFormDialog from "./delete-form-dialog";
import CancelFormDialog from "./cancel-form-dialog";
import UncancelButton from "./uncancel-button";
import { Badge } from "@/components/ui/badge";
import SharePopover from "./share-popover";

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
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {surveys.map((survey) => (
        <li
          key={survey.id}
          className="relative rounded bg-background-card px-6 pb-6 pt-3"
        >
          <div className="mb-1 flex justify-between">
            {!survey.isCancelled ? (
              survey.isPublished ? (
                <Badge>Published</Badge>
              ) : (
                <Badge variant="secondary">Draft</Badge>
              )
            ) : (
              <Badge variant="cancel">Cancelled</Badge>
            )}
            <SharePopover id={survey.id} />
          </div>

          <div className="mb-10">
            <Link
              href={`/surveys/${survey.id}`}
              className="block text-lg font-semibold"
            >
              {survey.title}
            </Link>
            <p className="text-sm font-medium text-foreground-muted">
              {new Date(survey.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2">
              {!survey.isPublished ? (
                <>
                  <PublishForm id={survey.id} />
                  <Button asChild variant="ghost" size="sm">
                    <Link
                      href={`/surveys/${survey.id}/edit`}
                      className="relative"
                    >
                      Edit
                    </Link>
                  </Button>
                </>
              ) : !survey.isCancelled ? (
                <CancelFormDialog id={survey.id} />
              ) : (
                <UncancelButton id={survey.id} />
              )}
            </div>

            <DeleteFormDialog id={survey.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SurveysList;
