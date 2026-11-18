import { useEffect, useRef } from 'react';
import { useTheme, type StudioTheme } from '../theme/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  alpha: number;
  colorIndex: number;
}

const OBSIDIAN_PALETTE = [
  '56, 189, 248', // #38BDF8 ice-blue
  '125, 211, 252', // #7DD3FC light sky
  '139, 92, 246', // #8B5CF6 violet
  '167, 139, 250', // #A78BFA soft violet
];

const LIGHT_PALETTE = [
  '3, 105, 161', // #0369A1 deep sapphire
  '2, 132, 199', // #0284C7 crisp sky
  '109, 40, 217', // #6D28D9 rich violet
  '15, 23, 42', // #0F172A obsidian ink
];

export function HeroParticleCanvas() {
  const { theme } = useTheme();
  const themeRef = useRef<StudioTheme>(theme);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let rafId = 0;
    let isVisible = true;

    const pointer = {
      active: false,
      targetX: 0,
      targetY: 0,
      x: 0,
      y: 0,
    };

    const createParticles = (w: number, h: number): Particle[] => {
      const targetCount = w < 640 ? 30 : w < 1024 ? 56 : 84;
      const list: Particle[] = [];
      for (let i = 0; i < targetCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.14 + Math.random() * 0.28;
        const baseVx = Math.cos(angle) * speed;
        const baseVy = Math.sin(angle) * speed;
        list.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          radius: 1.1 + Math.random() * 1.7,
          alpha: 0.25 + Math.random() * 0.45,
          colorIndex: i % OBSIDIAN_PALETTE.length,
        });
      }
      return list;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const nextW = parent?.clientWidth || window.innerWidth;
      const nextH = parent?.clientHeight || window.innerHeight;
      if (nextW === 0 || nextH === 0) return;

      const maxDpr = nextW < 640 ? 1.5 : 2;
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      width = nextW;
      height = nextH;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        particles = createParticles(width, height);
      } else {
        const expected = width < 640 ? 30 : width < 1024 ? 56 : 84;
        if (Math.abs(particles.length - expected) > 12) {
          particles = createParticles(width, height);
        } else {
          for (const p of particles) {
            if (p.x > width) p.x = Math.random() * width;
            if (p.y > height) p.y = Math.random() * height;
          }
        }
      }

      if (prefersReducedMotion) {
        drawFrame(false);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        pointer.active = false;
        return;
      }

      const nextX = e.clientX - rect.left;
      const nextY = e.clientY - rect.top;
      if (!pointer.active) {
        pointer.x = nextX;
        pointer.y = nextY;
      }
      pointer.targetX = nextX;
      pointer.targetY = nextY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const drawFrame = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      const isLight = themeRef.current === 'light';
      const palette = isLight ? LIGHT_PALETTE : OBSIDIAN_PALETTE;

      if (pointer.active && animate) {
        pointer.x += (pointer.targetX - pointer.x) * 0.16;
        pointer.y += (pointer.targetY - pointer.y) * 0.16;

        // Subtle atmospheric aura around cursor
        const aura = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          170
        );
        if (isLight) {
          aura.addColorStop(0, 'rgba(2, 132, 199, 0.08)');
          aura.addColorStop(0.5, 'rgba(109, 40, 217, 0.04)');
          aura.addColorStop(1, 'rgba(248, 250, 252, 0)');
        } else {
          aura.addColorStop(0, 'rgba(56, 189, 248, 0.085)');
          aura.addColorStop(0.5, 'rgba(139, 92, 246, 0.035)');
          aura.addColorStop(1, 'rgba(6, 9, 19, 0)');
        }
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 170, 0, Math.PI * 2);
        ctx.fill();
      }

      const interactRadius = 155;
      const interactRadiusSq = interactRadius * interactRadius;
      const linkDist = width < 640 ? 92 : 118;
      const linkDistSq = linkDist * linkDist;

      // Update particle positions & cursor reaction
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (animate) {
          if (pointer.active) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const distSq = dx * dx + dy * dy;

            if (distSq > 0.5 && distSq < interactRadiusSq) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / interactRadius) * 0.42;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }

          // Smoothly relax velocity back to natural ambient drift
          p.vx += (p.baseVx - p.vx) * 0.045;
          p.vy += (p.baseVy - p.vy) * 0.045;

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -12) p.x = width + 12;
          else if (p.x > width + 12) p.x = -12;
          if (p.y < -12) p.y = height + 12;
          else if (p.y > height + 12) p.y = -12;
        }
      }

      // Draw crisp constellation links between neighboring particles
      ctx.lineWidth = 0.75;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < linkDistSq) {
            const opacity =
              (1 - Math.sqrt(distSq) / linkDist) * (isLight ? 0.22 : 0.16);
            ctx.strokeStyle = isLight
              ? `rgba(3, 105, 161, ${opacity.toFixed(3)})`
              : `rgba(125, 211, 252, ${opacity.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Draw delicate reactive filaments from cursor to nearby particles
        let boost = 0;
        if (pointer.active && animate) {
          const cdx = a.x - pointer.x;
          const cdy = a.y - pointer.y;
          const cDistSq = cdx * cdx + cdy * cdy;

          if (cDistSq < interactRadiusSq) {
            const cDist = Math.sqrt(cDistSq);
            const strength = 1 - cDist / interactRadius;
            boost = strength * 0.45;
            ctx.strokeStyle = isLight
              ? `rgba(109, 40, 217, ${(strength * 0.34).toFixed(3)})`
              : `rgba(167, 139, 250, ${(strength * 0.28).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(a.x, a.y);
            ctx.stroke();
          }
        }

        // Render particle mote
        const drawAlpha = Math.min(0.92, a.alpha + boost + (isLight ? 0.12 : 0));
        const drawRadius = a.radius + boost * 1.3;
        ctx.fillStyle = `rgba(${palette[a.colorIndex]}, ${drawAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, drawRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const startLoop = () => {
      if (prefersReducedMotion || rafId !== 0 || !isVisible || document.hidden) {
        return;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    let lastFrameMs = 0;

    const tick = (now: number) => {
      rafId = 0;
      if (!isVisible || document.hidden) return;
      const minInterval = width < 768 ? 32 : 0;
      if (minInterval === 0 || now - lastFrameMs >= minInterval) {
        lastFrameMs = now;
        drawFrame(true);
      }
      startLoop();
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave, { passive: true });

    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
