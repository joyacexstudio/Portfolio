import type {
  FaqCategory,
  InsightCategory,
  ServiceId,
} from '../data/studioData';
import type { UiDictionary } from './types';

export interface LocalizedServiceCopy {
  shortLabel: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export interface LocalizedFaqCopy {
  question: string;
  answer: string;
  highlights: string[];
}

export const ES_TRANSLATIONS: UiDictionary = {
  nav: {
    services: 'Servicios',
    work: 'Portafolio',
    community: 'Comunidad',
    insights: 'Novedades',
    proof: 'Resultados',
    faq: 'Preguntas',
    contact: 'Contacto',
    startProject: 'Iniciar Proyecto',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    active: 'Activo',
    languageSwitcherLabel: 'Seleccionar idioma',
    allLanguagesButton: 'Todos',
    allLanguagesTitle: 'Todos los Idiomas Compatibles',
    searchLanguagesPlaceholder: 'Buscar idioma o código...',
    noLanguagesMatch: 'No se encontraron idiomas.',
    savedLocallyLabel: 'Guardado en preferencias locales',
    backToTop: 'Volver arriba',
    themeToggleLabel: 'Tema de color',
    themeObsidian: 'Obsidiana Medianoche',
    themeLight: 'Claro Alto Contraste',
    themeSwitchToLight: 'Cambiar al tema Claro Alto Contraste',
    themeSwitchToObsidian: 'Cambiar al tema Obsidiana Medianoche',
  },
  hero: {
    eyebrow: 'Comunidad Educativa · Hub Digital Dinámico',
    headline:
      'Bienvenido a JoyaceXstudio. Diseñado para el oficio, la escala y la claridad.',
    subtitle:
      'Vamos más allá del servicio tradicional: creamos sitios web, plataformas full-stack, soluciones SaaS y PaaS, agentes de IA de atención al cliente y agentes a medida, junto a narrativa SEO mientras impulsamos una red global de creadores tecnológicos.',
    ctaPrimary: 'Iniciar un Proyecto',
    ctaSecondary: 'Explorar Servicios',
    orbitHint: 'Arrastra la órbita o selecciona un nodo 3D',
    presets: {
      overview: 'Vista General',
      core: 'Prisma Central',
      orbit: 'Plano Orbital',
    },
  },
  partners: {
    eyebrow: 'Colaboradores de Confianza',
    heading:
      'Colaboramos con startups de alto ritmo, equipos de producto y hubs digitales.',
    pause: 'Pausar Carrusel',
    resume: 'Reanudar Carrusel',
  },
  services: {
    eyebrow: 'Capacidades Principales',
    heading:
      'Ocho disciplinas especializadas diseñadas para escalar negocios modernos.',
    helper:
      'Pasa el cursor o enfoca cualquier tarjeta de cristal para ver su profundidad espacial, pulsa Enter para sincronizarla con el prisma 3D superior o añade capacidades SaaS, PaaS y agentes de IA a tu brief.',
    pillarLabel: 'Pilar de Servicio',
    audioOn: 'Audio al Pasar: Activado',
    audioOff: 'Audio al Pasar: Desactivado',
    requestService: 'Solicitar Servicio',
    addedToBrief: 'Agregado al Brief',
  },
  portfolio: {
    eyebrowPrefix: 'Trabajos Seleccionados',
    eyebrowSuffix: 'Casos de Estudio',
    heading:
      'Casos de estudio construidos para velocidad y conversión medible.',
    allWork: 'Todos',
    emptyState: 'Aún no hay casos de estudio para este filtro.',
    challengePrefix: 'Desafío',
    architectureLabel: 'Arquitectura del Estudio',
    showBrief: 'Resumen y Arquitectura',
    hideBrief: 'Ocultar Resumen',
    inspect: 'Inspeccionar',
    showingOf: (shown, total) =>
      `Mostrando ${shown} de ${total} trabajos seleccionados`,
    loadMore: (count) => `Cargar ${count} Trabajos Más`,
    viewAll: (total) => `Ver Todos (${total})`,
    showFewer: 'Ver Menos',
    modal: {
      closeLabel: 'Cerrar caso de estudio',
      challengeHeading: 'El Desafío',
      architectureHeading: 'Arquitectura JoyaceXstudio',
      stackLabel: 'Stack Tecnológico',
      requestSimilar: 'Solicitar Proyecto Similar',
    },
  },
  community: {
    eyebrow: 'Por Qué Asociarse Con Nosotros',
    heading: 'Una base educativa que se multiplica en software más sólido.',
    paragraph1:
      'Gracias a nuestra base educativa, nuestro enfoque nace del aprendizaje continuo, las mejores prácticas modernas y la resolución colaborativa de problemas.',
    paragraph2:
      'Ya seas una startup en etapa temprana o una empresa consolidada, nuestro ecosistema de expertos principales y creadores emergentes aporta rigor técnico comprobado y visión fresca a cada lanzamiento.',
    ecosystemTitle: 'Ecosistema de Creadores',
    ecosystemBody:
      'Ingenieros, constructores de IA y redactores técnicos colaborando en gremios de estudio en vivo.',
    masteryTitle: 'Dominio Continuo',
    masteryBody:
      'Clínicas semanales de arquitectura mantienen nuestro stack alineado con estándares modernos, nunca con manuales obsoletos.',
    guildsEyebrow: 'Gremios del Hub y Currículo',
    expandAll: 'Expandir Todos los Gremios',
    collapseAll: 'Contraer Todos los Gremios',
    curriculumLabel: 'Módulos Curriculares (Haz clic para ver el temario)',
    clientAdvantage: 'Ventaja para el Cliente',
  },
  insights: {
    eyebrow: 'Novedades y Tendencias',
    heading:
      'Tendencias de la industria, notas de ingeniería y anuncios del estudio.',
    subtitle:
      'Despachos seleccionados por nuestros gremios de ingeniería, IA y diseño para mantener informados a fundadores y a nuestra comunidad educativa.',
    allUpdates: 'Todas',
    studioAnnouncements: 'Anuncios del Estudio',
    industryTrends: 'Tendencias',
    engineeringNotes: 'Notas de Ingeniería',
    readBrief: 'Leer Resumen',
    hideBrief: 'Ocultar Resumen',
    keyTakeaways: 'Puntos Clave',
    ctaTitle:
      '¿Quieres recibir despachos de arquitectura o invitaciones a talleres?',
    ctaSubtitle:
      'Comparte tu área de interés en un brief rápido y nuestro equipo comunitario te invitará a las próximas clínicas abiertas.',
    ctaButton: 'Unirse a los Despachos',
  },
  proof: {
    eyebrow: 'Resultados de Alianza',
    heading:
      'La confianza de fundadores y equipos de producto que construyen el futuro.',
  },
  faq: {
    eyebrow: 'Respuestas Rápidas',
    heading:
      'Preguntas frecuentes sobre procesos, inversión y plazos de entrega.',
    subtitle:
      'Expectativas claras antes del primer sprint. Expande cualquier pregunta o filtra por flujo de trabajo, presupuesto o cronograma.',
    allQuestions: 'Todas',
    processCategory: 'Proceso de Servicio',
    pricingCategory: 'Precios y Alcances',
    timelinesCategory: 'Plazos de Entrega',
    expandAll: 'Expandir Todo',
    collapseAll: 'Contraer Todo',
    keyHighlights: 'Puntos Clave',
    ctaTitle:
      '¿Tienes una duda específica sobre alcance, plazos o integraciones?',
    ctaSubtitle:
      'Envíanos un brief rápido con tu ventana objetivo de lanzamiento y responderemos con una hoja de ruta en menos de un día hábil.',
    ctaButton: 'Consultar en el Brief',
  },
  contact: {
    eyebrow: 'Contacta con JoyaceXstudio',
    heading: 'Construyamos algo extraordinario juntos.',
    subtitle:
      'Comparte tus objetivos, plazos y capacidades deseadas. Ya necesites un sitio WordPress a medida, una plataforma SaaS full-stack o un flujo con IA, respondemos en menos de un día hábil.',
    directInbox: 'Correo Directo del Estudio',
    copyEmail: 'Copiar Correo',
    copied: 'Copiado',
    syncNote:
      'Las capacidades seleccionadas en el Prisma 3D o en Servicios se sincronizan automáticamente con tu brief.',
    toastCopiedTitle: 'Copiado al portapapeles',
    toastBriefDesc: 'Resumen del brief listo para pegar',
    toastCopyFailTitle: 'No se pudo copiar automáticamente',
    toastEmailFailDesc: (email) => `Por favor, copia ${email} manualmente.`,
    toastBriefFailDesc:
      'Por favor, selecciona y copia el texto del brief manualmente.',
    briefReadyLabel: 'Brief de Proyecto Listo',
    thankYou: (name) => `Gracias, ${name}.`,
    briefReadySubtitle: 'Tu brief ha sido preparado para',
    sendViaEmail: 'Enviar por Correo',
    copyBriefText: 'Copiar Texto del Brief',
    briefCopied: 'Brief Copiado',
    editBrief: 'Editar Brief',
    servicesNeeded: 'Servicios Principales Requeridos',
    yourName: 'Tu Nombre',
    workEmail: 'Correo Corporativo',
    organizationOptional: 'Startup u Organización (Opcional)',
    estimatedScope: 'Alcance Estimado',
    projectGoals: 'Objetivos del Proyecto y Plazos',
    goalsPlaceholder:
      'Cuéntanos qué estás construyendo, tu ventana de lanzamiento y qué significa el éxito para tu equipo...',
    preparedFor: (email) => `Preparado directamente para ${email}`,
    prepareBrief: 'Preparar Brief del Proyecto',
    errName: 'Por favor, ingresa tu nombre para saber a quién dirigirnos.',
    errEmail: 'Por favor, ingresa un correo electrónico válido.',
    errVision:
      'Por favor, comparte un breve resumen de tus objetivos (mínimo 12 caracteres).',
    footerTagline: '· Hub Digital y Comunidad de Creadores',
    budgetOptions: [
      '$1k – $3k (Landing / Sprint)',
      '$3k – $8k (Web a Medida / WP)',
      '$8k – $20k (Full Stack / SaaS / IA)',
      'Retainer Mensual del Estudio',
    ],
  },
  newsletter: {
    eyebrow: 'Educational Insights · Boletín Comunitario',
    heading: 'Mantente al día con nuestros despachos para creadores tech.',
    description:
      'Notas de arquitectura, guías de flujos con IA, benchmarks de rendimiento web e invitaciones a talleres en vivo, sin spam.',
    emailLabel: 'Correo para recibir Educational Insights',
    placeholder: 'tu@empresa.com',
    subscribe: 'Suscribirse',
    errInvalidEmail: 'Por favor, ingresa un correo electrónico válido.',
    subscribedBadge: 'Suscrito a Educational Insights',
    subscribedMessage: (email) =>
      `Confirmado para ${email}. Recibirás nuestro próximo despacho comunitario.`,
    changeEmail: 'Cambiar correo',
    privacyNote: 'Envíos quincenales educativos · Cancela cuando quieras.',
    toastTitle: 'Suscripción confirmada',
    toastDesc: (email) => `${email} añadido al boletín de la comunidad`,
  },
};

export const SERVICE_TRANSLATIONS_ES: Record<ServiceId, LocalizedServiceCopy> = {
  'web-wordpress': {
    shortLabel: 'Web y WordPress',
    title: 'Desarrollo Web y WordPress',
    tagline: 'Arquitectura CMS · Temas a Medida · Optimización Core Web Vitals',
    description:
      'Sitios web visualmente impactantes, robustos y fáciles de administrar adaptados a tus objetivos, diseñados para autonomía editorial y carga instantánea.',
    deliverables: [
      'Temas de bloques a medida y pipelines headless con WordPress',
      'Optimización de Core Web Vitals y accesibilidad WCAG',
      'Flujos editoriales limpios para publicar sin fricción técnica',
    ],
  },
  'full-stack': {
    shortLabel: 'Full Stack',
    title: 'Desarrollo Full Stack',
    tagline: 'Interfaz Sólida · Sistemas API · Persistencia en la Nube',
    description:
      'Experiencias digitales integrales de extremo a extremo: desde la interfaz hasta el servidor, con esquemas limpios, APIs resilientes y UI escalable.',
    deliverables: [
      'Aplicaciones web TypeScript integrales y paneles multi-tenant',
      'APIs REST/GraphQL, autenticación y bases de datos relacionales',
      'Pipelines CI/CD automatizados e instrumentación de observabilidad',
    ],
  },
  'ai-apps': {
    shortLabel: 'Apps de IA',
    title: 'Desarrollo de Apps y Sitios con IA',
    tagline: 'Flujos Inteligentes · Personalización · Integración LLM',
    description:
      'Integraciones inteligentes preparadas para el futuro que automatizan procesos y personalizan experiencias con guardrails confiables y ROI medible.',
    deliverables: [
      'Copilotos de IA, búsqueda semántica y centros de conocimiento RAG',
      'Clasificación automática de leads y personalización dinámica',
      'Interfaces de streaming de baja latencia con supervisión humana',
    ],
  },
  'landing-pages': {
    shortLabel: 'Landing Pages',
    title: 'Páginas de Aterrizaje',
    tagline: 'Estrategia de Conversión · Movimiento 3D · Máximo ROI',
    description:
      'Páginas de alta conversión meticulosamente diseñadas para maximizar el retorno, uniendo jerarquía visual persuasiva e interactividad ultrarrápida.',
    deliverables: [
      'Arquitectura de mensajería probada para conversión y embudos',
      'Revelaciones interactivas 3D y microinteracciones responsivas',
      'Pruebas A/B, eventos de analítica y captura directa hacia CRM',
    ],
  },
  'content-writing': {
    shortLabel: 'Redacción SEO',
    title: 'Redacción de Contenido y SEO',
    tagline: 'SEO Técnico · Narrativa de Marca · Sistemas de Autoridad',
    description:
      'Narrativa optimizada para SEO que construye la autoridad de tu marca, traduciendo valor técnico complejo en historias humanas claras.',
    deliverables: [
      'Storytelling técnico de producto, copy de lanzamiento y UX microcopy',
      'Clusters temáticos por intención de búsqueda y artículos de autoridad',
      'Guías de voz consistentes en web, documentación y campañas',
    ],
  },
  'saas-paas': {
    shortLabel: 'SaaS / PaaS',
    title: 'Soluciones SaaS y PaaS',
    tagline: 'Nube Multi-Tenant · Suscripciones · APIs para Desarrolladores',
    description:
      'Productos SaaS y plataformas PaaS en producción diseñados para ingresos recurrentes, con aislamiento de tenants, facturación por uso y arquitectura lista para SLA.',
    deliverables: [
      'Espacios SaaS multi-tenant, control RBAC y autenticación SSO',
      'Aprovisionamiento PaaS autoservicio, webhooks y cobro por consumo',
      'Orquestación escalable en la nube con CI/CD sin tiempo de inactividad',
    ],
  },
  'ai-customer-care': {
    shortLabel: 'Atención IA',
    title: 'Agente IA de Atención al Cliente',
    tagline: 'Soporte Omnicanal 24/7 · Triaje de Tickets · Escalamiento Humano',
    description:
      'Agentes empáticos de atención al cliente basados en tus políticas que resuelven pedidos, facturación y dudas al instante por chat web, correo y mesa de ayuda.',
    deliverables: [
      'Agentes conectados a documentación, pedidos en vivo y CRM',
      'Detección de sentimiento, enrutamiento y traspaso cálido a humanos',
      'Analítica de resolución 24/7 multilingüe con tono de marca estricto',
    ],
  },
  'custom-ai-agent': {
    shortLabel: 'Agentes IA',
    title: 'Agentes de IA a Medida',
    tagline: 'Flujos Autónomos · Uso de Herramientas · Operaciones Empresariales',
    description:
      'Agentes de IA personalizados alrededor de tus operaciones exactas: automatizan investigación, calificación comercial, operaciones internas y ejecución vía API con aprobaciones.',
    deliverables: [
      'Agentes con tool-calling integrados a Slack, Notion, ERP y bases de datos',
      'Extracción estructurada, calificación de leads y reportes automáticos',
      'Evaluaciones deterministas, registros de auditoría y permisos por rol',
    ],
  },
};

export const COMMUNITY_TRACK_TRANSLATIONS_ES: Record<
  string,
  {
    title: string;
    cadence: string;
    focus: string;
    summary: string;
    highlights: string[];
    outcome: string;
  }
> = {
  'engineering-guild': {
    title: 'Gremio de Ingeniería Full-Stack',
    cadence: 'Revisiones Semanales de Arquitectura · Críticas Abiertas de Código',
    focus: 'TypeScript en Producción, APIs Limpias y Sistemas Escalables',
    summary:
      'Creadores y arquitectos principales colaboran en revisiones de código en vivo, convirtiendo las buenas prácticas modernas en hábito en cada proyecto cliente.',
    highlights: [
      'Clínicas entre pares sobre sistemas de componentes y esquemas de bases de datos',
      'Mentoría en sprints reales que une a nuevos desarrolladores con arquitectos',
      'Listas compartidas de accesibilidad, seguridad y Core Web Vitals',
    ],
    outcome:
      'Los clientes reciben software validado por un gremio multidisciplinario en lugar de suposiciones aisladas.',
  },
  'ai-innovation-lab': {
    title: 'Laboratorio de IA y Automatización',
    cadence: 'Sprints Quincenales · Investigación Aplicada',
    focus: 'Flujos LLM Prácticos, Grounding y Evaluación',
    summary:
      'Nuestra comunidad evalúa de forma continua modelos emergentes, patrones de recuperación y guardrails UX para entregar automatización confiable.',
    highlights: [
      'Sandboxes prácticos para confiabilidad de prompts, tool calling y JSON estructurado',
      'Guías de optimización de latencia y costos pensadas para presupuestos startup',
      'Patrones de interfaz centrados en las personas que generan confianza real',
    ],
    outcome:
      'Tus funcionalidades de IA pasan del ruido mediático a eficiencia operativa medible.',
  },
  'design-editorial-studio': {
    title: 'Estudio de Diseño y Contenido',
    cadence: 'Críticas Mensuales · Laboratorios de Narrativa',
    focus: 'UI Espacial 3D, Copy de Conversión y SEO Técnico',
    summary:
      'Diseñadores y redactores técnicos co-crean interfaces glassmórficas y narrativas claras donde la estética visual y el mensaje se refuerzan mutuamente.',
    highlights: [
      'Talleres de rendimiento interactivo con Three.js y WebGL',
      'Sesiones de análisis de conversión sobre landing pages reales de startups',
      'Sistemas editoriales por intención de búsqueda para fundadores técnicos',
    ],
    outcome:
      'Los productos lucen inconfundibles y comunican su valor en los primeros cinco segundos.',
  },
};

export const METRIC_TRANSLATIONS_ES: { label: string; context: string }[] = [
  {
    label: 'Lanzamientos Digitales',
    context: 'Productos web, full-stack y de IA desplegados',
  },
  {
    label: 'Aumento de Conversión',
    context: 'ROI promedio en embudos rediseñados',
  },
  {
    label: 'Red de Creadores',
    context: 'Ingenieros, diseñadores y redactores en nuestro hub',
  },
  {
    label: 'Retención de Clientes',
    context: 'Alianzas duraderas de producto y contenido',
  },
];

export const INSIGHT_CATEGORY_LABELS_ES: Record<InsightCategory, string> = {
  'studio-announcement': 'Anuncio del Estudio',
  'industry-trend': 'Tendencia de Industria',
  'engineering-note': 'Nota de Ingeniería',
};

export const INSIGHT_TRANSLATIONS_ES: Record<
  string,
  {
    title: string;
    publishedDate: string;
    readTime: string;
    summary: string;
    fullBrief: string;
    keyTakeaways: string[];
  }
> = {
  'studio-saas-ai-agents-launch': {
    title:
      'Presentamos Arquitectura SaaS/PaaS, Atención al Cliente con IA y Agentes Empresariales a Medida',
    publishedDate: '12 Nov 2026',
    readTime: '4 min lectura',
    summary:
      'Ampliamos formalmente nuestras prácticas de estudio para ayudar a empresas a lanzar plataformas SaaS/PaaS multi-tenant y agentes de IA grounded en políticas.',
    fullBrief:
      'Durante los últimos tres trimestres, nuestros gremios de ingeniería e IA vieron a startups solicitar dos capacidades clave más allá de sus sitios marketing: planos de control en la nube por suscripción y agentes operativos confiables. Nuestras nuevas prácticas combinan seguridad por fila, cobro por uso y evaluaciones automatizadas.',
    keyTakeaways: [
      'Planos SaaS/PaaS multi-tenant con SSO, RBAC y cobro medido con Stripe',
      'Agentes de Atención al Cliente 24/7 conectados a CRM, pedidos y mesa de ayuda',
      'Agentes internos personalizados con colas deterministas de aprobación humana',
    ],
  },
  'deterministic-evals-for-care-agents': {
    title:
      'Por Qué el Tool-Calling Grounded Reemplaza Cadenas de Prompts Frágiles en 2026',
    publishedDate: '08 Nov 2026',
    readTime: '6 min lectura',
    summary:
      'Los equipos de soporte y operaciones en producción abandonan los chats abiertos para adoptar llamadas a funciones tipadas y suites de regresión.',
    fullBrief:
      'Los primeros pilotos empresariales de IA fallaban porque los prompts sin respaldo improvisaban políticas de reembolso o cumplimiento. Los equipos líderes ahora exigen esquemas JSON estrictos, verificación de citas y baterías de evaluación continuas antes de cada despliegue.',
    keyTakeaways: [
      'Contratos de herramientas tipados reducen alucinaciones de políticas bajo 0.5%',
      'Disparadores de traspaso humano protegen el CSAT en disputas complejas',
      'Benchmarks semanales del gremio detectan regresiones de latencia a tiempo',
    ],
  },
  'webgl-particles-hero-performance': {
    title:
      'Composición de Partículas Canvas Reactivas al Cursor Bajo WebGL Transparente',
    publishedDate: '03 Nov 2026',
    readTime: '5 min lectura',
    summary:
      'Cómo nuestro estudio superpone constelaciones 2D escaladas por DPR detrás de un prisma de vidrio Three.js manteniendo 60fps en dispositivos móviles.',
    fullBrief:
      'Combinar profundidad atmosférica 2D con refracción PBR 3D no exige sobrecargar shaders WebGL. Al aislar un lienzo 2D consciente del pixel ratio debajo de un WebGLRenderer con alpha transparente, mantenemos las llamadas de dibujo al mínimo y respetamos prefers-reduced-motion.',
    keyTakeaways: [
      'Usa alpha: true y clearColor con alfa 0 en WebGLRenderer para integración limpia',
      'Limita DPR a 2 y pausa los frames automáticamente cuando sale del viewport',
      'Respeta prefers-reduced-motion con constelaciones estáticas serenas',
    ],
  },
  'winter-creator-hub-cohorts': {
    title:
      'Hub de Creadores Invierno 2026: Críticas Abiertas de Código y Talleres de UI Espacial',
    publishedDate: '27 Oct 2026',
    readTime: '3 min lectura',
    summary:
      'Inscripciones abiertas para los nuevos ciclos de gremio con clínicas en vivo de esquemas TypeScript, análisis Three.js y laboratorios de evaluación RAG.',
    fullBrief:
      'Nuestra comunidad educativa de más de 1,200 ingenieros, diseñadores y redactores crece mediante colaboración abierta. Esta edición de invierno suma revisiones de arquitectura los viernes junto a análisis reales de casos de éxito para aprender estándares de producción.',
    keyTakeaways: [
      'Clínicas semanales de contratos API y esquemas en el Gremio Full-Stack',
      'Sesiones quincenales del Laboratorio de IA sobre confiabilidad y costos',
      'Revisiones mensuales del Estudio de Diseño uniendo craft 3D y SEO técnico',
    ],
  },
  'headless-wordpress-cwv-shift': {
    title:
      'El Auge Silencioso de WordPress Headless en el Edge para Equipos B2B',
    publishedDate: '19 Oct 2026',
    readTime: '5 min lectura',
    summary:
      'Por qué las startups B2B combinan la velocidad editorial de Gutenberg con frontends React en el edge para lograr 99 en Lighthouse sin frenar a marketing.',
    fullBrief:
      'Los equipos de marketing aman la agilidad de WordPress, mientras ingeniería exige Core Web Vitals sub-segundo sin peso de plugins en rutas públicas. Desacoplar WPGraphQL tras vistas React estáticas entrega ambos beneficios y eleva tanto el SEO como la conversión móvil.',
    keyTakeaways: [
      'Autonomía editorial intacta con bloques Gutenberg a medida y vistas previas',
      'Las páginas públicas cargan sin JS pesado, impulsando demos y checkout móvil',
      'Purga automática de caché por webhook publica cambios en menos de dos segundos',
    ],
  },
  'low-latency-audio-spatial-ux': {
    title:
      'Diseñando Tactilidad Sonora Sutil en la Web Sin Comprometer la Accesibilidad',
    publishedDate: '11 Oct 2026',
    readTime: '4 min lectura',
    summary:
      'Patrones para sintetizar tonos armónicos ligeros mediante Web Audio API nativa: cero peso de archivos externos, cooldown anti-spam y control instantáneo.',
    fullBrief:
      'El audio en interfaces debe sentirse como vidrio mecanizado, nunca como ruido invasivo. Usar un AudioContext de baja latencia con ataques de 6ms, barridos paso-bajo cálidos y un selector persistente mejora el feedback espacial sin añadir un solo kilobyte de audio.',
    keyTakeaways: [
      'Desbloquea AudioContext solo tras gestos reales del usuario por política del navegador',
      'Aplica cooldowns de 45–50ms durante barridos rápidos con teclado o puntero',
      'Expón siempre un botón claro para activar o silenciar el audio al instante',
    ],
  },
};

export const FAQ_CATEGORY_LABELS_ES: Record<FaqCategory, string> = {
  process: 'Proceso de Servicio',
  pricing: 'Precios y Alcances',
  timelines: 'Plazos de Entrega',
};

export const FAQ_TRANSLATIONS_ES: Record<string, LocalizedFaqCopy> = {
  'process-discovery-to-launch': {
    question:
      '¿Cómo estructura JoyaceXstudio un proyecto desde el descubrimiento hasta el lanzamiento en producción?',
    answer:
      'Cada colaboración inicia con un plano arquitectónico de 48 horas donde los líderes de gremio definen flujos de usuario, límites de datos y metas de Core Web Vitals o latencia. Luego trabajamos en sprints semanales transparentes con entornos de staging, CI automatizado y una sesión documentada de entrega.',
    highlights: [
      'Plano técnico en 48 horas y hoja de ruta por hitos verificables',
      'Entregas semanales en staging con recorridos en video y QA continuo',
      'Repositorio Git completo, tokens de diseño y guía operativa incluidos al cierre',
    ],
  },
  'process-educational-guilds': {
    question:
      '¿Cómo mejoran los gremios educativos de creadores la calidad final para los clientes?',
    answer:
      'Cada proyecto es dirigido por arquitectos sénior del estudio junto a especialistas validados de nuestros gremios activos de Web, SaaS, Agentes de IA y Contenido. Nuestras clínicas semanales de arquitectura garantizan estándares modernos de producción en lugar de plantillas recicladas.',
    highlights: [
      'Un ingeniero principal sénior lidera la arquitectura, seguridad y revisión final',
      'Colaboración entre gremios para alinear SEO, UX y escalabilidad desde el día uno',
      'Cada pull request supera controles técnicos estrictos del estudio',
    ],
  },
  'process-ai-agent-guardrails': {
    question:
      '¿Qué salvaguardas aplican al construir Agentes de IA de Atención al Cliente o Agentes a Medida?',
    answer:
      'Diseñamos agentes con esquemas de herramientas deterministas, recuperación aislada por cliente, umbrales de confianza estrictos y escalamiento explícito a humanos. Antes de pasar a producción ejecutamos baterías de evaluación sobre casos límite, inyección de prompts y reglas de negocio.',
    highlights: [
      'Respuestas ancladas en bases de conocimiento verificadas con citas de fuente',
      'Reglas de transferencia a agentes humanos ante baja confianza o casos de facturación',
      'Paneles de telemetría para tasa de resolución, latencia y consumo de tokens',
    ],
  },
  'pricing-scope-tiers': {
    question:
      '¿Cómo se estructuran los precios entre Sprints de Landing, Web a Medida, SaaS y Agentes de IA?',
    answer:
      'Cotizamos paquetes de alcance cerrado alineados a resultados claros de negocio en lugar de horas impredecibles. Las landings y sprints UX parten en $1k–$3k, los sitios WordPress o corporativos a medida en $3k–$8k, y las plataformas SaaS, PaaS o agentes de IA en $8k–$20k+ según integraciones.',
    highlights: [
      '$1k–$3k: Landings de alta conversión, auditorías y sprints rápidos de interfaz',
      '$3k–$8k: Sitios WordPress/CMS a medida, WooCommerce y motores SEO',
      '$8k–$20k+: Plataformas SaaS/PaaS multi-tenant y sistemas de agentes de IA en producción',
    ],
  },
  'pricing-payment-milestones': {
    question:
      '¿Cuáles son las condiciones de pago por hitos y la titularidad de la propiedad intelectual?',
    answer:
      'Los proyectos de alcance fijo se dividen en tres hitos claros: 40% al inicio para reservar capacidad del sprint, 30% al aprobar la versión completa en staging y 30% en el despliegue final a producción. Al liquidar el último hito, el 100% del código, flujos de IA y activos pasan a ser propiedad exclusiva de tu empresa.',
    highlights: [
      '40% inicio · 30% aprobación en staging · 30% lanzamiento en producción',
      'Cero bloqueos por licencia: eres dueño íntegro del código, prompts e infraestructura',
      'Aprobación previa por escrito antes de facturar cualquier ampliación fuera de alcance',
    ],
  },
  'pricing-retainers-support': {
    question:
      '¿Ofrecen retainers mensuales del estudio para evolución continua, SEO y ajuste de agentes?',
    answer:
      'Sí. Muchos socios continúan con un Retainer Mensual del Estudio tras el lanzamiento para iteraciones de producto, publicación SEO técnica, monitoreo de Core Web Vitals y calibración de evaluaciones de IA. Los planes se adaptan mes a mes sin permanencias largas.',
    highlights: [
      'Horas mensuales dedicadas de ingeniería, contenido u optimización de IA',
      'SLA prioritario de 24 horas para parches de seguridad y actualizaciones de CMS/API',
      'Flexibilidad para pausar, escalar o cerrar con 14 días de aviso previo al ciclo',
    ],
  },
  'timelines-delivery-windows': {
    question:
      '¿Cuáles son los plazos habituales de entrega para sitios web, software full-stack e integraciones de IA?',
    answer:
      'Las landing pages enfocadas y sprints de conversión se lanzan en 1–2 semanas. Un sitio WordPress o web corporativa a medida toma entre 3–5 semanas. Los productos SaaS/PaaS full-stack y despliegues de agentes de IA personalizados suelen requerir de 4–8 semanas según integraciones y cumplimiento.',
    highlights: [
      '1–2 semanas: Landings de conversión, auditorías UX y prototipos interactivos',
      '3–5 semanas: WordPress a medida, CMS headless y centros de crecimiento SEO',
      '4–8+ semanas: Plataformas SaaS/PaaS multi-tenant y orquestación de agentes de IA',
    ],
  },
  'timelines-kickoff-readiness': {
    question:
      '¿Qué tan rápido podemos empezar y qué necesita preparar nuestro equipo antes del arranque?',
    answer:
      'Tras enviar tu brief, respondemos en menos de un día hábil y solemos agendar la sesión de descubrimiento en 3–5 días hábiles. Contar con lineamientos de marca, accesos o transcripciones de soporte acelera la primera semana, aunque también podemos estructurar arquitectura y copy junto a tu equipo.',
    highlights: [
      'Revisión del brief y llamada de descubrimiento agendadas en 1–3 días hábiles',
      'Canal dedicado por Slack o correo habilitado antes de iniciar el Sprint 1',
      'Redacción técnica y documentación opcional guiada por nuestro Gremio de Contenido',
    ],
  },
  'timelines-revisions-handoff': {
    question:
      '¿Cómo gestionan las rondas de revisión para mantener los lanzamientos a tiempo y sin cuellos de botella?',
    answer:
      'Cada hito incluye ventanas de revisión estructuradas sobre enlaces reales de staging y no solo capturas estáticas, permitiendo validar interacciones y vistas móviles desde temprano. Dos ciclos consolidados por fase mantienen el ritmo ágil y protegen tu fecha de salida.',
    highlights: [
      'URLs interactivas de staging compartidas cada viernes para pruebas reales',
      'Listas de validación asíncronas que evitan sobrecarga de reuniones entre zonas horarias',
      'Auditoría final de lanzamiento que verifica analítica, redirecciones, backups y alertas',
    ],
  },
};
