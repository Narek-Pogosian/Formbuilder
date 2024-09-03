import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "./_components/header";
import Link from "next/link";

async function LandingPage() {
  const session = await getServerAuthSession();
  if (session) throw redirect("/");

  return (
    <>
      <Header />
      <div className="container pb-52 pt-24">
        <div className="flex flex-col items-center gap-6">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-6xl">
              Ask, Analyze, Act
            </h1>
          </div>

          <div className="max-w-3xl text-balance text-center">
            <p className="text-foreground-muted md:text-lg">
              Create powerful surveys that drive results. Collect feedback,
              uncover trends, and make data-driven decisions with ease.
            </p>
          </div>

          <Button
            asChild
            className="gap-2 rounded-full px-8 shadow-lg dark:shadow-black"
          >
            <Link href="/sign-in">
              Get Started
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
