import { fieldRegistry, type FieldDefinition } from "../fields/registry";
import { BetweenHorizonalStart, Copy, GripVertical, Pencil, Settings, Trash2 } from "lucide-react";
import { SortableKeyboardPlugin } from "@dnd-kit/dom/sortable";
import { useBuilderStore } from "../store";
import { useSortable } from "@dnd-kit/react/sortable";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";

interface Props {
  children: React.ReactNode;
  field: FieldDefinition;
  index: number;
}

export function FieldItem({ field, index, children }: Props) {
  const { ref, handleRef, isDropTarget, isDragging, isDragSource } = useSortable({
    index,
    id: field.id,
    data: { field, isPanelItem: false },
    transition: { duration: 0 },
    plugins: [SortableKeyboardPlugin],
  });

  return (
    <div
      ref={ref}
      className={cn("group relative flex gap-2 rounded-lg", {
        "opacity-50": isDragging,
      })}
    >
      {!isDragSource && isDropTarget && (
        <div className="absolute -top-4.5 left-0 w-full">
          <div className="h-1 rounded-full bg-primary" />
        </div>
      )}

      <Button
        size="icon"
        variant="ghost"
        ref={handleRef}
        aria-label="Drag field"
        className="cursor-grab group-focus-within:opacity-100 group-hover:opacity-100 lg:opacity-0"
      >
        <GripVertical />
      </Button>

      <div className="flex grow items-center">{children}</div>
      <ActionsDropdown field={field} index={index} />
    </div>
  );
}

function ActionsDropdown({ index, field }: { index: number; field: FieldDefinition }) {
  const deleteField = useBuilderStore((state) => state.deleteField);
  const duplicateField = useBuilderStore((state) => state.duplicateField);
  const openEditFieldDialog = useBuilderStore((state) => state.openEditFieldDialog);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            size="icon"
            variant="ghost"
            aria-label="Field actions"
            className="group-focus-within:opacity-100 group-hover:opacity-100 aria-expanded:opacity-100 lg:opacity-0"
          />
        }
      >
        <Settings className="text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-42">
        <DropdownMenuItem onClick={() => openEditFieldDialog(field)}>
          <Pencil /> Edit
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <BetweenHorizonalStart className="size-3.5" /> Insert Below
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <InsertFieldBelowContent index={index + 1} />
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem onClick={() => duplicateField(field.id)}>
          <Copy /> Duplicate
        </DropdownMenuItem>

        <DropdownMenuItem variant="danger" onClick={() => deleteField(field.id)}>
          <Trash2 /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function InsertFieldBelowContent({ index }: { index: number }) {
  const categorizedFields = fieldRegistry.categorizedFields;
  const openCreateFieldDialog = useBuilderStore((state) => state.openCreateFieldDialog);

  return (
    <DropdownMenuSubContent>
      {Object.entries(categorizedFields).map(([category, fields]) => (
        <DropdownMenuGroup key={category}>
          {fields.map((field) => (
            <DropdownMenuItem
              key={field.type}
              onClick={() => openCreateFieldDialog(field.type, index)}
            >
              <field.icon />
              <span className="capitalize">{field.type}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      ))}
    </DropdownMenuSubContent>
  );
}
