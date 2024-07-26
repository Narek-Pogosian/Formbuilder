import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import Signout from "@/components/signout";
import Link from "next/link";

function SidebarNavigation() {
  return (
    <nav className="h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Signout />
      </div>
      <ul className="mt-8 space-y-2">
        <li>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link href="/create">Create</Link>
          </Button>
        </li>
        <li>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link href="/forms">Your forms</Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default SidebarNavigation;
