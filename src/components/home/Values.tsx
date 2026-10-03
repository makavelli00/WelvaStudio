"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { values } from "@/data/site";
import { SplitText } from "@/components/ui/SplitText";
import { prefersReducedMotion } from "@/lib/motion";

export function Values() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // El número contorneado se "rellena" de color al avanzar el scroll.
      gsap.utils.toArray<HTMLElement>(".value-row").forEach((row) => {
        gsap.fromTo(
          row.querySelector(".value-fill"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: row, start: "top 80%", end: "top 35%", scrub: true },
          },
        );
        gsap.fromTo(
          row.querySelector(".value-line"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "expo.out",
            duration: 1.6,
            scrollTrigger: { trigger: row, start: "top 85%" },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      data-theme-section="dark"
      className="relative px-[clamp(1rem,3vw,2.5rem)] py-28 sm:py-40"
    >
      <div className="mb-20 grid gap-6 md:grid-cols-2 md:items-end">
        <div>
          <p className="label mb-6 text-muted" data-reveal="">
            (03) — Por qué Welva
          </p>
          <SplitText
            className="display text-[clamp(2.8rem,8vw,8rem)]"
            lines={["Lo que", "te llevas."]}
          />
        </div>
        <p className="max-w-md text-lg text-fg/75 md:justify-self-end" data-reveal="">
          Cuatro cosas que no negociamos en ningún proyecto, sea una landing o una web completa.
        </p>
      </div>

      <ol>
        {values.map((value, i) => (
          <li key={value.title} className="value-row relative grid gap-4 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-16 md:py-14">
            <span className="value-line absolute inset-x-0 top-0 h-px origin-left bg-line" />
            <div className="relative font-bold leading-[0.8] tracking-[-0.06em] text-[clamp(6rem,22vw,20rem)]">
              <span className="outline-text block" aria-hidden>
                0{i + 1}
              </span>
              <span className="value-fill absolute inset-0 text-accent">
                <span data-count={i + 1}>0{i + 1}</span>
              </span>
            </div>
            <div data-reveal="">
              <h3 className="text-[clamp(1.8rem,3.6vw,3.2rem)] font-semibold leading-[1] tracking-tight">
                {value.title}
              </h3>
              <p className="mt-4 max-w-md text-lg text-fg/70">{value.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
