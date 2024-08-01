import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  type InputType,
  type CreateFormSchema,
} from "@/lib/schemas/form-schema";
import { ArrowDown, ArrowUp } from "lucide-react";
import {
  type UseFieldArrayRemove,
  type Control,
  type UseFieldArraySwap,
} from "react-hook-form";

interface BaseBlockProps {
  children: React.ReactNode;
  control: Control<CreateFormSchema>;
  remove: UseFieldArrayRemove;
  swap: UseFieldArraySwap;
  index: number;
  type: InputType;
  isLast: boolean;
}

function BaseBlock({
  children,
  type,
  control,
  index,
  remove,
  swap,
  isLast,
}: BaseBlockProps) {
  return (
    <div className="flex gap-4 rounded bg-element py-6 pl-4 pr-8">
      <div className="flex flex-col gap-1">
        <Button
          size="icon"
          variant="ghost"
          type="button"
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
          onClick={() => swap(index, index + 1)}
          disabled={isLast}
        >
          <ArrowDown className="size-5" />
          <span className="sr-only">Move down</span>
        </Button>
      </div>

      <div className="grow space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold capitalize">{type}</h3>
          <Button
            variant="danger"
            size="sm"
            type="button"
            onClick={() => remove(index)}
          >
            Delete
          </Button>
        </div>

        <FormField
          control={control}
          name={`form.${index}.label`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`form.${index}.required`}
          render={({ field }) => (
            <FormItem className="flex items-center gap-1 space-y-0">
              <FormLabel className="mb-0">Required</FormLabel>
              <FormControl>
                <Input
                  type="checkbox"
                  className="w-fit"
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </div>
    </div>
  );
}

export default BaseBlock;
