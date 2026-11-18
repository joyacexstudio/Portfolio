const SERVICE_PING_FREQUENCIES: Record<string, number> = {
  'web-wordpress': 659.25, // E5
  'full-stack': 739.99, // F#5
  'ai-apps': 830.61, // G#5
  'landing-pages': 987.77, // B5
  'content-writing': 1108.73, // C#6
  'saas-paas': 1244.51, // D#6
  'ai-customer-care': 1318.51, // E6
  'custom-ai-agent': 1479.98, // F#6
};

let audioCtx: AudioContext | null = null;
let lastPingAt = 0;

function getOrCreateAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (audioCtx) return audioCtx;

  const AudioContextCtor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioContextCtor) return null;

  try {
    audioCtx = new AudioContextCtor({ latencyHint: 'interactive' });
    return audioCtx;
  } catch {
    return null;
  }
}

/**
 * Unlocks Web Audio API cleanly on the first valid browser user gesture
 * (pointerdown, keydown, touchstart, click) without triggering autoplay warnings.
 */
export function unlockAudioEngine(): boolean {
  const ctx = getOrCreateAudioContext();
  if (!ctx) return false;

  if (ctx.state === 'suspended') {
    void ctx.resume().catch(() => {
      // Ignore if browser still requires an active gesture
    });
  }

  return ctx.state === 'running';
}

export function registerAudioUnlockListeners(): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleUnlock = () => {
    const ctx = getOrCreateAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      void ctx.resume().catch(() => {});
    }

    if (ctx.state === 'running') {
      cleanup();
    }
  };

  const cleanup = () => {
    window.removeEventListener('pointerdown', handleUnlock);
    window.removeEventListener('keydown', handleUnlock);
    window.removeEventListener('touchstart', handleUnlock);
    window.removeEventListener('click', handleUnlock);
  };

  window.addEventListener('pointerdown', handleUnlock, { passive: true });
  window.addEventListener('keydown', handleUnlock, { passive: true });
  window.addEventListener('touchstart', handleUnlock, { passive: true });
  window.addEventListener('click', handleUnlock, { passive: true });

  return cleanup;
}

interface PingOptions {
  serviceId?: string;
  volume?: number;
  variant?: 'hover' | 'select';
}

/**
 * Synthesizes an ultra-low-latency "soft tech" crystalline ping using Web Audio API.
 * Uses dual harmonic oscillators + sweeping low-pass filter + smooth 6ms attack
 * so there are zero asset-loading delays and zero harsh digital clicks.
 */
export function playSoftTechPing(options: PingOptions = {}): void {
  const { serviceId = 'web-wordpress', volume = 1, variant = 'hover' } = options;

  if (!audioCtx || audioCtx.state !== 'running') {
    return;
  }

  const nowMs = performance.now();
  if (variant === 'hover' && nowMs - lastPingAt < 48) {
    return;
  }
  lastPingAt = nowMs;

  const baseFreq = SERVICE_PING_FREQUENCIES[serviceId] ?? 783.99;
  const ctx = audioCtx;
  const now = ctx.currentTime;
  const peakGain = Math.min(0.055, Math.max(0.01, 0.038 * volume));
  const duration = variant === 'select' ? 0.19 : 0.145;

  // Fundamental smooth sine body
  const primaryOsc = ctx.createOscillator();
  primaryOsc.type = 'sine';
  primaryOsc.frequency.setValueAtTime(
    variant === 'select' ? baseFreq * 1.122 : baseFreq,
    now
  );
  primaryOsc.frequency.exponentialRampToValueAtTime(
    baseFreq * (variant === 'select' ? 1.25 : 1.03),
    now + duration
  );

  // Soft harmonic shimmer overtone
  const overtoneOsc = ctx.createOscillator();
  overtoneOsc.type = 'triangle';
  overtoneOsc.frequency.setValueAtTime(baseFreq * 2, now);

  const overtoneGain = ctx.createGain();
  overtoneGain.gain.setValueAtTime(0.16, now);

  // Warm frosted-glass low-pass filter sweep
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.Q.setValueAtTime(1.4, now);
  filter.frequency.setValueAtTime(2900, now);
  filter.frequency.exponentialRampToValueAtTime(1050, now + duration);

  // Click-free ADSR amplitude envelope
  const envelope = ctx.createGain();
  envelope.gain.setValueAtTime(0.0001, now);
  envelope.gain.linearRampToValueAtTime(peakGain, now + 0.006);
  envelope.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  primaryOsc.connect(filter);
  overtoneOsc.connect(overtoneGain);
  overtoneGain.connect(filter);
  filter.connect(envelope);
  envelope.connect(ctx.destination);

  primaryOsc.start(now);
  overtoneOsc.start(now);
  primaryOsc.stop(now + duration + 0.015);
  overtoneOsc.stop(now + duration + 0.015);
}

/**
 * Use inside explicit user-activation handlers (click/keydown) to unlock
 * and immediately emit a confirmation ping if needed.
 */
export function triggerInteractivePing(options: PingOptions = {}): void {
  const ctx = getOrCreateAudioContext();
  if (!ctx) return;

  if (ctx.state === 'running') {
    playSoftTechPing(options);
    return;
  }

  void ctx
    .resume()
    .then(() => {
      if (ctx.state === 'running') {
        playSoftTechPing(options);
      }
    })
    .catch(() => {});
}
