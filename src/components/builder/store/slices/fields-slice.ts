import { type FormDefinitions, type FieldDefinition } from "../../fields/registry";
import { type StateCreator } from "zustand";
import { type BuilderStore } from "..";

export interface FormFieldsSlice {
  fields: FormDefinitions;

  addField: (newField: FieldDefinition, index?: number) => void;
  editField: (updatedField: FieldDefinition) => void;
  duplicateField: (fieldId: string) => void;
  setFields: (fields: FormDefinitions) => void;
  deleteField: (id: string) => void;
  reorderField: (sourceIdx: number, destIdx?: number) => void;
  resetFields: () => void;
}

export const createFieldsSlice: StateCreator<BuilderStore, [], [], FormFieldsSlice> = (set) => ({
  fields: [],

  setFields: (fields) => {
    set({ fields });
  },

  addField: (field, index) => {
    set((state) => ({
      fields:
        typeof index === "number"
          ? state.fields.toSpliced(index, 0, field)
          : state.fields.concat(field),
    }));
  },

  duplicateField: (fieldId) => {
    set((state) => {
      const fieldToDuplicate = state.fields.find((field) => field.id === fieldId);
      if (!fieldToDuplicate) return state;

      const newField = structuredClone(fieldToDuplicate);
      newField.id = crypto.randomUUID();

      const index = state.fields.findIndex((field) => field.id === fieldId);
      if (index === -1) return state;
      return {
        fields: state.fields.toSpliced(index + 1, 0, newField),
      };
    });
  },

  editField: (field) => {
    set((state) => ({
      fields: state.fields.map((f) => (f.id !== field.id ? f : field)),
    }));
  },

  deleteField: (id) => {
    set((state) => ({
      fields: state.fields.filter((field) => field.id !== id),
    }));
  },

  reorderField: (sourceIdx, destIdx) => {
    set((state) => {
      const fields = state.fields.slice();
      const [field] = fields.splice(sourceIdx, 1);

      const targetIdx = destIdx === undefined ? fields.length : destIdx;
      fields.splice(targetIdx, 0, field);

      return { fields };
    });
  },

  resetFields: () => {
    set({ fields: [] });
  },
});
