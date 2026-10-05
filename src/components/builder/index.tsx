"use client";

import BuilderDialog from "./ui/builder-dialog";
import FieldsPanel from "./ui/field-panel";
import Fields from "./ui/field-list";
import { fieldRegistry, type FieldType, type FieldDefinition } from "./fields/registry";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { type LucideIcon } from "lucide-react";
import { useBuilderStore } from "./store";
import { isSortable } from "@dnd-kit/react/sortable";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

export default function FormBuilder() {
  const openCreateFieldDialog = useBuilderStore((state) => state.openCreateFieldDialog);
  const reorderField = useBuilderStore((state) => state.reorderField);

  return (
    <>
      <DragDropProvider
        onDragEnd={(e) => {
          const { source, target } = e.operation;
          if (e.canceled || !source || !target) return;

          if (source.data.isPanelItem) {
            const index = isSortable(target) ? target.index : undefined;
            setTimeout(() => {
              openCreateFieldDialog(source.data.type, index);
            }, 0);
            return;
          }

          if (isSortable(source)) {
            if (isSortable(target)) {
              const destIdx = target.index - (source.index < target.index ? 1 : 0);
              reorderField(source.index, destIdx);
            } else {
              reorderField(source.index);
            }
          }
        }}
      >
        <div className="grid gap-4 lg:grid-cols-[290px_1fr] xl:grid-cols-[290px_1fr_290px]">
          <div className="card scrollable-container sticky top-22 h-fit max-h-[calc(100vh-115px)] p-7 max-lg:hidden">
            <FieldsPanel />
          </div>
          <div className="card mx-auto mb-7 h-fit w-full max-w-3xl py-10">
            <div className="mx-auto max-w-2xl">
              <Title />
              <Fields />
            </div>
          </div>
        </div>

        <DragOverlay dropAnimation={null}>
          {({ data }) =>
            data.isPanelItem ? (
              <OverlayPanelItem type={data.type} Icon={data.icon} />
            ) : (
              <OverlayField field={data.field} />
            )
          }
        </DragOverlay>
      </DragDropProvider>

      <BuilderDialog />
    </>
  );
}

function Title() {
  const title = useBuilderStore((state) => state.settings.title);
  const setTitle = useBuilderStore((state) => state.setTitle);

  return (
    <div className="px-10">
      <Input
        autoComplete="off"
        className="mb-8 w-full rounded-none border-0 bg-transparent px-0 text-xl font-black shadow-none inset-shadow-none outline-none lg:text-2xl"
        placeholder="Untitled form"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}

function OverlayPanelItem({ Icon, type }: { type: FieldType; Icon: LucideIcon }) {
  return (
    <button className="flex min-w-27.75 cursor-grab flex-col items-center gap-2 rounded-lg border-2 bg-card p-3 text-[13px] font-medium capitalize shadow-xl/35 hover:bg-muted">
      <Icon className="pointer-events-none size-5" />
      {type}
    </button>
  );
}

function OverlayField({ field }: { field: FieldDefinition }) {
  const form = useForm();
  const Renderer = fieldRegistry.get(field.type).Renderer;

  return (
    <div className="rounded-lg border-2 bg-card p-4 opacity-80 shadow-xl/35">
      <Renderer form={form} fieldDefinition={field} />
    </div>
  );
}
