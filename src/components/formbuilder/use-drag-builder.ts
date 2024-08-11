import { arrayMove } from "@dnd-kit/sortable";
import {
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { type FormSchema } from "@/lib/schemas/form-schema";
import { useState } from "react";

interface UseDragBuilderParams {
  fields: FormSchema;
  setFields: React.Dispatch<React.SetStateAction<FormSchema>>;
}

/**
 * This hook holds all the logic for formbuilder related to drag and drop.
 */
export function useDragBuilder({ fields, setFields }: UseDragBuilderParams) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeType, setActiveType] = useState<
    FormSchema[number]["type"] | null
  >(null);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id);
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
    setActiveId(null);
  }

  return { activeId, activeType, handleDragStart, handleDragEnd };
}
