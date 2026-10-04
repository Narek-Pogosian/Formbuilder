import { Button } from "@/components/ui/button";
import LandingSignInButton from "./_components/sign-in-button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-center gap-6">
        <h1>TODO: Landing page content</h1>
        <div className="flex items-center gap-3">
          <Button
            size="lg"
            className="rounded-full px-6"
            nativeButton={false}
            render={<Link href="/editor" />}
          >
            Create a form
          </Button>
          <LandingSignInButton />
        </div>
      </section>
    </>
  );
}
