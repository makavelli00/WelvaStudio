import { testimonials } from "@/data/site";
import { SplitText } from "@/components/ui/SplitText";

export function Testimonials() {
  return (
    <section
      data-theme-section="light"
      className="relative px-[clamp(1rem,3vw,2.5rem)] py-28 sm:py-40"
    >
      <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label mb-6 text-muted" data-reveal="">
            (06) — Testimonios
          </p>
          <SplitText className="display text-[clamp(2.8rem,9vw,9rem)]" lines={["What clients", "say"]} />
        </div>
        <p className="label rounded-full border border-line px-4 py-2 text-muted" data-reveal="">
          Testimonios de ejemplo
        </p>
      </div>

      <div className="grid gap-px overflow-hidden rounded-sm bg-line md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure
            key={t.author}
            data-reveal=""
            data-delay={String(i * 0.12)}
            className="group flex min-h-[22rem] flex-col justify-between bg-bg p-8 transition-colors duration-700 hover:bg-surface sm:p-10"
          >
            <span className="font-serif text-7xl leading-none text-muted transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:rotate-6">
              &ldquo;
            </span>
            <blockquote className="mt-6 text-[clamp(1.3rem,1.8vw,1.6rem)] font-medium leading-snug tracking-tight">
              {t.quote}
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4 border-t border-line pt-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-fg text-sm font-semibold text-bg">
                {t.author.charAt(0)}
              </span>
              <span>
                <span className="block font-medium">{t.author}</span>
                <span className="label text-muted">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
