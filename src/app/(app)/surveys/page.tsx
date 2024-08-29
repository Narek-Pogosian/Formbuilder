import { getForms } from "@/server/data-access/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SurveysList from "./_components/surveys-list";

async function FormsPage() {
  const surveys = await getForms();

  return (
    <>
      <h1 className="mb-8 text-xl font-bold">Your Surveys</h1>
      <Tabs defaultValue="all">
        <TabsList className="mb-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <SurveysList surveys={surveys} />
        </TabsContent>
        <TabsContent value="published">
          <SurveysList surveys={surveys.filter((s) => s.isPublished)} />
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
