import { useRef, useState, type KeyboardEvent } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Megaphone,
  Terminal,
  TrendingUp,
} from 'lucide-react';
import {
  INSIGHT_UPDATES,
  type InsightCategory,
  type InsightPost,
} from '../data/studioData';
import { RevealOnScroll } from './RevealOnScroll';
import { useLocale } from '../i18n/LocaleContext';
import {
  getEsInsightCategoryLabel,
  getEsInsightCopy,
} from '../i18n/translations';

type FilterKey = 'all' | InsightCategory;

function CategoryIcon({ category }: { category: InsightCategory }) {
  switch (category) {
    case 'studio-announcement':
      return <Megaphone className="h-4 w-4 text-sky-300" aria-hidden="true" />;
    case 'industry-trend':
      return (
        <TrendingUp className="h-4 w-4 text-violet-300" aria-hidden="true" />
      );
    case 'engineering-note':
      return <Terminal className="h-4 w-4 text-sky-300" aria-hidden="true" />;
  }
}

export function InsightsSection() {
  const { locale, t } = useLocale();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => ({
    [INSIGHT_UPDATES[0].id]: true,
  }));

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const filterOptions: { key: FilterKey; label: string; count: number }[] = [
    { key: 'all', label: t.insights.allUpdates, count: INSIGHT_UPDATES.length },
    {
      key: 'studio-announcement',
      label: t.insights.studioAnnouncements,
      count: INSIGHT_UPDATES.filter((p) => p.category === 'studio-announcement')
        .length,
    },
    {
      key: 'industry-trend',
      label: t.insights.industryTrends,
      count: INSIGHT_UPDATES.filter((p) => p.category === 'industry-trend')
        .length,
    },
    {
      key: 'engineering-note',
      label: t.insights.engineeringNotes,
      count: INSIGHT_UPDATES.filter((p) => p.category === 'engineering-note')
        .length,
    },
  ];

  const visiblePosts: InsightPost[] =
    activeFilter === 'all'
      ? INSIGHT_UPDATES
      : INSIGHT_UPDATES.filter((post) => post.category === activeFilter);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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

  const handleCardKeyDown = (
    e: KeyboardEvent<HTMLElement>,
    postId: string,
    idx: number
  ) => {
    if (e.target !== e.currentTarget) return;
    const count = visiblePosts.length;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand(postId);
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      cardRefs.current[(idx + 1) % count]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      cardRefs.current[(idx - 1 + count) % count]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      cardRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      cardRefs.current[count - 1]?.focus();
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="insights"
      className="relative mx-auto max-w-[1280px] px-4 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      aria-labelledby="insights-heading"
    >
      <RevealOnScroll>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono-tabular text-xs tracking-wider text-sky-300 uppercase">
              {t.insights.eyebrow}
            </p>
            <h2
              id="insights-heading"
              className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-50 text-balance sm:text-3xl lg:text-4xl"
            >
              {t.insights.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              {t.insights.subtitle}
            </p>
          </div>

          <div
            className="flex max-w-full flex-nowrap items-center gap-1.5 overflow-x-auto rounded-xl border border-slate-800 bg-[#0b1120]/90 p-1.5 sm:flex-wrap"
            role="tablist"
            aria-label="Filter insights and updates by category"
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
        </div>
      </RevealOnScroll>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post, idx) => {
          const isExpanded = Boolean(expandedIds[post.id]);
          const briefPanelId = `insight-brief-${post.id}`;
          const localizedPost =
            (locale === 'es' ? getEsInsightCopy(post.id) : null) ?? post;
          const localizedCategoryLabel =
            (locale === 'es' ? getEsInsightCategoryLabel(post.category) : null) ??
            post.categoryLabel;

          return (
            <RevealOnScroll
              key={`${activeFilter}-${post.id}`}
              delayMs={(idx % 3) * 65}
            >
              <article
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                tabIndex={0}
                onKeyDown={(e) => handleCardKeyDown(e, post.id, idx)}
                aria-label={`${localizedPost.title} — ${localizedCategoryLabel}`}
                className={`glass-surface-interactive flex h-full flex-col justify-between rounded-2xl p-6 text-left transition-colors focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-[3px] ${
                  isExpanded ? 'border-sky-400/40' : ''
                }`}
              >
                <div>
                  {/* Category + Date + Read Time Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-200">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700/75 bg-[#060913]/85">
                        <CategoryIcon category={post.category} />
                      </span>
                      <span
                        className={
                          post.category === 'industry-trend'
                            ? 'text-violet-300'
                            : 'text-sky-300'
                        }
                      >
                        {localizedCategoryLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono-tabular text-[11px] text-slate-400">
                      <span>{localizedPost.publishedDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>{localizedPost.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight text-slate-50 sm:text-xl">
                    {localizedPost.title}
                  </h3>

                  {/* Summary */}
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                    {localizedPost.summary}
                  </p>

                  {/* Topic Tags */}
                  <div
                    className="mt-4 flex flex-wrap items-center gap-1.5"
                    aria-label="Topic tags"
                  >
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-slate-800/90 bg-[#060913]/80 px-2 py-0.5 font-mono-tabular text-[11px] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Collapsible Full Brief & Key Takeaways */}
                  <div
                    id={briefPanelId}
                    className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                      isExpanded
                        ? 'mt-4 grid-rows-[1fr] opacity-100'
                        : 'mt-0 grid-rows-[0fr] opacity-0'
                    }`}
                    aria-hidden={!isExpanded}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-3 rounded-xl border border-slate-700/45 bg-[#060913]/75 p-4 text-xs leading-relaxed">
                        <p className="text-slate-300">
                          {localizedPost.fullBrief}
                        </p>

                        <div className="border-t border-slate-800/80 pt-3">
                          <span className="font-mono-tabular text-[11px] uppercase tracking-wider text-sky-300">
                            {t.insights.keyTakeaways}
                          </span>
                          <ul className="mt-2 space-y-1.5 text-slate-200">
                            {localizedPost.keyTakeaways.map((point) => (
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
                      </div>
                    </div>
                  </div>
                </div>

                {/* Author + Expand Control Footer */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4 text-xs">
                  <div className="min-w-0">
                    <div className="font-medium text-slate-200 truncate">
                      {post.author}
                    </div>
                    <div className="font-mono-tabular text-[11px] text-slate-400 truncate">
                      {post.authorRole}
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={briefPanelId}
                    onClick={() => toggleExpand(post.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/75 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-sky-400/50 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090e1d] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>
                      {isExpanded ? t.insights.hideBrief : t.insights.readBrief}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-sky-300' : ''
                      }`}
                    />
                  </button>
                </div>
              </article>
            </RevealOnScroll>
          );
        })}
      </div>

      {/* Bottom Community Dispatch CTA */}
      <RevealOnScroll delayMs={100}>
        <div className="glass-surface mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-slate-100">
              {t.insights.ctaTitle}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              {t.insights.ctaSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-xs font-semibold text-sky-200 transition-colors hover:bg-sky-400/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060913] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>{t.insights.ctaButton}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </RevealOnScroll>
    </section>
  );
}
