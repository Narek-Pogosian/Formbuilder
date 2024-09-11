import { type FormSchema } from "@/lib/schemas/form-schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import FieldAdder from ".";

interface Props {
  defaultField?: FormSchema[number];
}

function FieldDialog({ defaultField }: Props) {
  const [open, setOpen] = useState(false);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={defaultField ? "sm" : "default"}
          variant={defaultField ? "default" : "outline"}
          className="w-full"
        >
          {defaultField ? "Edit" : "Add Field"}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-4xl p-8"
        onDragStart={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>
            {defaultField ? "Edit field" : "Create field"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FieldAdder defaultField={defaultField} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}

export default FieldDialog;
