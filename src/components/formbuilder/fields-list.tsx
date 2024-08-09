import { type FormSchema } from "@/lib/schemas/form-schema";

interface FieldsListProps {
  fields: FormSchema;
}

function FieldsList({ fields }: FieldsListProps) {
  return (
    <div className="grid gap-10">
      <h2>Form field</h2>
      {JSON.stringify(fields, null, 2)}
    </div>
  );
}

export default FieldsList;
