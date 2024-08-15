import { type BlockProps } from ".";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function RadioBlock({ update, field }: BlockProps) {
  if (field.type !== "radio") throw Error("Need to pass in a radio field");

  const [option, setOption] = useState("");

  function addOption(o: string) {
    /* eslint-disable */
    // @ts-expect-error we are type narrowing above but for some reason
    if (!o.trim() || field.options.includes(o)) return;

    // @ts-expect-error we are type narrowing above but for some reason
    update("options", [...field.options, o.trim()]);
    setOption("");
  }

  function removeOption(o: string) {
    /* eslint-disable */
    // @ts-expect-error we are type narrowing above but for some reason
    update("options", [...field.options.filter((opt) => opt !== o)]);
  }

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
      <Label className="flex w-fit items-center gap-2">
        <Checkbox
          name="required"
          checked={field.required}
          onCheckedChange={(checked) => update("required", checked)}
        />
        Required
      </Label>
      <div>
        <div className="relative mb-4 flex gap-2">
          <Label className="w-auto">
            Add option
            <Input
              id="option"
              placeholder="Label"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              min={0}
              max={40}
            />
          </Label>
          <Button
            className="mt-[21px] h-fit"
            type="button"
            onClick={() => addOption(option)}
          >
            Add Option
          </Button>
        </div>
        <ul className="flex flex-wrap gap-2">
          {field.options.map((opt) => (
            <li
              key={opt}
              className="cursor-pointer rounded bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground"
              onClick={() => removeOption(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RadioBlock;
