import { getForms } from "@/server/data-access/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SurveysList from "./_components/surveys-list";
import PageTitle from "../_components/page-title";

async function FormsPage() {
  const surveys = await getForms();

  return (
    <>
      <PageTitle>Your Surveys</PageTitle>
      <Tabs defaultValue="all">
        <TabsList className="gap-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
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
