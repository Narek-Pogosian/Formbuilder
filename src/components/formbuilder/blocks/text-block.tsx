import { Input, InputControl } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MAX_LENGTH,
  type FormSchema,
  type TextSchemaType,
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
    <div className="space-y-4 border-b pb-6">
      <h3 className="text-lg font-bold">Text input</h3>

      <InputControl>
        <Label htmlFor={field.id + "label"}>Label</Label>
        <Input
          type="text"
          id={field.id + "label"}
          value={field.label}
          onChange={(e) => handleLabelChange(e.target.value)}
        />
      </InputControl>

      <Label className="flex items-center gap-1 text-sm font-semibold">
        Required
        <Input
          type="checkbox"
          checked={field.required}
          onChange={(e) => handleRequiredChange(e.target.checked)}
          className="w-fit"
        />
      </Label>
      <div className="flex gap-2">
        <Label className="grid gap-0.5 text-sm font-semibold">
          Min length
          <Input
            type="number"
            min={0}
            max={MAX_LENGTH}
            value={field.minLength?.toString() ?? 1}
            onChange={(e) => handleMinLengthChange(e.target.value)}
            className="rounded border px-2 py-1.5 font-normal"
          />
        </Label>
        <Label className="grid gap-0.5 text-sm font-semibold">
          Max length
          <Input
            type="number"
            min={0}
            max={MAX_LENGTH}
            value={field.maxLength?.toString() ?? MAX_LENGTH}
            onChange={(e) => handleMaxLengthChange(e.target.value)}
            className="rounded border px-2 py-1.5 font-normal"
          />
        </Label>
      </div>
    </div>
  );
}

export default TextBlock;
