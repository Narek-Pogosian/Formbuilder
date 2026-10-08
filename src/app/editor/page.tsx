import EditorHeader from "./_components/editor-header";
import FormBuilder from "@/components/builder";

export default function EditorPage() {
  return (
    <div className="relative container">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-10 left-1/2 -z-10 h-[45rem] w-[min(95vw,56rem)] -translate-x-1/2 rounded-full bg-primary/4 blur-3xl"
      />

      <EditorHeader />
      <FormBuilder />
    </div>
  );
}
