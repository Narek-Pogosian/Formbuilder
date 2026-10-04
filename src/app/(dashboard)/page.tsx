import { getServerSession } from "@/server/auth/config";
import { redirect } from "next/navigation";

export const instant = false;

export default async function DashboardHomePage() {
  const session = await getServerSession();

  if (!session) redirect("/landing");

  return (
    <div>
      <h1>Dashboard home Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
