import { projects, site } from "@/data/site";

const nav = [
  { label: "Trabajos", href: "#trabajos" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Contacto", href: "#contacto" },
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
      <header className="flex items-center justify-between py-6">
        <a href="#" className="font-serif text-2xl">
          {site.name}
        </a>
        <nav className="flex gap-5 text-sm text-muted">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="py-20 sm:py-32">
          <p className="mb-6 text-sm uppercase tracking-[0.2em] text-muted">
            {site.role} · {site.location}
          </p>
          <h1 className="max-w-4xl font-serif text-5xl leading-[1.05] sm:text-7xl">
            {site.intro.split(" ").slice(0, 3).join(" ")}{" "}
            <em className="text-accent">
              {site.intro.split(" ").slice(3).join(" ")}
            </em>
          </h1>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#trabajos"
              className="rounded-full bg-foreground px-6 py-3 text-sm text-background transition-opacity hover:opacity-85"
            >
              Ver trabajos
            </a>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-line px-6 py-3 text-sm transition-colors hover:border-foreground"
            >
              Escríbeme
            </a>
          </div>
        </section>

        <section id="trabajos" className="scroll-mt-8 border-t border-line py-20">
          <h2 className="mb-10 font-serif text-4xl">Trabajos seleccionados</h2>
          <ul>
            {projects.map((project) => (
              <li key={project.title} className="border-b border-line">
                <a
                  href={project.href ?? "#"}
                  className="group grid gap-2 py-8 sm:grid-cols-[1fr_2fr_auto] sm:items-baseline sm:gap-8"
                >
                  <h3 className="font-serif text-3xl transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                  <div>
                    <p className="text-muted">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted">{project.year}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="sobre-mi"
          className="grid scroll-mt-8 gap-10 border-t border-line py-20 sm:grid-cols-[1fr_2fr]"
        >
          <h2 className="font-serif text-4xl">Sobre mí</h2>
          <div className="space-y-5 text-lg leading-relaxed">
            {site.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="flex flex-wrap gap-2 pt-4">
              {site.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-foreground/5 px-4 py-2 text-sm"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contacto" className="scroll-mt-8 border-t border-line py-24 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">
            ¿Tienes un proyecto en mente?
          </p>
          <a
            href={`mailto:${site.email}`}
            className="font-serif text-4xl break-all transition-colors hover:text-accent sm:text-6xl"
          >
            {site.email}
          </a>
        </section>
      </main>

      <footer className="flex flex-col gap-4 border-t border-line py-8 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex gap-5">
          {site.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
