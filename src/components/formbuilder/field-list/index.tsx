import { useDragBuilder } from "../hooks/use-drag-builder";
import { useFormbuilder } from "../hooks/use-formbuilder";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Field from "./field";

function FieldList() {
  const { state } = useFormbuilder();
  const { handleDragEnd, handleDragStart, activeId } = useDragBuilder();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

  if (state.fields.length === 0) {
    return (
      <div className="mx-auto mb-8 pt-10 text-center font-medium text-neutral-400 dark:text-neutral-600">
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
        <ul className="my-4 space-y-4">
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
          className="shadow-lg dark:shadow-black/40"
        />
      </DragOverlay>
    </DndContext>
  );
}

export default FieldList;
