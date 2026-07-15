import { Selector } from "@astryxdesign/core/Selector";
import {
  APP_LOCALES,
  LOCALE_LABELS,
  useAppLocale,
  type AppLocale,
} from "./LocaleContext";

const LOCALE_OPTIONS = APP_LOCALES.map((locale) => ({
  value: locale,
  label: LOCALE_LABELS[locale],
}));

export function LocalePicker() {
  const { locale, setLocale } = useAppLocale();

  return (
    <Selector
      label="Language"
      isLabelHidden
      options={LOCALE_OPTIONS}
      value={locale}
      onChange={(value) => setLocale(value as AppLocale)}
    />
  );
}
