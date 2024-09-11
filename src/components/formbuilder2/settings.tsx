import { type FormbuilderProps } from ".";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormbuilder } from "./hooks/use-formbuilder";
import { toast } from "sonner";
import { createFormScema } from "@/lib/schemas/form-schema";
import { saveForm, updateForm } from "@/server/actions/form";
import { useState } from "react";
import { Button } from "../ui/button";

function FormbuilderSettings(props: FormbuilderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, state } = useFormbuilder();

  async function handleSave() {
    const { data, success } = createFormScema.safeParse({
      title: state.title,
      form: state.fields,
    });

    if (!success) {
      return;
    }

    try {
      setIsLoading(true);
      if (props.mode === "edit") {
        await updateForm({
          form: { title: data.title, form: data.form },
          id: props.id,
        });
        toast("Saved");
      } else {
        await saveForm({ title: data.title, form: data.form });
        toast("New survey created");
      }
    } catch (error) {
      toast("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mb-8 flex gap-2">
      <Label htmlFor="title" className="sr-only">
        Title of survey
      </Label>
      <Input
        id="title"
        type="text"
        placeholder="Title of survey"
        value={state.title}
        className="font-semibold dark:bg-accent"
        onChange={(e) =>
          dispatch({ type: "EDIT_TITLE", payload: e.target.value })
        }
      />
      <Button onClick={handleSave} disabled={isLoading}>
        Save
      </Button>
    </div>
  );
}

export default FormbuilderSettings;
