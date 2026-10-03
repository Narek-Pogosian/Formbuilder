import FormBuilder from "@/components/builder";
import { Button } from "@/components/ui/button";
import { BookOpen, MoveLeft, Settings } from "lucide-react";

export default function Home() {
  return (
    <div className="container">
      <header className="card sticky top-2 z-10 mb-9 flex h-12 items-center justify-between px-4">
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
      </header>

      <FormBuilder />
    </div>
  );
}
