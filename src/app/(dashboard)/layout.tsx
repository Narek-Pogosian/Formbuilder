import DashboardHeader from "./_components/dashboard-header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <DashboardHeader />
      <main>{children}</main>
    </div>
  );
}
