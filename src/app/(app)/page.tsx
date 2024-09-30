import Link from "next/link";
import PageTitle from "./_components/page-title";

function HomePage() {
  return (
    <>
      <PageTitle>Dashboard: Coming soon</PageTitle>
      <div className="flex gap-2 text-sm font-semibold underline">
        <Link href="/surveys">Browse surveys</Link>
        <Link href="/create">Create Survey</Link>
      </div>
    </>
  );
}

export default HomePage;
