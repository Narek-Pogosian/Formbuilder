import {
  MAX_LENGTH,
  FormSchema,
  TextSchemaType,
} from "@/lib/schemas/form-schema";

interface TextBlockProps {
  field: TextSchemaType;
  setFields: React.Dispatch<React.SetStateAction<FormSchema>>;
}

function TextBlock({ field, setFields }: TextBlockProps) {
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

  function handleMinLengthChange(val: string) {
    const num = parseInt(val);
    setFields((prevFields) =>
      prevFields.map((f) =>
        f.id !== field.id
          ? f
          : { ...field, minLength: isNaN(num) ? undefined : num },
      ),
    );
  }

  function handleMaxLengthChange(val: string) {
    const num = parseInt(val);
    setFields((prevFields) =>
      prevFields.map((f) =>
        f.id !== field.id
          ? f
          : { ...field, maxLength: isNaN(num) ? undefined : num },
      ),
    );
  }

  return (
    <div className="space-y-4 rounded border p-6">
      <p className="text-lg font-bold">Text input</p>
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
          Min length
          <input
            type="number"
            min={0}
            max={MAX_LENGTH}
            value={field.minLength?.toString() ?? 1}
            onChange={(e) => handleMinLengthChange(e.target.value)}
            className="rounded border px-2 py-1.5 font-normal"
          />
        </label>
        <label className="grid gap-0.5 text-sm font-semibold">
          Max length
          <input
            type="number"
            min={0}
            max={MAX_LENGTH}
            value={field.maxLength?.toString() ?? MAX_LENGTH}
            onChange={(e) => handleMaxLengthChange(e.target.value)}
            className="rounded border px-2 py-1.5 font-normal"
          />
        </label>
      </div>
    </div>
  );
}

export default TextBlock;
