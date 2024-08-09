import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MAX_LENGTH, MAX_LENGTH_TEXTAREA } from "@/lib/schemas/form-schema";

interface TextBlockProps {
  index: number;
}

function TextAreaBlock({ index }: TextBlockProps) {
  return (
    <>
      <div className="grid gap-4 @xl:grid-cols-2">
        <div>
          <Label>Label</Label>
          <Input placeholder="Your bio" />
        </div>

        <div>
          <Label>Placeholder</Label>
          <Input
            type="text"
            placeholder="Tell us about yourself"
            min={0}
            max={MAX_LENGTH}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 space-y-0">
        <Input type="checkbox" className="w-fit" />
        <Label className="mb-0">Required</Label>
      </div>

      <div className="flex gap-2">
        <div>
          <Label>Minimum length</Label>
          <Input
            type="number"
            placeholder=""
            min={0}
            max={MAX_LENGTH_TEXTAREA}
          />
        </div>
        <div>
          <Label>Max length</Label>
          <Input
            type="number"
            placeholder=""
            min={0}
            max={MAX_LENGTH_TEXTAREA}
          />
        </div>
      </div>
    </>
  );
}

export default TextAreaBlock;
