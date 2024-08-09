import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NumberBlockProps {
  index: number;
}

function NumberBlock({ index }: NumberBlockProps) {
  return (
    <>
      <div>
        <Label>Label</Label>
        <Input placeholder="Your age" />
      </div>

      <div className="flex items-center gap-2 space-y-0">
        <Input type="checkbox" className="w-fit" />
        <Label className="mb-0">Required</Label>
      </div>

      <div>
        <Label>Minimum value</Label>
        <Input type="number" placeholder="0" />
      </div>

      <div>
        <Label>Maximum value</Label>
        <Input type="number" placeholder="100" />
      </div>
    </>
  );
}

export default NumberBlock;
