import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type CreateFormSchema, MAX_LENGTH } from "@/lib/schemas/form-schema";
import { type Control } from "react-hook-form";

interface TextBlockProps {
  control: Control<CreateFormSchema>;
  index: number;
}

function TextBlock({ control, index }: TextBlockProps) {
  return (
    <div className="flex gap-2">
      <FormField
        control={control}
        name={`form.${index}.minLength`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Minimum length</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder=""
                {...field}
                min={0}
                max={MAX_LENGTH}
                value={field.value?.toString()}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`form.${index}.maxLength`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Max length</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder=""
                {...field}
                min={0}
                max={MAX_LENGTH}
                value={field.value?.toString()}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default TextBlock;
