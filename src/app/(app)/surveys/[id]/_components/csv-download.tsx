"use client";

import { type GetAnswersType } from "@/app/api/answers/[surveyId]/route";
import { answersToCsv, downloadCsv } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

function CsvDownload({ surveyId, title }: { surveyId: string; title: string }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDownload() {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await fetch(`/api/answers/${surveyId}`);
      const { answers } = (await res.json()) as GetAnswersType;

      const csv = answersToCsv(answers);
      downloadCsv(title, csv);
    } catch (error) {
      toast("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      size="sm"
      onClick={handleDownload}
      aria-disabled={isLoading}
      loading={isLoading}
    >
      Download all answers as CSV
    </Button>
  );
}

export default CsvDownload;
