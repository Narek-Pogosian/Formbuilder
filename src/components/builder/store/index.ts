import { createSettingsSlice, type FormSettingsSlice } from "./slices/settings-slice";
import { createDialogSlice, type BuilderDialogSlice } from "./slices/dialog-slice";
import { createFieldsSlice, type FormFieldsSlice } from "./slices/fields-slice";
import { persist } from "zustand/middleware";
import { create } from "zustand";

export type BuilderStore = FormSettingsSlice & BuilderDialogSlice & FormFieldsSlice;

export const useBuilderStore = create<BuilderStore>()(
  persist(
    (...args) => ({
      ...createFieldsSlice(...args),
      ...createSettingsSlice(...args),
      ...createDialogSlice(...args),
    }),
    {
      name: "form-builder",

      partialize: (state) => ({
        fields: state.fields,
        settings: state.settings,
      }),
    }
  )
);
