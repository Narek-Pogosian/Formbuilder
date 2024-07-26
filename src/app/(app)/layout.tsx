import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import SidebarNavigation from "./_components/sidebar-navigation";
import MobileSidebar from "./_components/mobile-sidebar";

async function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  if (!session) throw redirect("/landing");

  return (
    <div className="flex">
      <div className="sticky top-0 z-50 hidden h-screen w-64 shrink-0 border-r bg-white py-2 pl-4 pr-2 dark:bg-black lg:block">
        <SidebarNavigation />
      </div>
      <div className="flex w-full flex-col">
        <div className="lg:hidden">
          <MobileSidebar />
        </div>
        <main className="grow p-4">{children}</main>
      </div>
    </div>
  );
}

export default layout;
