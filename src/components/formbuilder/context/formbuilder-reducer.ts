import {
  type FormSchema,
  type FormSchemaField,
} from "@/lib/schemas/form-schema";

export type FormbuilderState = { title: string; fields: FormSchema };
export type FormbuilderActionsType =
  | { type: "EDIT_TITLE"; payload: string }
  | { type: "REMOVE_FIELD"; payload: string }
  | { type: "ADD_FIELD"; payload: FormSchemaField }
  | { type: "EDIT_FIELD"; payload: FormSchemaField }
  | { type: "SET_FIELDS"; payload: FormSchema }
  | { type: "RESET" };

export const formbuilderReducer = (
  state: FormbuilderState,
  action: FormbuilderActionsType,
): FormbuilderState => {
  switch (action.type) {
    case "EDIT_TITLE": {
      return {
        ...state,
        title: action.payload,
      };
    }

    case "REMOVE_FIELD": {
      return {
        ...state,
        fields: state.fields.filter((f) => f.id !== action.payload),
      };
    }

    case "ADD_FIELD": {
      return {
        ...state,
        fields: [...state.fields, action.payload],
      };
    }

    case "EDIT_FIELD": {
      return {
        ...state,
        fields: state.fields.map((f) =>
          f.id !== action.payload.id ? { ...f } : action.payload,
        ),
      };
    }

    case "SET_FIELDS": {
      return {
        ...state,
        fields: action.payload,
      };
    }

    case "RESET": {
      return {
        title: "",
        fields: [],
      };
    }

    default: {
      return state;
    }
  }
};
