import { type FormSchema } from "@/lib/schemas/form-schema";
import { useDragBuilder } from "../hooks/use-drag-builder";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useFormbuilder } from "../hooks/use-formbuilder";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FieldDialog from "../field-adder/field-dialog";

function FieldList() {
  const { state } = useFormbuilder();
  const { handleDragEnd, handleDragStart, activeId } = useDragBuilder();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

  if (state.fields.length === 0) {
    return (
      <div className="mx-auto mb-8 pt-10 text-center font-medium text-neutral-300 dark:text-neutral-600">
        Empty, no fields added yet.
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext
        items={state.fields}
        strategy={verticalListSortingStrategy}
      >
        <ul className="mb-8 space-y-4">
          {state.fields.map((f) => (
            <Field
              key={f.id}
              field={f}
              className={activeId === f.id ? "opacity-25" : ""}
            />
          ))}
        </ul>
      </SortableContext>
      <DragOverlay>
        <Field
          field={state.fields.find((f) => f.id === activeId)!}
          className="rounded bg-background-card shadow-lg dark:shadow-black/40"
        />
      </DragOverlay>
    </DndContext>
  );
}

export default FieldList;

type FieldProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  field: FormSchema[number];
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
        "relative flex justify-between rounded bg-background-card",
        className,
      )}
      style={{ ...style, touchAction: "none" }}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        role="button"
        className="w-full cursor-grab py-6"
      >
        <div className="flex flex-col gap-4 pl-2 sm:flex-row">
          <Grip className="mt-1 size-5 text-foreground-muted" />
          <div className="grow">
            <h3 className="font-bold capitalize lg:text-lg">{field.label}</h3>
            <p className="font-medium capitalize text-foreground-muted">
              {field.type}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute right-2 flex h-fit items-center gap-2 py-4">
        <FieldDialog defaultField={field} />
        <Button
          onClick={handleRemove}
          aria-label="Delete field"
          variant="danger"
          size="sm"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
