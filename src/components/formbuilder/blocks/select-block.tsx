import { MAX_LENGTH } from "@/lib/schemas/form-schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { type BlockProps } from ".";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function SelectBlock({ field, update }: BlockProps) {
  if (field.type !== "select") throw Error("Need to pass in a select field");

  const [option, setOption] = useState("");

  function addOption(o: string) {
    if (!o.trim()) return;
    // @ts-expect-error we are type narrowing above but for some reason
    // eslint-disable-next-line
    update("options", [...field.options, o.trim()]);
    setOption("");
  }

  function removeOption(o: string) {
    // @ts-expect-error we are type narrowing above but for some reason
    // eslint-disable-next-line
    update("options", [...field.options.filter((opt) => opt !== o)]);
  }

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
              className="rounded bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground"
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

export default SelectBlock;
