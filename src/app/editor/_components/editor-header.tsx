import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BookOpen, EllipsisVertical, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import EditorBackButton from "./editor-back-button";
import UserDropdown from "@/app/(dashboard)/_components/user-dropdown";
import Header from "@/components/ui/header";

export default function EditorHeader() {
  return (
    <Header>
      <div className="flex items-center gap-4">
        <EditorBackButton />
        <Logo />
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-1 max-md:hidden md:gap-3">
        {/* <HelpDialog /> */}
        <Button size="sm" variant="ghost">
          <Settings /> Settings
        </Button>
        <Button size="sm">
          <BookOpen /> Publish
        </Button>
        <UserDropdown />
      </div>

      <div className="flex items-center gap-1 md:hidden md:gap-3">
        <Popover modal={false}>
          <PopoverTrigger render={<Button size="icon" variant="ghost" />}>
            <EllipsisVertical className="size-5" />
            <span className="sr-only">Actions</span>
          </PopoverTrigger>
          <PopoverContent className="grid w-40 gap-2 p-2 [&>button]:justify-start">
            <Button size="sm" variant="ghost">
              <Settings /> Settings
            </Button>
            <Button size="sm">
              <BookOpen /> Publish
            </Button>
          </PopoverContent>
        </Popover>

        <UserDropdown />
      </div>
    </Header>
  );
}
