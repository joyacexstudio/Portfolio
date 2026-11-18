export type PrimaryLocale = 'en' | 'es';

export type ExtendedLocale =
  | 'fr'
  | 'de'
  | 'pt'
  | 'it'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'hi'
  | 'ar'
  | 'tr'
  | 'id'
  | 'vi'
  | 'ru'
  | 'sw';

export type Locale = PrimaryLocale | ExtendedLocale;

export interface LanguageMeta {
  code: Locale;
  nativeName: string;
  englishName: string;
  region: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    region: 'Global',
    dir: 'ltr',
  },
  {
    code: 'es',
    nativeName: 'Español',
    englishName: 'Spanish',
    region: 'Americas & Europe',
    dir: 'ltr',
  },
  {
    code: 'fr',
    nativeName: 'Français',
    englishName: 'French',
    region: 'Europe & Africa',
    dir: 'ltr',
  },
  {
    code: 'de',
    nativeName: 'Deutsch',
    englishName: 'German',
    region: 'DACH Europe',
    dir: 'ltr',
  },
  {
    code: 'pt',
    nativeName: 'Português',
    englishName: 'Portuguese',
    region: 'Brazil & Europe',
    dir: 'ltr',
  },
  {
    code: 'it',
    nativeName: 'Italiano',
    englishName: 'Italian',
    region: 'Southern Europe',
    dir: 'ltr',
  },
  {
    code: 'zh',
    nativeName: '简体中文',
    englishName: 'Chinese',
    region: 'East Asia',
    dir: 'ltr',
  },
  {
    code: 'ja',
    nativeName: '日本語',
    englishName: 'Japanese',
    region: 'East Asia',
    dir: 'ltr',
  },
  {
    code: 'ko',
    nativeName: '한국어',
    englishName: 'Korean',
    region: 'East Asia',
    dir: 'ltr',
  },
  {
    code: 'hi',
    nativeName: 'हिन्दी',
    englishName: 'Hindi',
    region: 'South Asia',
    dir: 'ltr',
  },
  {
    code: 'ar',
    nativeName: 'العربية',
    englishName: 'Arabic',
    region: 'MENA · RTL',
    dir: 'rtl',
  },
  {
    code: 'tr',
    nativeName: 'Türkçe',
    englishName: 'Turkish',
    region: 'Eurasia',
    dir: 'ltr',
  },
  {
    code: 'id',
    nativeName: 'Bahasa Indonesia',
    englishName: 'Indonesian',
    region: 'Southeast Asia',
    dir: 'ltr',
  },
  {
    code: 'vi',
    nativeName: 'Tiếng Việt',
    englishName: 'Vietnamese',
    region: 'Southeast Asia',
    dir: 'ltr',
  },
  {
    code: 'ru',
    nativeName: 'Русский',
    englishName: 'Russian',
    region: 'Eastern Europe',
    dir: 'ltr',
  },
  {
    code: 'sw',
    nativeName: 'Kiswahili',
    englishName: 'Swahili',
    region: 'East Africa',
    dir: 'ltr',
  },
];

export interface UiDictionary {
  nav: {
    services: string;
    work: string;
    community: string;
    insights: string;
    proof: string;
    faq: string;
    contact: string;
    startProject: string;
    openMenu: string;
    closeMenu: string;
    active: string;
    languageSwitcherLabel: string;
    allLanguagesButton: string;
    allLanguagesTitle: string;
    searchLanguagesPlaceholder: string;
    noLanguagesMatch: string;
    savedLocallyLabel: string;
    backToTop: string;
    themeToggleLabel: string;
    themeObsidian: string;
    themeLight: string;
    themeSwitchToLight: string;
    themeSwitchToObsidian: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    orbitHint: string;
    presets: {
      overview: string;
      core: string;
      orbit: string;
    };
  };
  partners: {
    eyebrow: string;
    heading: string;
    pause: string;
    resume: string;
  };
  services: {
    eyebrow: string;
    heading: string;
    helper: string;
    pillarLabel: string;
    audioOn: string;
    audioOff: string;
    requestService: string;
    addedToBrief: string;
  };
  portfolio: {
    eyebrowPrefix: string;
    eyebrowSuffix: string;
    heading: string;
    allWork: string;
    emptyState: string;
    challengePrefix: string;
    architectureLabel: string;
    showBrief: string;
    hideBrief: string;
    inspect: string;
    showingOf: (shown: number, total: number) => string;
    loadMore: (count: number) => string;
    viewAll: (total: number) => string;
    showFewer: string;
    modal: {
      closeLabel: string;
      challengeHeading: string;
      architectureHeading: string;
      stackLabel: string;
      requestSimilar: string;
    };
  };
  community: {
    eyebrow: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    ecosystemTitle: string;
    ecosystemBody: string;
    masteryTitle: string;
    masteryBody: string;
    guildsEyebrow: string;
    expandAll: string;
    collapseAll: string;
    curriculumLabel: string;
    clientAdvantage: string;
  };
  insights: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    allUpdates: string;
    studioAnnouncements: string;
    industryTrends: string;
    engineeringNotes: string;
    readBrief: string;
    hideBrief: string;
    keyTakeaways: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  proof: {
    eyebrow: string;
    heading: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    allQuestions: string;
    processCategory: string;
    pricingCategory: string;
    timelinesCategory: string;
    expandAll: string;
    collapseAll: string;
    keyHighlights: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    directInbox: string;
    copyEmail: string;
    copied: string;
    syncNote: string;
    toastCopiedTitle: string;
    toastBriefDesc: string;
    toastCopyFailTitle: string;
    toastEmailFailDesc: (email: string) => string;
    toastBriefFailDesc: string;
    briefReadyLabel: string;
    thankYou: (name: string) => string;
    briefReadySubtitle: string;
    sendViaEmail: string;
    copyBriefText: string;
    briefCopied: string;
    editBrief: string;
    servicesNeeded: string;
    yourName: string;
    workEmail: string;
    organizationOptional: string;
    estimatedScope: string;
    projectGoals: string;
    goalsPlaceholder: string;
    preparedFor: (email: string) => string;
    prepareBrief: string;
    errName: string;
    errEmail: string;
    errVision: string;
    footerTagline: string;
    budgetOptions: string[];
  };
  newsletter: {
    eyebrow: string;
    heading: string;
    description: string;
    emailLabel: string;
    placeholder: string;
    subscribe: string;
    errInvalidEmail: string;
    subscribedBadge: string;
    subscribedMessage: (email: string) => string;
    changeEmail: string;
    privacyNote: string;
    toastTitle: string;
    toastDesc: (email: string) => string;
  };
}
