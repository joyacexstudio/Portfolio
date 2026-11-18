export type ServiceId =
  | 'web-wordpress'
  | 'full-stack'
  | 'ai-apps'
  | 'landing-pages'
  | 'content-writing'
  | 'saas-paas'
  | 'ai-customer-care'
  | 'custom-ai-agent';

export interface StudioService {
  id: ServiceId;
  index: string;
  shortLabel: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  stack: string[];
  accentHex: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  serviceId: ServiceId;
  categoryLabel: string;
  year: string;
  impactMetric: string;
  summary: string;
  challenge: string;
  solution: string;
  stack: string[];
  image: string;
  featured?: boolean;
}

export interface CurriculumModule {
  code: string;
  title: string;
  duration: string;
  topics: string[];
}

export interface CommunityTrack {
  id: string;
  title: string;
  cadence: string;
  focus: string;
  summary: string;
  highlights: string[];
  curriculumModules: CurriculumModule[];
  outcome: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  outcome: string;
}

export interface PartnershipMetric {
  value: string;
  label: string;
  context: string;
}

export interface PartnerLogo {
  id: string;
  name: string;
  sector: string;
  markType:
    | 'prism'
    | 'orbit'
    | 'grid'
    | 'wave'
    | 'hex'
    | 'spark'
    | 'node'
    | 'stack';
}

export type InsightCategory =
  | 'industry-trend'
  | 'studio-announcement'
  | 'engineering-note';

export interface InsightPost {
  id: string;
  title: string;
  category: InsightCategory;
  categoryLabel: string;
  publishedDate: string;
  readTime: string;
  author: string;
  authorRole: string;
  summary: string;
  fullBrief: string;
  keyTakeaways: string[];
  tags: string[];
}

export type FaqCategory = 'process' | 'pricing' | 'timelines';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  categoryLabel: string;
  question: string;
  answer: string;
  highlights: string[];
}

export const STUDIO_EMAIL = 'joyacexstudio@zohomail.in';

