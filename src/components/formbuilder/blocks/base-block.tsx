import { type FieldType } from "@/lib/schemas/form-schema";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Grip } from "lucide-react";

type BaseBlockProps = {
  id: string;
  type: FieldType;
  children: React.ReactNode;
  remove: () => void;
};

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & BaseBlockProps;

/**
 * This is the base that needs to wrap every type of block, it provides the drag functionality and remove
 */
function BaseBlock({ children, className, type, remove, id }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, data: { type } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={cn("cursor-grab rounded bg-background-card p-6", className)}
      ref={setNodeRef}
      style={{ ...style, touchAction: "none" }}
      {...attributes}
      {...listeners}
      role="button"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <Grip className="mt-1 size-5 text-foreground-muted" />
        <div className="grow space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold capitalize">{type}</h3>
            <Button variant="danger" size="sm" type="button" onClick={remove}>
              Remove
            </Button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default BaseBlock;
