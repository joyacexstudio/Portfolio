import { useRef, type KeyboardEvent, type MouseEvent } from 'react';
import {
  ArrowUpRight,
  Bot,
  Check,
  CloudCog,
  Code2,
  Cpu,
  Globe,
  Headset,
  Layers,
  PenTool,
  TrendingUp,
  Volume2,
  VolumeX,
  type LucideIcon,
} from 'lucide-react';
import {
  STUDIO_SERVICES,
  type ServiceId,
  type StudioService,
} from '../data/studioData';
import { RevealOnScroll } from './RevealOnScroll';
import {
  playSoftTechPing,
  triggerInteractivePing,
} from '../utils/soundEngine';
import { useLocale } from '../i18n/LocaleContext';
import { getServiceCopy } from '../i18n/translations';
import { useTheme } from '../theme/ThemeContext';

const LIGHT_SERVICE_ACCENTS: Record<ServiceId, string> = {
  'web-wordpress': '#0369a1',
  'full-stack': '#6d28d9',
  'ai-apps': '#1d4ed8',
  'landing-pages': '#6d28d9',
  'content-writing': '#0369a1',
  'saas-paas': '#0369a1',
  'ai-customer-care': '#5b21b6',
  'custom-ai-agent': '#6d28d9',
};

const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  'web-wordpress': Globe,
  'full-stack': Code2,
  'ai-apps': Cpu,
  'landing-pages': TrendingUp,
  'content-writing': PenTool,
  'saas-paas': CloudCog,
  'ai-customer-care': Headset,
  'custom-ai-agent': Bot,
};

interface ServicesSectionProps {
  activeServiceId: ServiceId;
  selectedBriefServices: ServiceId[];
  soundEnabled: boolean;
  onToggleSound: () => void;
  onInspectService: (id: ServiceId) => void;
  onRequestServiceBrief: (id: ServiceId) => void;
}

interface TiltGlassCardProps {
  service: StudioService;
  index: number;
  totalCount: number;
  isFocused: boolean;
  isInBrief: boolean;
  soundEnabled: boolean;
  registerCardRef: (index: number, el: HTMLElement | null) => void;
  onNavigateCard: (targetIndex: number) => void;
  onInspect: () => void;
  onSelectForBrief: () => void;
}

