import ToastProvider from "@/components/ui/toast";
import BackgroundBlur from "@/components/ui/background-blur";
import DashboardHeader from "./_components/dashboard-header";
import { getServerSession } from "@/server/auth/config";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session) throw redirect("/landing");

  return (
    <ToastProvider>
      <div className="container">
        <BackgroundBlur className="top-10 h-[40rem] w-[min(95vw,56rem)] bg-primary/3" />

        <DashboardHeader />
        <main>{children}</main>

        <div aria-hidden="true" className="h-10"></div>
      </div>
    </ToastProvider>
  );
}
