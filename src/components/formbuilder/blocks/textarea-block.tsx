import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type FormSchema,
  MAX_LENGTH,
  MAX_LENGTH_TEXTAREA,
} from "@/lib/schemas/form-schema";
import { type UpdateFunction } from "../fields-list";

interface TextBlockProps {
  field: FormSchema[number];
  update: UpdateFunction;
}

function TextAreaBlock({ field, update }: TextBlockProps) {
  if (field.type !== "textarea")
    throw Error("Need to pass in a textarea field");

  return (
    <>
      <div className="grid gap-4 @xl:grid-cols-2">
        <Label>
          Label
          <Input
            name="label"
            placeholder="Your bio"
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
            placeholder="Tell us about yourself"
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
            max={MAX_LENGTH_TEXTAREA}
          />
        </Label>
        <Label className="w-fit">
          Max length
          <Input
            name="maxLength"
            type="number"
            placeholder={MAX_LENGTH_TEXTAREA.toString()}
            value={field.maxLength}
            onChange={(e) => update("maxLength", e.target.value)}
            min={0}
            max={MAX_LENGTH_TEXTAREA}
          />
        </Label>
      </div>
    </>
  );
}

export default TextAreaBlock;
