import { type FieldDefinition } from "../registry";
import { type UseFormReturn } from "react-hook-form";
import { type LucideIcon } from "lucide-react";
import { useBuilderStore } from "../../store";
import { Button } from "@/components/ui/button";

interface Props {
  fieldDefinition: FieldDefinition;
  children: React.ReactNode;
  form: UseFormReturn<any>;
  Icon: LucideIcon;
}

export default function Editor({ fieldDefinition, form, Icon, children }: Props) {
  const addField = useBuilderStore((state) => state.addField);
  const editField = useBuilderStore((state) => state.editField);
  const closeBuilderDialog = useBuilderStore((state) => state.closeBuilderDialog);
  const dialogState = useBuilderStore((state) => state.dialogState);

  function onSubmit(data: Record<string, unknown>) {
    const nextField = { ...fieldDefinition, ...data };

    if (dialogState.mode === "create") {
      addField(nextField, dialogState.index);
    } else if (dialogState.mode === "edit") {
      editField(nextField);
    }

    closeBuilderDialog();
  }

  return (
    <form autoComplete="off" className="grid gap-6 md:px-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mb-2 flex items-center gap-4">
        <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-muted">
          <Icon />
        </div>
        <div>
          <h3 className="text-sm font-semibold capitalize">{fieldDefinition.type} field</h3>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Configure what respondents see when answering this question.
          </p>
        </div>
      </div>

      {children}

      <div className="flex gap-2 pt-2">
        <Button type="submit">{dialogState.mode === "edit" ? "Save changes" : "Add field"}</Button>
        <Button type="button" variant="ghost" onClick={closeBuilderDialog}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
