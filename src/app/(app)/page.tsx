import Link from "next/link";
import PageTitle from "./_components/page-title";
import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <>
      <PageTitle>Comming soon: Dashboard</PageTitle>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/create">Create Survey</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/surveys">Surveys</Link>
        </Button>
      </div>
    </>
  );
}

export default HomePage;
