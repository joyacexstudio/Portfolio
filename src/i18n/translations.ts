import type {
  FaqCategory,
  InsightCategory,
  ServiceId,
  StudioService,
} from '../data/studioData';
import type { LocalizedFaqCopy, LocalizedServiceCopy } from './esLocale';
import {
  SUPPORTED_LANGUAGES,
  type ExtendedLocale,
  type LanguageMeta,
  type Locale,
  type UiDictionary,
} from './types';

export {
  SUPPORTED_LANGUAGES,
  type LanguageMeta,
  type Locale,
  type UiDictionary,
  type LocalizedServiceCopy,
  type LocalizedFaqCopy,
};

const EN_TRANSLATIONS: UiDictionary = {
  nav: {
    services: 'Services',
    work: 'Work',
    community: 'Community',
    insights: 'Insights',
    proof: 'Proof',
    faq: 'FAQ',
    contact: 'Contact',
    startProject: 'Start a Project',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    active: 'Active',
    languageSwitcherLabel: 'Select language',
    allLanguagesButton: 'All',
    allLanguagesTitle: 'All Supported Languages',
    searchLanguagesPlaceholder: 'Search language or code...',
    noLanguagesMatch: 'No matching languages found.',
    savedLocallyLabel: 'Saved to browser preferences',
    backToTop: 'Back to top',
    themeToggleLabel: 'Color theme',
    themeObsidian: 'Midnight Obsidian',
    themeLight: 'High Contrast Light',
    themeSwitchToLight: 'Switch to High Contrast Light theme',
    themeSwitchToObsidian: 'Switch to Midnight Obsidian theme',
  },
  hero: {
    eyebrow: 'Educational Community · Dynamic Digital Hub',
    headline: 'Welcome to JoyaceXstudio. Built for craft, scale, and clarity.',
    subtitle:
      'We go beyond standard service provision—delivering web, full-stack, SaaS & PaaS platforms, AI customer care & custom AI business agents, and SEO storytelling while empowering a network of tech creators.',
    ctaPrimary: 'Start a Project',
    ctaSecondary: 'Explore Core Services',
    orbitHint: 'Drag orbit or select a 3D node',
    presets: {
      overview: 'Overview',
      core: 'Core Prism',
      orbit: 'Orbit Plane',
    },
  },
  partners: {
    eyebrow: 'Trusted Collaborators',
    heading:
      'Partnering with high-velocity startups, product teams, and digital hubs.',
    pause: 'Pause Marquee',
    resume: 'Resume Marquee',
  },
  services: {
    eyebrow: 'Core Capabilities',
    heading:
      'Eight specialized disciplines engineered for modern business scale.',
    helper:
      'Hover or focus any glass card for spatial depth, press Enter to sync with the 3D prism stage above, or queue SaaS, PaaS, and AI agent capabilities directly into your project brief.',
    pillarLabel: 'Service Pillar',
    audioOn: 'Hover Audio: On',
    audioOff: 'Hover Audio: Off',
    requestService: 'Request Service',
    addedToBrief: 'Added to Brief',
  },
  portfolio: {
    eyebrowPrefix: 'Selected Works',
    eyebrowSuffix: 'Case Studies',
    heading: 'Case studies built for measurable velocity and conversion.',
    allWork: 'All Work',
    emptyState: 'No case studies match this filter yet.',
    challengePrefix: 'Challenge',
    architectureLabel: 'Studio Architecture',
    showBrief: 'Brief & Architecture',
    hideBrief: 'Hide Brief',
    inspect: 'Inspect',
    showingOf: (shown, total) =>
      `Showing ${shown} of ${total} selected works`,
    loadMore: (count) => `Load ${count} More Works`,
    viewAll: (total) => `View All ${total}`,
    showFewer: 'Show Fewer',
    modal: {
      closeLabel: 'Close case study',
      challengeHeading: 'The Challenge',
      architectureHeading: 'JoyaceXstudio Architecture',
      stackLabel: 'Stack',
      requestSimilar: 'Request Similar Build',
    },
  },
  community: {
    eyebrow: 'Why Partner With Us',
    heading: 'An educational foundation that compounds into sharper software.',
    paragraph1:
      'Because of our educational foundation, our approach is rooted in continuous learning, modern best practices, and collaborative problem-solving.',
    paragraph2:
      'Whether you are an early-stage startup or an established enterprise, our ecosystem of principal experts and rising tech creators brings tested engineering rigor and fresh perspective to every release.',
    ecosystemTitle: 'Creator Ecosystem',
    ecosystemBody:
      'Engineers, AI builders, and technical storytellers collaborating across live studio guilds.',
    masteryTitle: 'Continuous Mastery',
    masteryBody:
      'Weekly architecture clinics keep our stack aligned with modern standards—never outdated playbooks.',
    guildsEyebrow: 'Creator Hub Guilds & Curriculum',
    expandAll: 'Expand All Guilds',
    collapseAll: 'Collapse All Guilds',
    curriculumLabel: 'Curriculum Modules (Click to inspect syllabus)',
    clientAdvantage: 'Client Advantage',
  },
  insights: {
    eyebrow: 'Insights & Updates',
    heading:
      'Industry trends, architectural notes, and studio announcements.',
    subtitle:
      'Curated dispatches from our engineering, AI, and design guilds to keep founders and our educational community informed.',
    allUpdates: 'All Updates',
    studioAnnouncements: 'Studio Announcements',
    industryTrends: 'Industry Trends',
    engineeringNotes: 'Engineering Notes',
    readBrief: 'Read Brief',
    hideBrief: 'Hide Brief',
    keyTakeaways: 'Key Takeaways',
    ctaTitle: 'Want architecture dispatches or guild workshop invites?',
    ctaSubtitle:
      'Share your focus area in a quick brief and our community team will loop you into upcoming open clinics.',
    ctaButton: 'Join Community Briefs',
  },
  proof: {
    eyebrow: 'Partnership Outcomes',
    heading: 'Trusted by founders and product teams building what comes next.',
  },
  faq: {
    eyebrow: 'Self-Service Answers',
    heading: 'Frequently asked questions on process, pricing & timelines.',
    subtitle:
      'Clear expectations before sprint one. Expand any topic below or filter by workflow, budget scope, or delivery schedule.',
    allQuestions: 'All Questions',
    processCategory: 'Service Process',
    pricingCategory: 'Pricing & Scopes',
    timelinesCategory: 'Project Timelines',
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    keyHighlights: 'Key Details',
    ctaTitle: 'Still have a custom scope, timeline, or integration question?',
    ctaSubtitle:
      'Send a quick brief with your target launch window and we will reply with a tailored roadmap within one business day.',
    ctaButton: 'Ask via Project Brief',
  },
  contact: {
    eyebrow: 'Contact JoyaceXstudio',
    heading: 'Let’s build something extraordinary together.',
    subtitle:
      'Share your goals, timeline, and desired capabilities. Whether you need a custom WordPress presence, a full-stack SaaS build, or an AI-powered workflow, we respond within one business day.',
    directInbox: 'Direct Studio Inbox',
    copyEmail: 'Copy Email',
    copied: 'Copied',
    syncNote:
      'Capabilities selected in the 3D Prism Stage or Core Services sync directly with your brief.',
    toastCopiedTitle: 'Copied to clipboard',
    toastBriefDesc: 'Project brief summary ready to paste',
    toastCopyFailTitle: 'Clipboard copy unavailable',
    toastEmailFailDesc: (email) => `Please copy ${email} manually.`,
    toastBriefFailDesc: 'Please select and copy the brief summary manually.',
    briefReadyLabel: 'Project Brief Ready',
    thankYou: (name) => `Thank you, ${name}.`,
    briefReadySubtitle: 'Your brief has been formatted for',
    sendViaEmail: 'Send via Email Client',
    copyBriefText: 'Copy Brief Text',
    briefCopied: 'Brief Copied',
    editBrief: 'Edit Brief',
    servicesNeeded: 'Core Services Needed',
    yourName: 'Your Name',
    workEmail: 'Work Email',
    organizationOptional: 'Startup / Organization (Optional)',
    estimatedScope: 'Estimated Scope',
    projectGoals: 'Project Goals & Timeline',
    goalsPlaceholder:
      'Tell us about what you are building, target launch window, and what success looks like...',
    preparedFor: (email) => `Prepared directly for ${email}`,
    prepareBrief: 'Prepare Project Brief',
    errName: 'Please enter your name so we know who to address.',
    errEmail: 'Please provide a valid work email address.',
    errVision:
      'Please share a short summary of your project goals (at least 12 characters).',
    footerTagline: '· Digital Hub & Creator Community',
    budgetOptions: [
      '$1k – $3k (Landing / Sprint)',
      '$3k – $8k (Custom Web / WP)',
      '$8k – $20k (Full Stack / SaaS / AI)',
      'Ongoing Studio Retainer',
    ],
  },
  newsletter: {
    eyebrow: 'Educational Insights · Community Dispatch',
    heading: 'Stay ahead with our creator & engineering dispatches.',
    description:
      'Curated architecture notes, AI workflow guides, web performance benchmarks, and open clinic invites—zero noise.',
    emailLabel: 'Email address for Educational Insights newsletter',
    placeholder: 'you@studio.com',
    subscribe: 'Subscribe',
    errInvalidEmail: 'Please enter a valid email address.',
    subscribedBadge: 'Subscribed to Educational Insights',
    subscribedMessage: (email) =>
      `Confirmed for ${email}. You will receive our next community briefing.`,
    changeEmail: 'Update email',
    privacyNote: 'Bi-weekly educational dispatches · Unsubscribe anytime.',
    toastTitle: 'Subscribed to Educational Insights',
    toastDesc: (email) => `${email} added to the community dispatch`,
  },
};

