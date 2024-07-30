import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
    <div className="space-y-4 rounded bg-element p-6">
      <p className="text-lg font-bold">Number input</p>

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
          name={`form.${index}.min`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder=""
                  {...field}
                  value={field.value?.toString() ?? ""}
                />
              </FormControl>
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
                  placeholder=""
                  {...field}
                  value={field.value?.toString() ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default NumberBlock;
