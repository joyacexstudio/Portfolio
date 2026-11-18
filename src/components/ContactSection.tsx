import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  Mail,
  Send,
  Sparkles,
} from 'lucide-react';
import {
  STUDIO_EMAIL,
  STUDIO_SERVICES,
  type ServiceId,
} from '../data/studioData';
import { RevealOnScroll } from './RevealOnScroll';
import { ToastNotification, type ToastItem } from './ToastNotification';
import { useLocale } from '../i18n/LocaleContext';
import { getServiceCopy } from '../i18n/translations';
import { useTheme } from '../theme/ThemeContext';

const NEWSLETTER_STORAGE_KEY = 'joyacexstudio_newsletter_email';

interface ContactSectionProps {
  selectedServices: ServiceId[];
  onToggleService: (id: ServiceId) => void;
}

export function ContactSection({
  selectedServices,
  onToggleService,
}: ContactSectionProps) {
  const { locale, t } = useLocale();
  const { isLight } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budgetIndex, setBudgetIndex] = useState(1);
  const [vision, setVision] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(() => {
    try {
      const saved = window.localStorage.getItem(NEWSLETTER_STORAGE_KEY);
      return saved && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(saved) ? saved : null;
    } catch {
      return null;
    }
  });
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastTimersRef = useRef<Map<number, number>>(new Map());
  const nextToastIdRef = useRef(1);
  const copiedEmailTimerRef = useRef<number | null>(null);
  const copiedBriefTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const timers = toastTimersRef.current;
    return () => {
      timers.forEach((timerId) => window.clearTimeout(timerId));
      timers.clear();
      if (copiedEmailTimerRef.current !== null) {
        window.clearTimeout(copiedEmailTimerRef.current);
      }
      if (copiedBriefTimerRef.current !== null) {
        window.clearTimeout(copiedBriefTimerRef.current);
      }
    };
  }, []);

  const dismissToast = (id: number) => {
    const timerId = toastTimersRef.current.get(id);
    if (timerId !== undefined) {
      window.clearTimeout(timerId);
      toastTimersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  const pushToast = (
    title: string,
    description?: string,
    tone: 'success' | 'error' = 'success',
    durationMs = 3200
  ) => {
    const id = nextToastIdRef.current++;
    setToasts((prev) => [
      ...prev.slice(-2),
      { id, title, description, tone, durationMs },
    ]);
    const timerId = window.setTimeout(() => {
      dismissToast(id);
    }, durationMs);
    toastTimersRef.current.set(id, timerId);
  };

  const copyTextToClipboard = async (text: string): Promise<boolean> => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // Fall through to legacy execCommand fallback
      }
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const succeeded = document.execCommand('copy');
      document.body.removeChild(textarea);
      return succeeded;
    } catch {
      return false;
    }
  };

  const budgetOptions = t.contact.budgetOptions;
  const budget = budgetOptions[budgetIndex] ?? budgetOptions[1];

  const selectedServiceNames = STUDIO_SERVICES.filter((s) =>
    selectedServices.includes(s.id)
  ).map((s) => getServiceCopy(s, locale).title);

  const buildBriefBody = () => {
    const servicesLine =
      selectedServiceNames.length > 0
        ? selectedServiceNames.join(', ')
        : 'General Inquiry';
    return [
      `Name: ${name}`,
      `Email: ${email}`,
      company.trim() ? `Organization: ${company.trim()}` : null,
      `Services Requested: ${servicesLine}`,
      `Budget Range: ${budget}`,
      '',
      'Project Vision:',
      vision.trim(),
    ]
      .filter((line): line is string => line !== null)
      .join('\n');
  };

  const handleCopyEmail = async () => {
    const ok = await copyTextToClipboard(STUDIO_EMAIL);
    if (ok) {
      setCopiedEmail(true);
      if (copiedEmailTimerRef.current !== null) {
        window.clearTimeout(copiedEmailTimerRef.current);
      }
      copiedEmailTimerRef.current = window.setTimeout(
        () => setCopiedEmail(false),
        2400
      );
      pushToast(t.contact.toastCopiedTitle, STUDIO_EMAIL, 'success');
    } else {
      setCopiedEmail(false);
      pushToast(
        t.contact.toastCopyFailTitle,
        t.contact.toastEmailFailDesc(STUDIO_EMAIL),
        'error'
      );
    }
  };

  const handleCopyBrief = async () => {
    const ok = await copyTextToClipboard(buildBriefBody());
    if (ok) {
      setCopiedBrief(true);
      if (copiedBriefTimerRef.current !== null) {
        window.clearTimeout(copiedBriefTimerRef.current);
      }
      copiedBriefTimerRef.current = window.setTimeout(
        () => setCopiedBrief(false),
        2400
      );
      pushToast(
        t.contact.toastCopiedTitle,
        t.contact.toastBriefDesc,
        'success'
      );
    } else {
      setCopiedBrief(false);
      pushToast(
        t.contact.toastCopyFailTitle,
        t.contact.toastBriefFailDesc,
        'error'
      );
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedVision = vision.trim();

    if (!trimmedName) {
      setError(t.contact.errName);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError(t.contact.errEmail);
      return;
    }
    if (trimmedVision.length < 12) {
      setError(t.contact.errVision);
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = newsletterEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) {
      setNewsletterError(t.newsletter.errInvalidEmail);
      return;
    }

    setNewsletterError(null);
    setSubscribedEmail(cleaned);
    setNewsletterEmail('');
    try {
      window.localStorage.setItem(NEWSLETTER_STORAGE_KEY, cleaned);
    } catch {
      // Ignore storage write failures in restricted privacy modes
    }
    pushToast(
      t.newsletter.toastTitle,
      t.newsletter.toastDesc(cleaned),
      'success'
    );
  };

  const handleNewsletterReset = () => {
    const previous = subscribedEmail ?? '';
    setSubscribedEmail(null);
    setNewsletterEmail(previous);
    setNewsletterError(null);
    try {
      window.localStorage.removeItem(NEWSLETTER_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const mailtoHref = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
    `Project Inquiry from ${name.trim() || 'Partner'}`
  )}&body=${encodeURIComponent(buildBriefBody())}`;

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-[1280px] px-4 pt-12 pb-10 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20 lg:pb-12"
      aria-labelledby="contact-heading"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Direct Contact & Studio Details */}
        <RevealOnScroll className="flex flex-col justify-between lg:col-span-5">
          <div>
            <p className="font-mono-tabular text-xs tracking-wider text-sky-300 uppercase">
              {t.contact.eyebrow}
            </p>
            <h2
              id="contact-heading"
              className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-50 text-balance sm:text-3xl lg:text-4xl"
            >
              {t.contact.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {t.contact.subtitle}
            </p>

            {/* Copyable Email Card */}
            <div className="mt-8 glass-surface rounded-2xl p-5">
              <div className="text-xs font-medium text-slate-400">
                {t.contact.directInbox}
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${STUDIO_EMAIL}`}
                  className="inline-flex min-w-0 items-center gap-2 font-mono-tabular text-xs font-medium text-sky-300 hover:text-sky-200 transition-colors break-all sm:text-sm sm:break-normal"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>{STUDIO_EMAIL}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-sky-400/60 hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-sky-400" />
                      <span>{t.contact.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>{t.contact.copyEmail}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-800/80 pt-6 text-xs leading-relaxed text-slate-400">
            {t.contact.syncNote}
          </div>
        </RevealOnScroll>

        {/* Right Interactive Project Brief Form */}
        <RevealOnScroll className="lg:col-span-7" delayMs={90}>
          <div className="glass-surface rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-300">
                    <Check className="h-4 w-4" />
                    <span>{t.contact.briefReadyLabel}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-slate-50">
                    {t.contact.thankYou(name.trim())}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    {t.contact.briefReadySubtitle}{' '}
                    <span className="font-mono-tabular text-sky-300">
                      {STUDIO_EMAIL}
                    </span>
                    .
                  </p>
                </div>

                <pre className="whitespace-pre-wrap rounded-xl border border-slate-800 bg-[#060913]/85 p-4 font-mono-tabular text-xs leading-relaxed text-slate-300">
                  {buildBriefBody()}
                </pre>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-400 px-4 py-2.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-sky-300 whitespace-nowrap shrink-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{t.contact.sendViaEmail}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/90 px-4 py-2.5 text-xs font-medium text-slate-200 transition-colors hover:border-sky-400/50 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedBrief ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-sky-400" />
                        <span>{t.contact.briefCopied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>{t.contact.copyBriefText}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {t.contact.editBrief}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <span className="block text-xs font-medium text-slate-300">
                    {t.contact.servicesNeeded}
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {STUDIO_SERVICES.map((svc) => {
                      const active = selectedServices.includes(svc.id);
                      const label = getServiceCopy(svc, locale).shortLabel;
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => onToggleService(svc.id)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            active
                              ? 'bg-sky-400/20 text-sky-200 border border-sky-400/50'
                              : 'bg-slate-900/70 text-slate-300 border border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="brief-name"
                      className="block text-xs font-medium text-slate-300"
                    >
                      {t.contact.yourName}
                    </label>
                    <input
                      id="brief-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#060913]/85 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="brief-email"
                      className="block text-xs font-medium text-slate-300"
                    >
                      {t.contact.workEmail}
                    </label>
                    <input
                      id="brief-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#060913]/85 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="brief-company"
                      className="block text-xs font-medium text-slate-300"
                    >
                      {t.contact.organizationOptional}
                    </label>
                    <input
                      id="brief-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Northstar Labs"
                      className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#060913]/85 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="brief-budget"
                      className="block text-xs font-medium text-slate-300"
                    >
                      {t.contact.estimatedScope}
                    </label>
                    <select
                      id="brief-budget"
                      value={budgetIndex}
                      onChange={(e) => setBudgetIndex(Number(e.target.value))}
                      className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#060913]/85 px-3.5 py-2.5 text-sm text-slate-100 focus:border-sky-400 focus:outline-none"
                    >
                      {budgetOptions.map((opt, idx) => (
                        <option key={opt} value={idx}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="brief-vision"
                    className="block text-xs font-medium text-slate-300"
                  >
                    {t.contact.projectGoals}
                  </label>
                  <textarea
                    id="brief-vision"
                    rows={4}
                    value={vision}
                    onChange={(e) => setVision(e.target.value)}
                    placeholder={t.contact.goalsPlaceholder}
                    className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#060913]/85 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3.5 py-2 text-xs text-rose-200"
                  >
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <span className="text-xs text-slate-400">
                    {t.contact.preparedFor(STUDIO_EMAIL)}
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>{t.contact.prepareBrief}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </RevealOnScroll>
      </div>

      {/* Educational Insights Newsletter + Quiet Footer */}
      <footer className="mt-16 sm:mt-20">
        <RevealOnScroll delayMs={60}>
          <div className="glass-surface relative overflow-hidden rounded-2xl p-6 sm:p-8">
            <div
              className={`pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full blur-3xl ${
                isLight ? 'bg-sky-400/20' : 'bg-sky-500/10'
              }`}
              aria-hidden="true"
            />
            <div
              className={`pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full blur-3xl ${
                isLight ? 'bg-violet-400/18' : 'bg-violet-500/10'
              }`}
              aria-hidden="true"
            />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 font-mono-tabular text-xs tracking-wider text-sky-300 uppercase">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.newsletter.eyebrow}</span>
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                  {t.newsletter.heading}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  {t.newsletter.description}
                </p>
              </div>

              <div className="w-full max-w-md lg:shrink-0">
                {subscribedEmail ? (
                  <div
                    role="status"
                    className={`flex flex-col gap-3 rounded-xl border p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between ${
                      isLight
                        ? 'border-emerald-700/35 bg-white/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95),0_10px_28px_-14px_rgba(4,120,87,0.22)]'
                        : 'border-emerald-400/30 bg-[#0b1120]/65 shadow-[inset_0_1px_0_0_rgba(167,243,208,0.16)]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-emerald-200">
                          {t.newsletter.subscribedBadge}
                        </div>
                        <p className="mt-0.5 text-xs text-slate-300 break-words">
                          {t.newsletter.subscribedMessage(subscribedEmail)}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleNewsletterReset}
                      className="self-start rounded-lg border border-slate-700/80 bg-slate-900/75 px-3 py-1.5 text-[11px] font-medium text-slate-200 transition-colors hover:border-sky-400/50 hover:text-white whitespace-nowrap shrink-0 cursor-pointer sm:self-center"
                    >
                      {t.newsletter.changeEmail}
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleNewsletterSubmit}
                    noValidate
                    aria-label={t.newsletter.eyebrow}
                  >
                    <label htmlFor="newsletter-email" className="sr-only">
                      {t.newsletter.emailLabel}
                    </label>

                    {/* Glassmorphism Input Field + Subscribe CTA */}
                    <div
                      className={`flex flex-col gap-2.5 sm:flex-row sm:items-center sm:rounded-xl sm:border sm:p-1.5 sm:backdrop-blur-md sm:transition-all ${
                        isLight
                          ? 'sm:border-slate-900/20 sm:bg-white/75 sm:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.98),0_10px_28px_-14px_rgba(15,23,42,0.18)] sm:focus-within:border-sky-600 sm:focus-within:shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_3px_rgba(2,132,199,0.16)]'
                          : 'sm:border-sky-300/20 sm:bg-[#0b1120]/55 sm:shadow-[inset_0_1px_0_0_rgba(224,242,254,0.14)] sm:focus-within:border-sky-400/75 sm:focus-within:shadow-[inset_0_1px_0_0_rgba(186,230,253,0.22),0_0_26px_-6px_rgba(56,189,248,0.34)]'
                      }`}
                    >
                      <div
                        className={`flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border px-3.5 py-2.5 backdrop-blur-md sm:rounded-none sm:border-0 sm:bg-transparent sm:px-2.5 sm:py-1.5 sm:backdrop-blur-none sm:shadow-none ${
                          isLight
                            ? 'border-slate-900/20 bg-white/75 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.98)] focus-within:border-sky-600'
                            : 'border-sky-300/20 bg-[#0b1120]/55 shadow-[inset_0_1px_0_0_rgba(224,242,254,0.14)] focus-within:border-sky-400/75'
                        }`}
                      >
                        <Mail
                          className="h-4 w-4 shrink-0 text-sky-300/85"
                          aria-hidden="true"
                        />
                        <input
                          id="newsletter-email"
                          type="email"
                          value={newsletterEmail}
                          onChange={(e) => {
                            setNewsletterEmail(e.target.value);
                            if (newsletterError) setNewsletterError(null);
                          }}
                          placeholder={t.newsletter.placeholder}
                          aria-invalid={Boolean(newsletterError)}
                          aria-describedby={
                            newsletterError
                              ? 'newsletter-error-msg'
                              : 'newsletter-privacy-note'
                          }
                          className={`w-full min-w-0 bg-transparent text-sm focus:outline-none ${
                            isLight
                              ? 'text-slate-900 placeholder:text-slate-500'
                              : 'text-slate-100 placeholder:text-slate-400'
                          }`}
                        />
                      </div>

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-sky-400 px-4 py-2.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 whitespace-nowrap shrink-0 cursor-pointer sm:py-2"
                      >
                        <span>{t.newsletter.subscribe}</span>
                        <Send className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    {newsletterError ? (
                      <p
                        id="newsletter-error-msg"
                        role="alert"
                        className="mt-2 text-xs text-rose-300"
                      >
                        {newsletterError}
                      </p>
                    ) : (
                      <p
                        id="newsletter-privacy-note"
                        className="mt-2 text-[11px] text-slate-400"
                      >
                        {t.newsletter.privacyNote}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-slate-800/80 pt-8 pb-6 lg:flex-row lg:items-center lg:gap-8">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 shrink-0">
            <img
              src="/assets/aistudio/favicon-32x32_666d18ed.png"
              alt="JoyaceXstudio"
              width={24}
              height={24}
              referrerPolicy="no-referrer"
              className="h-6 w-6 shrink-0 rounded object-cover border border-sky-400/25"
            />
            <span className="font-display text-sm font-semibold text-slate-200 whitespace-nowrap">
              JoyaceXstudio
            </span>
            <span className="text-xs text-slate-500 whitespace-nowrap">
              {t.contact.footerTagline}
            </span>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs text-slate-400 lg:justify-end xl:gap-x-6"
          >
            <a
              href="#services"
              className="whitespace-nowrap hover:text-slate-200 transition-colors"
            >
              {t.nav.services}
            </a>
            <a
              href="#work"
              className="whitespace-nowrap hover:text-slate-200 transition-colors"
            >
              {t.nav.work}
            </a>
            <a
              href="#community"
              className="whitespace-nowrap hover:text-slate-200 transition-colors"
            >
              {t.nav.community}
            </a>
            <a
              href="#insights"
              className="whitespace-nowrap hover:text-slate-200 transition-colors"
            >
              {t.nav.insights}
            </a>
            <a
              href="#faq"
              className="whitespace-nowrap hover:text-slate-200 transition-colors"
            >
              {t.nav.faq}
            </a>
            <span
              className="hidden sm:inline h-3.5 w-px bg-slate-800"
              aria-hidden="true"
            />
            <a
              href={`mailto:${STUDIO_EMAIL}`}
              className="font-mono-tabular text-sky-300 whitespace-nowrap hover:text-sky-200 transition-colors"
            >
              {STUDIO_EMAIL}
            </a>
          </nav>
        </div>

        <div className="border-t border-slate-800/50 pt-5 pb-8 text-center sm:text-left">
          <p className="font-mono-tabular text-xs text-slate-500">
            © 2026-2027@JoyaceXstudio
          </p>
        </div>
      </footer>

      <ToastNotification toasts={toasts} onDismiss={dismissToast} />
    </section>
  );
}
