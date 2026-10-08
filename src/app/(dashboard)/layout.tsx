import DashboardHeader from "./_components/dashboard-header";
import { getServerSession } from "@/server/auth/config";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session) throw redirect("/landing");

  return (
    <div className="container">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-10 left-1/2 -z-10 h-[40rem] w-[min(95vw,56rem)] -translate-x-1/2 rounded-full bg-primary/3 blur-3xl"
      />

      <DashboardHeader />
      <main>{children}</main>

      <div aria-hidden="true" className="h-10"></div>
    </div>
  );
}
