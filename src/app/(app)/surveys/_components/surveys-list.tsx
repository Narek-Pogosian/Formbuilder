"use client";

import { type Status, type Form } from "@prisma/client";
import { useMemo, useState } from "react";
import { Squirrel } from "lucide-react";
import { Input } from "@/components/ui/input";
import SurveyCard from "./survey-card";

interface SurveysListProps {
  surveys: Form[];
}

type S = { status: Status | ""; label: string };
const statusList: S[] = [
  { status: "", label: "All" },
  { status: "PUBLISHED", label: "Published" },
  { status: "DRAFT", label: "Draft" },
  { status: "CANCELLED", label: "Cancelled" },
];

function SurveysList({ surveys }: SurveysListProps) {
  const [titleQuery, setTitleQuery] = useState("");
  const [status, setStatus] = useState("");

  const filteredSurvey = useMemo(() => {
    return surveys.filter((s) => {
      const matchesTitle = s.title
        .toLowerCase()
        .includes(titleQuery.trim().toLowerCase());
      const matchesStatus = status ? s.status === status : true;
      return matchesTitle && matchesStatus;
    });
  }, [surveys, titleQuery, status]);

  return (
    <>
      <div className="mb-6 flex items-center gap-2 [&>*]:h-9">
        <Input
          id="title"
          aria-label="Title"
          placeholder="Search by title"
          className="w-[280px] bg-background-card text-sm font-semibold"
          value={titleQuery}
          onChange={(e) => setTitleQuery(e.target.value)}
        />
        <select
          id="status"
          aria-label="Status"
          className="rounded border bg-background-card px-2 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-primary"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statusList.map((s) => (
            <option key={s.status} value={s.status}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {filteredSurvey.length === 0 ? (
        <div className="mx-auto max-w-lg pt-20 text-center font-medium text-neutral-300 dark:text-neutral-600">
          <Squirrel className="mx-auto mb-4 size-28" strokeWidth={0.75} />
          Empty. No surveys here.
        </div>
      ) : (
        <ul className="grid gap-8 md:grid-cols-2">
          {filteredSurvey.map((survey) => (
            <SurveyCard survey={survey} key={survey.id} />
          ))}
        </ul>
      )}
    </>
  );
}

export default SurveysList;
