import { type FieldType, type FieldDefinition } from "../../fields/registry";
import { type StateCreator } from "zustand";
import { type BuilderStore } from "..";

type BuilderDialogState =
  | {
      mode: "closed";
    }
  | {
      mode: "choose-field";
    }
  | {
      mode: "edit";
      field: FieldDefinition;
    }
  | {
      mode: "create";
      fieldType: FieldType;
      index?: number;
    };

export interface BuilderDialogSlice {
  dialogState: BuilderDialogState;

  openChooseFieldDialog: () => void;
  openCreateFieldDialog: (fieldType: FieldType, index?: number) => void;
  openEditFieldDialog: (field: FieldDefinition) => void;

  closeBuilderDialog: () => void;
}

export const createDialogSlice: StateCreator<BuilderStore, [], [], BuilderDialogSlice> = (set) => ({
  dialogState: {
    mode: "closed",
  },

  openChooseFieldDialog: () =>
    set({
      dialogState: {
        mode: "choose-field",
      },
    }),

  openCreateFieldDialog: (fieldType, index) =>
    set({
      dialogState: {
        mode: "create",
        fieldType,
        index,
      },
    }),

  openEditFieldDialog: (field) =>
    set({
      dialogState: {
        mode: "edit",
        field,
      },
    }),

  closeBuilderDialog: () =>
    set({
      dialogState: {
        mode: "closed",
      },
    }),
});
