import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  SUPPORTED_LANGUAGES,
  getUiDictionary,
  hasLocaleLoaded,
  loadEsLocale,
  loadExtendedLocales,
  type LanguageMeta,
  type Locale,
  type UiDictionary,
} from './translations';

const LOCALE_STORAGE_KEY = 'joyacexstudio_locale';

interface LocaleContextValue {
  locale: Locale;
  languageMeta: LanguageMeta;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
  t: UiDictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isSupportedLocale(value: string | null): value is Locale {
  if (!value) return false;
  return SUPPORTED_LANGUAGES.some((lang) => lang.code === value);
}

function getInitialLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isSupportedLocale(saved)) {
      return saved;
    }
  } catch {
    // Ignore storage access failures in sandboxed frames
  }
  return 'en';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const [, setLocaleLoadTick] = useState(0);

  const languageMeta =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === locale) ??
    SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = languageMeta.dir;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Ignore storage write errors in restricted privacy modes
    }

    if (!hasLocaleLoaded(locale)) {
      let active = true;
      const loader = locale === 'es' ? loadEsLocale : loadExtendedLocales;
      void loader().then(() => {
        if (active) {
          setLocaleLoadTick((v) => v + 1);
        }
      });
      return () => {
        active = false;
      };
    }
  }, [locale, languageMeta.dir]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
  };

  const toggleLocale = () => {
    setLocaleState((prev) => (prev === 'en' ? 'es' : 'en'));
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        languageMeta,
        setLocale,
        toggleLocale,
        t: getUiDictionary(locale),
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used inside a LocaleProvider');
  }
  return ctx;
}
