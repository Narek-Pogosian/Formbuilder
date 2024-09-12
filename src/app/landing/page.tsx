import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import HeroImage from "./_components/hero-image";
import Header from "./_components/header";
import Link from "next/link";

async function LandingPage() {
  const session = await getServerAuthSession();
  if (session) throw redirect("/");

  return (
    <>
      <Header />
      <HeroImage />
      <section className="container min-h-screen pt-36 lg:pt-52">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp mx-auto max-w-[800px] text-center"
              data-wow-delay=".2s"
            >
              <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
                Ask, Analyze, Act
              </h1>
              <div className="mb-8 max-w-3xl text-balance text-center">
                <p className="md:text-lg">
                  Create powerful surveys that drive results. Collect feedback,
                  uncover trends, and make data-driven decisions with ease.
                </p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" className="rounded-full" asChild>
                  <Link
                    href="https://github.com/Narek-Pogosian/Insights"
                    target="_blank"
                  >
                    Star on GitHub
                  </Link>
                </Button>
                <Button className="rounded-full" asChild>
                  <Link href="/sign-in">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
