import { Selector } from "@astryxdesign/core/Selector";
import { useTranslator } from "@astryxdesign/core/i18n";
import {
  APP_THEMES,
  THEME_LABELS,
  useAppTheme,
  type AppTheme,
} from "./ThemeContext";

const THEME_OPTIONS = APP_THEMES.map((theme) => ({
  value: theme,
  label: THEME_LABELS[theme],
}));

export function ThemePicker() {
  const t = useTranslator();
  const { theme, setTheme } = useAppTheme();

  return (
    <Selector
      label={t("@app.theme.pickerLabel")}
      isLabelHidden
      options={THEME_OPTIONS}
      value={theme}
      onChange={(value) => setTheme(value as AppTheme)}
    />
  );
}
