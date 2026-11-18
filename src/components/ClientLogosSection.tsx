import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { CLIENT_LOGOS, type PartnerLogo } from '../data/studioData';
import { RevealOnScroll } from './RevealOnScroll';
import { useLocale } from '../i18n/LocaleContext';

function GeometricMark({ type }: { type: PartnerLogo['markType'] }) {
  switch (type) {
    case 'prism':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-sky-300" fill="none" aria-hidden="true">
          <polygon points="12,3 21,19 3,19" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <line x1="12" y1="3" x2="12" y2="19" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
        </svg>
      );
    case 'orbit':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-violet-300" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="3.2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="9" ry="4.5" transform="rotate(-25 12 12)" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case 'grid':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-sky-300" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" opacity="0.6" />
          <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" opacity="0.6" />
          <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
        </svg>
      );
    case 'wave':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-sky-300" fill="none" aria-hidden="true">
          <path d="M3 13c2.5-5 5.5-5 8 0s5.5 5 10-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M3 17c2.5-3.5 5.5-3.5 8 0s5.5 3.5 10-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
        </svg>
      );
    case 'hex':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-violet-300" fill="none" aria-hidden="true">
          <polygon points="12,3 20,7.5 20,16.5 12,21 4,16.5 4,7.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        </svg>
      );
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-sky-300" fill="none" aria-hidden="true">
          <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2L12 3z" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="round" />
        </svg>
      );
    case 'node':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-violet-300" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17.5" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17.5" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.8 11l6.4-3M8.8 13l6.4 3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'stack':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-sky-300" fill="none" aria-hidden="true">
          <path d="M12 4l8 4-8 4-8-4 8-4z" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="round" />
          <path d="M4 12l8 4 8-4M4 16l8 4 8-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        </svg>
      );
  }
}

function LogoCard({
  partner,
  isDuplicate = false,
}: {
  partner: PartnerLogo;
  isDuplicate?: boolean;
}) {
  return (
    <div
      aria-hidden={isDuplicate ? true : undefined}
      className={`glass-surface mx-2.5 flex shrink-0 items-center gap-3.5 rounded-xl px-5 py-3.5 transition-colors hover:border-sky-400/40 ${
        isDuplicate ? 'marquee-duplicate' : ''
      }`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-700/70 bg-[#060913]/85">
        <GeometricMark type={partner.markType} />
      </div>

      <div className="min-w-0">
        <div className="font-display text-sm font-semibold tracking-tight text-slate-100 whitespace-nowrap">
          {partner.name}
        </div>
        <div className="font-mono-tabular text-[11px] text-slate-400 whitespace-nowrap">
          {partner.sector}
        </div>
      </div>
    </div>
  );
}

export function ClientLogosSection() {
  const [paused, setPaused] = useState(false);
  const { t } = useLocale();

  const topRow = CLIENT_LOGOS.slice(0, 6);
  const bottomRow = CLIENT_LOGOS.slice(6, 12);

  return (
    <section
      id="partners"
      className="relative mx-auto max-w-[1280px] px-4 pt-12 pb-6 sm:px-8 sm:pt-16 lg:px-10"
      aria-labelledby="partners-heading"
    >
      <RevealOnScroll>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono-tabular text-xs tracking-wider text-sky-300 uppercase">
              {t.partners.eyebrow}
            </p>
            <h2
              id="partners-heading"
              className="mt-1.5 font-display text-xl font-semibold tracking-tight text-slate-100 sm:text-2xl"
            >
              {t.partners.heading}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setPaused((prev) => !prev)}
            aria-pressed={paused}
            className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-700/80 bg-[#0b1120]/85 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-sky-400/50 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060913] whitespace-nowrap shrink-0 cursor-pointer sm:self-auto"
          >
            {paused ? (
              <>
                <Play className="h-3.5 w-3.5 text-sky-300" />
                <span>{t.partners.resume}</span>
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5 text-slate-400" />
                <span>{t.partners.pause}</span>
              </>
            )}
          </button>
        </div>

        <div
          className={`marquee-viewport marquee-mask mt-7 space-y-4 overflow-hidden py-1 ${
            paused ? 'marquee-paused' : ''
          }`}
          role="region"
          aria-label="Partner company logos slider"
        >
          {/* Row 1: Leftward continuous stream */}
          <div className="marquee-track-left gap-0">
            {topRow.map((partner) => (
              <LogoCard key={partner.id} partner={partner} />
            ))}
            {topRow.map((partner) => (
              <LogoCard
                key={`${partner.id}-dup`}
                partner={partner}
                isDuplicate
              />
            ))}
          </div>

          {/* Row 2: Rightward continuous stream */}
          <div className="marquee-track-right gap-0">
            {bottomRow.map((partner) => (
              <LogoCard key={partner.id} partner={partner} />
            ))}
            {bottomRow.map((partner) => (
              <LogoCard
                key={`${partner.id}-dup`}
                partner={partner}
                isDuplicate
              />
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
