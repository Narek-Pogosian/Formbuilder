import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import SidebarNavigation from "./_components/sidebar-navigation";
import MobileSidebar from "./_components/mobile-sidebar";
import NextTopLoader from "nextjs-toploader";

async function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  if (!session) throw redirect("/landing");

  return (
    <>
      <NextTopLoader showSpinner={false} />
      <div className="flex min-h-full">
        <div className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block">
          <SidebarNavigation />
        </div>
        <div className="flex w-full flex-col p-4 lg:p-2">
          <div className="mb-4 lg:hidden">
            <MobileSidebar />
          </div>
          <main className="relative grow py-2 lg:rounded lg:border lg:bg-background-card lg:px-20 lg:py-8 xl:px-28">
            {children}
          </main>
        </div>
        <Toaster position="bottom-center" duration={2000} />
      </div>
    </>
  );
}

export default layout;
