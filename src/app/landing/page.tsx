import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

async function LandingPage() {
  const session = await getServerAuthSession();
  if (session) throw redirect("/");

  return (
    <div className="container">
      <h1 className="py-4 text-xl font-bold">Landing page</h1>
      <Link href="/sign-in" className="underline">
        Sign in
      </Link>
    </div>
  );
}

export default LandingPage;
