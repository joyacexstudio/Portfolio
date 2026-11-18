import { PARTNERSHIP_METRICS, TESTIMONIALS } from '../data/studioData';
import { RevealOnScroll } from './RevealOnScroll';
import { useLocale } from '../i18n/LocaleContext';
import { getEsMetricCopy } from '../i18n/translations';

export function ProofSection() {
  const { locale, t } = useLocale();

  return (
    <section
      id="proof"
      className="relative mx-auto max-w-[1280px] px-4 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      aria-labelledby="proof-heading"
    >
      <RevealOnScroll>
        <div className="max-w-2xl">
          <p className="font-mono-tabular text-xs tracking-wider text-violet-300 uppercase">
            {t.proof.eyebrow}
          </p>
          <h2
            id="proof-heading"
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-50 text-balance sm:text-3xl lg:text-4xl"
          >
            {t.proof.heading}
          </h2>
        </div>
      </RevealOnScroll>

      {/* Full-width 4-column Metrics Strip */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PARTNERSHIP_METRICS.map((metric, idx) => {
          const esMetric = locale === 'es' ? getEsMetricCopy(idx) : null;
          const localizedMetric = esMetric ?? metric;
          return (
            <RevealOnScroll key={metric.label} delayMs={idx * 55}>
              <div className="glass-surface h-full rounded-2xl p-6">
                <div className="font-mono-tabular text-3xl font-semibold tracking-tight text-sky-300">
                  {metric.value}
                </div>
                <div className="mt-1.5 font-display text-base font-medium text-slate-100">
                  {localizedMetric.label}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {localizedMetric.context}
                </p>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>

      {/* Attributable Client Testimonials */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((item, idx) => (
          <RevealOnScroll
            key={item.id}
            className={idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''}
            delayMs={idx * 75}
          >
            <blockquote className="glass-surface flex h-full flex-col justify-between rounded-2xl p-6 sm:p-7">
              <div>
                <div className="font-mono-tabular text-xs text-violet-300">
                  {item.outcome}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-[15px]">
                  “{item.quote}”
                </p>
              </div>

              <footer className="mt-6 border-t border-slate-800/80 pt-4">
                <div className="font-display text-sm font-semibold text-slate-50">
                  {item.author}
                </div>
                <div className="mt-0.5 text-xs text-slate-400">
                  {item.role} · {item.organization}
                </div>
              </footer>
            </blockquote>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
