import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Theme } from "@astryxdesign/core";
// Runtime-injection imports (not the /built variant) so switching themes at
// runtime re-injects styles without needing a theme.css per theme on the page.
import { neutralTheme } from "@astryxdesign/theme-neutral";
import { y2kTheme } from "@astryxdesign/theme-y2k";

// Themes this app knows about. Add a package here (and to THEME_OBJECTS /
// THEME_LABELS) after `npm install @astryxdesign/theme-{name}`.
export const APP_THEMES = ["y2k", "neutral"] as const;
export type AppTheme = (typeof APP_THEMES)[number];

export const THEME_LABELS: Record<AppTheme, string> = {
  y2k: "Y2K",
  neutral: "Neutral",
};

const THEME_OBJECTS = {
  y2k: y2kTheme,
  neutral: neutralTheme,
} as const;

type ThemeContextValue = {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used inside <AppThemeProvider>");
  }
  return context;
}

type AppThemeProviderProps = {
  children: ReactNode;
  initialTheme?: AppTheme;
};

export function AppThemeProvider({
  children,
  initialTheme = "y2k",
}: AppThemeProviderProps) {
  const [theme, setTheme] = useState<AppTheme>(initialTheme);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <Theme theme={THEME_OBJECTS[theme]}>{children}</Theme>
    </ThemeContext.Provider>
  );
}
