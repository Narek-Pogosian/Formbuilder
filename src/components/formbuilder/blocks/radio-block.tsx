import { type BlockProps } from ".";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function RadioBlock({ update, field }: BlockProps) {
  if (field.type !== "radio") throw Error("Need to pass in a radio field");

  return (
    <>
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
    </>
  );
}

export default RadioBlock;
