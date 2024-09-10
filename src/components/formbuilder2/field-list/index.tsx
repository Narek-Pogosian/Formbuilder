import { useFormbuilder } from "../hooks/use-formbuilder";

function FieldList() {
  const { state } = useFormbuilder();

  return <ul className="space-y-4">{JSON.stringify(state.fields, null, 2)}</ul>;
}

export default FieldList;
