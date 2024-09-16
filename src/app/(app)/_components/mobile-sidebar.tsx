import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SidebarNavigation from "./sidebar-navigation";

function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button variant="outline" size="icon">
          <Menu className="size-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full p-0 sm:max-w-72">
        <SheetTitle className="sr-only">Sidebar</SheetTitle>
        <SheetDescription></SheetDescription>
        <SidebarNavigation />
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;