export const STUDIO_SERVICES: StudioService[] = [
  {
    id: 'web-wordpress',
    index: '01',
    shortLabel: 'Web & WordPress',
    title: 'Web & WordPress Development',
    tagline: 'CMS Architecture · Custom Themes · Performance Tuning',
    description:
      'Visually stunning, robust, and easy-to-manage websites tailored to your goals—built for editorial autonomy and sub-second page loads.',
    deliverables: [
      'Custom block themes & headless WordPress pipelines',
      'Core Web Vitals optimization & accessibility hardening',
      'Clean editorial workflows so your team ships without friction',
    ],
    stack: ['WordPress', 'Next.js', 'TypeScript', 'GraphQL'],
    accentHex: '#38BDF8',
    cameraPosition: [3.9, 1.3, 4.4],
    cameraTarget: [0.35, 0.15, 0],
  },
  {
    id: 'full-stack',
    index: '02',
    shortLabel: 'Full Stack',
    title: 'Full Stack Development',
    tagline: 'Client-Side Craft · API Systems · Cloud Persistence',
    description:
      'Comprehensive, end-to-end digital experiences from client-side to server-side—engineered with clean schemas, resilient APIs, and scalable UI.',
    deliverables: [
      'End-to-end TypeScript web apps & multi-tenant dashboards',
      'REST/GraphQL APIs, authentication, and relational databases',
      'Automated CI/CD pipelines and observability instrumentation',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    accentHex: '#8B5CF6',
    cameraPosition: [-3.8, 1.6, 4.5],
    cameraTarget: [-0.25, 0.15, 0],
  },
  {
    id: 'ai-apps',
    index: '03',
    shortLabel: 'AI Apps',
    title: 'AI App & Website Development',
    tagline: 'Intelligent Workflows · Personalization · LLM Integration',
    description:
      'Smart, future-ready integrations to automate processes and personalize user experiences—grounded in reliable guardrails and measurable ROI.',
    deliverables: [
      'Custom AI copilots, semantic search & RAG knowledge hubs',
      'Automated lead triage & dynamic content personalization',
      'Latency-tuned streaming interfaces with human-in-the-loop controls',
    ],
    stack: ['Gemini API', 'Vector Search', 'Python', 'WebSockets'],
    accentHex: '#60A5FA',
    cameraPosition: [0.2, 2.8, 5.1],
    cameraTarget: [0, 0.35, 0],
  },
  {
    id: 'landing-pages',
    index: '04',
    shortLabel: 'Landing Pages',
    title: 'Landing Pages',
    tagline: 'Conversion Strategy · 3D Motion · Maximum ROI',
    description:
      'High-converting, meticulously designed pages optimized for maximum ROI—pairing persuasive visual hierarchy with lightning-fast interactivity.',
    deliverables: [
      'Conversion-tested messaging architecture & funnel framing',
      'Interactive 3D product reveals & responsive micro-interactions',
      'A/B instrumentation, analytics events, and CRM capture',
    ],
    stack: ['React', 'Three.js', 'Tailwind CSS', 'Analytics'],
    accentHex: '#A78BFA',
    cameraPosition: [4.2, -0.6, 4.1],
    cameraTarget: [0.2, -0.1, 0],
  },
  {
    id: 'content-writing',
    index: '05',
    shortLabel: 'Content Writing',
    title: 'Content Writing',
    tagline: 'Technical SEO · Brand Storytelling · Authority Systems',
    description:
      'SEO-optimized, compelling storytelling that builds your brand’s authority—translating complex technical value into clear human narratives.',
    deliverables: [
      'Technical product storytelling, launch copy & UX microcopy',
      'Search-intent topic clusters & long-form authority articles',
      'Consistent voice guidelines across web, docs, and campaigns',
    ],
    stack: ['Technical SEO', 'UX Copy', 'Editorial Strategy', 'Docs'],
    accentHex: '#7DD3FC',
    cameraPosition: [-4.1, -0.5, 4.2],
    cameraTarget: [-0.2, -0.1, 0],
  },
  {
    id: 'saas-paas',
    index: '06',
    shortLabel: 'SaaS/PaaS',
    title: 'SaaS/PaaS Solutions',
    tagline: 'Multi-Tenant Cloud · Subscription Billing · Developer APIs',
    description:
      'Production-grade SaaS products and PaaS developer platforms engineered for recurring revenue—complete with tenant isolation, usage metering, and SLA-ready cloud architecture.',
    deliverables: [
      'Multi-tenant SaaS workspaces, RBAC & SSO authentication',
      'PaaS self-serve provisioning, webhooks & metered billing engines',
      'Scalable cloud orchestration with observability and zero-downtime CI/CD',
    ],
    stack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Stripe & Cloud'],
    accentHex: '#38BDF8',
    cameraPosition: [2.8, 2.2, 4.7],
    cameraTarget: [0.25, 0.2, 0],
  },
  {
    id: 'ai-customer-care',
    index: '07',
    shortLabel: 'AI Customer Care',
    title: 'AI Customer Care Agent',
    tagline: '24/7 Omni-Channel Support · Ticket Triage · Human Handoff',
    description:
      'Empathetic, policy-grounded AI customer care agents for your business—resolving order, billing, and onboarding queries instantaneously across web chat, email, and helpdesks.',
    deliverables: [
      'Knowledge-grounded support agents synced to docs, orders & CRM',
      'Instant sentiment detection, ticket routing & warm human escalation',
      'Multilingual 24/7 resolution analytics with strict brand-voice guardrails',
    ],
    stack: ['Gemini API', 'RAG Grounding', 'CRM Webhooks', 'Streaming UI'],
    accentHex: '#A78BFA',
    cameraPosition: [-2.9, 2.1, 4.8],
    cameraTarget: [-0.2, 0.2, 0],
  },
  {
    id: 'custom-ai-agent',
    index: '08',
    shortLabel: 'Custom AI Agents',
    title: 'Custom AI Agents',
    tagline: 'Autonomous Workflows · Tool Calling · Enterprise Operations',
    description:
      'Tailor-made AI agents designed around your exact business operations—automating research, sales qualification, internal ops, and ERP/API execution with human-in-the-loop approvals.',
    deliverables: [
      'Custom tool-calling agents integrated with Slack, Notion, ERP & databases',
      'Structured extraction, lead qualification & automated reporting pipelines',
      'Deterministic evaluation harnesses, audit logs & role-scoped permissions',
    ],
    stack: ['Gemini API', 'Function Calling', 'Python', 'Vector Memory'],
    accentHex: '#8B5CF6',
    cameraPosition: [0.3, -2.1, 4.9],
    cameraTarget: [0.1, -0.15, 0],
  },
];


export const COMMUNITY_TRACKS: CommunityTrack[] = [
  {
    id: 'engineering-guild',
    title: 'Full-Stack Engineering Guild',
    cadence: 'Weekly Architecture Reviews · Open Code Critiques',
    focus: 'Production TypeScript, Clean APIs & Scalable Systems',
    summary:
      'Creators and senior architects collaborate in live code reviews—turning modern best practices into muscle memory across every client build.',
    highlights: [
      'Peer-reviewed component systems and database schema clinics',
      'Real-world sprint mentorship pairing emerging builders with principal engineers',
      'Shared accessibility, security, and Core Web Vitals checklists',
    ],
    curriculumModules: [
      {
        code: 'FS-101',
        title: 'Type-Safe Domain & Schema Modeling',
        duration: '2 Weeks',
        topics: ['PostgreSQL Indexing', 'API Contracts', 'Validation Boundaries'],
      },
      {
        code: 'FS-204',
        title: 'Resilient React & State Architecture',
        duration: '3 Weeks',
        topics: ['Server Caching', 'Optimistic Mutations', 'Zero-Jank Rendering'],
      },
      {
        code: 'FS-309',
        title: 'Production Observability & CI/CD',
        duration: '2 Weeks',
        topics: ['Container Hardening', 'Error Budgets', 'Core Web Vitals'],
      },
    ],
    outcome:
      'Clients receive software vetted by a multidisciplinary engineering guild rather than isolated guesswork.',
  },
  {
    id: 'ai-innovation-lab',
    title: 'AI & Automation Lab',
    cadence: 'Bi-Weekly Build Sprints · Applied Research',
    focus: 'Practical LLM Workflows, Grounding & Evaluation',
    summary:
      'Our community continuously benchmarks emerging AI models, retrieval patterns, and UX guardrails to ship dependable automation.',
    highlights: [
      'Hands-on sandboxes for prompt reliability, tool calling, and structured outputs',
      'Latency and cost optimization playbooks for startup budgets',
      'Human-centered AI interface patterns that earn user trust',
    ],
    curriculumModules: [
      {
        code: 'AI-102',
        title: 'Grounded RAG & Citation Pipelines',
        duration: '2 Weeks',
        topics: ['Hybrid Retrieval', 'Chunk Strategy', 'Hallucination Checks'],
      },
      {
        code: 'AI-205',
        title: 'Structured Tool Calling & Workflows',
        duration: '3 Weeks',
        topics: ['JSON Schema Guardrails', 'Retry Policies', 'Streaming UX'],
      },
      {
        code: 'AI-310',
        title: 'Evaluation Harnesses & Cost Control',
        duration: '2 Weeks',
        topics: ['Regression Suites', 'Token Budgeting', 'Human Handoff'],
      },
    ],
    outcome:
      'Your AI features move straight past hype into measurable workflow efficiency.',
  },
  {
    id: 'design-editorial-studio',
    title: 'Design & Content Studio',
    cadence: 'Monthly Critiques · Storytelling Labs',
    focus: '3D Spatial UI, Conversion Copy & Technical SEO',
    summary:
      'Designers and technical writers co-create glassmorphic interfaces and high-clarity narratives where visual craft and messaging reinforce one another.',
    highlights: [
      'Interactive Three.js & WebGL performance workshops',
      'Conversion teardown sessions on real startup landing pages',
      'Search-intent editorial systems tailored for technical founders',
    ],
    curriculumModules: [
      {
        code: 'DC-104',
        title: 'Spatial Glassmorphism & WebGL Craft',
        duration: '2 Weeks',
        topics: ['PBR Lighting', 'Accessible Motion', 'Responsive Framing'],
      },
      {
        code: 'DC-208',
        title: 'Conversion Narrative & Funnel Copy',
        duration: '2 Weeks',
        topics: ['Above-the-Fold Clarity', 'Objection Handling', 'UX Microcopy'],
      },
      {
        code: 'DC-312',
        title: 'Technical SEO & Authority Clusters',
        duration: '3 Weeks',
        topics: ['Search Intent Mapping', 'Documentation Systems', 'Internal Linking'],
      },
    ],
    outcome:
      'Products look unmistakable and communicate their value within the first five seconds.',
  },
];

export const PARTNERSHIP_METRICS: PartnershipMetric[] = [
  {
    value: '48+',
    label: 'Digital Launches',
    context: 'Web, full-stack, and AI products shipped',
  },
  {
    value: '3.4x',
    label: 'Conversion Lift',
    context: 'Average ROI across redesigned landing funnels',
  },
  {
    value: '1,200+',
    label: 'Creator Network',
    context: 'Engineers, designers & writers in our hub',
  },
  {
    value: '98%',
    label: 'Client Retention',
    context: 'Long-term product & editorial partnerships',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Before partnering with JoyaceXstudio, our platform looked fragmented and took four seconds to load. Their full-stack guild rebuilt our core dashboard and WordPress marketing hub in six weeks—cutting bounce rate in half.',
    author: 'Elena Vance',
    role: 'Co-Founder & CTO',
    organization: 'Velox Infrastructure',
    outcome: '42% faster team diagnostics',
  },
  {
    id: 't2',
    quote:
      'JoyaceXstudio does not operate like a transactional agency. Their educational mindset meant every design decision came with clear reasoning, and our new AI onboarding copilot resolved 64% of repetitive queries.',
    author: 'Arjun Mehta',
    role: 'VP of Product',
    organization: 'Opticore Labs',
    outcome: '64% fewer Tier-1 tickets',
  },
  {
    id: 't3',
    quote:
      'They paired our Series-A launch landing page with sharp SEO storytelling. Within two months of going live, qualified inbound demos more than doubled without raising ad spend.',
    author: 'Hannah Lindqvist',
    role: 'Head of Growth',
    organization: 'Aurora Compute',
    outcome: '+168% qualified demos in 60 days',
  },
];

export const CLIENT_LOGOS: PartnerLogo[] = [
  { id: 'velox', name: 'Velox Infrastructure', sector: 'Cloud Telemetry', markType: 'prism' },
  { id: 'opticore', name: 'Opticore Labs', sector: 'Applied AI', markType: 'orbit' },
  { id: 'finpulse', name: 'FinPulse Capital', sector: 'Treasury SaaS', markType: 'wave' },
  { id: 'aurora', name: 'Aurora Compute', sector: 'Distributed Compute', markType: 'spark' },
  { id: 'clario', name: 'Clario Cloud', sector: 'Developer PaaS', markType: 'grid' },
  { id: 'haven', name: 'Haven Home', sector: 'AI Customer Care', markType: 'node' },
  { id: 'monolith', name: 'Monolith Collective', sector: 'Editorial CMS', markType: 'stack' },
  { id: 'meridian', name: 'Meridian Compute', sector: 'Edge Mesh', markType: 'hex' },
  { id: 'covalent', name: 'Covalent Genomics', sector: 'Biotech LIMS', markType: 'node' },
  { id: 'solstice', name: 'Solstice Data', sector: 'Edge Database', markType: 'prism' },
  { id: 'kestrel', name: 'Kestrel B2B', sector: 'Revenue AI Agents', markType: 'spark' },
  { id: 'veridian', name: 'Veridian Objects', sector: 'Headless Commerce', markType: 'grid' },
];

export const INSIGHT_UPDATES: InsightPost[] = [
  {
    id: 'studio-saas-ai-agents-launch',
    title: 'Introducing SaaS/PaaS Architecture, AI Customer Care & Custom Business Agents',
    category: 'studio-announcement',
    categoryLabel: 'Studio Announcement',
    publishedDate: 'Nov 12, 2026',
    readTime: '4 min read',
    author: 'JoyaceXstudio Guild Leads',
    authorRole: 'Architecture & Applied AI',
    summary:
      'We have formally expanded our studio practices to help growing companies launch multi-tenant SaaS/PaaS platforms alongside policy-grounded AI Customer Care and Custom AI Agents.',
    fullBrief:
      'Over the past three quarters, our engineering and AI guilds noticed startups repeatedly asking for two capabilities beyond marketing sites: subscription cloud control planes and dependable operational agents. Our new dedicated practices pair strict row-level security, usage billing, and evaluation harnesses with clean glassmorphic interfaces.',
    keyTakeaways: [
      'Turnkey multi-tenant SaaS/PaaS blueprints with SSO, RBAC, and metered Stripe billing',
      '24/7 AI Customer Care Agents grounded in live CRM, helpdesk, and order APIs',
      'Custom internal tool-calling agents built with deterministic approval queues',
    ],
    tags: ['SaaS/PaaS', 'AI Customer Care', 'Custom Agents'],
  },
  {
    id: 'deterministic-evals-for-care-agents',
    title: 'Why Grounded Tool-Calling Replaces Fragile Prompt Chains in 2026',
    category: 'industry-trend',
    categoryLabel: 'Industry Trend',
    publishedDate: 'Nov 08, 2026',
    readTime: '6 min read',
    author: 'AI & Automation Lab',
    authorRole: 'Community Research Brief',
    summary:
      'Production support and ops teams are moving away from open-ended chat wrappers toward schema-enforced function calling backed by automated regression suites.',
    fullBrief:
      'Early enterprise AI pilots stalled because ungrounded prompts drifted on refund thresholds or compliance wording. Leading product teams now enforce strict JSON tool schemas, read-only citation verification, and automated evaluation suites that run before every model or prompt update ships.',
    keyTakeaways: [
      'Typed tool contracts cut policy hallucination rates below 0.5% in order triage',
      'Human-in-the-loop escalation triggers preserve CSAT on edge-case billing disputes',
      'Weekly guild regression benchmarks catch latency regressions before users notice',
    ],
    tags: ['LLM Guardrails', 'Tool Calling', 'AI Evals'],
  },
  {
    id: 'webgl-particles-hero-performance',
    title: 'Compositing Cursor-Reactive Canvas Particles Beneath Transparent WebGL',
    category: 'engineering-note',
    categoryLabel: 'Engineering Note',
    publishedDate: 'Nov 03, 2026',
    readTime: '5 min read',
    author: 'Spatial UI Guild',
    authorRole: 'Frontend & Graphics Team',
    summary:
      'How our studio layers DPR-scaled 2D particle constellations behind a refractive Three.js glass prism while preserving 60fps on mobile devices.',
    fullBrief:
      'Mixing 2D atmospheric depth with 3D PBR glass refraction does not require bloating WebGL shader passes. By isolating a crisp, device-pixel-ratio-aware 2D Canvas backdrop beneath an alpha-enabled WebGLRenderer, we keep draw calls minimal, support prefers-reduced-motion gracefully, and leave WebGL crisp and unobstructed.',
    keyTakeaways: [
      'Use alpha: true and clearColor alpha 0 on WebGLRenderer for zero-seam layering',
      'Clamp DPR to 2 and pause animation frames automatically when off-screen',
      'Respect prefers-reduced-motion with calm static constellations',
    ],
    tags: ['Three.js', 'Canvas 2D', '60fps Perf'],
  },
  {
    id: 'winter-creator-hub-cohorts',
    title: 'Winter 2026 Creator Hub: Open Code Critiques & Spatial UI Workshops',
    category: 'studio-announcement',
    categoryLabel: 'Studio Announcement',
    publishedDate: 'Oct 27, 2026',
    readTime: '3 min read',
    author: 'JoyaceXstudio Community Desk',
    authorRole: 'Educational Ecosystem',
    summary:
      'Registration is open for our upcoming guild tracks—featuring live TypeScript schema clinics, Three.js glassmorphism teardowns, and RAG evaluation labs.',
    fullBrief:
      'Our educational community of 1,200+ engineers, designers, and writers grows stronger through open collaboration. This winter cohort introduces hands-on Friday architecture reviews alongside real client case study teardowns so emerging builders learn production standards firsthand.',
    keyTakeaways: [
      'Weekly Full-Stack Engineering Guild schema & API contract clinics',
      'Bi-weekly AI & Automation Lab sessions on agent reliability and cost control',
      'Monthly Design & Content Studio reviews pairing 3D craft with technical SEO',
    ],
    tags: ['Creator Hub', 'Workshops', 'Open Critiques'],
  },
  {
    id: 'headless-wordpress-cwv-shift',
    title: 'The Quiet Rise of Edge-Cached Headless WordPress for B2B Revenue Teams',
    category: 'industry-trend',
    categoryLabel: 'Industry Trend',
    publishedDate: 'Oct 19, 2026',
    readTime: '5 min read',
    author: 'Web & Editorial Guild',
    authorRole: 'CMS & SEO Practice',
    summary:
      'Why fast-moving B2B startups pair familiar Gutenberg authoring workflows with React edge front ends to hit 99 Lighthouse scores without slowing marketing.',
    fullBrief:
      'Marketing teams love WordPress editorial velocity, while engineering teams demand sub-second Core Web Vitals and zero plugin bloat on public routes. Decoupling WPGraphQL behind static-regenerated React views delivers both—lifting organic search rankings and mobile conversion together.',
    keyTakeaways: [
      'Editorial autonomy stays intact with custom Gutenberg blocks and live previews',
      'Public pages ship without heavy theme JS, boosting mobile checkout & demo signups',
      'Automated webhook cache purging publishes edits globally in under two seconds',
    ],
    tags: ['Headless WordPress', 'WPGraphQL', 'Core Web Vitals'],
  },
  {
    id: 'low-latency-audio-spatial-ux',
    title: 'Designing Subtle Web Audio Tactility Without Breaking Accessibility',
    category: 'engineering-note',
    categoryLabel: 'Engineering Note',
    publishedDate: 'Oct 11, 2026',
    readTime: '4 min read',
    author: 'Interactive Craft Guild',
    authorRole: 'UI Systems Engineering',
    summary:
      'Patterns for synthesizing feather-light harmonic pings via native Web Audio API—with zero external audio payloads, anti-spam cooldowns, and instant user opt-out.',
    fullBrief:
      'UI audio should feel like machined glass, never a distracting game soundboard. Using an interactive-latency AudioContext with short 6ms exponential attack envelopes, warm low-pass sweeps, and an accessible persisted toggle enhances spatial feedback while keeping bundle weight zero.',
    keyTakeaways: [
      'Unlock AudioContext strictly inside real user gestures to satisfy browser policies',
      'Enforce 45–50ms anti-spam cooldowns during rapid keyboard or pointer sweeps',
      'Always expose a clear one-click Hover Audio toggle in the interface',
    ],
    tags: ['Web Audio API', 'A11y UX', 'Zero-Bundle Audio'],
  },
];

export const STUDIO_FAQS: FaqItem[] = [
  {
    id: 'process-discovery-to-launch',
    category: 'process',
    categoryLabel: 'Service Process',
    question:
      'How does JoyaceXstudio structure a project from discovery to production launch?',
    answer:
      'Every engagement starts with a 48-hour architecture & scope brief where our guild leads map user flows, data boundaries, and Core Web Vitals or latency budgets. From there, we work in transparent weekly sprints with staging previews, automated CI checks, and a documented handoff session.',
    highlights: [
      '48-hour technical blueprint and clickable milestone roadmap',
      'Weekly staging builds with async Loom walkthroughs and live QA',
      'Full Git repository, design tokens, and runbook transferred on launch',
    ],
  },
  {
    id: 'process-educational-guilds',
    category: 'process',
    categoryLabel: 'Service Process',
    question:
      'How do your educational tech creator guilds improve client delivery quality?',
    answer:
      'Each client project is led by senior studio architects alongside vetted specialists from our active Web, SaaS, AI Agent, and Content guilds. Because our teams run weekly architecture clinics and peer code reviews, your product benefits from current production standards rather than recycled templates.',
    highlights: [
      'Senior principal engineer owns architecture, security, and final review',
      'Cross-guild pairing ensures SEO, UI craft, and backend scale align early',
      'Zero junior-only handoffs—every pull request passes strict studio checks',
    ],
  },
  {
    id: 'process-ai-agent-guardrails',
    category: 'process',
    categoryLabel: 'Service Process',
    question:
      'What safeguards do you use when building AI Customer Care or Custom AI Agents?',
    answer:
      'We design agents with deterministic tool schemas, tenant-isolated retrieval, strict confidence thresholds, and explicit human-escalation routing. Before any agent touches live customer traffic, we run an evaluation suite across edge cases, prompt-injection tests, and refund/policy boundaries.',
    highlights: [
      'Verified knowledge-base grounding with inline source citations',
      'Configurable human handoff triggers for billing, compliance, or low confidence',
      'Telemetry dashboards tracking resolution rate, latency, and token spend',
    ],
  },
  {
    id: 'pricing-scope-tiers',
    category: 'pricing',
    categoryLabel: 'Pricing & Scopes',
    question:
      'How are projects priced across Landing Sprints, Custom Web, SaaS, and AI Agents?',
    answer:
      'We quote fixed-scope packages aligned with clear business outcomes rather than unpredictable hourly billing. Focused landing pages and UX sprints run $1k–$3k, custom WordPress or multi-page marketing sites range from $3k–$8k, and full-stack SaaS, PaaS, or custom AI agent platforms span $8k–$20k+ depending on integrations.',
    highlights: [
      '$1k–$3k: High-converting launch pages, audits, and rapid UI sprints',
      '$3k–$8k: Custom WordPress/CMS builds, WooCommerce, and SEO engines',
      '$8k–$20k+: Multi-tenant SaaS/PaaS platforms and production AI agent systems',
    ],
  },
  {
    id: 'pricing-payment-milestones',
    category: 'pricing',
    categoryLabel: 'Pricing & Scopes',
    question:
      'What do your milestone payment terms and intellectual property rights look like?',
    answer:
      'Standard fixed-scope builds split cleanly across three milestones: 40% kickoff deposit to lock sprint capacity, 30% upon staging feature freeze, and 30% at final production launch. Upon final settlement, 100% of custom source code, AI workflows, and content assets belong exclusively to your organization.',
    highlights: [
      '40% kickoff · 30% staging sign-off · 30% production deployment',
      'Zero licensing lock-in—you own the full codebase, prompts, and infrastructure scripts',
      'Written change-order approval before any out-of-scope expansion is billed',
    ],
  },
  {
    id: 'pricing-retainers-support',
    category: 'pricing',
    categoryLabel: 'Pricing & Scopes',
    question:
      'Do you offer ongoing studio retainers for post-launch iteration, SEO, and agent tuning?',
    answer:
      'Yes. Many partners transition into an Ongoing Studio Retainer after launch for continuous feature sprints, technical SEO publishing, Core Web Vitals monitoring, and AI evaluation tuning. Retainers flex month-to-month without multi-quarter lock-in.',
    highlights: [
      'Dedicated monthly engineering, content, or AI optimization hours',
      'Priority 24-hour SLA for security patches and CMS/API updates',
      'Pause, scale up, or wrap down with 14 days notice before the next cycle',
    ],
  },
  {
    id: 'timelines-delivery-windows',
    category: 'timelines',
    categoryLabel: 'Project Timelines',
    question:
      'What are typical delivery timelines for websites, full-stack builds, and AI integrations?',
    answer:
      'Focused landing pages and conversion sprints ship in 1–2 weeks. Custom WordPress or brand websites typically complete in 3–5 weeks. Full-stack SaaS/PaaS products, custom multi-agent systems, and omnichannel AI customer care deployments usually take 4–8 weeks depending on API and compliance complexity.',
    highlights: [
      '1–2 weeks: Conversion landing pages, design audits, and interactive demos',
      '3–5 weeks: Custom WordPress builds, headless CMS, and SEO growth hubs',
      '4–8+ weeks: Multi-tenant SaaS/PaaS platforms and custom AI agent orchestration',
    ],
  },
  {
    id: 'timelines-kickoff-readiness',
    category: 'timelines',
    categoryLabel: 'Project Timelines',
    question:
      'How fast can we start, and what does our team need ready before kickoff?',
    answer:
      'Once your project brief is submitted, we respond within one business day and can usually schedule discovery within 3–5 business days. Having brand assets, staging credentials, or sample support transcripts speeds up week one, though we can also draft information architecture and copy alongside you.',
    highlights: [
      'Brief review and discovery call scheduled within 1–3 business days',
      'Dedicated Slack/email channel provisioned prior to Sprint 1 kickoff',
      'Optional copywriting and technical documentation led by our Content Guild',
    ],
  },
  {
    id: 'timelines-revisions-handoff',
    category: 'timelines',
    categoryLabel: 'Project Timelines',
    question:
      'How do feedback rounds work so launches stay on schedule without bottlenecks?',
    answer:
      'Each milestone includes structured review windows on live staging links rather than static screenshots, allowing your stakeholders to test real interactions and mobile viewports early. Two consolidated feedback cycles per phase keep iterations crisp and protect your target launch date.',
    highlights: [
      'Interactive staging URLs shared every Friday for direct stakeholder testing',
      'Asynchronous review checklists prevent meeting overload across time zones',
      'Launch readiness audit verifies analytics, redirects, backups, and alerts',
    ],
  },
];


