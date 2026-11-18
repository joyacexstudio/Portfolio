import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, ChevronDown, Layers } from 'lucide-react';
import {
  STUDIO_SERVICES,
  type CaseStudy,
  type ServiceId,
} from '../data/studioData';
import { CASE_STUDIES } from '../data/portfolioData';
import { RevealOnScroll } from './RevealOnScroll';
import { useLocale } from '../i18n/LocaleContext';
import { getServiceCopy } from '../i18n/translations';

interface PortfolioSectionProps {
  onSelectProject: (project: CaseStudy) => void;
}

type FilterKey = 'all' | ServiceId;

const INITIAL_VISIBLE_COUNT = 10;
const LOAD_MORE_STEP = 10;

const BASE_FILTER_KEYS: FilterKey[] = [
  'all',
  ...STUDIO_SERVICES.map((svc) => svc.id),
];

export function PortfolioSection({ onSelectProject }: PortfolioSectionProps) {
  const { locale, t } = useLocale();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [visibleLimit, setVisibleLimit] = useState<number>(INITIAL_VISIBLE_COUNT);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const filterOptions: { key: FilterKey; label: string; count: number }[] =
    BASE_FILTER_KEYS.map((key) => {
      if (key === 'all') {
        return {
          key: 'all',
          label: t.portfolio.allWork,
          count: CASE_STUDIES.length,
        };
      }
      const svc = STUDIO_SERVICES.find((s) => s.id === key)!;
      return {
        key,
        label: getServiceCopy(svc, locale).shortLabel,
        count: CASE_STUDIES.filter((item) => item.serviceId === key).length,
      };
    });

  const filteredStudies =
    activeFilter === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((item) => item.serviceId === activeFilter);

  const visibleStudies =
    activeFilter === 'all'
      ? filteredStudies.slice(0, visibleLimit)
      : filteredStudies;

  const hasMoreInAll =
    activeFilter === 'all' && visibleStudies.length < filteredStudies.length;

  const selectFilter = (key: FilterKey) => {
    setActiveFilter(key);
    if (key === 'all') {
      setVisibleLimit(INITIAL_VISIBLE_COUNT);
    }
  };

  const toggleExpand = (studyId: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [studyId]: !prev[studyId],
    }));
  };

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
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
      selectFilter(filterOptions[nextIdx].key);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  const handleCardKeyDown = (
    e: KeyboardEvent<HTMLElement>,
    study: CaseStudy,
    idx: number
  ) => {
    if (e.target !== e.currentTarget) return;
    const count = visibleStudies.length;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectProject(study);
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

  const handleShowLess = () => {
    setVisibleLimit(INITIAL_VISIBLE_COUNT);
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="work"
      className="relative mx-auto max-w-[1280px] px-4 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      aria-labelledby="work-heading"
    >
      <RevealOnScroll>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-mono-tabular text-xs tracking-wider text-violet-300 uppercase">
              {t.portfolio.eyebrowPrefix} · {CASE_STUDIES.length} {t.portfolio.eyebrowSuffix}
            </p>
            <h2
              id="work-heading"
              className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-50 text-balance sm:text-3xl lg:text-4xl"
            >
              {t.portfolio.heading}
            </h2>
          </div>

          {/* Interactive Filter Segmented Controls with WAI-ARIA roving tabindex */}
          <div
            className="flex max-w-full flex-nowrap items-center gap-1.5 overflow-x-auto rounded-xl border border-slate-800 bg-[#0b1120]/90 p-1.5 sm:flex-wrap"
            role="tablist"
            aria-label="Filter case studies by discipline"
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
                  onClick={() => selectFilter(opt.key)}
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

      {/* Bento Case Study Grid */}
      {visibleStudies.length === 0 ? (
        <div className="mt-12 rounded-2xl glass-surface p-12 text-center">
          <p className="text-sm text-slate-300">
            {t.portfolio.emptyState}
          </p>
        </div>
      ) : (
        <>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleStudies.map((study, idx) => {
              const isFeatured =
                activeFilter === 'all' && Boolean(study.featured);
              const spanClass = isFeatured
                ? 'md:col-span-2 lg:col-span-2'
                : 'col-span-1';
              const imgFailed = failedImages[study.id];
              const isExpanded = Boolean(expandedIds[study.id]);
              const detailsPanelId = `portfolio-details-${study.id}`;

              return (
                <RevealOnScroll
                  key={`${activeFilter}-${study.id}`}
                  className={spanClass}
                  delayMs={(idx % 5) * 55}
                >
                  <article
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    onKeyDown={(e) => handleCardKeyDown(e, study, idx)}
                    tabIndex={0}
                    aria-label={`${study.title} case study for ${study.client}. Press Enter to inspect full study.`}
                    className="glass-surface-interactive group flex h-full flex-col overflow-hidden rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-[3px]"
                  >
                    <div
                      onClick={() => onSelectProject(study)}
                      className={`relative w-full overflow-hidden bg-slate-900 cursor-pointer ${
                        isFeatured ? 'aspect-[16/9]' : 'aspect-[4/3]'
                      }`}
                    >
                      {imgFailed ? (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-900 via-[#0e172e] to-slate-950 p-6 text-center">
                          <Layers className="h-8 w-8 text-sky-400/70" />
                          <span className="font-display text-sm font-medium text-slate-300">
                            {study.title}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={study.image}
                          alt={`${study.title} preview`}
                          width={isFeatured ? 1200 : 800}
                          height={isFeatured ? 675 : 600}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          onError={() =>
                            setFailedImages((prev) => ({
                              ...prev,
                              [study.id]: true,
                            }))
                          }
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
                        />
                      )}
                      <div
                        className="preserve-media-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060913]/90 via-[#060913]/20 to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between gap-3 text-xs text-slate-200">
                        <span className="preserve-media-text font-mono-tabular text-sky-300">
                          {study.impactMetric}
                        </span>
                      </div>
                    </div>

                      <div className="mt-2 flex flex-1 flex-col justify-between p-5 pt-4 sm:p-6 sm:pt-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-400">
                            <span className="font-medium text-sky-300/90">
                              {study.industry}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{study.categoryLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span>{study.client}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono-tabular">{study.year}</span>
                          </div>

                          <h3
                            onClick={() => onSelectProject(study)}
                            className="mt-2.5 font-display text-xl font-semibold tracking-tight text-slate-50 transition-colors group-hover:text-sky-200 group-focus-visible:text-sky-200 cursor-pointer"
                          >
                            {study.title}
                          </h3>

                          <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                            {study.summary}
                          </p>

                          <div
                            className="mt-3.5 flex flex-wrap items-center gap-1.5"
                            aria-label="Technology stack"
                          >
                            {study.stack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-md border border-slate-800/90 bg-[#060913]/80 px-2 py-0.5 font-mono-tabular text-[11px] text-slate-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Collapsible / Expandable Architecture & Challenge Brief */}
                          <div
                            id={detailsPanelId}
                            className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                              isExpanded
                                ? 'mt-4 grid-rows-[1fr] opacity-100'
                                : 'mt-0 grid-rows-[0fr] opacity-0'
                            }`}
                            aria-hidden={!isExpanded}
                          >
                            <div className="overflow-hidden">
                              <div className="space-y-3.5 rounded-xl border border-slate-700/45 bg-[#060913]/70 p-4 text-xs leading-relaxed">
                                <div>
                                  <span className="font-mono-tabular text-[11px] uppercase tracking-wider text-sky-300">
                                    {t.portfolio.challengePrefix} · {study.industry}
                                  </span>
                                  <p className="mt-1 text-slate-300">
                                    {study.challenge}
                                  </p>
                                </div>

                                <div className="border-t border-slate-800/80 pt-3">
                                  <span className="font-mono-tabular text-[11px] uppercase tracking-wider text-violet-300">
                                    {t.portfolio.architectureLabel}
                                  </span>
                                  <p className="mt-1 text-slate-300">
                                    {study.solution}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4 text-xs">
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            aria-controls={detailsPanelId}
                            onClick={() => toggleExpand(study.id)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/75 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-sky-400/50 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090e1d] whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <span>
                              {isExpanded
                                ? t.portfolio.hideBrief
                                : t.portfolio.showBrief}
                            </span>
                            <ChevronDown
                              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-sky-300' : ''
                              }`}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() => onSelectProject(study)}
                            className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 font-semibold text-sky-300 transition-colors hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090e1d] whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <span>{t.portfolio.inspect}</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </article>
                  </RevealOnScroll>
                );
              })}
          </div>

          {/* Progressive Reveal Controls for 56 Selected Works */}
          {activeFilter === 'all' && (
            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-7 sm:flex-row">
              <p className="font-mono-tabular text-xs text-slate-400">
                {t.portfolio.showingOf(visibleStudies.length, filteredStudies.length)}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {hasMoreInAll && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleLimit((prev) =>
                          Math.min(filteredStudies.length, prev + LOAD_MORE_STEP)
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-xs font-semibold text-sky-200 transition-colors hover:bg-sky-400/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060913] cursor-pointer"
                    >
                      <span>
                        {t.portfolio.loadMore(
                          Math.min(
                            LOAD_MORE_STEP,
                            filteredStudies.length - visibleStudies.length
                          )
                        )}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVisibleLimit(filteredStudies.length)}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-[#0b1120]/85 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060913] cursor-pointer"
                    >
                      <span>{t.portfolio.viewAll(filteredStudies.length)}</span>
                    </button>
                  </>
                )}

                {visibleLimit > INITIAL_VISIBLE_COUNT && (
                  <button
                    type="button"
                    onClick={handleShowLess}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-[#0b1120]/85 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-sky-400/50 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060913] cursor-pointer"
                  >
                    <span>{t.portfolio.showFewer}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
