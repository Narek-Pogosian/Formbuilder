import { LayoutGrid, Library, SquarePen } from "lucide-react";

export function getNavigationList(pathname: string) {
  return [
    {
      href: "/",
      label: "Overview",
      active: pathname === "/",
      icon: LayoutGrid,
      submenus: [],
    },
    {
      href: "/surveys",
      label: "Surveys",
      active: pathname == "/surveys",
      icon: Library,
      submenus: [],
    },
    {
      href: "/create",
      label: "Create",
      active: pathname.includes("/create"),
      icon: SquarePen,
      submenus: [],
    },
  ];
}
