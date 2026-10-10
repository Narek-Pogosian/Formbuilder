import EditorHeader from "./_components/editor-header";
import FormBuilder from "@/components/builder";
import BackgroundBlur from "@/components/ui/background-blur";

export default function EditorPage() {
  return (
    <div className="relative container">
      <BackgroundBlur className="top-10 h-[45rem] w-[min(95vw,56rem)] bg-primary/4" />

      <EditorHeader />
      <FormBuilder />
    </div>
  );
}
