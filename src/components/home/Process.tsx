"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { process } from "@/data/site";
import { SplitText } from "@/components/ui/SplitText";
import { prefersReducedMotion } from "@/lib/motion";

// Línea de tiempo: la línea se dibuja con el scroll y cada paso se activa al llegar.
export function Process() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!root.current) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (!reduced) gsap.fromTo(
        ".process-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".process-list", start: "top 60%", end: "bottom 60%", scrub: true },
        },
      );

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          onEnter: () => setActive(i),
          onLeaveBack: () => setActive(i - 1),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proceso"
      ref={root}
      data-theme-section="light"
      className="relative px-[clamp(1rem,3vw,2.5rem)] py-28 sm:py-40"
    >
      <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="label mb-6 text-muted" data-reveal="">
            (04) — Proceso
          </p>
          <SplitText className="display text-[clamp(3rem,10vw,10rem)]" lines={["How we", "work"]} />
          <p className="mt-8 max-w-sm text-lg text-fg/75" data-reveal="">
            Un proceso claro, sin sorpresas. Sabes en todo momento en qué punto está tu web y qué viene después.
          </p>
          <div className="label mt-10 flex items-center gap-3 text-muted" aria-hidden>
            <span className="tabular-nums text-fg">0{Math.max(active, 0) + 1}</span>
            <span className="h-px w-16 bg-line">
              <span
                className="block h-full origin-left bg-fg transition-transform duration-700 ease-out-expo"
                style={{ transform: `scaleX(${(active + 1) / process.length})` }}
              />
            </span>
            <span>0{process.length}</span>
          </div>
        </div>

        <ol className="process-list relative pl-10 sm:pl-16">
          <span className="absolute bottom-0 left-[11px] top-0 w-px bg-line sm:left-[15px]" />
          <span className="process-progress absolute bottom-0 left-[11px] top-0 w-px origin-top bg-fg sm:left-[15px]" />

          {process.map((step, i) => {
            const on = i <= active;
            return (
              <li key={step.title} className="process-step relative pb-20 last:pb-0">
                <span
                  className={`absolute -left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-700 ease-out-expo sm:-left-16 sm:h-8 sm:w-8 ${
                    on ? "scale-100 border-fg bg-fg" : "scale-75 border-line bg-bg"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full transition-colors duration-500 ${on ? "bg-accent" : "bg-transparent"}`} />
                </span>
                <div
                  className={`transition-[opacity,transform] duration-700 ease-out-expo ${
                    on ? "translate-x-0 opacity-100" : "translate-x-4 opacity-35"
                  }`}
                >
                  <p className="label text-muted">0{i + 1} —</p>
                  <h3 className="display mt-3 text-[clamp(2.4rem,6vw,5.5rem)]">{step.title}</h3>
                  <p className="mt-5 max-w-md text-xl leading-snug">{step.text}</p>
                  <p className="label mt-5 text-muted">{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
