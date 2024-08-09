import { type InputType } from "@/lib/schemas/form-schema";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface BaseBlockProps {
  id: string;
  type: InputType;
  children: React.ReactNode;
  isDragging?: boolean;
  remove: () => void;
}

function BaseBlock({
  children,
  type,
  remove,
  id,
  isDragging = false,
}: BaseBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, data: { type } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={cn(
        "cursor-grab rounded bg-background-card px-8 py-6 @container",
        { "shadow-2xl": isDragging },
      )}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
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
