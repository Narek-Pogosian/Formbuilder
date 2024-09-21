"use client";

import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import { getNavigationList } from "./navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MobileSidebar from "./mobile-sidebar";

function Header() {
  const pathname = usePathname();
  const menuList = getNavigationList(pathname);

  return (
    <header className="relative border-b bg-white dark:bg-neutral-950">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex h-full items-center gap-12">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="h-full max-md:hidden">
            <ul className="flex h-full gap-8">
              {menuList.map((item) => (
                <li
                  key={item.href}
                  className={cn(
                    "relative flex items-center text-sm font-semibold",
                    {
                      "after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-[125%] after:-translate-x-1/2 after:bg-primary":
                        item.active,
                    },
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileSidebar />
        </div>
      </div>
    </header>
  );
}

export default Header;
