import { Input } from "../ui/input";
import { useFormbuilder } from "./hooks/use-formbuilder";

function FormbuilderSettings() {
  const { dispatch, state } = useFormbuilder();

  return (
    <div>
      <Input
        type="text"
        value={state.title}
        onChange={(e) => dispatch({ type: "EDIT_TITLE", payload: e.target.value })}
      />
    </div>
  );
}

export default FormbuilderSettings;
