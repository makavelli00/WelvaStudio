import { Scribble } from "@/components/anime/Scribble";
import { Stickers } from "@/components/anime/Stickers";
import { SplitText } from "@/components/ui/SplitText";
import { ProjectVisual } from "@/components/work/ProjectVisual";

function RotatingBadge() {
  const text = "Independent digital studio · Made in Spain · ";
  return (
    <div className="relative h-36 w-36 sm:h-44 sm:w-44">
      <svg viewBox="0 0 200 200" className="spin-slow h-full w-full" aria-hidden>
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current font-mono text-[13px] uppercase tracking-[0.22em]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-accent-ink">
        ✦
      </span>
    </div>
  );
}

export function About() {
  return (
    <section
      id="estudio"
      data-theme-section="dark"
      className="relative overflow-hidden px-[clamp(1rem,3vw,2.5rem)] py-28 sm:py-40"
    >
      <p className="label mb-8 text-muted" data-reveal="">
        (05) — Sobre Welva
      </p>

      <div className="relative">
        <SplitText
          className="display relative z-10 text-[clamp(3.2rem,14vw,15rem)]"
          lines={[
            "Small",
            <span key="s" className="pl-[12vw]">studio.</span>,
            <span key="b" className="relative inline-block text-accent">
              Big
              <Scribble className="-inset-x-[18%] -inset-y-[22%] h-[144%] w-[136%] text-fg" />
            </span>,
            <span key="i" className="pl-[24vw]">ideas.</span>,
          ]}
        />

        {/* Mockups flotantes con parallax */}
        <div
          data-parallax="0.25"
          className="pointer-events-none absolute right-0 top-[4%] hidden w-[28vw] md:block"
        >
          <div data-clip="" className="aspect-[3/4] overflow-hidden rounded-sm">
            <ProjectVisual variant="lumen" className="h-full w-full" />
          </div>
        </div>
        <div
          data-parallax="0.45"
          className="pointer-events-none absolute left-[38%] top-[52%] hidden w-[18vw] md:block"
        >
          <div data-clip="" className="aspect-square overflow-hidden rounded-sm">
            <ProjectVisual variant="forma" className="h-full w-full" />
          </div>
        </div>
      </div>

      <div className="mt-24 grid gap-12 md:grid-cols-[auto_1fr_1fr] md:items-start md:gap-16">
        <div data-reveal="">
          <RotatingBadge />
        </div>
        <p className="text-[clamp(1.5rem,2.6vw,2.3rem)] font-medium leading-[1.15] tracking-tight" data-reveal="">
          Welva Studio es un estudio digital independiente especializado en crear páginas web modernas
          para negocios que quieren dejar de parecer uno más.
        </p>
        <div className="space-y-5 text-lg text-fg/70" data-reveal="" data-delay="0.15">
          <p>
            Somos pequeños a propósito. Hablas directamente con quien diseña y programa tu web, sin
            intermediarios ni capas de gestión.
          </p>
          <p>
            Eso nos permite ir rápido, cuidar los detalles y construir cada proyecto como si fuera
            nuestro.
          </p>
        </div>
      </div>

      <Stickers />
    </section>
  );
}
