import { MAX_LENGTH } from "@/lib/schemas/form-schema";
import { useFormbuilder } from "../hooks/use-formbuilder";
import { Button } from "@/components/ui/button";

function FieldAdder() {
  const { dispatch } = useFormbuilder();

  return (
    <Button
      onClick={() =>
        dispatch({
          type: "ADD_FIELD",
          payload: {
            id: crypto.randomUUID(),
            type: "text",
            placeholder: "",
            label: "",
            required: false,
            minLength: 1,
            maxLength: MAX_LENGTH,
          },
        })
      }
    >
      Add text
    </Button>
  );
}

export default FieldAdder;
