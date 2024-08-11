"use client";

import { formSchema, type FormSchema } from "@/lib/schemas/form-schema";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import FormBuilderWrapper from "./formbuilder-wrapper";
import FieldAdder from "./field-adder";
import FieldsList from "./fields-list";
import BaseBlock from "./blocks/base-block";
import TextBlock from "./blocks/text-block";
import TextAreaBlock from "./blocks/textarea-block";
import NumberBlock from "./blocks/number-block";
import { saveForm } from "@/server/actions/form";

function FormBuilder() {
  const [fields, setFields] = useState<FormSchema>([]);
  const [title, setTitle] = useState("");

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeType, setActiveType] = useState<
    FormSchema[number]["type"] | null
  >(null);

  function append(field: FormSchema[number]) {
    setFields([...fields, field]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const { data, success } = formSchema.safeParse(fields);
    if (success) {
      await saveForm({ title, form: data });
      setTitle("");
      setFields([]);
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

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

  return (
    <FormBuilderWrapper>
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
              <FieldsList
                fields={fields}
                setFields={setFields}
                activeId={activeId}
              />
            </SortableContext>
            <DragOverlay>
              {activeType && activeId ? (
                <BaseBlock
                  id="id"
                  type={activeType}
                  className="shadow-2xl"
                  remove={() => {
                    undefined;
                  }}
                >
                  {activeType === "text" && (
                    <TextBlock
                      field={fields.find((f) => f.id == activeId)!}
                      update={() => {
                        undefined;
                      }}
                    />
                  )}
                  {activeType === "textarea" && (
                    <TextAreaBlock
                      field={fields.find((f) => f.id == activeId)!}
                      update={() => {
                        undefined;
                      }}
                    />
                  )}
                  {activeType === "number" && (
                    <NumberBlock
                      field={fields.find((f) => f.id == activeId)!}
                      update={() => {
                        undefined;
                      }}
                    />
                  )}
                </BaseBlock>
              ) : null}
            </DragOverlay>
          </DndContext>
        </form>
        <FieldAdder append={append} />
      </div>
    </FormBuilderWrapper>
  );
}

export default FormBuilder;
