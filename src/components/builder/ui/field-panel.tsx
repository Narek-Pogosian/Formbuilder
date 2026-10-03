"use client";

import { PointerActivationConstraints, PointerSensor } from "@dnd-kit/dom";
import { type FieldType, fieldRegistry } from "../fields/registry";
import { type LucideIcon } from "lucide-react";
import { useDraggable } from "@dnd-kit/react";

export default function FieldsPanel() {
  const categorizedFields = fieldRegistry.categorizedFields;

  return (
    <>
      {Object.entries(categorizedFields).map(([category, fields]) => (
        <div key={category} className="not-last:mb-5">
          <h3 className="mb-2 text-xs font-semibold tracking-wide text-primary-text uppercase">
            {category} fields
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {fields.map((field, i) => (
              <FieldPanelItem key={i} Icon={field.icon} type={field.type} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function FieldPanelItem({ type, Icon }: { type: FieldType; Icon: LucideIcon }) {
  const { ref } = useDraggable({
    id: `panel-${type}`,
    data: {
      type: type,
      icon: Icon,
      isPanelItem: true,
    },
    sensors: [
      PointerSensor.configure({
        activationConstraints: [
          new PointerActivationConstraints.Distance({ value: 0 }),
          new PointerActivationConstraints.Delay({ value: 0, tolerance: 0 }),
        ],
      }),
    ],
  });

  return (
    <button
      ref={ref}
      className="flex cursor-grab flex-col items-center gap-2 rounded-lg border-2 p-3 text-[13px] font-medium tracking-wide capitalize hover:bg-muted"
    >
      <Icon className="pointer-events-none size-5" />
      {type}
    </button>
  );
}
