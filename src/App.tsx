import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react';
import { TopBar } from './components/TopBar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { HeroPrismStage } from './components/HeroPrismStage';
import { ClientLogosSection } from './components/ClientLogosSection';
import { ServicesSection } from './components/ServicesSection';
import { BackToTopButton } from './components/BackToTopButton';
import type { CaseStudy, ServiceId } from './data/studioData';
import {
  registerAudioUnlockListeners,
  triggerInteractivePing,
} from './utils/soundEngine';
import { LocaleProvider } from './i18n/LocaleContext';
import { ThemeProvider, useTheme } from './theme/ThemeContext';

const PortfolioSection = lazy(() =>
  import('./components/PortfolioSection').then((m) => ({
    default: m.PortfolioSection,
  }))
);
const CommunitySection = lazy(() =>
  import('./components/CommunitySection').then((m) => ({
    default: m.CommunitySection,
  }))
);
const InsightsSection = lazy(() =>
  import('./components/InsightsSection').then((m) => ({
    default: m.InsightsSection,
  }))
);
const ProofSection = lazy(() =>
  import('./components/ProofSection').then((m) => ({
    default: m.ProofSection,
  }))
);
const FaqSection = lazy(() =>
  import('./components/FaqSection').then((m) => ({
    default: m.FaqSection,
  }))
);
const ContactSection = lazy(() =>
  import('./components/ContactSection').then((m) => ({
    default: m.ContactSection,
  }))
);
const ProjectModal = lazy(() =>
  import('./components/ProjectModal').then((m) => ({
    default: m.ProjectModal,
  }))
);

function DeferredSection({
  forceMount,
  minHeightClass = 'min-h-[360px]',
  children,
}: {
  forceMount: boolean;
  minHeightClass?: string;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(forceMount);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (forceMount) {
      setMounted(true);
    }
  }, [forceMount]);

  useEffect(() => {
    if (mounted) return;
    const node = sentinelRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '550px 0px' }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) {
    return (
      <div
        ref={sentinelRef}
        className={`section-lazy-paint ${minHeightClass}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <Suspense fallback={<div className={minHeightClass} aria-hidden="true" />}>
      <div className="section-lazy-paint">{children}</div>
    </Suspense>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AppContent />
      </LocaleProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { isLight } = useTheme();
  const [activeServiceId, setActiveServiceId] =
    useState<ServiceId>('web-wordpress');
  const [selectedBriefServices, setSelectedBriefServices] = useState<
    ServiceId[]
  >(['full-stack']);
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [belowFoldReady, setBelowFoldReady] = useState(() => {
    if (typeof window === 'undefined') return true;
    const hash = window.location.hash;
    return Boolean(hash && hash !== '#hero' && hash !== '#partners' && hash !== '#services');
  });

  useEffect(() => {
    return registerAudioUnlockListeners();
  }, []);

  useEffect(() => {
    if (belowFoldReady) return;

    const onHashChange = () => {
      setBelowFoldReady(true);
    };
    window.addEventListener('hashchange', onHashChange);

    const idleWindow = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let idleId = 0;
    let timerId = 0;

    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleId = idleWindow.requestIdleCallback(
        () => setBelowFoldReady(true),
        { timeout: 1100 }
      );
    } else {
      timerId = window.setTimeout(() => setBelowFoldReady(true), 900);
    }

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      if (idleId !== 0 && typeof idleWindow.cancelIdleCallback === 'function') {
        idleWindow.cancelIdleCallback(idleId);
      }
      if (timerId !== 0) {
        window.clearTimeout(timerId);
      }
    };
  }, [belowFoldReady]);

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        triggerInteractivePing({ serviceId: activeServiceId, variant: 'select' });
      }
      return next;
    });
  };

  const scrollToContact = () => {
    setBelowFoldReady(true);
    const attemptScroll = (triesLeft: number) => {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (triesLeft > 0) {
        window.setTimeout(() => attemptScroll(triesLeft - 1), 60);
      }
    };
    attemptScroll(12);
  };

  const handleRequestServiceBrief = (serviceId: ServiceId) => {
    setActiveServiceId(serviceId);
    setSelectedBriefServices((prev) =>
      prev.includes(serviceId) ? prev : [...prev, serviceId]
    );
    scrollToContact();
  };

  const handleToggleBriefService = (serviceId: ServiceId) => {
    setSelectedBriefServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isLight
          ? 'bg-[#f8fafc] text-[#090d16]'
          : 'bg-[#060913] text-slate-100'
      }`}
    >
      <ScrollProgressBar />
      <TopBar onStartProject={scrollToContact} />

      <main>
        <HeroPrismStage
          activeServiceId={activeServiceId}
          soundEnabled={soundEnabled}
          onSelectService={setActiveServiceId}
          onStartProject={scrollToContact}
        />

        {/* Ambient radial depth behind glass sections (outside WebGL hero) */}
        <div className="relative overflow-hidden">
          <div
            className={`pointer-events-none absolute top-32 -left-40 h-[520px] w-[520px] rounded-full blur-[120px] ${
              isLight ? 'bg-sky-400/20' : 'bg-sky-500/8'
            }`}
            aria-hidden="true"
          />
          <div
            className={`pointer-events-none absolute top-[980px] -right-40 h-[560px] w-[560px] rounded-full blur-[130px] ${
              isLight ? 'bg-violet-400/18' : 'bg-violet-500/8'
            }`}
            aria-hidden="true"
          />

          <ClientLogosSection />

          <ServicesSection
            activeServiceId={activeServiceId}
            selectedBriefServices={selectedBriefServices}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onInspectService={setActiveServiceId}
            onRequestServiceBrief={handleRequestServiceBrief}
          />

          <DeferredSection forceMount={belowFoldReady} minHeightClass="min-h-[520px]">
            <PortfolioSection onSelectProject={setSelectedProject} />
          </DeferredSection>

          <DeferredSection forceMount={belowFoldReady} minHeightClass="min-h-[420px]">
            <CommunitySection />
          </DeferredSection>

          <DeferredSection forceMount={belowFoldReady} minHeightClass="min-h-[420px]">
            <InsightsSection />
          </DeferredSection>

          <DeferredSection forceMount={belowFoldReady} minHeightClass="min-h-[360px]">
            <ProofSection />
          </DeferredSection>

          <DeferredSection forceMount={belowFoldReady} minHeightClass="min-h-[420px]">
            <FaqSection />
          </DeferredSection>

          <DeferredSection forceMount={belowFoldReady} minHeightClass="min-h-[520px]">
            <ContactSection
              selectedServices={selectedBriefServices}
              onToggleService={handleToggleBriefService}
            />
          </DeferredSection>
        </div>
      </main>

      <BackToTopButton />

      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onRequestSimilar={handleRequestServiceBrief}
          />
        </Suspense>
      )}
    </div>
  );
}
