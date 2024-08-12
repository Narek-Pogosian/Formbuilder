import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Header() {
  return (
    <header className="py-3">
      <div className="container flex items-center justify-between">
        <p className="text-lg font-bold">Logo</p>
        <div className="flex gap-1">
          <Button variant="outline" className="h-fit rounded-full" asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
