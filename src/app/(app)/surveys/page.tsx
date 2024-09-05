import { getForms } from "@/server/data-access/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SurveysList from "./_components/surveys-list";
import PageTitle from "../_components/page-title";
import { BookCheck, BookDashed, BookOpen, BookX } from "lucide-react";

async function FormsPage() {
  const surveys = await getForms();

  return (
    <>
      <PageTitle>Your Surveys</PageTitle>
      <Tabs defaultValue="all">
        <TabsList className="w-full justify-start gap-1">
          <TabsTrigger value="all">
            <BookOpen className="mr-2 size-4 text-foreground-muted" /> All
          </TabsTrigger>
          <TabsTrigger value="published">
            <BookCheck className="mr-2 size-4 text-foreground-muted" />{" "}
            Published
          </TabsTrigger>
          <TabsTrigger value="draft">
            <BookDashed className="mr-2 size-4 text-foreground-muted" /> Draft
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            <BookX className="mr-2 size-4 text-foreground-muted" /> Cancelled
          </TabsTrigger>
        </TabsList>
        <hr className="mb-4 mt-2" />
        <TabsContent value="all">
          <SurveysList surveys={surveys} />
        </TabsContent>
        <TabsContent value="published">
          <SurveysList
            surveys={surveys.filter((s) => s.isPublished && !s.isCancelled)}
          />
        </TabsContent>
        <TabsContent value="draft">
          <SurveysList surveys={surveys.filter((s) => !s.isPublished)} />
        </TabsContent>
        <TabsContent value="cancelled">
          <SurveysList surveys={surveys.filter((s) => s.isCancelled)} />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default FormsPage;
