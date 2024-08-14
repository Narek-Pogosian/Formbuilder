import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type BlockProps } from ".";

function NumberBlock({ field, update }: BlockProps) {
  if (field.type !== "number") throw Error("Need to pass in a number field");

  return (
    <>
      <Label>
        Label
        <Input
          name="age"
          placeholder="Age"
          value={field.label}
          required
          onChange={(e) => update("label", e.target.value)}
        />
      </Label>

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
          Minimum value
          <Input
            name="minValue"
            type="number"
            placeholder="0"
            value={field.min}
            onChange={(e) => update("min", e.target.value)}
          />
        </Label>
        <Label className="w-fit">
          Max value
          <Input
            name="maxValue"
            type="number"
            placeholder="100"
            value={field.max}
            onChange={(e) => update("max", e.target.value)}
          />
        </Label>
      </div>
    </>
  );
}

export default NumberBlock;
