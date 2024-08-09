import { type InputType } from "@/lib/schemas/form-schema";
import { Button } from "@/components/ui/button";

interface BaseBlockProps {
  children: React.ReactNode;
  type: InputType;
  remove: () => void;
}

function BaseBlock({ children, type, remove }: BaseBlockProps) {
  return (
    <div className="ounded bg-background-card px-8 py-6 @container">
      <div className="grow space-y-8">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-xl font-extrabold capitalize">{type}</h3>
          <Button variant="danger" size="sm" type="button" onClick={remove}>
            Remove
          </Button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default BaseBlock;
