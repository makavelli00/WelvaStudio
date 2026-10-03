// Todo el texto de la web está aquí. Edita este archivo para cambiar contenidos.

export const site = {
  name: "Welva Studio",
  tagline: "Digital experiences for ambitious businesses.",
  email: "hola@welvastudio.com",
  socials: {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
};

export const nav = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Contacto", href: "/#contacto" },
];

export const marquee = [
  "Diseño web",
  "Desarrollo",
  "Landing pages",
  "Optimización",
  "IA aplicada",
  "Branding digital",
];

export type ProjectVisualVariant =
  | "whynot"
  | "northcoast"
  | "noir"
  | "forma"
  | "lumen"
  | "alta";

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  year: string;
  visual: ProjectVisualVariant;
  // Contenido de la página de caso de estudio.
  challenge: string;
  solution: string;
  deliverables: string[];
};

// Proyectos conceptuales de ejemplo. Sustitúyelos por proyectos reales.
export const projects: Project[] = [
  {
    slug: "why-not",
    name: "Why Not",
    category: "Branding · Web Design · Development",
    description:
      "Una marca joven que necesitaba una web con la misma actitud que su producto.",
    year: "2026",
    visual: "whynot",
    challenge:
      "Why Not tenía un producto con mucha personalidad y una web que no decía nada. Necesitaban algo que se recordara al primer vistazo.",
    solution:
      "Construimos una identidad tipográfica rotunda, una paleta sin miedo y una web rápida donde cada sección empuja hacia la compra.",
    deliverables: ["Identidad visual", "Diseño web", "Desarrollo Next.js", "Animaciones"],
  },
  {
    slug: "north-coast",
    name: "North Coast",
    category: "Hospitality · Web Design",
    description:
      "Un hotel frente al mar que quería que reservar fuera tan fácil como mirar el horizonte.",
    year: "2026",
    visual: "northcoast",
    challenge:
      "Las reservas pasaban por plataformas externas con comisiones altas y la web no transmitía la calma del lugar.",
    solution:
      "Diseñamos una experiencia lenta y luminosa, con un motor de reservas directo integrado en un recorrido de tres pasos.",
    deliverables: ["UX de reservas", "Diseño web", "Fotografía dirigida", "SEO local"],
  },
  {
    slug: "noir-studio",
    name: "Noir Studio",
    category: "Fashion · E-commerce",
    description:
      "Moda de autor en blanco y negro, con una tienda que se siente como un editorial.",
    year: "2025",
    visual: "noir",
    challenge:
      "Una tienda genérica que no estaba a la altura de unas colecciones muy cuidadas.",
    solution:
      "Una tienda editorial, con fichas de producto a pantalla completa y un checkout limpio pensado para móvil.",
    deliverables: ["Dirección de arte", "E-commerce", "Diseño mobile first", "Integración de pagos"],
  },
  {
    slug: "forma",
    name: "Forma",
    category: "Architecture · Digital Experience",
    description:
      "Un estudio de arquitectura que necesitaba enseñar espacios, no solo fotos.",
    year: "2025",
    visual: "forma",
    challenge:
      "Proyectos espectaculares presentados en una galería plana que no transmitía escala ni materialidad.",
    solution:
      "Una experiencia de scroll que recorre cada proyecto como una visita: planos, materiales y luz.",
    deliverables: ["Concepto digital", "Diseño web", "Animación de scroll", "CMS a medida"],
  },
  {
    slug: "lumen",
    name: "Lumen",
    category: "Wellness · Landing Page",
    description:
      "Una landing para el lanzamiento de una app de bienestar y meditación.",
    year: "2025",
    visual: "lumen",
    challenge:
      "Lanzar una app en un mercado saturado y conseguir registros desde el primer día.",
    solution:
      "Una landing serena y directa, con una sola acción por pantalla y pruebas A/B desde el lanzamiento.",
    deliverables: ["Landing page", "Copywriting", "Optimización de conversión", "Analítica"],
  },
  {
    slug: "alta",
    name: "Alta",
    category: "Fintech · Web Design · Development",
    description:
      "Una fintech que quería explicar algo complejo con una web sencilla.",
    year: "2024",
    visual: "alta",
    challenge:
      "Un producto financiero potente explicado con demasiada letra pequeña.",
    solution:
      "Visualizaciones interactivas, mensajes cortos y una web que genera confianza en segundos.",
    deliverables: ["Estrategia de contenido", "Diseño web", "Desarrollo", "Visualización de datos"],
  },
];

export const services = [
  {
    title: "Diseño Web",
    text: "Diseños personalizados pensados para destacar y convertir visitantes en clientes.",
    fx: "grid",
  },
  {
    title: "Desarrollo Web",
    text: "Webs rápidas, responsive y optimizadas para todos los dispositivos.",
    fx: "code",
  },
  {
    title: "Landing Pages",
    text: "Páginas diseñadas específicamente para campañas, productos y servicios.",
    fx: "arrow",
  },
  {
    title: "Optimización",
    text: "Mejoramos webs existentes para hacerlas más atractivas, claras y efectivas.",
    fx: "bars",
  },
  {
    title: "IA",
    text: "Utilizamos herramientas de inteligencia artificial para acelerar procesos y crear experiencias digitales modernas.",
    fx: "spark",
  },
] as const;

export const values = [
  {
    title: "Diseño que destaca.",
    text: "Nada de plantillas. Cada web nace de tu marca y de lo que te hace diferente.",
  },
  {
    title: "Experiencia pensada para el usuario.",
    text: "Recorridos claros, textos que se entienden y botones que aparecen justo cuando hacen falta.",
  },
  {
    title: "Tecnología moderna.",
    text: "Webs rápidas, seguras y bien posicionadas, construidas con las mismas herramientas que usan los grandes.",
  },
  {
    title: "Web preparada para crecer.",
    text: "Fácil de actualizar y lista para sumar nuevas páginas, idiomas o una tienda cuando la necesites.",
  },
];

export const process = [
  {
    title: "Descubrimos",
    text: "Entendemos tu negocio, tus clientes y tus objetivos.",
    detail: "Reunión inicial · Análisis de competencia · Objetivos",
  },
  {
    title: "Diseñamos",
    text: "Creamos una dirección visual y una experiencia digital.",
    detail: "Moodboard · Wireframes · Diseño de alta fidelidad",
  },
  {
    title: "Construimos",
    text: "Convertimos el diseño en una web rápida, responsive y funcional.",
    detail: "Desarrollo · Animaciones · Pruebas en dispositivos",
  },
  {
    title: "Lanzamos",
    text: "Publicamos tu web y dejamos todo preparado para que puedas utilizarla.",
    detail: "Publicación · Formación · Soporte posterior",
  },
];

// Testimonios de ejemplo: sustitúyelos cuando tengas clientes reales.
export const testimonials = [
  {
    quote:
      "En dos semanas pasamos de tener una web que nos daba vergüenza a una que enseñamos con orgullo en cada reunión.",
    author: "Laura M.",
    role: "Fundadora · Ejemplo",
  },
  {
    quote:
      "Entendieron el negocio antes de abrir Figma. Eso se nota en cada pantalla.",
    author: "Carlos R.",
    role: "Director · Ejemplo",
  },
  {
    quote:
      "Las reservas directas se han disparado. La web por fin trabaja para nosotros.",
    author: "Marta G.",
    role: "Gerente · Ejemplo",
  },
];
