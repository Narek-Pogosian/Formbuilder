import FormCardActions from "./form-card-actions";
import { Calendar, MessageSquareText } from "lucide-react";
import { type GetUserForms } from "@/server/queries/forms";
import { cn } from "@/lib/utils";

interface Props {
  form: GetUserForms[number];
}

export default function FormCard({ form }: Props) {
  const hasReponses = form.responsesCount > 0;

  return (
    <div className="card py-4 pr-5 pl-6">
      <div className="flex items-center justify-between gap-1">
        <h2 className="font-semibold">{form.title}</h2>
        <FormCardActions id={form.id} status={form.status} hasReponses={hasReponses} />
      </div>

      <p className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
        <Calendar className="size-4" strokeWidth={2} /> {form.createdAt.toLocaleDateString()}
      </p>

      <div className="mt-6 flex justify-between">
        <span
          className={cn("text-sm font-medium capitalize", {
            "text-primary-text": form.status === "published",
            "text-danger-text": form.status === "cancelled",
          })}
        >
          {form.status}
        </span>

        <p
          title={`${form.responsesCount} responses`}
          className="flex items-center gap-2 pr-2 font-medium"
        >
          {form.responsesCount} <MessageSquareText className="size-4 text-muted-foreground" />
        </p>
      </div>
    </div>
  );
}
