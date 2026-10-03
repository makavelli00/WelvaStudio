"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { getLenis, markIntroDone, prefersReducedMotion } from "@/lib/motion";

// Pantalla de carga inicial: contador + logo, después se retira hacia arriba.
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const hide = () => {
      el.style.display = "none";
    };

    if (prefersReducedMotion() || window.__welvaIntroDone) {
      hide();
      markIntroDone();
      return;
    }

    // Bloquea el scroll mientras carga (Lenis aún no existe en este punto).
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const unlock = () => {
      html.style.overflow = "";
      getLenis()?.start();
    };

    const value = { n: 0 };
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            hide();
            unlock();
          },
        })
        .from(".pre-word", { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.08 })
        .to(
          value,
          {
            n: 100,
            duration: 1.4,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(value.n)).padStart(3, "0");
            },
          },
          0,
        )
        .to(".pre-bar", { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, 0)
        .to(".pre-word", { yPercent: -110, duration: 0.7, ease: "expo.in", stagger: 0.05 })
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, "-=0.2")
        .add(markIntroDone, "-=0.55");
    }, el);

    return () => {
      ctx.revert();
      unlock();
    };
  }, []);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[95] flex flex-col justify-between bg-[#0b0b0a] p-5 text-[#eeece5] motion-reduce:hidden sm:p-10"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden
    >
      <div className="label flex justify-between text-[#8b887f]">
        <span>Digital studio</span>
        <span>Est. 2026</span>
      </div>
      <div className="display flex flex-wrap gap-x-[0.25em] text-[clamp(2.6rem,10vw,9rem)]">
        <span className="overflow-hidden">
          <span className="pre-word inline-block">Welva</span>
        </span>
        <span className="overflow-hidden">
          <span className="pre-word inline-block text-[#c8ff3d]">Studio</span>
        </span>
      </div>
      <div>
        <div className="mb-4 flex items-end justify-between">
          <span className="label text-[#8b887f]">Cargando experiencia</span>
          <span ref={counter} className="font-mono text-4xl tabular-nums sm:text-6xl">
            000
          </span>
        </div>
        <div className="pre-bar h-px origin-left scale-x-0 bg-[#c8ff3d]" />
      </div>
    </div>
  );
}
