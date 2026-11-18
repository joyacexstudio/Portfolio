import { useRef, useState, type KeyboardEvent } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Clock,
  CreditCard,
  Layers,
} from 'lucide-react';
import {
  STUDIO_FAQS,
  type FaqCategory,
  type FaqItem,
} from '../data/studioData';
import { RevealOnScroll } from './RevealOnScroll';
import { useLocale } from '../i18n/LocaleContext';
import {
  getEsFaqCategoryLabel,
  getEsFaqCopy,
} from '../i18n/translations';

type FaqFilterKey = 'all' | FaqCategory;

function FaqCategoryIcon({ category }: { category: FaqCategory }) {
  switch (category) {
    case 'process':
      return <Layers className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />;
    case 'pricing':
      return (
        <CreditCard className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
      );
    case 'timelines':
      return <Clock className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />;
  }
}

export function FaqSection() {
  const { locale, t } = useLocale();
  const [activeFilter, setActiveFilter] = useState<FaqFilterKey>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => ({
    [STUDIO_FAQS[0].id]: true,
  }));

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const questionButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filterOptions: { key: FaqFilterKey; label: string; count: number }[] = [
    { key: 'all', label: t.faq.allQuestions, count: STUDIO_FAQS.length },
    {
      key: 'process',
      label: t.faq.processCategory,
      count: STUDIO_FAQS.filter((item) => item.category === 'process').length,
    },
    {
      key: 'pricing',
      label: t.faq.pricingCategory,
      count: STUDIO_FAQS.filter((item) => item.category === 'pricing').length,
    },
    {
      key: 'timelines',
      label: t.faq.timelinesCategory,
      count: STUDIO_FAQS.filter((item) => item.category === 'timelines').length,
    },
  ];

  const visibleFaqs: FaqItem[] =
    activeFilter === 'all'
      ? STUDIO_FAQS
      : STUDIO_FAQS.filter((item) => item.category === activeFilter);

  const allVisibleExpanded =
    visibleFaqs.length > 0 && visibleFaqs.every((item) => expandedIds[item.id]);

  const toggleFaq = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAllVisible = () => {
    const nextState = !allVisibleExpanded;
    setExpandedIds((prev) => {
      const updated = { ...prev };
      visibleFaqs.forEach((item) => {
        updated[item.id] = nextState;
      });
      return updated;
    });
  };

  const handleTabKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    const count = filterOptions.length;
    let nextIdx: number | null = null;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIdx = (idx + 1) % count;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIdx = (idx - 1 + count) % count;
    } else if (e.key === 'Home') {
      nextIdx = 0;
    } else if (e.key === 'End') {
      nextIdx = count - 1;
    }

    if (nextIdx !== null) {
      e.preventDefault();
      setActiveFilter(filterOptions[nextIdx].key);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  const handleQuestionKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    const count = visibleFaqs.length;
    if (count === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      questionButtonRefs.current[(idx + 1) % count]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      questionButtonRefs.current[(idx - 1 + count) % count]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      questionButtonRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      questionButtonRefs.current[count - 1]?.focus();
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="faq"
      className="relative mx-auto max-w-[1280px] px-4 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      aria-labelledby="faq-heading"
    >
      <RevealOnScroll>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono-tabular text-xs tracking-wider text-sky-300 uppercase">
              {t.faq.eyebrow}
            </p>
            <h2
              id="faq-heading"
              className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-50 text-balance sm:text-3xl lg:text-4xl"
            >
              {t.faq.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="flex max-w-full flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div
              className="flex max-w-full flex-nowrap items-center gap-1.5 overflow-x-auto rounded-xl border border-slate-800 bg-[#0b1120]/90 p-1.5 sm:flex-wrap"
              role="tablist"
              aria-label="Filter FAQ by category"
            >
              {filterOptions.map((opt, idx) => {
                const isSelected = activeFilter === opt.key;
                return (
                  <button
                    key={opt.key}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    type="button"
                    role="tab"
                    tabIndex={isSelected ? 0 : -1}
                    aria-selected={isSelected}
                    onClick={() => setActiveFilter(opt.key)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1120] ${
                      isSelected
                        ? 'bg-sky-400 text-slate-950 font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span
                      className={`font-mono-tabular text-[11px] ${
                        isSelected ? 'text-slate-900/80' : 'text-slate-500'
                      }`}
                    >
                      {opt.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={toggleAllVisible}
              className="rounded-xl border border-slate-700/80 bg-[#0b1120]/85 px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-sky-400/50 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060913] whitespace-nowrap shrink-0 cursor-pointer"
            >
              {allVisibleExpanded ? t.faq.collapseAll : t.faq.expandAll}
            </button>
          </div>
        </div>
      </RevealOnScroll>

      {/* Expandable Glassmorphism FAQ Stack */}
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start">
        {visibleFaqs.map((item, idx) => {
          const isExpanded = Boolean(expandedIds[item.id]);
          const panelId = `faq-panel-${item.id}`;
          const triggerId = `faq-trigger-${item.id}`;
          const localizedItem =
            (locale === 'es' ? getEsFaqCopy(item.id) : null) ?? item;
          const localizedCategoryLabel =
            (locale === 'es' ? getEsFaqCategoryLabel(item.category) : null) ??
            item.categoryLabel;

          return (
            <RevealOnScroll
              key={`${activeFilter}-${item.id}`}
              delayMs={(idx % 4) * 50}
            >
              <div
                className={`glass-surface-interactive rounded-2xl transition-colors ${
                  isExpanded ? 'border-sky-400/45' : ''
                }`}
              >
                <h3 className="m-0">
                  <button
                    id={triggerId}
                    ref={(el) => {
                      questionButtonRefs.current[idx] = el;
                    }}
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(item.id)}
                    onKeyDown={(e) => handleQuestionKeyDown(e, idx)}
                    className="flex w-full items-start justify-between gap-4 rounded-2xl p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-[-2px] sm:p-6 cursor-pointer"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-700/75 bg-[#060913]/85">
                          <FaqCategoryIcon category={item.category} />
                        </span>
                        <span
                          className={`font-mono-tabular text-[11px] uppercase tracking-wider ${
                            item.category === 'pricing'
                              ? 'text-violet-300'
                              : 'text-sky-300'
                          }`}
                        >
                          {localizedCategoryLabel}
                        </span>
                      </div>
                      <span className="mt-2.5 block font-display text-base font-semibold leading-snug tracking-tight text-slate-50 sm:text-lg">
                        {localizedItem.question}
                      </span>
                    </div>

                    <span
                      className={`mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        isExpanded
                          ? 'border-sky-400/50 bg-sky-400/15 text-sky-200'
                          : 'border-slate-700/80 bg-[#060913]/75 text-slate-400'
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isExpanded}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isExpanded
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-800/80 px-5 pt-4 pb-5 sm:px-6 sm:pb-6">
                      <p className="text-sm leading-relaxed text-slate-300">
                        {localizedItem.answer}
                      </p>

                      {localizedItem.highlights.length > 0 && (
                        <div className="mt-4 rounded-xl border border-slate-700/45 bg-[#060913]/75 p-4">
                          <span className="font-mono-tabular text-[11px] uppercase tracking-wider text-sky-300">
                            {t.faq.keyHighlights}
                          </span>
                          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-200">
                            {localizedItem.highlights.map((point) => (
                              <li
                                key={point}
                                className="flex items-start gap-2"
                              >
                                <span
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400"
                                  aria-hidden="true"
                                />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>

      {/* Bottom Self-Service Scope CTA */}
      <RevealOnScroll delayMs={100}>
        <div className="glass-surface mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-slate-100">
              {t.faq.ctaTitle}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              {t.faq.ctaSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-xs font-semibold text-sky-200 transition-colors hover:bg-sky-400/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060913] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>{t.faq.ctaButton}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </RevealOnScroll>
    </section>
  );
}
