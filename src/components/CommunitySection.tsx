import { useRef, useState, type KeyboardEvent } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, Users } from 'lucide-react';
import { COMMUNITY_TRACKS } from '../data/studioData';
import { RevealOnScroll } from './RevealOnScroll';
import { useLocale } from '../i18n/LocaleContext';
import { getEsCommunityTrackCopy } from '../i18n/translations';

export function CommunitySection() {
  const { locale, t } = useLocale();
  const [expandedTracks, setExpandedTracks] = useState<Record<string, boolean>>(
    () => ({
      [COMMUNITY_TRACKS[0].id]: true,
    })
  );
  const [expandedModules, setExpandedModules] = useState<
    Record<string, boolean>
  >(() => ({
    [COMMUNITY_TRACKS[0].curriculumModules[0].code]: true,
  }));

  const trackTriggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const allExpanded = COMMUNITY_TRACKS.every((t) => expandedTracks[t.id]);

  const toggleTrack = (trackId: string) => {
    setExpandedTracks((prev) => ({
      ...prev,
      [trackId]: !prev[trackId],
    }));
  };

  const toggleAllTracks = () => {
    const nextState = !allExpanded;
    const updated: Record<string, boolean> = {};
    for (const track of COMMUNITY_TRACKS) {
      updated[track.id] = nextState;
    }
    setExpandedTracks(updated);
  };

  const toggleModule = (code: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  const handleTrackKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    const count = COMMUNITY_TRACKS.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      trackTriggerRefs.current[(idx + 1) % count]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      trackTriggerRefs.current[(idx - 1 + count) % count]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      trackTriggerRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      trackTriggerRefs.current[count - 1]?.focus();
    }
  };

  return (
    <section
      id="community"
      className="relative mx-auto max-w-[1280px] px-4 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      aria-labelledby="community-heading"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
        {/* Left Narrative Column: Why Partner With Us? */}
        <RevealOnScroll className="flex flex-col justify-between lg:col-span-5">
          <div>
            <p className="font-mono-tabular text-xs tracking-wider text-sky-300 uppercase">
              {t.community.eyebrow}
            </p>
            <h2
              id="community-heading"
              className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-50 text-balance sm:text-3xl lg:text-4xl"
            >
              {t.community.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300">
              {t.community.paragraph1}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {t.community.paragraph2}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-800/80 pt-6 sm:grid-cols-2">
            <div className="glass-surface rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-sky-300">
                <Users className="h-4 w-4" />
                <span>{t.community.ecosystemTitle}</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                {t.community.ecosystemBody}
              </p>
            </div>
            <div className="glass-surface rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-violet-300">
                <BookOpen className="h-4 w-4" />
                <span>{t.community.masteryTitle}</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                {t.community.masteryBody}
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Right Collapsible / Expandable Guild & Curriculum Glass Cards */}
        <RevealOnScroll className="lg:col-span-7" delayMs={90}>
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="font-mono-tabular text-xs uppercase tracking-wider text-slate-400">
              {t.community.guildsEyebrow}
            </span>
            <button
              type="button"
              onClick={toggleAllTracks}
              className="rounded-lg border border-slate-700/80 bg-[#0b1120]/85 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-sky-400/50 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060913] cursor-pointer"
            >
              {allExpanded ? t.community.collapseAll : t.community.expandAll}
            </button>
          </div>

          <div className="space-y-4">
            {COMMUNITY_TRACKS.map((track, idx) => {
              const isOpen = Boolean(expandedTracks[track.id]);
              const panelId = `community-track-panel-${track.id}`;
              const esTrack =
                locale === 'es' ? getEsCommunityTrackCopy(track.id) : null;
              const localizedTrack = esTrack ?? track;

              return (
                <article
                  key={track.id}
                  className={`glass-surface overflow-hidden rounded-2xl transition-colors ${
                    isOpen
                      ? 'border-sky-400/35'
                      : 'border-slate-700/40 hover:border-slate-600/60'
                  }`}
                >
                  <h3>
                    <button
                      ref={(el) => {
                        trackTriggerRefs.current[idx] = el;
                      }}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleTrack(track.id)}
                      onKeyDown={(e) => handleTrackKeyDown(e, idx)}
                      className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-slate-800/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400 sm:p-6 cursor-pointer"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                          <span className="font-mono-tabular text-sky-300">
                            {localizedTrack.cadence}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{localizedTrack.focus}</span>
                        </div>
                        <div className="mt-2 font-display text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                          {localizedTrack.title}
                        </div>
                      </div>

                      <span
                        className={`mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                          isOpen
                            ? 'border-sky-400/45 bg-sky-400/15 text-sky-300'
                            : 'border-slate-700/80 bg-[#060913]/75 text-slate-400'
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-slate-800/80 px-5 pt-5 pb-6 sm:px-6">
                        <p className="text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                          {localizedTrack.summary}
                        </p>

                        <ul className="mt-5 space-y-2.5">
                          {localizedTrack.highlights.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm text-slate-200"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Expandable Curriculum Modules */}
                        <div className="mt-6">
                          <div className="font-mono-tabular text-[11px] uppercase tracking-wider text-violet-300">
                            {t.community.curriculumLabel}
                          </div>
                          <div className="mt-2.5 space-y-2">
                            {track.curriculumModules.map((mod) => {
                              const isModOpen = Boolean(
                                expandedModules[mod.code]
                              );
                              const modPanelId = `module-panel-${mod.code}`;

                              return (
                                <div
                                  key={mod.code}
                                  className="rounded-xl border border-slate-800/90 bg-[#060913]/65"
                                >
                                  <button
                                    type="button"
                                    aria-expanded={isModOpen}
                                    aria-controls={modPanelId}
                                    onClick={() => toggleModule(mod.code)}
                                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-800/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400 rounded-xl cursor-pointer"
                                  >
                                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm">
                                      <span className="font-mono-tabular text-xs font-medium text-sky-300">
                                        {mod.code}
                                      </span>
                                      <span className="font-medium text-slate-100">
                                        {mod.title}
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                      <span className="font-mono-tabular text-[11px] text-slate-400">
                                        {mod.duration}
                                      </span>
                                      <ChevronDown
                                        className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                                          isModOpen
                                            ? 'rotate-180 text-sky-300'
                                            : ''
                                        }`}
                                      />
                                    </div>
                                  </button>

                                  <div
                                    id={modPanelId}
                                    className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                                      isModOpen
                                        ? 'grid-rows-[1fr] opacity-100'
                                        : 'grid-rows-[0fr] opacity-0'
                                    }`}
                                    aria-hidden={!isModOpen}
                                  >
                                    <div className="overflow-hidden">
                                      <div className="flex flex-wrap gap-1.5 border-t border-slate-800/70 px-4 py-3">
                                        {mod.topics.map((topic) => (
                                          <span
                                            key={topic}
                                            className="rounded-md border border-slate-700/75 bg-[#0b1120]/90 px-2.5 py-1 text-xs text-slate-300"
                                          >
                                            {topic}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="mt-6 rounded-xl border border-slate-800/80 bg-[#060913]/65 px-5 py-4">
                          <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                            {t.community.clientAdvantage}
                          </div>
                          <p className="mt-1 text-sm text-slate-200">
                            {localizedTrack.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
