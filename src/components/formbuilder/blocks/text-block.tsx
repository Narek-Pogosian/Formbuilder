import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type FormSchema, MAX_LENGTH } from "@/lib/schemas/form-schema";
import { type AllKeys } from "../fields-list";

interface TextBlockProps {
  field: FormSchema[number];
  update: (property: AllKeys, value: string) => void;
}

function TextBlock({ update, field }: TextBlockProps) {
  if (field.type !== "text") return;

  return (
    <>
      <div className="grid gap-4 @xl:grid-cols-2">
        <div>
          <Label>Label</Label>
          <Input
            placeholder="Full name"
            onChange={(e) => update("label", e.target.value)}
          />
        </div>

        <div>
          <Label>Placeholder</Label>
          <Input
            type="text"
            placeholder="John Smith"
            min={0}
            max={MAX_LENGTH}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 space-y-0">
        <Input type="checkbox" className="w-fit" />
        <Label className="mb-0">Required</Label>
      </div>

      <div className="flex flex-wrap gap-4">
        <div>
          <Label>Minimum length</Label>
          <Input type="number" placeholder="" min={0} max={MAX_LENGTH} />
        </div>
        <div>
          <Label>Max length</Label>
          <Input type="number" placeholder="" min={0} max={MAX_LENGTH} />
        </div>
      </div>
    </>
  );
}

export default TextBlock;
