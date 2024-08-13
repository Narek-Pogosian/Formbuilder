"use client";

import { formSchema, type FormSchema } from "@/lib/schemas/form-schema";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useDragBuilder } from "./use-drag-builder";
import { saveForm } from "@/server/actions/form";
import FormBuilderWrapper from "./formbuilder-wrapper";
import FieldAdder from "./field-adder";
import FieldsList from "./fields-list";
import BaseBlock from "./blocks/base-block";
import TextBlock from "./blocks/text-block";
import TextAreaBlock from "./blocks/textarea-block";
import NumberBlock from "./blocks/number-block";

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
        <form className="grow space-y-4 py-8" onSubmit={handleSubmit}>
          <div className="mb-8 flex flex-col gap-2 rounded bg-background-card px-8 py-6 shadow sm:flex-row sm:gap-4">
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
            <SortableContext items={fields}>
              <FieldsList
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
                  className="shadow-xl dark:shadow-black"
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
              )}
            </DragOverlay>
          </DndContext>
        </form>
        <FieldAdder setFields={setFields} />
      </div>
    </FormBuilderWrapper>
  );
}

export default FormBuilder;
