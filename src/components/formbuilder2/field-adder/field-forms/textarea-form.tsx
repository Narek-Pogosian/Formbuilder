import { useForm } from "react-hook-form";
import {
  MAX_LENGTH_TEXTAREA,
  textareaFormSchema,
  type TextareaFormSchemaType,
} from "@/lib/schemas/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FormProps } from "..";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormbuilder } from "../../hooks/use-formbuilder";

function TextAreaForm({ defaultField, closeDialog }: FormProps) {
  if (defaultField && defaultField.type !== "textarea")
    throw Error("Need to pass in a textarea field to textarea form");

  const { dispatch } = useFormbuilder();

  const form = useForm<TextareaFormSchemaType>({
    resolver: zodResolver(textareaFormSchema),
    defaultValues: {
      label: defaultField?.label ?? "",
      placeholder: defaultField?.placeholder ?? "",
      required: defaultField?.required ?? false,
      minLength: defaultField?.minLength ?? 0,
      maxLength: defaultField?.maxLength ?? MAX_LENGTH_TEXTAREA,
    },
  });

  function onSubmit(data: TextareaFormSchemaType) {
    dispatch({
      type: "ADD_FIELD",
      payload: {
        id: crypto.randomUUID(),
        type: "textarea",
        ...data,
      },
    });
    closeDialog();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-4"
      >
        <FormField
          control={form.control}
          name="label"
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
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input placeholder="I am a ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum length</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={MAX_LENGTH_TEXTAREA}
                  placeholder="0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum length</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={MAX_LENGTH_TEXTAREA}
                  placeholder="300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}

export default TextAreaForm;
