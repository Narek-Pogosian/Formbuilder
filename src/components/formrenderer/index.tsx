import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createValidationSchema } from "../utils";
import { FormSchema } from "../formbuilder";

const formList: FormSchema = [
  {
    type: "text",
    label: "Label",
    required: true,
    minLength: 5,
  },
  {
    type: "text",
    label: "Label2",
    required: true,
    minLength: 5,
    maxLength: 10,
  },
  {
    type: "number",
    label: "Number",
    required: true,
    min: 10,
  },
];

function FormRenderer() {
  const schema = createValidationSchema(formList);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<typeof schema>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: typeof schema) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formList.map((field) => {
        const label = field.label as keyof typeof schema;

        return (
          <div key={label}>
            <label>{label}</label>
            <input
              type={field.type === "number" ? "number" : "text"}
              {...register(label)}
            />
            {errors[label] && <span>{errors[label]?.message?.toString()}</span>}
          </div>
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormRenderer;
