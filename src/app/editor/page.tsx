import FormBuilder from "@/components/builder";
import Header from "@/components/ui/header";
import { BookOpen, MoveLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditorPage() {
  return (
    <div className="container">
      <Header>
        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost" aria-label="Back">
            <MoveLeft />
          </Button>
          <span className="font-black">FormBuilder</span>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost">
            <Settings /> Settings
          </Button>
          <Button size="sm">
            <BookOpen /> Publish
          </Button>
        </div>
      </Header>

      <FormBuilder />
    </div>
  );
}
