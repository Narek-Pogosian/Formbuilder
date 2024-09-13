"use client";

import { type FormbuilderActionsType, formbuilderReducer, type FormbuilderState } from "./formbuilder-reducer";
import { type FormSchema } from "@/lib/schemas/form-schema";
import { createContext, useReducer } from "react";

type ContextType = { state: FormbuilderState; dispatch: React.Dispatch<FormbuilderActionsType> };
export const FormbuilderContext = createContext<ContextType | null>(null);

interface FormBuilderProps {
  mode: "create" | "edit";
  children: React.ReactNode;
}

interface FormBuilderCreateProps extends FormBuilderProps {
  mode: "create";
}

interface FormBuilderUpdateProps extends FormBuilderProps {
  mode: "edit";
  defaultFields: FormSchema;
  defaultTitle: string;
}

type Props = FormBuilderCreateProps | FormBuilderUpdateProps;

function FormbuilderProvider(props: Props) {
  const [state, dispatch] = useReducer(formbuilderReducer, {
    title: props.mode === "edit" ? props.defaultTitle : "",
    fields: props.mode === "edit" ? props.defaultFields : [],
  });

  return <FormbuilderContext.Provider value={{ state, dispatch }}>{props.children}</FormbuilderContext.Provider>;
}

export default FormbuilderProvider;
