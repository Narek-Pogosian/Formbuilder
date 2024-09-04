"use client";

import { createValidationSchema } from "./create-validation";
import { type FormSchema } from "@/lib/schemas/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { answerSurvey } from "@/server/actions/answer";
import { type ZodObject } from "zod";

interface FormRendererProps {
  mode: "answer" | "preview";
  form: FormSchema;
}

interface FormRendererAnswerProps extends FormRendererProps {
  mode: "answer";
  id: string;
}

interface FormRendererPreviewProps extends FormRendererProps {
  mode: "preview";
}

type Props = FormRendererAnswerProps | FormRendererPreviewProps;

function FormRenderer(props: Props) {
  const schema = createValidationSchema(props.form);
  const f = useForm<typeof schema>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
  });

  async function onSubmit(data: typeof schema) {
    if (props.mode === "preview") {
      alert("Preview survey submitted without errors");
      return;
    }

    const res = await answerSurvey({
      answers: JSON.stringify(data),
      surveyId: props.id,
    });

    if (res?.data?.success) {
      console.log("Success");
    }
  }

  return (
    <Form {...f}>
      <form
        onSubmit={f.handleSubmit(onSubmit)}
        className="mx-auto grid w-full max-w-3xl gap-8 py-4"
      >
        {props.form.map((formField, i) => {
          const label = formField.label as keyof typeof schema;

          if (formField.type === "text")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={formField.placeholder}
                        {...field}
                        value={(field.value as string) ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );

          if (formField.type === "number")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={formField.min}
                        max={formField.max}
                        placeholder={formField.min?.toString() ?? ""}
                        {...field}
                        value={(field.value as number | string) ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );

          if (formField.type === "textarea")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={formField.placeholder}
                        {...field}
                        rows={4}
                        value={field.value as string}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );

          if (formField.type === "checkbox")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value as boolean | undefined}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>{label}</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );

          if (formField.type === "select")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value as string}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={formField.placeholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {formField.options.map((option) => (
                          <SelectItem value={option} key={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );

          if (formField.type === "radio")
            return (
              <FormField
                key={label + i.toString()}
                control={f.control}
                name={label}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value as string}
                        className="flex flex-col space-y-1"
                      >
                        {formField.options.map((option) => (
                          <FormItem
                            key={option}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={option} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
        })}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default FormRenderer;
