import { useEffect, useRef } from 'react';
import { useTheme } from '../theme/ThemeContext';

export function ScrollProgressBar() {
  const { isLight } = useTheme();
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const el = fillRef.current;
      if (!el) return;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        maxScroll > 0 ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1) : 0;

      el.style.transform = `scaleX(${progress.toFixed(4)})`;
    };

    const scheduleUpdate = () => {
      if (rafId !== 0) return;
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.documentElement);

    return () => {
      if (rafId !== 0) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed top-0 left-0 right-0 z-50 h-[2.5px] ${
        isLight ? 'bg-slate-200/80' : 'bg-slate-900/50'
      }`}
      aria-hidden="true"
    >
      <div
        ref={fillRef}
        className={`h-full w-full origin-left bg-gradient-to-r will-change-transform ${
          isLight
            ? 'from-sky-600 via-blue-600 to-violet-600'
            : 'from-sky-400 via-blue-400 to-violet-500'
        }`}
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
