"use client";

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
import { formSchema, type FormSchema } from "@/lib/schemas/form-schema";
import { createElement, useState } from "react";
import { useDragBuilder } from "./use-drag-builder";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { saveForm } from "@/server/actions/form";
import { availableBlocks } from "./blocks";
import FormBuilderWrapper from "./formbuilder-wrapper";
import PreviewDialog from "../formrenderer/preview-dialog";
import FieldAdder from "./field-adder";
import FieldList from "./field-list";
import BaseBlock from "./blocks/base-block";

function FormBuilder() {
  const [fields, setFields] = useState<FormSchema>([]);
  const [title, setTitle] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

  const { activeId, activeType, handleDragEnd, handleDragStart } =
    useDragBuilder({ fields, setFields });

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

  return (
    <FormBuilderWrapper>
      <div className="flex h-full flex-col-reverse gap-8 max-lg:p-4 lg:flex-row lg:pl-8">
        <div className="grow py-6">
          <PreviewDialog title={title} form={fields} />
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div className="shadow mb-8 flex flex-col gap-2 rounded bg-background-card p-6 sm:flex-row sm:gap-4">
              <div className="grow">
                <Label>
                  Title of survey
                  <Input
                    id="title"
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
              <SortableContext
                items={fields}
                strategy={verticalListSortingStrategy}
              >
                <FieldList
                  fields={fields}
                  setFields={setFields}
                  activeId={activeId}
                />
              </SortableContext>
              <DragOverlay>
                {activeType && activeId && (
                  <BaseBlock
                    id="id"
                    type={activeType}
                    className="shadow-xl"
                    remove={() => {
                      undefined;
                    }}
                  >
                    {availableBlocks[activeType] &&
                      createElement(availableBlocks[activeType], {
                        field: fields.find((f) => f.id == activeId)!,
                        update: () => undefined,
                      })}
                  </BaseBlock>
                )}
              </DragOverlay>
            </DndContext>
          </form>
        </div>
        <FieldAdder setFields={setFields} />
      </div>
    </FormBuilderWrapper>
  );
}

export default FormBuilder;
