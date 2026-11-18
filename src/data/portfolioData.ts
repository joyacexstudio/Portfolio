import fullStackImg from '../assets/images/case_fullstack_architecture_1794768562197.jpg';
import aiStudioImg from '../assets/images/case_ai_copilot_studio_1794768560089.jpg';
import wordpressImg from '../assets/images/case_wordpress_editorial_1794768561941.jpg';
import landingImg from '../assets/images/case_landing_conversion_1794768563804.jpg';
import contentImg from '../assets/images/case_content_authority_1794768561327.jpg';
import fintechImg from '../assets/images/case_fintech_ledger_1794770225116.jpg';
import aiVoiceImg from '../assets/images/case_ai_voice_agent_1794770225185.jpg';
import wpCommerceImg from '../assets/images/case_wp_commerce_1794770224861.jpg';
import edgeLaunchImg from '../assets/images/case_edge_launch_1794770225967.jpg';
import technicalDocsImg from '../assets/images/case_technical_docs_1794770226173.jpg';
import wpPortalImg from '../assets/images/case_wp_portal_1794770452876.jpg';
import fullstackMeshImg from '../assets/images/case_fullstack_mesh_1794770453117.jpg';
import aiVisionImg from '../assets/images/case_ai_vision_lab_1794770453735.jpg';
import landingVelocityImg from '../assets/images/case_landing_velocity_1794770454194.jpg';
import contentFoundryImg from '../assets/images/case_content_foundry_1794770455242.jpg';
import cyberSocImg from '../assets/images/case_cyber_soc_1794771184586.jpg';
import climateGridImg from '../assets/images/case_climate_grid_1794772388807.jpg';
import proptechSpatialImg from '../assets/images/case_proptech_spatial_1794771184901.jpg';
import aiCareOmniImg from '../assets/images/case_ai_care_omni_1794771187332.jpg';
import customAgentOpsImg from '../assets/images/case_custom_agent_ops_1794771186641.jpg';
import type { CaseStudy } from './studioData';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'velox-cloud-telemetry',
    title: 'Velox Cloud Telemetry Portal',
    client: 'Velox Infrastructure',
    industry: 'Cloud Infrastructure',
    serviceId: 'full-stack',
    categoryLabel: 'Full Stack Development',
    year: '2026',
    impactMetric: '42% faster deployment diagnostics across 18 engineering teams',
    summary:
      'End-to-end observability cockpit and multi-tenant billing platform engineered from PostgreSQL schema design to real-time client visualizations.',
    challenge:
      'Velox needed to unify fragmented cluster logs, usage billing, and incident workflows inside a responsive single-pane web application.',
    solution:
      'Built a strict TypeScript monorepo with streaming WebSocket metrics, role-based workspace permissions, and zero-jank canvas charting.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'WebSockets'],
    image: fullStackImg,
    featured: true,
  },
  {
    id: 'opticore-ai-workspace',
    title: 'Opticore Knowledge & Support Copilot',
    client: 'Opticore Labs',
    industry: 'Enterprise Developer Tools',
    serviceId: 'ai-apps',
    categoryLabel: 'AI App & Website Development',
    year: '2026',
    impactMetric: '64% reduction in repetitive Tier-1 support tickets within 90 days',
    summary:
      'Context-aware AI research assistant and automated onboarding triage embedded directly into Opticore’s customer portal.',
    challenge:
      'Enterprise buyers struggled to navigate 400+ pages of technical SDK documentation during onboarding.',
    solution:
      'Integrated grounded semantic retrieval with citation-linked responses, structured JSON form extraction, and human handoff triggers.',
    stack: ['Gemini API', 'TypeScript', 'Vector Index', 'React'],
    image: aiStudioImg,
  },
  {
    id: 'monolith-press-network',
    title: 'Monolith Design & Editorial Hub',
    client: 'Monolith Collective',
    industry: 'Digital Media & Publishing',
    serviceId: 'web-wordpress',
    categoryLabel: 'Web & WordPress Development',
    year: '2025',
    impactMetric: '99 Lighthouse performance score and 3x faster editorial publishing',
    summary:
      'Headless WordPress editorial architecture giving non-technical writers modular layout control backed by static edge delivery.',
    challenge:
      'Their legacy monolithic theme suffered 4.8-second mobile load times and rigid page templates.',
    solution:
      'Engineered custom Gutenberg content blocks paired with an edge-cached React front end and clean media compression pipeline.',
    stack: ['WordPress', 'WPGraphQL', 'Next.js', 'Tailwind CSS'],
    image: wordpressImg,
  },
  {
    id: 'aurora-launch-funnel',
    title: 'Aurora Series-A Product Launch',
    client: 'Aurora Compute',
    industry: 'Distributed Compute',
    serviceId: 'landing-pages',
    categoryLabel: 'Landing Pages',
    year: '2026',
    impactMetric: '+168% qualified demo bookings in the first 60 days post-launch',
    summary:
      'Interactive 3D launch experience and conversion-focused landing funnel built for Aurora’s developer platform debut.',
    challenge:
      'Complex distributed compute positioning caused high bounce rates on their previous generic SaaS template.',
    solution:
      'Crafted an interactive product narrative with live benchmark sliders, crisp above-the-fold clarity, and frictionless brief capture.',
    stack: ['Three.js', 'React', 'Motion', 'Conversion Analytics'],
    image: landingImg,
  },
  {
    id: 'kinetix-authority-engine',
    title: 'Kinetix Organic Authority & Docs',
    client: 'Kinetix Robotics',
    industry: 'Robotics & Hardware',
    serviceId: 'content-writing',
    categoryLabel: 'Content Writing',
    year: '2025',
    impactMetric: '+210% organic search impressions across 28 high-intent keywords',
    summary:
      'Technical storytelling, search-intent editorial architecture, and developer onboarding guides that positioned Kinetix as a category leader.',
    challenge:
      'Brilliant hardware engineering was undermined by inconsistent product messaging and thin search visibility.',
    solution:
      'Developed an executive voice playbook, deep-dive engineering case studies, and structured technical SEO documentation.',
    stack: ['Technical SEO', 'Editorial Strategy', 'Product Copy', 'Information Architecture'],
    image: contentImg,
  },
  {
    id: 'finpulse-treasury-workspace',
    title: 'FinPulse Real-Time Treasury Ledger',
    client: 'FinPulse Capital',
    industry: 'FinTech & Treasury',
    serviceId: 'full-stack',
    categoryLabel: 'Full Stack Development',
    year: '2026',
    impactMetric: '99.98% reconciliation accuracy & 3.1x faster month-end close',
    summary:
      'Multi-currency liquidity platform and automated audit ledger engineered with event-sourced PostgreSQL pipelines and instant cashflow modeling.',
    challenge:
      'Finance operators reconciled 14 banking APIs via brittle spreadsheets that delayed executive cash forecasting by days.',
    solution:
      'Built an idempotent ingestion engine, encrypted tenant isolation, and interactive glassmorphic cashflow scenario charts.',
    stack: ['TypeScript', 'React', 'PostgreSQL', 'Redis Streams'],
    image: fintechImg,
    featured: true,
  },
  {
    id: 'aether-voice-triage',
    title: 'Aether Clinic AI Triage & Intake',
    client: 'Aether Health Systems',
    industry: 'HealthTech & Clinical Ops',
    serviceId: 'ai-apps',
    categoryLabel: 'AI App & Website Development',
    year: '2026',
    impactMetric: '71% faster patient intake & 4.9/5 scheduling clarity rating',
    summary:
      'Conversational intake assistant and intelligent appointment routing workflow tailored for multi-specialty outpatient networks.',
    challenge:
      'Front-desk staff were overwhelmed by manual pre-screening calls and misrouted specialist bookings.',
    solution:
      'Engineered deterministic clinical guardrails, structured EHR symptom summaries, and instant clinician escalation triggers.',
    stack: ['Gemini API', 'Python', 'TypeScript', 'WebSockets'],
    image: aiVoiceImg,
  },
  {
    id: 'veridian-editorial-commerce',
    title: 'Veridian Architectural Commerce Hub',
    client: 'Veridian Objects',
    industry: 'Luxury Retail & D2C',
    serviceId: 'web-wordpress',
    categoryLabel: 'Web & WordPress Development',
    year: '2026',
    impactMetric: '+84% mobile checkout completion & 0.7s LCP storefront speed',
    summary:
      'Headless WordPress & WooCommerce flagship blending long-form material storytelling with instantaneous filtered catalog browsing.',
    challenge:
      'Legacy storefront plugins caused 5-second cart transitions and broke custom trade-pricing workflows.',
    solution:
      'Decoupled WooCommerce REST/GraphQL endpoints behind a React edge front end with custom editorial Gutenberg lookbooks.',
    stack: ['WordPress', 'WooCommerce', 'Next.js', 'WPGraphQL'],
    image: wpCommerceImg,
  },
  {
    id: 'solstice-edge-launch',
    title: 'Solstice Edge DB Launch Campaign',
    client: 'Solstice Data',
    industry: 'Database & Edge Cloud',
    serviceId: 'landing-pages',
    categoryLabel: 'Landing Pages',
    year: '2026',
    impactMetric: '11.4% visitor-to-sandbox conversion across 42k launch visits',
    summary:
      'Interactive 3D product tour and live latency benchmark landing page built to convert technical founders during launch week.',
    challenge:
      'Developers bounced off static feature checklists without understanding regional read-replica performance gains.',
    solution:
      'Paired a WebGL refractive node stage with interactive SQL latency comparisons and one-click developer brief capture.',
    stack: ['React', 'Three.js', 'Tailwind CSS', 'PostHog'],
    image: edgeLaunchImg,
  },
  {
    id: 'strata-cloud-playbook',
    title: 'Strata Developer Docs & Authority Hub',
    client: 'Strata Cloud',
    industry: 'Cloud Infrastructure',
    serviceId: 'content-writing',
    categoryLabel: 'Content Writing',
    year: '2026',
    impactMetric: '+145% organic enterprise leads from technical migration guides',
    summary:
      'Full-funnel technical content architecture spanning SDK tutorials, comparison briefings, and search-validated whitepapers.',
    challenge:
      'Prospective enterprise architects lacked trustworthy migration blueprints to evaluate Strata against incumbent cloud vendors.',
    solution:
      'Created benchmarked migration playbooks, clear API reference copy, and high-converting solution briefs.',
    stack: ['Technical Writing', 'Search Intent SEO', 'Developer Docs', 'Brand Voice'],
    image: technicalDocsImg,
  },
  // Block 3 (indices 10-14)
  {
    id: 'meridian-mesh-control',
    title: 'Meridian Distributed Edge Mesh',
    client: 'Meridian Compute',
    industry: 'Edge Compute',
    serviceId: 'full-stack',
    categoryLabel: 'Full Stack Development',
    year: '2026',
    impactMetric: '38% lower cross-region p99 latency & zero-downtime rollouts',
    summary:
      'Control-plane orchestration portal managing 4,200 edge nodes with live topology maps, RBAC audit logs, and automated canary rollbacks.',
    challenge:
      'Platform engineers lacked a unified interface to inspect multi-region packet routing and rollout health.',
    solution:
      'Architected a Go + TypeScript control API paired with a streaming React topology console and strict RBAC policies.',
    stack: ['TypeScript', 'React', 'Go', 'PostgreSQL'],
    image: fullstackMeshImg,
    featured: true,
  },
  {
    id: 'lumen-qa-vision',
    title: 'Lumen Optical Defect Classifier',
    client: 'Lumen Precision Mfg',
    industry: 'Semiconductor Manufacturing',
    serviceId: 'ai-apps',
    categoryLabel: 'AI App & Website Development',
    year: '2026',
    impactMetric: '99.4% defect recall & 4.2x faster factory QA sign-off',
    summary:
      'Multimodal visual inspection web app analyzing high-resolution PCB imagery with instant root-cause tagging and operator feedback.',
    challenge:
      'Manual microscopy inspections created costly production bottlenecks and inconsistent shift-to-shift defect notes.',
    solution:
      'Deployed vision-grounded classification with confidence thresholds, bounding review queues, and batch export reports.',
    stack: ['Gemini Vision', 'Python', 'FastAPI', 'React'],
    image: aiVisionImg,
  },
  {
    id: 'nordic-press-multisite',
    title: 'Nordic Civic Publishing Network',
    client: 'Nordic Media Group',
    industry: 'Civic & News Media',
    serviceId: 'web-wordpress',
    categoryLabel: 'Web & WordPress Development',
    year: '2025',
    impactMetric: '12 regional newsrooms unified & 98 Core Web Vitals score',
    summary:
      'Enterprise WordPress Multisite ecosystem supporting localized editorial desks, paywall metering, and instant edge cache purging.',
    challenge:
      'Twelve disconnected regional sites duplicated editorial effort and failed under breaking-news traffic spikes.',
    solution:
      'Consolidated onto a shared Gutenberg design system with automated Cloudflare edge invalidation and schema SEO.',
    stack: ['WordPress Multisite', 'PHP 8', 'Next.js', 'Cloudflare'],
    image: wpPortalImg,
  },
  {
    id: 'vectra-preseed-reveal',
    title: 'Vectra Robotics Pre-Seed Reveal',
    client: 'Vectra Autonomy',
    industry: 'Autonomous Logistics',
    serviceId: 'landing-pages',
    categoryLabel: 'Landing Pages',
    year: '2026',
    impactMetric: '14.8% investor & pilot request conversion in 30 days',
    summary:
      'High-velocity product reveal landing experience translating autonomous warehouse telemetry into an intuitive executive narrative.',
    challenge:
      'Enterprise logistics buyers could not visualize ROI metrics from dense PDF spec sheets.',
    solution:
      'Engineered an interactive throughput calculator, glassmorphic showcase sections, and gated pilot onboarding.',
    stack: ['React', 'Tailwind CSS', 'Three.js', 'HubSpot API'],
    image: landingVelocityImg,
  },
  {
    id: 'foundry-api-narrative',
    title: 'Foundry Payment Rail Content Engine',
    client: 'Foundry Clearing',
    industry: 'Payment Infrastructure',
    serviceId: 'content-writing',
    categoryLabel: 'Content Writing',
    year: '2026',
    impactMetric: '+185% organic signups across compliance & treasury queries',
    summary:
      'Search-validated B2B editorial hub pairing regulatory explainers with hands-on webhook integration walkthroughs.',
    challenge:
      'Competing fintech blogs published generic glossaries that failed to convert senior engineering evaluators.',
    solution:
      'Produced deeply researched clearing architecture briefs, interactive code annotations, and conversion-tuned CTAs.',
    stack: ['Technical SEO', 'Fintech Copy', 'API Guides', 'Editorial Ops'],
    image: contentFoundryImg,
  },
  // Block 4 (indices 15-19)
  {
    id: 'covalent-biotech-lims',
    title: 'Covalent Lab Sample & Assay Suite',
    client: 'Covalent Genomics',
    industry: 'Biotech & Genomics',
    serviceId: 'full-stack',
    categoryLabel: 'Full Stack Development',
    year: '2026',
    impactMetric: '56% faster wet-lab chain-of-custody tracking',
    summary:
      'Full-stack laboratory information portal tracking sample plates, barcode scans, and automated QC report generation.',
    challenge:
      'Research teams toggled between five legacy desktop tools and manual CSV uploads during high-throughput runs.',
    solution:
      'Built an offline-resilient barcode queue, strict audit-trail Postgres tables, and role-scoped scientist dashboards.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    image: fullStackImg,
    featured: true,
  },
  {
    id: 'nexus-legal-briefing-ai',
    title: 'Nexus Contract Clause Reviewer',
    client: 'Nexus Counsel',
    industry: 'LegalTech',
    serviceId: 'ai-apps',
    categoryLabel: 'AI App & Website Development',
    year: '2026',
    impactMetric: '68% reduction in initial NDA & MSA redline turnaround',
    summary:
      'Private clause-benchmarking copilot comparing incoming vendor agreements against approved legal playbooks with inline citations.',
    challenge:
      'Commercial attorneys spent hours manually cross-referencing indemnity and SLA deviations across PDFs.',
    solution:
      'Implemented structured risk scoring, side-by-side diff highlights, and zero-retention local document parsing.',
    stack: ['Gemini API', 'TypeScript', 'Vector Search', 'React'],
    image: aiStudioImg,
  },
  {
    id: 'atelier-architecture-wp',
    title: 'Atelier Spatial Portfolio & CMS',
    client: 'Atelier Vane Architects',
    industry: 'Architecture & Design',
    serviceId: 'web-wordpress',
    categoryLabel: 'Web & WordPress Development',
    year: '2025',
    impactMetric: '0.6s visual gallery loads & +92% press inquiry submissions',
    summary:
      'Bespoke headless WordPress monograph showcasing architectural drawings with adaptive responsive AVIF/WebP delivery.',
    challenge:
      'High-resolution project monographs stalled mobile visitors and required developer tickets for every gallery update.',
    solution:
      'Crafted modular drag-and-drop project story blocks with automated responsive srcset pipelines.',
    stack: ['WordPress', 'WPGraphQL', 'React', 'Tailwind CSS'],
    image: wordpressImg,
  },
  {
    id: 'pulse-devtools-waitlist',
    title: 'Pulse Profiler Pro Waitlist Funnel',
    client: 'Pulse Systems',
    industry: 'Developer Observability',
    serviceId: 'landing-pages',
    categoryLabel: 'Landing Pages',
    year: '2026',
    impactMetric: '9,400 qualified developer signups at 19.2% conversion',
    summary:
      'Conversion-engineered developer tool launch page featuring live flamegraph previews and instant team referral tracking.',
    challenge:
      'Early launch traffic dropped off at a generic signup wall without clear differentiation from open-source profilers.',
    solution:
      'Designed focused before/after benchmark panels, crisp microcopy, and frictionless waitlist verification.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Analytics'],
    image: landingImg,
  },
  {
    id: 'helio-climate-reports',
    title: 'Helio Grid Decarbonization Reports',
    client: 'Helio Energy Analytics',
    industry: 'CleanTech & Energy',
    serviceId: 'content-writing',
    categoryLabel: 'Content Writing',
    year: '2025',
    impactMetric: '3.8x whitepaper downloads & 44 enterprise press citations',
    summary:
      'Data-driven industry whitepapers, executive op-eds, and search-intent landing copy translating grid telemetry for utility buyers.',
    challenge:
      'Complex megawatt forecasting models failed to resonate with municipal policy decision-makers.',
    solution:
      'Synthesized engineering datasets into crisp executive briefs and high-authority organic pillar pages.',
    stack: ['Executive Copy', 'Technical SEO', 'Research Synthesis', 'UX Copy'],
    image: contentImg,
  },
  // Block 5 (indices 20-24)
  {
    id: 'atlas-freight-dispatch',
    title: 'Atlas Intermodal Dispatch Console',
    client: 'Atlas Logistics',
    industry: 'Supply Chain & Freight',
    serviceId: 'full-stack',
    categoryLabel: 'Full Stack Development',
    year: '2026',
    impactMetric: '29% fewer empty miles & sub-second route re-assignment',
    summary:
      'Real-time fleet dispatch application unifying carrier bidding, GPS telemetry, and automated customs documentation.',
    challenge:
      'Dispatch coordinators managed live port delays across fragmented email threads and static spreadsheets.',
    solution:
      'Built WebSocket live status boards, automated exception alerts, and transactional invoice settlement.',
    stack: ['TypeScript', 'React', 'Node.js', 'WebSockets'],
    image: fintechImg,
    featured: true,
  },
  {
    id: 'synthesis-edu-tutor',
    title: 'Synthesis Adaptive Cohort Mentor',
    client: 'Synthesis Learning Hub',
    industry: 'EdTech & Learning',
    serviceId: 'ai-apps',
    categoryLabel: 'AI App & Website Development',
    year: '2026',
    impactMetric: '+47% course completion & 91% learner satisfaction score',
    summary:
      'Interactive Socratic coding mentor guiding cohort learners through TypeScript exercises with targeted hints rather than spoilers.',
    challenge:
      'Generic chatbots handed out full answers, undermining student retention during weekend build sprints.',
    solution:
      'Tuned multi-step pedagogical prompts, test-suite verification hooks, and instructor escalation dashboards.',
    stack: ['Gemini API', 'React', 'Node.js', 'PostgreSQL'],
    image: aiVoiceImg,
  },
  {
    id: 'harbor-academy-wp',
    title: 'Harbor Maritime Training Portal',
    client: 'Harbor Academy',
    industry: 'Maritime & Training',
    serviceId: 'web-wordpress',
    categoryLabel: 'Web & WordPress Development',
    year: '2025',
    impactMetric: '2.7x faster course enrollment & WCAG 2.1 AA compliance',
    summary:
      'Accessible WordPress + LMS platform managing certification cohorts, instructor bios, and automated seat reservations.',
    challenge:
      'Outdated course tables broke on mobile devices and caused 40% abandonment during registration.',
    solution:
      'Rebuilt enrollment flows with custom Gutenberg course cards, calendar sync, and accessible keyboard navigation.',
    stack: ['WordPress', 'LearnDash', 'TypeScript', 'Tailwind CSS'],
    image: wpCommerceImg,
  },
  {
    id: 'orbit-security-audit-lp',
    title: 'Orbit Zero-Trust Audit Landing Page',
    client: 'Orbit Cyber',
    industry: 'Cybersecurity',
    serviceId: 'landing-pages',
    categoryLabel: 'Landing Pages',
    year: '2026',
    impactMetric: '+134% CISO assessment bookings within 45 days',
    summary:
      'Enterprise conversion funnel featuring an interactive posture readiness checklist and tailored compliance scope estimator.',
    challenge:
      'Security buyers hesitated to book discovery calls due to vague agency positioning.',
    solution:
      'Structured clear SOC2/ISO deliverable breakdowns, social proof strips, and instant scoping brief generation.',
    stack: ['React', 'Tailwind CSS', 'TypeScript', 'Conversion UX'],
    image: edgeLaunchImg,
  },
  {
    id: 'bento-sdk-changelog-hub',
    title: 'Bento Cloud Release & Docs System',
    client: 'Bento Infrastructure',
    industry: 'Developer Infrastructure',
    serviceId: 'content-writing',
    categoryLabel: 'Content Writing',
    year: '2026',
    impactMetric: '52% drop in onboarding friction & +160% docs organic traffic',
    summary:
      'End-to-end developer documentation overhaul, structured release changelogs, and getting-started quickstarts.',
    challenge:
      'Rapid weekly releases left SDK guides out of sync with actual CLI flags and environment variables.',
    solution:
      'Established docs-as-code editorial reviews, crystal-clear error playbooks, and search-ranked tutorials.',
    stack: ['Developer Docs', 'Technical SEO', 'UX Microcopy', 'Docs-as-Code'],
    image: technicalDocsImg,
  },
  // Block 6 (indices 25-29)
  {
    id: 'vanguard-creator-royalties',
    title: 'Vanguard Creator Royalty Exchange',
    client: 'Vanguard Digital Rights',
    industry: 'Creator Economy & Licensing',
    serviceId: 'full-stack',
    categoryLabel: 'Full Stack Development',
    year: '2026',
    impactMetric: '$18M+ payouts reconciled with zero ledger discrepancies',
    summary:
      'High-trust creator payout and licensing portal automating split-sheet royalties, tax forms, and instant statement exports.',
    challenge:
      'Independent creators waited 60 days for quarterly CSV breakdowns due to manual accounting bottlenecks.',
    solution:
      'Implemented deterministic ledger splits, Stripe Connect payouts, and real-time earnings glass dashboards.',
    stack: ['React', 'TypeScript', 'PostgreSQL', 'Stripe Connect'],
    image: fullstackMeshImg,
    featured: true,
  },
  {
    id: 'echo-support-router',
    title: 'Echo Multilingual Ticket Intelligence',
    client: 'Echo Commerce',
    industry: 'Global E-Commerce',
    serviceId: 'ai-apps',
    categoryLabel: 'AI App & Website Development',
    year: '2026',
    impactMetric: '78% first-contact resolution across 9 storefront languages',
    summary:
      'Real-time order-context AI agent drafting verified refund, shipping, and warranty resolutions inside Zendesk.',
    challenge:
      'Seasonal volume surges tripled response times across European and APAC storefront regions.',
    solution:
      'Connected live carrier APIs to grounded response templates with automatic tone and policy validation.',
    stack: ['Gemini API', 'Python', 'TypeScript', 'REST Webhooks'],
    image: aiVisionImg,
  },
  {
    id: 'solis-venture-collective',
    title: 'Solis Venture Collective Flagship',
    client: 'Solis Ventures',
    industry: 'Venture Capital',
    serviceId: 'web-wordpress',
    categoryLabel: 'Web & WordPress Development',
    year: '2025',
    impactMetric: '99 Lighthouse score & 4x faster founder thesis publishing',
    summary:
      'Editorial-grade WordPress investment flagship featuring filterable portfolio directories and interactive founder essays.',
    challenge:
      'Partners relied on external agencies for every portfolio update and quarterly memo publication.',
    solution:
      'Delivered custom ACF/Gutenberg portfolio blocks paired with static-cached React routing.',
    stack: ['WordPress', 'WPGraphQL', 'React', 'Tailwind CSS'],
    image: wpPortalImg,
  },
  {
    id: 'kora-audio-hardware-lp',
    title: 'Kora Studio Monitor Launch Page',
    client: 'Kora Acoustics',
    industry: 'Pro Audio Hardware',
    serviceId: 'landing-pages',
    categoryLabel: 'Landing Pages',
    year: '2026',
    impactMetric: '3,200 launch-week pre-orders & 4m 12s avg. engagement',
    summary:
      'Interactive acoustic frequency showcase and hardware pre-order landing experience built for audio engineers.',
    challenge:
      'Listeners needed to feel engineering precision online before committing to flagship studio monitors.',
    solution:
      'Crafted interactive room-calibration sliders, tactile glass spec cards, and streamlined pre-order checkout.',
    stack: ['React', 'Three.js', 'Web Audio API', 'Tailwind CSS'],
    image: landingVelocityImg,
  },
  {
    id: 'quorum-governance-briefs',
    title: 'Quorum Enterprise Trust & SEO Center',
    client: 'Quorum Governance',
    industry: 'Enterprise Governance',
    serviceId: 'content-writing',
    categoryLabel: 'Content Writing',
    year: '2026',
    impactMetric: '+195% qualified enterprise RFPs from organic search pillars',
    summary:
      'Authoritative B2B thought-leadership library, security trust narratives, and conversion-focused solution pages.',
    challenge:
      'Procurement teams struggled to differentiate Quorum’s governance controls from legacy GRC vendors.',
    solution:
      'Built persona-targeted comparison matrices, crisp landing headlines, and verifiable customer proof briefs.',
    stack: ['B2B Storytelling', 'Technical SEO', 'Conversion Copy', 'Case Studies'],
    image: contentFoundryImg,
  },
  // Block 7 (indices 30-34): SaaS & PaaS, AI Customer Care Agent, Custom AI Agent
  {
    id: 'clario-cloud-paas',
    title: 'Clario Developer PaaS Control Plane',
    client: 'Clario Cloud Systems',
    industry: 'Cloud PaaS',
    serviceId: 'saas-paas',
    categoryLabel: 'SaaS/PaaS Solutions',
    year: '2026',
    impactMetric: '4.5x faster workspace provisioning & +58% paid tier conversion',
    summary:
      'Self-serve PaaS deployment console enabling engineering teams to spin up isolated preview environments, secrets, and usage quotas in seconds.',
    challenge:
      'Enterprise prospects waited days for DevOps engineers to manually provision sandbox tenants during evaluations.',
    solution:
      'Engineered an automated control-plane API, usage-based Stripe metering, and real-time tenant health dashboards.',
    stack: ['TypeScript', 'React', 'PostgreSQL', 'Kubernetes API'],
    image: fullstackMeshImg,
    featured: true,
  },
  {
    id: 'pulseflow-b2b-saas',
    title: 'PulseFlow Multi-Tenant Revenue SaaS',
    client: 'PulseFlow Software',
    industry: 'B2B Revenue SaaS',
    serviceId: 'saas-paas',
    categoryLabel: 'SaaS/PaaS Solutions',
    year: '2026',
    impactMetric: '99.99% tenant uptime & 62% higher annual plan upgrades',
    summary:
      'End-to-end subscription SaaS platform combining SSO enterprise onboarding, role-scoped analytics, and automated seat expansion.',
    challenge:
      'Early single-tenant deployments made feature rollouts slow and prevented self-serve upgrade flows.',
    solution:
      'Architected row-level tenant isolation, SAML/SSO support, and frictionless in-app billing upgrades.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe Billing'],
    image: fintechImg,
  },
  {
    id: 'haven-care-desk-ai',
    title: 'Haven 24/7 AI Customer Care Concierge',
    client: 'Haven Home Retail',
    industry: 'E-Commerce Retail',
    serviceId: 'ai-customer-care',
    categoryLabel: 'AI Customer Care Agent',
    year: '2026',
    impactMetric: '81% instant ticket resolution & +34% repeat purchase rate',
    summary:
      'Policy-aware AI customer care agent handling live order tracking, warranty claims, and return authorizations across web and email.',
    challenge:
      'High seasonal ticket queues left customers waiting 36 hours for straightforward delivery and exchange answers.',
    solution:
      'Connected Shopify & carrier APIs with grounded brand tone policies and instant warm escalation for complex cases.',
    stack: ['Gemini API', 'RAG Grounding', 'TypeScript', 'Helpdesk Webhooks'],
    image: aiCareOmniImg,
  },
  {
    id: 'relay-saas-support-agent',
    title: 'Relay SaaS Onboarding & Care Agent',
    client: 'Relay Workspace',
    industry: 'Enterprise SaaS',
    serviceId: 'ai-customer-care',
    categoryLabel: 'AI Customer Care Agent',
    year: '2026',
    impactMetric: '69% fewer escalated billing tickets & 96% CSAT score',
    summary:
      'In-app AI customer care specialist walking workspace admins through billing, permissions, and live troubleshooting.',
    challenge:
      'Non-technical admins frequently opened duplicate support tickets during team rollouts.',
    solution:
      'Built context-aware help chat reading live workspace settings (with permission) to guide fixes step-by-step.',
    stack: ['Gemini API', 'React', 'WebSockets', 'Zendesk API'],
    image: aiStudioImg,
  },
  {
    id: 'kestrel-sales-ops-agent',
    title: 'Kestrel Autonomous Revenue Ops Agent',
    client: 'Kestrel B2B',
    industry: 'B2B Revenue Operations',
    serviceId: 'custom-ai-agent',
    categoryLabel: 'Custom AI Agents',
    year: '2026',
    impactMetric: '18 hrs/week saved per rep & 2.6x faster lead conversion',
    summary:
      'Bespoke business AI agent researching inbound accounts, drafting tailored solution briefs, and syncing structured notes into HubSpot.',
    challenge:
      'Account executives lost hours manually researching prospect tech stacks before every discovery call.',
    solution:
      'Created a multi-step tool-calling agent with CRM write approvals, citation links, and Slack daily briefings.',
    stack: ['Gemini API', 'Function Calling', 'Python', 'HubSpot API'],
    image: customAgentOpsImg,
  },
  // Block 8 (indices 35-39)
  {
    id: 'ironclad-erp-custom-agent',
    title: 'Ironclad Procurement & Vendor AI Agent',
    client: 'Ironclad Supply',
    industry: 'Manufacturing & ERP',
    serviceId: 'custom-ai-agent',
    categoryLabel: 'Custom AI Agents',
    year: '2026',
    impactMetric: '74% faster PO reconciliation & zero duplicate invoice approvals',
    summary:
      'Custom internal AI operations agent cross-checking supplier invoices, purchase orders, and SLA terms before ERP posting.',
    challenge:
      'Finance specialists manually audited hundreds of multi-line PDF supplier invoices each week.',
    solution:
      'Engineered structured schema extraction, discrepancy flagging, and human sign-off queues inside their internal portal.',
    stack: ['Gemini API', 'Structured JSON', 'Node.js', 'PostgreSQL'],
    image: edgeLaunchImg,
    featured: true,
  },
  {
    id: 'aegis-zerotrust-saas',
    title: 'Aegis Zero-Trust Cloud Vault',
    client: 'Aegis Security Inc.',
    industry: 'Cybersecurity',
    serviceId: 'saas-paas',
    categoryLabel: 'SaaS/PaaS Solutions',
    year: '2026',
    impactMetric: '3.2x enterprise trial-to-paid conversion & <15m SOC2 onboarding',
    summary:
      'Multi-tenant secrets management SaaS with hardware-backed key rotation, ephemeral access tokens, and live compliance posture audits.',
    challenge:
      'DevSecOps evaluators abandoned complex self-hosted vault trials before completing their first production cluster integration.',
    solution:
      'Delivered an instant browser CLI onboarding wizard, automated Terraform modules, and metered workspace billing.',
    stack: ['TypeScript', 'Go', 'PostgreSQL', 'Terraform Provider'],
    image: cyberSocImg,
  },
  {
    id: 'heliosgrid-dispatch-platform',
    title: 'HeliosGrid Megawatt Dispatch Portal',
    client: 'HeliosGrid Renewables',
    industry: 'CleanTech & Renewables',
    serviceId: 'full-stack',
    categoryLabel: 'Full Stack Development',
    year: '2026',
    impactMetric: '+64% commercial PPA close rate & sub-second grid telemetry sync',
    summary:
      'Full-stack renewable generation and battery dispatch console forecasting nodal pricing across wind and solar microgrids.',
    challenge:
      'Energy buyers lacked transparent real-time curtailment forecasts during power purchase agreement negotiations.',
    solution:
      'Architected TimescaleDB telemetry ingestion, interactive glass dispatch curves, and client-facing PPA proposal builders.',
    stack: ['React', 'Node.js', 'TimescaleDB', 'WebSockets'],
    image: climateGridImg,
  },
  {
    id: 'crestline-spatial-leasing',
    title: 'Crestline Spatial Tower Pre-Lease Hub',
    client: 'Crestline Properties',
    industry: 'PropTech & Real Estate',
    serviceId: 'landing-pages',
    categoryLabel: 'Landing Pages',
    year: '2026',
    impactMetric: '16.4% visitor-to-tour conversion & +240% qualified broker leads',
    summary:
      'Interactive 3D commercial leasing showcase allowing prospective tenants to inspect floorplates, daylight angles, and buildout specs.',
    challenge:
      'Static PDF brochures failed to differentiate Class-A smart office suites during pre-construction leasing.',
    solution:
      'Built frosted spatial floorplan overlays, square-footage ROI estimators, and instant broker tour scheduling.',
    stack: ['React', 'Three.js', 'Tailwind CSS', 'CRM Webhooks'],
    image: proptechSpatialImg,
  },
  {
    id: 'clearclaim-insurtech-care',
    title: 'ClearClaim 24/7 Policy & Claims Agent',
    client: 'ClearClaim Insurance',
    industry: 'InsurTech',
    serviceId: 'ai-customer-care',
    categoryLabel: 'AI Customer Care Agent',
    year: '2026',
    impactMetric: '79% instant FNOL claim triage & +41% policy renewal conversion',
    summary:
      'Empathetic AI customer care concierge guiding policyholders through coverage checks, photo uploads, and instant payout tracking.',
    challenge:
      'Storm-season surges created 4-day claims call hold times that drove avoidable policy cancellations.',
    solution:
      'Integrated multimodal damage photo verification, policy PDF grounding, and immediate adjuster escalation triggers.',
    stack: ['Gemini Vision', 'TypeScript', 'RAG Grounding', 'Twilio API'],
    image: aiCareOmniImg,
  },
  // Block 9 (indices 40-44)
  {
    id: 'synapse-regulatory-dossier-agent',
    title: 'Synapse Clinical Dossier AI Agent',
    client: 'Synapse BioPharma',
    industry: 'Biotech & Pharma',
    serviceId: 'custom-ai-agent',
    categoryLabel: 'Custom AI Agents',
    year: '2026',
    impactMetric: '5.4x faster IND submission prep & 99.6% citation accuracy',
    summary:
      'Custom regulatory AI agent cross-referencing preclinical trial tables, toxicology logs, and FDA submission templates with audit trails.',
    challenge:
      'Medical writers spent weeks manually reconciling numerical drift across appendices before regulatory filings.',
    solution:
      'Built deterministic cross-document verification tools, locked source citations, and side-by-side reviewer sign-off.',
    stack: ['Gemini API', 'Python', 'Vector Memory', 'PostgreSQL'],
    image: customAgentOpsImg,
    featured: true,
  },
  {
    id: 'stratos-mro-aviation',
    title: 'Stratos MRO Fleet Maintenance Portal',
    client: 'Stratos Aerospace',
    industry: 'Aerospace & Aviation',
    serviceId: 'full-stack',
    categoryLabel: 'Full Stack Development',
    year: '2026',
    impactMetric: '48% faster AOG sign-off & +34% aftermarket parts conversion',
    summary:
      'Airworthiness maintenance and spare-parts procurement platform tracking serialized components and FAA/EASA inspection sign-offs.',
    challenge:
      'Hangar engineers juggled paper logbooks and delayed supplier quotes that extended aircraft-on-ground downtime.',
    solution:
      'Engineered an offline-capable inspection tablet portal, barcode part lookup, and one-click vendor RFQ checkout.',
    stack: ['React', 'TypeScript', 'PostgreSQL', 'GraphQL'],
    image: fullstackMeshImg,
  },
  {
    id: 'soraia-alpine-resorts',
    title: 'Soraia Alpine Resorts Booking Engine',
    client: 'Soraia Hospitality',
    industry: 'Luxury Hospitality',
    serviceId: 'web-wordpress',
    categoryLabel: 'Web & WordPress Development',
    year: '2026',
    impactMetric: '+112% direct suite bookings & 0.58s mobile LCP speed',
    summary:
      'Headless WordPress editorial flagship paired with a bespoke direct-booking suite selector eliminating third-party OTA commissions.',
    challenge:
      'Slow legacy booking iframes drove 68% of high-intent guests back to third-party aggregator marketplaces.',
    solution:
      'Crafted modular Gutenberg resort stories, instant calendar availability caching, and Apple Pay direct checkout.',
    stack: ['WordPress', 'Next.js', 'WPGraphQL', 'Stripe Checkout'],
    image: wpCommerceImg,
  },
  {
    id: 'terrasense-agtech-copilot',
    title: 'TerraSense Crop Yield & Soil Copilot',
    client: 'TerraSense Agronomy',
    industry: 'AgTech & Precision Farming',
    serviceId: 'ai-apps',
    categoryLabel: 'AI App & Website Development',
    year: '2026',
    impactMetric: '+53% agronomist daily adoption & +31% seasonal SaaS renewals',
    summary:
      'Geospatial AI advisor synthesizing satellite NDVI imagery, soil moisture probes, and variable-rate irrigation recommendations.',
    challenge:
      'Growers felt overwhelmed by raw agronomic telemetry tables without clear field-by-field action summaries.',
    solution:
      'Trained a grounded geospatial copilot delivering plain-language spray windows and prescription shapefile exports.',
    stack: ['Gemini API', 'Python', 'React', 'PostGIS'],
    image: aiVisionImg,
  },
  {
    id: 'velopay-crossborder-reveal',
    title: 'VeloPay Cross-Border Checkout Reveal',
    client: 'VeloPay Global',
    industry: 'FinTech & Payments',
    serviceId: 'landing-pages',
    categoryLabel: 'Landing Pages',
    year: '2026',
    impactMetric: '14.1% merchant demo conversion & +88% enterprise pipeline',
    summary:
      'Interactive multi-currency checkout simulator and launch experience demonstrating local payment routing across 45 markets.',
    challenge:
      'Enterprise CFOs struggled to quantify FX fee savings on static comparison tables.',
    solution:
      'Engineered an interactive FX savings calculator, live authorization-rate visuals, and instant sandbox API keys.',
    stack: ['React', 'Three.js', 'TypeScript', 'Analytics'],
    image: landingVelocityImg,
  },
  // Block 10 (indices 45-49)
  {
    id: 'apexpulse-wearables-paas',
    title: 'ApexPulse Athlete Telemetry PaaS',
    client: 'ApexPulse Labs',
    industry: 'SportsTech & Wearables',
    serviceId: 'saas-paas',
    categoryLabel: 'SaaS/PaaS Solutions',
    year: '2026',
    impactMetric: '3.9x pro team license expansion & 99.97% live telemetry uptime',
    summary:
      'Developer PaaS and coaching SaaS ingesting biometric wearable streams with custom webhook triggers and strain-recovery scoring.',
    challenge:
      'Pro franchises couldn’t merge proprietary GPS vest feeds with heart-rate recovery dashboards cleanly.',
    solution:
      'Built a high-throughput streaming ingestion PaaS, self-serve API key portals, and multi-team analytics workspaces.',
    stack: ['TypeScript', 'Node.js', 'TimescaleDB', 'Redis Streams'],
    image: fullStackImg,
    featured: true,
  },
  {
    id: 'kubecraft-migration-docs',
    title: 'KubeCraft Multi-Cluster Migration Docs',
    client: 'KubeCraft Systems',
    industry: 'Developer Tools',
    serviceId: 'content-writing',
    categoryLabel: 'Content Writing',
    year: '2026',
    impactMetric: '+240% organic CLI installs & +46% docs-to-cloud signup conversion',
    summary:
      'Conversion-oriented developer documentation hub, interactive CLI runbooks, and bottom-of-funnel Kubernetes comparison briefs.',
    challenge:
      'High-intent DevOps traffic landed on blog posts without clear architectural paths into KubeCraft’s managed cloud.',
    solution:
      'Restructured docs around real migration scenarios, verified YAML snippets, and inline free-tier launch prompts.',
    stack: ['Technical SEO', 'Developer Docs', 'Copywriting', 'MDX Pipeline'],
    image: technicalDocsImg,
  },
  {
    id: 'nodal-telecom-care-agent',
    title: 'Nodal Mobile Plan & Roaming Concierge',
    client: 'Nodal Wireless',
    industry: 'Telecom & 5G Networks',
    serviceId: 'ai-customer-care',
    categoryLabel: 'AI Customer Care Agent',
    year: '2026',
    impactMetric: '83% self-serve eSIM resolution & +29% travel add-on conversion',
    summary:
      '24/7 AI customer care agent automating eSIM activation, roaming bundle recommendations, and transparent bill variance breakdowns.',
    challenge:
      'International travelers faced 45-minute support queues right after landing when roaming passes failed to activate.',
    solution:
      'Integrated real-time carrier provisioning APIs with one-tap eSIM diagnostics and instant plan upgrade flows.',
    stack: ['Gemini API', 'TypeScript', 'Carrier REST APIs', 'WebSockets'],
    image: aiCareOmniImg,
  },
  {
    id: 'verdict-dealroom-agent',
    title: 'Verdict M&A Due-Diligence AI Agent',
    client: 'Verdict Advisory',
    industry: 'Legal & M&A Advisory',
    serviceId: 'custom-ai-agent',
    categoryLabel: 'Custom AI Agents',
    year: '2026',
    impactMetric: '66% faster VDR audit cycles & +44% partner mandate capacity',
    summary:
      'Private virtual data room agent indexing thousands of deal documents to surface change-of-control clauses and IP assignment gaps.',
    challenge:
      'Deal associates spent sleepless weekends manually tagging risks across unindexed virtual data room folders.',
    solution:
      'Built role-isolated document ingestion, structured risk matrix exports, and page-anchored citation verification.',
    stack: ['Gemini API', 'Python', 'Vector Search', 'React'],
    image: aiStudioImg,
  },
  {
    id: 'cadenza-film-collective',
    title: 'Cadenza Independent Film Collective',
    client: 'Cadenza Cinema',
    industry: 'Media & Streaming',
    serviceId: 'web-wordpress',
    categoryLabel: 'Web & WordPress Development',
    year: '2026',
    impactMetric: '+156% annual patron memberships & 99 Lighthouse score',
    summary:
      'Editorial WordPress screening room and festival archive uniting director essays, curated collections, and frictionless patron tiers.',
    challenge:
      'Clunky membership plugins forced multi-step redirects that lost 55% of prospective cinema subscribers.',
    solution:
      'Engineered an edge-rendered React front end over WPGraphQL with single-screen tier upgrades and instant HLS previews.',
    stack: ['WordPress', 'WPGraphQL', 'Next.js', 'Stripe Subscriptions'],
    image: wpPortalImg,
  },
  // Block 11 (indices 50-55): 6 regular 1-col cards -> flush 2 rows of 3 on desktop & 3 rows of 2 on tablet
  {
    id: 'voltfleet-ev-orchestrator',
    title: 'VoltFleet Depot Charging Orchestrator',
    client: 'VoltFleet Mobility',
    industry: 'Automotive & EV Fleet',
    serviceId: 'full-stack',
    categoryLabel: 'Full Stack Development',
    year: '2026',
    impactMetric: '+72% commercial fleet conversion & 39% lower peak utility cost',
    summary:
      'OCPP charger management and smart tariff scheduling cockpit built for electric delivery depots across 14 metro hubs.',
    challenge:
      'Fleet managers lacked live visibility into morning route readiness versus off-peak utility demand charges.',
    solution:
      'Built real-time OCPP WebSocket telemetry, automated load-balancing schedules, and CFO cost-per-mile reports.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'OCPP WebSockets'],
    image: climateGridImg,
  },
  {
    id: 'lumina-fellowship-funnel',
    title: 'Lumina Executive AI Fellowship Funnel',
    client: 'Lumina Institute',
    industry: 'EdTech & Executive Training',
    serviceId: 'landing-pages',
    categoryLabel: 'Landing Pages',
    year: '2026',
    impactMetric: '18.6% syllabus-to-application conversion across 14 cohorts',
    summary:
      'High-conviction cohort landing experience pairing interactive curriculum timelines with alumni ROI outcomes and instant tuition briefs.',
    challenge:
      'Busy engineering leaders bounced off long text walls without seeing concrete weekly build deliverables.',
    solution:
      'Crafted an interactive syllabus preview drawer, employer sponsorship letter generator, and streamlined cohort application.',
    stack: ['React', 'Tailwind CSS', 'TypeScript', 'Conversion Analytics'],
    image: landingImg,
  },
  {
    id: 'bramble-cpg-merchandising',
    title: 'Bramble Visual Merchandising Copilot',
    client: 'Bramble Retail Group',
    industry: 'Retail & CPG Wholesale',
    serviceId: 'ai-apps',
    categoryLabel: 'AI App & Website Development',
    year: '2026',
    impactMetric: '+37% seasonal sell-through rate & 4.1x faster planogram rollout',
    summary:
      'Multimodal retail planning web app evaluating store shelf photography against regional assortment rules and SKU velocity.',
    challenge:
      'Regional merchandisers waited weeks for headquarters feedback on seasonal endcap compliance.',
    solution:
      'Deployed mobile-friendly shelf photo scoring, instant SKU gap recommendations, and store manager checklists.',
    stack: ['Gemini Vision', 'React', 'FastAPI', 'PostgreSQL'],
    image: aiVisionImg,
  },
  {
    id: 'medcore-clinical-seo-hub',
    title: 'MedCore Clinical Evidence & SEO Hub',
    client: 'MedCore Diagnostics',
    industry: 'Healthcare & Diagnostics',
    serviceId: 'content-writing',
    categoryLabel: 'Content Writing',
    year: '2026',
    impactMetric: '+192% hospital procurement inquiries & 3.4x whitepaper leads',
    summary:
      'Peer-reviewed diagnostic evidence library, clinician explainers, and search-validated landing copy built for hospital buying committees.',
    challenge:
      'Promising lab accuracy metrics were buried inside dense clinical posters unreadable to hospital procurement leads.',
    solution:
      'Translated clinical studies into scannable ROI briefs, specialty search clusters, and compliant product narratives.',
    stack: ['Healthcare Copy', 'Technical SEO', 'Editorial Strategy', 'UX Copy'],
    image: contentFoundryImg,
  },
  {
    id: 'shardengine-gaming-paas',
    title: 'ShardEngine Matchmaking & Lobby PaaS',
    client: 'ShardEngine Interactive',
    industry: 'Gaming & Interactive 3D',
    serviceId: 'saas-paas',
    categoryLabel: 'SaaS/PaaS Solutions',
    year: '2026',
    impactMetric: '2.8x studio SDK conversion & <18ms global lobby matchmaking',
    summary:
      'Developer PaaS control plane allowing indie and AA studios to deploy skill-based matchmaking, leaderboards, and metered server fleets.',
    challenge:
      'Studios delayed multiplayer betas for months building custom auth, party lobbies, and regional server autoscalers.',
    solution:
      'Delivered one-click region provisioning, real-time player CCU telemetry, and transparent usage-tier billing.',
    stack: ['Go', 'TypeScript', 'React', 'Redis & Stripe'],
    image: cyberSocImg,
  },
  {
    id: 'portbridge-customs-agent',
    title: 'PortBridge Tariff & HS-Code AI Agent',
    client: 'PortBridge Trade',
    industry: 'Supply Chain & Customs',
    serviceId: 'custom-ai-agent',
    categoryLabel: 'Custom AI Agents',
    year: '2026',
    impactMetric: '88% faster customs clearance prep & +51% broker conversion',
    summary:
      'Autonomous trade compliance agent classifying multi-item commercial invoices into verified HS tariff codes with duty simulations.',
    challenge:
      'Freight forwarders lost hours per shipment manually cross-checking changing bilateral tariff schedules.',
    solution:
      'Connected live WCO tariff tables to structured invoice line extraction with confidence scores and broker sign-off.',
    stack: ['Gemini API', 'Function Calling', 'Node.js', 'PostgreSQL'],
    image: customAgentOpsImg,
  },
];
