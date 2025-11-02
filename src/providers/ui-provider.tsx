import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import type { Theme } from "./theme-context";
import { ThemeContext } from "./theme-context";

type UIProviderProps = {
  readonly children: ReactNode;
};

/**
 * UIProvider centraliza configuraciones globales de interfaz, como temas,
 * tipografías o proveedores de estado (por ejemplo, React Query).
 */
export function UIProvider({ children }: UIProviderProps) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedTheme = window.localStorage.getItem("ui-theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    setThemeState(storedTheme ?? (prefersDark ? "dark" : "light"));
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.classList.toggle("dark", theme === "dark");

    if (document.body) {
      document.body.dataset.theme = theme;
    }

    window.localStorage.setItem("ui-theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (nextTheme: Theme) => setThemeState(nextTheme),
      toggleTheme: () =>
        setThemeState((current) => (current === "light" ? "dark" : "light")),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
