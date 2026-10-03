import Link from "next/link";
import { projects } from "@/data/site";
import { SplitText } from "@/components/ui/SplitText";
import { Button } from "@/components/ui/Button";
import { ProjectVisual } from "@/components/work/ProjectVisual";

// Composición editorial: tamaños y desplazamientos distintos por proyecto.
const layout = [
  { card: "md:col-span-7", ratio: "aspect-[4/5] md:aspect-[4/3]" },
  { card: "md:col-span-5 md:mt-48", ratio: "aspect-[4/5]" },
  { card: "md:col-span-12", ratio: "aspect-[4/5] md:aspect-[21/9]" },
  { card: "md:col-span-5", ratio: "aspect-[4/5]" },
  { card: "md:col-span-7 md:mt-32", ratio: "aspect-[4/5] md:aspect-[4/3]" },
  { card: "md:col-span-8 md:col-start-3", ratio: "aspect-[4/5] md:aspect-[16/9]" },
];

export function Work() {
  return (
    <section
      id="proyectos"
      data-theme-section="dark"
      className="relative px-[clamp(1rem,3vw,2.5rem)] py-28 sm:py-40"
    >
      <div className="mb-16 grid gap-6 sm:mb-24 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="label mb-6 text-muted" data-reveal="">
            (01) — Portfolio
          </p>
          <SplitText
            className="display text-[clamp(3rem,13vw,13rem)]"
            lines={["Selected", "Work"]}
          />
        </div>
        <div className="max-w-xs md:text-right" data-reveal="">
          <p className="text-lg text-fg/80">Algunos proyectos que hemos creado.</p>
          <p className="label mt-3 text-muted">
            <span data-count={projects.length}>00</span> proyectos · 2024—2026
          </p>
        </div>
      </div>

      <div className="grid gap-x-[clamp(1rem,3vw,2.5rem)] gap-y-20 md:grid-cols-12 md:gap-y-32">
        {projects.map((project, i) => (
          <article key={project.slug} className={layout[i % layout.length].card}>
            <Link
              href={`/proyectos/${project.slug}`}
              className="group block"
              data-cursor="view"
              aria-label={`Ver proyecto ${project.name}`}
            >
              <div data-clip="" className={`relative overflow-hidden rounded-sm ${layout[i % layout.length].ratio}`}>
                <div data-parallax="0.06" className="absolute inset-[-6%_0]">
                  <ProjectVisual variant={project.visual} className="h-full w-full" />
                </div>
                {/* Capa de información al pasar el cursor */}
                <div className="absolute inset-x-3 bottom-3 flex translate-y-[calc(100%+1rem)] items-center justify-between rounded-full bg-accent px-5 py-3 text-accent-ink transition-transform duration-700 ease-out-expo group-hover:translate-y-0">
                  <span className="text-sm font-medium">Ver proyecto</span>
                  <span className="arrow">→</span>
                </div>
              </div>

              <div className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-5">
                <div>
                  <h3 className="display text-[clamp(2rem,4.5vw,4rem)] transition-colors duration-500 group-hover:text-accent">
                    {project.name}
                  </h3>
                  <p className="label mt-3 text-muted">{project.category}</p>
                </div>
                <span className="label text-muted">{project.year}</span>
              </div>
              <p className="mt-4 max-w-md text-fg/70">{project.description}</p>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-28 flex justify-center" data-reveal="">
        <Button href="/#contacto">¿Tu proyecto es el siguiente?</Button>
      </div>
    </section>
  );
}
