import { type Form } from "@prisma/client";
import { Squirrel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PublishForm from "./publish-form-dialog";
import DeleteFormDialog from "./delete-form-dialog";
import CancelFormDialog from "./cancel-form-dialog";
import UncancelButton from "./uncancel-button";
import SharePopover from "./share-popover";
import Link from "next/link";

interface SurveysListProps {
  surveys: Form[];
}

function SurveysList({ surveys }: SurveysListProps) {
  if (surveys.length === 0) {
    return (
      <div className="mx-auto max-w-lg pt-20 text-center font-semibold text-foreground-muted">
        <Squirrel className="mx-auto mb-4 size-44" strokeWidth={0.75} />
        Empty. No surveys here.
      </div>
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {surveys.map((survey) => (
        <li key={survey.id} className="relative flex flex-col rounded border px-6 pb-6 pt-3">
          <div className="mb-1 flex justify-between py-1">
            <SurveyStatusBadge isPublished={survey.isPublished} isCancelled={survey.isCancelled} />
            {survey.isPublished && !survey.isCancelled && <SharePopover id={survey.id} />}
          </div>

          <div className="mb-10">
            <Link href={`/surveys/${survey.id}`} className="block text-lg font-semibold">
              {survey.title}
            </Link>
            <p className="text-sm font-medium text-foreground-muted">
              {new Date(survey.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="mt-auto flex justify-between">
            <SurveyActionButtons isPublished={survey.isPublished} isCancelled={survey.isCancelled} id={survey.id} />
            <DeleteFormDialog id={survey.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SurveysList;

function SurveyStatusBadge({ isPublished, isCancelled }: { isPublished: boolean; isCancelled: boolean | null }) {
  if (isCancelled) {
    return <Badge variant="cancel">Cancelled</Badge>;
  }
  if (isPublished) {
    return <Badge>Published</Badge>;
  }
  return <Badge variant="secondary">Draft</Badge>;
}

function SurveyActionButtons({
  isPublished,
  isCancelled,
  id,
}: {
  isPublished: boolean;
  isCancelled: boolean | null;
  id: string;
}) {
  if (!isPublished) {
    return (
      <div className="flex gap-2">
        <PublishForm id={id} />
        <Button asChild variant="ghost" size="sm">
          <Link href={`/surveys/${id}/edit`} className="relative">
            Edit
          </Link>
        </Button>
      </div>
    );
  }

  if (isCancelled) {
    return <UncancelButton id={id} />;
  }

  return <CancelFormDialog id={id} />;
}
