import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import { useTheme } from '../theme/ThemeContext';

export function BackToTopButton() {
  const { t } = useLocale();
  const { isLight } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const updateVisibility = () => {
      rafId = 0;
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Appear only once the hero section has scrolled past the sticky TopBar
        setVisible(rect.bottom <= 80);
      } else {
        setVisible(window.scrollY > window.innerHeight * 0.85);
      }
    };

    const scheduleCheck = () => {
      if (rafId !== 0) return;
      rafId = requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck, { passive: true });

    return () => {
      if (rafId !== 0) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleCheck);
      window.removeEventListener('resize', scheduleCheck);
    };
  }, []);

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label={t.nav.backToTop}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`glass-surface fixed right-5 bottom-5 z-30 inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 cursor-pointer sm:right-7 sm:bottom-7 ${
        isLight
          ? 'border-slate-900/18 text-slate-900 hover:border-sky-600/70 hover:text-sky-800 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_18px_40px_-12px_rgba(2,132,199,0.28)] focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fafc]'
          : 'border-sky-400/25 text-slate-100 hover:border-sky-400/60 hover:text-sky-200 hover:shadow-[inset_0_1px_0_0_rgba(186,230,253,0.28),0_20px_48px_-12px_rgba(56,189,248,0.28)] focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060913]'
      } ${
        visible
          ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
          : 'translate-y-3 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <ArrowUp className="h-4 w-4 text-sky-300" aria-hidden="true" />
      <span className="hidden sm:inline">{t.nav.backToTop}</span>
    </button>
  );
}
