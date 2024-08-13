import { type FormSchema } from "@/lib/schemas/form-schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import FormRenderer from ".";

interface PreviewDialogProps {
  title: string;
  form: FormSchema;
}

function PreviewDialog({ form, title }: PreviewDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-fit" disabled={!form.length}>
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mx-auto max-w-3xl">
          <DialogTitle className="mb-1 text-xl">
            {title.trim() || "Untitled"}
          </DialogTitle>
          <DialogDescription className="text-foreground-muted">
            This is a preview of your survey where you can also test the
            validation rules.
          </DialogDescription>
        </DialogHeader>
        <FormRenderer form={form} mode="preview" />
      </DialogContent>
    </Dialog>
  );
}

export default PreviewDialog;