type EsModuleType = typeof import('./esLocale');

let cachedEsModule: EsModuleType | null = null;
let pendingEsLoad: Promise<void> | null = null;

let cachedExtendedTranslations: Record<
  ExtendedLocale,
  UiDictionary
> | null = null;
let cachedExtendedServices: Partial<
  Record<ExtendedLocale, Record<ServiceId, { shortLabel: string; title: string }>>
> | null = null;
let pendingExtendedLoad: Promise<void> | null = null;

export function hasLocaleLoaded(locale: Locale): boolean {
  if (locale === 'en') return true;
  if (locale === 'es') return cachedEsModule !== null;
  return cachedExtendedTranslations !== null;
}

export function loadEsLocale(): Promise<void> {
  if (cachedEsModule) {
    return Promise.resolve();
  }
  if (!pendingEsLoad) {
    pendingEsLoad = import('./esLocale').then((mod) => {
      cachedEsModule = mod;
    });
  }
  return pendingEsLoad;
}

export function loadExtendedLocales(): Promise<void> {
  if (cachedExtendedTranslations) {
    return Promise.resolve();
  }
  if (!pendingExtendedLoad) {
    pendingExtendedLoad = import('./worldLocales').then((mod) => {
      cachedExtendedTranslations = mod.buildExtendedTranslations(EN_TRANSLATIONS);
      cachedExtendedServices = mod.EXTENDED_SERVICE_LABELS;
    });
  }
  return pendingExtendedLoad;
}

