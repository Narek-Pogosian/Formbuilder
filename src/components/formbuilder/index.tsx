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
import { saveForm, updateForm } from "@/server/actions/form";
import { availableBlocks } from "./blocks";
import { toast } from "sonner";
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
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState<FormSchema>(
    props.mode === "edit" ? props.defaultFields : [],
  );
  const [title, setTitle] = useState<string>(
    props.mode === "edit" ? props.defaultTitle : "",
  );

  async function handleSave() {
    if (!title.trim()) {
      toast("Please enter a title");
      return;
    }

    const { data, success } = formSchema.safeParse(fields);
    if (!success) {
      // TODO: Communicate errors
      return;
    }

    setIsLoading(true);
    try {
      if (props.mode === "edit") {
        await updateForm({ form: { title, form: data }, id: props.id });
        toast("Saved");
      } else {
        await saveForm({ title, form: data });
        setTitle("");
        setFields([]);
        toast("New survey created");
      }
    } catch (error) {
      toast("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

  const { activeId, activeType, handleDragEnd, handleDragStart } =
    useDragBuilder({ fields, setFields });

  return (
    <div className="flex min-h-full flex-col gap-10">
      <div className="shadow flex flex-col gap-4 rounded bg-background-card p-6 sm:flex-row">
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
        <div className="flex gap-2">
          <Button
            className="h-fit sm:mt-[22px]"
            onClick={handleSave}
            disabled={isLoading}
          >
            Save
          </Button>
          <PreviewDialog title={title} form={fields} />
        </div>
      </div>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
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
      <FieldAdder setFields={setFields} />
    </div>
  );
}

export default FormBuilder;
