import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/SplitText";
import { ProjectVisual } from "@/components/work/ProjectVisual";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: project.name, description: project.description } : {};
}

export default async function ProjectPage({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <article data-theme-section="dark">
      <header className="px-[clamp(1rem,3vw,2.5rem)] pb-16 pt-40">
        <Link href="/#proyectos" className="link-line label text-muted" data-reveal="">
          ← Selected Work
        </Link>
        <SplitText
          as="h1"
          className="display mt-10 text-[clamp(3rem,14vw,14rem)]"
          lines={[project.name]}
        />
        <div className="mt-12 grid gap-6 border-t border-line pt-6 sm:grid-cols-3" data-reveal="">
          <div>
            <p className="label text-muted">Categoría</p>
            <p className="mt-2">{project.category}</p>
          </div>
          <div>
            <p className="label text-muted">Año</p>
            <p className="mt-2">{project.year}</p>
          </div>
          <div>
            <p className="label text-muted">Tipo</p>
            <p className="mt-2">Proyecto conceptual</p>
          </div>
        </div>
      </header>

      <div className="px-[clamp(1rem,3vw,2.5rem)]">
        <div data-scale-in="" className="overflow-hidden rounded-sm">
          <div data-clip="" className="aspect-[4/5] sm:aspect-[16/9]">
            <ProjectVisual variant={project.visual} className="h-full w-full" />
          </div>
        </div>
      </div>

      <section className="grid gap-16 px-[clamp(1rem,3vw,2.5rem)] py-28 md:grid-cols-2">
        <div data-reveal="">
          <p className="label text-muted">El reto</p>
          <p className="mt-5 text-[clamp(1.5rem,2.4vw,2.2rem)] font-medium leading-tight tracking-tight">
            {project.challenge}
          </p>
        </div>
        <div data-reveal="" data-delay="0.1">
          <p className="label text-muted">La solución</p>
          <p className="mt-5 text-[clamp(1.5rem,2.4vw,2.2rem)] font-medium leading-tight tracking-tight">
            {project.solution}
          </p>
          <ul className="mt-10 flex flex-wrap gap-2">
            {project.deliverables.map((d) => (
              <li key={d} className="rounded-full border border-line px-4 py-2 text-sm">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="flex flex-wrap justify-center gap-3 px-[clamp(1rem,3vw,2.5rem)] pb-28" data-reveal="">
        <Button href="/#contacto">Quiero algo así</Button>
        <Button href="/#proyectos" variant="ghost" arrow={false}>
          Ver todos los proyectos
        </Button>
      </div>

      <Link
        href={`/proyectos/${next.slug}`}
        className="group block border-t border-line px-[clamp(1rem,3vw,2.5rem)] py-20"
        data-cursor="view"
      >
        <p className="label text-muted">Siguiente proyecto</p>
        <div className="mt-6 flex items-end justify-between gap-6">
          <span className="display text-[clamp(2.8rem,11vw,11rem)] transition-colors duration-500 group-hover:text-accent">
            {next.name}
          </span>
          <span className="arrow mb-4 text-5xl">→</span>
        </div>
      </Link>
    </article>
  );
}
