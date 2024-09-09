import { useContext } from "react";
import { FormbuilderContext } from "../context/formbuilder-context";

export const useFormbuilder = () => {
  const context = useContext(FormbuilderContext);

  if (!context) throw new Error("useFormbuilder must be inside a FormbuilderProvider");

  return context;
};
