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
      <div className="@xl:grid-cols-2 grid gap-4">
        <FormField
          control={control}
          name={`form.${index}.label`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="Your bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`form.${index}.placeholder`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Tell us about yourself"
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
