import { useForm } from "react-hook-form";
import {
  checkboxFormSchema,
  type CheckboxFormSchemaType,
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

function TextForm({ defaultField, closeDialog }: FormProps) {
  if (defaultField && defaultField.type !== "checkbox")
    throw Error("Need to pass in a checkbox field to checkbox form");

  const { dispatch } = useFormbuilder();

  const form = useForm<CheckboxFormSchemaType>({
    resolver: zodResolver(checkboxFormSchema),
    defaultValues: {
      label: defaultField?.label ?? "",
      required: false,
    },
  });

  function onSubmit(data: CheckboxFormSchemaType) {
    dispatch({
      type: defaultField ? "EDIT_FIELD" : "ADD_FIELD",
      payload: {
        id: defaultField?.id ?? crypto.randomUUID(),
        type: "checkbox",
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

        <Button type="submit">{defaultField ? "Edit" : "Add"}</Button>
      </form>
    </Form>
  );
}

export default TextForm;
