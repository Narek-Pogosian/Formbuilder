import { MAX_LENGTH, type FormSchema } from "@/lib/schemas/form-schema";
import { type UpdateFunction } from "../field-list";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SelectBlockProps {
  field: FormSchema[number];
  update: UpdateFunction;
}

function SelectBlock({ field, update }: SelectBlockProps) {
  if (field.type !== "select") throw Error("Need to pass in a select field");

  return (
    <>
      <div className="grid gap-4 @xl:grid-cols-2">
        <Label>
          Label
          <Input
            name="label"
            placeholder="Full name"
            value={field.label}
            required
            onChange={(e) => update("label", e.target.value)}
          />
        </Label>

        <Label>
          Placeholder
          <Input
            name="placeholder"
            required
            placeholder="John Smith"
            value={field.placeholder}
            onChange={(e) => update("placeholder", e.target.value)}
            min={0}
            max={MAX_LENGTH}
          />
        </Label>
      </div>
      <Label className="flex w-fit items-center gap-2">
        <Input
          name="required"
          type="checkbox"
          className="!mt-0 w-fit"
          checked={field.required}
          onChange={(e) => update("required", e.target.checked)}
        />
        Required
      </Label>
    </>
  );
}

export default SelectBlock;
