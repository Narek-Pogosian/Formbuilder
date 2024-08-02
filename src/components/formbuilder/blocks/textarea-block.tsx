import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  type CreateFormSchema,
  MAX_LENGTH,
  MAX_LENGTH_TEXTAREA,
} from "@/lib/schemas/form-schema";
import { type Control } from "react-hook-form";

interface TextBlockProps {
  control: Control<CreateFormSchema>;
  index: number;
}

function TextAreaBlock({ control, index }: TextBlockProps) {
  return (
    <>
      <FormField
        control={control}
        name={`form.${index}.placeholder`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Placeholder</FormLabel>
            <FormControl>
              <Input
                type="text"
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
                  max={MAX_LENGTH_TEXTAREA}
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
                  max={MAX_LENGTH_TEXTAREA}
                  value={field.value?.toString()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}

export default TextAreaBlock;
