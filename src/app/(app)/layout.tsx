import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

async function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  if (!session) throw redirect("/landing");

  return (
    <>
      <main className="grow p-4">{children}</main>
    </>
  );
}

export default layout;
