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
      {/* <div className="flex min-h-full">
        <div className="sticky top-0 hidden h-screen w-64 shrink-0 border-r bg-white dark:bg-black lg:block">
          <SidebarNavigation />
        </div>
        <div className="flex w-full flex-col p-4">
          <div className="mb-4 lg:hidden">
            <MobileSidebar />
          </div>
          <main className="relative grow lg:px-20 lg:py-6">{children}</main>
        </div>
        <Toaster position="top-center" duration={2000} />
      </div> */}
      <div>
        <Header />
        <main className="container py-8">{children}</main>
        <Toaster position="top-center" duration={2000} />
      </div>
    </>
  );
}

export default layout;
