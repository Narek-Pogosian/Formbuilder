import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { MoveLeft } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";

async function layout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();
  if (session) throw redirect("/");

  return (
    <div className="min-h-full lg:grid lg:grid-cols-5">
      <div className="relative flex flex-col items-center justify-center max-lg:pt-20 lg:col-span-3">
        <Button
          variant="outline"
          className="absolute left-4 top-4 text-xs sm:left-8 lg:top-8"
          size="sm"
          asChild
        >
          <Link href="/">
            <MoveLeft className="mr-2 size-4" /> Back
          </Link>
        </Button>
        <div className="w-full max-w-xl px-4">{children}</div>
      </div>
      <div className="hidden lg:col-span-2 lg:block">TODO: Image</div>
    </div>
  );
}

export default layout;
