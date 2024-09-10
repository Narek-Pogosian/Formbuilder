import { useFieldArray, useForm } from "react-hook-form";
import {
  selectFormSchema,
  type SelectFormSchemaType,
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

function SelectForm({ defaultField, closeDialog }: FormProps) {
  if (defaultField && defaultField.type !== "select")
    throw Error("Need to pass in a select field to select form");

  const { dispatch } = useFormbuilder();

  const form = useForm<SelectFormSchemaType>({
    resolver: zodResolver(selectFormSchema),
    defaultValues: {
      label: defaultField?.label ?? "",
      placeholder: defaultField?.placeholder ?? "",
      required: defaultField?.required ?? false,
      options: defaultField?.options ?? [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  function onSubmit(data: SelectFormSchemaType) {
    dispatch({
      type: "ADD_FIELD",
      payload: {
        id: crypto.randomUUID(),
        type: "select",
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
                <Input placeholder="Name" {...field} />
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
                <Input placeholder="John Smith" {...field} />
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

        <div>
          <FormLabel>Options</FormLabel>
          {fields.map((option, index) => (
            <div key={option.id} className="mb-2 flex items-center gap-2">
              <FormField
                control={form.control}
                name={`options.${index}.value`} // Bind input to the field array
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder={`Option ${index + 1}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="danger"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => append({ value: "" })}>
            Add Option
          </Button>
        </div>

        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}

export default SelectForm;
