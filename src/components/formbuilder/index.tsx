"use client";

import { formSchema, type FormSchema } from "@/lib/schemas/form-schema";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import FieldAdder from "./field-adder";
import FieldsList from "./fields-list";
import BaseBlock from "./blocks/base-block";

function FormBuilder() {
  const [fields, setFields] = useState<FormSchema>([]);
  const [title, setTitle] = useState("");
  const [activeType, setActiveType] = useState<
    FormSchema[number]["type"] | null
  >(null);

  function append(field: FormSchema[number]) {
    setFields([...fields, field]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const { error } = formSchema.safeParse(fields);
    console.log("error", error?.errors);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveType(active.data.current?.type as FormSchema[number]["type"]);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over?.id && active.id !== over.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((o) => o.id === active.id);
        const newIndex = items.findIndex((o) => o.id === over.id);
        return arrayMove(fields, oldIndex, newIndex);
      });
    }
    setActiveType(null);
  }

  return (
    <div className="flex h-full flex-col-reverse gap-8 max-lg:p-4 lg:flex-row lg:pl-8">
      <form className="grow space-y-4 py-8" onSubmit={handleSubmit}>
        <div className="mb-8 flex flex-col gap-2 rounded bg-background-card px-8 py-6 sm:flex-row sm:gap-4">
          <div className="grow">
            <Label>
              Title of survey
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My survey"
              />
            </Label>
          </div>
          <Button className="h-fit sm:mt-[22px]" type="submit">
            Save
          </Button>
        </div>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={fields}>
            <FieldsList fields={fields} setFields={setFields} />
          </SortableContext>

          <DragOverlay>
            {activeType ? (
              <BaseBlock
                id="1"
                type={activeType}
                remove={() => {
                  undefined;
                }}
              >
                <div></div>
              </BaseBlock>
            ) : null}
          </DragOverlay>
        </DndContext>
      </form>
      <FieldAdder append={append} />
    </div>
  );
}

export default FormBuilder;
