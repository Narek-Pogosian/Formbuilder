import { MAX_LENGTH } from "@/lib/schemas/form-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type BlockProps } from ".";
import { Checkbox } from "@/components/ui/checkbox";

function TextBlock({ update, field }: BlockProps) {
  if (field.type !== "text") throw Error("Need to pass in a text field");

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
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
        <Checkbox
          name="required"
          checked={field.required}
          onCheckedChange={(checked) => update("required", checked)}
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
