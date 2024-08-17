import { MAX_LENGTH } from "@/lib/schemas/form-schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { type BlockProps } from ".";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { optionFormat } from "@/lib/utils";
import { X } from "lucide-react";

function SelectBlock({ field, update }: BlockProps) {
  if (field.type !== "select") throw Error("Need to pass in a select field");

  const [option, setOption] = useState("");

  function addOption(e: React.FormEvent) {
    /* eslint-disable */
    e.preventDefault();

    // @ts-expect-error we are type narrowing above but for some reason
    if (!option.trim() || field.options.includes(option.trim())) return;

    // @ts-expect-error we are type narrowing above but for some reason
    update("options", [...field.options, option.trim()]);
    setOption("");
  }

  function removeOption(o: string) {
    /* eslint-disable */
    // @ts-expect-error we are type narrowing above but for some reason
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
        <Checkbox
          name="required"
          checked={field.required}
          onCheckedChange={(checked) => update("required", checked)}
        />
        Required
      </Label>
      <div>
        <form className="relative mb-4 flex gap-2" onSubmit={addOption}>
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
          <Button className="mt-[21px] h-fit" type="submit">
            Add Option
          </Button>
        </form>
        <ul className="flex flex-wrap gap-2">
          {field.options.map((opt) => (
            <li
              key={opt}
              className="group flex cursor-pointer items-center gap-0.5 rounded border bg-background-input py-1 pl-5 text-sm font-semibold"
              onClick={() => removeOption(opt)}
            >
              {optionFormat(opt)}
              <span className="pr-1 opacity-0 transition-opacity group-hover:opacity-100">
                <X className="size-4" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SelectBlock;
