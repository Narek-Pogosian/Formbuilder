import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import SidebarNavigation from "./_components/sidebar-navigation";
import MobileSidebar from "./_components/mobile-sidebar";

async function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  if (!session) throw redirect("/landing");

  return (
    <div className="flex min-h-full">
      <div className="sticky top-0 z-50 hidden h-screen w-64 shrink-0 bg-element pr-2 lg:block">
        <SidebarNavigation />
      </div>
      <div className="flex w-full flex-col">
        <div className="p-4 lg:hidden">
          <MobileSidebar />
        </div>
        <main className="relative grow px-4 py-4 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export default layout;
