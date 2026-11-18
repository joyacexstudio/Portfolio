import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Layers, X } from 'lucide-react';
import type { CaseStudy, ServiceId } from '../data/studioData';
import { useLocale } from '../i18n/LocaleContext';
import { useTheme } from '../theme/ThemeContext';

interface ProjectModalProps {
  project: CaseStudy | null;
  onClose: () => void;
  onRequestSimilar: (serviceId: ServiceId) => void;
}

export function ProjectModal({
  project,
  onClose,
  onRequestSimilar,
}: ProjectModalProps) {
  const { t } = useLocale();
  const { isLight } = useTheme();
  const [imgError, setImgError] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setImgError(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    // Move focus inside modal on open
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled'));

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 ${
        isLight ? 'bg-slate-900/55 backdrop-blur-sm' : 'bg-[#03050c]/85'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className={`glass-surface relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-2xl border shadow-2xl ${
          isLight
            ? 'border-slate-900/18 bg-white/95'
            : 'border-slate-700/60 bg-[#0b1120]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={t.portfolio.modal.closeLabel}
          className={`absolute top-4 right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 cursor-pointer ${
            isLight
              ? 'border-slate-900/20 bg-white/90 text-slate-900 hover:border-sky-600 hover:text-sky-800 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white'
              : 'border-slate-700/80 bg-[#060913]/90 text-slate-200 hover:border-sky-400/60 hover:text-white focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1120]'
          }`}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
          {imgError ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-900 via-[#0e172e] to-slate-950 p-6">
              <Layers className="h-9 w-9 text-sky-400/75" />
              <span className="font-display text-base text-slate-200">
                {project.title}
              </span>
            </div>
          ) : (
            <img
              src={project.image}
              alt={project.title}
              width={1200}
              height={675}
              referrerPolicy="no-referrer"
              decoding="async"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover"
            />
          )}
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent ${
              isLight
                ? 'from-white via-white/25'
                : 'from-[#0b1120] via-[#0b1120]/25'
            }`}
            aria-hidden="true"
          />
        </div>

        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-medium text-sky-300/90">{project.industry}</span>
            <span aria-hidden="true">·</span>
            <span>{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.client}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{project.year}</span>
          </div>

          <h3
            id="modal-project-title"
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl"
          >
            {project.title}
          </h3>

          <p className="mt-2 font-mono-tabular text-sm text-sky-300">
            {project.impactMetric}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 border-t border-slate-800/90 pt-6 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {t.portfolio.modal.challengeHeading}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {project.challenge}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {t.portfolio.modal.architectureHeading}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/90 pt-6">
            <div className="text-xs text-slate-400">
              {t.portfolio.modal.stackLabel}: {project.stack.join(' · ')}
            </div>

            <button
              type="button"
              onClick={() => {
                onRequestSimilar(project.serviceId);
                onClose();
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-400 px-4 py-2.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1120] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{t.portfolio.modal.requestSimilar}</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
