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
  );
}

export default NumberBlock;