function TiltGlassCard({
  service,
  index,
  totalCount,
  isFocused,
  isInBrief,
  soundEnabled,
  registerCardRef,
  onNavigateCard,
  onInspect,
  onSelectForBrief,
}: TiltGlassCardProps) {
  const { locale, t } = useLocale();
  const { isLight } = useTheme();
  const cardRef = useRef<HTMLElement | null>(null);
  const ServiceIcon = SERVICE_ICONS[service.id];
  const headingId = `service-card-title-${service.id}`;
  const localized = getServiceCopy(service, locale);
  const iconAccent = isLight
    ? LIGHT_SERVICE_ACCENTS[service.id]
    : service.accentHex;

  const handleMouseEnter = () => {
    if (soundEnabled) {
      playSoftTechPing({ serviceId: service.id, variant: 'hover' });
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -4.2;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 4.2;

    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
    el.style.transform = `perspective(1050px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-2px)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1050px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  const handleCardFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;
    const el = cardRef.current;
    if (el) {
      el.style.setProperty('--mouse-x', '50%');
      el.style.setProperty('--mouse-y', '22%');
    }
    if (soundEnabled) {
      playSoftTechPing({ serviceId: service.id, variant: 'hover' });
    }
  };

  const handleCardClick = () => {
    if (soundEnabled) {
      triggerInteractivePing({
        serviceId: service.id,
        variant: 'select',
        volume: 0.9,
      });
    }
    onInspect();
  };

  const handleCardKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      onNavigateCard((index + 1) % totalCount);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      onNavigateCard((index - 1 + totalCount) % totalCount);
    } else if (e.key === 'Home') {
      e.preventDefault();
      onNavigateCard(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      onNavigateCard(totalCount - 1);
    }
  };

  return (
    <article
      ref={(el) => {
        cardRef.current = el;
        registerCardRef(index, el);
      }}
      tabIndex={0}
      aria-labelledby={headingId}
      aria-description="Press Enter or Space to inspect in 3D stage, or use arrow keys to move between service cards."
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={handleCardFocus}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className={`glass-surface-interactive group h-full rounded-2xl p-6 sm:p-7 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-[3px] ${
        isFocused
          ? 'border-sky-400/50 ring-1 ring-sky-400/25'
          : 'border-slate-700/40'
      }`}
    >
      <div
        className="glass-pointer-sheen pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col justify-between gap-6">
        <div>
          <div className="flex items-center justify-between gap-4 text-xs text-slate-400">
            <span className="font-mono-tabular text-sky-300">
              {service.index}. {t.services.pillarLabel}
            </span>
            <span className="truncate">{localized.tagline}</span>
          </div>

          <div className="mt-4 flex items-start gap-3.5">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-[#060913]/80 transition-colors"
              style={{
                borderColor: isFocused
                  ? `${iconAccent}99`
                  : isLight
                    ? 'rgba(15, 23, 42, 0.16)'
                    : 'rgba(148, 163, 184, 0.22)',
                color: iconAccent,
              }}
              aria-hidden="true"
            >
              <ServiceIcon className="h-5 w-5" strokeWidth={1.85} />
            </div>

            <h3
              id={headingId}
              className="font-display text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl"
            >
              {localized.title}
            </h3>
          </div>

          <p className="mt-3.5 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
            {localized.description}
          </p>

          <ul className="mt-5 space-y-2 border-t border-slate-800/80 pt-4 text-sm text-slate-300">
            {localized.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Layers className="mt-0.5 h-4 w-4 shrink-0 text-sky-400/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
          <div className="text-xs text-slate-400">
            {service.stack.join(' · ')}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (soundEnabled) {
                triggerInteractivePing({
                  serviceId: service.id,
                  variant: 'select',
                  volume: 0.85,
                });
              }
              onSelectForBrief();
            }}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090e1d] ${
              isInBrief
                ? 'bg-violet-500/25 text-violet-200 border border-violet-400/45'
                : 'bg-slate-800/85 text-slate-100 border border-slate-700 hover:border-sky-400/60 hover:text-sky-200'
            }`}
          >
            {isInBrief ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>{t.services.addedToBrief}</span>
              </>
            ) : (
              <>
                <span>{t.services.requestService}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export function ServicesSection({
  activeServiceId,
  selectedBriefServices,
  soundEnabled,
  onToggleSound,
  onInspectService,
  onRequestServiceBrief,
}: ServicesSectionProps) {
  const { t } = useLocale();
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const registerCardRef = (index: number, el: HTMLElement | null) => {
    cardRefs.current[index] = el;
  };

  const handleNavigateCard = (targetIndex: number) => {
    cardRefs.current[targetIndex]?.focus();
  };

  return (
    <section
      id="services"
      className="relative mx-auto max-w-[1280px] px-4 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      aria-labelledby="services-heading"
    >
      <RevealOnScroll>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono-tabular text-xs tracking-wider text-sky-300 uppercase">
              {t.services.eyebrow}
            </p>
            <h2
              id="services-heading"
              className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-50 text-balance sm:text-3xl lg:text-4xl"
            >
              {t.services.heading}
            </h2>
          </div>

          <div className="flex max-w-md flex-col items-start gap-3 md:items-end md:text-right">
            <p className="text-sm leading-relaxed text-slate-400">
              {t.services.helper}
            </p>

            <button
              type="button"
              onClick={onToggleSound}
              aria-pressed={soundEnabled}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060913] ${
                soundEnabled
                  ? 'border-sky-400/35 bg-sky-400/10 text-sky-200 hover:border-sky-400/60'
                  : 'border-slate-700/80 bg-[#0b1120]/85 text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              {soundEnabled ? (
                <Volume2 className="h-3.5 w-3.5 text-sky-300" />
              ) : (
                <VolumeX className="h-3.5 w-3.5 text-slate-400" />
              )}
              <span>{soundEnabled ? t.services.audioOn : t.services.audioOff}</span>
            </button>
          </div>
        </div>
      </RevealOnScroll>

      {/* Responsive Asymmetric Bento Grid: 1-col Mobile, flush 2x4 Tablet, flush 2+3+3 Desktop */}
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:mt-12 lg:grid-cols-6">
        {STUDIO_SERVICES.map((service, idx) => {
          const spanClass = idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
          return (
            <RevealOnScroll
              key={service.id}
              className={spanClass}
              delayMs={idx * 65}
            >
              <TiltGlassCard
                service={service}
                index={idx}
                totalCount={STUDIO_SERVICES.length}
                isFocused={activeServiceId === service.id}
                isInBrief={selectedBriefServices.includes(service.id)}
                soundEnabled={soundEnabled}
                registerCardRef={registerCardRef}
                onNavigateCard={handleNavigateCard}
                onInspect={() => onInspectService(service.id)}
                onSelectForBrief={() => onRequestServiceBrief(service.id)}
              />
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
