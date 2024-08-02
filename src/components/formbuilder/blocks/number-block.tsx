import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type CreateFormSchema } from "@/lib/schemas/form-schema";
import { type Control } from "react-hook-form";

interface NumberBlockProps {
  control: Control<CreateFormSchema>;
  index: number;
}

function NumberBlock({ control, index }: NumberBlockProps) {
  return (
    <>
      <FormField
        control={control}
        name={`form.${index}.label`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Label</FormLabel>
            <FormControl>
              <Input placeholder="Your age" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`form.${index}.required`}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2 space-y-0">
            <FormControl>
              <Input
                type="checkbox"
                className="w-fit"
                checked={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="mb-0">Required</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-2">
        <FormField
          control={control}
          name={`form.${index}.min`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  value={field.value?.toString() ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`form.${index}.max`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="100"
                  {...field}
                  value={field.value?.toString() ?? ""}
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

export default NumberBlock;
