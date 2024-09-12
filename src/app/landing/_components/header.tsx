import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full py-3">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-1">
          <Button className="h-fit rounded-full" asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
