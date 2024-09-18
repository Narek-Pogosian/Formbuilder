import { type Status, type Form } from "@prisma/client";
import { Squirrel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UncancelButton from "./uncancel-button";
import CancelFormDialog from "./cancel-form-dialog";
import DeleteFormDialog from "./delete-form-dialog";
import SharePopover from "./share-popover";
import PublishForm from "./publish-form-dialog";
import Link from "next/link";

interface SurveysListProps {
  surveys: Form[];
}

function SurveysList({ surveys }: SurveysListProps) {
  if (surveys.length === 0) {
    return (
      <div className="mx-auto max-w-lg pt-20 text-center font-medium text-neutral-300 dark:text-neutral-600">
        <Squirrel className="mx-auto mb-4 size-28" strokeWidth={0.75} />
        Empty. No surveys here.
      </div>
    );
  }

  return (
    <ul className="grid gap-8 md:grid-cols-2">
      {surveys.map((survey) => (
        <Card key={survey.id} className="shadow-card border-0">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <Link
                href={
                  survey.status !== "DRAFT"
                    ? `/surveys/${survey.id}`
                    : `/surveys/${survey.id}/edit`
                }
              >
                <CardTitle className="mb-2">{survey.title}</CardTitle>
              </Link>
              <SurveyStatusBadge status={survey.status} />
            </div>
            {survey.status == "PUBLISHED" && <SharePopover id={survey.id} />}
          </CardHeader>

          <CardFooter className="mt-4 flex justify-between">
            <SurveyActionButtons status={survey.status} id={survey.id} />
            <DeleteFormDialog id={survey.id} />
          </CardFooter>
        </Card>
      ))}
    </ul>
  );
}

export default SurveysList;

function SurveyStatusBadge({ status }: { status: Status }) {
  if (status == "CANCELLED") {
    return (
      <p className="text-xs font-semibold text-red-600 dark:text-red-400">
        Cancelled
      </p>
    );
  }
  if (status == "PUBLISHED") {
    return (
      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
        Published
      </p>
    );
  }
  return <p className="text-xs font-semibold text-foreground-muted">Draft</p>;
}

function SurveyActionButtons({ status, id }: { status: Status; id: string }) {
  if (status == "DRAFT") {
    return (
      <div className="flex gap-2">
        <PublishForm id={id} />
        <Button asChild variant="outline" size="sm">
          <Link href={`/surveys/${id}/edit`} className="relative">
            Edit
          </Link>
        </Button>
      </div>
    );
  }

  if (status == "CANCELLED") {
    return <UncancelButton id={id} />;
  }

  return <CancelFormDialog id={id} />;
}
