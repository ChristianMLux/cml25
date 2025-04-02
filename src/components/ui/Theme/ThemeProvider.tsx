"use client";
import { createContext, useContext, useEffect } from "react";
import { useThemeStore } from "@/lib/store/themeStore";
import { ThemeState } from "@/types";

const ThemeContext = createContext<ThemeState | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeStore = useThemeStore();

  useEffect(() => {
    const { theme } = themeStore;

    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const root = document.documentElement;
    const body = document.body;

    if (theme === "dark" || (theme === "system" && systemDark)) {
      root.classList.add("dark");
      root.classList.remove("light");
      body.dataset.theme = "dark";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      body.dataset.theme = "light";
    }

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (theme === "system") {
        if (event.matches) {
          root.classList.add("dark");
          root.classList.remove("light");
          body.dataset.theme = "dark";
        } else {
          root.classList.remove("dark");
          root.classList.add("light");
          body.dataset.theme = "light";
        }
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [themeStore, themeStore.theme]);

  return (
    <ThemeContext.Provider value={themeStore}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
