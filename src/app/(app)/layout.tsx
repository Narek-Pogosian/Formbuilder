import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import Header from "./_components/header";

async function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  if (!session) throw redirect("/landing");

  return (
    <>
      <NextTopLoader showSpinner={false} />
      <Header />
      <main className="container py-8">{children}</main>
      <Toaster position="top-center" duration={2000} />
    </>
  );
}

export default layout;
