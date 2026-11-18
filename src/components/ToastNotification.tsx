import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

export interface ToastItem {
  id: number;
  title: string;
  description?: string;
  tone?: 'success' | 'error';
  durationMs: number;
}

interface ToastNotificationProps {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
}

export function ToastNotification({
  toasts,
  onDismiss,
}: ToastNotificationProps) {
  const { isLight } = useTheme();
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed right-4 bottom-4 left-4 z-50 flex flex-col gap-2.5 sm:right-6 sm:bottom-6 sm:left-auto sm:w-full sm:max-w-sm"
    >
      {toasts.map((toast) => {
        const isError = toast.tone === 'error';
        return (
          <div
            key={toast.id}
            role={isError ? 'alert' : 'status'}
            className={`toast-enter pointer-events-auto relative overflow-hidden rounded-xl border px-4 py-3.5 backdrop-blur-md ${
              isLight
                ? `bg-white/92 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.22)] ${
                    isError
                      ? 'border-rose-600/45 text-rose-900'
                      : 'border-sky-600/35 text-slate-900'
                  }`
                : `bg-[#0b1120]/95 shadow-[0_20px_50px_-15px_rgba(2,6,23,0.95)] ${
                    isError
                      ? 'border-rose-400/40 text-rose-100'
                      : 'border-sky-400/35 text-slate-100'
                  }`
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${
                  isError
                    ? isLight
                      ? 'border-rose-600/30 bg-rose-500/10 text-rose-700'
                      : 'border-rose-400/30 bg-rose-500/15 text-rose-300'
                    : isLight
                      ? 'border-sky-600/30 bg-sky-500/12 text-sky-700'
                      : 'border-sky-400/30 bg-sky-400/15 text-sky-300'
                }`}
                aria-hidden="true"
              >
                {isError ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-50">
                  {toast.title}
                </p>
                {toast.description && (
                  <p className="mt-0.5 truncate font-mono-tabular text-xs text-slate-400">
                    {toast.description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                aria-label="Dismiss notification"
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-800/80 hover:text-slate-100 focus-visible:outline-2 focus-visible:outline-sky-400 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div
              className={`pointer-events-none absolute right-0 bottom-0 left-0 h-[2px] ${
                isLight ? 'bg-slate-200' : 'bg-slate-800/80'
              }`}
              aria-hidden="true"
            >
              <div
                className={`toast-progress-bar h-full w-full ${
                  isError
                    ? isLight
                      ? 'bg-rose-600'
                      : 'bg-rose-400/80'
                    : isLight
                      ? 'bg-gradient-to-r from-sky-600 to-violet-600'
                      : 'bg-gradient-to-r from-sky-400 to-violet-400'
                }`}
                style={{
                  ['--toast-duration' as string]: `${toast.durationMs}ms`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
