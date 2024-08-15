import { Label } from "@/components/ui/label";
import { type BlockProps } from ".";
import { Input } from "@/components/ui/input";

function CheckBlock({ update, field }: BlockProps) {
  if (field.type !== "checkbox")
    throw Error("Need to pass in a checkbox field");

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

export default CheckBlock;
