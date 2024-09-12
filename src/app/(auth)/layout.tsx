import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { MoveLeft } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import HeroImage from "../landing/_components/hero-image";

async function layout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();
  if (session) throw redirect("/");

  return (
    <div className="relative flex min-h-full flex-col max-lg:pt-20 lg:justify-center">
      <HeroImage />
      <Button
        variant="outline"
        className="absolute left-4 top-4 text-xs sm:left-8 lg:top-8"
        size="sm"
        asChild
      >
        <Link href="/landing">
          <MoveLeft className="mr-2 size-4" /> Back
        </Link>
      </Button>
      <div className="mx-auto w-full max-w-xl px-4">{children}</div>
    </div>
  );
}

export default layout;
