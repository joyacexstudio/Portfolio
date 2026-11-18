import { useEffect, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  Globe,
  Languages,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import {
  SUPPORTED_LANGUAGES,
  preloadAllLocales,
  type Locale,
} from '../i18n/translations';
import { useTheme } from '../theme/ThemeContext';

interface TopBarProps {
  onStartProject: () => void;
}

const SECTION_IDS = [
  'services',
  'work',
  'community',
  'insights',
  'proof',
  'contact',
] as const;

type SectionId = 'hero' | (typeof SECTION_IDS)[number];

export function TopBar({ onStartProject }: TopBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [langQuery, setLangQuery] = useState('');
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const { locale, languageMeta, setLocale, t } = useLocale();
  const { theme, isLight, setTheme } = useTheme();

  const desktopPickerRef = useRef<HTMLDivElement | null>(null);
  const mobilePickerRef = useRef<HTMLDivElement | null>(null);
  const desktopDropdownBtnRef = useRef<HTMLButtonElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const navLinks: { id: (typeof SECTION_IDS)[number]; href: string; label: string }[] = [
    { id: 'services', href: '#services', label: t.nav.services },
    { id: 'work', href: '#work', label: t.nav.work },
    { id: 'community', href: '#community', label: t.nav.community },
    { id: 'insights', href: '#insights', label: t.nav.insights },
    { id: 'proof', href: '#proof', label: t.nav.proof },
    { id: 'contact', href: '#contact', label: t.nav.contact },
  ];

  useEffect(() => {
    let rafId = 0;

    const computeActiveSection = () => {
      rafId = 0;

      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - scrollBottom <= 24) {
        setActiveSection((prev) => (prev === 'contact' ? prev : 'contact'));
        return;
      }

      const activationOffset = Math.max(130, window.innerHeight * 0.28);
      let current: SectionId = 'hero';

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= activationOffset) {
          current = id;
        }
      }

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const scheduleCheck = () => {
      if (rafId !== 0) return;
      rafId = requestAnimationFrame(computeActiveSection);
    };

    computeActiveSection();
    window.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck, { passive: true });

    return () => {
      if (rafId !== 0) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleCheck);
      window.removeEventListener('resize', scheduleCheck);
    };
  }, []);

  useEffect(() => {
    if (!langMenuOpen) return;

    preloadAllLocales();

    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 20);

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      const inDesktop = desktopPickerRef.current?.contains(target) ?? false;
      const inMobile = mobilePickerRef.current?.contains(target) ?? false;
      if (!inDesktop && !inMobile) {
        setLangMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangMenuOpen(false);
        desktopDropdownBtnRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [langMenuOpen]);

  const normalizedQuery = langQuery.trim().toLowerCase();
  const filteredLanguages = normalizedQuery
    ? SUPPORTED_LANGUAGES.filter(
        (lang) =>
          lang.nativeName.toLowerCase().includes(normalizedQuery) ||
          lang.englishName.toLowerCase().includes(normalizedQuery) ||
          lang.code.toLowerCase().includes(normalizedQuery) ||
          lang.region.toLowerCase().includes(normalizedQuery)
      )
    : SUPPORTED_LANGUAGES;

  const handleSelectLanguage = (code: Locale) => {
    setLocale(code);
    setLangMenuOpen(false);
    setLangQuery('');
  };

  const handlePreloadLocales = () => {
    preloadAllLocales();
  };

  const renderAllLanguagesDropdown = (isMobile = false) => (
    <div
      role="dialog"
      aria-label={t.nav.allLanguagesTitle}
      className={
        isMobile
          ? `mt-2 rounded-xl border p-3 shadow-2xl ${
              isLight
                ? 'border-slate-900/15 bg-white/95'
                : 'border-slate-700/80 bg-[#0b1120]'
            }`
          : `webgl-dock-surface fixed inset-x-3 top-[4.25rem] z-50 rounded-2xl border p-3.5 sm:absolute sm:inset-x-auto sm:top-full sm:right-0 sm:mt-2.5 sm:w-80 ${
              isLight
                ? 'border-slate-900/18 shadow-[0_24px_60px_-14px_rgba(15,23,42,0.24)]'
                : 'border-sky-400/25 shadow-[0_24px_64px_-12px_rgba(2,6,23,0.96)]'
            }`
      }
    >
      <div className="flex items-center justify-between gap-2 pb-2.5">
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-sky-300" aria-hidden="true" />
          <span className="text-xs font-semibold text-slate-100">
            {t.nav.allLanguagesTitle}
          </span>
          <span className="rounded border border-slate-700/80 bg-[#060913]/90 px-1.5 py-0.5 font-mono-tabular text-[10px] text-sky-300">
            {SUPPORTED_LANGUAGES.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {(['en', 'es'] as Locale[]).map((code) => {
            const active = locale === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleSelectLanguage(code)}
                aria-pressed={active}
                className={`rounded px-1.5 py-0.5 font-mono-tabular text-[10px] font-semibold uppercase transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-400 ${
                  active
                    ? 'bg-sky-400 text-slate-950'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100'
                }`}
              >
                {code}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setLangMenuOpen(false)}
            aria-label={t.nav.closeMenu}
            className="inline-flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-800/80 hover:text-slate-100 focus-visible:outline-2 focus-visible:outline-sky-400 cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Search input */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          ref={!isMobile ? searchInputRef : undefined}
          type="search"
          value={langQuery}
          onChange={(e) => setLangQuery(e.target.value)}
          placeholder={t.nav.searchLanguagesPlaceholder}
          aria-label={t.nav.searchLanguagesPlaceholder}
          className="w-full rounded-lg border border-slate-700/80 bg-[#060913]/90 py-1.5 pr-3 pl-8 text-xs text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
        />
      </div>

      {/* Language Grid */}
      <div className="mt-2.5 grid max-h-64 grid-cols-1 gap-1.5 overflow-y-auto pr-0.5 sm:grid-cols-2">
        {filteredLanguages.length === 0 ? (
          <div className="col-span-full py-6 text-center text-xs text-slate-400">
            {t.nav.noLanguagesMatch}
          </div>
        ) : (
          filteredLanguages.map((lang) => {
            const active = locale === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelectLanguage(lang.code)}
                aria-pressed={active}
                className={`flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2 text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  active
                    ? 'border-sky-400/60 bg-sky-400/15 text-slate-50'
                    : 'border-slate-800/90 bg-[#060913]/65 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80 hover:text-white'
                }`}
              >
                <div className="min-w-0">
                  <div className="truncate text-xs font-semibold">
                    {lang.nativeName}
                  </div>
                  <div className="truncate text-[10px] text-slate-400">
                    {lang.englishName}
                    {lang.dir === 'rtl' ? ' · RTL' : ''}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span
                    className={`font-mono-tabular text-[10px] uppercase ${
                      active ? 'text-sky-300' : 'text-slate-500'
                    }`}
                  >
                    {lang.code}
                  </span>
                  {active && (
                    <Check
                      className="h-3.5 w-3.5 text-sky-300"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>

      <div className="mt-2.5 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px] text-slate-400">
        <span>
          {languageMeta.nativeName} ({languageMeta.code.toUpperCase()})
        </span>
        <span>{t.nav.savedLocallyLabel}</span>
      </div>
    </div>
  );

  const renderLanguageSwitcher = (compact = false) => (
    <div
      className={compact ? 'w-full' : 'relative'}
      ref={compact ? mobilePickerRef : desktopPickerRef}
    >
      <button
        ref={!compact ? desktopDropdownBtnRef : undefined}
        type="button"
        onClick={() => {
          if (!compact) setMobileOpen(false);
          setLangMenuOpen((prev) => !prev);
        }}
        onPointerEnter={handlePreloadLocales}
        onFocus={handlePreloadLocales}
        aria-expanded={langMenuOpen}
        aria-haspopup="dialog"
        aria-label={`${t.nav.languageSwitcherLabel}: ${languageMeta.nativeName}`}
        title={t.nav.allLanguagesTitle}
        className={`inline-flex items-center gap-1.5 rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
          compact
            ? 'w-full justify-between px-3 py-2 text-xs font-medium'
            : 'h-8 px-2 text-xs font-medium sm:h-7.5 sm:gap-2 sm:px-2.5'
        } ${
          isLight
            ? langMenuOpen
              ? 'border-sky-600/70 bg-sky-400/15 text-slate-900'
              : 'border-slate-900/15 bg-white/90 text-slate-800 hover:border-sky-600/60 hover:text-slate-950'
            : langMenuOpen
              ? 'border-sky-400/60 bg-sky-400/15 text-sky-200'
              : 'border-slate-800/90 bg-[#0b1120]/90 text-slate-200 hover:border-sky-400/45 hover:text-white'
        }`}
      >
        <span className="inline-flex items-center gap-1.5">
          <Globe className="h-3.5 w-3.5 text-sky-300 shrink-0" aria-hidden="true" />
          <span className={compact ? '' : 'hidden xl:inline'}>
            {languageMeta.nativeName}
          </span>
          <span className="font-mono-tabular text-[11px] font-semibold uppercase text-sky-300 xl:text-[10px]">
            {compact ? `(${languageMeta.code})` : languageMeta.code}
          </span>
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-150 ${
            langMenuOpen ? 'rotate-180 text-sky-300' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {!compact && langMenuOpen && renderAllLanguagesDropdown(false)}
      {compact && langMenuOpen && renderAllLanguagesDropdown(true)}
    </div>
  );

  const renderThemeSwitcher = (compact = false) => {
    if (compact) {
      return (
        <div
          className={`flex w-full items-center justify-between rounded-lg border p-1.5 ${
            isLight
              ? 'border-slate-900/15 bg-white/90'
              : 'border-slate-800/90 bg-[#0b1120]/90'
          }`}
          role="group"
          aria-label={t.nav.themeToggleLabel}
        >
          <span className="inline-flex items-center gap-1.5 px-1 text-xs font-medium text-slate-300">
            {isLight ? (
              <Sun className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
            )}
            <span>{isLight ? t.nav.themeLight : t.nav.themeObsidian}</span>
          </span>

          <div className="inline-flex items-center gap-1">
            <button
              type="button"
              onClick={() => setTheme('obsidian')}
              aria-pressed={theme === 'obsidian'}
              aria-label={t.nav.themeObsidian}
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                theme === 'obsidian'
                  ? 'bg-sky-400 text-slate-950'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              <Moon className="h-3 w-3" aria-hidden="true" />
              <span>Dark</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('light')}
              aria-pressed={theme === 'light'}
              aria-label={t.nav.themeLight}
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                theme === 'light'
                  ? 'bg-sky-400 text-slate-950'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              <Sun className="h-3 w-3" aria-hidden="true" />
              <span>Light</span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`inline-flex items-center rounded-lg border p-0.5 ${
          isLight
            ? 'border-slate-900/15 bg-white/90'
            : 'border-slate-800/90 bg-[#0b1120]/90'
        }`}
        role="group"
        aria-label={t.nav.themeToggleLabel}
      >
        <button
          type="button"
          onClick={() => setTheme('obsidian')}
          aria-pressed={theme === 'obsidian'}
          aria-label={t.nav.themeSwitchToObsidian}
          title={t.nav.themeObsidian}
          className={`inline-flex h-6 w-7 items-center justify-center rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
            theme === 'obsidian'
              ? 'bg-sky-400 text-slate-950'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          <Moon className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setTheme('light')}
          aria-pressed={theme === 'light'}
          aria-label={t.nav.themeSwitchToLight}
          title={t.nav.themeLight}
          className={`inline-flex h-6 w-7 items-center justify-center rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
            theme === 'light'
              ? 'bg-sky-400 text-slate-950'
              : 'text-slate-400 hover:text-slate-100'
          }`}
        >
          <Sun className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 border-b ${
        isLight
          ? 'border-slate-900/12 bg-[#f8fafc]/92'
          : 'border-slate-800/70 bg-[#060913]/92'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-2 px-3.5 sm:gap-4 sm:px-8 lg:px-10">
        {/* Zone 1: Single-line Brand Wordmark + Emblem */}
        <a
          href="#hero"
          onClick={() => setActiveSection('hero')}
          className="inline-flex items-center gap-2 text-base font-display font-semibold tracking-tight text-slate-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-400 rounded-md sm:gap-2.5 sm:text-lg"
        >
          <img
            src="/assets/aistudio/favicon-32x32_666d18ed.png"
            alt="JoyaceXstudio emblem"
            referrerPolicy="no-referrer"
            className="h-7 w-7 rounded-md object-cover border border-sky-400/30 shrink-0"
          />
          <span>JoyaceXstudio</span>
        </a>

        {/* Zone 2: Concise single-line text links with active scroll-spy highlight */}
        <nav
          className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium"
          aria-label="Primary Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => setActiveSection(link.id)}
                className={`relative py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-400 ${
                  isLight ? 'after:bg-sky-700' : 'after:bg-sky-400'
                } ${
                  isActive
                    ? 'text-sky-300 after:w-full'
                    : 'text-slate-300 hover:text-white after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle + Language Switcher + Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-1.5 shrink-0 sm:gap-2">
          {/* Compact 1-tap theme button on < sm so mobile stays uncluttered */}
          <button
            type="button"
            onClick={() => setTheme(isLight ? 'obsidian' : 'light')}
            aria-label={
              isLight ? t.nav.themeSwitchToObsidian : t.nav.themeSwitchToLight
            }
            title={isLight ? t.nav.themeLight : t.nav.themeObsidian}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-colors cursor-pointer sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              isLight
                ? 'border-slate-900/15 bg-white/90 text-slate-800'
                : 'border-slate-800/90 bg-[#0b1120]/90 text-sky-300'
            }`}
          >
            {isLight ? (
              <Sun className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Moon className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>

          <div className="hidden sm:flex items-center">
            {renderThemeSwitcher(false)}
          </div>

          {/* Language Switcher visible across all viewport widths */}
          {renderLanguageSwitcher(false)}

          <button
            type="button"
            onClick={onStartProject}
            className="hidden sm:inline-flex items-center rounded-lg bg-sky-400 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.nav.startProject}
          </button>

          <button
            type="button"
            onClick={() => {
              setLangMenuOpen(false);
              setMobileOpen((prev) => !prev);
            }}
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-200 hover:border-slate-700 lg:hidden cursor-pointer sm:h-10 sm:w-10"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileOpen && (
        <div
          className={`border-t px-5 py-4 sm:px-8 lg:hidden ${
            isLight
              ? 'border-slate-900/12 bg-[#f8fafc]'
              : 'border-slate-800/80 bg-[#060913]'
          }`}
        >
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => {
                    setActiveSection(link.id);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sky-400/10 text-sky-300'
                      : 'text-slate-200 hover:text-sky-300'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="font-mono-tabular text-[11px] text-sky-400">
                      {t.nav.active}
                    </span>
                  )}
                </a>
              );
            })}

            <div className="mt-2 space-y-2 sm:hidden">
              {renderThemeSwitcher(true)}
              {renderLanguageSwitcher(true)}
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onStartProject();
              }}
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-950 cursor-pointer"
            >
              {t.nav.startProject}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