export function preloadAllLocales(): void {
  void loadEsLocale();
  void loadExtendedLocales();
}

export function getUiDictionary(locale: Locale): UiDictionary {
  if (locale === 'es' && cachedEsModule) {
    return cachedEsModule.ES_TRANSLATIONS;
  }
  if (locale !== 'en' && locale !== 'es' && cachedExtendedTranslations) {
    return cachedExtendedTranslations[locale] ?? EN_TRANSLATIONS;
  }
  return EN_TRANSLATIONS;
}

export function getServiceCopy(
  service: StudioService,
  locale: Locale
): LocalizedServiceCopy {
  if (locale === 'es' && cachedEsModule) {
    return cachedEsModule.SERVICE_TRANSLATIONS_ES[service.id];
  }
  if (locale !== 'en' && locale !== 'es' && cachedExtendedServices) {
    const ext = cachedExtendedServices[locale as ExtendedLocale]?.[service.id];
    if (ext) {
      return {
        shortLabel: ext.shortLabel,
        title: ext.title,
        tagline: service.tagline,
        description: service.description,
        deliverables: service.deliverables,
      };
    }
  }
  return {
    shortLabel: service.shortLabel,
    title: service.title,
    tagline: service.tagline,
    description: service.description,
    deliverables: service.deliverables,
  };
}

export function getEsCommunityTrackCopy(trackId: string) {
  return cachedEsModule?.COMMUNITY_TRACK_TRANSLATIONS_ES[trackId] ?? null;
}

export function getEsMetricCopy(index: number) {
  return cachedEsModule?.METRIC_TRANSLATIONS_ES[index] ?? null;
}

export function getEsInsightCategoryLabel(category: InsightCategory) {
  return cachedEsModule?.INSIGHT_CATEGORY_LABELS_ES[category] ?? null;
}

export function getEsInsightCopy(postId: string) {
  return cachedEsModule?.INSIGHT_TRANSLATIONS_ES[postId] ?? null;
}

export function getEsFaqCategoryLabel(category: FaqCategory) {
  return cachedEsModule?.FAQ_CATEGORY_LABELS_ES[category] ?? null;
}

export function getEsFaqCopy(faqId: string) {
  return cachedEsModule?.FAQ_TRANSLATIONS_ES[faqId] ?? null;
}
