"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { getLenis, INTRO_SEEN_KEY, markIntroDone, prefersReducedMotion } from "@/lib/motion";
import { AnimatedLogo } from "@/components/brand/AnimatedLogo";
import { Wordmark } from "@/components/brand/Wordmark";

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

    // Solo una vez por sesión. layout.tsx pone .intro-seen antes de pintar,
    // así que en visitas siguientes el CSS ya lo oculta sin parpadeo.
    const seen = document.documentElement.classList.contains("intro-seen");
    const rememberSeen = () => {
      try {
        sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {
        // Sin almacenamiento: se volverá a mostrar en la próxima carga.
      }
    };

    if (prefersReducedMotion() || window.__welvaIntroDone || seen) {
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
            rememberSeen();
          },
        })
        // El logo se dibuja solo (AnimatedLogo, ~1,8 s); el contador va a su ritmo.
        .from(".pre-word", { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.08 }, 0.5)
        .to(
          value,
          {
            n: 100,
            duration: 1.9,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(value.n)).padStart(3, "0");
            },
          },
          0,
        )
        .to(".pre-bar", { scaleX: 1, duration: 1.9, ease: "power2.inOut" }, 0)
        .to(".pre-word", { yPercent: -110, duration: 0.7, ease: "expo.in", stagger: 0.05 })
        .to(".pre-logo", { scale: 0.85, opacity: 0, duration: 0.6, ease: "expo.in" }, "<")
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
      className="preloader fixed inset-0 z-[95] flex flex-col justify-between bg-[#0b0b0a] p-5 text-[#eeece5] motion-reduce:hidden sm:p-10"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden
    >
      <div className="label flex justify-between text-[#8b887f]">
        <span>Digital studio</span>
        <span>Est. 2026</span>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="pre-logo">
          <AnimatedLogo className="w-[min(62vw,340px)]" packets interactive={false} />
        </div>
        <span className="overflow-hidden">
          <Wordmark className="pre-word inline-block text-[clamp(2rem,6vw,4rem)]" />
        </span>
      </div>
      <div>
        <div className="mb-4 flex items-end justify-between">
          <span className="label text-[#8b887f]">Cargando experiencia</span>
          <span ref={counter} className="font-mono text-4xl tabular-nums sm:text-6xl">
            000
          </span>
        </div>
        <div className="pre-bar h-px origin-left scale-x-0 bg-accent" />
      </div>
    </div>
  );
}
