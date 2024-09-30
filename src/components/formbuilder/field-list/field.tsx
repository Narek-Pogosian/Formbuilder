import { type FormSchemaField } from "@/lib/schemas/form-schema";
import { useFormbuilder } from "../hooks/use-formbuilder";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Grip } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import FieldDialog from "../field-adder/field-dialog";

type FieldProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  field: FormSchemaField;
};

function Field({ field, className }: FieldProps) {
  const { dispatch } = useFormbuilder();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id, data: { type: field.type } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  function handleRemove() {
    dispatch({
      type: "REMOVE_FIELD",
      payload: field.id,
    });
  }

  return (
    <div
      className={cn(
        "relative flex justify-between rounded border bg-background-card",
        className,
      )}
      style={{ ...style, touchAction: "none" }}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        role="button"
        className="w-full cursor-grab pb-6 pt-4"
      >
        <div className="flex flex-col gap-4 pl-4 sm:flex-row">
          <Grip className="mt-1 size-5 text-foreground-muted" />
          <div className="grow">
            <h3 className="font-bold capitalize lg:text-lg">{field.label}</h3>
            <p className="font-medium capitalize text-foreground-muted">
              {field.type}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute right-4 flex h-fit items-center gap-2 pt-4">
        <FieldDialog defaultField={field} />
        <Button
          onClick={handleRemove}
          aria-label="Delete field"
          variant="dangerOutline"
          size="sm"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export default Field;
