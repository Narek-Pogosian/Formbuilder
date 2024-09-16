import { type Form } from "@prisma/client";

function SurveyInformation({ form }: { form: Form }) {
  return (
    <section aria-describedby="info">
      <h2
        id="info"
        className="mb-1 text-lg font-semibold text-foreground-muted"
      >
        Information
      </h2>
      <div className="flex flex-col gap-2 text-sm font-semibold sm:flex-row sm:gap-6">
        <p className="">
          Status:{" "}
          {form.status === "CANCELLED" ? (
            <span className="text-red-600 dark:text-red-400">Cancelled</span>
          ) : (
            <span className="text-foreground-muted">Published</span>
          )}
        </p>
        <p>
          Created:{" "}
          <span className="text-foreground-muted">
            {form.createdAt.toLocaleDateString()}
          </span>
        </p>
        {form.updatedAt && (
          <p>
            Last update:{" "}
            <span className="text-foreground-muted">
              {form.updatedAt.toLocaleDateString()}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}

export default SurveyInformation;
