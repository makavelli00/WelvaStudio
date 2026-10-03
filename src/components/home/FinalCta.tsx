import { site } from "@/data/site";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";

export function FinalCta() {
  return (
    <section
      id="contacto"
      data-theme-section="dark"
      className="relative overflow-hidden px-[clamp(1rem,3vw,2.5rem)] py-28 sm:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
      />

      <p className="label mb-8 text-muted" data-reveal="">
        (07) — Let&apos;s talk
      </p>
      <SplitText
        className="display relative text-[clamp(2.6rem,10.5vw,12rem)]"
        lines={["¿Tienes un", "proyecto", <span key="m" className="text-accent">en mente?</span>]}
      />

      <div className="relative mt-16 grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
        <div data-reveal="">
          <p className="max-w-md text-2xl leading-snug">Cuéntanos qué quieres construir.</p>
          <p className="mt-3 max-w-md text-fg/60">
            Te respondemos en menos de 24 horas con próximos pasos claros. Sin compromiso.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="link-line mt-8 inline-block text-xl font-medium sm:text-2xl"
          >
            {site.email}
          </a>
        </div>

        <div className="justify-self-center md:justify-self-end" data-reveal="" data-delay="0.15">
          <Magnetic strength={0.4}>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Quiero una web con Welva Studio")}`}
              data-cursor="hover"
              className="group relative flex h-[min(70vw,20rem)] w-[min(70vw,20rem)] items-center justify-center overflow-hidden rounded-full bg-accent text-accent-ink transition-transform duration-700 ease-out-expo hover:scale-105"
            >
              <span className="absolute inset-0 origin-center scale-0 rounded-full bg-fg transition-transform duration-700 ease-out-expo group-hover:scale-100" />
              <span className="relative flex flex-col items-center gap-2 transition-colors duration-500 group-hover:text-bg">
                <span className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight">Hablemos</span>
                <span className="arrow text-4xl transition-transform duration-700 ease-out-expo group-hover:-rotate-45">
                  →
                </span>
              </span>
              {/* Borde animado */}
              <svg className="spin-slow absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)]" viewBox="0 0 100 100" aria-hidden>
                <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 3" opacity="0.6" />
              </svg>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
