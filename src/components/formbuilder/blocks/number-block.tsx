import { FormSchema, NumberSchemaType } from "@/lib/schemas/form-schema";

interface NumberBlockProps {
  field: NumberSchemaType;
  setFields: React.Dispatch<React.SetStateAction<FormSchema>>;
}

function NumberBlock({ field, setFields }: NumberBlockProps) {
  function handleLabelChange(label: string) {
    setFields((prevFields) =>
      prevFields.map((f) => (f.id !== field.id ? f : { ...field, label })),
    );
  }

  function handleRequiredChange(checked: boolean) {
    setFields((prevFields) =>
      prevFields.map((f) =>
        f.id !== field.id ? f : { ...field, required: checked },
      ),
    );
  }

  function handleMinChange(val: string) {
    const num = parseInt(val);
    setFields((prevFields) =>
      prevFields.map((f) =>
        f.id !== field.id ? f : { ...field, min: isNaN(num) ? undefined : num },
      ),
    );
  }

  function handleMaxChange(val: string) {
    const num = parseInt(val);
    setFields((prevFields) =>
      prevFields.map((f) =>
        f.id !== field.id ? f : { ...field, max: isNaN(num) ? undefined : num },
      ),
    );
  }

  return (
    <div className="space-y-4 rounded border p-6">
      <p className="text-lg font-bold">Number input</p>
      <label className="grid gap-0.5 text-sm font-semibold">
        Label
        <input
          type="text"
          className="rounded border px-2 py-1.5 font-normal"
          value={field.label}
          onChange={(e) => handleLabelChange(e.target.value)}
        />
      </label>
      <label className="flex items-center gap-1 text-sm font-semibold">
        Required
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) => handleRequiredChange(e.target.checked)}
        />
      </label>
      <div className="flex gap-2">
        <label className="grid gap-0.5 text-sm font-semibold">
          Min value
          <input
            type="number"
            value={field.min?.toString() ?? 0}
            onChange={(e) => handleMinChange(e.target.value)}
            className="rounded border px-2 py-1.5 font-normal"
          />
        </label>
        <label className="grid gap-0.5 text-sm font-semibold">
          Max value
          <input
            type="number"
            value={field.max?.toString() ?? 100}
            onChange={(e) => handleMaxChange(e.target.value)}
            className="rounded border px-2 py-1.5 font-normal"
          />
        </label>
      </div>
    </div>
  );
}

export default NumberBlock;
