import { type FormSchema } from "@/lib/schemas/form-schema";

export type FormbuilderState = { title: string; fields: FormSchema };
export type FormbuilderActionsType =
  | { type: "EDIT_TITLE"; payload: string }
  | { type: "REMOVE_FIELD"; payload: string }
  | { type: "ADD_FIELD"; payload: FormSchema[number] }
  | { type: "SET_FIELDS"; payload: FormSchema };

export const formbuilderReducer = (state: FormbuilderState, action: FormbuilderActionsType): FormbuilderState => {
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

    case "SET_FIELDS": {
      return {
        ...state,
        fields: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
