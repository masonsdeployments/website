"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

type Theme = "dark" | "light" | "system";
type Coords = { x: number; y: number };

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: (coords?: Coords) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const emptySubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const mounted = useHydrated();
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (localStorage.getItem(storageKey) as Theme | null) ?? defaultTheme;
  });

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    let appliedTheme: "light" | "dark" = theme === "dark" ? "dark" : "light";
    if (theme === "system") {
      appliedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    root.classList.add(appliedTheme);
    localStorage.setItem(storageKey, theme);
  }, [theme, mounted, storageKey]);

  const handleThemeChange = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const handleThemeToggle = useCallback(
    (coords?: Coords) => {
      const root = document.documentElement;
      const isCurrentlyDark = root.classList.contains("dark");
      const newTheme: Theme = isCurrentlyDark ? "light" : "dark";

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!document.startViewTransition || prefersReducedMotion) {
        handleThemeChange(newTheme);
        return;
      }

      if (coords) {
        root.style.setProperty("--x", `${coords.x}px`);
        root.style.setProperty("--y", `${coords.y}px`);
      }

      document.startViewTransition(() => {
        handleThemeChange(newTheme);
      });
    },
    [handleThemeChange]
  );

  const value = useMemo(
    () => ({
      theme,
      setTheme: handleThemeChange,
      toggleTheme: handleThemeToggle,
    }),
    [theme, handleThemeChange, handleThemeToggle]
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
