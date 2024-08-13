import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type FormSchema, MAX_LENGTH } from "@/lib/schemas/form-schema";
import { type UpdateFunction } from "../fields-list";

interface TextBlockProps {
  field: FormSchema[number];
  update: UpdateFunction;
}

function TextBlock({ update, field }: TextBlockProps) {
  if (field.type !== "text") throw Error("Need to pass in a text field");

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

      <div className="flex flex-wrap gap-4">
        <Label className="w-fit">
          Minimum length
          <Input
            name="minLength"
            type="number"
            placeholder="0"
            value={field.minLength}
            onChange={(e) => update("minLength", e.target.value)}
            min={0}
            max={MAX_LENGTH}
          />
        </Label>
        <Label className="w-fit">
          Max length
          <Input
            name="maxLength"
            type="number"
            placeholder={MAX_LENGTH.toString()}
            value={field.maxLength}
            onChange={(e) => update("maxLength", e.target.value)}
            min={0}
            max={MAX_LENGTH}
          />
        </Label>
      </div>
    </>
  );
}

export default TextBlock;
