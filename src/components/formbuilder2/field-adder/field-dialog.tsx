import { type FormSchema } from "@/lib/schemas/form-schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import FieldAdder from ".";
import { useCallback, useState } from "react";

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
      <DialogTrigger className={buttonVariants()}>
        {defaultField ? "Edit" : "Add Field"}
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-8">
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
