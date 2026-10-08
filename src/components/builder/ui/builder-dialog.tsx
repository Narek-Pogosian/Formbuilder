import { fieldRegistry, type FieldDefinition, type FieldType } from "../fields/registry";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useBuilderStore } from "../store";

export default function BuilderDialog() {
  const dialogState = useBuilderStore((state) => state.dialogState);
  const closeBuilderDialog = useBuilderStore((state) => state.closeBuilderDialog);

  const isOpen = dialogState.mode !== "closed";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeBuilderDialog();
      }}
    >
      <DialogContent
        initialFocus={false}
        className="max-w-3xl data-closed:animate-none data-closed:duration-0"
      >
        {dialogState.mode === "choose-field" && <AddFieldDialog />}
        {dialogState.mode === "edit" && <EditEditor field={dialogState.field} />}
        {dialogState.mode === "create" && <CreateEditor fieldType={dialogState.fieldType} />}
      </DialogContent>
    </Dialog>
  );
}

function AddFieldDialog() {
  const categorizedFields = fieldRegistry.categorizedFields;
  const openCreateFieldDialog = useBuilderStore((state) => state.openCreateFieldDialog);

  return (
    <div className="@container grid gap-4">
      {Object.entries(categorizedFields).map(([category, fields]) => (
        <div key={category} className="not-last:mb-6">
          <h3 className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {category} fields
          </h3>

          <div className="grid grid-cols-2 gap-2 @sm:grid-cols-3 @md:grid-cols-4 @lg:grid-cols-5">
            {fields.map((field, i) => (
              <button
                key={field.type}
                autoFocus={i === 0}
                onClick={() => openCreateFieldDialog(field.type)}
                className="flex cursor-grab flex-col items-center gap-2 rounded-lg border-2 p-3 text-sm font-medium capitalize hover:bg-muted"
              >
                <field.icon className="pointer-events-none size-7" />
                {field.type}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CreateEditor({ fieldType }: { fieldType: FieldType }) {
  const Editor = fieldRegistry.get(fieldType).Editor;
  const defaults = fieldRegistry.get(fieldType).createInitialDefinition();

  return <Editor fieldDefinition={defaults} />;
}

function EditEditor({ field }: { field: FieldDefinition }) {
  const Editor = fieldRegistry.get(field.type).Editor;

  return <Editor fieldDefinition={field} />;
}
