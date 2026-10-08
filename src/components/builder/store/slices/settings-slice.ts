import { type StateCreator } from "zustand";
import { type BuilderStore } from "..";

interface SettingsState {
  title: string;
  description: string;
}

export interface FormSettingsSlice {
  settings: SettingsState;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  resetSettings: () => void;
}

export const createSettingsSlice: StateCreator<BuilderStore, [], [], FormSettingsSlice> = (
  set
) => ({
  settings: {
    title: "",
    description: "",
  },

  setTitle: (title) => {
    set((state) => ({ settings: { ...state.settings, title } }));
  },

  setDescription: (description) => {
    set((state) => ({ settings: { ...state.settings, description } }));
  },

  resetSettings: () => {
    set({ settings: { title: "", description: "" } });
  },
});
