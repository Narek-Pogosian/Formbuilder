import { arrayMove } from "@dnd-kit/sortable";
import {
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { type FieldType } from "@/lib/schemas/form-schema";
import { useState } from "react";
import { useFormbuilder } from "./use-formbuilder";

export function useDragBuilder() {
  const { state, dispatch } = useFormbuilder();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeType, setActiveType] = useState<FieldType | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id);
    setActiveType(active.data.current?.type as FieldType);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over?.id && active.id !== over.id) {
      const oldIndex = state.fields.findIndex((o) => o.id === active.id);
      const newIndex = state.fields.findIndex((o) => o.id === over.id);

      dispatch({
        type: "SET_FIELDS",
        payload: arrayMove(state.fields, oldIndex, newIndex),
      });
    }
    setActiveType(null);
    setActiveId(null);
  }

  return { activeId, activeType, handleDragStart, handleDragEnd };
}
