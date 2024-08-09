import { type InputType } from "@/lib/schemas/form-schema";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface BaseBlockProps {
  children: React.ReactNode;
  type: InputType;
  id: string;
  remove: () => void;
}

function BaseBlock({ children, type, remove, id }: BaseBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, data: { type } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="cursor-grab rounded bg-background-card px-8 py-6 @container"
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
