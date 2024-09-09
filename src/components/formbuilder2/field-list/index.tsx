import { useFormbuilder } from "../hooks/use-formbuilder";

function FieldList() {
  const { state } = useFormbuilder();

  return (
    <ul className="space-y-4">
      {state.fields.map((f) => (
        <li key={f.id}>Text input</li>
      ))}
    </ul>
  );
}

export default FieldList;
