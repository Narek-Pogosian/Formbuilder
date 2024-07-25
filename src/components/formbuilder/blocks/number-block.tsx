import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type FormSchema,
  type NumberSchemaType,
} from "@/lib/schemas/form-schema";

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
      <Label className="grid gap-0.5 text-sm font-semibold">
        Label
        <Input
          type="text"
          className="rounded border px-2 py-1.5 font-normal"
          value={field.label}
          onChange={(e) => handleLabelChange(e.target.value)}
        />
      </Label>
      <Label className="flex items-center gap-1 text-sm font-semibold">
        Required
        <Input
          type="checkbox"
          checked={field.required}
          onChange={(e) => handleRequiredChange(e.target.checked)}
        />
      </Label>
      <div className="flex gap-2">
        <Label className="grid gap-0.5 text-sm font-semibold">
          Min value
          <Input
            type="number"
            value={field.min?.toString() ?? 0}
            onChange={(e) => handleMinChange(e.target.value)}
            className="rounded border px-2 py-1.5 font-normal"
          />
        </Label>
        <Label className="grid gap-0.5 text-sm font-semibold">
          Max value
          <Input
            type="number"
            value={field.max?.toString() ?? 100}
            onChange={(e) => handleMaxChange(e.target.value)}
            className="rounded border px-2 py-1.5 font-normal"
          />
        </Label>
      </div>
    </div>
  );
}

export default NumberBlock;
