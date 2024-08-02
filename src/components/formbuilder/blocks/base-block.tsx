import {
  type UseFieldArrayRemove,
  type UseFieldArraySwap,
} from "react-hook-form";
import { type InputType } from "@/lib/schemas/form-schema";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BaseBlockProps {
  children: React.ReactNode;
  remove: UseFieldArrayRemove;
  swap: UseFieldArraySwap;
  index: number;
  type: InputType;
  isLast: boolean;
}

function BaseBlock({
  children,
  type,
  index,
  remove,
  swap,
  isLast,
}: BaseBlockProps) {
  return (
    <div className="@container flex gap-4 rounded bg-element py-6 pl-4 pr-8">
      <div className="flex flex-col gap-1">
        <Button
          size="icon"
          variant="ghost"
          type="button"
          className="hover:bg-transparent"
          onClick={() => swap(index, index - 1)}
          disabled={index === 0}
        >
          <ArrowUp className="size-5" />
          <span className="sr-only">Move up</span>
        </Button>
        <Button
          size="icon"
          variant="ghost"
          type="button"
          className="hover:bg-transparent"
          onClick={() => swap(index, index + 1)}
          disabled={isLast}
        >
          <ArrowDown className="size-5" />
          <span className="sr-only">Move down</span>
        </Button>
      </div>

      <div className="grow space-y-8">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-2xl font-extrabold capitalize">{type}</h3>
          <Button
            variant="danger"
            size="sm"
            type="button"
            onClick={() => remove(index)}
          >
            Remove
          </Button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default BaseBlock;
