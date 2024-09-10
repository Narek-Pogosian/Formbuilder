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
        <ul className="space-y-4 py-4">
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
      className={cn("cursor-grab rounded p-4", className)}
      ref={setNodeRef}
      style={{ ...style, touchAction: "none" }}
      {...attributes}
      {...listeners}
      role="button"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <Grip className="mt-1 size-5 text-foreground-muted" />
        <div className="flex grow justify-between">
          <div className="grow">
            <h3 className="text-2xl font-bold capitalize">{field.label}</h3>
            <p className="text-lg font-semibold capitalize">{field.type}</p>
          </div>

          <div className="flex h-fit items-center gap-2">
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
      </div>
    </div>
  );
}
