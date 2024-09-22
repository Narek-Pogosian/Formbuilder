import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type Status, type Form } from "@prisma/client";
import { Button } from "@/components/ui/button";
import UncancelButton from "./uncancel-button";
import CancelFormDialog from "./cancel-form-dialog";
import DeleteFormDialog from "./delete-form-dialog";
import SharePopover from "./share-popover";
import PublishForm from "./publish-form-dialog";
import Link from "next/link";

interface Props {
  survey: Form;
}

function SurveyCard({ survey }: Props) {
  return (
    <Card key={survey.id}>
      <CardHeader>
        <Link
          href={
            survey.status !== "DRAFT"
              ? `/surveys/${survey.id}`
              : `/surveys/${survey.id}/edit`
          }
        >
          <CardTitle>{survey.title}</CardTitle>
        </Link>
        <SurveyStatusBadge status={survey.status} />
      </CardHeader>

      <CardFooter className="mt-4 flex justify-between">
        <SurveyActionButtons status={survey.status} id={survey.id} />
        <DeleteFormDialog id={survey.id} />
      </CardFooter>
    </Card>
  );
}

export default SurveyCard;

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

  return (
    <div className="flex gap-2">
      <SharePopover id={id} />
      <CancelFormDialog id={id} />
    </div>
  );
}
