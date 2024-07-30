import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
    <div className="space-y-4 rounded bg-element p-6">
      <h3 className="text-lg font-bold">Text input</h3>

      <FormField
        control={control}
        name={`form.${index}.label`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Label</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
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
                  max={MAX_LENGTH}
                  value={field.value?.toString()}
                />
              </FormControl>
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
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default TextBlock;
