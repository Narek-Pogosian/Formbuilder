import { useBuilderStore } from "../store";
import { useDroppable } from "@dnd-kit/react";
import { useForm } from "react-hook-form";
import { Grip, PanelsTopLeft, Plus } from "lucide-react";
import { createValidationSchema } from "../lib/create-validation";
import { useMemo } from "react";
import { fieldRegistry } from "../fields/registry";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldItem } from "./field-item";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TemplatesDialog from "../templates/templates-dialog";

export default function Fields() {
  const fields = useBuilderStore((state) => state.fields);

  if (fields.length === 0) {
    return <EmptyState />;
  }

  return <FieldsList key={JSON.stringify(fields)} />;
}

function FieldsList() {
  const fields = useBuilderStore((state) => state.fields);
  const openChooseFieldDialog = useBuilderStore((state) => state.openChooseFieldDialog);

  const { ref, isDropTarget } = useDroppable({ id: "drop-zone" });
  const { schema, defaultValues } = useMemo(() => createValidationSchema(fields), [fields]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  function onSubmit(data: unknown) {
    alert(JSON.stringify(data));
  }

  return (
    <form autoComplete="off" className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
      {fields.map((field, i) => {
        const Renderer = fieldRegistry.get(field.type).Renderer;
        return (
          <FieldItem key={field.id} field={field} index={i}>
            <Renderer form={form} fieldDefinition={field} />
          </FieldItem>
        );
      })}

      <div className="mx-4 mt-4 lg:hidden">
        <Button
          variant="secondary"
          className="flex w-full items-center justify-center gap-2"
          onClick={() => openChooseFieldDialog()}
        >
          <Plus className="size-4.5" />
          Add a field
        </Button>
      </div>

      <div ref={ref} className="relative flex gap-2 px-10">
        {isDropTarget && (
          <div className="absolute -top-4.5 left-0 w-full">
            <div className="h-1 rounded-full bg-primary" />
          </div>
        )}

        <Button type="submit">Submit</Button>
        <Button variant="ghost" type="button" onClick={() => form.reset()}>
          Reset
        </Button>
      </div>
    </form>
  );
}

function EmptyState() {
  const { ref, isDropTarget } = useDroppable({ id: "drop-zone" });
  const openChooseFieldDialog = useBuilderStore((state) => state.openChooseFieldDialog);

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-h-20 gap-1 rounded-lg px-10 py-6 text-sm font-medium text-muted-foreground transition-colors lg:min-h-30",
        { "bg-muted": isDropTarget }
      )}
    >
      <p className="pointer-events-none flex gap-1.5 pl-1 max-lg:hidden">
        <Grip className="size-4.5" />
        Drag a field here to get started.
      </p>

      <Button
        size="sm"
        variant="ghost"
        className="w-fit justify-start pl-1! lg:hidden"
        onClick={() => openChooseFieldDialog()}
      >
        <Plus className="size-4.5" /> Add a field to get started.
      </Button>

      <TemplatesDialog />
    </div>
  );
}
