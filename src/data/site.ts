// Edita este archivo para cambiar el contenido de la web.

export const site = {
  name: "Welva Studio",
  role: "Diseño y desarrollo web",
  location: "España",
  email: "hola@welvastudio.com",
  intro:
    "Diseño y construyo sitios web cuidados, rápidos y fáciles de usar para marcas y personas con algo que contar.",
  about: [
    "Soy diseñador y desarrollador. Me muevo entre la parte visual y el código para que lo que se diseña sea exactamente lo que se publica.",
    "Trabajo con equipos pequeños y negocios independientes, desde la primera idea hasta la web en producción.",
  ],
  skills: ["Diseño UI", "Next.js", "React", "Tailwind CSS", "Branding", "SEO"],
  socials: [
    { label: "GitHub", href: "https://github.com/makavelli00" },
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
  ],
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Proyecto uno",
    description:
      "Web corporativa con sistema de reservas y panel de gestión de contenido.",
    tags: ["Diseño", "Next.js"],
    year: "2026",
    href: "#",
  },
  {
    title: "Proyecto dos",
    description:
      "Identidad visual y landing de lanzamiento para una marca de producto.",
    tags: ["Branding", "Landing"],
    year: "2026",
    href: "#",
  },
  {
    title: "Proyecto tres",
    description: "Tienda online a medida con catálogo y pagos integrados.",
    tags: ["E-commerce", "React"],
    year: "2025",
    href: "#",
  },
  {
    title: "Proyecto cuatro",
    description: "Rediseño completo y mejora de rendimiento de una web existente.",
    tags: ["Rediseño", "Rendimiento"],
    year: "2025",
    href: "#",
  },
];
