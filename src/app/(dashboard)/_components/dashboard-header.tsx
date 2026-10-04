import Header from "@/components/ui/header";
import Link from "next/link";
import { LayoutDashboard, Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import UserDropdown from "./user-dropdown";

export const NAVIGATION = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/",
  },
] as const;

export default function DashboardHeader() {
  return (
    <Header>
      <div className="flex flex-row-reverse items-center gap-3 md:flex-row md:gap-8">
        <Link href="/" className="text-lg font-extrabold">
          FormBuilder
        </Link>

        <nav className="flex items-center gap-1 max-md:hidden">
          {NAVIGATION.map((link) => (
            <Button
              key={link.label}
              render={<Link href={link.href} />}
              nativeButton={false}
              variant="ghost"
            >
              {link.label}
            </Button>
          ))}
        </nav>

        {/* <div className="md:hidden">
          <NavPopover />
        </div> */}
      </div>

      <div className="flex items-center gap-3">
        <UserDropdown />
      </div>
    </Header>
  );
}

// function NavPopover() {
//   return (
//     <Popover modal={false}>
//       <PopoverTrigger render={<Button size="icon" variant="ghost" />}>
//         <Menu className="size-5" />
//         <span className="sr-only">Open navigation</span>
//       </PopoverTrigger>
//       <PopoverContent className="grid w-40 gap-2 p-2">
//         {NAVIGATION.map((link) => (
//           <Button
//             key={link.label}
//             render={<Link href={link.href} />}
//             nativeButton={false}
//             variant="ghost"
//             className="justify-start"
//           >
//             <link.icon /> {link.label}
//           </Button>
//         ))}

//         <Button render={<Link href="/editor" />} nativeButton={false}>
//           <Plus />
//           New form
//         </Button>
//       </PopoverContent>
//     </Popover>
//   );
// }
