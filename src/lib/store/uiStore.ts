import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CommandPaletteState {
  isOpen: boolean;
  recentCommands: string[];
  open: () => void;
  close: () => void;
  addRecentCommand: (command: string) => void;
}

export const useCommandPaletteStore = create<CommandPaletteState>()(
  persist(
    (set) => ({
      isOpen: false,
      recentCommands: [],
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addRecentCommand: (command) =>
        set((state) => ({
          recentCommands: [
            command,
            ...state.recentCommands.filter((cmd) => cmd !== command),
          ].slice(0, 5),
        })),
    }),
    {
      name: "command-palette-storage",
      partialize: (state) => ({ recentCommands: state.recentCommands }),
    }
  )
);
