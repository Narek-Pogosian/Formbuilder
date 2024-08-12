"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { getMenuList } from "@/config/sidebar-navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Signout from "@/components/signout";
import ThemeToggle from "@/components/theme-toggle";

function SidebarNavigation() {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <nav className="relative flex h-full flex-col overflow-y-auto pt-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar lg:pl-4">
      <ul className="space-y-4">
        {menuList.map((item) => (
          <div key={item.groupLabel}>
            {item.groupLabel && (
              <p className="mb-2 text-sm font-bold text-foreground-muted">
                {item.groupLabel}
              </p>
            )}
            {item.menus.map((menu) => (
              <li key={menu.href}>
                <Button
                  variant="ghost"
                  className={cn("mt-1 w-full justify-start gap-4 text-sm", {
                    "bg-accent": menu.active,
                  })}
                  asChild
                >
                  <Link href={menu.href}>
                    <menu.icon className="size-5" /> {menu.label}
                  </Link>
                </Button>
              </li>
            ))}
          </div>
        ))}
      </ul>

      <div className="sticky bottom-0 mt-auto flex justify-between border-t bg-background py-2 lg:bg-background-card">
        <Signout />
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default SidebarNavigation;
