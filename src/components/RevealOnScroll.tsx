import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

const revealCallbacks = new Map<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const onReveal = revealCallbacks.get(entry.target);
            if (onReveal) {
              onReveal();
              revealCallbacks.delete(entry.target);
            }
            sharedObserver?.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.06,
        rootMargin: '0px 0px -24px 0px',
      }
    );
  }
  return sharedObserver;
}

export function RevealOnScroll({
  children,
  className = '',
  delayMs = 0,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    );
  });

  useEffect(() => {
    if (isVisible) return;
    const node = ref.current;
    if (!node) return;

    const observer = getSharedObserver();
    if (!observer) {
      setIsVisible(true);
      return;
    }

    revealCallbacks.set(node, () => setIsVisible(true));
    observer.observe(node);

    return () => {
      revealCallbacks.delete(node);
      observer.unobserve(node);
    };
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
        transitionProperty: 'opacity, transform',
        transitionDuration: '460ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}
