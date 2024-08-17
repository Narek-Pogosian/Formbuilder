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

interface FormBuilderProps {
  mode: "create" | "edit";
}

interface FormBuilderCreateProps extends FormBuilderProps {
  mode: "create";
}

interface FormBuilderUpdateProps extends FormBuilderProps {
  mode: "edit";
  id: string;
  defaultFields: FormSchema;
  defaultTitle: string;
}

type Props = FormBuilderCreateProps | FormBuilderUpdateProps;

function FormBuilder(props: Props) {
  const [fields, setFields] = useState<FormSchema>(
    props.mode === "edit" ? props.defaultFields : [],
  );
  const [title, setTitle] = useState(
    props.mode === "edit" ? props.defaultTitle : "",
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

  const { activeId, activeType, handleDragEnd, handleDragStart } =
    useDragBuilder({ fields, setFields });

  async function handleSave() {
    if (!title.trim()) return;

    const { data, success } = formSchema.safeParse(fields);
    if (success) {
      if (props.mode === "edit") return;

      await saveForm({ title, form: data });
      setTitle("");
      setFields([]);
    }
  }

  return (
    <FormBuilderWrapper>
      <div className="flex h-full flex-col-reverse gap-8 max-lg:p-4 lg:flex-row lg:pl-8">
        <div className="grow py-6">
          <div className="space-y-4">
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
              <Button className="h-fit sm:mt-[22px]" onClick={handleSave}>
                Save
              </Button>
              <PreviewDialog title={title} form={fields} />
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
          </div>
        </div>
        <FieldAdder setFields={setFields} />
      </div>
    </FormBuilderWrapper>
  );
}

export default FormBuilder;
