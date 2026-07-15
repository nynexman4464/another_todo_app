import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { InternationalizationProvider } from "@astryxdesign/core/i18n";
import frCatalog from "./fr.json";

// Locales this app knows about. `en` is the shipped baseline (no
// override needed). `pseudo` is the astryx-generated pseudo-locale bundled
// in @astryxdesign/core/locales/pseudo.json (for smoke-testing that every
// string flows through i18n). `fr` is the app-provided French catalog.
export const APP_LOCALES = ["en", "fr", "pseudo"] as const;
export type AppLocale = (typeof APP_LOCALES)[number];

export const LOCALE_LABELS: Record<AppLocale, string> = {
  en: "English",
  fr: "Français",
  pseudo: "Pseudo (⟦…⟧)",
};

type LocaleContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useAppLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useAppLocale must be used inside <AppLocaleProvider>");
  }
  return context;
}

type AppLocaleProviderProps = {
  children: ReactNode;
  initialLocale?: AppLocale;
};

// Loaded lazily so we don't ship the pseudo bundle to production users.
// Vite's dynamic import returns a namespace with `.default` for JSON.
let pseudoCatalogPromise: Promise<Record<string, unknown>> | null = null;
function loadPseudoCatalog() {
  if (!pseudoCatalogPromise) {
    pseudoCatalogPromise = import(
      "@astryxdesign/core/locales/pseudo.json"
    ).then((mod) => (mod as { default: Record<string, unknown> }).default);
  }
  return pseudoCatalogPromise;
}

export function AppLocaleProvider({
  children,
  initialLocale = "en",
}: AppLocaleProviderProps) {
  const [locale, setLocale] = useState<AppLocale>(initialLocale);
  const [pseudoCatalog, setPseudoCatalog] = useState<Record<
    string,
    unknown
  > | null>(null);

  const setLocaleAndLoad = useCallback((nextLocale: AppLocale) => {
    if (nextLocale === "pseudo" && !pseudoCatalog) {
      void loadPseudoCatalog().then(setPseudoCatalog);
    }
    setLocale(nextLocale);
  }, [pseudoCatalog]);

  const value = useMemo(
    () => ({ locale, setLocale: setLocaleAndLoad }),
    [locale, setLocaleAndLoad],
  );

  // Assemble the messages map. Only include locales that have loaded
  // catalogs — the provider is happy to receive a subset.
  const messages = useMemo(() => {
    const map: Record<string, Record<string, unknown>> = {
      fr: frCatalog as unknown as Record<string, unknown>,
    };
    if (pseudoCatalog) {
      map.pseudo = pseudoCatalog;
    }
    return map;
  }, [pseudoCatalog]);

  return (
    <LocaleContext.Provider value={value}>
      <InternationalizationProvider
        locale={locale}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        messages={messages as any}
      >
        {children}
      </InternationalizationProvider>
    </LocaleContext.Provider>
  );
}
