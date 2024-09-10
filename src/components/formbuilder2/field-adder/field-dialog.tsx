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

interface Props {
  defaultField?: FormSchema[number];
}

function FieldDialog({ defaultField }: Props) {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants()}>
        {defaultField ? "Edit" : "Add Field"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultField ? "Edit field" : "Create field"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FieldAdder defaultField={defaultField} />
      </DialogContent>
    </Dialog>
  );
}

export default FieldDialog;
